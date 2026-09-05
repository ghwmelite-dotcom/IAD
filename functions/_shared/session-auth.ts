//
// ─── PORTAL SESSION AUTH (IAD audit-ops portal + registry admin) ─────────
// Cookie-backed sessions for portal users stored in the `users` table
// (migration 0012). Reuses the admin_sessions store and admin_session
// cookie from 0010 — sessions are keyed by email, so the same cookie
// serves both the CMS admin (admin_users roles) and the audit portal
// (users roles). Role gates are per-route via requireSession(roles).
//
// Roles: admin, director, manager, auditor, mda_liaison.
// ─────────────────────────────────────────────────────────────────────────
import type { Env } from './types';
import { json } from './json';
import { first, run } from './db';
import { parseAdminSessionId } from './admin-cookies';
import {
  ADMIN_SESSION_TTL_MS,
  ADMIN_SESSION_HARD_CAP_MS,
} from './admin-session';

export const PORTAL_ROLES = ['admin', 'director', 'manager', 'auditor', 'mda_liaison'] as const;
export type PortalRole = (typeof PORTAL_ROLES)[number];

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  mdaId: string | null;
}

export type SessionAuthResult =
  | { kind: 'ok'; user: SessionUser }
  | { kind: 'reject'; response: Response };

interface JoinedPortalSessionRow {
  session_id: string;
  created_at: number;
  expires_at: number;
  user_id: string;
  email: string;
  name: string;
  role: string;
  mda_id: string | null;
}

async function readPortalSession(
  env: Env,
  sessionId: string,
): Promise<SessionUser | null> {
  const now = Date.now();
  const row = await first<JoinedPortalSessionRow>(
    env,
    'SELECT s.session_id, s.created_at, s.expires_at, u.id AS user_id, u.email, u.name, u.role, u.mda_id FROM admin_sessions s JOIN users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.active = 1',
    sessionId,
    now,
  );
  if (!row) return null;

  // Hard cap: force re-login after 7 days regardless of activity.
  if (now - row.created_at > ADMIN_SESSION_HARD_CAP_MS) {
    await run(env, 'DELETE FROM admin_sessions WHERE session_id = ?', sessionId);
    return null;
  }

  // Slide: extend expires_at, update last_used_at.
  await run(
    env,
    'UPDATE admin_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?',
    now,
    now + ADMIN_SESSION_TTL_MS,
    sessionId,
  );

  return {
    id: row.user_id,
    email: row.email,
    name: row.name,
    role: row.role,
    mdaId: row.mda_id,
  };
}

export async function requireSession(
  request: Request,
  env: Env,
  allowedRoles?: readonly string[],
): Promise<SessionAuthResult> {
  const sessionId = parseAdminSessionId(request);
  if (!sessionId) {
    return {
      kind: 'reject',
      response: json({ error: { code: 'AUTH_MISSING', message: 'authentication required' } }, { status: 401 }),
    };
  }

  const user = await readPortalSession(env, sessionId);
  if (!user) {
    return {
      kind: 'reject',
      response: json({ error: { code: 'AUTH_MISSING', message: 'authentication required' } }, { status: 401 }),
    };
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return {
      kind: 'reject',
      response: json({ error: { code: 'AUTH_FORBIDDEN', message: 'insufficient role' } }, { status: 403 }),
    };
  }

  return { kind: 'ok', user };
}
