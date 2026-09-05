-- iad-website/migrations/0012_audit_ops.sql
--
-- IAD audit operations schema per docs/API-CONTRACT.md (v1).
-- Covers: portal users, audit universe, annual plans, engagements,
-- working papers, findings, recommendations, management responses,
-- the IAC auditor registry (auditors/credentials/cpd/certificates),
-- notifications and the audit_log.
--
-- Convention note: the pre-existing OHCS tables store timestamps as
-- epoch-milliseconds INTEGER; the contract specifies ISO-8601 dates, so
-- all new audit-ops tables store timestamps/dates as ISO-8601 TEXT.

CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('admin','director','manager','auditor','mda_liaison')),
  -- For mda_liaison users this holds the MDA name and scopes them to
  -- findings whose audit_universe.mda_name matches it.
  mda_id      TEXT,
  active      INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_mda ON users(mda_id);

CREATE TABLE IF NOT EXISTS audit_universe (
  id               TEXT PRIMARY KEY,
  mda_name         TEXT NOT NULL,
  unit_name        TEXT NOT NULL,
  category         TEXT NOT NULL,
  risk_likelihood  INTEGER NOT NULL CHECK (risk_likelihood BETWEEN 1 AND 5),
  risk_impact      INTEGER NOT NULL CHECK (risk_impact BETWEEN 1 AND 5),
  last_audited_at  TEXT,
  notes            TEXT,
  created_at       TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_universe_mda ON audit_universe(mda_name);
CREATE INDEX IF NOT EXISTS idx_audit_universe_risk
  ON audit_universe(risk_likelihood, risk_impact);

CREATE TABLE IF NOT EXISTS audit_plans (
  id          TEXT PRIMARY KEY,
  year        INTEGER NOT NULL,
  title       TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','submitted','approved')),
  created_by  TEXT,
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_plans_year ON audit_plans(year, status);

CREATE TABLE IF NOT EXISTS plan_items (
  id          TEXT PRIMARY KEY,
  plan_id     TEXT NOT NULL REFERENCES audit_plans(id) ON DELETE CASCADE,
  universe_id TEXT NOT NULL REFERENCES audit_universe(id),
  quarter     TEXT NOT NULL CHECK (quarter IN ('Q1','Q2','Q3','Q4')),
  priority    TEXT NOT NULL CHECK (priority IN ('high','medium','low')),
  status      TEXT NOT NULL DEFAULT 'planned'
                CHECK (status IN ('planned','in_progress','done','deferred'))
);

CREATE INDEX IF NOT EXISTS idx_plan_items_plan ON plan_items(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_items_universe ON plan_items(universe_id);

CREATE TABLE IF NOT EXISTS engagements (
  id              TEXT PRIMARY KEY,
  code            TEXT NOT NULL UNIQUE,          -- ENG-YYYY-NNN
  title           TEXT NOT NULL,
  universe_id     TEXT NOT NULL REFERENCES audit_universe(id),
  plan_item_id    TEXT REFERENCES plan_items(id),
  phase           TEXT NOT NULL DEFAULT 'planning'
                    CHECK (phase IN ('planning','fieldwork','reporting','follow_up','closed')),
  lead_auditor_id TEXT REFERENCES users(id),
  start_date      TEXT NOT NULL,
  end_date        TEXT,
  overall_rating  TEXT,
  created_at      TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_engagements_universe ON engagements(universe_id);
CREATE INDEX IF NOT EXISTS idx_engagements_phase ON engagements(phase);
CREATE INDEX IF NOT EXISTS idx_engagements_lead ON engagements(lead_auditor_id);

CREATE TABLE IF NOT EXISTS engagement_team (
  engagement_id TEXT NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
  user_id       TEXT NOT NULL REFERENCES users(id),
  team_role     TEXT NOT NULL,
  PRIMARY KEY (engagement_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_engagement_team_user ON engagement_team(user_id);

CREATE TABLE IF NOT EXISTS working_papers (
  id            TEXT PRIMARY KEY,
  engagement_id TEXT NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  r2_key        TEXT NOT NULL,
  uploaded_by   TEXT,
  created_at    TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_working_papers_engagement
  ON working_papers(engagement_id);

CREATE TABLE IF NOT EXISTS findings (
  id            TEXT PRIMARY KEY,
  engagement_id TEXT NOT NULL REFERENCES engagements(id),
  universe_id   TEXT NOT NULL REFERENCES audit_universe(id),
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  category      TEXT NOT NULL,
  severity      TEXT NOT NULL CHECK (severity IN ('high','medium','low')),
  condition     TEXT,
  criteria      TEXT,
  cause         TEXT,
  effect        TEXT,
  status        TEXT NOT NULL DEFAULT 'open'
                  CHECK (status IN ('open','responded','in_progress','closed','verified')),
  -- Set when status flips to closed/verified; drives the monthly
  -- "closed" trend series on the public transparency dashboard.
  closed_at     TEXT,
  created_at    TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_findings_engagement ON findings(engagement_id);
CREATE INDEX IF NOT EXISTS idx_findings_universe ON findings(universe_id);
CREATE INDEX IF NOT EXISTS idx_findings_status ON findings(status);
CREATE INDEX IF NOT EXISTS idx_findings_severity ON findings(severity);
CREATE INDEX IF NOT EXISTS idx_findings_created ON findings(created_at);

CREATE TABLE IF NOT EXISTS recommendations (
  id          TEXT PRIMARY KEY,
  finding_id  TEXT NOT NULL REFERENCES findings(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  owner       TEXT NOT NULL,
  due_date    TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'open'
                CHECK (status IN ('open','in_progress','implemented','verified','overdue')),
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_recommendations_finding ON recommendations(finding_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_due ON recommendations(due_date, status);

CREATE TABLE IF NOT EXISTS management_responses (
  id                TEXT PRIMARY KEY,
  finding_id        TEXT NOT NULL REFERENCES findings(id) ON DELETE CASCADE,
  recommendation_id TEXT REFERENCES recommendations(id),
  respondent_name   TEXT NOT NULL,
  mda_name          TEXT NOT NULL,
  response_text     TEXT NOT NULL,
  action_plan       TEXT,
  evidence_r2_key   TEXT,
  submitted_at      TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_management_responses_finding
  ON management_responses(finding_id);

-- ─── IAC auditor registry ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS auditors (
  id          TEXT PRIMARY KEY,
  staff_id    TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  grade       TEXT,
  mda_name    TEXT,
  public_slug TEXT NOT NULL UNIQUE,
  verified    INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auditors_verified ON auditors(verified);
CREATE INDEX IF NOT EXISTS idx_auditors_name ON auditors(name);

CREATE TABLE IF NOT EXISTS credentials (
  id           TEXT PRIMARY KEY,
  auditor_id   TEXT NOT NULL REFERENCES auditors(id) ON DELETE CASCADE,
  body         TEXT NOT NULL CHECK (body IN ('FCCA','ACCA','IIA','CITG','ICA-GH','OTHER')),
  designation  TEXT NOT NULL,
  year         INTEGER,
  verified     INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_credentials_auditor ON credentials(auditor_id);

CREATE TABLE IF NOT EXISTS cpd_records (
  id          TEXT PRIMARY KEY,
  auditor_id  TEXT NOT NULL REFERENCES auditors(id) ON DELETE CASCADE,
  activity    TEXT NOT NULL,
  points      INTEGER NOT NULL,
  year        INTEGER NOT NULL,
  source      TEXT
);

CREATE INDEX IF NOT EXISTS idx_cpd_records_auditor ON cpd_records(auditor_id, year);

CREATE TABLE IF NOT EXISTS certificates (
  id          TEXT PRIMARY KEY,
  auditor_id  TEXT NOT NULL REFERENCES auditors(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  serial      TEXT NOT NULL UNIQUE,
  verify_code TEXT NOT NULL UNIQUE,
  issued_at   TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_certificates_auditor ON certificates(auditor_id);

-- ─── Cross-cutting ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notifications (
  id           TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL REFERENCES users(id),
  type         TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  read         INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_user
  ON notifications(user_id, read, created_at);

CREATE TABLE IF NOT EXISTS audit_log (
  id         TEXT PRIMARY KEY,
  user_id    TEXT,
  action     TEXT NOT NULL,
  entity     TEXT NOT NULL,
  entity_id  TEXT,
  meta_json  TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at);
