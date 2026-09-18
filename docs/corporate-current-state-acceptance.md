# Corporate website current-state acceptance

This document records the public corporate website contract after the September 2026 refresh.

## Canonical identity

- Legal entity: PROINVEST GLOBAL LTD
- UK company number: 16851428
- Canonical corporate origin: https://proinvest.global
- Product portfolio: ProHotelAI, ProCafeAI, VisaRiskAI
- Public AI facts index: /llms.txt

## Product authority

Corporate copy is intentionally conservative. Product-specific implementation detail is sourced from the product repositories/current public products:
- ProHotelAI: current `prohotelai/prohotel-ai` main; governed Hotel Digital Brain, Guest AI Concierge, operations, commerce, management intelligence, PMS-neutral data and partner ecosystem.
- ProCafeAI: `prohotelai/AI-CAFE-ASISTAN`; QR/web ordering, conversational ordering, menu, reservations, KDS/POS, inventory/reporting and multi-branch capabilities. Historical marketing percentages and customer-count claims are not treated as verified corporate facts.
- VisaRiskAI: `prohotelai/UK-and-schengen-Visa-Risk-Analyzer`; structured UK/Schengen visa risk scoring, risk flags, document/profile processing and improvement guidance. The corporate site does not claim or guarantee an immigration authority outcome.

## Search and agent policy

Public marketing pages may be indexed. `/ppn/` and `/api/` are excluded from crawler policy and are absent from the sitemap. The site publishes only real language alternates; no Arabic hreflang is emitted until actual Arabic routes exist. `/llms.txt` is descriptive and does not expose private application state or action interfaces.

## Contact delivery

`POST /api/contact` validates input and forwards accepted enquiries to a configured HTTPS delivery endpoint pinned by `CONTACT_FORM_WEBHOOK_ORIGIN`. Production must configure `CONTACT_FORM_WEBHOOK_URL`, `CONTACT_FORM_WEBHOOK_ORIGIN` and `CONTACT_FORM_WEBHOOK_SECRET`. The delivery request uses the secret as a bearer credential. The browser only displays success after the server confirms delivery acceptance.

## Acceptance gates

Before merge:
- lint
- TypeScript typecheck
- production build
- relevant repository tests
- canonical/robots/sitemap/JSON-LD inspection
- internal-link and private-route indexing audit
- responsive and accessibility smoke review on Vercel Preview
- exact-head Vercel success

No database schema or migration is required for this corporate content/SEO/contact-delivery change.
