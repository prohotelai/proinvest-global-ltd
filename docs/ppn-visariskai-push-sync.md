# PPN → VisaRiskAI Push Sync

## 1. What It Does
PPN prepares partner coupon identity records and sends them in a small outbound sync request to VisaRiskAI.

Each identity record carries:
- `partnerRefCode`
- `couponCode` (defaults to `partnerRefCode`)
- `productSlug`
- `isActive`

## 2. Endpoint Target
`POST https://www.visariskai.com/api/internal/ppn/sync-coupons`

## 3. Payload Shape
```json
{
  "items": [
    {
      "partnerRefCode": "PARTNER123",
      "couponCode": "PARTNER123",
      "productSlug": "visariskai",
      "isActive": true
    }
  ]
}
```

## 4. Authentication
The request sends the shared secret in:

- Header: `x-internal-sync-secret`
- Value source: `VISARISKAI_SYNC_SECRET` environment variable

No secret is hardcoded.

## 5. How To Run
1. Set environment variable:
   - `VISARISKAI_SYNC_SECRET=<shared-secret>`
2. Run:
   - `npm run ppn:push-visariskai-coupons`

The script logs start, item count, and response details.

## 6. Failure Behavior
- If `VISARISKAI_SYNC_SECRET` is missing, sync is skipped and logged.
- If the HTTP request fails (non-2xx or network error), failure is logged.
- The function handles errors safely and avoids aggressive retries.

## 7. Bottom Line
This is a minimal, manual push mechanism for coupon identity sync from PPN to VisaRiskAI using a shared secret.
