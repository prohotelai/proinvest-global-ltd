import { NextRequest } from 'next/server';
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

// GET /api/v1/ppn/partner/assets - List available assets for partners
export async function GET(request: NextRequest) {
  const session = await checkPartner();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Partner access required', 401);
  }

  const partnerId = session.user.partnerId!;

  // Check partner status
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { status: true },
  });

  if (!partner || partner.status !== 'approved') {
    return errorResponse(ErrorCodes.FORBIDDEN, 'Partner is not approved', 403);
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const type = searchParams.get('type');

  const where: Record<string, unknown> = { active: true };
  if (productId) where.productId = productId;
  if (type) where.type = type;

  const assets = await prisma.assetLibrary.findMany({
    where,
    include: {
      product: { select: { name: true, slug: true } },
    },
    orderBy: [
      { product: { name: 'asc' } },
      { type: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  // Group by product
  const grouped = assets.reduce((acc, asset) => {
    const productName = asset.product.name;
    if (!acc[productName]) {
      acc[productName] = [];
    }
    acc[productName].push(asset);
    return acc;
  }, {} as Record<string, typeof assets>);

  return successResponse({
    assets,
    groupedByProduct: grouped,
  });
}
