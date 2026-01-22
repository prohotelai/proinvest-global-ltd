import { NextRequest } from 'next/server';
import { auth } from '@/lib/ppn/auth';
import { prisma } from '@/lib/ppn/db';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';
import { generateWebhookSecret } from '@/lib/ppn/utils';
import { z } from 'zod';

export const runtime = 'nodejs';

// Middleware to check admin access
async function checkAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }
  return session;
}

const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  domain: z.string().min(1),
  defaultLandingUrl: z.string().url().optional(),
  pricingUrl: z.string().url().optional(),
});

const updateProductSchema = createProductSchema.partial().extend({
  status: z.enum(['active', 'inactive']).optional(),
  regenerateSecret: z.boolean().optional(),
});

// GET /api/v1/ppn/admin/products - List all products
export async function GET() {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const products = await prisma.product.findMany({
    include: {
      plans: true,
      _count: {
        select: {
          clicks: true,
          attributions: true,
          commissionEntries: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return successResponse({
    products: products.map(p => ({
      ...p,
      webhookSecret: '****' + p.webhookSecret.slice(-4), // Hide most of secret
    })),
  });
}

// POST /api/v1/ppn/admin/products - Create a new product
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

  const validation = createProductSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  // Check for duplicate slug
  const existing = await prisma.product.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Product with this slug already exists', 400);
  }

  // Create product with generated webhook secret
  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      domain: data.domain,
      webhookSecret: generateWebhookSecret(),
      defaultLandingUrl: data.defaultLandingUrl,
      pricingUrl: data.pricingUrl,
    },
  });

  return successResponse({ product }, undefined, 201);
}

// PATCH /api/v1/ppn/admin/products - Update a product
export async function PATCH(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('id');

  if (!productId) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Product ID required', 400);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = updateProductSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  // Check product exists
  const existing = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!existing) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Product not found', 404);
  }

  // Update product
  const updateData: Record<string, unknown> = {};
  if (data.name) updateData.name = data.name;
  if (data.slug) updateData.slug = data.slug;
  if (data.domain) updateData.domain = data.domain;
  if (data.defaultLandingUrl !== undefined) updateData.defaultLandingUrl = data.defaultLandingUrl;
  if (data.pricingUrl !== undefined) updateData.pricingUrl = data.pricingUrl;
  if (data.status) updateData.status = data.status;
  if (data.regenerateSecret) updateData.webhookSecret = generateWebhookSecret();

  const product = await prisma.product.update({
    where: { id: productId },
    data: updateData,
  });

  return successResponse({
    product: {
      ...product,
      webhookSecret: data.regenerateSecret ? product.webhookSecret : '****' + product.webhookSecret.slice(-4),
    },
  });
}

// DELETE /api/v1/ppn/admin/products - Delete a product
export async function DELETE(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Admin access required', 401);
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('id');

  if (!productId) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Product ID required', 400);
  }

  // Check product exists
  const existing = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      _count: {
        select: { commissionEntries: true },
      },
    },
  });

  if (!existing) {
    return errorResponse(ErrorCodes.NOT_FOUND, 'Product not found', 404);
  }

  if (existing._count.commissionEntries > 0) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      'Cannot delete product with existing commissions. Set to inactive instead.',
      400
    );
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  return successResponse({ deleted: true });
}
