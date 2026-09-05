//
// GET /api/public/registry?q=<search>
// Public IAC registry listing — verified auditors only, minimal fields.
// Backs the /registry search page. (Contract defines registry/:slug; this
// list endpoint is the search side of the same public surface.)

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { all } from '../../../_shared/db';

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const q = (new URL(request.url).searchParams.get('q') ?? '').trim();

  const rows = q
    ? await all<{ name: string; grade: string | null; mda_name: string | null; public_slug: string }>(
        env,
        `SELECT name, grade, mda_name, public_slug FROM auditors
         WHERE verified = 1 AND (name LIKE ? OR mda_name LIKE ?)
         ORDER BY name ASC LIMIT 50`,
        `%${q}%`,
        `%${q}%`,
      )
    : await all<{ name: string; grade: string | null; mda_name: string | null; public_slug: string }>(
        env,
        'SELECT name, grade, mda_name, public_slug FROM auditors WHERE verified = 1 ORDER BY name ASC LIMIT 50',
      );

  return json(
    { data: rows.map((r) => ({ ...r, verified: true })) },
    { headers: { 'cache-control': 'public, max-age=300' } },
  );
};
