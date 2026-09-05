import { describe, it, expect } from 'vitest';
import { onRequestPost as subscribe } from '../../functions/api/v1/subscribe';
import { mockEnv } from './_helpers/mock-env';
import { makeD1 } from './_helpers/d1-mock';

const RATE_SQL =
  "SELECT COUNT(*) AS n FROM audit_log WHERE action = 'newsletter_subscribe' AND entity_id = ? AND created_at > ?";
const LOOKUP_SQL = 'SELECT id FROM newsletter_subscribers WHERE email = ?';
const INSERT_SQL = 'INSERT INTO newsletter_subscribers (id, email, created_at) VALUES (?, ?, ?)';
const AUDIT_SQL =
  'INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, NULL, ?, ?, ?, ?, ?)';

function ctx(db: D1Database, body: unknown, ip = '203.0.113.10') {
  return {
    request: new Request('https://x/api/v1/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'cf-connecting-ip': ip },
      body: JSON.stringify(body),
    }),
    env: mockEnv({ db }),
    params: {},
    waitUntil: () => {},
    data: {},
  };
}

describe('POST /api/v1/subscribe', () => {
  it('rejects an invalid email with 400', async () => {
    const res = await subscribe(ctx(mockEnv().DB, { email: 'not-an-email' }));
    expect(res.status).toBe(400);
  });

  it('inserts a new subscriber and returns subscribed:true, already:false', async () => {
    const db = makeD1([
      { sql: RATE_SQL, first: { n: 0 } },
      { sql: LOOKUP_SQL, first: null },
      { sql: INSERT_SQL, run: {} },
      { sql: AUDIT_SQL, run: {} },
    ]);
    const res = await subscribe(ctx(db, { email: 'Adjoa@Example.gov.gh' }));
    expect(res.status).toBe(201);
    const body = (await res.json()) as { data: { subscribed: boolean; already: boolean } };
    expect(body.data).toEqual({ subscribed: true, already: false });
  });

  it('returns success with already:true for an existing subscriber (no enumeration)', async () => {
    const db = makeD1([
      { sql: RATE_SQL, first: { n: 0 } },
      { sql: LOOKUP_SQL, first: { id: 'sub-1' } },
      // No INSERT_SQL script: the mock throws if a duplicate insert is attempted.
      { sql: AUDIT_SQL, run: {} },
    ]);
    const res = await subscribe(ctx(db, { email: 'adjoa@example.gov.gh' }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: { subscribed: boolean; already: boolean } };
    expect(body.data).toEqual({ subscribed: true, already: true });
  });

  it('rate limits after 10 requests per IP per hour', async () => {
    const db = makeD1([{ sql: RATE_SQL, first: { n: 10 } }]);
    const res = await subscribe(ctx(db, { email: 'adjoa@example.gov.gh' }));
    expect(res.status).toBe(429);
    expect(res.headers.get('retry-after')).toBe('3600');
  });
});
