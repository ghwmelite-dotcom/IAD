'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, Plus, MessageSquare } from 'lucide-react';
import {
  getFinding,
  updateFinding,
  addRecommendation,
  updateRecommendation,
  addManagementResponse,
  findingAgeDays,
  isInternalRole,
  type FindingDetail,
  type FindingStatus,
  type RecommendationStatus,
} from '@/lib/portal-api';
import { usePortalUser } from '@/components/portal/portal-user-context';
import {
  SeverityBadge,
  FindingStatusBadge,
  RecommendationStatusBadge,
} from '@/components/portal/badges';
import { Modal } from '@/components/portal/modal';
import { PageLoading, PageError } from '@/components/portal/page-states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDateShort, cn } from '@/lib/utils';

const REC_STATUSES: RecommendationStatus[] = ['open', 'in_progress', 'implemented', 'verified', 'overdue'];

/** Forward/backward transitions surfaced as one-click actions. */
const STATUS_ACTIONS: Record<FindingStatus, Array<{ to: FindingStatus; label: string }>> = {
  open: [{ to: 'in_progress', label: 'Mark in progress' }],
  responded: [{ to: 'in_progress', label: 'Mark in progress' }],
  in_progress: [{ to: 'closed', label: 'Close finding' }],
  closed: [
    { to: 'verified', label: 'Verify' },
    { to: 'open', label: 'Reopen' },
  ],
  verified: [{ to: 'open', label: 'Reopen' }],
};

const RecommendationSchema = z.object({
  text: z.string().min(1, 'Recommendation text is required').max(5000),
  owner: z.string().min(1, 'Owner is required').max(200),
  due_date: z.string().min(4, 'Due date is required'),
});

const ResponseSchema = z.object({
  respondent_name: z.string().min(1, 'Your name is required').max(200),
  response_text: z.string().min(1, 'Response is required').max(10000),
  action_plan: z.string().max(10000).optional(),
  recommendation_id: z.string().optional(),
});

type RecommendationFormValues = z.infer<typeof RecommendationSchema>;
type ResponseFormValues = z.infer<typeof ResponseSchema>;

export default function FindingDetailPage() {
  return (
    <Suspense fallback={<PageLoading rows={5} />}>
      <FindingDetailInner />
    </Suspense>
  );
}

function FindingDetailInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const user = usePortalUser();

  // Auditors cannot post management responses (backend enforces); liaisons
  // and full-access roles can.
  const internal = user ? isInternalRole(user.role) : false;
  const canRespond = user ? user.role === 'mda_liaison' || user.role === 'admin' || user.role === 'director' || user.role === 'manager' : false;

  const [finding, setFinding] = useState<FindingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // Snapshot of "now" taken on each load, for overdue highlighting.
  const [nowTs, setNowTs] = useState(0);

  const [recModalOpen, setRecModalOpen] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [responseSent, setResponseSent] = useState(false);

  const recForm = useForm<RecommendationFormValues>({ resolver: zodResolver(RecommendationSchema) });
  const responseForm = useForm<ResponseFormValues>({ resolver: zodResolver(ResponseSchema) });

  useEffect(() => {
    if (user) responseForm.setValue('respondent_name', user.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const load = useCallback(async () => {
    if (!id) {
      setError('No finding id supplied.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setFinding(await getFinding(id));
      setNowTs(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load the finding.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Runtime data fetch on mount — portal pages are client-rendered (static export).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const transition = async (status: FindingStatus) => {
    if (!finding) return;
    setBusy(true);
    try {
      await updateFinding(finding.id, { status });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status update failed.');
    } finally {
      setBusy(false);
    }
  };

  const onAddRecommendation = async (values: RecommendationFormValues) => {
    if (!finding) return;
    setRecError(null);
    try {
      await addRecommendation(finding.id, values);
      setRecModalOpen(false);
      recForm.reset({ text: '', owner: '', due_date: '' });
      await load();
    } catch (err) {
      setRecError(err instanceof Error ? err.message : 'Could not add the recommendation.');
    }
  };

  const onRecStatus = async (recId: string, status: RecommendationStatus) => {
    try {
      await updateRecommendation(recId, { status });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update the recommendation.');
    }
  };

  const onAddResponse = async (values: ResponseFormValues) => {
    if (!finding) return;
    setResponseError(null);
    setResponseSent(false);
    try {
      await addManagementResponse(finding.id, {
        respondent_name: values.respondent_name,
        response_text: values.response_text,
        ...(values.action_plan ? { action_plan: values.action_plan } : {}),
        ...(values.recommendation_id ? { recommendation_id: values.recommendation_id } : {}),
      });
      responseForm.reset({ respondent_name: user?.name ?? '', response_text: '', action_plan: '', recommendation_id: '' });
      setResponseSent(true);
      await load();
    } catch (err) {
      setResponseError(err instanceof Error ? err.message : 'Could not submit the response.');
    }
  };

  if (loading) return <PageLoading rows={5} />;
  if (error) return <PageError message={error} onRetry={load} />;
  if (!finding) return null;

  const days = findingAgeDays(finding);
  const closed = finding.status === 'closed' || finding.status === 'verified';
  const fiveC: Array<{ label: string; value: string | null }> = [
    { label: 'Condition', value: finding.condition },
    { label: 'Criteria', value: finding.criteria },
    { label: 'Cause', value: finding.cause },
    { label: 'Effect', value: finding.effect },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => router.push('/portal/findings')} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        All findings
      </button>

      {/* Header */}
      <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <SeverityBadge severity={finding.severity} />
              <FindingStatusBadge status={finding.status} />
              <span className="text-xs text-text-muted">{finding.category}</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-primary-dark mt-2 leading-snug">{finding.title}</h2>
            <p className="text-sm text-text-muted mt-2">
              {finding.mda_name} · {finding.unit_name} ·{' '}
              <Link href={`/portal/engagements/detail/?id=${finding.engagement_id}`} className="text-primary hover:underline font-mono text-xs">
                {finding.engagement_code}
              </Link>{' '}
              {finding.engagement_title}
            </p>
            <p className="text-sm text-text-muted mt-1">
              Raised {formatDateShort(finding.created_at)}
              {finding.closed_at
                ? ` · Closed ${formatDateShort(finding.closed_at)} (${days} days)`
                : ` · `}
              {!finding.closed_at && (
                <span className={cn(days > 90 ? 'text-error font-bold' : days > 30 ? 'text-warning font-semibold' : '')}>
                  {days} days open
                </span>
              )}
            </p>
          </div>
          {internal && STATUS_ACTIONS[finding.status].length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {STATUS_ACTIONS[finding.status].map((a) => (
                <Button
                  key={a.to}
                  size="sm"
                  variant={a.to === 'open' ? 'ghost' : 'primary'}
                  loading={busy}
                  onClick={() => transition(a.to)}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description + 5C */}
      <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
        <h3 className="text-base font-display font-semibold text-primary-dark mb-3">Description</h3>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{finding.description}</p>
        {fiveC.some((c) => c.value) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {fiveC.map((c) => (
              <div key={c.label} className="rounded-lg border border-border/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1.5">{c.label}</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {c.value ?? <span className="text-text-muted italic">Not documented.</span>}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-display font-semibold text-primary-dark">
            Recommendations ({finding.recommendations.length})
          </h3>
          {internal && !closed && (
            <Button size="sm" variant="secondary" onClick={() => { setRecError(null); setRecModalOpen(true); }}>
              <Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Add recommendation
            </Button>
          )}
        </div>
        {finding.recommendations.length === 0 ? (
          <p className="text-sm text-text-muted">No recommendations recorded yet.</p>
        ) : (
          <ul className="space-y-3">
            {finding.recommendations.map((r) => {
              const overdue = r.status !== 'verified' && r.status !== 'implemented' && new Date(r.due_date).getTime() < nowTs;
              return (
                <li key={r.id} className="rounded-lg border border-border/50 p-4">
                  <p className="text-sm leading-relaxed">{r.text}</p>
                  <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
                    <p className="text-xs text-text-muted">
                      Owner: <span className="font-medium text-text">{r.owner}</span> · due{' '}
                      <span className={cn('font-medium', overdue && r.status !== 'overdue' ? 'text-error' : 'text-text')}>
                        {formatDateShort(r.due_date)}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      {internal ? (
                        <select
                          value={r.status}
                          onChange={(e) => onRecStatus(r.id, e.target.value as RecommendationStatus)}
                          aria-label="Recommendation status"
                          className="h-8 px-2 rounded-md border border-border bg-surface-card text-xs text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          {REC_STATUSES.map((s) => (
                            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                          ))}
                        </select>
                      ) : (
                        <RecommendationStatusBadge status={r.status} />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Management responses */}
      <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
        <h3 className="text-base font-display font-semibold text-primary-dark mb-4">
          Management responses ({finding.responses.length})
        </h3>
        {finding.responses.length === 0 ? (
          <p className="text-sm text-text-muted mb-6">No management responses yet.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {finding.responses.map((r) => (
              <li key={r.id} className="rounded-lg border border-border/50 p-4">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <p className="text-sm font-semibold text-primary-dark">{r.respondent_name}</p>
                  <p className="text-xs text-text-muted">
                    {r.mda_name} · {formatDateShort(r.submitted_at)}
                  </p>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{r.response_text}</p>
                {r.action_plan && (
                  <div className="mt-3 rounded-md bg-primary/[0.04] border border-primary/10 p-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Action plan</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{r.action_plan}</p>
                  </div>
                )}
                {r.evidence_r2_key && (
                  <p className="text-xs text-text-muted mt-2 font-mono">Evidence: {r.evidence_r2_key}</p>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Add response (liaison + full access) */}
        {canRespond && !closed && (
          <form onSubmit={responseForm.handleSubmit(onAddResponse)} noValidate className="border-t border-border/50 pt-5 space-y-4">
            <p className="text-sm font-semibold text-primary-dark inline-flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Submit a management response
            </p>
            <Input
              label="Respondent name"
              error={responseForm.formState.errors.respondent_name?.message}
              {...responseForm.register('respondent_name')}
            />
            {finding.recommendations.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="response-rec" className="block text-sm font-medium text-text">
                  Related recommendation (optional)
                </label>
                <select
                  id="response-rec"
                  className="h-12 px-4 rounded-md border border-border bg-surface-card text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  {...responseForm.register('recommendation_id')}
                >
                  <option value="">Whole finding</option>
                  {finding.recommendations.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.text.length > 80 ? r.text.slice(0, 80) + '…' : r.text}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <Textarea
              label="Response"
              error={responseForm.formState.errors.response_text?.message}
              {...responseForm.register('response_text')}
            />
            <Textarea
              label="Action plan (optional)"
              error={responseForm.formState.errors.action_plan?.message}
              {...responseForm.register('action_plan')}
            />
            {responseError && (
              <p role="alert" className="text-sm text-error">{responseError}</p>
            )}
            {responseSent && (
              <p role="status" className="text-sm text-success">Response submitted.</p>
            )}
            <div className="flex justify-end">
              <Button type="submit" loading={responseForm.formState.isSubmitting}>
                Submit response
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Add recommendation modal */}
      <Modal open={recModalOpen} onClose={() => setRecModalOpen(false)} title="Add recommendation">
        <form onSubmit={recForm.handleSubmit(onAddRecommendation)} noValidate className="space-y-4">
          <Textarea label="Recommendation" error={recForm.formState.errors.text?.message} {...recForm.register('text')} />
          <Input
            label="Owner"
            placeholder="e.g. Chief Director, Ministry of Health"
            error={recForm.formState.errors.owner?.message}
            {...recForm.register('owner')}
          />
          <Input label="Due date" type="date" error={recForm.formState.errors.due_date?.message} {...recForm.register('due_date')} />
          {recError && (
            <p role="alert" className="text-sm text-error">{recError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setRecModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={recForm.formState.isSubmitting}>Add recommendation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
