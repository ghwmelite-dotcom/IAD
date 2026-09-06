//
// PATCH|DELETE /api/admin/knowledge/:id
// PATCH: JSON metadata update (title/summary/category/audience/status/tags).
// published_at is set the first time status transitions to 'published';
// updated_at always bumps. DELETE removes the document, its version rows
// and every R2 object. Session-gated to admin/director.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { writeAuditLog } from '../../../_shared/audit-log';
import { nowIso } from '../../../_shared/time';
import {
  KNOWLEDGE_CATEGORIES,
  KNOWLEDGE_AUDIENCES,
  KNOWLEDGE_STATUSES,
} from '../../../_shared/knowledge';
import { z } from 'zod';

const ROLES = ['admin', 'director'] as const;

const PatchBody = z
  .object({
    title: z.string().min(1).max(300),
    summary: z.string().max(2000).nullable(),
    category: z.enum(KNOWLEDGE_CATEGORIES),
    audience: z.enum(KNOWLEDGE_AUDIENCES),
    status: z.enum(KNOWLEDGE_STATUSES),
    tags: z.union([z.string().max(500), z.array(z.string().max(60)).max(20)]),
  })
  .partial();

export const onRequestPatch: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, PatchBody);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const existing = await first<{ id: string; status: string; published_at: string | null }>(
    env,
    'SELECT id, status, published_at FROM knowledge_documents WHERE id = ?',
    params.id,
  );
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'document not found' } }, { status: 404 });
  }

  const entries: [string, unknown][] = [];
  if (v.title !== undefined) entries.push(['title', v.title]);
  if (v.summary !== undefined) entries.push(['summary', v.summary]);
  if (v.category !== undefined) entries.push(['category', v.category]);
  if (v.audience !== undefined) entries.push(['audience', v.audience]);
  if (v.status !== undefined) entries.push(['status', v.status]);
  if (v.tags !== undefined) {
    entries.push(['tags', Array.isArray(v.tags) ? v.tags.map((t) => t.trim()).filter(Boolean).join(',') : v.tags]);
  }

  if (entries.length === 0) {
    return json({ error: { code: 'VALIDATION', message: 'no fields to update' } }, { status: 400 });
  }

  const now = nowIso();
  // First transition to published stamps published_at (never overwritten).
  if (v.status === 'published' && existing.published_at === null) {
    entries.push(['published_at', now]);
  }
  entries.push(['updated_at', now]);

  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  await run(env, `UPDATE knowledge_documents SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'update',
    entity: 'knowledge_document',
    entityId: params.id,
    meta: { fields: entries.map(([k]) => k).filter((k) => k !== 'updated_at') },
  });

  return json({ data: { id: params.id } });
};

export const onRequestDelete: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const existing = await first<{ id: string; title: string }>(
    env,
    'SELECT id, title FROM knowledge_documents WHERE id = ?',
    params.id,
  );
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'document not found' } }, { status: 404 });
  }

  const versions = await all<{ r2_key: string }>(
    env,
    'SELECT r2_key FROM knowledge_versions WHERE document_id = ?',
    params.id,
  );
  for (const v of versions) {
    await env.UPLOADS.delete(v.r2_key);
  }

  await run(env, 'DELETE FROM knowledge_versions WHERE document_id = ?', params.id);
  await run(env, 'DELETE FROM knowledge_documents WHERE id = ?', params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'delete',
    entity: 'knowledge_document',
    entityId: params.id,
    meta: { title: existing.title, deleted_versions: versions.length },
  });

  return json({ data: { id: params.id, deleted_versions: versions.length } });
};
