# IAD Platform — API Contract & Data Model (v1)

All specialist agents build against THIS contract. Base path: `/api`. Stack: Cloudflare Pages Functions (`functions/api/**`), D1 (SQLite), R2 for files, magic-link auth with roles (extend the existing `functions/api/admin` + `functions/_shared` HMAC/cookie pattern).

Roles: `admin`, `director`, `manager`, `auditor`, `mda_liaison`. Portal routes require a session; public routes are unauthenticated but rate-limited. Write endpoints validate with zod. Every mutating endpoint writes to `audit_log`.

## D1 tables (new migrations, prefix 0012+)

- `users(id, email UNIQUE, name, role, mda_id NULL, active, created_at)`
- `audit_universe(id, mda_name, unit_name, category, risk_likelihood INT 1-5, risk_impact INT 1-5, last_audited_at NULL, notes, created_at)` — risk_score = likelihood × impact (computed)
- `audit_plans(id, year, title, status('draft','submitted','approved'), created_by, created_at)`
- `plan_items(id, plan_id, universe_id, quarter('Q1'-'Q4'), priority('high','medium','low'), status('planned','in_progress','done','deferred'))`
- `engagements(id, code UNIQUE, title, universe_id, plan_item_id NULL, phase('planning','fieldwork','reporting','follow_up','closed'), lead_auditor_id, start_date, end_date NULL, overall_rating NULL, created_at)`
- `engagement_team(engagement_id, user_id, team_role, PRIMARY KEY(engagement_id, user_id))`
- `working_papers(id, engagement_id, title, r2_key, uploaded_by, created_at)`
- `findings(id, engagement_id, universe_id, title, description, category, severity('high','medium','low'), condition, criteria, cause, effect, status('open','responded','in_progress','closed','verified'), created_at)`
- `recommendations(id, finding_id, text, owner, due_date, status('open','in_progress','implemented','verified','overdue'), created_at)`
- `management_responses(id, finding_id, recommendation_id NULL, respondent_name, mda_name, response_text, action_plan, evidence_r2_key NULL, submitted_at)`
- `auditors(id, staff_id UNIQUE, name, grade, mda_name, public_slug UNIQUE, verified INT 0/1, created_at)` — IAC registry
- `credentials(id, auditor_id, body('FCCA','ACCA','IIA','CITG','ICA-GH','OTHER'), designation, year, verified INT 0/1)`
- `cpd_records(id, auditor_id, activity, points INT, year, source)`
- `certificates(id, auditor_id, title, serial UNIQUE, verify_code UNIQUE, issued_at)`
- `notifications(id, user_id, type, payload_json, read INT 0/1, created_at)`
- `audit_log(id, user_id NULL, action, entity, entity_id, meta_json, created_at)`
- `knowledge_documents(id, slug UNIQUE, title, summary NULL, category('manual','template','standard','circular','guideline','report','form','policy'), audience('public','mda') DEFAULT 'public', status('draft','published','archived') DEFAULT 'draft', tags NULL (comma-separated), download_count INT, created_by, created_at, updated_at, published_at NULL)` — Knowledge Hub (0015)
- `knowledge_versions(id, document_id → knowledge_documents ON DELETE CASCADE, version INT, r2_key, file_name, file_size, mime, change_note NULL, uploaded_by, created_at)` — a document may have ZERO versions (metadata-only); R2 keys `knowledge/<doc_id>/v<version>.<ext>`; accepted mimes PDF/DOCX/XLSX, max 25 MB

Existing content tables (news, events, publications, submissions) stay; extend `submissions.type` enum to include `special_audit`, `consultancy`, `fraud_report` (frontend already posts these).

## Public API (no auth)

- `GET /api/public/transparency/summary` → `{ totals: {findings, open, closed, resolutionRate, engagements, mdasCovered}, bySeverity: [{severity, count}], byCategory: [{category, count}], byStatus: [{status, count}], trend: [{month, raised, closed}], riskHeat: [{likelihood, impact, count}] }` — aggregates only, edge-cached 300s
- `GET /api/public/transparency/by-mda` → `[{ mda_name, findings, closed, resolutionRate, openHigh }]` (no finding text)
- `GET /api/public/registry/:slug` → `{ name, grade, mda_name, verified, credentials: [{body, designation, year}], cpdPoints, memberSince }` — only if `verified=1`
- `GET /api/public/certificates/verify/:code` → `{ valid, title, serial, issuedAt, auditorName }`
- `POST /api/public/submissions` (exists; extend types), `GET /api/public/track/:ref` (exists)
- `GET /api/public/knowledge?q=&category=&page=1&pageSize=12` → `{ data: [{ id, slug, title, summary, category, tags: string[], download_count, published_at, current_file: { version, file_name, file_size, mime } | null }], meta: { page, pageSize, total } }` — only `status='published' AND audience='public'`; q matches title/summary/tags (LIKE); edge-cached 120s
- `GET /api/public/knowledge/:id/download` → streams latest version from R2 (`Content-Type` from version, `Content-Disposition: attachment`), increments `download_count`; 404 if not published/public or no version

