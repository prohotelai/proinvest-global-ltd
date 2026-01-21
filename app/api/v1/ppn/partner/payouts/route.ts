import { NextRequest } from 'next/server';
import { auth } from '@/lib/ppn/auth';
import { prisma } from '@/lib/ppn/db';
import { requestPayout, calculatePartnerBalance } from '@/lib/ppn/commission-engine';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';
import { z } from 'zod';

export const runtime = 'nodejs';

async function checkPartner() {
  const session = await auth();
  if (!session?.user || !session.user.partnerId) {
    return null;
  }
  return session;
}

const requestPayoutSchema = z.object({
  amount: z.number().min(100),
  method: z.enum(['stripe', 'wise', 'bank']),
});

// GET /api/v1/ppn/partner/payouts - List partner's payout requests
export async function GET(request: NextRequest) {
  const session = await checkPartner();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Partner access required', 401);
  }

  const partnerId = session.user.partnerId!;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  const [payouts, total, balance] = await Promise.all([
    prisma.payoutRequest.findMany({
      where: { partnerId },
      orderBy: { requestedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.payoutRequest.count({ where: { partnerId } }),
    calculatePartnerBalance(partnerId),
  ]);

  // Check if can request this month
  const currentMonthKey = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  const hasRequestedThisMonth = await prisma.payoutRequest.findUnique({
    where: {
      partnerId_monthKey: {
        partnerId,
        monthKey: currentMonthKey,
      },
    },
  });

  return successResponse({
    payouts,
    balance,
    canRequestPayout: !hasRequestedThisMonth && balance.available >= 100,
    minimumPayout: 100,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

// POST /api/v1/ppn/partner/payouts - Request a payout
export async function POST(request: NextRequest) {
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

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = requestPayoutSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const { amount, method } = validation.data;

  // Check if partner has an active payout method for this type
  const payoutMethod = await prisma.payoutMethod.findFirst({
    where: {
      partnerId,
      method,
      isActive: true,
    },
  });

  if (!payoutMethod) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      `No active ${method} payout method configured. Please add payout details first.`,
      400
    );
  }

  const result = await requestPayout(partnerId, amount, method);

  if (!result.success) {
    return errorResponse(ErrorCodes.PAYOUT_ERROR, result.error || 'Failed to request payout', 400);
  }

  return successResponse({
    payoutRequest: result.payoutRequest,
    message: 'Payout request submitted successfully',
  }, undefined, 201);
}
