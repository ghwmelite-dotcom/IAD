//
// GET /api/public/registry/:slug
// Public IAC auditor profile. Only verified auditors are listed; only
// verified credentials are exposed.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { all, first } from '../../../_shared/db';

interface AuditorRow {
  id: string;
  name: string;
  grade: string | null;
  mda_name: string | null;
  verified: number;
  created_at: string;
}

export const onRequestGet: PagesFunction<Env, 'slug'> = async ({ env, params }) => {
  const auditor = await first<AuditorRow>(
    env,
    'SELECT id, name, grade, mda_name, verified, created_at FROM auditors WHERE public_slug = ? AND verified = 1',
    params.slug,
  );
  if (!auditor) {
    return json({ error: { code: 'NOT_FOUND', message: 'auditor not found' } }, { status: 404 });
  }

  const credentials = await all<{ body: string; designation: string; year: number | null }>(
    env,
    'SELECT body, designation, year FROM credentials WHERE auditor_id = ? AND verified = 1 ORDER BY year ASC',
    auditor.id,
  );

  const cpd = await first<{ points: number }>(
    env,
    'SELECT COALESCE(SUM(points), 0) AS points FROM cpd_records WHERE auditor_id = ?',
    auditor.id,
  );

  const certificates = await all<{
    title: string;
    serial: string;
    verify_code: string;
    issued_at: string;
  }>(
    env,
    'SELECT title, serial, verify_code, issued_at FROM certificates WHERE auditor_id = ? ORDER BY issued_at DESC',
    auditor.id,
  );

  return json(
    {
      data: {
        name: auditor.name,
        grade: auditor.grade,
        mda_name: auditor.mda_name,
        verified: auditor.verified === 1,
        credentials,
        cpdPoints: cpd?.points ?? 0,
        memberSince: auditor.created_at,
        certificates,
      },
    },
    { headers: { 'cache-control': 'public, max-age=300' } },
  );
};
