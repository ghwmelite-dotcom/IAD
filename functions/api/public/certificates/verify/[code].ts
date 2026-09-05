//
// GET /api/public/certificates/verify/:code
// Certificate authenticity check by public verify code. Unknown codes
// return { valid: false } with 200 so the checker UI can render a plain
// "not found" state without error handling.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { first } from '../../../../_shared/db';

export const onRequestGet: PagesFunction<Env, 'code'> = async ({ env, params }) => {
  const row = await first<{
    title: string;
    serial: string;
    issued_at: string;
    auditor_name: string;
  }>(
    env,
    'SELECT c.title, c.serial, c.issued_at, a.name AS auditor_name FROM certificates c JOIN auditors a ON a.id = c.auditor_id WHERE c.verify_code = ?',
    params.code,
  );

  if (!row) {
    return json({ data: { valid: false } });
  }

  return json({
    data: {
      valid: true,
      title: row.title,
      serial: row.serial,
      issuedAt: row.issued_at,
      auditorName: row.auditor_name,
    },
  });
};
