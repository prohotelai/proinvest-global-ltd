# ProcafeAI → PPN Integration Guide (Slug-Based Auth)

## Quick Start

Your ProcafeAI integration can now authenticate with PPN using the product slug `procafeai` instead of a UUID.

## Before (Not Working)
```javascript
// ProcafeAI was sending this but getting 401 errors
headers: {
  'X-PPN-Product-Slug': 'procafeai'
}
body: {
  product_slug: 'procafeai'
}
// Result: 401 {"error":{"code":"INVALID_SIGNATURE","message":"Product not found"}}
```

## After (Now Working ✅)
```javascript
// Same request now works!
headers: {
  'X-PPN-Product-Slug': 'procafeai'
}
body: {
  product_slug: 'procafeai'
}
// Result: 200 {"ok": true}
```

## Complete Integration Example

```javascript
const crypto = require('crypto');

// Configuration
const PRODUCT_SLUG = 'procafeai';
const WEBHOOK_SECRET = 'your-webhook-secret-from-ppn-admin';
const PPN_API_BASE = 'https://proinvest.global/api/v1/ppn';

/**
 * Send event to PPN
 */
async function sendPPNEvent(eventType, eventData) {
  const timestamp = Math.floor(Date.now() / 1000);
  const eventId = crypto.randomUUID();
  
  // Add product_slug to body as fallback
  const body = {
    ...eventData,
    product_slug: PRODUCT_SLUG,
    occurred_at: eventData.occurred_at || new Date().toISOString(),
  };
  
  const rawBody = JSON.stringify(body);
  
  // Generate signature
  const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
  const signature = 'v1=' + crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(signingString)
    .digest('hex');
  
  // Set headers
  const headers = {
    'Content-Type': 'application/json',
    'X-PPN-Product-Slug': PRODUCT_SLUG,  // Primary method (recommended)
    'X-PPN-Timestamp': String(timestamp),
    'X-PPN-Event-Id': eventId,
    'X-PPN-Signature': signature,
    'Idempotency-Key': eventId,
  };
  
  // Send request
  const response = await fetch(`${PPN_API_BASE}/events/${eventType}`, {
    method: 'POST',
    headers,
    body: rawBody,
  });
  
  const result = await response.json();
  
  if (!result.ok) {
    console.error(`PPN ${eventType} event failed:`, result.error);
  }
  
  return result;
}

/**
 * Track user signup
 */
async function trackSignup(customerId, partnerCode) {
  return sendPPNEvent('signup', {
    external_customer_id: customerId,
    ppn_ref: partnerCode,  // Optional: partner referral code
  });
}

/**
 * Track subscription start
 */
async function trackSubscriptionStart(customerId, subscriptionId, planKey) {
  return sendPPNEvent('subscription_started', {
    external_customer_id: customerId,
    external_subscription_id: subscriptionId,
    plan_key: planKey,  // e.g., 'starter', 'pro', 'enterprise'
    billing_cycle: 'monthly',  // or 'annual'
  });
}

/**
 * Track invoice payment (generates commission)
 */
async function trackInvoicePaid(customerId, subscriptionId, invoiceId, amount, planKey) {
  return sendPPNEvent('invoice_paid', {
    external_customer_id: customerId,
    external_subscription_id: subscriptionId,
    external_invoice_id: invoiceId,
    plan_key: planKey,
    billing_cycle: 'monthly',
    amount_paid: amount,
    currency: 'USD',
  });
}

/**
 * Track subscription cancellation
 */
async function trackSubscriptionCanceled(customerId, subscriptionId) {
  return sendPPNEvent('subscription_canceled', {
    external_customer_id: customerId,
    external_subscription_id: subscriptionId,
  });
}

/**
 * Track refund (voids commissions)
 */
async function trackRefund(customerId, subscriptionId, invoiceId, amount) {
  return sendPPNEvent('refund', {
    external_customer_id: customerId,
    external_subscription_id: subscriptionId,
    external_invoice_id: invoiceId,
    amount_refunded: amount,
    currency: 'USD',
  });
}

// Example usage
async function main() {
  // When user signs up
  await trackSignup('customer_123', 'CAFE001');
  
  // When subscription starts
  await trackSubscriptionStart('customer_123', 'sub_abc123', 'pro');
  
  // When invoice is paid (this creates commission)
  await trackInvoicePaid('customer_123', 'sub_abc123', 'inv_xyz789', 29.99, 'pro');
  
  // If subscription is canceled
  await trackSubscriptionCanceled('customer_123', 'sub_abc123');
  
  // If refund issued
  await trackRefund('customer_123', 'sub_abc123', 'inv_xyz789', 29.99);
}
```

## Error Handling

```javascript
const result = await sendPPNEvent('signup', data);

if (!result.ok) {
  const { code, message } = result.error;
  
  switch (code) {
    case 'PRODUCT_NOT_FOUND':
      // Product slug doesn't exist in PPN
      // Check: Is 'procafeai' correctly set up in PPN Admin?
      console.error('Product not found:', PRODUCT_SLUG);
      break;
      
    case 'INVALID_SIGNATURE':
      // Webhook secret is wrong
      // Check: Is WEBHOOK_SECRET correct?
      console.error('Invalid signature - check webhook secret');
      break;
      
    case 'VALIDATION_ERROR':
      // Event data validation failed
      // Check: Are all required fields present?
      console.error('Validation error:', message);
      break;
      
    case 'EVENT_DUPLICATE':
      // Event already processed (idempotent)
      // This is actually OK - means event was received before
      console.log('Duplicate event (already processed)');
      break;
      
    case 'RATE_LIMITED':
      // Too many requests
      // Implement exponential backoff
      console.error('Rate limited - retry later');
      break;
      
    default:
      console.error('PPN error:', code, message);
  }
}
```

## Configuration Checklist

- [ ] Product slug: `procafeai` exists in PPN database
- [ ] Product status: `active`
- [ ] Webhook secret configured in your environment
- [ ] PPN API endpoint accessible from your servers
- [ ] All required event fields included in payloads
- [ ] Error handling implemented
- [ ] Idempotency: Using unique `eventId` for each event

## Testing

```bash
# Test with curl
curl -X POST https://proinvest.global/api/v1/ppn/events/signup \
  -H "Content-Type: application/json" \
  -H "X-PPN-Product-Slug: procafeai" \
  -H "X-PPN-Timestamp: $(date +%s)" \
  -H "X-PPN-Event-Id: $(uuidgen)" \
  -H "X-PPN-Signature: v1=<computed_signature>" \
  -d '{
    "external_customer_id": "test_customer",
    "product_slug": "procafeai",
    "occurred_at": "2026-01-24T00:00:00Z"
  }'
```

## Common Issues

### 404 PRODUCT_NOT_FOUND
- **Cause:** Product slug doesn't exist in database
- **Fix:** Verify product in PPN Admin UI or database: `SELECT * FROM Product WHERE slug = 'procafeai'`

### 401 INVALID_SIGNATURE
- **Cause:** Wrong webhook secret
- **Fix:** Get correct secret from PPN Admin UI → Products → ProcafeAI → Webhook Secret

### 403 PRODUCT_INACTIVE
- **Cause:** Product exists but status is not 'active'
- **Fix:** Activate product in PPN Admin UI

### 401 REPLAY_DETECTED
- **Cause:** Timestamp is more than 5 minutes old
- **Fix:** Ensure server time is synchronized (NTP)

## Support

- API Documentation: `/docs/ppn-api-spec-v1.md`
- Implementation Details: `/docs/ppn-product-slug-implementation.md`
- Test Script: `node scripts/test-product-slug-auth.mjs`
