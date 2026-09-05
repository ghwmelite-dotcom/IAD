//
// POST /api/v1/subscribe
// Public newsletter intake for the homepage CTA form. Re-subscribing an
// existing address returns success with `already: true` — callers cannot
// enumerate the subscriber list because the response is identical either way.
//
// Rate limiting follows the public intake pattern in submissions.ts: a
// per-IP hourly cap recorded in audit_log.

import type { PagesFunction } from '../../_shared/types';
import { json } from '../../_shared/json';
import { parseBody } from '../../_shared/validate';
import { first, run } from '../../_shared/db';
import { nowIso } from '../../_shared/time';
import { z } from 'zod';

const Body = z.object({
  email: z.string().email().max(320),
});

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const email = parsed.value.email.trim().toLowerCase();

  // Simple per-IP hourly cap on public intake.
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const recent = await first<{ n: number }>(
    env,
    "SELECT COUNT(*) AS n FROM audit_log WHERE action = 'newsletter_subscribe' AND entity_id = ? AND created_at > ?",
    ip,
    new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString(),
  );
  if (recent && recent.n >= RATE_LIMIT_MAX) {
    return json(
      { error: { code: 'RATE_LIMITED', message: 'too many requests; please try again later' } },
      { status: 429, headers: { 'retry-after': '3600' } },
    );
  }

  const now = nowIso();

  const existing = await first<{ id: string }>(
    env,
    'SELECT id FROM newsletter_subscribers WHERE email = ?',
    email,
  );

  let already = Boolean(existing);
  if (!already) {
    try {
      await run(
        env,
        'INSERT INTO newsletter_subscribers (id, email, created_at) VALUES (?, ?, ?)',
        crypto.randomUUID(),
        email,
        now,
      );
    } catch (err) {
      // UNIQUE race: another request inserted the same address concurrently.
      if (err instanceof Error && err.message.includes('UNIQUE constraint failed')) {
        already = true;
      } else {
        throw err;
      }
    }
  }

  // Rate-limit marker (user_id NULL — public unauthenticated intake).
  await run(
    env,
    'INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, NULL, ?, ?, ?, ?, ?)',
    crypto.randomUUID(),
    'newsletter_subscribe',
    'newsletter_subscriber',
    ip,
    JSON.stringify({ already }),
    now,
  );

  return json({ data: { subscribed: true, already } }, { status: already ? 200 : 201 });
};
