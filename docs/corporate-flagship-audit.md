# Corporate flagship redesign — exact-state audit

Baseline: main `166f6a37446306dd28c94c47969e65a56561d081` (24 September corporate refresh). Fresh checkout, clean working tree. No AGENTS.md in this repository. Dedicated branch: `feat/corporate-prohotelai-flagship`.

Remote open PR #12 is an independent PPN social-assets change, head `a937f33f0fbd3bdc0b2479eedac13832fe3063b1`; it is not included or overwritten.

GitHub baseline Vercel status: success, deployment completed, https://vercel.com/proinvest-global/proinvest-global-ltd/4DVhwjGeGXvtxx3TuVR7eagPgHuZ. Vercel connector access to the actual `proinvest-global` scope returns 403; the accessible ProHotel AI team is a different scope. No deployment to a different project is authorised or attempted.

## Public architecture findings

- Home: legacy equal-product narrative; floating decorative orbs; no photographic hero. Several generic operational assertions.
- Company/About: legal company/address available, but stale `info@proinvest-global.com` contact.
- Solutions and product routes: ProHotelAI has some current Digital Brain copy, but legacy positioning remains across the site. ProCafeAI and VisaRiskAI presented as active peer commercial offerings.
- Industries: hospitality, restaurants and visa workflows given similar status.
- Partners: VisaRiskAI marked featured, ProHotelAI placed third, generic subscription/lifetime/commission metrics; functional PPN lives separately under `/ppn`.
- Case studies: no verifiable named customer evidence. Insights: no substantive published articles. Neither warrants invented results or publication dates.
- Contact: real validated HTTPS allowlisted server webhook with bearer-secret configuration. Success only after server acceptance; failure paths exist. Preserve route/delivery behavior.
- Header/Footer: common components apply only within marketing layout; hero backgrounds and navigation contrast inconsistent; essential dropdown relied on hover.
- SEO: canonical corporate origin exists; legal routes still use `www`; social references point at absent `og-image.jpg`; emerging platforms represented as equal offers in Organisation schema.
- Sitemap: useful indexed routes retained. Emerging platforms have equal priority to flagship. Robots blocks `/ppn/` and `/api/` but private root/noindex needs tightening. llms.txt exists but portfolio priority and development status absent.
- Brand: existing SVG assets; no approved photographic assets in corporate repo. Existing images found in previous ProHotelAI work assets; reused unchanged.
- Responsive/motion: existing responsive utilities, no deliberate image crops or intelligence motion. New public-only styles remain isolated from PPN.

## Current product authority

Audited ProHotelAI main at `1031663a362b6e7bda6a792597bf722140f29148` via GitHub, especially `apps/web/components/marketing/marketing-editorial-content.ts` and official marketing route vocabulary. Governed knowledge, Guest AI, staff execution, commerce, management reports, hotel-approved partners and supported PMS-neutral integration. No autonomous-learning claims, universal connector support, performance guarantees or January-era automatic check-in promises.

## Boundaries

No database/schema/migration changes. No auth, partner accounting, API or PPN workflow changes. Contact route preserved. New metadata-only noindex protections may cover private surfaces. No merge, Production access or Production deployment.

## Asset provenance

Existing pre-optimised Higgsfield images copied byte-for-byte from previous ProHotelAI workspace (`a30691b32b9ef55fb615ceedb69446fd536ffee3` checkout): corporate blue-hour, desktop/mobile Digital Brain, product, about, operations, management, partner ecosystem and knowledge hero. No new Hero images generated. Asset manifest records exact hashes.

Higgsfield logo exploration: job `080419b5-0276-46b4-8d3b-376d633f9e52`; user-requested same-parameter regeneration: `14cd81e3-b88b-4975-bdf0-9a600176b5c3`. Final vector production asset adapts the architectural interlocking-P direction; concept sheet is not used as a header bitmap.
