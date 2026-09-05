// Append-only audit trail. Every mutating portal/admin-registry endpoint
// writes a row here (docs/API-CONTRACT.md conventions).
import type { Env } from './types';
import { run } from './db';
import { nowIso } from './time';

export interface AuditLogEntry {
  userId: string | null;
  action: string; // e.g. 'create', 'update', 'delete', 'verify'
  entity: string; // e.g. 'finding', 'engagement', 'auditor'
  entityId: string | null;
  meta?: Record<string, unknown>;
}

export async function writeAuditLog(env: Env, entry: AuditLogEntry): Promise<void> {
  await run(
    env,
    'INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    crypto.randomUUID(),
    entry.userId,
    entry.action,
    entry.entity,
    entry.entityId,
    entry.meta ? JSON.stringify(entry.meta) : null,
    nowIso(),
  );
}
