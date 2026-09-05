//
// GET /api/public/registry?q=<search>
// Public IAC registry listing — verified auditors only, minimal fields
// plus verified credential bodies. Backs the /registry search page.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { all } from '../../../_shared/db';

interface RegistryRow {
  name: string;
  grade: string | null;
  mda_name: string | null;
  public_slug: string;
  credential_bodies: string | null;
}

function toResponse(rows: RegistryRow[]) {
  return rows.map((r) => ({
    name: r.name,
    grade: r.grade,
    mda_name: r.mda_name,
    public_slug: r.public_slug,
    verified: true,
    credentials: r.credential_bodies ? r.credential_bodies.split(',') : [],
  }));
}

const SELECT = `
  SELECT a.name, a.grade, a.mda_name, a.public_slug,
         (SELECT GROUP_CONCAT(c.body) FROM credentials c
          WHERE c.auditor_id = a.id AND c.verified = 1) AS credential_bodies
  FROM auditors a`;

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const q = (new URL(request.url).searchParams.get('q') ?? '').trim();

  const rows = q
    ? await all<RegistryRow>(
        env,
        `${SELECT}
         WHERE a.verified = 1 AND (a.name LIKE ? OR a.mda_name LIKE ?)
         ORDER BY a.name ASC LIMIT 50`,
        `%${q}%`,
        `%${q}%`,
      )
    : await all<RegistryRow>(
        env,
        `${SELECT} WHERE a.verified = 1 ORDER BY a.name ASC LIMIT 50`,
      );

  return json(
    { data: toResponse(rows) },
    { headers: { 'cache-control': 'public, max-age=300' } },
  );
};
