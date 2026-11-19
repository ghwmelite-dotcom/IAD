# Hero Slides manager — release verification

Date: 19 November 2026
Code commit: 78d42ffbf6a9e764cb77802a06189d9c5ae0f1df
Target: iad-ohcs, production, OHCS Cloudflare account
Live editor: https://iad.ohcsghana.org/admin/hero/

## Delivered

- Content → Hero Slides in the admin sidebar.
- Add/replace images with automatic browser resizing and WebP conversion.
- English/French captions, accessible image descriptions, buttons and credits.
- Separate mobile/desktop framing with responsive previews.
- Reorder, enable/disable and remove slides; up to twelve slides.
- Separate draft and published manifests; optimistic revision conflicts and atomic audit logging.
- Public homepage reads published content on load, return to tab and at 60-second intervals. No redeployment for editorial changes.
- Existing four published slides retained. No production test content was inserted.

## Evidence

- 459 automated tests passed; production static build passed (78 routes).
- Feature lint passed with no errors.
- Real SQLite tests cover role permissions, forged demo headers, CSRF rejection, stale revisions, audit rollback, draft isolation, empty-carousel protection, unsafe links, fake/oversized image uploads and private draft delivery.
- Local Pages/D1/R2 browser workflow verified: real-cookie local test account → photo upload and optimisation → caption edit → save draft → confirm public content unchanged → publish → confirm public homepage renders managed caption and uploaded R2 image.
- Desktop and mobile editor layouts inspected; mobile has a horizontal slide rail and no page overflow.
- Production deployment succeeded. Public manifest returns four valid slides; editor route responds; anonymous and forged-demo mutations return 401. Existing Knowledge Hub API remains operational.
- Additive migration 0016_hero_content.sql applied and registered. No existing tables or records changed.

## Production activation — deferred by owner

The owner explicitly deferred transactional-email and real-admin sign-in activation until the institution is ready to move from prototype review to production. Cloudflare’s environment is named production, but that does not represent institutional production approval.

The deployed environment has no RESEND_API_KEY secret. Existing magic-link sign-in therefore needs an approved transactional-email configuration before an administrator without an existing valid session can use publishing. Hero publishing deliberately does not accept demo headers or localStorage identities. Live authenticated publishing has not been exercised; the full authenticated workflow was tested locally.

## Admin workflow

Sign in with a real authorised magic link → Content → Hero Slides → choose or add a slide → upload and edit → preview Desktop/Mobile and adjust framing → Save draft or Publish changes. New slides start disabled; enable them before publishing. At least one slide must remain enabled. The live homepage updates on refresh or within one minute.
