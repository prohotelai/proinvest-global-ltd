import { NextRequest } from 'next/server';
import { prisma } from '@/lib/ppn/db';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';

export const runtime = 'nodejs';

/**
 * POST /api/v1/ppn/admin/promote
 * 
 * One-time admin promotion endpoint.
 * Requires a secret key to prevent unauthorized access.
 * 
 * SECURITY: Delete this file after use!
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  
  const { email, secret } = body;
  
  // Require the promotion secret (set in env var)
  const promotionSecret = process.env.ADMIN_PROMOTION_SECRET || process.env.PPN_CRON_SECRET;
  
  if (!secret || secret !== promotionSecret) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Invalid secret', 401);
  }
  
  if (!email) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Email required', 400);
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      return errorResponse(ErrorCodes.NOT_FOUND, 'User not found', 404);
    }
    
    const updated = await prisma.user.update({
      where: { email },
      data: { role: 'admin' },
    });
    
    return successResponse({
      message: 'User promoted to admin',
      email: updated.email,
      role: updated.role,
    });
  } catch (error) {
    console.error('Promotion error:', error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, 'Failed to promote user', 500);
  }
}
