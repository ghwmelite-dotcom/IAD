'use client';

import { useCallback, useEffect, useState } from 'react';
import { getFindings, type Finding } from '@/lib/portal-api';
import { FindingsTable } from '@/components/portal/findings-table';
import { PageLoading, PageError, EmptyState } from '@/components/portal/page-states';

export default function FindingsPage() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setFindings(await getFindings());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load findings.');
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

  if (findings.length === 0) {
    return (
      <EmptyState
        title="No findings in scope"
        hint="Findings raised on your engagements will appear here."
      />
    );
  }

  return <FindingsTable findings={findings} />;
}
