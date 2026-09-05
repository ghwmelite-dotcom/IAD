//
// POST /api/admin/registry/:id/certificates
// Issue a certificate to an auditor. Generates serial (IAD-CERT-YYYY-NNNN)
// and a public verify code. admin/director only.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { parseBody } from '../../../../_shared/validate';
import { first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { nowIso } from '../../../../_shared/time';
import { z } from 'zod';

const ROLES = ['admin', 'director'] as const;
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const Body = z.object({
  title: z.string().min(1).max(300),
  issued_at: z.string().max(40).optional(),
});

function generateVerifyCode(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let code = '';
  for (const b of bytes) code += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return code;
}

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

  const year = new Date().getUTCFullYear();
  const seq = await first<{ n: number }>(
    env,
    'SELECT COUNT(*) AS n FROM certificates WHERE serial LIKE ?',
    `IAD-CERT-${year}-%`,
  );
  const serial = `IAD-CERT-${year}-${String((seq?.n ?? 0) + 1).padStart(4, '0')}`;

  const id = crypto.randomUUID();
  const verifyCode = generateVerifyCode();
  await run(
    env,
    'INSERT INTO certificates (id, auditor_id, title, serial, verify_code, issued_at) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    params.id,
    v.title,
    serial,
    verifyCode,
    v.issued_at ?? nowIso(),
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'certificate',
    entityId: id,
    meta: { auditor_id: params.id, serial },
  });

  return json({ data: { id, serial, verify_code: verifyCode } }, { status: 201 });
};
