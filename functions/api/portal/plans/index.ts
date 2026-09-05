//
// GET|POST /api/portal/plans
// Annual audit plans. Read: internal audit roles. Write: admin/director/manager.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { writeAuditLog } from '../../../_shared/audit-log';
import { nowIso } from '../../../_shared/time';
import { z } from 'zod';

const READ_ROLES = ['admin', 'director', 'manager', 'auditor'] as const;
const WRITE_ROLES = ['admin', 'director', 'manager'] as const;

const CreateBody = z.object({
  year: z.number().int().min(2000).max(2100),
  title: z.string().min(1).max(300),
  status: z.enum(['draft', 'submitted', 'approved']).optional(),
});

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, READ_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const rows = await all(
    env,
    `SELECT p.id, p.year, p.title, p.status, p.created_by, p.created_at,
            (SELECT COUNT(*) FROM plan_items pi WHERE pi.plan_id = p.id) AS item_count
     FROM audit_plans p
     ORDER BY p.year DESC, p.created_at DESC`,
  );
  return json({ data: rows });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, CreateBody);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const id = crypto.randomUUID();
  await run(
    env,
    'INSERT INTO audit_plans (id, year, title, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    v.year,
    v.title,
    v.status ?? 'draft',
    auth.user.id,
    nowIso(),
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'audit_plan',
    entityId: id,
    meta: { year: v.year, title: v.title },
  });

  return json({ data: { id } }, { status: 201 });
};
