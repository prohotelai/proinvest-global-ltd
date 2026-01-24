# ProInvest Partner Network (PPN) API Specification v1

## Overview

The PPN API allows product integrations to send events for tracking partner referrals, attributions, and commissions.

**Base URL:** `/api/v1/ppn`

## Authentication

All event endpoints require HMAC signature authentication.

### Product Identification

You can identify your product in one of three ways (in order of priority):

1. **X-PPN-Product-Id** header (UUID) - Legacy method, still supported
2. **X-PPN-Product-Slug** header (string) - **Recommended** for new integrations
3. **product_slug** field in request body (string) - Fallback option

**Note:** If multiple identifiers are provided, the order above determines which one is used. For example, if both `X-PPN-Product-Id` and `X-PPN-Product-Slug` are present, the Product-Id will be used.

### Required Headers

| Header | Description | Required |
|--------|-------------|----------|
| `Content-Type` | `application/json` | Yes |
| `X-PPN-Product-Id` | Your product's UUID | No* |
| `X-PPN-Product-Slug` | Your product's slug (e.g., "procafeai") | No* |
| `X-PPN-Timestamp` | Unix timestamp (seconds) | Yes |
| `X-PPN-Event-Id` | Unique event UUID (for idempotency) | Yes |
| `X-PPN-Signature` | HMAC signature | Yes |
| `Idempotency-Key` | Same as X-PPN-Event-Id | Yes |

\* At least one product identifier must be provided: `X-PPN-Product-Id`, `X-PPN-Product-Slug`, or `body.product_slug`

### Signature Generation

**Signing String Format:**
```
v1.<timestamp>.<event_id>.<raw_body>
```

**Signature Computation:**
```javascript
const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
const signature = 'v1=' + crypto
  .createHmac('sha256', webhookSecret)
  .update(signingString)
  .digest('hex');
```

**Replay Protection:**
- Requests with timestamps more than 300 seconds from current time are rejected

### Example Header Generation (Node.js)

**Using Product Slug (Recommended):**
```javascript
const crypto = require('crypto');

function generateHeaders(productSlug, webhookSecret, body) {
  const timestamp = Math.floor(Date.now() / 1000);
  const eventId = crypto.randomUUID();
  const rawBody = JSON.stringify(body);
  
  const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
  const signature = 'v1=' + crypto
    .createHmac('sha256', webhookSecret)
    .update(signingString)
    .digest('hex');
  
  return {
    'Content-Type': 'application/json',
    'X-PPN-Product-Slug': productSlug,  // e.g., 'procafeai'
    'X-PPN-Timestamp': String(timestamp),
    'X-PPN-Event-Id': eventId,
    'X-PPN-Signature': signature,
    'Idempotency-Key': eventId,
  };
}
```

**Using Product ID (Legacy):**
```javascript
function generateHeadersWithId(productId, webhookSecret, body) {
  const timestamp = Math.floor(Date.now() / 1000);
  const eventId = crypto.randomUUID();
  const rawBody = JSON.stringify(body);
  
  const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
  const signature = 'v1=' + crypto
    .createHmac('sha256', webhookSecret)
    .update(signingString)
    .digest('hex');
  
  return {
    'Content-Type': 'application/json',
    'X-PPN-Product-Id': productId,
    'X-PPN-Timestamp': String(timestamp),
    'X-PPN-Event-Id': eventId,
    'X-PPN-Signature': signature,
    'Idempotency-Key': eventId,
  };
}
```

---

## Response Format

### Success Response
```json
{
  "ok": true,
  "event_id": "uuid",
  "received_at": "2024-01-15T10:30:00.000Z",
  "data": { ... }
}
```

### Error Response
```json
{
  "ok": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_SIGNATURE` | 401 | Signature verification failed |
