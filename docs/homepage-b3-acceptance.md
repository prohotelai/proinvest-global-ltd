# Selected Homepage Hero B3 — acceptance

The user selected **B3** on 2026-10-09, following the explicit three-candidate visual checkpoint in `Pasted text(2).txt`. Work continues on `feat/corporate-prohotelai-flagship` / Draft PR #16 from `c0cb79af80a03a43ef2ab2f2f4e30867a546c67e`.

## Delivered

- One integrated technology/hotel architectural environment, generated through Higgsfield. Selected job: `24974106-525f-4754-a9cf-6b5d73023101`; original master is 3840 × 1648. No embedded typography, logos or executive figure. The other two candidates are not website assets.
- Full-bleed Homepage composition with dark directional gradients and unchanged authoritative eyebrow, headline, supporting copy, CTA labels and trust line.
- Primary CTA links to the official ProHotelAI product page. The secondary CTA is a native fragment link to the existing operational cycle section.
- Optimised WebP: 4K master 1,075,380 bytes; 1920px desktop 323,778 bytes; 1000px mobile 221,086 bytes. Mobile uses a deliberate original-coordinate crop at x=1300, y=0, width=2000, height=1648.
- A 5000ms cycle: calm at 0–1s; core illumination at 1–2.5s; light traverses the original image paths at 2.5–4s; gentle return by 5s. The photograph does not translate, scale or zoom. SVG paths are masks for brighter copies of existing photo pixels, not new visible connection lines.
- Reduced motion removes every active animation; flow masks remain hidden and core illumination becomes static. Decorative imagery and SVGs are hidden from assistive technology; the section is labelled by its single visible h1.
- Homepage metadata, corporate description and facts index preserve the hospitality positioning already present in the saved local work. Canonical origin and existing product authority/under-development relationships are retained.

## Fresh validation

- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:corporate` (6/6), `npm run test:ppn-widget` (9/9), and `git diff --check` passed. After the native fragment-link refinement, lint/typecheck and production build passed again.
- Local production-build browser acceptance passed at widths **1920, 1440, 1024, 768, 390, 320**: HTTP 200, exact approved copy, one h1, loaded image derivatives, no horizontal overflow, no uncaught page errors, CTA heights 50px, correct canonical and parseable JSON-LD.
- Mobile menu open/close/Escape and the real secondary-link navigation passed. Reduced-motion checks produced zero active animations at every width.
- At every width, calm/core/travel screenshots confirmed perceptible local illumination. Computed animation duration is 5000ms; photograph transform is `none`. Measured screenshot deltas are recorded in `homepage-b3-responsive-acceptance.json`.
- Screenshot inspection confirmed the atrium/core stays visible; Desktop text uses the dark left architecture; Tablet/Mobile use a dedicated image-first composition fading into the same navy section, without image cards or borders.
- React review: server-rendered component, no new client effects or state, no video player or animation dependency, unique mask IDs, semantic links, decorative empty alt text and preserved focus rules.

Local build emits existing missing-table warnings because the scratch PPN database is not configured. The build exits successfully. No database setup or migration was performed to suppress these warnings.

## Preview and scope boundaries

GitHub confirmed Vercel SUCCESS for the first B3 remote checkpoint `499d5ae8968fc1e40efecea8baaa62fb089136fb`. Final exact-HEAD status must be checked after this evidence commit and reported in the PR.

Actual project: `proinvest-global/proinvest-global-ltd`, project `prj_RmH7RhnDBv9Cr9BXO4EGENbsHwpy`, team `team_njE5eleKXeEPYum6g8wjO87P`. The connected Vercel account returns 403 for this scope; protected fetch cannot resolve the deployment with that account. No local Vercel CLI credential is available. The mutable branch Preview alias remains `https://proinvest-global-ltd-git-feat-corporate-f4827a-proinvest-global.vercel.app`.

Required remaining acceptance: inspect the final exact-HEAD protected Preview and verify configured Contact delivery. Local visual acceptance and a successful Vercel build do not replace these requirements. Contact server implementation is unchanged; no real message was sent during this update.

Other page imagery, PPN functionality, partner logic, authentication, APIs, database/schema/migrations and Production remain untouched by this update. No merge. Draft PR retained.

Final verdict: **NOT SAFE TO REVIEW** until required Preview acceptance is completed.
