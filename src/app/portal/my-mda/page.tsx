'use client';

import { useCallback, useEffect, useState } from 'react';
import { FileSearch, AlarmClock, CheckCircle } from 'lucide-react';
import { getFindings, type Finding } from '@/lib/portal-api';
import { usePortalUser } from '@/components/portal/portal-user-context';
import { FindingsTable } from '@/components/portal/findings-table';
import { StatCard } from '@/components/portal/stat-card';
import { PageLoading, PageError, EmptyState } from '@/components/portal/page-states';

export default function MyMdaPage() {
  const user = usePortalUser();
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // GET /api/portal/findings is already scoped to the liaison's MDA.
      setFindings(await getFindings());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load findings for your MDA.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Runtime data fetch on mount — portal pages are client-rendered (static export).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (loading) return <PageLoading rows={5} />;
  if (error) return <PageError message={error} onRetry={load} />;

  const open = findings.filter((f) => f.status === 'open' || f.status === 'responded' || f.status === 'in_progress');
  const awaitingResponse = findings.filter((f) => f.status === 'open');
  const closed = findings.filter((f) => f.status === 'closed' || f.status === 'verified');

  return (
    <div className="space-y-6">
      {user?.mda_id && (
        <p className="text-sm text-text-muted">
          Showing findings recorded against <span className="font-semibold text-text">{user.mda_id}</span>.
          Open a finding to submit a management response and action plan.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Awaiting response" value={awaitingResponse.length} icon={AlarmClock} tone={awaitingResponse.length > 0 ? 'warning' : 'success'} hint="Open findings without a response" />
        <StatCard label="In progress" value={open.length - awaitingResponse.length} icon={FileSearch} hint="Responded or being implemented" />
        <StatCard label="Resolved" value={closed.length} icon={CheckCircle} tone="success" hint="Closed or verified" />
      </div>

      {findings.length === 0 ? (
        <EmptyState title="No findings for your MDA" hint="When an audit raises findings against your MDA they will appear here for response." />
      ) : (
        <FindingsTable findings={findings} hideMda />
      )}
    </div>
  );
}
