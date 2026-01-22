import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/ppn/db';
import { generatePartnerCode } from '@/lib/ppn/utils';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';
import { z } from 'zod';

export const runtime = 'nodejs';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  country: z.string().length(2).optional(),
  type: z.enum(['referral', 'affiliate']).default('referral'),
});

// POST /api/v1/ppn/auth/signup - Partner signup
export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = signupSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Email already registered', 400);
  }

  // Hash password
  const passwordHash = await bcrypt.hash(data.password, 12);

  // Generate unique partner code
  let partnerCode = generatePartnerCode();
  let codeExists = true;
  let attempts = 0;
  while (codeExists && attempts < 10) {
    const existing = await prisma.partner.findUnique({
      where: { partnerCode },
    });
    if (!existing) {
      codeExists = false;
    } else {
      partnerCode = generatePartnerCode();
      attempts++;
    }
  }

  if (codeExists) {
    return errorResponse(ErrorCodes.INTERNAL_ERROR, 'Failed to generate partner code', 500);
  }

  // Create user and partner
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      name: data.name,
      role: 'partner',
      partner: {
        create: {
          partnerCode,
          type: data.type,
          status: 'pending',
          country: data.country,
        },
      },
    },
    include: {
      partner: true,
    },
  });

  return successResponse({
    message: 'Registration successful. Your application is pending approval.',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    partner: {
      id: user.partner!.id,
      partnerCode: user.partner!.partnerCode,
      status: user.partner!.status,
    },
  }, undefined, 201);
}
