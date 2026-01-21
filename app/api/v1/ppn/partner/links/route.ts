import { auth } from '@/lib/ppn/auth';
import { prisma } from '@/lib/ppn/db';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';

export const runtime = 'nodejs';

async function checkPartner() {
  const session = await auth();
  if (!session?.user || !session.user.partnerId) {
    return null;
  }
  return session;
}

// GET /api/v1/ppn/partner/links - Get products and generate links
export async function GET() {
  const session = await checkPartner();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Partner access required', 401);
  }

  const partnerId = session.user.partnerId!;

  // Get partner code
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { partnerCode: true, status: true },
  });

  if (!partner) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Partner not found', 404);
  }

  if (partner.status !== 'approved') {
    return errorResponse(ErrorCodes.FORBIDDEN, 'Partner is not approved', 403);
  }

  // Get all active products with their stats for this partner
  const products = await prisma.product.findMany({
    where: { status: 'active' },
    select: {
      id: true,
      name: true,
      slug: true,
      domain: true,
      defaultLandingUrl: true,
      pricingUrl: true,
    },
  });

  // Get click stats per product
  const clickStats = await prisma.click.groupBy({
    by: ['productId'],
    where: { partnerId },
    _count: { id: true },
  });

  const clickStatsMap = new Map(clickStats.map(s => [s.productId, s._count.id]));

  // Build links for each product
  const productsWithLinks = products.map(product => {
    const baseUrl = `https://${product.domain}`;
    const partnerParam = `ppn_ref=${partner.partnerCode}`;
    
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      domain: product.domain,
      clicks: clickStatsMap.get(product.id) || 0,
      links: {
        home: `${baseUrl}?${partnerParam}`,
        pricing: product.pricingUrl 
          ? `${product.pricingUrl}${product.pricingUrl.includes('?') ? '&' : '?'}${partnerParam}`
          : `${baseUrl}/pricing?${partnerParam}`,
        landing: product.defaultLandingUrl
          ? `${product.defaultLandingUrl}${product.defaultLandingUrl.includes('?') ? '&' : '?'}${partnerParam}`
          : `${baseUrl}?${partnerParam}`,
        redirect: `/api/v1/ppn/r/${partner.partnerCode}?product=${product.slug}`,
      },
    };
  });

  return successResponse({
    partnerCode: partner.partnerCode,
    products: productsWithLinks,
  });
}
