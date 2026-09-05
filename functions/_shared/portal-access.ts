//
// Role/scope helpers for the audit-ops portal.
//
// Access model (docs/API-CONTRACT.md):
//   admin/director/manager → full access to everything
//   auditor                → engagements where they are lead or team member
//   mda_liaison            → findings for their own MDA only (users.mda_id
//                            matched against audit_universe.mda_name), plus
//                            posting management responses
import type { Env } from './types';
import type { SessionUser } from './session-auth';
import { all, first } from './db';

export function hasFullAccess(role: string): boolean {
  return role === 'admin' || role === 'director' || role === 'manager';
}

export async function auditorEngagementIds(env: Env, userId: string): Promise<Set<string>> {
  const rows = await all<{ id: string }>(
    env,
    'SELECT id FROM engagements WHERE lead_auditor_id = ? UNION SELECT engagement_id AS id FROM engagement_team WHERE user_id = ?',
    userId,
    userId,
  );
  return new Set(rows.map((r) => r.id));
}

/** True when the user may read/mutate data under the given engagement. */
export async function canAccessEngagement(
  env: Env,
  user: SessionUser,
  engagementId: string,
): Promise<boolean> {
  if (hasFullAccess(user.role)) return true;
  if (user.role === 'auditor') {
    return (await auditorEngagementIds(env, user.id)).has(engagementId);
  }
  return false;
}

/**
 * True when an mda_liaison user's MDA owns the given finding (matched via
 * the finding's audit_universe.mda_name).
 */
export async function liaisonOwnsFinding(
  env: Env,
  user: SessionUser,
  findingId: string,
): Promise<boolean> {
  if (user.role !== 'mda_liaison' || !user.mdaId) return false;
  const row = await first<{ id: string }>(
    env,
    'SELECT f.id FROM findings f JOIN audit_universe au ON au.id = f.universe_id WHERE f.id = ? AND au.mda_name = ?',
    findingId,
    user.mdaId,
  );
  return row !== null;
}

/** True when the user may access the finding through their engagement role. */
export async function canAccessFinding(
  env: Env,
  user: SessionUser,
  finding: { engagement_id: string },
): Promise<boolean> {
  if (hasFullAccess(user.role)) return true;
  if (user.role === 'auditor') return canAccessEngagement(env, user, finding.engagement_id);
  return false;
}
