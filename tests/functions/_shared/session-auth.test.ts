import { describe, it, expect } from 'vitest';
import { requireSession } from '../../../functions/_shared/session-auth';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';

const SESSION_SELECT =
  'SELECT s.session_id, s.created_at, s.expires_at, u.id AS user_id, u.email, u.name, u.role, u.mda_id FROM admin_sessions s JOIN users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.active = 1';
const SESSION_SLIDE =
  'UPDATE admin_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?';

function cookieRequest(cookie?: string): Request {
  return new Request('https://example.com/api/portal/dashboard', {
    headers: cookie ? { Cookie: `admin_session=${cookie}` } : {},
  });
}

function sessionEnv(row: Record<string, unknown> | null) {
  const now = Date.now();
  const db = makeD1([
    {
      sql: SESSION_SELECT,
      first: row
        ? {
            session_id: 'sess-1',
            created_at: now - 1000,
            expires_at: now + 60_000,
            ...row,
          }
        : null,
    },
    { sql: SESSION_SLIDE, run: {} },
  ]);
  return mockEnv({ db });
}

describe('requireSession', () => {
  it('returns 401 when no session cookie is present', async () => {
    const result = await requireSession(cookieRequest(), mockEnv({}));
    expect(result.kind).toBe('reject');
    if (result.kind === 'reject') expect(result.response.status).toBe(401);
  });

  it('returns 401 when the session is unknown or expired', async () => {
    const result = await requireSession(cookieRequest('nope'), sessionEnv(null));
    expect(result.kind).toBe('reject');
    if (result.kind === 'reject') expect(result.response.status).toBe(401);
  });

  it('returns the portal user for a valid session', async () => {
    const result = await requireSession(
      cookieRequest('sess-1'),
      sessionEnv({
        user_id: 'u1',
        email: 'director@iad.gov.gh',
        name: 'Director',
        role: 'director',
        mda_id: null,
      }),
    );
    expect(result.kind).toBe('ok');
    if (result.kind === 'ok') {
      expect(result.user.id).toBe('u1');
      expect(result.user.role).toBe('director');
      expect(result.user.mdaId).toBeNull();
    }
  });

  it('returns 403 when the role is not in the allowed set', async () => {
    const result = await requireSession(
      cookieRequest('sess-1'),
      sessionEnv({
        user_id: 'u2',
        email: 'liaison@moh.gov.gh',
        name: 'Liaison',
        role: 'mda_liaison',
        mda_id: 'Ministry of Health',
      }),
      ['admin', 'director', 'manager'],
    );
    expect(result.kind).toBe('reject');
    if (result.kind === 'reject') expect(result.response.status).toBe(403);
  });

  it('admits an mda_liaison when their role is allowed', async () => {
    const result = await requireSession(
      cookieRequest('sess-1'),
      sessionEnv({
        user_id: 'u2',
        email: 'liaison@moh.gov.gh',
        name: 'Liaison',
        role: 'mda_liaison',
        mda_id: 'Ministry of Health',
      }),
      ['mda_liaison'],
    );
    expect(result.kind).toBe('ok');
    if (result.kind === 'ok') expect(result.user.mdaId).toBe('Ministry of Health');
  });
});
