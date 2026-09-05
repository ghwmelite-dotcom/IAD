'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  BadgeCheck, Plus, Search, X, Loader2, ShieldCheck, Award,
  GraduationCap, BookOpen, Copy, Check, ChevronRight, AlertCircle,
} from 'lucide-react';

/* ── API shapes (functions/api/admin/registry/**) ── */

interface AuditorRow {
  id: string;
  staff_id: string;
  name: string;
  grade: string | null;
  mda_name: string | null;
  public_slug: string;
  verified: number;
  created_at: string;
  credential_count: number;
  cpd_points: number;
}

interface Credential {
  id: string;
  body: string;
  designation: string;
  year: number | null;
  verified: number;
}

interface CpdRecord {
  id: string;
  activity: string;
  points: number;
  year: number;
  source: string | null;
}

interface Certificate {
  id: string;
  title: string;
  serial: string;
  verify_code: string;
  issued_at: string;
}

interface AuditorDetail extends Omit<AuditorRow, 'credential_count' | 'cpd_points'> {
  credentials: Credential[];
  cpd_records: CpdRecord[];
  certificates: Certificate[];
}

const CREDENTIAL_BODIES = ['FCCA', 'ACCA', 'IIA', 'CITG', 'ICA-GH', 'OTHER'] as const;

/* ── Fetch helper ── */

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    ...options,
  });
  const body = (await res.json().catch(() => ({}))) as {
    data?: T;
    error?: { code?: string; message?: string } | string;
  };
  if (!res.ok) {
    const msg =
      typeof body.error === 'string'
        ? body.error
        : body.error?.message ?? `Request failed (${res.status})`;
    const err = new Error(msg) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return body.data as T;
}

function errMessage(e: unknown): string {
  return e instanceof Error ? e.message : 'Something went wrong';
}

/* ── Page ── */

