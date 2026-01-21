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

const createTierSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

const updateTierSchema = createTierSchema.partial();

// GET /api/v1/ppn/admin/tiers - List all tiers
export async function GET() {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const tiers = await prisma.tier.findMany({
    include: {
      _count: {
        select: { partners: true },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  return successResponse({ tiers });
}

// POST /api/v1/ppn/admin/tiers - Create tier
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

  const validation = createTierSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  // Check for duplicate name
  const existing = await prisma.tier.findUnique({
    where: { name: data.name },
  });

  if (existing) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Tier with this name already exists', 400);
  }

  const tier = await prisma.tier.create({
    data: {
      name: data.name,
      description: data.description,
      sortOrder: data.sortOrder,
    },
  });

  return successResponse({ tier }, undefined, 201);
}

// PATCH /api/v1/ppn/admin/tiers - Update tier
export async function PATCH(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const tierId = searchParams.get('id');

  if (!tierId) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Tier ID required', 400);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = updateTierSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const existing = await prisma.tier.findUnique({
    where: { id: tierId },
  });

  if (!existing) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Tier not found', 404);
  }

  const tier = await prisma.tier.update({
    where: { id: tierId },
    data: validation.data,
  });

  return successResponse({ tier });
}

// DELETE /api/v1/ppn/admin/tiers - Delete tier
export async function DELETE(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const tierId = searchParams.get('id');

  if (!tierId) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Tier ID required', 400);
  }

  const existing = await prisma.tier.findUnique({
    where: { id: tierId },
    include: {
      _count: { select: { partners: true } },
    },
  });

  if (!existing) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Tier not found', 404);
  }

  if (existing._count.partners > 0) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      'Cannot delete tier with assigned partners',
      400
    );
  }

  await prisma.tier.delete({
    where: { id: tierId },
  });

  return successResponse({ deleted: true });
}
