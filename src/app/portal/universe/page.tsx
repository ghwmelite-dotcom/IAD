'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil } from 'lucide-react';
import {
  getUniverse,
  createUniverseEntry,
  updateUniverseEntry,
  hasFullAccess,
  type UniverseEntry,
} from '@/lib/portal-api';
import { usePortalUser } from '@/components/portal/portal-user-context';
import { RiskHeatMap } from '@/components/portal/risk-heat-map';
import { Modal } from '@/components/portal/modal';
import { PageLoading, PageError } from '@/components/portal/page-states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { formatDateShort } from '@/lib/utils';

const UniverseSchema = z.object({
  mda_name: z.string().min(1, 'MDA name is required').max(200),
  unit_name: z.string().min(1, 'Unit name is required').max(200),
  category: z.string().min(1, 'Category is required').max(120),
  risk_likelihood: z.number().int().min(1).max(5),
  risk_impact: z.number().int().min(1).max(5),
  last_audited_at: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

type UniverseFormValues = z.infer<typeof UniverseSchema>;

function riskVariant(score: number): 'error' | 'warning' | 'accent' | 'success' {
  if (score >= 15) return 'error';
  if (score >= 8) return 'warning';
  if (score >= 4) return 'accent';
  return 'success';
}

export default function UniversePage() {
  const user = usePortalUser();
  const canWrite = user ? hasFullAccess(user.role) : false;

  const [entries, setEntries] = useState<UniverseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UniverseEntry | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UniverseFormValues>({ resolver: zodResolver(UniverseSchema) });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setEntries(await getUniverse());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load the audit universe.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Runtime data fetch on mount — portal pages are client-rendered (static export).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const openAdd = () => {
    setEditing(null);
    setServerError(null);
    reset({ mda_name: '', unit_name: '', category: '', risk_likelihood: 3, risk_impact: 3, last_audited_at: '', notes: '' });
    setModalOpen(true);
  };

  const openEdit = (entry: UniverseEntry) => {
    setEditing(entry);
    setServerError(null);
    reset({
      mda_name: entry.mda_name,
      unit_name: entry.unit_name,
      category: entry.category,
      risk_likelihood: entry.risk_likelihood,
      risk_impact: entry.risk_impact,
      last_audited_at: entry.last_audited_at?.slice(0, 10) ?? '',
      notes: entry.notes ?? '',
    });
    setModalOpen(true);
  };

  const onSubmit = async (values: UniverseFormValues) => {
    setServerError(null);
    const payload = {
      mda_name: values.mda_name,
      unit_name: values.unit_name,
      category: values.category,
      risk_likelihood: values.risk_likelihood,
      risk_impact: values.risk_impact,
      ...(values.last_audited_at ? { last_audited_at: values.last_audited_at } : {}),
      ...(values.notes ? { notes: values.notes } : {}),
    };
    try {
      if (editing) {
        await updateUniverseEntry(editing.id, payload);
      } else {
        await createUniverseEntry(payload);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Save failed.');
    }
  };

  if (loading) return <PageLoading rows={5} />;
  if (error) return <PageError message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-text-muted">
          {entries.length} auditable {entries.length === 1 ? 'entity' : 'entities'} registered
        </p>
        {canWrite && (
          <Button onClick={openAdd} size="sm">
            <Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />
            Add universe entry
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Heat map */}
        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
          <h2 className="text-base font-display font-semibold text-primary-dark mb-4">Risk heat map</h2>
          <RiskHeatMap entries={entries} />
        </div>

        {/* Register table */}
        <div className="xl:col-span-2 bg-surface-card rounded-xl border border-border/60 shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">MDA</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Unit</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Category</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted text-center">L × I</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Risk</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Last audited</th>
                {canWrite && <th className="px-4 py-3" aria-label="Actions" />}
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-border/40 last:border-0 hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3 font-medium max-w-56 truncate">{e.mda_name}</td>
                  <td className="px-4 py-3 max-w-48 truncate">{e.unit_name}</td>
                  <td className="px-4 py-3">{e.category}</td>
                  <td className="px-4 py-3 text-center tabular-nums text-text-muted">
                    {e.risk_likelihood} × {e.risk_impact}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={riskVariant(e.risk_score)}>{e.risk_score}</Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted">
                    {e.last_audited_at ? formatDateShort(e.last_audited_at) : '—'}
                  </td>
                  {canWrite && (
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openEdit(e)}
                        aria-label={`Edit ${e.mda_name} — ${e.unit_name}`}
                        className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={canWrite ? 7 : 6} className="px-4 py-10 text-center text-text-muted">
                    No universe entries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit universe entry' : 'Add universe entry'}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input label="MDA name" placeholder="e.g. Ministry of Health" error={errors.mda_name?.message} {...register('mda_name')} />
          <Input label="Unit / department" placeholder="e.g. Procurement Directorate" error={errors.unit_name?.message} {...register('unit_name')} />
          <Input label="Category" placeholder="e.g. Procurement, Payroll, Stores" error={errors.category?.message} {...register('category')} />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="risk_likelihood" className="block text-sm font-medium text-text">
                Likelihood (1–5)
              </label>
              <select
                id="risk_likelihood"
                className="h-12 px-4 rounded-md border border-border bg-surface-card text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                {...register('risk_likelihood', { valueAsNumber: true })}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="risk_impact" className="block text-sm font-medium text-text">
                Impact (1–5)
              </label>
              <select
                id="risk_impact"
                className="h-12 px-4 rounded-md border border-border bg-surface-card text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                {...register('risk_impact', { valueAsNumber: true })}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <Input label="Last audited (optional)" type="date" error={errors.last_audited_at?.message} {...register('last_audited_at')} />
          <Textarea label="Notes (optional)" error={errors.notes?.message} {...register('notes')} />
          {serverError && (
            <p role="alert" className="text-sm text-error">{serverError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {editing ? 'Save changes' : 'Add entry'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