| `INVALID_SIGNATURE_FORMAT` | 401 | Signature header format is invalid |
| `MISSING_PRODUCT_IDENTIFIER` | 401 | No product identifier provided (ID, slug header, or body field) |
| `MISSING_TIMESTAMP` | 401 | X-PPN-Timestamp header missing |
| `MISSING_EVENT_ID` | 401 | X-PPN-Event-Id header missing |
| `MISSING_SIGNATURE` | 401 | X-PPN-Signature header missing |
| `INVALID_TIMESTAMP` | 401 | Timestamp format is invalid |
| `REPLAY_DETECTED` | 401 | Timestamp outside acceptable window (replay protection) |
| `PRODUCT_NOT_FOUND` | 404 | Product not found by ID or slug |
| `PRODUCT_INACTIVE` | 403 | Product exists but is not active |
| `PARTNER_NOT_FOUND` | 404 | Partner code not found |
| `PARTNER_NOT_APPROVED` | 403 | Partner is not approved |
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `EVENT_DUPLICATE` | 200 | Event already processed (idempotent) |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Events

### 1. Click Event

Track when a user clicks a partner's referral link.

**Endpoint:** `POST /api/v1/ppn/events/click`

**Request Body:**
```json
{
  "type": "click",
  "occurred_at": "2024-01-15T10:30:00.000Z",
  "ppn_ref": "PARTNER01",
  "click_id": "550e8400-e29b-41d4-a716-446655440000",
  "landing_url": "https://prohotelai.com/pricing",
  "ip": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "utm": {
    "source": "blog",
    "medium": "referral",
    "campaign": "summer2024",
    "content": "banner",
    "term": "hotel ai"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be "click" |
| `occurred_at` | ISO-8601 | Yes | When the click occurred |
| `ppn_ref` | string | Yes | Partner code |
| `click_id` | UUID | Yes | Unique click identifier |
| `landing_url` | URL | Yes | Landing page URL |
| `ip` | string | No | User's IP address |
| `user_agent` | string | No | User's browser user agent |
| `utm` | object | No | UTM parameters |

---

### 2. Signup Event

Track when a referred user creates an account.

**Endpoint:** `POST /api/v1/ppn/events/signup`

**Request Body:**
```json
{
  "type": "signup",
  "occurred_at": "2024-01-15T10:35:00.000Z",
  "ppn_ref": "PARTNER01",
  "click_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_customer_id": "cus_abc123",
  "email": "customer@example.com",
  "country": "US",
  "metadata": {
    "company_name": "Acme Hotels"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be "signup" |
| `occurred_at` | ISO-8601 | Yes | When signup occurred |
| `ppn_ref` | string | No | Partner code (if known) |
| `click_id` | UUID | No | Original click ID |
| `external_customer_id` | string | Yes | Your customer ID |
| `email` | string | Yes | Customer email |
| `country` | string | No | 2-letter country code |
| `metadata` | object | No | Additional data |

---

### 3. Subscription Started Event

Track when a customer starts a subscription.

**Endpoint:** `POST /api/v1/ppn/events/subscription_started`

**Request Body:**
```json
{
  "type": "subscription_started",
  "occurred_at": "2024-01-15T10:40:00.000Z",
  "external_customer_id": "cus_abc123",
  "external_subscription_id": "sub_xyz789",
  "plan_key": "professional",
  "billing_cycle": "monthly",
  "is_trial": true,
  "trial_ends_at": "2024-01-29T10:40:00.000Z",
  "ppn_ref": "PARTNER01",
  "click_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be "subscription_started" |
| `occurred_at` | ISO-8601 | Yes | When subscription started |
| `external_customer_id` | string | Yes | Your customer ID |
| `external_subscription_id` | string | Yes | Your subscription ID |
| `plan_key` | string | Yes | Plan identifier |
| `billing_cycle` | enum | Yes | "monthly" or "annual" |
| `is_trial` | boolean | No | Whether it's a trial (default: false) |
| `trial_ends_at` | ISO-8601 | No | When trial ends |
| `ppn_ref` | string | No | Partner code |
| `click_id` | UUID | No | Original click ID |

---

### 4. Invoice Paid Event

**This is the most important event - it triggers commission creation.**

Track when a customer pays an invoice.

**Endpoint:** `POST /api/v1/ppn/events/invoice_paid`

**Request Body:**
```json
{
  "type": "invoice_paid",
  "occurred_at": "2024-01-15T10:45:00.000Z",
  "external_customer_id": "cus_abc123",
  "external_subscription_id": "sub_xyz789",
  "external_invoice_id": "inv_123456",
  "currency": "USD",
  "amount_paid": 199.00,
  "tax_amount": 0.00,
  "discount_amount": 0.00,
  "net_amount": 199.00,
  "plan_key": "professional",
  "billing_cycle": "monthly",
  "ppn_ref": "PARTNER01",
  "click_id": "550e8400-e29b-41d4-a716-446655440000",
  "payment_processor": "stripe",
  "payment_reference": "pi_abc123"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be "invoice_paid" |
| `occurred_at` | ISO-8601 | Yes | When payment received |
| `external_customer_id` | string | Yes | Your customer ID |
| `external_subscription_id` | string | Yes | Your subscription ID |
| `external_invoice_id` | string | Yes | Your invoice ID (unique) |
| `currency` | string | Yes | Currency code (e.g., "USD") |
| `amount_paid` | number | Yes | Total amount paid |
| `tax_amount` | number | No | Tax amount (default: 0) |
| `discount_amount` | number | No | Discount amount (default: 0) |
| `net_amount` | number | Yes | Net amount for commission calc |
| `plan_key` | string | Yes | Plan identifier |
| `billing_cycle` | enum | Yes | "monthly" or "annual" |
| `ppn_ref` | string | No | Partner code |
| `click_id` | UUID | No | Original click ID |
| `payment_processor` | enum | No | "stripe", "wise", "bank", "other" |
| `payment_reference` | string | No | Payment reference |

**Response includes commission details:**
```json
{
  "ok": true,
  "event_id": "...",
  "received_at": "...",
  "data": {
    "external_invoice_id": "inv_123456",
    "attributed": true,
    "commission": {
      "id": "comm_uuid",
      "amount": 29.85,
      "percent": 15,
      "status": "pending",
      "duplicate": false
    }
  }
}
```

---

### 5. Subscription Canceled Event

Track when a subscription is canceled. **Voids unpaid commissions.**

**Endpoint:** `POST /api/v1/ppn/events/subscription_canceled`

**Request Body:**
```json
{
  "type": "subscription_canceled",
  "occurred_at": "2024-02-15T10:00:00.000Z",
  "external_customer_id": "cus_abc123",
  "external_subscription_id": "sub_xyz789",
  "cancel_reason": "Customer requested cancellation",
  "effective_at": "2024-02-28T23:59:59.000Z"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be "subscription_canceled" |
| `occurred_at` | ISO-8601 | Yes | When cancellation occurred |
| `external_customer_id` | string | Yes | Your customer ID |
| `external_subscription_id` | string | Yes | Your subscription ID |
| `cancel_reason` | string | No | Reason for cancellation |
| `effective_at` | ISO-8601 | Yes | When subscription ends |

---

### 6. Refund Event

Track refunds and chargebacks. **Voids or claws back commissions.**

**Endpoint:** `POST /api/v1/ppn/events/refund`

**Request Body:**
```json
{
  "type": "refund",
  "occurred_at": "2024-02-20T10:00:00.000Z",
  "external_customer_id": "cus_abc123",
  "external_invoice_id": "inv_123456",
  "amount_refunded": 199.00,
  "currency": "USD",
  "reason": "refund"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be "refund" |
| `occurred_at` | ISO-8601 | Yes | When refund occurred |
| `external_customer_id` | string | Yes | Your customer ID |
| `external_invoice_id` | string | Yes | Invoice being refunded |
| `amount_refunded` | number | Yes | Amount refunded |
| `currency` | string | Yes | Currency code |
| `reason` | enum | Yes | "chargeback", "refund", "other" |

---

## Redirect Endpoint

Generate tracked links that redirect users to product pages.

**Endpoint:** `GET /api/v1/ppn/r/{partner_code}`

**Query Parameters:**
- `product` (required): Product slug
- `path` (optional): Path on product domain (default: "/")

**Example:**
```
GET /api/v1/ppn/r/PARTNER01?product=prohotelai&path=/pricing
```

**Redirects to:**
```
https://prohotelai.com/pricing?ppn_ref=PARTNER01
```

---

## Rate Limiting

- Default: 60 requests per minute per product
- Headers returned:
  - `X-RateLimit-Limit`: Max requests per window
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Idempotency

- Events are idempotent based on `X-PPN-Event-Id`
- Duplicate events return `ok: true` with `duplicate: true` in data
- Event IDs are stored for 30 days

---

## Commission Flow

1. **invoice_paid** event received → Commission created with `pending` status
2. After 60 days → Commission moves to `available` status
3. Partner requests payout (min $100) → Commission moves to `paid` status

### Void Rules

- **subscription_canceled** → Voids all unpaid commissions for that subscription
- **refund** → Voids commission for that invoice; if already paid, creates clawback

---

## Testing

### cURL Example: Invoice Paid

```bash
#!/bin/bash

PRODUCT_ID="your-product-uuid"
WEBHOOK_SECRET="whsec_your_secret"
BASE_URL="https://www.proinvest.global"

TIMESTAMP=$(date +%s)
EVENT_ID=$(uuidgen)

BODY='{
  "type": "invoice_paid",
  "occurred_at": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",
  "external_customer_id": "cus_test123",
  "external_subscription_id": "sub_test123",
  "external_invoice_id": "inv_'$RANDOM'",
  "currency": "USD",
  "amount_paid": 199.00,
  "tax_amount": 0,
  "discount_amount": 0,
  "net_amount": 199.00,
  "plan_key": "professional",
  "billing_cycle": "monthly",
  "ppn_ref": "SAMPLE01"
}'

SIGNING_STRING="v1.$TIMESTAMP.$EVENT_ID.$BODY"
SIGNATURE="v1=$(echo -n "$SIGNING_STRING" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" | awk '{print $2}')"

curl -X POST "$BASE_URL/api/v1/ppn/events/invoice_paid" \
  -H "Content-Type: application/json" \
  -H "X-PPN-Product-Id: $PRODUCT_ID" \
  -H "X-PPN-Timestamp: $TIMESTAMP" \
  -H "X-PPN-Event-Id: $EVENT_ID" \
  -H "X-PPN-Signature: $SIGNATURE" \
  -H "Idempotency-Key: $EVENT_ID" \
  -d "$BODY"
```

---

## JavaScript Integration Example

```javascript
const crypto = require('crypto');

class PPNClient {
  constructor(productId, webhookSecret, baseUrl = 'https://www.proinvest.global') {
    this.productId = productId;
    this.webhookSecret = webhookSecret;
    this.baseUrl = baseUrl;
  }

  async sendEvent(type, data) {
    const timestamp = Math.floor(Date.now() / 1000);
    const eventId = crypto.randomUUID();
    const body = JSON.stringify({ type, ...data });
    
    const signingString = `v1.${timestamp}.${eventId}.${body}`;
    const signature = 'v1=' + crypto
      .createHmac('sha256', this.webhookSecret)
      .update(signingString)
      .digest('hex');
    
    const response = await fetch(`${this.baseUrl}/api/v1/ppn/events/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-PPN-Product-Id': this.productId,
        'X-PPN-Timestamp': String(timestamp),
        'X-PPN-Event-Id': eventId,
        'X-PPN-Signature': signature,
        'Idempotency-Key': eventId,
      },
      body,
    });
    
    return response.json();
  }

  async trackClick(ppnRef, clickId, landingUrl, options = {}) {
    return this.sendEvent('click', {
      occurred_at: new Date().toISOString(),
      ppn_ref: ppnRef,
      click_id: clickId,
      landing_url: landingUrl,
      ...options,
    });
  }

  async trackInvoicePaid(data) {
    return this.sendEvent('invoice_paid', {
      occurred_at: new Date().toISOString(),
      ...data,
    });
  }
}

