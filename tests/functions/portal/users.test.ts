import { describe, it, expect } from 'vitest';
import { onRequestGet } from '../../../functions/api/portal/users';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';

const SESSION_SELECT =
  'SELECT s.session_id, s.created_at, s.expires_at, u.id AS user_id, u.email, u.name, u.role, u.mda_id FROM admin_sessions s JOIN users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.active = 1';
const SESSION_SLIDE =
  'UPDATE admin_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?';
const USERS_SELECT =
  'SELECT id, name, email, role, mda_id FROM users WHERE active = 1 ORDER BY name ASC';

function ctx(db: D1Database, cookie?: string) {
  return {
    request: new Request('https://x/api/portal/users', {
      headers: cookie ? { Cookie: `admin_session=${cookie}` } : {},
    }),
    env: mockEnv({ db }),
    params: {},
    waitUntil: () => {},
    data: {},
  };
}

function sessionScripts(role: string) {
  const now = Date.now();
  return [
    {
      sql: SESSION_SELECT,
      first: {
        session_id: 'sess-1',
        created_at: now - 1000,
        expires_at: now + 60_000,
        user_id: 'u1',
        email: 'user@iad.gov.gh',
        name: 'User',
        role,
        mda_id: null,
      },
    },
    { sql: SESSION_SLIDE, run: {} },
  ];
}

describe('GET /api/portal/users', () => {
  it('returns active users for a full-access role (director)', async () => {
    const db = makeD1([
      ...sessionScripts('director'),
      {
        sql: USERS_SELECT,
        all: {
          results: [
            { id: 'u1', name: 'Ama Serwaa Boateng', email: 'manager@iad.gov.gh', role: 'manager', mda_id: null },
            { id: 'u2', name: 'Yaw Osei Frimpong', email: 'auditor@iad.gov.gh', role: 'auditor', mda_id: null },
          ],
        },
      },
    ]);
    const res = await onRequestGet(ctx(db, 'sess-1'));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: { id: string; role: string; email: string }[] };
    expect(body.data).toHaveLength(2);
    expect(body.data[0]?.email).toBe('manager@iad.gov.gh');
  });

  it('rejects auditors with 403', async () => {
    const db = makeD1([...sessionScripts('auditor')]);
    const res = await onRequestGet(ctx(db, 'sess-1'));
    expect(res.status).toBe(403);
  });

  it('rejects unauthenticated requests with 401', async () => {
    const db = makeD1([]);
    const res = await onRequestGet(ctx(db));
    expect(res.status).toBe(401);
  });
});
