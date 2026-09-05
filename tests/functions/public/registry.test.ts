import { describe, it, expect } from 'vitest';
import { onRequestGet as listRegistry } from '../../../functions/api/public/registry/index';
import { onRequestGet as getAuditor } from '../../../functions/api/public/registry/[slug]';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';

const LIST_SQL = `
  SELECT a.name, a.grade, a.mda_name, a.public_slug,
         (SELECT GROUP_CONCAT(c.body) FROM credentials c
          WHERE c.auditor_id = a.id AND c.verified = 1) AS credential_bodies
  FROM auditors a WHERE a.verified = 1 ORDER BY a.name ASC LIMIT 50`;

function ctx(db: D1Database, url = 'https://x/api/public/registry', params: Record<string, string> = {}) {
  return {
    request: new Request(url),
    env: mockEnv({ db }),
    params,
    waitUntil: () => {},
    data: {},
  };
}

describe('GET /api/public/registry', () => {
  it('includes verified credential bodies as a string array', async () => {
    const db = makeD1([
      {
        sql: LIST_SQL,
        all: {
          results: [
            {
              name: 'Yaw Osei Frimpong',
              grade: 'Principal Internal Auditor',
              mda_name: 'Ministry of Finance',
              public_slug: 'yaw-osei-frimpong',
              credential_bodies: 'CITG,FCCA',
            },
            {
              name: 'Adjoa Yaa Boatemaa',
              grade: 'Internal Auditor',
              mda_name: 'Ministry of Roads and Highways',
              public_slug: 'adjoa-yaa-boatemaa',
              credential_bodies: null,
            },
          ],
        },
      },
    ]);
    const res = await listRegistry(ctx(db));
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toBe('public, max-age=300');
    const body = (await res.json()) as {
      data: { public_slug: string; verified: boolean; credentials: string[] }[];
    };
    expect(body.data[0]?.credentials).toEqual(['CITG', 'FCCA']);
    expect(body.data[1]?.credentials).toEqual([]);
    expect(body.data[0]?.verified).toBe(true);
  });
});

describe('GET /api/public/registry/:slug', () => {
  const AUDITOR_SQL =
    'SELECT id, name, grade, mda_name, verified, created_at FROM auditors WHERE public_slug = ? AND verified = 1';
  const CREDENTIALS_SQL =
    'SELECT body, designation, year FROM credentials WHERE auditor_id = ? AND verified = 1 ORDER BY year ASC';
  const CPD_SQL =
    'SELECT COALESCE(SUM(points), 0) AS points FROM cpd_records WHERE auditor_id = ?';
  const CERTS_SQL =
    'SELECT title, serial, verify_code, issued_at FROM certificates WHERE auditor_id = ? ORDER BY issued_at DESC';

  it('returns the profile with certificates', async () => {
    const db = makeD1([
      {
        sql: AUDITOR_SQL,
        first: {
          id: 'a1',
          name: 'Yaw Osei Frimpong',
          grade: 'Principal Internal Auditor',
          mda_name: 'Ministry of Finance',
          verified: 1,
          created_at: '2025-08-21T00:00:00.000Z',
        },
      },
      {
        sql: CREDENTIALS_SQL,
        all: { results: [{ body: 'FCCA', designation: 'Fellow ACCA', year: 2019 }] },
      },
      { sql: CPD_SQL, first: { points: 32 } },
      {
        sql: CERTS_SQL,
        all: {
          results: [
            {
              title: 'IAD Certificate of Competence',
              serial: 'IAD-CERT-2025-0001',
              verify_code: 'SEEDCRT1',
              issued_at: '2026-02-17T00:00:00.000Z',
            },
          ],
        },
      },
    ]);
    const res = await getAuditor(ctx(db, 'https://x/api/public/registry/yaw-osei-frimpong', { slug: 'yaw-osei-frimpong' }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      data: { name: string; cpdPoints: number; certificates: { serial: string; verify_code: string }[] };
    };
    expect(body.data.name).toBe('Yaw Osei Frimpong');
    expect(body.data.cpdPoints).toBe(32);
    expect(body.data.certificates).toHaveLength(1);
    expect(body.data.certificates[0]?.verify_code).toBe('SEEDCRT1');
  });

  it('returns 404 for an unverified or unknown slug', async () => {
    const db = makeD1([{ sql: AUDITOR_SQL, first: null }]);
    const res = await getAuditor(ctx(db, 'https://x/api/public/registry/ghost', { slug: 'ghost' }));
    expect(res.status).toBe(404);
  });
});
