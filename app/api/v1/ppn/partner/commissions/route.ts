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

// GET /api/v1/ppn/partner/commissions - List partner's commissions
export async function GET(request: NextRequest) {
  const session = await checkPartner();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Partner access required', 401);
  }

  const partnerId = session.user.partnerId!;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  const where: Record<string, unknown> = { partnerId };
  if (status) where.status = status;

  const [commissions, total] = await Promise.all([
    prisma.commissionEntry.findMany({
      where,
      include: {
        product: { select: { name: true, slug: true } },
      },
      orderBy: { occurredAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.commissionEntry.count({ where }),
  ]);

  // Get summary stats
  const [pending, available, paid, voided] = await Promise.all([
    prisma.commissionEntry.aggregate({
      where: { partnerId, status: 'pending' },
      _sum: { commissionAmount: true },
      _count: true,
    }),
    prisma.commissionEntry.aggregate({
      where: { partnerId, status: 'available' },
      _sum: { commissionAmount: true },
      _count: true,
    }),
    prisma.commissionEntry.aggregate({
      where: { partnerId, status: 'paid' },
      _sum: { commissionAmount: true },
      _count: true,
    }),
    prisma.commissionEntry.aggregate({
      where: { partnerId, status: 'void' },
      _sum: { commissionAmount: true },
      _count: true,
    }),
  ]);

  return successResponse({
    commissions,
    summary: {
      pending: {
        count: pending._count,
        amount: pending._sum.commissionAmount || 0,
      },
      available: {
        count: available._count,
        amount: available._sum.commissionAmount || 0,
      },
      paid: {
        count: paid._count,
        amount: paid._sum.commissionAmount || 0,
      },
      voided: {
        count: voided._count,
        amount: voided._sum.commissionAmount || 0,
      },
    },
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}
