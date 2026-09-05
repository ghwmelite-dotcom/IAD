//
// GET|PATCH /api/admin/registry/:id
// GET: auditor detail with credentials, CPD and certificates.
// PATCH: edit fields and toggle verified. admin/director only.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { writeAuditLog } from '../../../_shared/audit-log';
import { z } from 'zod';

const ROLES = ['admin', 'director'] as const;

const PatchBody = z
  .object({
    name: z.string().min(1).max(200),
    grade: z.string().max(80).nullable(),
    mda_name: z.string().max(200).nullable(),
    public_slug: z
      .string()
      .min(1)
      .max(120)
      .regex(/^[a-z0-9-]+$/),
    verified: z.boolean(),
  })
  .partial();

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const auditor = await first(
    env,
    'SELECT id, staff_id, name, grade, mda_name, public_slug, verified, created_at FROM auditors WHERE id = ?',
    params.id,
  );
  if (!auditor) {
    return json({ error: { code: 'NOT_FOUND', message: 'auditor not found' } }, { status: 404 });
  }

  const credentials = await all(
    env,
    'SELECT id, body, designation, year, verified FROM credentials WHERE auditor_id = ? ORDER BY year ASC',
    params.id,
  );
  const cpd = await all(
    env,
    'SELECT id, activity, points, year, source FROM cpd_records WHERE auditor_id = ? ORDER BY year DESC',
    params.id,
  );
  const certificates = await all(
    env,
    'SELECT id, title, serial, verify_code, issued_at FROM certificates WHERE auditor_id = ? ORDER BY issued_at DESC',
    params.id,
  );

  return json({ data: { ...auditor, credentials, cpd_records: cpd, certificates } });
};

export const onRequestPatch: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, PatchBody);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const existing = await first<{ id: string; verified: number }>(
    env,
    'SELECT id, verified FROM auditors WHERE id = ?',
    params.id,
  );
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'auditor not found' } }, { status: 404 });
  }

  const entries: [string, unknown][] = [];
  if (v.name !== undefined) entries.push(['name', v.name]);
  if (v.grade !== undefined) entries.push(['grade', v.grade]);
  if (v.mda_name !== undefined) entries.push(['mda_name', v.mda_name]);
  if (v.public_slug !== undefined) entries.push(['public_slug', v.public_slug]);
  if (v.verified !== undefined) entries.push(['verified', v.verified ? 1 : 0]);

  if (entries.length === 0) {
    return json({ error: { code: 'VALIDATION', message: 'no fields to update' } }, { status: 400 });
  }

  if (v.public_slug !== undefined) {
    const clash = await first<{ id: string }>(
      env,
      'SELECT id FROM auditors WHERE public_slug = ? AND id != ?',
      v.public_slug,
      params.id,
    );
    if (clash) {
      return json({ error: { code: 'CONFLICT', message: 'public_slug already in use' } }, { status: 409 });
    }
  }

  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  await run(env, `UPDATE auditors SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: v.verified !== undefined && (v.verified ? 1 : 0) !== existing.verified ? 'verify' : 'update',
    entity: 'auditor',
    entityId: params.id,
    meta: { fields: entries.map(([k]) => k) },
  });

  return json({ data: { id: params.id } });
};
