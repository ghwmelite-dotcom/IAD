import { describe, it, expect } from 'vitest';
import {
  hasFullAccess,
  canAccessEngagement,
  liaisonOwnsFinding,
} from '../../../functions/_shared/portal-access';
import type { SessionUser } from '../../../functions/_shared/session-auth';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';

const ENGAGEMENT_SCOPE_SQL =
  'SELECT id FROM engagements WHERE lead_auditor_id = ? UNION SELECT engagement_id AS id FROM engagement_team WHERE user_id = ?';
const LIAISON_SQL =
  'SELECT f.id FROM findings f JOIN audit_universe au ON au.id = f.universe_id WHERE f.id = ? AND au.mda_name = ?';

function user(role: string, mdaId: string | null = null): SessionUser {
  return { id: 'u1', email: 'u@iad.gov.gh', name: 'User', role, mdaId };
}

describe('hasFullAccess', () => {
  it('grants admin, director and manager', () => {
    expect(hasFullAccess('admin')).toBe(true);
    expect(hasFullAccess('director')).toBe(true);
    expect(hasFullAccess('manager')).toBe(true);
  });

  it('denies auditor and mda_liaison', () => {
    expect(hasFullAccess('auditor')).toBe(false);
    expect(hasFullAccess('mda_liaison')).toBe(false);
  });
});

describe('canAccessEngagement', () => {
  it('grants full-access roles without a scope query', async () => {
    const env = mockEnv({ db: makeD1([]) }); // no scripts: any query would throw
    expect(await canAccessEngagement(env, user('director'), 'eng-9')).toBe(true);
  });

  it('grants an auditor on their own engagement', async () => {
    const env = mockEnv({
      db: makeD1([{ sql: ENGAGEMENT_SCOPE_SQL, all: { results: [{ id: 'eng-9' }] } }]),
    });
    expect(await canAccessEngagement(env, user('auditor'), 'eng-9')).toBe(true);
  });

  it('denies an auditor on another engagement', async () => {
    const env = mockEnv({
      db: makeD1([{ sql: ENGAGEMENT_SCOPE_SQL, all: { results: [{ id: 'eng-1' }] } }]),
    });
    expect(await canAccessEngagement(env, user('auditor'), 'eng-9')).toBe(false);
  });

  it('always denies mda_liaison (they are scoped via findings instead)', async () => {
    const env = mockEnv({ db: makeD1([]) });
    expect(await canAccessEngagement(env, user('mda_liaison', 'Ministry of Health'), 'eng-9')).toBe(false);
  });
});

describe('liaisonOwnsFinding', () => {
  it('is true when the finding MDA matches the liaison mda_id', async () => {
    const env = mockEnv({
      db: makeD1([{ sql: LIAISON_SQL, first: { id: 'f1' } }]),
    });
    expect(await liaisonOwnsFinding(env, user('mda_liaison', 'Ministry of Health'), 'f1')).toBe(true);
  });

  it('is false when the finding belongs to another MDA', async () => {
    const env = mockEnv({ db: makeD1([{ sql: LIAISON_SQL, first: null }]) });
    expect(await liaisonOwnsFinding(env, user('mda_liaison', 'Ministry of Health'), 'f2')).toBe(false);
  });

  it('is false for non-liaison roles or missing mda_id without querying', async () => {
    const env = mockEnv({ db: makeD1([]) });
    expect(await liaisonOwnsFinding(env, user('auditor'), 'f1')).toBe(false);
    expect(await liaisonOwnsFinding(env, user('mda_liaison', null), 'f1')).toBe(false);
  });
});
