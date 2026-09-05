'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, ChevronRight } from 'lucide-react';
import {
  getPlans,
  createPlan,
  hasFullAccess,
  type Plan,
} from '@/lib/portal-api';
import { usePortalUser } from '@/components/portal/portal-user-context';
import { PlanStatusBadge } from '@/components/portal/badges';
import { Modal } from '@/components/portal/modal';
import { PageLoading, PageError, EmptyState } from '@/components/portal/page-states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDateShort } from '@/lib/utils';

const PlanSchema = z.object({
  year: z.number().int().min(2000, 'Enter a valid year').max(2100, 'Enter a valid year'),
  title: z.string().min(1, 'Title is required').max(300),
});

type PlanFormValues = z.infer<typeof PlanSchema>;

export default function PlansPage() {
  const user = usePortalUser();
  const canWrite = user ? hasFullAccess(user.role) : false;

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(PlanSchema),
    defaultValues: { year: new Date().getFullYear(), title: '' },
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPlans(await getPlans());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load plans.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Runtime data fetch on mount — portal pages are client-rendered (static export).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const onSubmit = async (values: PlanFormValues) => {
    setServerError(null);
    try {
      await createPlan({ year: values.year, title: values.title });
      setModalOpen(false);
      reset({ year: new Date().getFullYear(), title: '' });
      await load();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Could not create the plan.');
    }
  };

  if (loading) return <PageLoading rows={3} />;
  if (error) return <PageError message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-text-muted">
          {plans.length} annual {plans.length === 1 ? 'plan' : 'plans'}
        </p>
        {canWrite && (
          <Button onClick={() => { setServerError(null); setModalOpen(true); }} size="sm">
            <Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />
            New annual plan
          </Button>
        )}
      </div>

      {plans.length === 0 ? (
        <EmptyState title="No annual plans yet" hint="Create the year's risk-based audit plan to schedule engagements." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {plans.map((p) => (
            <Link
              key={p.id}
              href={`/portal/plans/detail/?id=${p.id}`}
              className="group bg-surface-card rounded-xl border border-border/60 shadow-card p-6 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-accent uppercase tracking-wider">{p.year}</p>
                  <h2 className="text-lg font-display font-semibold text-primary-dark mt-1 leading-snug line-clamp-2">
                    {p.title}
                  </h2>
                </div>
                <PlanStatusBadge status={p.status} />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
                <span>
                  {p.item_count} {p.item_count === 1 ? 'item' : 'items'} · created {formatDateShort(p.created_at)}
                </span>
                <ChevronRight className="h-4 w-4 text-text-muted/40 group-hover:text-primary transition-colors" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New annual plan">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input label="Year" type="number" error={errors.year?.message} {...register('year', { valueAsNumber: true })} />
          <Input
            label="Title"
            placeholder="e.g. 2026 Annual Audit Plan"
            error={errors.title?.message}
            {...register('title')}
          />
          {serverError && (
            <p role="alert" className="text-sm text-error">{serverError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={isSubmitting}>Create plan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
