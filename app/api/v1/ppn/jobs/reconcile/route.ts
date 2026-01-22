import { NextRequest } from 'next/server';
import { reconcilePendingCommissions } from '@/lib/ppn/commission-engine';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';

export const runtime = 'nodejs';

const CRON_SECRET = process.env.PPN_CRON_SECRET;

export async function POST(request: NextRequest) {
  // Verify cron secret is configured
  if (!CRON_SECRET) {
    console.error('PPN_CRON_SECRET not configured');
    return errorResponse(
      ErrorCodes.CRON_NOT_CONFIGURED,
      'PPN_CRON_SECRET environment variable is not set',
      503
    );
  }

  // Verify authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Missing or invalid Authorization header', 401);
  }

  const token = authHeader.substring(7);
  if (token !== CRON_SECRET) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Invalid cron secret', 401);
  }

  try {
    // Run reconciliation
    const result = await reconcilePendingCommissions();

    return successResponse({
      processed: result.processed,
      errors: result.errors.length > 0 ? result.errors : undefined,
      ran_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error running reconciliation:', error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, 'Failed to run reconciliation', 500);
  }
}
