import { NextRequest } from 'next/server';
import { auth } from '@/lib/ppn/auth';
import { prisma } from '@/lib/ppn/db';
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

const voidCommissionSchema = z.object({
  commissionId: z.string().uuid(),
  reason: z.string().min(1),
});

// GET /api/v1/ppn/admin/commissions - List commissions
export async function GET(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const partnerId = searchParams.get('partnerId');
  const productId = searchParams.get('productId');
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  const where: Record<string, unknown> = {};
  if (partnerId) where.partnerId = partnerId;
  if (productId) where.productId = productId;
  if (status) where.status = status;

  const [commissions, total] = await Promise.all([
    prisma.commissionEntry.findMany({
      where,
      include: {
        partner: {
          include: {
            user: { select: { email: true, name: true } },
          },
        },
        product: { select: { name: true, slug: true } },
      },
      orderBy: { occurredAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.commissionEntry.count({ where }),
  ]);

  return successResponse({
    commissions,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

// POST /api/v1/ppn/admin/commissions - Void a commission
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

  const validation = voidCommissionSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const { commissionId, reason } = validation.data;

  // Find commission
  const commission = await prisma.commissionEntry.findUnique({
    where: { id: commissionId },
  });

  if (!commission) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Commission not found', 404);
  }

  if (commission.status === 'void') {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Commission is already voided', 400);
  }

  if (commission.status === 'paid') {
    // Create clawback adjustment instead
    await prisma.ledgerTransaction.create({
      data: {
        partnerId: commission.partnerId,
        type: 'adjustment',
        amount: -commission.commissionAmount,
        currency: commission.currency,
        referenceType: 'commission',
        referenceId: commission.id,
        description: `Admin clawback: ${reason}`,
      },
    });

    await prisma.commissionEntry.update({
      where: { id: commissionId },
      data: { voidReason: `Admin clawback: ${reason}` },
    });

    return successResponse({ clawedBack: true, reason });
  }

  // Void the commission
  await prisma.commissionEntry.update({
    where: { id: commissionId },
    data: {
      status: 'void',
      voidReason: `Admin: ${reason}`,
    },
  });

  // Create negative ledger transaction
  await prisma.ledgerTransaction.create({
    data: {
      partnerId: commission.partnerId,
      type: 'commission_voided',
      amount: -commission.commissionAmount,
      currency: commission.currency,
      referenceType: 'commission',
      referenceId: commission.id,
      description: `Admin voided: ${reason}`,
    },
  });

  return successResponse({ voided: true, reason });
}
