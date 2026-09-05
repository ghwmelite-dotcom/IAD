//
// POST /api/portal/auth/start
// Issues a magic-link portal sign-in for users in the audit-ops `users`
// table. Mirrors functions/api/admin/auth/start.ts: SHA-256 hashed tokens,
// 15-min TTL, per-email rate limit, 200 even for unknown emails.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { first, run } from '../../../_shared/db';
import { sendEmail } from '../../../_shared/email';
import { hashToken } from '../../../_shared/hash-token';
import { escapeHtml } from '../../../_shared/escape-html';
import { z } from 'zod';

const TOKEN_TTL_MS = 15 * 60 * 1000;
const TOKEN_TTL_MIN = 15;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const Body = z.object({
  email: z.string().email().toLowerCase(),
});

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function portalMagicLinkEmail(resumeUrl: string, ttlMinutes: number) {
  const subject = 'IAD Portal Sign-In Link — action required';
  const html = `<!doctype html><html><body style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.5; max-width: 580px; margin: 0 auto; padding: 24px;">
<p style="font-size: 18px; font-weight: bold; color: #1B5E20;">IAD Portal Sign-In</p>
<p>Click the link below to sign in to the Internal Audit Department portal. This link is valid for <strong>${ttlMinutes} minutes</strong> and can be used <strong>once</strong>.</p>
<p style="margin: 24px 0;"><a href="${escapeHtml(resumeUrl)}" style="background:#1B5E20;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Sign in to the IAD Portal</a></p>
<p style="font-size: 13px; color: #5C5549;">If you did not request this link, please ignore this email. No further action is required — the link will expire automatically.</p>
<hr style="border: none; border-top: 1px solid #E5DDD0; margin: 24px 0;">
<p style="font-size: 12px; color: #5C5549;">Internal Audit Department · Office of the Head of the Civil Service · Republic of Ghana</p>
</body></html>`;
  const text = `IAD Portal Sign-In

Click the link below to sign in to the Internal Audit Department portal. Valid for ${ttlMinutes} minutes, single-use.

${resumeUrl}

If you did not request this link, please ignore this email.

Internal Audit Department · Office of the Head of the Civil Service · Republic of Ghana`;
  return { subject, html, text };
}

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const { email } = parsed.value;
  const now = Date.now();

  const user = await first<{ email: string }>(
    env,
    'SELECT email FROM users WHERE email = ? AND active = 1',
    email,
  );
  if (!user) {
    return json({ data: { sent: true } });
  }

  const recent = await first<{ n: number }>(
    env,
    'SELECT COUNT(*) AS n FROM admin_magic_tokens WHERE email = ? AND created_at > ?',
    email,
    now - RATE_LIMIT_WINDOW_MS,
  );
  if (recent && recent.n >= RATE_LIMIT_MAX) {
    return json(
      { error: { code: 'RATE_LIMITED', message: 'too many sign-in requests; please try again later' } },
      { status: 429, headers: { 'retry-after': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) } },
    );
  }

  const token = generateToken();
  const tokenHash = await hashToken(token);
  const ipAddress = request.headers.get('cf-connecting-ip') ?? null;

  await run(
    env,
    'INSERT INTO admin_magic_tokens (token, email, created_at, expires_at, ip_address) VALUES (?, ?, ?, ?, ?)',
    tokenHash,
    email,
    now,
    now + TOKEN_TTL_MS,
    ipAddress,
  );

  const origin = new URL(request.url).origin;
  const resumeUrl = `${origin}/api/portal/auth/magic/${encodeURIComponent(token)}`;
  const body = portalMagicLinkEmail(resumeUrl, TOKEN_TTL_MIN);

  try {
    await sendEmail(env, { to: email, subject: body.subject, html: body.html, text: body.text });
  } catch (err) {
    console.error('portal magic link email failed', err);
    return json({ error: { code: 'EMAIL_FAILED', message: 'email send failed' } }, { status: 502 });
  }

  return json({ data: { sent: true } });
};
