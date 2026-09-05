'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Plus, Send, CheckCircle } from 'lucide-react';
import {
  getPlan,
  updatePlan,
  addPlanItem,
  updatePlanItem,
  getUniverse,
  hasFullAccess,
  type PlanDetail,
  type PlanItemStatus,
  type Quarter,
  type Priority,
  type UniverseEntry,
} from '@/lib/portal-api';
import { usePortalUser } from '@/components/portal/portal-user-context';
import { PlanStatusBadge, PlanItemStatusBadge, PriorityBadge } from '@/components/portal/badges';
import { Modal } from '@/components/portal/modal';
import { PageLoading, PageError } from '@/components/portal/page-states';
import { Button } from '@/components/ui/button';
import { formatDateShort } from '@/lib/utils';

const QUARTERS: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'];
const ITEM_STATUSES: PlanItemStatus[] = ['planned', 'in_progress', 'done', 'deferred'];

export default function PlanDetailPage() {
  return (
    <Suspense fallback={<PageLoading rows={4} />}>
      <PlanDetailInner />
    </Suspense>
  );
}

function PlanDetailInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const user = usePortalUser();
  const canWrite = user ? hasFullAccess(user.role) : false;

  const [plan, setPlan] = useState<PlanDetail | null>(null);
  const [universe, setUniverse] = useState<UniverseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [actionBusy, setActionBusy] = useState(false);

  // Add-item form state (simple controlled form — three selects)
  const [itemUniverseId, setItemUniverseId] = useState('');
  const [itemQuarter, setItemQuarter] = useState<Quarter>('Q1');
  const [itemPriority, setItemPriority] = useState<Priority>('medium');

  const load = useCallback(async () => {
    if (!id) {
      setError('No plan id supplied.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [planData, universeData] = await Promise.all([getPlan(id), getUniverse()]);
      setPlan(planData);
      setUniverse(universeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load the plan.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Runtime data fetch on mount — portal pages are client-rendered (static export).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const changeStatus = async (status: 'submitted' | 'approved') => {
    if (!plan) return;
    setActionBusy(true);
    try {
      await updatePlan(plan.id, { status });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status update failed.');
    } finally {
      setActionBusy(false);
    }
  };

  const onAddItem = async () => {
    if (!plan || !itemUniverseId) return;
    setServerError(null);
    setActionBusy(true);
    try {
      await addPlanItem(plan.id, { universe_id: itemUniverseId, quarter: itemQuarter, priority: itemPriority });
      setModalOpen(false);
      setItemUniverseId('');
      await load();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Could not add the item.');
    } finally {
      setActionBusy(false);
    }
  };

  const onItemStatus = async (itemId: string, status: PlanItemStatus) => {
    try {
      await updatePlanItem(itemId, { status });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update the item.');
    }
  };

  if (loading) return <PageLoading rows={4} />;
  if (error) return <PageError message={error} onRetry={load} />;
  if (!plan) return null;

  const selectClasses =
    'h-9 px-3 rounded-md border border-border bg-surface-card text-sm text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';

  return (
    <div className="space-y-6">
      <button onClick={() => router.push('/portal/plans')} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        All plans
      </button>

      {/* Header card */}
      <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-accent uppercase tracking-wider">{plan.year}</p>
          <h2 className="text-2xl font-display font-bold text-primary-dark mt-1">{plan.title}</h2>
          <p className="text-sm text-text-muted mt-1">
            Created {formatDateShort(plan.created_at)} · {plan.items.length} {plan.items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <PlanStatusBadge status={plan.status} />
          {canWrite && plan.status === 'draft' && (
            <Button size="sm" variant="secondary" loading={actionBusy} onClick={() => changeStatus('submitted')}>
              <Send className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Submit for approval
            </Button>
          )}
          {canWrite && plan.status === 'submitted' && (
            <Button size="sm" loading={actionBusy} onClick={() => changeStatus('approved')}>
              <CheckCircle className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Approve plan
            </Button>
          )}
        </div>
      </div>

      {/* Items by quarter */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-base font-display font-semibold text-primary-dark">Planned audits by quarter</h3>
        {canWrite && (
          <Button size="sm" onClick={() => { setServerError(null); setModalOpen(true); }}>
            <Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />
            Add plan item
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {QUARTERS.map((q) => {
          const items = plan.items.filter((i) => i.quarter === q);
          return (
            <div key={q} className="bg-surface-card rounded-xl border border-border/60 shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display font-semibold text-primary-dark">{q}</h4>
                <span className="text-xs text-text-muted">{items.length} {items.length === 1 ? 'audit' : 'audits'}</span>
              </div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="rounded-lg border border-border/50 p-3">
                    <p className="text-sm font-medium leading-snug">{item.mda_name}</p>
                    <p className="text-xs text-text-muted">{item.unit_name}</p>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <PriorityBadge priority={item.priority} />
                      <span className="text-[11px] text-text-muted">risk {item.risk_score}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      {canWrite ? (
                        <select
                          value={item.status}
                          onChange={(e) => onItemStatus(item.id, e.target.value as PlanItemStatus)}
                          aria-label={`Status for ${item.mda_name} ${item.unit_name}`}
                          className="h-8 px-2 rounded-md border border-border bg-surface-card text-xs text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          {ITEM_STATUSES.map((s) => (
                            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                          ))}
                        </select>
                      ) : (
                        <PlanItemStatusBadge status={item.status} />
                      )}
                    </div>
                  </li>
                ))}
                {items.length === 0 && (
                  <li className="text-xs text-text-muted text-center py-4">No audits scheduled.</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Add item modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add plan item">
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="item-universe" className="block text-sm font-medium text-text">
              Universe entry
            </label>
            <select
              id="item-universe"
              value={itemUniverseId}
              onChange={(e) => setItemUniverseId(e.target.value)}
              className="h-12 px-4 rounded-md border border-border bg-surface-card text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="">Select an auditable entity…</option>
              {universe.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.mda_name} — {u.unit_name} (risk {u.risk_score})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="item-quarter" className="block text-sm font-medium text-text">Quarter</label>
              <select id="item-quarter" value={itemQuarter} onChange={(e) => setItemQuarter(e.target.value as Quarter)} className={selectClasses + ' h-12'}>
                {QUARTERS.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="item-priority" className="block text-sm font-medium text-text">Priority</label>
              <select id="item-priority" value={itemPriority} onChange={(e) => setItemPriority(e.target.value as Priority)} className={selectClasses + ' h-12'}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          {serverError && (
            <p role="alert" className="text-sm text-error">{serverError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={onAddItem} loading={actionBusy} disabled={!itemUniverseId}>
              Add item
            </Button>
          </div>
        </div>
      </Modal>

      <p className="text-xs text-text-muted">
        To execute an item, create an engagement from the <Link href="/portal/engagements" className="text-primary hover:underline">Engagements</Link> page.
      </p>
    </div>
  );
}
