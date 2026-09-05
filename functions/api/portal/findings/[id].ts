//
// GET|PATCH /api/portal/findings/:id
// GET: full-access roles, auditors on the engagement, and mda_liaison for
// their own MDA. Includes recommendations and management responses.
// PATCH: full-access roles or auditors on the engagement. Flipping status
// to closed/verified stamps closed_at (drives the public trend series).

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { canAccessFinding, liaisonOwnsFinding } from '../../../_shared/portal-access';
import { writeAuditLog } from '../../../_shared/audit-log';
import { nowIso } from '../../../_shared/time';
import { z } from 'zod';

const PatchBody = z
  .object({
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(10000),
    category: z.string().min(1).max(120),
    severity: z.enum(['high', 'medium', 'low']),
    condition: z.string().max(5000).nullable(),
    criteria: z.string().max(5000).nullable(),
    cause: z.string().max(5000).nullable(),
    effect: z.string().max(5000).nullable(),
    status: z.enum(['open', 'responded', 'in_progress', 'closed', 'verified']),
  })
  .partial();

interface FindingRow {
  id: string;
  engagement_id: string;
  status: string;
  closed_at: string | null;
}

const CLOSED_STATUSES = new Set(['closed', 'verified']);

async function loadFinding(env: Env, id: string) {
  return first(
    env,
    `SELECT f.id, f.engagement_id, f.universe_id, f.title, f.description, f.category,
            f.severity, f.condition, f.criteria, f.cause, f.effect, f.status, f.closed_at, f.created_at,
            au.mda_name, au.unit_name, e.code AS engagement_code, e.title AS engagement_title
     FROM findings f
     JOIN audit_universe au ON au.id = f.universe_id
     JOIN engagements e ON e.id = f.engagement_id
     WHERE f.id = ?`,
    id,
  );
}

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env);
  if (auth.kind === 'reject') return auth.response;

  const finding = await loadFinding(env, params.id);
  if (!finding) {
    return json({ error: { code: 'NOT_FOUND', message: 'finding not found' } }, { status: 404 });
  }

  const allowed =
    (await canAccessFinding(env, auth.user, finding as { engagement_id: string })) ||
    (await liaisonOwnsFinding(env, auth.user, params.id));
  if (!allowed) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no access to this finding' } }, { status: 403 });
  }

  const recommendations = await all(
    env,
    'SELECT id, finding_id, text, owner, due_date, status, created_at FROM recommendations WHERE finding_id = ? ORDER BY due_date ASC',
    params.id,
  );

  const responses = await all(
    env,
    `SELECT id, finding_id, recommendation_id, respondent_name, mda_name, response_text, action_plan, evidence_r2_key, submitted_at
     FROM management_responses WHERE finding_id = ? ORDER BY submitted_at DESC`,
    params.id,
  );

  return json({ data: { ...finding, recommendations, responses } });
};

export const onRequestPatch: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ['admin', 'director', 'manager', 'auditor']);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, PatchBody);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const existing = await first<FindingRow>(
    env,
    'SELECT id, engagement_id, status, closed_at FROM findings WHERE id = ?',
    params.id,
  );
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'finding not found' } }, { status: 404 });
  }
  if (!(await canAccessFinding(env, auth.user, existing))) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no access to this finding' } }, { status: 403 });
  }

  const entries = Object.entries(v).filter(([, val]) => val !== undefined) as [string, unknown][];
  if (entries.length === 0) {
    return json({ error: { code: 'VALIDATION', message: 'no fields to update' } }, { status: 400 });
  }

  // Stamp/clear closed_at alongside status transitions.
  if (v.status !== undefined) {
    const closing = CLOSED_STATUSES.has(v.status);
    const wasClosed = CLOSED_STATUSES.has(existing.status);
    if (closing && !wasClosed && !existing.closed_at) {
      entries.push(['closed_at', nowIso()]);
    } else if (!closing && wasClosed) {
      entries.push(['closed_at', null]);
    }
  }

  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  await run(env, `UPDATE findings SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'update',
    entity: 'finding',
    entityId: params.id,
    meta: { fields: entries.map(([k]) => k) },
  });

  return json({ data: { id: params.id } });
};