// Usage
const ppn = new PPNClient(
  'your-product-uuid',
  'whsec_your_secret'
);

await ppn.trackInvoicePaid({
  external_customer_id: 'cus_123',
  external_subscription_id: 'sub_123',
  external_invoice_id: 'inv_123',
  currency: 'USD',
  amount_paid: 199.00,
  net_amount: 199.00,
  plan_key: 'professional',
  billing_cycle: 'monthly',
  ppn_ref: 'PARTNER01',
});
```

---

## Cookie Tracking (Product-Side)

Products should implement cookie tracking on their domains:

```javascript
// On product website (e.g., prohotelai.com)
function initPPNTracking() {
  const params = new URLSearchParams(window.location.search);
  const ppnRef = params.get('ppn_ref');
  
  if (ppnRef) {
    // Set 90-day cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 90);
    document.cookie = `ppn_ref=${ppnRef}; expires=${expires.toUTCString()}; path=/; secure; samesite=lax`;
    
    // Generate and store click ID
    const clickId = crypto.randomUUID();
    document.cookie = `ppn_click_id=${clickId}; expires=${expires.toUTCString()}; path=/; secure; samesite=lax`;
    
    // Send click event to PPN (server-side recommended)
    // sendClickEvent(ppnRef, clickId, window.location.href);
  }
}

