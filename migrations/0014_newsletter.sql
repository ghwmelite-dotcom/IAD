-- iad-website/migrations/0014_newsletter.sql
--
-- Newsletter subscribers captured by the homepage CTA form
-- (functions/api/v1/subscribe.ts). Email is UNIQUE; re-subscribing the same
-- address is a no-op that reports "already subscribed" rather than erroring.
--
-- Timestamps are ISO-8601 TEXT, matching 0013_submissions.sql.

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            TEXT PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  created_at    TEXT NOT NULL,
  unsubscribed  INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created
  ON newsletter_subscribers(created_at);
