import { NextRequest } from 'next/server';
import { prisma } from '@/lib/ppn/db';
import { verifySignature } from '@/lib/ppn/signature';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';

export const runtime = 'nodejs';

function normalizePartnerRefCode(value: string): string {
  return value.trim().toUpperCase();
}

/**
 * POST /api/v1/ppn/sync/coupon-identities
 *
 * Product-authenticated endpoint to fetch partner coupon identities for sync.
 * Default coupon identity rule:
 * - partnerRefCode = couponCode
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  // Reuse existing product-auth HMAC verification path
  const verification = await verifySignature(request, rawBody || '{}');
  if (!verification.valid) {
    const errorCode = verification.errorCode || ErrorCodes.INVALID_SIGNATURE;
    const statusCode = errorCode === 'PRODUCT_NOT_FOUND' ? 404 : 401;
    return errorResponse(errorCode, verification.error || 'Verification failed', statusCode);
  }

  const { productId, eventId } = verification;

  const product = await prisma.product.findUnique({
    where: { id: productId! },
    select: { id: true, slug: true, status: true },
  });

  if (!product) {
    return errorResponse(ErrorCodes.PRODUCT_NOT_FOUND, 'Product not found', 404);
  }

  const partners = await prisma.partner.findMany({
    select: {
      id: true,
      partnerCode: true,
      status: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  const records = partners.map((partner) => {
    const normalizedPartnerRefCode = normalizePartnerRefCode(partner.partnerCode);

    return {
      partnerId: partner.id,
      partnerRefCode: normalizedPartnerRefCode,
      couponCode: normalizedPartnerRefCode,
      productId: product.id,
      productSlug: product.slug,
      isActive: product.status === 'active' && partner.status === 'approved',
      partnerStatus: partner.status,
      updatedAt: partner.updatedAt.toISOString(),
    };
  });

  return successResponse(
    {
      productId: product.id,
      productSlug: product.slug,
      count: records.length,
      records,
    },
    eventId
  );
}