function getPPNAttribution() {
  const cookies = document.cookie.split(';').reduce((acc, c) => {
    const [key, val] = c.trim().split('=');
    acc[key] = val;
    return acc;
  }, {});
  
  return {
    ppn_ref: cookies.ppn_ref,
    click_id: cookies.ppn_click_id,
  };
}
```

---

## Product-Specific Integration Examples

### ProcafeAI Integration

ProcafeAI uses product slug identification for cleaner integration. Here's a complete example:

**Setup:**
```javascript
const PRODUCT_SLUG = 'procafeai';
const WEBHOOK_SECRET = 'your-webhook-secret'; // From PPN Admin UI
```

**Sending Events:**
```javascript
const crypto = require('crypto');

function sendPPNEvent(eventType, eventData) {
  const timestamp = Math.floor(Date.now() / 1000);
  const eventId = crypto.randomUUID();
  
  // Include product_slug in body for fallback
  const body = {
    ...eventData,
    product_slug: PRODUCT_SLUG,
    occurred_at: new Date().toISOString(),
  };
  
  const rawBody = JSON.stringify(body);
  const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
  const signature = 'v1=' + crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(signingString)
    .digest('hex');
  
  const headers = {
    'Content-Type': 'application/json',
    'X-PPN-Product-Slug': PRODUCT_SLUG,  // Primary identifier
    'X-PPN-Timestamp': String(timestamp),
    'X-PPN-Event-Id': eventId,
    'X-PPN-Signature': signature,
    'Idempotency-Key': eventId,
  };
  
  return fetch(`https://proinvest.global/api/v1/ppn/events/${eventType}`, {
    method: 'POST',
    headers,
    body: rawBody,
  });
}

