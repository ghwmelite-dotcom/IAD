# Rebrand Notes — OHCS Website → Internal Audit Department (IAD) Website

This project was rebranded from a verbatim copy of the OHCS website
(`ohcs-website`) into the public website for the **Internal Audit Department
(IAD), Office of the Head of the Civil Service (OHCS), Ghana**.

## What changed

### Package & tooling
- `package.json` name: `ohcs-website` → `iad-website`; Pages deploy project
  `ohcs` → `iad-ohcs`.
- Removed dependencies that nothing in `src/`, `functions/`, or `scripts/`
  imports: `framer-motion`, `zustand`, `next-intl`, `@tanstack/react-query`.
- **Note:** `npm install` requires `--legacy-peer-deps` because
  `@cloudflare/next-on-pages@1.13.16` declares a peer range capped at Next
  15.5.2 while the project uses Next 16.2.4 (pre-existing issue, unchanged).

### Removed (recruitment & AI assistant stripped)
- `src/app/apply/` (application wizard + appeal)
- `src/app/assistant/` ("Ask Lexi" AI chat)
- `src/app/services/recruitment/`
- `src/components/recruitment/`
- `src/components/home/assistant-cta.tsx` (and its usage on the home page)
- Header "Ask Lexi" CTA
- `src/app/departments/`, `src/app/training/`, `src/app/units/` (folded into
  `/audit-units` and `/about`)
- `src/app/about/civil-service/`, `src/app/about/partners/` (not applicable
  to IAD)
- Recruitment branch of the `/track` lookup and the recruitment form schema
  in `src/lib/validations.ts`
- Kept but now-unused: `src/lib/applicant-api.ts`, `src/lib/use-auto-save.ts`
  (only referenced the deleted applicant flow). `src/lib/recruitment-api.ts`
  and `src/types/recruitment.ts` are still used by `src/app/admin/` and were
  left in place.

### Content / branding
- `src/lib/constants.ts` rewritten: SITE_NAME "Internal Audit Department",
  SITE_SHORT_NAME "IAD", OHCS-referencing description, new `NAV_ITEMS`
  (About → Mandate & Services / Vision / Functions / Leadership /
  Organisational Structure; Audit Units; Services → Special Audit Requests /
  Consultancy / Report Fraud / RTI / Feedback / Track; Publications;
  News & Events; Contact), and `AUDIT_UNITS` (10 placeholder MDA Internal
  Audit Units) replacing `DIRECTORATES`/`UNITS`/`DEPARTMENTS`/
  `TRAINING_INSTITUTIONS`.
- Unused `Department`, `Unit`, `TrainingInstitution` types removed from
  `src/types/index.ts`; `SubmissionType` extended with `special_audit`,
  `consultancy`, `fraud_report` (replacing `recruitment`).
- Home page: hero slides → assurance/accountability/integrity copy;
  quick services → Special Audit, Report Fraud, RTI, Publications; stats →
  audit-themed placeholders; leadership spotlight → placeholder Director;
  CTA section → "Report Fraud or Waste" whistleblowing angle; news/events
  sample data moved to `src/lib/sample-content.ts` with IAD-themed items.
- `directorates-grid.tsx` → `audit-units-grid.tsx` (home) and
  `src/app/directorates/` → `src/app/audit-units/` (index + `[slug]`).
- About: rewritten index (mandate + services), new `vision/` and
  `functions/` pages, `leadership/` uses placeholder Director with monogram
  portrait, `structure/` shows IAD hierarchy (Director → Audit Managers →
  Auditors → IAU coordination).
- Services: new `special-audit/`, `consultancy/`, `report-fraud/` pages
  (reusing `SubmissionForm`); `feedback/` rebuilt as a real form page
  (AI-assistant content removed); `complaints/` removed; `rti/` kept with
  minor copy updates. Fraud report form fields are all optional except the
  report body — anonymity stressed.
- Publications: recategorised to Audit Reports / Annual Plans / Policies &
  Charters / Manuals & Templates with IAD placeholder documents.
- New `news/` and `events/` listing + `[slug]` detail pages (cards already
  linked to these routes; previously 404).
- Header/footer/animated-logo/page-loader: "OHCS" wordmark → "IAD"; footer
  keeps "Office of the Head of the Civil Service" attribution; contact details
  kept (IAD sits within OHCS).
- Tests updated for rebranded content (`tests/component/*`: audit-units-grid
  replaces directorates-grid; quick-services, leadership-spotlight,
  news-events-section rewritten). All 281 tests pass.

### Untouched (by design)
- `src/app/globals.css`, `src/components/kente/`, `src/components/ui/`,
  `src/hooks/use-scroll-reveal.ts` — byte-identical.
- `functions/api/` and `migrations/` — untouched; backend rework is a later
  phase.
- `src/app/admin/` — left as-is (Phase 1 concern). It still compiles.

## Placeholders that need real content

1. **Director profile** — name, bio, and portrait for the substantive
   Director of IAD (previous Director retired; never used). Drop-in points:
   `src/components/home/leadership-spotlight.tsx` and
   `src/app/about/leadership/page.tsx` (`photoUrl: null` shows the "IAD"
   monogram placeholder; set a photo URL and name to activate the portrait).
2. **Audit unit directory** — `AUDIT_UNITS` in `src/lib/constants.ts` are 10
   plausible placeholders; replace with the real list of Internal Audit Units
   in MDAs, plus unit heads/contacts on the `[slug]` detail pages.
3. **Statistics** — home stats banner and About page stats (MDAs covered,
   audits completed, findings resolved, auditors trained) are plausible
   placeholders, marked with `TODO(rebrand)`.
4. **Publications** — all 14 sample documents in
   `src/app/publications/page.tsx` are placeholders with no real file URLs;
   the Download buttons are inert.
5. **News & events** — `src/lib/sample-content.ts` items are placeholders;
   detail pages show "will be published here soon" until content exists.
6. **Contact details** — address/phone/email inherited from OHCS; confirm
   IAD-specific contact channels and social accounts (currently OHCSGhana).
7. **Organisational structure** — the four-tier hierarchy on
   `/about/structure` is a placeholder pending the approved organogram.

## Deferred / known issues

- **Backend mismatch (deferred to backend phase):** the submission form posts
  `type: special_audit | consultancy | fraud_report | rti | feedback` to
  `/api/v1/submissions`, but `functions/api/` still validates the old enum
  (including `recruitment`). The admin submissions UI also still references
  the old types. Wire these up when the backend is reworked.
- **Admin area** still contains recruitment management screens, Lexi AI
  training screens, and the old leadership names (Aggrey-Darkoh/Adzornu) in
  demo data — intentionally left for Phase 1 per instructions.
- **Lint:** 5 pre-existing `react-hooks/set-state-in-effect` errors in
  untouched admin files (`admin/settings/auth`, `admin/settings/users`,
  `components/admin/comms/*`), plus 11 warnings (mostly pre-existing).
  Nothing introduced by the rebrand.
- **Footer policy links** (`/privacy`, `/accessibility`, `/sitemap.xml`)
  point to pages that don't exist — pre-existing issue, unchanged.
- Track reference numbers keep the `OHCS-XXX-YYYYMMDD-XXXX` format for
  compatibility with the existing backend generator.
