// Knowledge Hub API client — public (/api/public/knowledge), portal
// (/api/portal/knowledge) and admin (/api/admin/knowledge) surfaces.
// Same-origin Pages Functions; envelope: { data, meta } on success,
// { error: { code, message } } on failure.

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

// ─── Types ──────────────────────────────────────────────────────────────────

export type KnowledgeCategory =
  | 'manual'
  | 'template'
  | 'standard'
  | 'circular'
  | 'guideline'
  | 'report'
  | 'form'
  | 'policy';

export type KnowledgeAudience = 'public' | 'mda';
export type KnowledgeStatus = 'draft' | 'published';

export interface KnowledgeFile {
  version: number;
  file_name: string;
  file_size: number;
  mime: string;
}

export interface KnowledgeItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: KnowledgeCategory;
  tags: string[];
  download_count: number;
  published_at: string | null;
  current_file: KnowledgeFile | null;
  /** Present on portal (and admin) responses — absent on public ones. */
  audience?: KnowledgeAudience;
}

export interface AdminKnowledgeItem extends KnowledgeItem {
  status: KnowledgeStatus;
  audience: KnowledgeAudience;
  version_count: number;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeListMeta {
  page: number;
  pageSize: number;
  total: number;
}

export interface KnowledgeListResult<T = KnowledgeItem> {
  items: T[];
  meta: KnowledgeListMeta;
}

export interface KnowledgeQuery {
  q?: string;
  category?: KnowledgeCategory | 'all';
  page?: number;
  pageSize?: number;
}

export interface AdminKnowledgeQuery extends KnowledgeQuery {
  status?: KnowledgeStatus | 'all';
  audience?: KnowledgeAudience | 'all';
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const KNOWLEDGE_PAGE_SIZE = 12;

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  'manual',
  'template',
  'standard',
  'circular',
  'guideline',
  'report',
  'form',
  'policy',
];

export const KNOWLEDGE_CATEGORY_LABELS: Record<KnowledgeCategory, string> = {
  manual: 'Manual',
  template: 'Template',
  standard: 'Standard',
  circular: 'Circular',
  guideline: 'Guideline',
  report: 'Report',
  form: 'Form',
  policy: 'Policy',
};

export const KNOWLEDGE_CATEGORY_COLORS: Record<KnowledgeCategory, string> = {
  manual: 'bg-purple-100 text-purple-800',
  template: 'bg-blue-100 text-blue-800',
  standard: 'bg-teal-100 text-teal-800',
  circular: 'bg-amber-100 text-amber-800',
  guideline: 'bg-emerald-100 text-emerald-800',
  report: 'bg-indigo-100 text-indigo-800',
  form: 'bg-rose-100 text-rose-800',
  policy: 'bg-red-100 text-red-800',
};

/** Max upload size enforced client-side (25 MB). */
export const KNOWLEDGE_MAX_FILE_BYTES = 25 * 1024 * 1024;

// ─── Errors ─────────────────────────────────────────────────────────────────

export class KnowledgeApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = 'KnowledgeApiError';
    this.code = code;
    this.status = status;
  }
}

interface ListEnvelope<T> {
  data?: T[];
  meta?: KnowledgeListMeta;
  error?: { code?: string; message?: string };
}

interface ItemEnvelope<T> {
  data?: T;
  error?: { code?: string; message?: string };
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

async function parseError(res: Response): Promise<never> {
  const body = (await res.json().catch(() => null)) as {
    error?: { code?: string; message?: string };
  } | null;
  throw new KnowledgeApiError(
    body?.error?.message ?? res.statusText,
    body?.error?.code ?? 'UNKNOWN',
    res.status,
  );
}

function redirectToPortalLogin(): void {
  if (typeof window === 'undefined') return;
  if (!window.location.pathname.startsWith('/portal/login')) {
    window.location.assign('/portal/login/');
  }
}

async function listRequest<T>(
  path: string,
  options: { credentials?: RequestCredentials; portal?: boolean } = {},
): Promise<KnowledgeListResult<T>> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { credentials: options.credentials });
  } catch {
    throw new KnowledgeApiError(
      'The knowledge service could not be reached.',
      'UNREACHABLE',
      0,
    );
  }

  if (res.status === 401 && options.portal) {
    redirectToPortalLogin();
    throw new KnowledgeApiError('authentication required', 'AUTH_MISSING', 401);
  }

  if (!res.ok) await parseError(res);

  const body = (await res.json().catch(() => null)) as ListEnvelope<T> | null;
  if (!body?.data || !body.meta) {
    throw new KnowledgeApiError('Malformed response from the knowledge service.', 'MALFORMED', res.status);
  }
  return { items: body.data, meta: body.meta };
}

