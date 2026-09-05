'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { BadgeCheck, Info, ShieldCheck } from 'lucide-react';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import {
  fetchTransparencyByMda,
  fetchTransparencySummary,
} from '@/lib/public-api';
import type { MdaTransparency, TransparencySummary } from '@/lib/public-api';
import { SectionHeader } from '@/components/transparency/section-header';
import { StatCards } from '@/components/transparency/stat-cards';
import { CategoryBars, SeverityDonut, TrendChart } from '@/components/transparency/charts';
import { RiskHeatmap } from '@/components/transparency/risk-heatmap';
import { MdaTable } from '@/components/transparency/mda-table';
import { PublishingSoon } from '@/components/transparency/publishing-soon';

type Status = 'loading' | 'ready' | 'unavailable';

export function TransparencyDashboard() {
  const [status, setStatus] = useState<Status>('loading');
  const [summary, setSummary] = useState<TransparencySummary | null>(null);
  const [mdas, setMdas] = useState<MdaTransparency[]>([]);
  const { ref: kpisRef, isVisible: kpisVisible } = useScrollReveal();
  const { ref: chartsRef, isVisible: chartsVisible } = useScrollReveal();
  const { ref: tableRef, isVisible: tableVisible } = useScrollReveal();

  const load = useCallback(async () => {
    try {
      const [summaryData, mdaData] = await Promise.all([
        fetchTransparencySummary(),
        fetchTransparencyByMda(),
      ]);
      setSummary(summaryData);
      setMdas(mdaData);
      setStatus('ready');
    } catch {
      setStatus('unavailable');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  function handleRetry() {
    setStatus('loading');
    void load();
  }

  if (status === 'unavailable') {
    return (
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <PublishingSoon onRetry={handleRetry} />
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── KPI stat cards ── */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div
          ref={kpisRef}
          className={cn(
            'relative max-w-content mx-auto px-4 sm:px-6 lg:px-8',
            kpisVisible && 'animate-[reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
            !kpisVisible && 'opacity-0',
          )}
        >
          <SectionHeader
            pill="State of Internal Audit"
            title="The Numbers in"
            highlight="Public View"
            subtitle="Aggregate audit statistics across Ministries, Departments and Agencies — updated automatically as engagements progress."
          />
          {status === 'loading' || !summary ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-36 rounded-2xl" />
              ))}
            </div>
          ) : (
            <StatCards totals={summary.totals} />
          )}
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── Charts ── */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ backgroundColor: '#F0F7F1' }}
      >
        <FloatingShapes />
        <div
          ref={chartsRef}
          className={cn(
            'relative max-w-content mx-auto px-4 sm:px-6 lg:px-8',
            chartsVisible && 'animate-[reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
            !chartsVisible && 'opacity-0',
          )}
        >
          <SectionHeader
            pill="Findings Tracker"
            title="Where the Findings"
            highlight="Stand"
            subtitle="Only aggregates are published — never finding text, names, or other sensitive detail."
          />
          {status === 'loading' || !summary ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-80 rounded-2xl" />
              <Skeleton className="h-80 rounded-2xl" />
              <Skeleton className="h-80 rounded-2xl lg:col-span-2" />
              <Skeleton className="h-80 rounded-2xl lg:col-span-2" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SeverityDonut data={summary.bySeverity} />
              <CategoryBars data={summary.byCategory} />
              <div className="lg:col-span-2">
                <TrendChart data={summary.trend} />
              </div>
              <div className="lg:col-span-2">
                <RiskHeatmap cells={summary.riskHeat} />
              </div>
            </div>
          )}
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── By-MDA table ── */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ backgroundColor: '#FFF8F0' }}
      >
        <FloatingShapes />
        <div
          ref={tableRef}
          className={cn(
            'relative max-w-content mx-auto px-4 sm:px-6 lg:px-8',
            tableVisible && 'animate-[reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
            !tableVisible && 'opacity-0',
          )}
        >
          <SectionHeader
            pill="By Institution"
            title="Resolution by"
            highlight="MDA"
            subtitle="How each covered MDA is progressing on closing its audit findings. Click a column heading to sort."
          />
          {status === 'loading' ? (
            <Skeleton className="h-96 rounded-2xl" />
          ) : mdas.length === 0 ? (
            <p className="text-center text-text-muted">
              Per-MDA aggregates will appear once findings are recorded.
            </p>
          ) : (
            <MdaTable rows={mdas} />
          )}
        </div>
      </section>

      {/* ── About this data ── */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/[0.04] to-accent/[0.06] rounded-2xl border-2 border-primary/10 p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
                <Info className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-bold text-primary-dark">
                About this data
              </h2>
            </div>
            <div className="space-y-4 text-base text-text-muted leading-relaxed">
              <p>
                <strong className="text-primary-dark">Findings</strong> are control
                weaknesses or instances of non-compliance identified during audit
                engagements. A finding is <strong className="text-primary-dark">closed</strong>{' '}
                once management has implemented the agreed recommendation and the
                action has been verified. The{' '}
                <strong className="text-primary-dark">resolution rate</strong> is the
                share of all raised findings that have been closed or verified.
              </p>
              <p>
                Figures are drawn live from the department&apos;s audit operations
                system and refresh automatically — this page is never more than a
                few minutes behind the internal record. Only aggregate counts are
                published; finding narratives, working papers, and individual
                names are never exposed.
              </p>
              <p>
                Publishing these numbers is part of the department&apos;s
                commitment to open accountability: citizens and oversight bodies
                should be able to see not only that audits happen, but whether
                public institutions act on them.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                href="/registry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Browse the IAC Registry
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-primary/15 text-sm font-semibold text-primary hover:border-primary/40 transition-colors"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Verify a Certificate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
