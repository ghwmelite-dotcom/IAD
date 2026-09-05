'use client';

import {
  ClipboardList,
  FolderOpen,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TransparencyTotals } from '@/lib/public-api';

interface StatCardsProps {
  totals: TransparencyTotals;
}

export function StatCards({ totals }: StatCardsProps) {
  const stats = [
    { icon: ClipboardList, value: totals.findings, label: 'Findings Raised', gradient: 'from-blue-500 to-indigo-600', tint: 'bg-blue-50/60' },
    { icon: FolderOpen, value: totals.open, label: 'Open Findings', gradient: 'from-amber-500 to-orange-600', tint: 'bg-amber-50/60' },
    { icon: CheckCircle2, value: totals.closed, label: 'Findings Closed', gradient: 'from-green-500 to-emerald-600', tint: 'bg-green-50/60' },
    { icon: TrendingUp, value: `${totals.resolutionRate}%`, label: 'Resolution Rate', gradient: 'from-purple-500 to-violet-600', tint: 'bg-purple-50/60' },
    { icon: Landmark, value: totals.mdasCovered, label: 'MDAs Covered', gradient: 'from-teal-500 to-cyan-600', tint: 'bg-teal-50/60' },
    { icon: Briefcase, value: totals.engagements, label: 'Audit Engagements', gradient: 'from-rose-500 to-pink-600', tint: 'bg-rose-50/60' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        return (
          <div
            key={stat.label}
            className={cn(
              'group rounded-2xl border-2 border-border/40 p-5 text-center',
              'hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300',
              stat.tint,
            )}
          >
            <div
              className={cn(
                'w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center mx-auto mb-3 shadow-sm',
                'group-hover:scale-105 transition-transform duration-300',
                stat.gradient,
              )}
            >
              <stat.icon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <p className="font-display text-2xl lg:text-3xl font-bold text-primary-dark leading-none mb-1.5">
              {stat.value}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted/70">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
