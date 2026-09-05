//
// POST /api/admin/registry/:id/credentials
// Add a professional credential to an auditor. admin/director only.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { parseBody } from '../../../../_shared/validate';
import { first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { z } from 'zod';

const ROLES = ['admin', 'director'] as const;

const Body = z.object({
  body: z.enum(['FCCA', 'ACCA', 'IIA', 'CITG', 'ICA-GH', 'OTHER']),
  designation: z.string().min(1).max(200),
  year: z.number().int().min(1950).max(2100).optional(),
  verified: z.boolean().optional(),
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
    'INSERT INTO credentials (id, auditor_id, body, designation, year, verified) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    params.id,
    v.body,
    v.designation,
    v.year ?? null,
    v.verified ? 1 : 0,
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'credential',
    entityId: id,
    meta: { auditor_id: params.id, body: v.body },
  });

  return json({ data: { id } }, { status: 201 });
};
