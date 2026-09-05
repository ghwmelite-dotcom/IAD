//
// GET|POST /api/portal/universe
// Audit universe register. Read: internal audit roles. Write: admin,
// director, manager.

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
  mda_name: z.string().min(1).max(200),
  unit_name: z.string().min(1).max(200),
  category: z.string().min(1).max(120),
  risk_likelihood: z.number().int().min(1).max(5),
  risk_impact: z.number().int().min(1).max(5),
  last_audited_at: z.string().max(40).optional(),
  notes: z.string().max(2000).optional(),
});

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, READ_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const rows = await all(
    env,
    `SELECT id, mda_name, unit_name, category, risk_likelihood, risk_impact,
            risk_likelihood * risk_impact AS risk_score,
            last_audited_at, notes, created_at
     FROM audit_universe
     ORDER BY risk_score DESC, mda_name ASC`,
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
    `INSERT INTO audit_universe (id, mda_name, unit_name, category, risk_likelihood, risk_impact, last_audited_at, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    v.mda_name,
    v.unit_name,
    v.category,
    v.risk_likelihood,
    v.risk_impact,
    v.last_audited_at ?? null,
    v.notes ?? null,
    nowIso(),
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'audit_universe',
    entityId: id,
    meta: { mda_name: v.mda_name, unit_name: v.unit_name },
  });

  return json({ data: { id } }, { status: 201 });
};
