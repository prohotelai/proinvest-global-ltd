# PPN Partner Coupon Reuse Evidence

## Method
Commands used:
- `nl -ba prisma/schema.prisma | sed -n '1,380p'`
- `nl -ba app/api/v1/ppn/events/*/route.ts ...`
- `nl -ba app/api/v1/ppn/partner/links/route.ts`
- `nl -ba app/api/v1/ppn/r/[partner_code]/route.ts`
- `nl -ba app/api/v1/ppn/admin/products/route.ts`
- `nl -ba app/api/v1/ppn/admin/partners/route.ts`
- `nl -ba lib/ppn/signature.ts`
- `nl -ba lib/ppn/schemas.ts`
- `nl -ba lib/ppn/commission-engine.ts`
- `rg -n "coupon|promo|discount|offer|voucher|campaign|..." app lib prisma docs scripts README.md -S --glob '!lib/generated/**'`
- `rg -n "fetch\(|axios|webhook|outbound|sync|push" app/api lib/ppn docs -S --glob '!lib/generated/**'`

## Evidence by Major Conclusion

### 1) Partner identity is already globally defined and reusable
- `Partner.partnerCode String @unique` exists and is explicitly noted as unique referral code.
  - `prisma/schema.prisma` lines 45-52.
- Partner signup generates and persists this code; uniqueness checked before create.
  - `app/api/v1/ppn/auth/signup/route.ts` lines 53-71, 81-88.
- Format generator exists (`8` char uppercase alphanumeric-ish set).
  - `lib/ppn/utils.ts` lines 57-67.

### 2) `partnerCode` is already the active cross-system attribution token (`ppn_ref`)
- Click event requires `ppn_ref`; handler resolves via `where: { partnerCode: data.ppn_ref }`.
  - `lib/ppn/schemas.ts` lines 4-9.
  - `app/api/v1/ppn/events/click/route.ts` lines 64-67.
- Signup/subscription/invoice handlers also resolve partner by `ppn_ref` if present.
  - `app/api/v1/ppn/events/signup/route.ts` lines 69-77.
  - `app/api/v1/ppn/events/subscription_started/route.ts` lines 79-86.
  - `app/api/v1/ppn/events/invoice_paid/route.ts` lines 80-87.
- Partner link generation appends `ppn_ref=<partnerCode>`.
  - `app/api/v1/ppn/partner/links/route.ts` lines 63, 72-79, 85.
- Redirect endpoint uses partner code path and forwards `ppn_ref`.
  - `app/api/v1/ppn/r/[partner_code]/route.ts` lines 17-19, 70.

### 3) Products are first-class and integration-ready
- `Product` model includes `id`, `slug` unique, `domain`, `status`, `webhookSecret`, URLs.
  - `prisma/schema.prisma` lines 88-97.
- Product plans are first-class with unique (`productId`,`planKey`,`billingCycle`).
  - `prisma/schema.prisma` lines 110-126.
- Admin CRUD for products exists, including secret generation/regeneration.
  - `app/api/v1/ppn/admin/products/route.ts` lines 19-25, 61-108, 110-172.

### 4) Partner-product relationship surfaces already exist
- `PartnerCommissionOverride` links partner and product (optional plan) with uniqueness.
  - `prisma/schema.prisma` lines 175-193.
- Commission resolver already reads partner+product(+plan) specificity.
  - `lib/ppn/commission-engine.ts` lines 12-18, 39-73.

### 5) Coupon/promo system is not implemented as a domain
- No coupon/promo/voucher/offer/campaign models in Prisma schema (models listed: User, Tier, Partner, Product, ProductPlan, Click, Attribution, PartnerCommissionOverride, CommissionEntry, LedgerTransaction, PayoutMethod, PayoutRequest, AssetLibrary, EventLog).
  - `prisma/schema.prisma` lines 17-315.
- Repository search returns coupon/promo-like hits mostly in docs/examples and event payload `discount_amount`, not persistent coupon entities.
  - `rg` output over `app lib prisma docs scripts README.md`.
- `discount_amount` appears in invoice payload schema only (input metric), not stored as coupon object.
  - `lib/ppn/schemas.ts` line 59.

### 6) Existing secure integration is inbound (downstream -> PPN), not outbound sync
- Signature verification with product id/slug + webhook secret + replay protection.
  - `lib/ppn/signature.ts` lines 17-24, 44-55, 66-80, 82-91, 109-127.
- API docs define same signed inbound pattern.
  - `docs/ppn-api-spec-v1.md` lines 11-35, 39-55.
- Integration guide shows downstream sending events to PPN endpoint.
  - `docs/procafeai-integration-guide.md` lines 39, 44-79.
- No evidence of outbound push/webhook code from PPN to external products in `app/api`/`lib/ppn` search.
  - `rg -n "fetch\(|axios|webhook|outbound|sync|push" ...` results.

### 7) Admin UI/API exists for related governance, but not coupon governance
- Admin partners UI shows/edit partner code context and commission settings.
  - `app/ppn/admin/partners/page.tsx` lines 6-25, 201-207, 219, 260-267.
- Admin products UI/API exists.
  - `app/ppn/admin/products/page.tsx` lines 5-16, 207-214, 220-223.
  - `app/api/v1/ppn/admin/products/route.ts` lines 32-59.
- No admin coupon UI or API route found in `app/ppn/admin/*` or `app/api/v1/ppn/admin/*`.
  - file tree and `rg` search evidence.

## Known vs Unknown

### Known (implemented)
- Unique partner identity code (`partnerCode`) and its live use in attribution.
- First-class products with slug/domain/webhook secret.
- Secure signed event ingest and idempotent processing.
- Partner-product commission override surface.

### Unknown (not evidenced in repo)
- Any external system-of-record contract already used by VisaRiskAI specifically for coupon identities.
- Any private/off-repo sync jobs/services not present in this codebase.
- Any operational convention where product billing coupon codes are manually mapped outside DB.

## Direct Answers to Audit Questions (Evidence-backed)
- What identifies a partner uniquely today?
  - `Partner.id` (internal UUID) and `Partner.partnerCode` (external unique referral identity).
- Is there already a partnerRefCode / slug / referral token?
  - Yes: `partnerCode` / `ppn_ref`.
- Is there already a place where partner-specific coupon code could naturally live?
  - Global level: `Partner.partnerCode`.
  - Product-specific level: existing partner-product join surface (`PartnerCommissionOverride`) can be extended; no coupon field currently exists.
