import { NextRequest } from 'next/server';
import { auth } from '@/lib/ppn/auth';
import { prisma } from '@/lib/ppn/db';
import { processPayout } from '@/lib/ppn/commission-engine';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';
import { z } from 'zod';

export const runtime = 'nodejs';

async function checkAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }
  return session;
}

const updatePayoutSchema = z.object({
  payoutId: z.string().uuid(),
  status: z.enum(['approved', 'processing', 'paid', 'rejected']),
  adminNote: z.string().optional(),
});

// GET /api/v1/ppn/admin/payouts - List payout requests
export async function GET(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const partnerId = searchParams.get('partnerId');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (partnerId) where.partnerId = partnerId;

  const [payouts, total] = await Promise.all([
    prisma.payoutRequest.findMany({
      where,
      include: {
        partner: {
          include: {
            user: { select: { email: true, name: true } },
            payoutMethods: {
              where: { isActive: true },
            },
          },
        },
      },
      orderBy: { requestedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.payoutRequest.count({ where }),
  ]);

  return successResponse({
    payouts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

// POST /api/v1/ppn/admin/payouts - Update payout status
export async function POST(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = updatePayoutSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const { payoutId, status, adminNote } = validation.data;

  const result = await processPayout(payoutId, status, adminNote);

  if (!result.success) {
    return errorResponse(ErrorCodes.PAYOUT_ERROR, result.error || 'Failed to process payout', 400);
  }

  // Get updated payout
  const payout = await prisma.payoutRequest.findUnique({
    where: { id: payoutId },
    include: {
      partner: {
        include: {
          user: { select: { email: true, name: true } },
        },
      },
    },
  });

  return successResponse({ payout });
}
