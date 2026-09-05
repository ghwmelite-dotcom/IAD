//
// GET|POST /api/portal/findings/:id/responses
// Management responses. GET: anyone who can read the finding. POST:
// mda_liaison for their own MDA's findings (their primary write), plus
// full-access roles. A submitted response flips the finding to
// 'responded' and notifies director/manager.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { parseBody } from '../../../../_shared/validate';
import { all, first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import {
  canAccessFinding,
  hasFullAccess,
  liaisonOwnsFinding,
} from '../../../../_shared/portal-access';
import { notifyRoles } from '../../../../_shared/notify';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { nowIso } from '../../../../_shared/time';
import { z } from 'zod';

const Body = z.object({
  recommendation_id: z.string().optional(),
  respondent_name: z.string().min(1).max(200),
  response_text: z.string().min(1).max(10000),
  action_plan: z.string().max(10000).optional(),
  evidence_r2_key: z.string().max(500).optional(),
});

interface FindingRow {
  id: string;
  engagement_id: string;
  status: string;
  closed_at: string | null;
}

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env);
  if (auth.kind === 'reject') return auth.response;

  const finding = await first<FindingRow>(
    env,
    'SELECT id, engagement_id, status, closed_at FROM findings WHERE id = ?',
    params.id,
  );
  if (!finding) {
    return json({ error: { code: 'NOT_FOUND', message: 'finding not found' } }, { status: 404 });
  }

  const allowed =
    (await canAccessFinding(env, auth.user, finding)) ||
    (await liaisonOwnsFinding(env, auth.user, params.id));
  if (!allowed) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no access to this finding' } }, { status: 403 });
  }

  const responses = await all(
    env,
    `SELECT id, finding_id, recommendation_id, respondent_name, mda_name, response_text, action_plan, evidence_r2_key, submitted_at
     FROM management_responses WHERE finding_id = ? ORDER BY submitted_at DESC`,
    params.id,
  );

  return json({ data: responses });
};

export const onRequestPost: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env);
  if (auth.kind === 'reject') return auth.response;
  const user = auth.user;

  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const finding = await first<FindingRow & { mda_name: string; title: string }>(
    env,
    `SELECT f.id, f.engagement_id, f.status, f.closed_at, f.title, au.mda_name
     FROM findings f JOIN audit_universe au ON au.id = f.universe_id
     WHERE f.id = ?`,
    params.id,
  );
  if (!finding) {
    return json({ error: { code: 'NOT_FOUND', message: 'finding not found' } }, { status: 404 });
  }

  // mda_liaison may respond only for their own MDA; auditors cannot post
  // management responses at all.
  const isLiaison = user.role === 'mda_liaison';
  if (isLiaison) {
    if (!user.mdaId || user.mdaId !== finding.mda_name) {
      return json(
        { error: { code: 'AUTH_FORBIDDEN', message: 'this finding does not belong to your MDA' } },
        { status: 403 },
      );
    }
  } else if (!hasFullAccess(user.role)) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'insufficient role' } }, { status: 403 });
  }

  if (v.recommendation_id) {
    const rec = await first<{ id: string }>(
      env,
      'SELECT id FROM recommendations WHERE id = ? AND finding_id = ?',
      v.recommendation_id,
      params.id,
    );
    if (!rec) {
      return json(
        { error: { code: 'NOT_FOUND', message: 'recommendation not found on this finding' } },
        { status: 404 },
      );
    }
  }

  const id = crypto.randomUUID();
  const now = nowIso();
  await run(
    env,
    `INSERT INTO management_responses
       (id, finding_id, recommendation_id, respondent_name, mda_name, response_text, action_plan, evidence_r2_key, submitted_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    params.id,
    v.recommendation_id ?? null,
    v.respondent_name,
    finding.mda_name,
    v.response_text,
    v.action_plan ?? null,
    v.evidence_r2_key ?? null,
    now,
  );

  if (finding.status === 'open') {
    await run(env, "UPDATE findings SET status = 'responded' WHERE id = ?", params.id);
  }

  await notifyRoles(env, ['director', 'manager'], 'response_submitted', {
    finding_id: params.id,
    finding_title: finding.title,
    mda_name: finding.mda_name,
    respondent_name: v.respondent_name,
  });

  await writeAuditLog(env, {
    userId: user.id,
    action: 'create',
    entity: 'management_response',
    entityId: id,
    meta: { finding_id: params.id, mda_name: finding.mda_name },
  });

  return json({ data: { id } }, { status: 201 });
};
