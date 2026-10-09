# Corporate website redesign — review readiness

Branch: `feat/corporate-prohotelai-flagship`.
PR: https://github.com/prohotelai/proinvest-global-ltd/pull/16 (draft).
Baseline main: `166f6a37446306dd28c94c47969e65a56561d081`.
First remote checkpoint: `abbf94cf3f7245d1ff9a1e399ef56dacb88c35d8` (tree matches local checkpoint `4b7498e` exactly).
Final HEAD is reported in the PR; this document deliberately does not embed its own commit SHA.

## Delivered

- Corporate applied-AI authority; ProHotelAI flagship focus across Home, Company, Platforms, Industries, Partners and resources.
- Four relationships, Understand → Decide → Act → Learn, current governed knowledge/operations/commerce/management/AI Reports/integration descriptions and official product links.
- ProCafeAI/VisaRiskAI Under Development labels in page copy, navigation/footer context, metadata, entity relationships and llms.txt. Existing product URLs retained.
- All company-approved trust and commercial wording retained, with prepaid PAYG, onboarding and readiness stated accurately.
- Serious company information, official corporate email, genuine resource themes and explicit absence of named customer outcome case studies.
- New architectural P identity derived from the user-requested Higgsfield regeneration: horizontal light/dark/monochrome SVG, icon, ICO, Apple touch icon and 1200×630 social PNG. Header asset is 44px high; outlined wordmark has no font dependency or tagline.
- Existing images reused unchanged; no new Hero images generated. Integrated compositions, masks and image-aware directional gradients; deliberate mobile crop/composition.
- Localised 5-second motion on Home, Platforms, flagship and Industries. No photograph transforms or invented connection lines. Static company/people/contact scenes.
- Canonical metadata, real English/x-default alternates only, product-authority relationships, breadcrumbs, social image, public sitemap and facts index. Private PPN/API root/subpaths receive noindex headers; PPN layout receives noindex metadata. PPN functionality is unchanged.

## Validation

Successful commands:

- `npm run lint` — clean.
- `npm run typecheck` — passed.
- `npm run build` — passed with all public routes prerendered.
- `npm run test:corporate` — 6/6.
- `npm run test:ppn-widget` — existing 9/9.
- `git diff --check` — passed.

Existing validation defects corrected narrowly: TypeScript accepts `.ts` imports for Node strip-types tests; ESLint recognises legitimate CommonJS operational scripts. Corporate assertions now accept the broader `/ppn` and `/api` root-prefix block and distinguish a real server submit handler from an informational email link. No domain guard or server validation weakened.

Local production-build Playwright review: 14 public routes × desktop 1440, tablet 768, mobile 390 = 42 page checks. All returned 200, one h1, loaded images, no horizontal overflow, no uncaught page errors. All 11 redesigned image Heroes visually inspected at all three sizes. Mobile menu open/close/Escape and practical CTA targets checked. Image borders/panels absent; mobile fade/crop refined from screenshots. `prefers-reduced-motion` produced zero active animations, including the flagship pseudo-element.

Motion verification: Home, Platforms, flagship and Industries at desktop/mobile = 8 checks, each animation computed duration 5000ms. Calm/peak screenshot comparison confirmed a visible local change affecting approximately 0.7–5.6% of each Hero, with the photograph itself static. Glow positions are aligned to architectural lighting or the existing intelligence core.

SEO/runtime checks: public sitemap has 14 canonical routes and no private surfaces; robots blocks PPN/API roots and children. Parsed page JSON-LD, canonical URLs and English language alternates reviewed. Asset SHA-256 manifest verified. Private noindex response header and login metadata verified.

Contact: existing server route unchanged. Actual invalid request returns 400; valid local request with unconfigured delivery returns 503. Browser tests intercepted 202/503 responses to prove pending/disabled → success only after acceptance, and error/no success with form values preserved. These are explicitly mocked UI responses, not evidence of real message delivery. No real enquiry sent. Actual Preview delivery is unverified.

Local PPN login emitted the existing Auth.js UntrustedHost warning because the local acceptance host has no trusted-host configuration. Auth behavior was not altered; the metadata/header test and existing PPN widget tests passed. No database was configured or migrated.

## Preview acceptance blocker

The actual project is `proinvest-global/proinvest-global-ltd` (project `prj_RmH7RhnDBv9Cr9BXO4EGENbsHwpy`, team `team_njE5eleKXeEPYum6g8wjO87P`). Current Vercel connection only has the separate ProHotel AI scope. Explicit access to `proinvest-global` returns 403; protected-URL lookup also fails for this scope. No CLI/OIDC credential is available.

GitHub Vercel status and bot reported the checkpoint Preview READY:
https://proinvest-global-ltd-git-feat-corporate-f4827a-proinvest-global.vercel.app

This URL is a mutable branch alias. Exact final-HEAD deployment status must be verified separately through GitHub. Unauthenticated fetch redirects to `Login – Vercel`, not the corporate application. The READY build status does not prove visual or Contact acceptance on Preview.

Required remaining acceptance: access the existing protected Preview with authorisation for the actual project/team, verify final deployment SHA, inspect every image Hero on desktop/tablet/mobile, reduced motion, navigation, private discovery exclusion and configured Contact delivery. Do not replace the intended deployment with a different project or disable protection.

Final verdict: **NOT SAFE TO REVIEW** until required exact-final-HEAD Preview acceptance passes.

## Preserved boundaries

No merge. No Production access/deployment. No database/schema/migration changes. No PPN domain, auth, API business behavior, contact delivery route, partner accounting or commission logic changes. Independent open PPN PR #12 is not included or overwritten. Repository-backed work is committed/pushed on the dedicated branch.
