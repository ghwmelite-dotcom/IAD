-- iad-website/migrations/0015_knowledge_hub.sql
--
-- Knowledge Hub: versioned document library (manuals, templates, standards,
-- circulars, guidelines, reports, forms, policies). Metadata lives in
-- knowledge_documents; each uploaded file is a row in knowledge_versions
-- pointing at an R2 object under knowledge/<doc_id>/v<version>.<ext>.
-- A document may have ZERO versions (metadata-only entry).
--
-- audience: 'public' (website download) or 'mda' (portal-only).
-- status:   'draft' → 'published' → 'archived'.
-- Timestamps are ISO-8601 TEXT, matching 0013_submissions.sql / 0014.

CREATE TABLE IF NOT EXISTS knowledge_documents (
  id             TEXT PRIMARY KEY,
  slug           TEXT NOT NULL UNIQUE,
  title          TEXT NOT NULL,
  summary        TEXT,
  category       TEXT NOT NULL CHECK (category IN ('manual','template','standard','circular','guideline','report','form','policy')),
  audience       TEXT NOT NULL DEFAULT 'public' CHECK (audience IN ('public','mda')),
  status         TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  tags           TEXT,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_by     TEXT,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL,
  published_at   TEXT
);

CREATE TABLE IF NOT EXISTS knowledge_versions (
  id           TEXT PRIMARY KEY,
  document_id  TEXT NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  version      INTEGER NOT NULL,
  r2_key       TEXT NOT NULL,
  file_name    TEXT NOT NULL,
  file_size    INTEGER NOT NULL,
  mime         TEXT NOT NULL,
  change_note  TEXT,
  uploaded_by  TEXT,
  created_at   TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_knowledge_documents_status_audience
  ON knowledge_documents(status, audience);

CREATE INDEX IF NOT EXISTS idx_knowledge_documents_category
  ON knowledge_documents(category);

CREATE INDEX IF NOT EXISTS idx_knowledge_versions_document
  ON knowledge_versions(document_id);
