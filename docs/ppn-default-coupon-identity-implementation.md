# PPN Default Coupon Identity Implementation

## 1. What Changed
- `app/api/v1/ppn/sync/coupon-identities/route.ts`
  - Added a minimal product-authenticated sync endpoint that returns partner coupon identity records for a requesting product.
  - Reused existing signature verification (`verifySignature`) rather than introducing new auth.
  - Implements default identity rule: `partnerRefCode` and `couponCode` are both derived from existing `partnerCode`.
- `docs/ppn-default-coupon-identity-implementation.md`
  - Added implementation notes, payload shape, and manual verification steps.

## 2. Reused Existing Structures
- **Partner identity reused:**
  - Existing `Partner.partnerCode` is reused as `partnerRefCode` and default `couponCode`.
- **Product model reused:**
  - Existing `Product` identity (`id`, `slug`, `status`) is used for product-aware output.
- **Existing integration path reused:**
  - Existing HMAC product authentication path (`verifySignature`, `X-PPN-Product-Id` / `X-PPN-Product-Slug`) is reused.

## 3. New / Changed Fields or Endpoints
- **New endpoint:** `POST /api/v1/ppn/sync/coupon-identities`
  - Requires the same signed request style already used by `/api/v1/ppn/events/*`.
  - Returns product-aware partner coupon identity records.
- **No schema changes.**
- **No admin UI changes.**

## 4. Coupon Identity Rules
- **Default rule:** `partnerRefCode = couponCode = normalize(partnerCode)`.
- **Normalization:** coupon identity is returned as uppercase trimmed code (`toUpperCase().trim()`).
- **Product awareness:** every record includes both `productId` and `productSlug` for the authenticated product.
- **Active/inactive handling:** `isActive` is `true` only when:
  - product is active, and
  - partner status is `approved`.

## 5. Downstream Consumption Shape
VisaRiskAI should consume:

```json
{
  "ok": true,
  "event_id": "...",
  "received_at": "...",
  "data": {
    "productId": "...",
    "productSlug": "visariskai",
    "count": 2,
    "records": [
      {
        "partnerId": "...",
        "partnerRefCode": "SAMPLE01",
        "couponCode": "SAMPLE01",
        "productId": "...",
        "productSlug": "visariskai",
        "isActive": true,
        "partnerStatus": "approved",
        "updatedAt": "2026-04-20T00:00:00.000Z"
      }
    ]
  }
}
```

Required fields per record are present:
- `partnerRefCode`
- `couponCode`
- `productSlug` and `productId`
- `isActive`

## 6. Limitations
- No product-specific coupon override field yet; coupon defaults to partner code for all products.
- No outbound push/webhook sync; downstream pulls from this endpoint.
- Returns all partners with `isActive` flag; downstream should filter inactive records if needed.

## 7. Manual Verification Steps
1. Ensure a product exists (e.g., slug `visariskai`) with active status in PPN admin.
2. Ensure at least one partner exists with a known `partnerCode` and status `approved`.
3. Build signed request as existing PPN pattern:
   - headers include `X-PPN-Product-Slug` (or ID), `X-PPN-Timestamp`, `X-PPN-Event-Id`, `X-PPN-Signature`, `Idempotency-Key`.
   - body can be `{}`.
4. Send:
   - `POST /api/v1/ppn/sync/coupon-identities`
5. Verify response records include:
   - `partnerRefCode`
   - `couponCode` (same value)
   - `productSlug`/`productId`
   - `isActive`
6. Verify normalization by checking returned identity code is uppercase.

## 8. Bottom Line
Yes—PPN now has a minimal, product-aware, sync-safe coupon identity source for VisaRiskAI without introducing a coupon platform. It reuses existing partner/product/auth structures and enforces the default rule that partner reference code is the coupon code.
