import { auth } from '@/lib/ppn/auth';
import { prisma } from '@/lib/ppn/db';
import { calculatePartnerBalance } from '@/lib/ppn/commission-engine';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';

export const runtime = 'nodejs';

async function checkPartner() {
  const session = await auth();
  if (!session?.user || !session.user.partnerId) {
    return null;
  }
  return session;
}

// GET /api/v1/ppn/partner/dashboard - Get partner dashboard stats
export async function GET() {
  const session = await checkPartner();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Partner access required', 401);
  }

  const partnerId = session.user.partnerId!;

  // Get partner details
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    include: {
      tier: true,
      user: { select: { email: true, name: true } },
    },
  });

  if (!partner) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Partner not found', 404);
  }

  // Get balance
  const balance = await calculatePartnerBalance(partnerId);

  // Get stats
  const [totalClicks, totalAttributions, thisMonthClicks] = await Promise.all([
    prisma.click.count({ where: { partnerId } }),
    prisma.attribution.count({ where: { partnerId } }),
    prisma.click.count({
      where: {
        partnerId,
        occurredAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
  ]);

  // Get recent commissions
  const recentCommissions = await prisma.commissionEntry.findMany({
    where: { partnerId },
    orderBy: { occurredAt: 'desc' },
    take: 5,
    include: {
      product: { select: { name: true } },
    },
  });

  // Get current month payout request status
  const currentMonthKey = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  const currentMonthPayout = await prisma.payoutRequest.findUnique({
    where: {
      partnerId_monthKey: {
        partnerId,
        monthKey: currentMonthKey,
      },
    },
  });

  return successResponse({
    partner: {
      id: partner.id,
      partnerCode: partner.partnerCode,
      type: partner.type,
      status: partner.status,
      tier: partner.tier,
      email: partner.user.email,
      name: partner.user.name,
    },
    balance,
    stats: {
      totalClicks,
      totalAttributions,
      thisMonthClicks,
      conversionRate: totalClicks > 0 ? ((totalAttributions / totalClicks) * 100).toFixed(2) : '0.00',
    },
    recentCommissions,
    currentMonthPayout: currentMonthPayout ? {
      status: currentMonthPayout.status,
      amount: currentMonthPayout.requestedAmount,
      requestedAt: currentMonthPayout.requestedAt,
    } : null,
  });
}
