import { NextRequest } from 'next/server';
import { auth } from '@/lib/ppn/auth';
import { prisma } from '@/lib/ppn/db';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';
import { encrypt, decrypt } from '@/lib/ppn/utils';
import { z } from 'zod';

export const runtime = 'nodejs';

async function checkPartner() {
  const session = await auth();
  if (!session?.user || !session.user.partnerId) {
    return null;
  }
  return session;
}

const stripeDetailsSchema = z.object({
  accountId: z.string().min(1),
  email: z.string().email(),
});

const wiseDetailsSchema = z.object({
  email: z.string().email(),
  accountHolderName: z.string().min(1),
});

const bankDetailsSchema = z.object({
  bankName: z.string().min(1),
  accountHolderName: z.string().min(1),
  accountNumber: z.string().min(1),
  routingNumber: z.string().optional(),
  swiftCode: z.string().optional(),
  iban: z.string().optional(),
  country: z.string().length(2),
});

const createPayoutMethodSchema = z.object({
  method: z.enum(['stripe', 'wise', 'bank']),
  details: z.union([stripeDetailsSchema, wiseDetailsSchema, bankDetailsSchema]),
});

// GET /api/v1/ppn/partner/payout-methods - List partner's payout methods
export async function GET() {
  const session = await checkPartner();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Partner access required', 401);
  }

  const partnerId = session.user.partnerId!;

  const methods = await prisma.payoutMethod.findMany({
    where: { partnerId },
    select: {
      id: true,
      method: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      detailsEncryptedJson: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Decrypt and mask sensitive details
  const maskedMethods = methods.map(m => {
    try {
      const details = JSON.parse(decrypt(m.detailsEncryptedJson));
      // Mask sensitive fields
      const maskedDetails: Record<string, string> = {};
      for (const [key, value] of Object.entries(details)) {
        if (typeof value === 'string') {
          if (key === 'email') {
            const [local, domain] = value.split('@');
            maskedDetails[key] = `${local.slice(0, 2)}***@${domain}`;
          } else if (key === 'accountNumber' || key === 'iban') {
            maskedDetails[key] = `****${value.slice(-4)}`;
          } else {
            maskedDetails[key] = value;
          }
        }
      }
      return {
        id: m.id,
        method: m.method,
        isActive: m.isActive,
        details: maskedDetails,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      };
    } catch {
      return {
        id: m.id,
        method: m.method,
        isActive: m.isActive,
        details: {},
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      };
    }
  });

  return successResponse({ methods: maskedMethods });
}

// POST /api/v1/ppn/partner/payout-methods - Add payout method
export async function POST(request: NextRequest) {
  const session = await checkPartner();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Partner access required', 401);
  }

  const partnerId = session.user.partnerId!;

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = createPayoutMethodSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const { method, details } = validation.data;

  // Validate details based on method
  if (method === 'stripe') {
    const stripeValidation = stripeDetailsSchema.safeParse(details);
    if (!stripeValidation.success) {
      return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid Stripe details', 400);
    }
  } else if (method === 'wise') {
    const wiseValidation = wiseDetailsSchema.safeParse(details);
    if (!wiseValidation.success) {
      return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid Wise details', 400);
    }
  } else if (method === 'bank') {
    const bankValidation = bankDetailsSchema.safeParse(details);
    if (!bankValidation.success) {
      return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid bank details', 400);
    }
  }

  // Deactivate existing methods of the same type
  await prisma.payoutMethod.updateMany({
    where: { partnerId, method },
    data: { isActive: false },
  });

  // Create new method
  const payoutMethod = await prisma.payoutMethod.create({
    data: {
      partnerId,
      method,
      detailsEncryptedJson: encrypt(JSON.stringify(details)),
      isActive: true,
    },
    select: {
      id: true,
      method: true,
      isActive: true,
      createdAt: true,
    },
  });

  return successResponse({ payoutMethod }, undefined, 201);
}

// DELETE /api/v1/ppn/partner/payout-methods - Delete payout method
export async function DELETE(request: NextRequest) {
  const session = await checkPartner();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Partner access required', 401);
  }

  const partnerId = session.user.partnerId!;

  const { searchParams } = new URL(request.url);
  const methodId = searchParams.get('id');

  if (!methodId) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Method ID required', 400);
  }

  const existing = await prisma.payoutMethod.findFirst({
    where: { id: methodId, partnerId },
  });

  if (!existing) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Payout method not found', 404);
  }

  await prisma.payoutMethod.delete({
    where: { id: methodId },
  });

  return successResponse({ deleted: true });
}
