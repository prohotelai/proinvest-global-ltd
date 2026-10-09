# Focused corporate content preservation

PR #16: `feat/corporate-prohotelai-flagship`.
Exact starting remote HEAD: `1630da8ed5f5fe8c07887eb29d889b9a2aa3791e`.
Starting remote-equivalent tree: `65d3491715b81682d4443f55f98b3505ce56a633`.
Main comparison baseline: `166f6a37446306dd28c94c47969e65a56561d081`.
The four intervening remote review-clarification commits were preserved before restoration; local checkpoint `8a8c1a8612c6d3c6e89a19c807595bda2d316184` has the identical starting tree. Final remote HEAD/deployment evidence is recorded in the PR.

## Restored information, within the approved design

| Area | Main/deletion audit information | Current restoration |
| --- | --- | --- |
| Partners / PPN | Join/promote/earn explanation; links, assets and dashboard visibility | Join → Introduce → Earn; registration/approval, unique tracked referral links, approved assets, referral/conversion and commission visibility. Visible signup/login CTAs. Corporate PPN, hotel-approved ecosystem and technology/implementation routes remain distinct. |
| About | Corporate purpose and operational scope | What We Build: Operational AI, Governed Intelligence, Commercial Intelligence. Concise Our Mission. Legal name, company number, registered address/email and flagship priority retained. Existing editorial rows reused. |
| Implementation evidence | Governed knowledge, operational context and hotel workflows | Five numbered areas: Hotel Digital Brain, Guest → Operations, Commerce, Management Intelligence, PMS & Integration Boundary. Official product-authority links, configuration caveat and explicit absence of customer outcome case studies retained. |
| ProHotelAI semantics | Useful application subcategory and operational concepts | Hospitality Operations Software; explicit flagship hospitality AI description and Operational Intelligence alongside the existing knowledge/concierge/commerce/reports/partner/integration/isolation features. Canonical `https://prohotelai.com/#software` identity retained. |
| Organization semantics | Applied-AI/hospitality subjects | Eight relevant knowsAbout concepts; only ProHotelAI remains the commercial offer. Emerging brands keep Under Development descriptions. |
| AI discovery | Company/product relationships and factual capability overview | Parent applied-AI company → current flagship Hotel Digital Brain → emerging pipeline. Explicit governance, authority boundaries, Guest AI/Commerce links and account-start/property-readiness distinction. |
| Metadata | Relevant flagship descriptors | Contextual descriptions on About, Partners, Evidence, ProHotelAI and Solutions. Home metadata unchanged. No keyword list, duplicate SEO architecture, fake Arabic alternate or equal-product authority restored. |

## Evidence and claim boundaries

PPN evidence is the existing implementation, read without running or changing its backend:

- `app/api/v1/ppn/auth/signup/route.ts`: unique partner code and pending application.
- `app/api/v1/ppn/admin/partners/route.ts`: manual approval transition.
- `app/api/v1/ppn/partner/links/route.ts`: approved-partner gate, active products and partner-specific tracked links.
- `app/api/v1/ppn/partner/assets/route.ts`: approved-partner gate and active marketing assets.
- `app/api/v1/ppn/partner/dashboard/route.ts`, `app/ppn/dashboard/page.tsx`, `app/ppn/commissions/page.tsx`: click/attribution/conversion and commission visibility.
- `lib/ppn/commission-engine.ts`: commission resolution follows partner/product/plan overrides; an absent rate blocks commission creation. Code bounds do not establish a universal current commercial agreement.

No live PPN configuration or universal commercial terms were asserted. Percentage ranges, cookie duration, payout methods/schedule and lifetime promises remain absent from the public restoration.

Product wording was checked against the current official ProHotelAI repository's `apps/web/components/marketing/marketing-editorial-content.ts` (blob `88509409d095ef844338f4e3070205ef02065f5b`) and the approved current corporate capability descriptions. PROINVEST retains corporate authority; ProHotelAI.com retains product authority. No customer testimonial, quantified result, broad connector guarantee or ProCafeAI success claim was added.

## Focused validation

- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:corporate` (7/7), and `git diff --check` passed.
- Local production-build responsive sanity: About, Partners and Evidence × 1440/768/390px = nine checks. HTTP 200, one h1, required restored text, correct canonical/English-only alternates, loaded images, no overflow or uncaught page errors. PPN steps/CTA routes and touch target sizes checked. New content sections visually inspected at desktop/tablet/mobile.
- Content/schema/metadata sanity: Home, Solutions, ProHotelAI, ProCafeAI and VisaRiskAI; llms.txt returns 200. Organization/product JSON-LD parses; entity identities/provider links, sole flagship offer, eight knowsAbout concepts, ProHotelAI subcategory and emerging Under Development states verified. Instant Deployment and property-readiness clarification retained.
- Byte-for-byte comparison of each modified page's Hero subtree passed. Protected paths have zero diff against the starting state: shared components/Header/Footer/HomepageHero, corporate CSS, Home, Industries, Solutions pages, Contact, APIs, PPN, Prisma and image assets. This proves B3, B2, 5000ms motion, mobile crops and reduced-motion implementation remain unchanged; expensive broad Hero acceptance was not repeated.
- Main-to-final content comparison confirms that useful information is present while legacy cards/icons/testimonials/commission promises/equal-product sales positioning and old SEO implementation stay removed. Line-count reductions reflect the approved redesign, not wholesale page restoration.
- React review: static server-rendered content using the existing Section/EditorialRows/Actions patterns and semantic links; no client state, effects, animation changes or new dependency.
- Evidence data: `corporate-content-preservation-acceptance.json`.

The build exits successfully with the existing scratch PPN missing-table warnings. No database setup or migration was performed. Existing PPN tests were not rerun because PPN implementation is unchanged.

## Remaining PR acceptance

The content restoration is complete and locally validated. The PR's pre-existing protected Preview visual/Contact gate remains unverified because the connected Vercel account lacks access to the actual project/team. Exact-head Vercel build status is reported separately in the PR and is not represented as a Preview interaction test. Draft PR retained; overall verdict remains **NOT SAFE TO REVIEW** until that existing gate passes. No merge, Production access/deployment, database/schema, authentication or API changes.
