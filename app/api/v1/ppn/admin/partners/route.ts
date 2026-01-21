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

const updatePartnerSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'suspended']).optional(),
  tierId: z.string().uuid().nullable().optional(),
  type: z.enum(['referral', 'affiliate']).optional(),
  isGlobal: z.boolean().optional(),
  allowedCountries: z.array(z.string().length(2)).optional(),
  blockedCountries: z.array(z.string().length(2)).optional(),
});

const setCommissionSchema = z.object({
  partnerId: z.string().uuid(),
  productId: z.string().uuid(),
  planId: z.string().uuid().nullable().optional(),
  percent: z.number().min(5).max(30),
});

// GET /api/v1/ppn/admin/partners - List all partners
export async function GET(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');

  const partners = await prisma.partner.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(type ? { type } : {}),
    },
    include: {
      user: {
        select: { id: true, email: true, name: true, createdAt: true },
      },
      tier: true,
      commissionOverrides: {
        include: {
          product: { select: { name: true, slug: true } },
          plan: { select: { name: true, planKey: true } },
        },
      },
      _count: {
        select: {
          clicks: true,
          attributions: true,
          commissionEntries: true,
          payoutRequests: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return successResponse({ partners });
}

// PATCH /api/v1/ppn/admin/partners - Update partner
export async function PATCH(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const partnerId = searchParams.get('id');

  if (!partnerId) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Partner ID required', 400);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = updatePartnerSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  // Check partner exists
  const existing = await prisma.partner.findUnique({
    where: { id: partnerId },
  });

  if (!existing) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Partner not found', 404);
  }

  // Build update data
  const updateData: Record<string, unknown> = {};
  if (data.status !== undefined) {
    updateData.status = data.status;
    if (data.status === 'approved' && existing.status === 'pending') {
      updateData.approvalModeUsed = 'manual';
    }
  }
  if (data.tierId !== undefined) updateData.tierId = data.tierId;
  if (data.type !== undefined) updateData.type = data.type;
  if (data.isGlobal !== undefined) updateData.isGlobal = data.isGlobal;
  if (data.allowedCountries !== undefined) {
    updateData.allowedCountries = JSON.stringify(data.allowedCountries);
  }
  if (data.blockedCountries !== undefined) {
    updateData.blockedCountries = JSON.stringify(data.blockedCountries);
  }

  const partner = await prisma.partner.update({
    where: { id: partnerId },
    data: updateData,
    include: {
      user: { select: { email: true, name: true } },
      tier: true,
    },
  });

  return successResponse({ partner });
}

// POST /api/v1/ppn/admin/partners/commission - Set commission override
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

  const validation = setCommissionSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  // Verify partner exists
  const partner = await prisma.partner.findUnique({
    where: { id: data.partnerId },
  });

  if (!partner) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Partner not found', 404);
  }

  // Verify product exists
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Product not found', 404);
  }

  // Upsert commission override
  const override = await prisma.partnerCommissionOverride.upsert({
    where: {
      partnerId_productId_planId: {
        partnerId: data.partnerId,
        productId: data.productId,
        planId: data.planId || null,
      },
    },
    update: {
      percent: data.percent,
      setByAdminId: session.user.id,
      effectiveFrom: new Date(),
    },
    create: {
      partnerId: data.partnerId,
      productId: data.productId,
      planId: data.planId || null,
      percent: data.percent,
      setByAdminId: session.user.id,
    },
    include: {
      product: { select: { name: true } },
      plan: { select: { name: true } },
    },
  });

  return successResponse({ override }, undefined, 201);
}
