//
// GET|POST /api/admin/registry
// IAC auditor registry CRUD. Session-gated to users-table roles
// admin/director (docs/API-CONTRACT.md — Admin API).

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { writeAuditLog } from '../../../_shared/audit-log';
import { nowIso } from '../../../_shared/time';
import { z } from 'zod';

const ROLES = ['admin', 'director'] as const;

const CreateBody = z.object({
  staff_id: z.string().min(1).max(60),
  name: z.string().min(1).max(200),
  grade: z.string().max(80).optional(),
  mda_name: z.string().max(200).optional(),
  public_slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, 'slug must be lowercase letters, digits and hyphens'),
  verified: z.boolean().optional(),
});

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const rows = await all(
    env,
    `SELECT a.id, a.staff_id, a.name, a.grade, a.mda_name, a.public_slug, a.verified, a.created_at,
            (SELECT COUNT(*) FROM credentials c WHERE c.auditor_id = a.id) AS credential_count,
            (SELECT COALESCE(SUM(p.points), 0) FROM cpd_records p WHERE p.auditor_id = a.id) AS cpd_points
     FROM auditors a
     ORDER BY a.created_at DESC`,
  );
  return json({ data: rows });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, CreateBody);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const clash = await first<{ id: string }>(
    env,
    'SELECT id FROM auditors WHERE staff_id = ? OR public_slug = ?',
    v.staff_id,
    v.public_slug,
  );
  if (clash) {
    return json(
      { error: { code: 'CONFLICT', message: 'staff_id or public_slug already registered' } },
      { status: 409 },
    );
  }

  const id = crypto.randomUUID();
  await run(
    env,
    'INSERT INTO auditors (id, staff_id, name, grade, mda_name, public_slug, verified, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    id,
    v.staff_id,
    v.name,
    v.grade ?? null,
    v.mda_name ?? null,
    v.public_slug,
    v.verified ? 1 : 0,
    nowIso(),
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'auditor',
    entityId: id,
    meta: { staff_id: v.staff_id, name: v.name },
  });

  return json({ data: { id } }, { status: 201 });
};
