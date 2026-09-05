'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import {
  getEngagements,
  createEngagement,
  getUniverse,
  hasFullAccess,
  type Engagement,
  type UniverseEntry,
} from '@/lib/portal-api';
import { usePortalUser } from '@/components/portal/portal-user-context';
import { PhaseBadge } from '@/components/portal/badges';
import { Modal } from '@/components/portal/modal';
import { PageLoading, PageError, EmptyState } from '@/components/portal/page-states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDateShort } from '@/lib/utils';

const EngagementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  universe_id: z.string().min(1, 'Select a universe entry'),
  start_date: z.string().min(4, 'Start date is required'),
  lead_auditor_id: z.string().optional(),
});

type EngagementFormValues = z.infer<typeof EngagementSchema>;

export default function EngagementsPage() {
  const user = usePortalUser();
  const canWrite = user ? hasFullAccess(user.role) : false;

  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [universe, setUniverse] = useState<UniverseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EngagementFormValues>({ resolver: zodResolver(EngagementSchema) });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [engs, uni] = await Promise.all([getEngagements(), getUniverse()]);
      setEngagements(engs);
      setUniverse(uni);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load engagements.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Runtime data fetch on mount — portal pages are client-rendered (static export).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const onSubmit = async (values: EngagementFormValues) => {
    setServerError(null);
    try {
      await createEngagement({
        title: values.title,
        universe_id: values.universe_id,
        start_date: values.start_date,
        ...(values.lead_auditor_id ? { lead_auditor_id: values.lead_auditor_id } : {}),
      });
      setModalOpen(false);
      reset({ title: '', universe_id: '', start_date: '', lead_auditor_id: '' });
      await load();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Could not create the engagement.');
    }
  };

  if (loading) return <PageLoading rows={4} />;
  if (error) return <PageError message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-text-muted">
          {engagements.length} {engagements.length === 1 ? 'engagement' : 'engagements'}
        </p>
        {canWrite && (
          <Button size="sm" onClick={() => { setServerError(null); setModalOpen(true); }}>
            <Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />
            New engagement
          </Button>
        )}
      </div>

      {engagements.length === 0 ? (
        <EmptyState title="No engagements yet" hint="Create an engagement from a universe entry to begin fieldwork." />
      ) : (
        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Code</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Title</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">MDA</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Phase</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Lead</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Start</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">End</th>
              </tr>
            </thead>
            <tbody>
              {engagements.map((e) => (
                <tr key={e.id} className="border-b border-border/40 last:border-0 hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{e.code}</td>
                  <td className="px-4 py-3 max-w-72">
                    <Link href={`/portal/engagements/detail/?id=${e.id}`} className="font-medium text-primary hover:underline line-clamp-2">
                      {e.title}
                    </Link>
                    <span className="block text-xs text-text-muted mt-0.5">{e.unit_name}</span>
                  </td>
                  <td className="px-4 py-3 max-w-48 truncate">{e.mda_name}</td>
                  <td className="px-4 py-3"><PhaseBadge phase={e.phase} /></td>
                  <td className="px-4 py-3 whitespace-nowrap">{e.lead_auditor_name ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted">{formatDateShort(e.start_date)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted">{e.end_date ? formatDateShort(e.end_date) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New engagement">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input
            label="Engagement title"
            placeholder="e.g. Audit of procurement processes"
            error={errors.title?.message}
            {...register('title')}
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="universe_id" className="block text-sm font-medium text-text">
              Universe entry
            </label>
            <select
              id="universe_id"
              className="h-12 px-4 rounded-md border border-border bg-surface-card text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              {...register('universe_id')}
            >
              <option value="">Select an auditable entity…</option>
              {universe.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.mda_name} — {u.unit_name} (risk {u.risk_score})
                </option>
              ))}
            </select>
            {errors.universe_id && (
              <p role="alert" className="text-sm text-error mt-0.5">{errors.universe_id.message}</p>
            )}
          </div>
          <Input label="Start date" type="date" error={errors.start_date?.message} {...register('start_date')} />
          <Input
            label="Lead auditor user ID (optional)"
            placeholder="Paste the user ID of the lead auditor"
            error={errors.lead_auditor_id?.message}
            {...register('lead_auditor_id')}
          />
          {serverError && (
            <p role="alert" className="text-sm text-error">{serverError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={isSubmitting}>Create engagement</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
