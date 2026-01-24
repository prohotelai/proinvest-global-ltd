import { NextRequest } from 'next/server';
import { prisma } from '@/lib/ppn/db';
import { verifySignature, checkIdempotency, logEvent, hashBody } from '@/lib/ppn/signature';
import { checkRateLimit, addRateLimitHeaders } from '@/lib/ppn/rate-limit';
import { clickEventSchema } from '@/lib/ppn/schemas';
import {
  successResponse,
  errorResponse,
  rateLimitedError,
  duplicateEventResponse,
  ErrorCodes,
} from '@/lib/ppn/api-response';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  // Get raw body for signature verification
  const rawBody = await request.text();
  
  // Verify signature
  const verification = await verifySignature(request, rawBody);
  if (!verification.valid) {
    const errorCode = verification.errorCode || ErrorCodes.INVALID_SIGNATURE;
    const statusCode = errorCode === 'PRODUCT_NOT_FOUND' ? 404 : 401;
    return errorResponse(errorCode, verification.error || 'Verification failed', statusCode);
  }

  const { productId, eventId, timestamp: _timestamp } = verification;

  // Check rate limit
  const rateLimit = checkRateLimit(productId!);
  if (!rateLimit.allowed) {
    const response = rateLimitedError();
    return addRateLimitHeaders(response, rateLimit.remaining, rateLimit.resetAt);
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
    await logEvent(eventId!, productId!, 'click', new Date(), hashBody(rawBody), 'failed', 'Invalid JSON');
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = clickEventSchema.safeParse(body);
  if (!validation.success) {
    await logEvent(eventId!, productId!, 'click', new Date(), hashBody(rawBody), 'failed', validation.error.message);
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  // Find partner by ppn_ref (partner code)
  const partner = await prisma.partner.findUnique({
    where: { partnerCode: data.ppn_ref },
    select: { id: true, status: true },
  });

  if (!partner) {
    await logEvent(eventId!, productId!, 'click', new Date(data.occurred_at), hashBody(rawBody), 'failed', 'Partner not found');
    return errorResponse(ErrorCodes.PARTNER_NOT_FOUND, 'Partner not found', 404);
  }

  if (partner.status !== 'approved') {
    await logEvent(eventId!, productId!, 'click', new Date(data.occurred_at), hashBody(rawBody), 'failed', 'Partner not approved');
    return errorResponse(ErrorCodes.PARTNER_NOT_APPROVED, 'Partner is not approved', 403);
  }

  try {
    // Create click record
    await prisma.click.create({
      data: {
        id: data.click_id,
        productId: productId!,
        partnerId: partner.id,
        landingUrl: data.landing_url,
        occurredAt: new Date(data.occurred_at),
        ip: data.ip,
        userAgent: data.user_agent,
        utm: data.utm ? JSON.stringify(data.utm) : null,
      },
    });

    // Log successful event
    await logEvent(eventId!, productId!, 'click', new Date(data.occurred_at), hashBody(rawBody), 'processed');

    const response = successResponse({ click_id: data.click_id }, eventId);
    return addRateLimitHeaders(response, rateLimit.remaining, rateLimit.resetAt);
  } catch (error) {
    console.error('Error processing click event:', error);
    await logEvent(eventId!, productId!, 'click', new Date(data.occurred_at), hashBody(rawBody), 'failed', String(error));
    return errorResponse(ErrorCodes.INTERNAL_ERROR, 'Failed to process click event', 500);
  }
}
