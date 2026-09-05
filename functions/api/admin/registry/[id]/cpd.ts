//
// POST /api/admin/registry/:id/cpd
// Add a CPD record to an auditor. admin/director only.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { parseBody } from '../../../../_shared/validate';
import { first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { z } from 'zod';

const ROLES = ['admin', 'director'] as const;

const Body = z.object({
  activity: z.string().min(1).max(300),
  points: z.number().int().min(0).max(500),
  year: z.number().int().min(1990).max(2100),
  source: z.string().max(200).optional(),
});

export const onRequestPost: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const auditor = await first<{ id: string }>(env, 'SELECT id FROM auditors WHERE id = ?', params.id);
  if (!auditor) {
    return json({ error: { code: 'NOT_FOUND', message: 'auditor not found' } }, { status: 404 });
  }

  const id = crypto.randomUUID();
  await run(
    env,
    'INSERT INTO cpd_records (id, auditor_id, activity, points, year, source) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    params.id,
    v.activity,
    v.points,
    v.year,
    v.source ?? null,
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'cpd_record',
    entityId: id,
    meta: { auditor_id: params.id, year: v.year, points: v.points },
  });

  return json({ data: { id } }, { status: 201 });
};
