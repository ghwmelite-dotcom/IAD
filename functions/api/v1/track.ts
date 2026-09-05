//
// POST /api/v1/track
// Public submission tracking. Requires the reference number plus the
// email or phone given at submission time, so a reference alone never
// leaks status to third parties. Anonymous fraud reports without contact
// details cannot be tracked.

import type { PagesFunction } from '../../_shared/types';
import { json } from '../../_shared/json';
import { parseBody } from '../../_shared/validate';
import { all, first } from '../../_shared/db';
import { z } from 'zod';

const Body = z.object({
  referenceNumber: z.string().regex(/^OHCS-[A-Z]{3}-\d{8}-[A-Z0-9]{4}$/),
  contact: z.string().min(1).max(320),
});

interface SubmissionRow {
  id: string;
  reference_number: string;
  type: string;
  status: string;
  subject: string | null;
  created_at: string;
  updated_at: string;
}

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const { referenceNumber, contact } = parsed.value;
  const c = contact.trim().toLowerCase();

  const submission = await first<SubmissionRow>(
    env,
    `SELECT id, reference_number, type, status, subject, created_at, updated_at
     FROM submissions
     WHERE reference_number = ?
       AND (LOWER(email) = ? OR phone = ?)`,
    referenceNumber,
    c,
    contact.trim(),
  );

  if (!submission) {
    return json(
      { error: { code: 'NOT_FOUND', message: 'no submission found for that reference and contact' } },
      { status: 404 },
    );
  }

  const timeline = await all<{ id: string; status: string; note: string | null; created_at: string }>(
    env,
    'SELECT id, status, note, created_at FROM submission_status_history WHERE submission_id = ? ORDER BY created_at ASC',
    submission.id,
  );

  return json({
    data: {
      referenceNumber: submission.reference_number,
      type: submission.type,
      status: submission.status,
      subject: submission.subject,
      createdAt: submission.created_at,
      updatedAt: submission.updated_at,
      timeline,
    },
  });
};
