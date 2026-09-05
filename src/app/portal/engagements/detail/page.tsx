'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, Upload, UserPlus, Plus, ArrowRight, FileText } from 'lucide-react';
import {
  getEngagement,
  updateEngagement,
  addTeamMember,
  uploadWorkingPaper,
  getFindings,
  createFinding,
  hasFullAccess,
  isInternalRole,
  type EngagementDetail,
  type EngagementPhase,
  type Finding,
} from '@/lib/portal-api';
import { usePortalUser } from '@/components/portal/portal-user-context';
import { PhaseStepper, PHASE_ORDER } from '@/components/portal/phase-stepper';
import { PhaseBadge, SeverityBadge, FindingStatusBadge } from '@/components/portal/badges';
import { Modal } from '@/components/portal/modal';
import { PageLoading, PageError } from '@/components/portal/page-states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDateShort } from '@/lib/utils';

const NEXT_PHASE_LABEL: Partial<Record<EngagementPhase, string>> = {
  planning: 'Start fieldwork',
  fieldwork: 'Move to reporting',
  reporting: 'Move to follow-up',
  follow_up: 'Close engagement',
};

const FindingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  description: z.string().min(1, 'Description is required').max(10000),
  category: z.string().min(1, 'Category is required').max(120),
  severity: z.enum(['high', 'medium', 'low']),
});

type FindingFormValues = z.infer<typeof FindingSchema>;

const MAX_PAPER_BYTES = 10 * 1024 * 1024;
const PAPER_ACCEPT = '.pdf,image/jpeg,image/png';

export default function EngagementDetailPage() {
  return (
    <Suspense fallback={<PageLoading rows={5} />}>
      <EngagementDetailInner />
    </Suspense>
  );
}

function EngagementDetailInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const user = usePortalUser();
  const canWrite = user ? hasFullAccess(user.role) : false;
  const internal = user ? isInternalRole(user.role) : false;

  const [engagement, setEngagement] = useState<EngagementDetail | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Team modal
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamUserId, setTeamUserId] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamError, setTeamError] = useState<string | null>(null);

  // Paper upload
  const [paperTitle, setPaperTitle] = useState('');
  const [paperError, setPaperError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Finding modal
  const [findingModalOpen, setFindingModalOpen] = useState(false);
  const [findingError, setFindingError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FindingFormValues>({
    resolver: zodResolver(FindingSchema),
    defaultValues: { severity: 'medium' },
  });

  const load = useCallback(async () => {
    if (!id) {
      setError('No engagement id supplied.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [eng, allFindings] = await Promise.all([getEngagement(id), getFindings()]);
      setEngagement(eng);
      setFindings(allFindings.filter((f) => f.engagement_id === id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load the engagement.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Runtime data fetch on mount — portal pages are client-rendered (static export).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const advancePhase = async () => {
    if (!engagement) return;
    const idx = PHASE_ORDER.indexOf(engagement.phase);
    const next = PHASE_ORDER[idx + 1];
    if (!next) return;
    setBusy(true);
    try {
      await updateEngagement(engagement.id, { phase: next });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Phase update failed.');
    } finally {
      setBusy(false);
    }
  };

  const onAddMember = async () => {
    if (!engagement || !teamUserId.trim() || !teamRole.trim()) return;
    setTeamError(null);
    setBusy(true);
    try {
      await addTeamMember(engagement.id, { user_id: teamUserId.trim(), team_role: teamRole.trim() });
      setTeamModalOpen(false);
      setTeamUserId('');
      setTeamRole('');
      await load();
    } catch (err) {
      setTeamError(err instanceof Error ? err.message : 'Could not add the team member.');
    } finally {
      setBusy(false);
    }
  };

  const onUploadPaper = async () => {
    if (!engagement) return;
    const file = fileRef.current?.files?.[0];
    setPaperError(null);
    if (!paperTitle.trim()) {
      setPaperError('Give the working paper a title.');
      return;
    }
    if (!file) {
      setPaperError('Choose a file to upload.');
      return;
    }
    if (file.size > MAX_PAPER_BYTES) {
      setPaperError('File exceeds the 10 MB limit.');
      return;
    }
    setUploading(true);
    try {
      await uploadWorkingPaper(engagement.id, paperTitle.trim(), file);
      setPaperTitle('');
      if (fileRef.current) fileRef.current.value = '';
      await load();
    } catch (err) {
      setPaperError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const onCreateFinding = async (values: FindingFormValues) => {
    if (!engagement) return;
    setFindingError(null);
    try {
      await createFinding({ engagement_id: engagement.id, ...values });
      setFindingModalOpen(false);
      reset({ title: '', description: '', category: '', severity: 'medium' });
      await load();
    } catch (err) {
      setFindingError(err instanceof Error ? err.message : 'Could not create the finding.');
    }
  };

  if (loading) return <PageLoading rows={5} />;
  if (error) return <PageError message={error} onRetry={load} />;
  if (!engagement) return null;

  return (
    <div className="space-y-6">
      <button onClick={() => router.push('/portal/engagements')} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        All engagements
      </button>

      {/* Header */}
      <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent font-bold">{engagement.code}</p>
            <h2 className="text-2xl font-display font-bold text-primary-dark mt-1">{engagement.title}</h2>
            <p className="text-sm text-text-muted mt-1">
              {engagement.mda_name} · {engagement.unit_name}
            </p>
            <p className="text-sm text-text-muted mt-1">
              Lead: {engagement.lead_auditor_name ?? 'Unassigned'} · Started {formatDateShort(engagement.start_date)}
              {engagement.end_date && ` · Ended ${formatDateShort(engagement.end_date)}`}
            </p>
            {engagement.overall_rating && (
              <p className="text-sm mt-1">
                <span className="font-semibold text-primary-dark">Overall rating:</span> {engagement.overall_rating}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <PhaseBadge phase={engagement.phase} />
            {canWrite && NEXT_PHASE_LABEL[engagement.phase] && (
              <Button size="sm" onClick={advancePhase} loading={busy}>
                {NEXT_PHASE_LABEL[engagement.phase]}
                <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
        <div className="mt-6 max-w-2xl">
          <PhaseStepper phase={engagement.phase} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Team */}
        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-display font-semibold text-primary-dark">Team</h3>
            {canWrite && (
              <Button size="sm" variant="secondary" onClick={() => { setTeamError(null); setTeamModalOpen(true); }}>
                <UserPlus className="h-4 w-4 mr-1.5" aria-hidden="true" />
                Add member
              </Button>
            )}
          </div>
          {engagement.team.length === 0 ? (
            <p className="text-sm text-text-muted">No team members assigned yet.</p>
          ) : (
            <ul className="space-y-2">
              {engagement.team.map((m) => (
                <li key={m.user_id} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{m.name}</p>
                    <p className="text-xs text-text-muted truncate">
                      {m.team_role} · {m.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Working papers */}
        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
          <h3 className="text-base font-display font-semibold text-primary-dark mb-4">Working papers</h3>
          {engagement.papers.length === 0 ? (
            <p className="text-sm text-text-muted mb-4">No working papers uploaded yet.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {engagement.papers.map((p) => (
                <li key={p.id} className="flex items-center gap-3 text-sm">
                  <FileText className="h-4 w-4 text-text-muted shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{p.title}</p>
                    <p className="text-xs text-text-muted">{formatDateShort(p.created_at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {internal && engagement.phase !== 'closed' && (
            <div className="border-t border-border/50 pt-4 space-y-3">
              <Input
                label="Paper title"
                value={paperTitle}
                onChange={(e) => setPaperTitle(e.target.value)}
                placeholder="e.g. Invoice sampling worksheet"
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="paper-file" className="block text-sm font-medium text-text">
                  File (PDF, JPG or PNG — max 10 MB)
                </label>
                <input
                  id="paper-file"
                  ref={fileRef}
                  type="file"
                  accept={PAPER_ACCEPT}
                  className="text-sm text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-light file:cursor-pointer"
                />
              </div>
              {paperError && (
                <p role="alert" className="text-sm text-error">{paperError}</p>
              )}
              <Button size="sm" variant="secondary" onClick={onUploadPaper} loading={uploading}>
                <Upload className="h-4 w-4 mr-1.5" aria-hidden="true" />
                Upload paper
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Linked findings */}
      <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-display font-semibold text-primary-dark">
            Findings ({findings.length})
          </h3>
          {internal && (
            <Button size="sm" onClick={() => { setFindingError(null); setFindingModalOpen(true); }}>
              <Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Raise finding
            </Button>
          )}
        </div>
        {findings.length === 0 ? (
          <p className="text-sm text-text-muted">No findings raised on this engagement yet.</p>
        ) : (
          <ul className="divide-y divide-border/40">
            {findings.map((f) => (
              <li key={f.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Link href={`/portal/findings/detail/?id=${f.id}`} className="font-medium text-primary hover:underline line-clamp-1">
                    {f.title}
                  </Link>
                  <p className="text-xs text-text-muted mt-0.5">{f.category} · raised {formatDateShort(f.created_at)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <SeverityBadge severity={f.severity} />
                  <FindingStatusBadge status={f.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add member modal */}
      <Modal open={teamModalOpen} onClose={() => setTeamModalOpen(false)} title="Add team member">
        <div className="space-y-4">
          <Input
            label="User ID"
            value={teamUserId}
            onChange={(e) => setTeamUserId(e.target.value)}
            placeholder="Paste the portal user's ID"
          />
          <Input
            label="Team role"
            value={teamRole}
            onChange={(e) => setTeamRole(e.target.value)}
            placeholder="e.g. Field Auditor, Reviewer"
          />
          {teamError && (
            <p role="alert" className="text-sm text-error">{teamError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setTeamModalOpen(false)}>Cancel</Button>
            <Button onClick={onAddMember} loading={busy} disabled={!teamUserId.trim() || !teamRole.trim()}>
              Add member
            </Button>
          </div>
        </div>
      </Modal>

      {/* Raise finding modal */}
      <Modal open={findingModalOpen} onClose={() => setFindingModalOpen(false)} title="Raise finding" wide>
        <form onSubmit={handleSubmit(onCreateFinding)} noValidate className="space-y-4">
          <Input label="Finding title" error={errors.title?.message} {...register('title')} />
          <Textarea label="Description" error={errors.description?.message} {...register('description')} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Category" placeholder="e.g. Internal control" error={errors.category?.message} {...register('category')} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="finding-severity" className="block text-sm font-medium text-text">Severity</label>
              <select
                id="finding-severity"
                className="h-12 px-4 rounded-md border border-border bg-surface-card text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                {...register('severity')}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          {findingError && (
            <p role="alert" className="text-sm text-error">{findingError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setFindingModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={isSubmitting}>Raise finding</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
