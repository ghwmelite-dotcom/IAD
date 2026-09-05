import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck2,
  SearchCheck,
  ClipboardCheck,
  Stamp,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoldParticles } from '@/components/home/hero-particles';

const REVEAL = 'hero-reveal 0.8s cubic-bezier(0.16,1,0.3,1) forwards';

/**
 * IAD hero — bespoke "assurance desk" composition, no photo carousel.
 * Left: mandate copy + CTAs. Right: layered floating audit artifacts
 * (report card, risk gauge, findings chart) built in pure CSS/SVG.
 */
export function Hero() {
  return (
    <section
      aria-label="Hero"
      role="region"
      className="relative w-full min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 75% 20%, rgba(46,125,50,0.55) 0%, transparent 55%), linear-gradient(160deg, #0D3B13 0%, #123f18 45%, #0a2f0f 100%)',
      }}
    >
      {/* Kente mesh overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: [
            'repeating-linear-gradient(0deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 40px)',
            'repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 40px)',
            'repeating-linear-gradient(0deg, #1B5E20 0px, #1B5E20 1px, transparent 1px, transparent 80px)',
            'repeating-linear-gradient(90deg, #B71C1C 0px, #B71C1C 1px, transparent 1px, transparent 80px)',
          ].join(', '),
        }}
      />

      {/* Kente frame bands — top & bottom */}
      {(['top-0', 'bottom-0'] as const).map((pos, i) => (
        <div key={pos} aria-hidden="true" className={`absolute ${pos} left-0 right-0 z-20`} style={{ height: 10 }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                i === 0
                  ? 'repeating-linear-gradient(90deg, #1B5E20 0px, #1B5E20 80px, #D4A017 80px, #D4A017 160px, #B71C1C 160px, #B71C1C 240px, #212121 240px, #212121 320px)'
                  : 'repeating-linear-gradient(90deg, #212121 0px, #212121 80px, #B71C1C 80px, #B71C1C 160px, #D4A017 160px, #D4A017 240px, #1B5E20 240px, #1B5E20 320px)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.25) 55%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: `kente-shimmer 4s ease-in-out ${i * 2}s infinite`,
            }}
          />
        </div>
      ))}

      {/* Gold corner brackets */}
      {[
        { cls: 'top-[10px] left-0', d: 'M2 58V6a4 4 0 014-4h52', d2: 'M2 40V10a4 4 0 014-4h34', cx: 6, cy: 6, delay: '0s' },
        { cls: 'top-[10px] right-0', d: 'M58 58V6a4 4 0 00-4-4H2', d2: 'M58 40V10a4 4 0 00-4-4H20', cx: 54, cy: 6, delay: '0.75s' },
        { cls: 'bottom-[10px] left-0', d: 'M2 2V54a4 4 0 004 4h52', d2: 'M2 20V50a4 4 0 004 4h34', cx: 6, cy: 54, delay: '1.5s' },
        { cls: 'bottom-[10px] right-0', d: 'M58 2V54a4 4 0 01-4 4H2', d2: 'M58 20V50a4 4 0 01-4 4H20', cx: 54, cy: 54, delay: '2.25s' },
      ].map((b) => (
        <div key={b.cls} aria-hidden="true" className={`absolute ${b.cls} z-20`} style={{ animation: `corner-glow 3s ease-in-out ${b.delay} infinite` }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d={b.d} stroke="#D4A017" strokeWidth="2.5" strokeLinecap="round" />
            <path d={b.d2} stroke="#D4A017" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <circle cx={b.cx} cy={b.cy} r="2" fill="#D4A017" opacity="0.8" />
          </svg>
        </div>
      ))}

      <GoldParticles className="z-[4]" />

      {/* Content grid */}
      <div className="relative z-10 max-w-content mx-auto px-6 sm:px-10 lg:px-16 pt-14 sm:pt-16 lg:pt-20 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-8 items-center">
        {/* ── Left: mandate ── */}
        <div>
          <div className="flex items-center gap-3.5 opacity-0" style={{ animation: REVEAL }}>
            <span className="w-9 h-0.5 bg-accent" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[3.5px] text-accent font-semibold">
              Republic of Ghana — Office of the Head of Civil Service
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] mt-6 opacity-0"
            style={{ animation: REVEAL, animationDelay: '0.1s' }}
          >
            Independent{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">Assurance.</span>
              <span aria-hidden="true" className="absolute bottom-1 left-0 right-0 h-3 bg-accent/25 rounded-sm" />
            </span>
            <br />
            Accountable Governance.
          </h1>

          <p
            className="text-white/70 text-lg leading-relaxed mt-6 max-w-xl opacity-0"
            style={{ animation: REVEAL, animationDelay: '0.2s' }}
          >
            The Internal Audit Department is the headquarters of internal audit in the
            Ghana Civil Service — safeguarding public resources, strengthening controls,
            and coordinating the Internal Audit Units of every Ministry, Department
            and Agency.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 mt-9 opacity-0"
            style={{ animation: REVEAL, animationDelay: '0.3s' }}
          >
            <Link
              href="/services/report-fraud"
              className={cn(
                'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg',
                'bg-accent text-kente-black font-semibold text-[15px]',
                'hover:bg-accent-light hover:-translate-y-0.5 hover:scale-[1.02]',
                'hover:shadow-[0_8px_24px_rgba(212,160,23,0.35)]',
                'transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
              )}
            >
              <AlertTriangle className="w-[18px] h-[18px]" aria-hidden="true" />
              Report Fraud or Waste
            </Link>
            <Link
              href="/audit-units"
              className={cn(
                'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg',
                'bg-white/5 text-white font-semibold text-[15px] border border-white/25',
                'backdrop-blur-[2px]',
                'hover:bg-white/10 hover:border-accent/50 hover:-translate-y-0.5',
                'transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
              )}
            >
              <SearchCheck className="w-[18px] h-[18px]" aria-hidden="true" />
              Explore Audit Units
            </Link>
          </div>

          {/* Trust chips */}
          <div
            className="flex flex-wrap gap-x-8 gap-y-3 mt-10 opacity-0"
            style={{ animation: REVEAL, animationDelay: '0.45s' }}
          >
            {[
              { icon: ShieldCheck, label: 'Whistleblower Act, 2006 (Act 720)' },
              { icon: Stamp, label: 'Internal Audit Class of the Civil Service' },
            ].map((chip) => (
              <div key={chip.label} className="flex items-center gap-2.5">
                <chip.icon className="w-4 h-4 text-accent/80" aria-hidden="true" />
                <span className="text-sm text-white/55 font-medium">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: assurance desk composition ── */}
        <div className="relative hidden lg:block h-[480px]" aria-hidden="true">
          {/* Audit report card */}
          <div
            className="absolute top-6 right-4 w-[340px] rounded-2xl bg-white/[0.97] shadow-[0_24px_60px_rgba(0,0,0,0.35)] p-6 opacity-0"
            style={{ animation: `${REVEAL}, float-soft 7s ease-in-out 1.2s infinite`, animationDelay: '0.35s, 0s' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-primary-dark leading-tight">Audit Report</p>
                  <p className="text-[11px] text-text-muted">FY 2026 · Q1 Review</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2.5 py-1">
                Issued
              </span>
            </div>
            {[
              'Controls tested & operating effectively',
              'Recommendations tracked to closure',
              'Management responses on file',
            ].map((line) => (
              <div key={line} className="flex items-center gap-2.5 py-2 border-t border-border/60">
                <ClipboardCheck className="w-4 h-4 text-primary shrink-0" />
                <span className="text-[12.5px] text-text">{line}</span>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
              <span className="text-[11px] text-text-muted">Assurance rating</span>
              <span className="text-[12px] font-bold text-primary">Satisfactory</span>
            </div>
          </div>

          {/* Risk gauge card */}
          <div
            className="absolute bottom-24 right-[290px] w-[190px] rounded-2xl bg-primary-dark/95 border border-accent/25 shadow-[0_16px_40px_rgba(0,0,0,0.4)] p-5 opacity-0"
            style={{ animation: `${REVEAL}, float-soft 6s ease-in-out 0.8s infinite`, animationDelay: '0.55s, 0s' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-accent mb-3">Risk Register</p>
            <div className="space-y-2.5">
              {[
                { label: 'High', w: '28%', color: '#B71C1C' },
                { label: 'Medium', w: '52%', color: '#D4A017' },
                { label: 'Low', w: '80%', color: '#2E7D32' },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-[10.5px] text-white/60 mb-1">
                    <span>{r.label}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: r.w, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Findings chart card */}
          <div
            className="absolute bottom-4 right-8 w-[230px] rounded-2xl bg-white/[0.97] shadow-[0_16px_40px_rgba(0,0,0,0.3)] p-5 opacity-0"
            style={{ animation: `${REVEAL}, float-soft 8s ease-in-out 1.6s infinite`, animationDelay: '0.75s, 0s' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="text-[12px] font-bold text-primary-dark">Findings Resolved</p>
            </div>
            <div className="flex items-end gap-2 h-16">
              {[35, 55, 45, 70, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className={cn('flex-1 rounded-t-[3px]', i === 5 ? 'bg-accent' : 'bg-primary/70')}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="text-[10.5px] text-text-muted mt-2">Resolution rate trending up</p>
          </div>

          {/* Seal emblem */}
          <div
            className="absolute top-[210px] right-[330px] opacity-0"
            style={{ animation: `${REVEAL}, float-soft 9s ease-in-out 2s infinite`, animationDelay: '0.9s, 0s' }}
          >
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #D4A017, #E8C547, #D4A017, #B8860B, #D4A017)', animation: 'coa-shimmer 6s linear infinite' }}
              />
              <div className="absolute inset-[3px] rounded-full bg-primary-dark flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-0"
        style={{ animation: REVEAL, animationDelay: '0.7s' }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[2.5px] text-white/40">Scroll</span>
        <ArrowRight className="w-4 h-4 text-accent/70 rotate-90" style={{ animation: 'float-soft 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
