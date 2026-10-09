# Industries Hero — existing Higgsfield image reuse

The user requested a suitable previously generated, unused Higgsfield image for the Industries Hero. Work continues on Draft PR #16 / `feat/corporate-prohotelai-flagship`, from remote `29c7bf0b3e73cc2879934bb410505f87689e74da` (tree `5ebceb6bd0399287ca3c7c27dacb4e165d33accc`, identical to the local checkpoint).

## Delivered

- Selected existing B2, Higgsfield job `1d50e791-2e95-4165-829f-d67afee6004c`, generated before this request. The original 3840×1648 PNG contains that job ID in its metadata. Repository asset references and provenance were checked before integration; B2 was not previously used in the corporate website. No generation was submitted.
- B2 presents a coherent hotel, warm guest/service spaces and a recognisable intelligence core inside its glass atrium. Desktop WebP is 2400×1030 (510,762 bytes). Mobile is a deliberate crop at x=1800, y=0, width=1900, height=1648, resized to 1000×867 (250,044 bytes).
- Industries receives a dedicated scene, leaving other scenes and Home B3 assets unchanged. Its heading, supporting copy, CTA destinations and metadata remain unchanged.
- Existing 5000ms local illumination is aligned separately to desktop and mobile core coordinates. The photo itself remains static. Mobile switches both the picture source and the matching SVG light; decorative imagery remains hidden from assistive technology. Reduced motion is static.
- The shared SVG markup was extracted into a server-rendered helper without client state, effects, dependencies or changes to the existing scene coordinates.

## Fresh validation

- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:corporate` (6/6) and `git diff --check` passed.
- Focused local production-build browser acceptance passed at 1440/768/700/390/320px: HTTP 200, exact existing text and CTA destinations, one h1, correct canonical, parseable JSON-LD, loaded images, no page errors or horizontal overflow, CTA heights at least 44px, correct responsive image and light selection.
- Screenshots reviewed at desktop, tablet and mobile, including calm and peak illumination. The core and hotel remain visible; text remains readable and mobile fades into the navy content surface.
- One active 5000ms animation at each width; calm/peak pixel changes affect 0.91–1.99% of the Hero. Photo transform stays `none`. Reduced motion leaves zero active animations at all widths.
- Mobile menu opening and Escape passed. The existing Platforms Hero at `/solutions` still loads its original image and matching gradient.
- Evidence: `industries-hero-responsive-acceptance.json` and updated `corporate-assets.json`.

The build still emits the existing scratch PPN missing-table warnings and exits successfully. No database was configured or migrated.

## Deployment boundary

The exact final remote SHA and Vercel status are reported in the PR. Protected Preview visual/Contact acceptance remains blocked by the existing Vercel project/team access restriction; local acceptance does not replace that gate. PR stays Draft / **NOT SAFE TO REVIEW**. No merge, Production deployment, API/Contact behavior, PPN logic, authentication or database/schema/migration changes.
