//
// GET /api/public/transparency/by-mda
// Per-MDA aggregate counts only — never finding text (docs/API-CONTRACT.md).
// Edge-cacheable: Cache-Control public, max-age=300.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { all } from '../../../_shared/db';

const CACHE_HEADERS = { 'cache-control': 'public, max-age=300' };

export const onRequestGet: PagesFunction = async ({ env }) => {
  const rows = await all<{
    mda_name: string;
    findings: number;
    closed: number;
    open_high: number;
  }>(
    env,
    `SELECT
       au.mda_name AS mda_name,
       COUNT(f.id) AS findings,
       SUM(CASE WHEN f.status IN ('closed','verified') THEN 1 ELSE 0 END) AS closed,
       SUM(CASE WHEN f.severity = 'high' AND f.status NOT IN ('closed','verified') THEN 1 ELSE 0 END) AS open_high
     FROM findings f
     JOIN audit_universe au ON au.id = f.universe_id
     GROUP BY au.mda_name
     ORDER BY findings DESC`,
  );

  return json(
    {
      data: rows.map((r) => ({
        mda_name: r.mda_name,
        findings: r.findings,
        closed: r.closed,
        resolutionRate: r.findings > 0 ? Math.round((r.closed / r.findings) * 1000) / 10 : 0,
        openHigh: r.open_high,
      })),
    },
    { headers: CACHE_HEADERS },
  );
};