// Example: Send signup event
await sendPPNEvent('signup', {
  external_customer_id: 'customer_123',
  ppn_ref: 'CAFE001',  // From query params or cookie
});

// Example: Send invoice paid event
await sendPPNEvent('invoice_paid', {
  external_customer_id: 'customer_123',
  external_subscription_id: 'sub_456',
  external_invoice_id: 'inv_789',
  plan_key: 'pro',
  billing_cycle: 'monthly',
  amount_paid: 29.99,
  currency: 'USD',
});
```

**Error Handling:**
```javascript
const response = await sendPPNEvent('signup', data);
const result = await response.json();

if (!result.ok) {
  const { code, message } = result.error;
  
  switch (code) {
    case 'PRODUCT_NOT_FOUND':
      console.error('ProcafeAI product not found in PPN. Check slug:', PRODUCT_SLUG);
      break;
    case 'INVALID_SIGNATURE':
      console.error('Invalid webhook secret. Check configuration.');
      break;
    case 'VALIDATION_ERROR':
      console.error('Event validation failed:', message);
      break;
    default:
      console.error('PPN error:', code, message);
  }
}
```

---

## Cron Job Endpoint

For moving pending commissions to available:

**Endpoint:** `POST /api/v1/ppn/jobs/reconcile`

**Headers:**
```
Authorization: Bearer <PPN_CRON_SECRET>
```

**Response:**
```json
{
  "ok": true,
  "data": {
    "processed": 15,
    "ran_at": "2024-01-15T10:00:00.000Z"
  }
}
```

Set up a daily cron job (e.g., via Vercel Cron or external service) to call this endpoint.