async function adminRequest<T>(
  path: string,
  init: { method?: string; body?: unknown; formData?: FormData } = {},
): Promise<T> {
  const reqInit: RequestInit = {
    method: init.method ?? 'GET',
    credentials: 'include',
  };
  if (init.formData) {
    // Let the browser set the multipart boundary.
    reqInit.body = init.formData;
  } else if (init.body !== undefined) {
    reqInit.headers = { 'Content-Type': 'application/json' };
    reqInit.body = JSON.stringify(init.body);
  }

  const res = await fetch(`${API_BASE}${path}`, reqInit);
  if (res.status === 204) return undefined as T;
  if (!res.ok) await parseError(res);

  const body = (await res.json().catch(() => null)) as ItemEnvelope<T> | null;
  return body?.data as T;
}

// ─── Public ─────────────────────────────────────────────────────────────────

export function fetchPublicKnowledge(
  query: KnowledgeQuery = {},
): Promise<KnowledgeListResult> {
  return listRequest<KnowledgeItem>(
    `/api/public/knowledge${buildQuery({
      q: query.q?.trim() || undefined,
      category: query.category && query.category !== 'all' ? query.category : undefined,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? KNOWLEDGE_PAGE_SIZE,
    })}`,
  );
}

export function publicKnowledgeDownloadUrl(id: string): string {
  return `${API_BASE}/api/public/knowledge/${encodeURIComponent(id)}/download`;
}

// ─── Portal (session cookie) ──────────────────────────────────────────────────

export function fetchPortalKnowledge(
  query: KnowledgeQuery = {},
): Promise<KnowledgeListResult> {
  return listRequest<KnowledgeItem>(
    `/api/portal/knowledge${buildQuery({
      q: query.q?.trim() || undefined,
      category: query.category && query.category !== 'all' ? query.category : undefined,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? KNOWLEDGE_PAGE_SIZE,
    })}`,
    { credentials: 'include', portal: true },
  );
}

export function portalKnowledgeDownloadUrl(id: string): string {
  return `${API_BASE}/api/portal/knowledge/${encodeURIComponent(id)}/download`;
}

// ─── Admin (session cookie) ───────────────────────────────────────────────────

export function fetchAdminKnowledge(
  query: AdminKnowledgeQuery = {},
): Promise<KnowledgeListResult<AdminKnowledgeItem>> {
  return listRequest<AdminKnowledgeItem>(
    `/api/admin/knowledge${buildQuery({
      q: query.q?.trim() || undefined,
      category: query.category && query.category !== 'all' ? query.category : undefined,
      status: query.status && query.status !== 'all' ? query.status : undefined,
      audience: query.audience && query.audience !== 'all' ? query.audience : undefined,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 10,
    })}`,
    { credentials: 'include' },
  );
}

export interface KnowledgeCreateInput {
  title: string;
  summary: string;
  category: KnowledgeCategory;
  audience: KnowledgeAudience;
  status: KnowledgeStatus;
  tags: string[];
  change_note?: string;
  file?: File | null;
}

export function createKnowledge(input: KnowledgeCreateInput): Promise<AdminKnowledgeItem> {
  const formData = new FormData();
  formData.set('title', input.title);
  formData.set('summary', input.summary);
  formData.set('category', input.category);
  formData.set('audience', input.audience);
  formData.set('status', input.status);
  formData.set('tags', input.tags.join(', '));
  if (input.change_note) formData.set('change_note', input.change_note);
  if (input.file) formData.set('file', input.file);
  return adminRequest<AdminKnowledgeItem>('/api/admin/knowledge', {
    method: 'POST',
    formData,
  });
}

export interface KnowledgeUpdateInput {
  title?: string;
  summary?: string;
  category?: KnowledgeCategory;
  audience?: KnowledgeAudience;
  status?: KnowledgeStatus;
  tags?: string[];
}

export function updateKnowledge(
  id: string,
  input: KnowledgeUpdateInput,
): Promise<AdminKnowledgeItem> {
  return adminRequest<AdminKnowledgeItem>(
    `/api/admin/knowledge/${encodeURIComponent(id)}`,
    { method: 'PATCH', body: input },
  );
}

export function deleteKnowledge(id: string): Promise<void> {
  return adminRequest<void>(
    `/api/admin/knowledge/${encodeURIComponent(id)}`,
    { method: 'DELETE' },
  );
}

export function uploadKnowledgeVersion(
  id: string,
  file: File,
  changeNote: string,
): Promise<AdminKnowledgeItem> {
  const formData = new FormData();
  formData.set('file', file);
  formData.set('change_note', changeNote);
  return adminRequest<AdminKnowledgeItem>(
    `/api/admin/knowledge/${encodeURIComponent(id)}/versions`,
    { method: 'POST', formData },
  );
}

// ─── Formatting helpers ─────────────────────────────────────────────────────

/** Bytes → '1.4 MB' */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** 'report-final.pdf' → 'PDF'; falls back to the mime subtype. */
export function fileTypeLabel(file: KnowledgeFile | null): string | null {
  if (!file) return null;
  const ext = file.file_name.split('.').pop();
  if (ext && ext !== file.file_name && ext.length <= 5) return ext.toUpperCase();
  const subtype = file.mime.split('/').pop() ?? '';
  return subtype ? subtype.toUpperCase() : null;
}
