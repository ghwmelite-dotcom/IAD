//
// POST /api/v1/submissions
// Public intake for Special Audit Requests, Consultancy, Fraud Reports,
// RTI, Complaints and Feedback. Fraud reports may be fully anonymous —
// identity fields are stored only when volunteered.
//
// Reference format OHCS-XXX-YYYYMMDD-XXXX matches the frontend validator
// (src/lib/validations.ts trackFormSchema).

import type { PagesFunction } from '../../_shared/types';
import { json } from '../../_shared/json';
import { parseBody } from '../../_shared/validate';
import { first, run } from '../../_shared/db';
import { nowIso } from '../../_shared/time';
import { z } from 'zod';

const Body = z.object({
  type: z.enum(['special_audit', 'consultancy', 'fraud_report', 'rti', 'complaint', 'feedback']),
  name: z.string().max(200).optional(),
  email: z.string().email().max(320).optional().or(z.literal('')),
  phone: z.string().max(20).optional(),
  subject: z.string().max(500).optional(),
  body: z.string().min(10).max(5000),
});

const TYPE_PREFIX: Record<string, string> = {
  special_audit: 'AUD',
  consultancy: 'CON',
  fraud_report: 'FRD',
  rti: 'RTI',
  complaint: 'CMP',
  feedback: 'FDB',
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 20;
const SUFFIX_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateReference(type: string): string {
  const prefix = TYPE_PREFIX[type] ?? 'GEN';
  const d = new Date();
  const ymd =
    String(d.getUTCFullYear()) +
    String(d.getUTCMonth() + 1).padStart(2, '0') +
    String(d.getUTCDate()).padStart(2, '0');
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  let suffix = '';
  for (const b of bytes) suffix += SUFFIX_ALPHABET[b % SUFFIX_ALPHABET.length];
  return `OHCS-${prefix}-${ymd}-${suffix}`;
}

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  // Simple per-IP hourly cap on public intake.
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const recent = await first<{ n: number }>(
    env,
    "SELECT COUNT(*) AS n FROM audit_log WHERE action = 'public_submission' AND entity_id = ? AND created_at > ?",
    ip,
    new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString(),
  );
  if (recent && recent.n >= RATE_LIMIT_MAX) {
    return json(
      { error: { code: 'RATE_LIMITED', message: 'too many submissions; please try again later' } },
      { status: 429, headers: { 'retry-after': '3600' } },
    );
  }

  const id = crypto.randomUUID();
  const reference = generateReference(v.type);
  const now = nowIso();

  await run(
    env,
    `INSERT INTO submissions (id, reference_number, type, status, name, email, phone, subject, body, created_at, updated_at)
     VALUES (?, ?, ?, 'received', ?, ?, ?, ?, ?, ?, ?)`,
    id,
    reference,
    v.type,
    v.name?.trim() || null,
    v.email?.trim() || null,
    v.phone?.trim() || null,
    v.subject?.trim() || null,
    v.body,
    now,
    now,
  );

  await run(
    env,
    'INSERT INTO submission_status_history (id, submission_id, status, note, created_at) VALUES (?, ?, ?, ?, ?)',
    crypto.randomUUID(),
    id,
    'received',
    'Submission received',
    now,
  );

  // Rate-limit marker (user_id NULL — public unauthenticated intake).
  await run(
    env,
    'INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, NULL, ?, ?, ?, ?, ?)',
    crypto.randomUUID(),
    'public_submission',
    'submission',
    ip,
    JSON.stringify({ reference_number: reference, type: v.type }),
    now,
  );

  return json(
    {
      data: {
        referenceNumber: reference,
        status: 'received',
        message: 'Your submission has been received. Keep your reference number to track progress.',
      },
    },
    { status: 201 },
  );
};
