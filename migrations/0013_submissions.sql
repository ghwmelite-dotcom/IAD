-- iad-website/migrations/0013_submissions.sql
--
-- Public submissions (Special Audit Requests, Consultancy, Fraud Reports,
-- RTI, Feedback, Complaints). The API contract assumed an existing
-- submissions table whose type enum needed extending with
-- 'special_audit' | 'consultancy' | 'fraud_report'; no such table exists
-- in migrations 0001-0011, so this migration creates it fresh with the
-- full enum the rebranded frontend already posts (src/types/index.ts).
--
-- Timestamps are ISO-8601 TEXT, matching 0012_audit_ops.sql.

CREATE TABLE IF NOT EXISTS submissions (
  id                TEXT PRIMARY KEY,
  reference_number  TEXT NOT NULL UNIQUE,
  type              TEXT NOT NULL CHECK (type IN (
                      'special_audit','consultancy','fraud_report',
                      'rti','complaint','feedback')),
  status            TEXT NOT NULL DEFAULT 'received' CHECK (status IN (
                      'received','under_review','in_progress','resolved','closed')),
  name              TEXT,
  email             TEXT,
  phone             TEXT,
  subject           TEXT,
  body              TEXT NOT NULL,
  extra_json        TEXT,
  created_at        TEXT NOT NULL,
  updated_at        TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(type, status);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

CREATE TABLE IF NOT EXISTS submission_status_history (
  id            TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  status        TEXT NOT NULL,
  note          TEXT,
  created_at    TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submission_status_history_submission
  ON submission_status_history(submission_id, created_at);
