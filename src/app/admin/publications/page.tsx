'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Plus, Search, Edit, Trash2, CheckCircle, X, ChevronDown, ChevronLeft,
  ChevronRight, Loader2, AlertCircle, Upload, FileUp, Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/public-api';
import {
  fetchAdminKnowledge,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
  uploadKnowledgeVersion,
  KnowledgeApiError,
  KNOWLEDGE_CATEGORIES,
  KNOWLEDGE_CATEGORY_LABELS,
  KNOWLEDGE_CATEGORY_COLORS,
  KNOWLEDGE_MAX_FILE_BYTES,
  formatFileSize,
  fileTypeLabel,
  type AdminKnowledgeItem,
  type KnowledgeAudience,
  type KnowledgeCategory,
  type KnowledgeListMeta,
  type KnowledgeStatus,
} from '@/lib/knowledge-api';

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const inputCls =
  'w-full px-4 py-3 rounded-xl border-2 border-border/60 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none transition-colors';

const ACCEPT_FILE_TYPES = '.pdf,.doc,.docx,.xls,.xlsx';

function errMessage(e: unknown): string {
  if (e instanceof KnowledgeApiError && (e.status === 401 || e.status === 403)) {
    return 'Knowledge management requires an admin or director sign-in (magic link).';
  }
  return e instanceof Error ? e.message : 'Something went wrong';
}

