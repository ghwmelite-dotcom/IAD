//
// GET /api/portal/auth/magic/:token
// Consumes a portal magic-link token (same store as admin magic links),
// creates a session, sets the cookie, redirects to /portal.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { first, run } from '../../../../_shared/db';
import { hashToken } from '../../../../_shared/hash-token';
import { createAdminSession, ADMIN_SESSION_TTL_MS } from '../../../../_shared/admin-session';
import { buildSetAdminSessionCookie } from '../../../../_shared/admin-cookies';

interface TokenRow {
  token: string;
  email: string;
  expires_at: number;
  used_at: number | null;
}

export const onRequestGet: PagesFunction<Env, 'token'> = async ({ request, env, params }) => {
  const tokenHash = await hashToken(params.token);
  const tokenRow = await first<TokenRow>(
    env,
    'SELECT token, email, expires_at, used_at FROM admin_magic_tokens WHERE token = ?',
    tokenHash,
  );
  if (!tokenRow) return json({ error: { code: 'NOT_FOUND', message: 'token not found' } }, { status: 404 });

  const now = Date.now();
  if (tokenRow.used_at) return json({ error: { code: 'TOKEN_USED', message: 'token already used' } }, { status: 410 });
  if (tokenRow.expires_at <= now) return json({ error: { code: 'TOKEN_EXPIRED', message: 'token expired' } }, { status: 410 });

  // Token must belong to an active portal user.
  const user = await first<{ email: string }>(
    env,
    'SELECT email FROM users WHERE email = ? AND active = 1',
    tokenRow.email,
  );
  if (!user) return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no portal account for this email' } }, { status: 403 });

  const ipAddress = request.headers.get('cf-connecting-ip') ?? null;
  const sessionId = await createAdminSession(env, { email: tokenRow.email, ipAddress });

  await run(env, 'UPDATE admin_magic_tokens SET used_at = ? WHERE token = ?', now, tokenHash);

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/portal',
      'Set-Cookie': buildSetAdminSessionCookie(sessionId, ADMIN_SESSION_TTL_MS / 1000),
    },
  });
};
