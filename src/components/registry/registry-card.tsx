'use client';

import Link from 'next/link';
import { BadgeCheck, Landmark, ArrowUpRight } from 'lucide-react';
import type { RegistryEntry } from '@/lib/public-api';

interface RegistryCardProps {
  entry: RegistryEntry;
}

export function RegistryCard({ entry }: RegistryCardProps) {
  return (
    <Link
      href={`/registry/profile?s=${encodeURIComponent(entry.public_slug)}`}
      className="group flex flex-col bg-white rounded-2xl border-2 border-border/40 p-6 hover:border-primary/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-sm shrink-0">
          <span className="text-lg font-bold text-white" aria-hidden="true">
            {entry.name.charAt(0)}
          </span>
        </div>
        {entry.verified && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-[11px] font-bold">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Verified
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-bold text-primary-dark leading-snug mb-1 group-hover:text-primary transition-colors">
        {entry.name}
      </h3>

      {entry.grade && (
        <p className="text-sm font-semibold text-accent mb-1">{entry.grade}</p>
      )}

      {entry.mda_name && (
        <p className="flex items-center gap-1.5 text-sm text-text-muted mb-4">
          <Landmark className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{entry.mda_name}</span>
        </p>
      )}

      {entry.credentials && entry.credentials.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {entry.credentials.map((cred) => (
            <span
              key={cred.body}
              className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-[11px] font-bold text-primary"
            >
              {cred.body}
            </span>
          ))}
        </div>
      )}

      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary pt-3 border-t border-border/30">
        View profile
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