## Portal API (session + role)

All under `/api/portal/`, role-gated: director/manager full; auditor own engagements; mda_liaison only own MDA's findings + posting management responses.

- `GET /api/portal/dashboard` → KPIs + charts data (resolution rate, overdue, by severity, recent activity)
- `GET|POST /api/portal/universe` · `PATCH|DELETE /api/portal/universe/:id`
- `GET|POST /api/portal/plans` · `GET|PATCH /api/portal/plans/:id` · `POST /api/portal/plans/:id/items` · `PATCH /api/portal/plan-items/:id`
- `GET|POST /api/portal/engagements` · `GET|PATCH /api/portal/engagements/:id` · `POST /api/portal/engagements/:id/team` · `POST /api/portal/engagements/:id/papers` (R2 upload)
- `GET|POST /api/portal/findings` · `GET|PATCH /api/portal/findings/:id`
- `POST /api/portal/findings/:id/recommendations` · `PATCH /api/portal/recommendations/:id`
- `GET|POST /api/portal/findings/:id/responses` (mda_liaison posts here)
- `GET /api/portal/notifications` · `POST /api/portal/notifications/read`
- `GET /api/portal/knowledge?q=&category=&page=1&pageSize=12` (all portal roles) → same shape as public list but also includes `audience='mda'` published docs
- `GET /api/portal/knowledge/:id/download` (all portal roles) → same as public download but also allows `audience='mda'`

## Admin API (session, admin/director)

- Existing `/api/admin/*` CMS endpoints stay (news, events, publications, submissions, users, settings, audit-log)
- `GET|POST /api/admin/registry` · `PATCH /api/admin/registry/:id` (verify auditors)
- `POST /api/admin/registry/:id/credentials` · `POST /api/admin/registry/:id/cpd` · `POST /api/admin/registry/:id/certificates`
- `GET /api/admin/knowledge?q=&category=&status=&audience=&page=&pageSize=` → all docs any status, each with `version_count` + `current_file`; `{ data, meta: { page, pageSize, total } }`
- `POST /api/admin/knowledge` (multipart: title*, summary, category*, audience, status, tags, change_note, file optional) → creates doc, slug auto-generated (`<slugified-title>-<8 hex>`), version 1 if file present → 201 `{ id, slug, version, r2_key }`
- `PATCH /api/admin/knowledge/:id` (JSON: title/summary/category/audience/status/tags) → stamps `published_at` on first transition to `published`, always bumps `updated_at`
- `DELETE /api/admin/knowledge/:id` → deletes doc row, version rows and all R2 objects
- `POST /api/admin/knowledge/:id/versions` (multipart: file*, change_note) → adds version n+1 at `knowledge/<id>/v<n+1>.<ext>`, bumps `updated_at` → 201
- `GET /api/admin/knowledge/:id/file?version=n` → streams a specific version inline (admin preview)

## Frontend routes consuming this

- Public: `/transparency` (dashboard + by-MDA table), `/registry` (search) + `/registry/[slug]`, `/verify` (certificate checker)
- Portal: `/portal` (dashboard), `/portal/universe` (register + risk heat map), `/portal/plans` (+ detail), `/portal/engagements` (+ detail with phases/team/papers), `/portal/findings` (+ detail with recommendations, responses, aging), `/portal/my-mda` (liaison view), `/portal/login`
- Admin: existing `/admin/*` + `/admin/registry`

## Conventions

- Responses: `{ data: ... }` or `{ error: { code, message } }`, proper HTTP statuses
- Dates ISO-8601; IDs: `crypto.randomUUID()`; engagement codes `ENG-YYYY-NNN`
- Portal frontend is client-rendered under `src/app/portal/` using `src/lib/api.ts` fetch client (extend it); charts with `recharts` (add dependency)
- Seed data: `migrations/seed.sql` or `scripts/seed.ts` with 6+ MDAs, ~20 findings, 8 auditors, 2 plans, 5 engagements — realistic Ghana MDA names
