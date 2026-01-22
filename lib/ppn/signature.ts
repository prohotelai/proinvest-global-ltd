import { createHmac, createHash } from 'crypto';
import { NextRequest } from 'next/server';
import { prisma } from './db';

export interface VerificationResult {
  valid: boolean;
  error?: string;
  productId?: string;
  eventId?: string;
  timestamp?: number;
}

/**
 * Verify HMAC signature for incoming webhook events
 * 
 * Signing string format: v1.<timestamp>.<event_id>.<raw_body>
 * Signature header format: X-PPN-Signature: v1=<hex_hmac_sha256>
 */
export async function verifySignature(
  request: NextRequest,
  rawBody: string
): Promise<VerificationResult> {
  const productId = request.headers.get('X-PPN-Product-Id');
  const timestamp = request.headers.get('X-PPN-Timestamp');
  const eventId = request.headers.get('X-PPN-Event-Id');
  const signature = request.headers.get('X-PPN-Signature');

  // Check required headers
  if (!productId) {
    return { valid: false, error: 'Missing X-PPN-Product-Id header' };
  }
  if (!timestamp) {
    return { valid: false, error: 'Missing X-PPN-Timestamp header' };
  }
  if (!eventId) {
    return { valid: false, error: 'Missing X-PPN-Event-Id header' };
  }
  if (!signature) {
    return { valid: false, error: 'Missing X-PPN-Signature header' };
  }

  // Parse timestamp and check for replay attack (300 seconds window)
  const timestampNum = parseInt(timestamp, 10);
  if (isNaN(timestampNum)) {
    return { valid: false, error: 'Invalid timestamp format' };
  }

  const now = Math.floor(Date.now() / 1000);
  const timeDiff = Math.abs(now - timestampNum);
  if (timeDiff > 300) {
    return { valid: false, error: 'Request timestamp outside acceptable window (replay protection)' };
  }

  // Get product and its webhook secret
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { webhookSecret: true, status: true },
  });

  if (!product) {
    return { valid: false, error: 'Product not found' };
  }

  if (product.status !== 'active') {
    return { valid: false, error: 'Product is not active' };
  }

  // Compute expected signature
  // Signing string: v1.<timestamp>.<event_id>.<raw_body>
  const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
  const expectedSignature = createHmac('sha256', product.webhookSecret)
    .update(signingString)
    .digest('hex');

  // Parse signature header (format: v1=<hex>)
  const signatureParts = signature.split('=');
  if (signatureParts.length !== 2 || signatureParts[0] !== 'v1') {
    return { valid: false, error: 'Invalid signature format' };
  }

  const providedSignature = signatureParts[1];

  // Constant-time comparison to prevent timing attacks
  if (!timingSafeEqual(expectedSignature, providedSignature)) {
    return { valid: false, error: 'Invalid signature' };
  }

  return {
    valid: true,
    productId,
    eventId,
    timestamp: timestampNum,
  };
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Generate SHA256 hash of the raw body for idempotency
 */
export function hashBody(rawBody: string): string {
  return createHash('sha256').update(rawBody).digest('hex');
}

/**
 * Check if an event has already been processed (idempotency)
 */
export async function checkIdempotency(
  eventId: string,
  _productId: string
): Promise<{ isDuplicate: boolean; existingEvent?: { status: string; receivedAt: Date } }> {
  const existingEvent = await prisma.eventLog.findUnique({
    where: { id: eventId },
    select: { status: true, receivedAt: true },
  });

  if (existingEvent) {
    return { isDuplicate: true, existingEvent };
  }

  return { isDuplicate: false };
}

/**
 * Log an event for idempotency tracking
 */
export async function logEvent(
  eventId: string,
  productId: string,
  type: string,
  occurredAt: Date,
  rawBodyHash: string,
  status: 'processed' | 'duplicate' | 'failed' = 'processed',
  errorMessage?: string
): Promise<void> {
  await prisma.eventLog.create({
    data: {
      id: eventId,
      productId,
      type,
      occurredAt,
      rawBodyHash,
      status,
      errorMessage,
    },
  });
}

/**
 * Generate a signature for testing purposes
 */
export function generateSignature(
  webhookSecret: string,
  timestamp: number,
  eventId: string,
  rawBody: string
): string {
  const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
  return 'v1=' + createHmac('sha256', webhookSecret)
    .update(signingString)
    .digest('hex');
}