function parseTags(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

// ─── Modal Component ─────────────────────────────────────────────────────────

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
          <h3 id="modal-title" className="text-lg font-bold text-primary-dark">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg hover:bg-gray-100 text-text-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Delete Confirmation ──────────────────────────────────────────────────────

interface DeleteConfirmProps {
  itemTitle: string;
  busy: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirm({ itemTitle, busy, onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-primary-dark mb-2">Delete Document?</h3>
        <p className="text-sm text-text-muted mb-6 leading-relaxed">
          <span className="font-semibold">&ldquo;{itemTitle}&rdquo;</span> and all its versions will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={busy}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-border/60 text-sm font-semibold text-text-muted hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared form pieces ───────────────────────────────────────────────────────

function StatusToggle({
  status,
  onChange,
}: {
  status: KnowledgeStatus;
  onChange: (status: KnowledgeStatus) => void;
}) {
  return (
    <div>
      <span className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
        Status
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={status === 'published'}
          onClick={() => onChange(status === 'published' ? 'draft' : 'published')}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20',
            status === 'published' ? 'bg-green-500' : 'bg-gray-300',
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
              status === 'published' ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </button>
        <span className="text-sm font-medium text-text-muted capitalize">{status}</span>
      </div>
    </div>
  );
}

function AudienceSelect({
  value,
  onChange,
}: {
  value: KnowledgeAudience;
  onChange: (audience: KnowledgeAudience) => void;
}) {
  return (
    <div>
      <span className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
        Audience
      </span>
      <div className="grid grid-cols-2 gap-2">
        {(
          [
            { key: 'public', label: 'Public', hint: 'Anyone on the website' },
            { key: 'mda', label: 'MDA auditors only', hint: 'Portal sign-in required' },
          ] as const
        ).map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            aria-pressed={value === opt.key}
            className={cn(
              'rounded-xl border-2 px-3 py-2.5 text-left transition-colors',
              value === opt.key
                ? 'border-primary bg-primary/5'
                : 'border-border/60 hover:border-primary/30',
            )}
          >
            <span className="block text-sm font-semibold text-primary-dark">{opt.label}</span>
            <span className="block text-[11px] text-text-muted">{opt.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FilePicker({
  file,
  onSelect,
  required,
}: {
  file: File | null;
  onSelect: (file: File | null) => void;
  required?: boolean;
}) {
  const inputId = useId();
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    if (selected && selected.size > KNOWLEDGE_MAX_FILE_BYTES) {
      setError(`File is ${formatFileSize(selected.size)} — the maximum is 25 MB.`);
      onSelect(null);
      e.target.value = '';
      return;
    }
    setError(null);
    onSelect(selected);
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5"
      >
        File {required ? <span className="text-red-500">*</span> : <span className="normal-case font-normal">(optional)</span>}
      </label>
      <label
        htmlFor={inputId}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-border/60 bg-white text-sm cursor-pointer hover:border-primary/40 transition-colors"
      >
        <FileUp className="h-4 w-4 text-text-muted/50 shrink-0" aria-hidden="true" />
        <span className={cn('truncate', file ? 'font-medium text-primary-dark' : 'text-text-muted/60')}>
          {file ? `${file.name} (${formatFileSize(file.size)})` : 'Choose a PDF, DOCX or XLSX file…'}
        </span>
      </label>
      <input
        id={inputId}
        type="file"
        accept={ACCEPT_FILE_TYPES}
        onChange={handleChange}
        className="sr-only"
      />
      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
      <p className="text-[11px] text-text-muted/50 mt-1.5">PDF, DOCX or XLSX — up to 25 MB.</p>
    </div>
  );
}

// ─── Upload (create) Form ─────────────────────────────────────────────────────

function UploadForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<KnowledgeCategory>('manual');
  const [audience, setAudience] = useState<KnowledgeAudience>('public');
  const [status, setStatus] = useState<KnowledgeStatus>('draft');
  const [tags, setTags] = useState('');
  const [changeNote, setChangeNote] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await createKnowledge({
        title: title.trim(),
        summary: summary.trim(),
        category,
        audience,
        status,
        tags: parseTags(tags),
        change_note: changeNote.trim() || undefined,
        file,
      });
      onSubmit();
    } catch (err) {
      setError(errMessage(err));
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div>
        <label htmlFor={titleId} className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id={titleId}
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter document title"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Summary
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          placeholder="Short description shown in the Knowledge Hub"
          className={cn(inputCls, 'resize-none')}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as KnowledgeCategory)}
            className={cn(inputCls, 'appearance-none pr-10')}
          >
            {KNOWLEDGE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {KNOWLEDGE_CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
        </div>
      </div>

      <AudienceSelect value={audience} onChange={setAudience} />

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Tags
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Comma-separated, e.g. risk, planning, template"
          className={inputCls}
        />
      </div>

      <StatusToggle status={status} onChange={setStatus} />

      <FilePicker file={file} onSelect={setFile} />

      {file && (
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
            Change note
          </label>
          <input
            type="text"
            value={changeNote}
            onChange={(e) => setChangeNote(e.target.value)}
            placeholder="e.g. Initial upload"
            className={inputCls}
          />
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="flex-1 px-4 py-2.5 rounded-xl border-2 border-border/60 text-sm font-semibold text-text-muted hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Upload
        </button>
      </div>
    </form>
  );
}

// ─── Edit (metadata) Form ─────────────────────────────────────────────────────

function EditForm({
  item,
  onSubmit,
  onCancel,
}: {
  item: AdminKnowledgeItem;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [summary, setSummary] = useState(item.summary);
  const [category, setCategory] = useState<KnowledgeCategory>(item.category);
  const [audience, setAudience] = useState<KnowledgeAudience>(item.audience);
  const [status, setStatus] = useState<KnowledgeStatus>(item.status);
  const [tags, setTags] = useState(item.tags.join(', '));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await updateKnowledge(item.id, {
        title: title.trim(),
        summary: summary.trim(),
        category,
        audience,
        status,
        tags: parseTags(tags),
      });
      onSubmit();
    } catch (err) {
      setError(errMessage(err));
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div>
        <label htmlFor={titleId} className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id={titleId}
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Summary
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className={cn(inputCls, 'resize-none')}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as KnowledgeCategory)}
            className={cn(inputCls, 'appearance-none pr-10')}
          >
            {KNOWLEDGE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {KNOWLEDGE_CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
        </div>
      </div>

      <AudienceSelect value={audience} onChange={setAudience} />

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Tags
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Comma-separated"
          className={inputCls}
        />
      </div>

      <StatusToggle status={status} onChange={setStatus} />

      <p className="text-[11px] text-text-muted/50">
        To replace the document file itself, use <span className="font-semibold">New version</span> from the row actions.
      </p>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="flex-1 px-4 py-2.5 rounded-xl border-2 border-border/60 text-sm font-semibold text-text-muted hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Save Changes
        </button>
      </div>
    </form>
  );
}

// ─── New Version Form ─────────────────────────────────────────────────────────

function VersionForm({
  item,
  onSubmit,
  onCancel,
}: {
  item: AdminKnowledgeItem;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [changeNote, setChangeNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError('Choose a file to upload as the new version.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await uploadKnowledgeVersion(item.id, file, changeNote.trim());
      onSubmit();
    } catch (err) {
      setError(errMessage(err));
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-700">{error}</p>}

      <p className="text-sm text-text-muted leading-relaxed">
        Uploading a new version of <span className="font-semibold text-primary-dark">&ldquo;{item.title}&rdquo;</span>.
        The previous file is kept in the version history; downloads always serve the latest version.
      </p>

      <FilePicker file={file} onSelect={setFile} required />

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
          Change note
        </label>
        <input
          type="text"
          value={changeNote}
          onChange={(e) => setChangeNote(e.target.value)}
          placeholder="e.g. Updated thresholds for 2026"
          className={inputCls}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="flex-1 px-4 py-2.5 rounded-xl border-2 border-border/60 text-sm font-semibold text-text-muted hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || !file}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Upload Version
        </button>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type ModalState =
  | { type: 'none' }
  | { type: 'create' }
  | { type: 'edit'; item: AdminKnowledgeItem }
  | { type: 'delete'; item: AdminKnowledgeItem }
  | { type: 'version'; item: AdminKnowledgeItem };

export default function AdminPublicationsPage() {
  const [items, setItems] = useState<AdminKnowledgeItem[] | null>(null);
  const [meta, setMeta] = useState<KnowledgeListMeta>({ page: 1, pageSize: PAGE_SIZE, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<KnowledgeCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<KnowledgeStatus | 'all'>('all');
  const [audienceFilter, setAudienceFilter] = useState<KnowledgeAudience | 'all'>('all');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const requestId = useRef(0);

  const load = useCallback(
    async (q: string, cat: KnowledgeCategory | 'all', st: KnowledgeStatus | 'all', aud: KnowledgeAudience | 'all', pg: number) => {
      const id = ++requestId.current;
      try {
        const result = await fetchAdminKnowledge({
          q,
          category: cat,
          status: st,
          audience: aud,
          page: pg,
          pageSize: PAGE_SIZE,
        });
        if (id !== requestId.current) return;
        setItems(result.items);
        setMeta(result.meta);
        setError(null);
      } catch (err) {
        if (id !== requestId.current) return;
        setError(errMessage(err));
        setItems((prev) => prev ?? []);
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    },
    [],
  );

  // Live load + debounced search (debounce only applies to free text).
  useEffect(() => {
    const timer = setTimeout(
      () => void load(query, categoryFilter, statusFilter, audienceFilter, page),
      query.trim() ? 300 : 0,
    );
    return () => clearTimeout(timer);
  }, [query, categoryFilter, statusFilter, audienceFilter, page, load]);

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  function reload() {
    void load(query, categoryFilter, statusFilter, audienceFilter, page);
  }

  async function toggleStatus(item: AdminKnowledgeItem) {
    const next: KnowledgeStatus = item.status === 'published' ? 'draft' : 'published';
    setBusyId(item.id);
    try {
      await updateKnowledge(item.id, { status: next });
      reload();
      showSuccess(next === 'published' ? 'Document published.' : 'Document moved to draft.');
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete() {
    if (modal.type !== 'delete') return;
    setDeleteBusy(true);
    try {
      await deleteKnowledge(modal.item.id);
      setModal({ type: 'none' });
      reload();
      showSuccess('Document deleted.');
    } catch (err) {
      setError(errMessage(err));
      setModal({ type: 'none' });
    } finally {
      setDeleteBusy(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.pageSize));

  return (
    <div>
      {/* Success banner */}
      {successMsg && (
        <div
          role="status"
          className="flex items-center gap-2.5 mb-6 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium"
        >
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          {successMsg}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 mb-6 rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary-dark">Knowledge Hub</h2>
          <p className="text-sm text-text-muted mt-1">
            Manage manuals, templates, standards, circulars, guidelines, reports, forms and policies.
          </p>
        </div>
        <button
          onClick={() => setModal({ type: 'create' })}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Upload Document
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/40"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search documents..."
            aria-label="Search documents"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-border/60 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value as KnowledgeCategory | 'all');
                setPage(1);
              }}
              aria-label="Filter by category"
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border-2 border-border/60 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none transition-colors font-medium text-text-muted"
            >
              <option value="all">All Categories</option>
              {KNOWLEDGE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {KNOWLEDGE_CATEGORY_LABELS[cat]}s
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as KnowledgeStatus | 'all');
                setPage(1);
              }}
              aria-label="Filter by status"
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border-2 border-border/60 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none transition-colors font-medium text-text-muted"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
          </div>

          <div className="relative">
            <select
              value={audienceFilter}
              onChange={(e) => {
                setAudienceFilter(e.target.value as KnowledgeAudience | 'all');
                setPage(1);
              }}
              aria-label="Filter by audience"
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border-2 border-border/60 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none transition-colors font-medium text-text-muted"
            >
              <option value="all">All Audiences</option>
              <option value="public">Public</option>
              <option value="mda">MDA only</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border-2 border-border/40 overflow-hidden">
        {loading && items === null ? (
          <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading documents…
          </div>
        ) : !items || items.length === 0 ? (
          <div className="py-16 text-center text-sm text-text-muted/60">
            {meta.total === 0 && !query && categoryFilter === 'all' && statusFilter === 'all' && audienceFilter === 'all'
              ? 'No documents uploaded yet.'
              : 'No documents match the current filters.'}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border/40">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                  Audience
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {items.map((row) => {
                const fileType = fileTypeLabel(row.current_file);
                return (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm font-medium text-primary-dark truncate">{row.title}</p>
                      <p className="text-[11px] text-text-muted/50 mt-0.5">
                        Updated {formatDate(row.updated_at)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                          KNOWLEDGE_CATEGORY_COLORS[row.category] ?? 'bg-gray-100 text-gray-700',
                        )}
                      >
                        {KNOWLEDGE_CATEGORY_LABELS[row.category] ?? row.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                          row.audience === 'mda'
                            ? 'bg-primary-dark/5 text-primary-dark border border-primary-dark/10'
                            : 'bg-gray-100 text-gray-600',
                        )}
                      >
                        {row.audience === 'mda' ? 'MDA only' : 'Public'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {row.current_file && fileType ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-gray-100 text-gray-700">
                            {fileType}
                          </span>
                          <span className="text-[11px] font-semibold text-text-muted/60">
                            v{row.version_count}
                          </span>
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted/40">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
                        <Download className="h-3.5 w-3.5 text-text-muted/40" aria-hidden="true" />
                        {row.download_count}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => void toggleStatus(row)}
                        disabled={busyId === row.id}
                        aria-label={`Toggle status — currently ${row.status}`}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-opacity hover:opacity-75 disabled:opacity-50',
                          row.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600',
                        )}
                      >
                        {busyId === row.id && <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />}
                        {row.status === 'published' ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setModal({ type: 'version', item: row })}
                          aria-label={`Upload new version of ${row.title}`}
                          title="Upload new version"
                          className="p-2 rounded-lg hover:bg-primary/5 text-text-muted hover:text-primary transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setModal({ type: 'edit', item: row })}
                          aria-label={`Edit ${row.title}`}
                          className="p-2 rounded-lg hover:bg-primary/5 text-text-muted hover:text-primary transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setModal({ type: 'delete', item: row })}
                          aria-label={`Delete ${row.title}`}
                          className="p-2 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Document pages" className="flex items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
              page === 1
                ? 'text-text-muted/30 cursor-not-allowed'
                : 'text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30',
            )}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </button>
          <span className="text-sm text-text-muted">
            Page {meta.page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
              page === totalPages
                ? 'text-text-muted/30 cursor-not-allowed'
                : 'text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30',
            )}
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      )}

      {/* Modals */}
      {modal.type === 'create' && (
        <Modal title="Upload Document" onClose={() => setModal({ type: 'none' })}>
          <UploadForm
            onSubmit={() => {
              setModal({ type: 'none' });
              setPage(1);
              void load(query, categoryFilter, statusFilter, audienceFilter, 1);
              showSuccess('Document uploaded successfully.');
            }}
            onCancel={() => setModal({ type: 'none' })}
          />
        </Modal>
      )}

      {modal.type === 'edit' && (
        <Modal title="Edit Document" onClose={() => setModal({ type: 'none' })}>
          <EditForm
            item={modal.item}
            onSubmit={() => {
              setModal({ type: 'none' });
              reload();
              showSuccess('Document updated successfully.');
            }}
            onCancel={() => setModal({ type: 'none' })}
          />
        </Modal>
      )}

      {modal.type === 'version' && (
        <Modal title="Upload New Version" onClose={() => setModal({ type: 'none' })}>
          <VersionForm
            item={modal.item}
            onSubmit={() => {
              setModal({ type: 'none' });
              reload();
              showSuccess('New version uploaded.');
            }}
            onCancel={() => setModal({ type: 'none' })}
          />
        </Modal>
      )}

      {modal.type === 'delete' && (
        <DeleteConfirm
          itemTitle={modal.item.title}
          busy={deleteBusy}
          onConfirm={() => void handleDelete()}
          onCancel={() => setModal({ type: 'none' })}
        />
      )}
    </div>
  );
}
