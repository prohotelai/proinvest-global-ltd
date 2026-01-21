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

const createAssetSchema = z.object({
  productId: z.string().uuid(),
  type: z.enum(['banner', 'widget', 'pdf', 'video', 'copy']),
  title: z.string().min(1),
  fileUrl: z.string().url(),
  size: z.string().optional(),
  language: z.string().default('en'),
});

const updateAssetSchema = createAssetSchema.partial().extend({
  active: z.boolean().optional(),
});

// GET /api/v1/ppn/admin/assets - List all assets
export async function GET(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const type = searchParams.get('type');

  const where: Record<string, unknown> = {};
  if (productId) where.productId = productId;
  if (type) where.type = type;

  const assets = await prisma.assetLibrary.findMany({
    where,
    include: {
      product: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return successResponse({ assets });
}

// POST /api/v1/ppn/admin/assets - Create asset
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

  const validation = createAssetSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  // Verify product exists
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Product not found', 404);
  }

  const asset = await prisma.assetLibrary.create({
    data: {
      productId: data.productId,
      type: data.type,
      title: data.title,
      fileUrl: data.fileUrl,
      size: data.size,
      language: data.language,
    },
    include: {
      product: { select: { name: true } },
    },
  });

  return successResponse({ asset }, undefined, 201);
}

// PATCH /api/v1/ppn/admin/assets - Update asset
export async function PATCH(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get('id');

  if (!assetId) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Asset ID required', 400);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = updateAssetSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  const existing = await prisma.assetLibrary.findUnique({
    where: { id: assetId },
  });

  if (!existing) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Asset not found', 404);
  }

  const asset = await prisma.assetLibrary.update({
    where: { id: assetId },
    data,
    include: {
      product: { select: { name: true } },
    },
  });

  return successResponse({ asset });
}

// DELETE /api/v1/ppn/admin/assets - Delete asset
export async function DELETE(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get('id');

  if (!assetId) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Asset ID required', 400);
  }

  const existing = await prisma.assetLibrary.findUnique({
    where: { id: assetId },
  });

  if (!existing) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Asset not found', 404);
  }

  await prisma.assetLibrary.delete({
    where: { id: assetId },
  });

  return successResponse({ deleted: true });
}
