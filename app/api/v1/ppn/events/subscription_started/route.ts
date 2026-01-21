import { NextRequest } from 'next/server';
import { prisma } from '@/lib/ppn/db';
import { verifySignature, checkIdempotency, logEvent, hashBody } from '@/lib/ppn/signature';
import { checkRateLimit, addRateLimitHeaders } from '@/lib/ppn/rate-limit';
import { subscriptionStartedSchema } from '@/lib/ppn/schemas';
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
    await logEvent(eventId!, productId!, 'subscription_started', new Date(), hashBody(rawBody), 'failed', 'Invalid JSON');
    return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid JSON body', 400);
  }

  const validation = subscriptionStartedSchema.safeParse(body);
  if (!validation.success) {
    await logEvent(eventId!, productId!, 'subscription_started', new Date(), hashBody(rawBody), 'failed', validation.error.message);
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      400
    );
  }

  const data = validation.data;

  try {
    // Check if attribution exists for this customer
    let attribution = await prisma.attribution.findUnique({
      where: {
        productId_externalCustomerId: {
          productId: productId!,
          externalCustomerId: data.external_customer_id,
        },
      },
    });

    // If no attribution exists but ppn_ref or click_id provided, create one
    if (!attribution && (data.ppn_ref || data.click_id)) {
      let partnerId: string | null = null;
      let clickId: string | null = data.click_id || null;
      let attributionType = 'api';

      if (data.ppn_ref) {
        const partner = await prisma.partner.findUnique({
          where: { partnerCode: data.ppn_ref },
          select: { id: true, status: true },
        });
        if (partner && partner.status === 'approved') {
          partnerId = partner.id;
        }
      }

      if (!partnerId && data.click_id) {
        const click = await prisma.click.findUnique({
          where: { id: data.click_id },
          select: { partnerId: true },
        });
        if (click) {
          partnerId = click.partnerId;
          attributionType = 'cookie';
        }
      }

      if (partnerId) {
        attribution = await prisma.attribution.create({
          data: {
            productId: productId!,
            externalCustomerId: data.external_customer_id,
            partnerId,
            clickId,
            attributionType,
          },
        });
      }
    }

    // Log successful event
    await logEvent(eventId!, productId!, 'subscription_started', new Date(data.occurred_at), hashBody(rawBody), 'processed');

    const response = successResponse({
      external_customer_id: data.external_customer_id,
      external_subscription_id: data.external_subscription_id,
      attributed: !!attribution,
      is_trial: data.is_trial,
    }, eventId);
    return addRateLimitHeaders(response, rateLimit.remaining, rateLimit.resetAt);
  } catch (error) {
    console.error('Error processing subscription_started event:', error);
    await logEvent(eventId!, productId!, 'subscription_started', new Date(data.occurred_at), hashBody(rawBody), 'failed', String(error));
    return errorResponse(ErrorCodes.INTERNAL_ERROR, 'Failed to process subscription_started event', 500);
  }
}
