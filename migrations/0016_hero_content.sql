CREATE TABLE IF NOT EXISTS hero_content (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  draft_json TEXT NOT NULL,
  published_json TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 0,
  published_revision INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  published_at TEXT,
  last_change TEXT
);
CREATE TABLE IF NOT EXISTS hero_uploads (
  id TEXT PRIMARY KEY,
  r2_key TEXT NOT NULL UNIQUE,
  uploaded_by TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_hero_uploads_author_time ON hero_uploads(uploaded_by, created_at);
