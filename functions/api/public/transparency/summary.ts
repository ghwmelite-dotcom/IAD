//
// GET /api/public/transparency/summary
// Aggregate-only transparency dashboard data (docs/API-CONTRACT.md).
// No finding text, names, or other row-level data leaves this endpoint.
// Edge-cacheable: Cache-Control public, max-age=300.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { all, first } from '../../../_shared/db';

const CACHE_HEADERS = { 'cache-control': 'public, max-age=300' };

export const onRequestGet: PagesFunction = async ({ env }) => {
  const totals = await first<{
    findings: number;
    closed: number;
    engagements: number;
  }>(
    env,
    `SELECT
       (SELECT COUNT(*) FROM findings) AS findings,
       (SELECT COUNT(*) FROM findings WHERE status IN ('closed','verified')) AS closed,
       (SELECT COUNT(*) FROM engagements) AS engagements`,
  );

  const mdas = await first<{ n: number }>(
    env,
    'SELECT COUNT(DISTINCT au.mda_name) AS n FROM engagements e JOIN audit_universe au ON au.id = e.universe_id',
  );

  const bySeverity = await all<{ severity: string; count: number }>(
    env,
    'SELECT severity, COUNT(*) AS count FROM findings GROUP BY severity',
  );

  const byCategory = await all<{ category: string; count: number }>(
    env,
    'SELECT category, COUNT(*) AS count FROM findings GROUP BY category',
  );

  const byStatus = await all<{ status: string; count: number }>(
    env,
    'SELECT status, COUNT(*) AS count FROM findings GROUP BY status',
  );

  // Monthly trend over the trailing 12 months: raised = findings.created_at,
  // closed = findings.closed_at (set when status flips to closed/verified).
  const trend = await all<{ month: string; raised: number; closed: number }>(
    env,
    `WITH RECURSIVE months(m, n) AS (
       SELECT strftime('%Y-%m', 'now'), 1
       UNION ALL
       SELECT strftime('%Y-%m', 'now', '-' || n || ' months'), n + 1
       FROM months WHERE n < 12
     )
     SELECT m AS month,
       (SELECT COUNT(*) FROM findings WHERE substr(created_at, 1, 7) = m) AS raised,
       (SELECT COUNT(*) FROM findings WHERE closed_at IS NOT NULL AND substr(closed_at, 1, 7) = m) AS closed
     FROM months
     ORDER BY m`,
  );

  const riskHeat = await all<{ likelihood: number; impact: number; count: number }>(
    env,
    'SELECT risk_likelihood AS likelihood, risk_impact AS impact, COUNT(*) AS count FROM audit_universe GROUP BY risk_likelihood, risk_impact',
  );

  const findings = totals?.findings ?? 0;
  const closed = totals?.closed ?? 0;

  return json(
    {
      data: {
        totals: {
          findings,
          open: findings - closed,
          closed,
          resolutionRate: findings > 0 ? Math.round((closed / findings) * 1000) / 10 : 0,
          engagements: totals?.engagements ?? 0,
          mdasCovered: mdas?.n ?? 0,
        },
        bySeverity,
        byCategory,
        byStatus,
        trend,
        riskHeat,
      },
    },
    { headers: CACHE_HEADERS },
  );
};
