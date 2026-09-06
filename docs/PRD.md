# Product Requirements Document — IAD Digital Platform

**Product:** Internal Audit Department (IAD) Web Platform
**Institution:** Office of the Head of the Civil Service (OHCS), Republic of Ghana
**Live URL:** https://iad.ohcsghana.org
**Repository:** https://github.com/ghwmelite-dotcom/IAD
**Version:** 1.0 (reflects the platform as deployed)
**Date:** May 2026

---

## 1. Executive Summary

The IAD Digital Platform is the official web presence and operational backbone of the
Internal Audit Department of Ghana's Civil Service. It serves two missions at once:

1. **Public mission** — position the IAD as a transparent, modern, globally credible
   audit institution: publishing audit findings, the state of internal audit across the
   service, and a verifiable professional registry of Internal Audit Class officers.
2. **Operational mission** — give the IAD and every MDA Internal Audit Unit a single
   digital HQ: audit universe management, annual planning, engagement tracking,
   findings & recommendations follow-up, and an authoritative Knowledge Hub.

The IAD is the headquarters of internal audit in the Ghana Civil Service: every
Ministry, Department and Agency (MDA) has its own Internal Audit Unit with its own
head, and all of them answer to the Director of Internal Audit. The platform is
architected around that reality — it is built for many units, not one department.

---

## 2. Background & Problem Statement

Before this platform:

- The IAD had no dedicated digital identity; it existed as a sub-section of the OHCS
  website with no operational tooling.
- Audit findings and recommendations lived in spreadsheets and paper files; there was
  no public accountability surface and no consolidated view of implementation status.
- Internal Audit Class officers had no verifiable professional identity — credentials
  (FCCA, ACCA, IIA, CITG) could not be checked by employers, donors or the public.
- Standards, manuals and templates circulated informally; MDA units had no single
  authoritative source for IAD guidance.
- Whistleblowing channels lacked provable anonymity guarantees.

---

## 3. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Transparency leadership | Press/academic citations of the public findings tracker; donor references |
| Operational adoption | MDA liaison accounts active; findings with management responses on file |
| Professional registry | Officers with verified digital profiles; certificate verifications served |
| Knowledge centralisation | Knowledge Hub documents published; downloads served |
| Platform excellence | Sub-second global TTFB; 95+ Lighthouse accessibility; zero critical security findings |

---

## 4. Personas & Access Model

| Persona | Description | Access |
|---|---|---|
| **Public citizen / journalist / researcher** | Consumes transparency data, verifies auditors, downloads publications, submits whistleblower reports | Public pages, no login |
| **MDA Internal Audit Unit staff (liaison)** | Manages their MDA's audit universe, plans, engagements, findings | Portal (magic-link, role: liaison) |
| **IAD auditor / manager** | Cross-MDA engagement work, findings review, working papers | Portal (roles: auditor, manager) |
| **Director of Internal Audit** | Full oversight, publishing decisions, admin functions | Portal + Admin (role: director) |
| **Platform administrator** | Users, registry, content, knowledge hub, site config | Admin (role: admin) |

Authentication is passwordless: magic-link email sign-in with role-based sessions
(30-day sliding TTL, 30-day hard cap). Sessions are remembered per device.

---

## 5. Shipped Scope (as of v1.0)

### 5.1 Public Website
- Fully bespoke IAD brand and design system (distinct from the OHCS site it was
  forked from): hero slider designed around the internal-audit mission, leadership
  section featuring the Director of Internal Audit and the OHCS Internal Audit Unit
  head, news, events, services, contact.
- Bilingual chrome (EN/FR); body content in English.
- SEO/AEO pass: prerendered content pages, JSON-LD structured data, sitemap,
  paginated listing pages built to scale to hundreds of entries.
- Mobile-responsive across the entire platform (audited and fixed).
- Newsletter subscription (D1-backed).

### 5.2 Public Findings Tracker (`/track`)
- Public, searchable tracker of audit findings and recommendations with
  implementation status — the transparency flagship.

### 5.3 "State of Internal Audit" Transparency Page (`/transparency`)
- Live dashboard: audit-plan coverage, aggregate risk heat map, resolution-rate
  trends. Aggregate queries only, edge-cached.

### 5.4 Internal Audit Class Registry (`/registry`, `/verify`)
- Verified professional profiles for Internal Audit Class officers (credentials,
  CPD), QR-verifiable digital certificates, public verification endpoint.
- Paginated and prerendered for SEO at scale.

### 5.5 Audit Operations Portal (`/portal`)
- Audit universe (MDAs, auditable entities), risk register, annual planning,
  engagements with working-paper uploads (R2), findings & recommendations tracker,
  notifications, per-MDA liaison views.

### 5.6 Knowledge Hub (Tier 2 — shipped)
- **Public** (`/publications`): searchable, paginated library of manuals, templates,
  standards, circulars, guidelines, reports, forms and policies with versioned,
  downloadable files.
- **Portal** (`/portal/knowledge`): adds MDA-only restricted documents.
- **Admin**: full publishing workflow — upload (PDF/DOCX/XLSX ≤ 25 MB), metadata,
  draft/publish, versioning with change notes, audience control.

