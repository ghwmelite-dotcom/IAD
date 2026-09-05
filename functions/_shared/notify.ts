// In-app notifications for portal users, plus the overdue-recommendation
// status flip (recommendations past due_date move open/in_progress →
// overdue and notify director/manager once, at flip time).
import type { Env } from './types';
import { all, run } from './db';
import { nowIso } from './time';

export async function createNotification(
  env: Env,
  userId: string,
  type: string,
  payload: Record<string, unknown>,
): Promise<void> {
  await run(
    env,
    'INSERT INTO notifications (id, user_id, type, payload_json, read, created_at) VALUES (?, ?, ?, ?, 0, ?)',
    crypto.randomUUID(),
    userId,
    type,
    JSON.stringify(payload),
    nowIso(),
  );
}

/** Notify every active portal user holding one of the given roles. */
export async function notifyRoles(
  env: Env,
  roles: readonly string[],
  type: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const placeholders = roles.map(() => '?').join(',');
  const users = await all<{ id: string }>(
    env,
    `SELECT id FROM users WHERE active = 1 AND role IN (${placeholders})`,
    ...roles,
  );
  for (const u of users) {
    await createNotification(env, u.id, type, payload);
  }
}

/** Notify the lead and team of an engagement (e.g. finding assigned). */
export async function notifyEngagementTeam(
  env: Env,
  engagementId: string,
  type: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const users = await all<{ id: string }>(
    env,
    'SELECT lead_auditor_id AS id FROM engagements WHERE id = ? AND lead_auditor_id IS NOT NULL UNION SELECT user_id AS id FROM engagement_team WHERE engagement_id = ?',
    engagementId,
    engagementId,
  );
  for (const u of users) {
    await createNotification(env, u.id, type, payload);
  }
}

/**
 * Flip open/in_progress recommendations whose due_date has passed to
 * 'overdue'. Returns the ids that flipped so callers can notify.
 */
export async function flipOverdueRecommendations(env: Env): Promise<string[]> {
  const today = nowIso().slice(0, 10);
  const due = await all<{ id: string; finding_id: string }>(
    env,
    "SELECT id, finding_id FROM recommendations WHERE status IN ('open','in_progress') AND due_date < ?",
    today,
  );
  for (const rec of due) {
    await run(env, "UPDATE recommendations SET status = 'overdue' WHERE id = ?", rec.id);
  }
  return due.map((r) => r.id);
}
