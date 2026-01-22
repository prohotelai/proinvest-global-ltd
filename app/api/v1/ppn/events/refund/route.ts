import { NextRequest } from 'next/server';
import { prisma } from '@/lib/ppn/db';
import { verifySignature, checkIdempotency, logEvent, hashBody } from '@/lib/ppn/signature';
import { checkRateLimit, addRateLimitHeaders } from '@/lib/ppn/rate-limit';
import { refundEventSchema } from '@/lib/ppn/schemas';
import { handleRefund } from '@/lib/ppn/commission-engine';
import {
  successResponse,
  errorResponse,
  rateLimitedError,
  duplicateEventResponse,
  ErrorCodes,
} from '@/lib/ppn/api-response';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  
  // Verify signature
  const verification = await verifySignature(request, rawBody);
  if (!verification.valid) {
    return errorResponse(ErrorCodes.INVALID_SIGNATURE, verification.error || 'Invalid signature', 401);
  }

  const { productId, eventId } = verification;

  // Check rate limit
  const rateLimit = checkRateLimit(productId!);
  if (!rateLimit.allowed) {
    return addRateLimitHeaders(rateLimitedError(), rateLimit.remaining, rateLimit.resetAt);
  }

  // Check idempotency
  const idempotency = await checkIdempotency(eventId!, productId!);
  if (idempotency.isDuplicate) {
    return duplicateEventResponse(eventId!);
  }

  // Parse and validate body
  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    await logEvent(eventId!, productId!, 'refund', new Date(), hashBody(rawBody), 'failed', 'Invalid JSON');
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = refundEventSchema.safeParse(body);
  if (!validation.success) {
    await logEvent(eventId!, productId!, 'refund', new Date(), hashBody(rawBody), 'failed', validation.error.message);
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  try {
    // Handle refund/chargeback
    const refundResult = await handleRefund(
      data.external_invoice_id,
      data.amount_refunded,
      data.reason
    );

    // Log successful event
    await logEvent(eventId!, productId!, 'refund', new Date(data.occurred_at), hashBody(rawBody), 'processed');

    const response = successResponse({
      external_invoice_id: data.external_invoice_id,
      amount_refunded: data.amount_refunded,
      commissions_voided: refundResult.voided,
      commissions_clawed_back: refundResult.clawedBack,
      errors: refundResult.errors.length > 0 ? refundResult.errors : undefined,
    }, eventId);
    return addRateLimitHeaders(response, rateLimit.remaining, rateLimit.resetAt);
  } catch (error) {
    console.error('Error processing refund event:', error);
    await logEvent(eventId!, productId!, 'refund', new Date(data.occurred_at), hashBody(rawBody), 'failed', String(error));
    return errorResponse(ErrorCodes.INTERNAL_ERROR, 'Failed to process refund event', 500);
  }
}
