//
// PATCH|DELETE /api/portal/universe/:id
// admin/director/manager only.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { writeAuditLog } from '../../../_shared/audit-log';
import { z } from 'zod';

const WRITE_ROLES = ['admin', 'director', 'manager'] as const;

const PatchBody = z
  .object({
    mda_name: z.string().min(1).max(200),
    unit_name: z.string().min(1).max(200),
    category: z.string().min(1).max(120),
    risk_likelihood: z.number().int().min(1).max(5),
    risk_impact: z.number().int().min(1).max(5),
    last_audited_at: z.string().max(40).nullable(),
    notes: z.string().max(2000).nullable(),
  })
  .partial();

const COLUMN_MAP: Record<string, string> = {
  mda_name: 'mda_name',
  unit_name: 'unit_name',
  category: 'category',
  risk_likelihood: 'risk_likelihood',
  risk_impact: 'risk_impact',
  last_audited_at: 'last_audited_at',
  notes: 'notes',
};

export const onRequestPatch: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, PatchBody);
  if (parsed.kind === 'reject') return parsed.response;

  const entries = Object.entries(parsed.value).filter(([, v]) => v !== undefined);
  if (entries.length === 0) {
    return json({ error: { code: 'VALIDATION', message: 'no fields to update' } }, { status: 400 });
  }

  const existing = await first<{ id: string }>(
    env,
    'SELECT id FROM audit_universe WHERE id = ?',
    params.id,
  );
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'universe entry not found' } }, { status: 404 });
  }

  const sets = entries.map(([k]) => `${COLUMN_MAP[k]} = ?`).join(', ');
  await run(env, `UPDATE audit_universe SET ${sets} WHERE id = ?`, ...entries.map(([, v]) => v), params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'update',
    entity: 'audit_universe',
    entityId: params.id,
    meta: { fields: entries.map(([k]) => k) },
  });

  return json({ data: { id: params.id } });
};

export const onRequestDelete: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const existing = await first<{ id: string }>(
    env,
    'SELECT id FROM audit_universe WHERE id = ?',
    params.id,
  );
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'universe entry not found' } }, { status: 404 });
  }

  const used = await first<{ n: number }>(
    env,
    'SELECT COUNT(*) AS n FROM engagements WHERE universe_id = ?',
    params.id,
  );
  if (used && used.n > 0) {
    return json(
      { error: { code: 'CONFLICT', message: 'universe entry is referenced by engagements' } },
      { status: 409 },
    );
  }

  await run(env, 'DELETE FROM audit_universe WHERE id = ?', params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'delete',
    entity: 'audit_universe',
    entityId: params.id,
  });

  return json({ data: { id: params.id } });
};