export default function AdminRegistryPage() {
  const [auditors, setAuditors] = useState<AuditorRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const rows = await api<AuditorRow[]>('/api/admin/registry');
      setAuditors(rows);
      setError(null);
    } catch (e) {
      const status = (e as { status?: number }).status;
      setError(
        status === 401 || status === 403
          ? 'Registry management requires an admin or director sign-in (magic link).'
          : errMessage(e),
      );
      setAuditors([]);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = (auditors ?? []).filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.staff_id.toLowerCase().includes(search.toLowerCase()) ||
      (a.mda_name ?? '').toLowerCase().includes(search.toLowerCase()),
  );

  async function toggleVerified(a: AuditorRow) {
    try {
      await api(`/api/admin/registry/${a.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ verified: !a.verified }),
      });
      await load();
    } catch (e) {
      setError(errMessage(e));
    }
  }

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <p className="text-sm text-text-muted">
            Internal Audit Class registry — live data from <code className="text-xs">/api/admin/registry</code>.
          </p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Register Auditor
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {showAdd && (
        <AddAuditorForm
          onDone={() => {
            setShowAdd(false);
            void load();
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/40" aria-hidden="true" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, staff ID or MDA…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border-2 border-border/40 overflow-hidden">
        {auditors === null ? (
          <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading registry…
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-text-muted/60">
            {auditors.length === 0 ? 'No auditors registered yet.' : 'No auditors match your search.'}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border/30">
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Auditor</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Staff ID</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Grade</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">MDA</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">CPD</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Verified</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-border/20 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 text-primary text-sm font-bold">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-dark">{a.name}</p>
                        <p className="text-[11px] text-text-muted/50">/registry/{a.public_slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-text-muted">{a.staff_id}</td>
                  <td className="px-5 py-4 text-sm text-text-muted">{a.grade ?? '—'}</td>
                  <td className="px-5 py-4 text-sm text-text-muted max-w-56 truncate">{a.mda_name ?? '—'}</td>
                  <td className="px-5 py-4 text-sm text-text-muted">{a.cpd_points} pts</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => void toggleVerified(a)}
                      title={a.verified ? 'Revoke verification' : 'Mark verified'}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors',
                        a.verified
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                      )}
                    >
                      <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                      {a.verified ? 'Verified' : 'Unverified'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedId(a.id)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors"
                    >
                      Manage <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedId && (
        <AuditorDrawer
          id={selectedId}
          onClose={() => {
            setSelectedId(null);
            void load();
          }}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   Add Auditor Form
   ══════════════════════════════════════════ */
function AddAuditorForm({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    staff_id: '',
    name: '',
    grade: '',
    mda_name: '',
    public_slug: '',
    verified: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function slugify(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api('/api/admin/registry', {
        method: 'POST',
        body: JSON.stringify({
          staff_id: form.staff_id.trim(),
          name: form.name.trim(),
          grade: form.grade.trim() || undefined,
          mda_name: form.mda_name.trim() || undefined,
          public_slug: form.public_slug.trim(),
          verified: form.verified,
        }),
      });
      onDone();
    } catch (err) {
      setError(errMessage(err));
      setSubmitting(false);
    }
  }

  const inputCls =
    'w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10';

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border-2 border-primary/20 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-primary-dark">Register a new auditor</h3>
        <button type="button" onClick={onCancel} className="text-text-muted hover:text-primary-dark">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Full name *</label>
          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                name: e.target.value,
                public_slug: f.public_slug || slugify(e.target.value),
              }))
            }
            className={inputCls}
            placeholder="Ama Serwaa Mensah"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Staff ID *</label>
          <input
            required
            value={form.staff_id}
            onChange={(e) => setForm((f) => ({ ...f, staff_id: e.target.value }))}
            className={inputCls}
            placeholder="IAC-000123"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Grade</label>
          <input
            value={form.grade}
            onChange={(e) => setForm((f) => ({ ...f, grade: e.target.value }))}
            className={inputCls}
            placeholder="Principal Internal Auditor"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">MDA</label>
          <input
            value={form.mda_name}
            onChange={(e) => setForm((f) => ({ ...f, mda_name: e.target.value }))}
            className={inputCls}
            placeholder="Ministry of Finance"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Public slug *</label>
          <input
            required
            pattern="[a-z0-9-]+"
            value={form.public_slug}
            onChange={(e) => setForm((f) => ({ ...f, public_slug: e.target.value }))}
            className={inputCls}
            placeholder="ama-serwaa-mensah"
          />
          <p className="text-[11px] text-text-muted/50 mt-1">Lowercase letters, digits and hyphens — used in the public registry URL.</p>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={form.verified}
              onChange={(e) => setForm((f) => ({ ...f, verified: e.target.checked }))}
              className="w-4 h-4 rounded border-border/60 text-primary focus:ring-primary/30"
            />
            Mark as verified immediately
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl border-2 border-border/40 text-sm font-medium text-text-muted hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Register Auditor
        </button>
      </div>
    </form>
  );
}

/* ══════════════════════════════════════════
   Auditor Detail Drawer
   ══════════════════════════════════════════ */
function AuditorDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const [detail, setDetail] = useState<AuditorDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setDetail(await api<AuditorDetail>(`/api/admin/registry/${id}`));
      setError(null);
    } catch (e) {
      setError(errMessage(e));
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Auditor details">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-xl bg-surface h-full overflow-y-auto shadow-2xl p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            {detail ? (
              <>
                <h2 className="text-xl font-display font-bold text-primary-dark flex items-center gap-2">
                  {detail.name}
                  {detail.verified === 1 && <BadgeCheck className="h-5 w-5 text-emerald-600" aria-label="Verified" />}
                </h2>
                <p className="text-sm text-text-muted">
                  {detail.grade ?? '—'} &middot; {detail.mda_name ?? '—'} &middot; Staff ID {detail.staff_id}
                </p>
              </>
            ) : (
              <h2 className="text-xl font-display font-bold text-primary-dark">Auditor</h2>
            )}
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-primary-dark">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-3 rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}

        {!detail && !error && (
          <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
          </div>
        )}

        {detail && (
          <>
            <CredentialsSection auditorId={id} credentials={detail.credentials} onChanged={load} />
            <CpdSection auditorId={id} records={detail.cpd_records} onChanged={load} />
            <CertificatesSection auditorId={id} certificates={detail.certificates} onChanged={load} />
          </>
        )}
      </div>
    </div>
  );
}

/* ── Section shell ── */
function Section({
  icon: Icon,
  title,
  action,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border-2 border-border/40 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold text-primary-dark uppercase tracking-wider">
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
          {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}

const smallBtn =
  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-border/40 text-xs font-semibold text-text-muted hover:border-primary/30 hover:text-primary transition-colors';
const inputCls =
  'w-full px-3 py-2 rounded-lg border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10';

/* ══════════════════════════════════════════
   Credentials
   ══════════════════════════════════════════ */
function CredentialsSection({
  auditorId,
  credentials,
  onChanged,
}: {
  auditorId: string;
  credentials: Credential[];
  onChanged: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ body: 'IIA' as string, designation: '', year: '', verified: true });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api(`/api/admin/registry/${auditorId}/credentials`, {
        method: 'POST',
        body: JSON.stringify({
          body: form.body,
          designation: form.designation.trim(),
          year: form.year ? Number(form.year) : undefined,
          verified: form.verified,
        }),
      });
      setOpen(false);
      setForm({ body: 'IIA', designation: '', year: '', verified: true });
      await onChanged();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      icon={GraduationCap}
      title={`Credentials (${credentials.length})`}
      action={
        <button onClick={() => setOpen((v) => !v)} className={smallBtn}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add
        </button>
      }
    >
      {credentials.length === 0 && <p className="text-sm text-text-muted/60">No credentials on record.</p>}
      <ul className="space-y-2">
        {credentials.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-primary-dark">
              <span className="font-semibold">{c.body}</span> — {c.designation}
              {c.year ? <span className="text-text-muted/60"> ({c.year})</span> : null}
            </span>
            {c.verified === 1 && <BadgeCheck className="h-4 w-4 text-emerald-600 shrink-0" aria-label="Verified" />}
          </li>
        ))}
      </ul>

      {open && (
        <form onSubmit={submit} className="border-t border-border/30 pt-4 grid gap-3 sm:grid-cols-2">
          {error && <p className="sm:col-span-2 text-sm text-red-700">{error}</p>}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Body *</label>
            <select value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className={cn(inputCls, 'bg-white')}>
              {CREDENTIAL_BODIES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Year</label>
            <input
              type="number"
              min={1950}
              max={2100}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className={inputCls}
              placeholder="2019"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-text-muted mb-1">Designation *</label>
            <input
              required
              value={form.designation}
              onChange={(e) => setForm({ ...form, designation: e.target.value })}
              className={inputCls}
              placeholder="Certified Internal Auditor (CIA)"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-text-muted sm:col-span-2">
            <input
              type="checkbox"
              checked={form.verified}
              onChange={(e) => setForm({ ...form, verified: e.target.checked })}
              className="w-4 h-4 rounded border-border/60 text-primary focus:ring-primary/30"
            />
            Credential verified
          </label>
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" disabled={busy} className={cn(smallBtn, 'bg-primary text-white border-primary hover:text-white hover:bg-primary-light')}>
              {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />} Save credential
            </button>
          </div>
        </form>
      )}
    </Section>
  );
}

/* ══════════════════════════════════════════
   CPD Records
   ══════════════════════════════════════════ */
function CpdSection({
  auditorId,
  records,
  onChanged,
}: {
  auditorId: string;
  records: CpdRecord[];
  onChanged: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ activity: '', points: '', year: String(new Date().getFullYear()), source: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = records.reduce((sum, r) => sum + r.points, 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api(`/api/admin/registry/${auditorId}/cpd`, {
        method: 'POST',
        body: JSON.stringify({
          activity: form.activity.trim(),
          points: Number(form.points),
          year: Number(form.year),
          source: form.source.trim() || undefined,
        }),
      });
      setOpen(false);
      setForm({ activity: '', points: '', year: String(new Date().getFullYear()), source: '' });
      await onChanged();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      icon={BookOpen}
      title={`CPD Records (${total} pts)`}
      action={
        <button onClick={() => setOpen((v) => !v)} className={smallBtn}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add
        </button>
      }
    >
      {records.length === 0 && <p className="text-sm text-text-muted/60">No CPD records yet.</p>}
      <ul className="space-y-2">
        {records.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-primary-dark">
              {r.activity}
              {r.source ? <span className="text-text-muted/60"> · {r.source}</span> : null}
            </span>
            <span className="text-text-muted shrink-0">{r.year} · {r.points} pts</span>
          </li>
        ))}
      </ul>

      {open && (
        <form onSubmit={submit} className="border-t border-border/30 pt-4 grid gap-3 sm:grid-cols-2">
          {error && <p className="sm:col-span-2 text-sm text-red-700">{error}</p>}
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-text-muted mb-1">Activity *</label>
            <input
              required
              value={form.activity}
              onChange={(e) => setForm({ ...form, activity: e.target.value })}
              className={inputCls}
              placeholder="IIA Ghana National Conference"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Points *</label>
            <input
              required
              type="number"
              min={0}
              max={500}
              value={form.points}
              onChange={(e) => setForm({ ...form, points: e.target.value })}
              className={inputCls}
              placeholder="20"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Year *</label>
            <input
              required
              type="number"
              min={1990}
              max={2100}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className={inputCls}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-text-muted mb-1">Source</label>
            <input
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className={inputCls}
              placeholder="IIA Ghana"
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" disabled={busy} className={cn(smallBtn, 'bg-primary text-white border-primary hover:text-white hover:bg-primary-light')}>
              {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />} Save CPD record
            </button>
          </div>
        </form>
      )}
    </Section>
  );
}

/* ══════════════════════════════════════════
   Certificates
   ══════════════════════════════════════════ */
function CertificatesSection({
  auditorId,
  certificates,
  onChanged,
}: {
  auditorId: string;
  certificates: Certificate[];
  onChanged: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issued, setIssued] = useState<{ serial: string; verify_code: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard unavailable — the code is displayed for manual copy.
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await api<{ id: string; serial: string; verify_code: string }>(
        `/api/admin/registry/${auditorId}/certificates`,
        { method: 'POST', body: JSON.stringify({ title: title.trim() }) },
      );
      setIssued({ serial: data.serial, verify_code: data.verify_code });
      setOpen(false);
      setTitle('');
      await onChanged();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      icon={Award}
      title={`Certificates (${certificates.length})`}
      action={
        <button onClick={() => { setOpen((v) => !v); setIssued(null); }} className={smallBtn}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Issue
        </button>
      }
    >
      {/* Newly issued certificate — show the verify code prominently */}
      {issued && (
        <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 space-y-2">
          <p className="flex items-center gap-2 text-sm font-bold text-emerald-900">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Certificate issued
          </p>
          <div className="grid gap-2 sm:grid-cols-2 text-sm">
            <div className="rounded-lg bg-white border border-emerald-200 px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Serial</p>
              <p className="font-mono font-semibold text-primary-dark">{issued.serial}</p>
            </div>
            <div className="rounded-lg bg-white border border-emerald-200 px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Verify code — share with the auditor</p>
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-lg font-bold tracking-widest text-primary-dark">{issued.verify_code}</p>
                <button
                  onClick={() => void copy(issued.verify_code)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  {copied === issued.verify_code ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  {copied === issued.verify_code ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-emerald-800/70">
            Anyone can confirm this certificate at <span className="font-mono">/verify</span> with the code above.
          </p>
        </div>
      )}

      {certificates.length === 0 && !issued && <p className="text-sm text-text-muted/60">No certificates issued.</p>}
      <ul className="space-y-2">
        {certificates.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-3 text-sm border-b border-border/20 last:border-0 pb-2">
            <div>
              <p className="font-medium text-primary-dark">{c.title}</p>
              <p className="text-[11px] text-text-muted/60 font-mono">{c.serial} · issued {c.issued_at.slice(0, 10)}</p>
            </div>
            <button
              onClick={() => void copy(c.verify_code)}
              title="Copy verify code"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary hover:text-primary-light shrink-0"
            >
              {copied === c.verify_code ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {c.verify_code}
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <form onSubmit={submit} className="border-t border-border/30 pt-4 space-y-3">
          {error && <p className="text-sm text-red-700">{error}</p>}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Certificate title *</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputCls}
              placeholder="Internal Audit Class — Certificate of Good Standing"
            />
            <p className="text-[11px] text-text-muted/50 mt-1">
              A serial number (IAD-CERT-YYYY-NNNN) and public verify code are generated automatically.
            </p>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={busy} className={cn(smallBtn, 'bg-primary text-white border-primary hover:text-white hover:bg-primary-light')}>
              {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />} Issue certificate
            </button>
          </div>
        </form>
      )}
    </Section>
  );
}