### 5.7 Admin Console (`/admin`)
- Registry management, users & roles, knowledge hub publishing, submissions
  (whistleblower/feedback) review pipeline, leadership, news & events, site config,
  audit log of every administrative mutation.
- AI-training features disabled by directive.

### 5.8 Whistleblowing & Submissions
- Public reporting form with sealed reference numbers and a review pipeline in admin.
  (Provable-anonymity hardening is scheduled in Phase 3 — see §9.)

---

## 6. Architecture

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (static export), React 19, Tailwind CSS v4 |
| Edge hosting | Cloudflare Pages (custom domain `iad.ohcsghana.org`, SSL) |
| Backend | Cloudflare Pages Functions (serverless, same-origin `/api/*`) |
| Database | Cloudflare D1 (SQLite at the edge) — 15 migrations applied |
| File storage | Cloudflare R2 (`iad-uploads`) — working papers, knowledge documents |
| Auth | Magic-link email (Resend), role-based sessions |
| Quality | 423 automated tests (Vitest), static build gate, API contract doc |

Key architectural decisions:
- **Static export + edge Functions**: the whole site is served from Cloudflare's edge
  for sub-second global loads; all dynamic behaviour goes through same-origin APIs.
- **Contract-first backend**: `docs/API-CONTRACT.md` defines the entire API surface.
- **Audit-everything**: every admin mutation writes to an audit log.
- **Fail-soft prerendering**: build-time data snapshots degrade gracefully so builds
  never break on API unavailability.

---

## 7. Non-Functional Requirements

- **Performance:** sub-second TTFB worldwide via Cloudflare edge; paginated lists
  (12/page) so pages stay fast as data grows.
- **Security:** role-gated endpoints, session hardening, file-type validation with
  magic-byte sniffing on uploads, Content-Disposition sanitisation, no client-side
  secrets.
- **Privacy:** whistleblower submissions designed for anonymity; Phase 3 adds formal
  anonymity hardening and a published protocol.
- **Reliability:** idempotent seed/migration tooling; demo data clearly separated from
  production roster data.
- **Accessibility:** semantic HTML, aria labelling, keyboard-operable modals and
  toggles; formal WCAG pass scheduled in Phase 3.

---

## 8. Known Limitations (v1.0)

1. Magic-link login requires a Resend API key in production secrets (held by client).
2. Seeded demonstration data (MDAs, findings, registry officers) awaits replacement
   with the real roster — bulk CSV import is available as a follow-on.
3. News/events admin screens exist; final wiring of those content types is optional
   polish.
4. French translation covers site chrome; full body-content translation is Tier 3.

---

## 9. Roadmap

| Phase | Scope | Status |
|---|---|---|
| Phase 1 | Live backend: D1 schema, API, magic-link auth, admin CMS | ✅ Shipped |
| Phase 2 | Audit Operations Platform (universe, risk, planning, engagements, findings, liaison portal) | ✅ Shipped |
| Tier 1 | Public findings tracker, transparency page, IAC registry & CPD | ✅ Shipped |
| Tier 2 | Knowledge Hub | ✅ Shipped |
| Phase 3 | Hardening: security review, whistleblower provable-anonymity certification, accessibility pass, performance, launch checklist | Next |
| Tier 2 (rem.) | AI-assisted audit copilot (internal; gated on security review + real data) | Planned |
| Tier 3 | Full bilingual content, annual "State of Accountability" microsite, performance & accessibility as brand | Planned |

---

## 10. Risks & Dependencies

- **Data ownership:** real officer roster and findings data must come from IAD;
  platform value compounds only when real data flows.
- **Email deliverability:** magic-link auth depends on the Resend key and DNS records
  remaining valid.
- **Single-maintainer risk:** repository, wrangler account and D1/R2 live under the
  OHCS Google account — recommend documenting credentials handover.

---

## Annex A — Project Valuation & Commercial Guidance

Independent market context (2025–2026): brochure websites in Ghana sell for
GHS 2,000–10,000, but this platform is a **custom full-stack web application**
(public site + two authenticated portals + admin CMS + edge database + file storage
+ 423-test suite), a category that Ghanaian agencies quote at GHS 80,000–250,000 and
international shops at US$40,000–90,000.

Recommended billing structure:

| Component | Basis | Guidance (GHS) |
|---|---|---|
| Platform build (Phases 1–2, Tier 1–2 shipped) | Fixed project fee | **180,000 – 250,000** |
| Phase 3 hardening + launch | Fixed follow-on fee | 30,000 – 45,000 |
| Annual maintenance & support retainer (hosting oversight, updates, backups, content support, SLA) | Recurring | 36,000 – 60,000 / yr |
| Data migration & officer onboarding (real roster, CSV imports, training sessions) | Per engagement | 15,000 – 25,000 |
| Cloudflare + email service running costs | Pass-through at cost | ~0 – 6,000 / yr (free tiers cover most) |

**Headline advice:** quote **GHS 220,000** for the delivered platform (defensible
mid-market figure for the scope), with Phase 3 and the retainer as separate line
items so the client sees continuing value rather than a single large number.
