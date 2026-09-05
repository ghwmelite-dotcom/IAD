import { describe, it, expect } from 'vitest';
import { onRequestGet } from '../../../functions/api/portal/dashboard';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';

const SESSION_SELECT =
  'SELECT s.session_id, s.created_at, s.expires_at, u.id AS user_id, u.email, u.name, u.role, u.mda_id FROM admin_sessions s JOIN users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.active = 1';
const SESSION_SLIDE =
  'UPDATE admin_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?';
const DUE_SELECT =
  "SELECT id, finding_id FROM recommendations WHERE status IN ('open','in_progress') AND due_date < ?";

// Exact SQL from the handler, with the director scope (1=1) interpolated.
const TOTALS_SQL = `SELECT COUNT(*) AS findings,
            SUM(CASE WHEN f.status IN ('closed','verified') THEN 1 ELSE 0 END) AS closed
     FROM findings f WHERE 1=1`;
const SEVERITY_SQL =
  'SELECT f.severity AS severity, COUNT(*) AS count FROM findings f WHERE 1=1 GROUP BY f.severity';
const STATUS_SQL =
  'SELECT f.status AS status, COUNT(*) AS count FROM findings f WHERE 1=1 GROUP BY f.status';
const TREND_SQL = `WITH RECURSIVE months(m, n) AS (
       SELECT strftime('%Y-%m', 'now'), 1
       UNION ALL
       SELECT strftime('%Y-%m', 'now', '-' || n || ' months'), n + 1
       FROM months WHERE n < 12
     )
     SELECT m AS month,
       (SELECT COUNT(*) FROM findings f WHERE substr(f.created_at, 1, 7) = m AND 1=1) AS raised,
       (SELECT COUNT(*) FROM findings f WHERE f.closed_at IS NOT NULL AND substr(f.closed_at, 1, 7) = m AND 1=1) AS closed
     FROM months
     ORDER BY m`;
const OVERDUE_SQL = `SELECT COUNT(*) AS n FROM recommendations r
     JOIN findings f ON f.id = r.finding_id
     WHERE r.status = 'overdue' AND 1=1`;
const ENGAGEMENTS_SQL =
  "SELECT COUNT(*) AS n, SUM(CASE WHEN phase != 'closed' THEN 1 ELSE 0 END) AS active FROM engagements";
const ACTIVITY_SQL =
  'SELECT id, action, entity, entity_id, created_at FROM audit_log ORDER BY created_at DESC LIMIT 10';

function ctx(db: D1Database, cookie?: string) {
  return {
    request: new Request('https://x/api/portal/dashboard', {
      headers: cookie ? { Cookie: `admin_session=${cookie}` } : {},
    }),
    env: mockEnv({ db }),
    params: {},
    waitUntil: () => {},
    data: {},
  };
}

describe('GET /api/portal/dashboard', () => {
  it('returns KPIs plus a 12-month trend series for a director', async () => {
    const now = Date.now();
    const db = makeD1([
      {
        sql: SESSION_SELECT,
        first: {
          session_id: 'sess-1',
          created_at: now - 1000,
          expires_at: now + 60_000,
          user_id: 'u1',
          email: 'director@iad.gov.gh',
          name: 'Director',
          role: 'director',
          mda_id: null,
        },
      },
      { sql: SESSION_SLIDE, run: {} },
      { sql: DUE_SELECT, all: { results: [] } }, // nothing to flip
      { sql: TOTALS_SQL, first: { findings: 20, closed: 11 } },
      { sql: SEVERITY_SQL, all: { results: [{ severity: 'high', count: 8 }] } },
      { sql: STATUS_SQL, all: { results: [{ status: 'open', count: 4 }] } },
      {
        sql: TREND_SQL,
        all: {
          results: [
            { month: '2025-10', raised: 0, closed: 0 },
            { month: '2025-11', raised: 4, closed: 0 },
            { month: '2026-09', raised: 2, closed: 1 },
          ],
        },
      },
      { sql: OVERDUE_SQL, first: { n: 9 } },
      { sql: ENGAGEMENTS_SQL, first: { n: 5, active: 4 } },
      { sql: ACTIVITY_SQL, all: { results: [] } },
    ]);

    const res = await onRequestGet(ctx(db, 'sess-1'));
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      data: {
        kpis: { findings: number; resolutionRate: number; overdueRecommendations: number };
        trend: { month: string; raised: number; closed: number }[];
      };
    };
    expect(body.data.kpis.findings).toBe(20);
    expect(body.data.kpis.resolutionRate).toBe(55);
    expect(body.data.kpis.overdueRecommendations).toBe(9);
    expect(body.data.trend).toHaveLength(3);
    expect(body.data.trend[1]).toEqual({ month: '2025-11', raised: 4, closed: 0 });
  });

  it('rejects unauthenticated requests with 401', async () => {
    const res = await onRequestGet(ctx(makeD1([])));
    expect(res.status).toBe(401);
  });
});
