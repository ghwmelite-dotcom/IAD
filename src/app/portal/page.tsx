'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileSearch,
  AlarmClock,
  Gauge,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  getDashboard,
  getFindings,
  buildMonthlyTrend,
  type DashboardData,
  type Finding,
} from '@/lib/portal-api';
import { StatCard } from '@/components/portal/stat-card';
import { PageLoading, PageError, EmptyState } from '@/components/portal/page-states';
import { formatDateShort } from '@/lib/utils';

const SEVERITY_COLORS: Record<string, string> = {
  high: '#C62828',
  medium: '#E65100',
  low: '#1565C0',
};

const STATUS_COLORS: Record<string, string> = {
  open: '#C62828',
  responded: '#1565C0',
  in_progress: '#E65100',
  closed: '#2E7D32',
  verified: '#1B5E20',
};

export default function PortalDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dash, findingRows] = await Promise.all([getDashboard(), getFindings()]);
      setDashboard(dash);
      setFindings(findingRows);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard.');
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
  if (!dashboard) return null;

  const { kpis } = dashboard;
  const trend = buildMonthlyTrend(findings);
  const severityData = dashboard.bySeverity.map((s) => ({ name: s.severity, value: s.count }));
  const statusData = dashboard.byStatus.map((s) => ({
    name: s.status.replace(/_/g, ' '),
    count: s.count,
    status: s.status,
  }));

  return (
    <div className="space-y-8">
      {/* ── KPI cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Open findings"
          value={kpis.open}
          icon={FileSearch}
          hint={`${kpis.findings} total findings`}
          tone={kpis.open > 0 ? 'warning' : 'success'}
        />
        <StatCard
          label="Overdue recommendations"
          value={kpis.overdueRecommendations}
          icon={AlarmClock}
          hint="Past due date, not yet implemented"
          tone={kpis.overdueRecommendations > 0 ? 'error' : 'success'}
        />
        <StatCard
          label="Resolution rate"
          value={`${kpis.resolutionRate}%`}
          icon={Gauge}
          hint={`${kpis.closed} closed or verified`}
          tone="success"
        />
        <StatCard
          label="Active engagements"
          value={kpis.activeEngagements}
          icon={Briefcase}
          hint={`${kpis.engagements} total engagements`}
        />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
          <h2 className="text-base font-display font-semibold text-primary-dark mb-4">Findings by severity</h2>
          {severityData.length === 0 ? (
            <p className="text-sm text-text-muted py-12 text-center">No findings recorded yet.</p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    label={({ name, value }) => `${name} (${value})`}
                  >
                    {severityData.map((entry) => (
                      <Cell key={entry.name} fill={SEVERITY_COLORS[entry.name] ?? '#5C5549'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6 xl:col-span-2">
          <h2 className="text-base font-display font-semibold text-primary-dark mb-4">
            Raised vs closed — last 12 months
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 5, right: 10, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#5C5549" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="#5C5549" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="raised" stroke="#C62828" strokeWidth={2} dot={{ r: 2 }} name="Raised" />
                <Line type="monotone" dataKey="closed" stroke="#1B5E20" strokeWidth={2} dot={{ r: 2 }} name="Closed" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6 xl:col-span-2">
          <h2 className="text-base font-display font-semibold text-primary-dark mb-4">Findings by status</h2>
          {statusData.length === 0 ? (
            <p className="text-sm text-text-muted py-12 text-center">No findings recorded yet.</p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} margin={{ top: 5, right: 10, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#5C5549" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="#5C5549" />
                  <Tooltip />
                  <Bar dataKey="count" name="Findings" radius={[6, 6, 0, 0]}>
                    {statusData.map((entry) => (
                      <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? '#5C5549'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* ── Recent activity ── */}
        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-6">
          <h2 className="text-base font-display font-semibold text-primary-dark mb-4">Recent activity</h2>
          {dashboard.recentActivity.length === 0 ? (
            <p className="text-sm text-text-muted py-6 text-center">No recent activity.</p>
          ) : (
            <ul className="space-y-3">
              {dashboard.recentActivity.map((a) => (
                <li key={a.id} className="flex items-start gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-text leading-snug">
                      <span className="font-semibold capitalize">{a.action}</span>{' '}
                      {a.entity.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-text-muted">{formatDateShort(a.created_at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Quick links ── */}
      {findings.length === 0 && dashboard.recentActivity.length === 0 && (
        <EmptyState
          title="No audit data yet"
          hint="Create universe entries, plan engagements, and raise findings to populate this dashboard."
        />
      )}
      <div className="flex flex-wrap gap-3">
        <Link href="/portal/findings" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          Open findings tracker <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/portal/engagements" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          View engagements <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
