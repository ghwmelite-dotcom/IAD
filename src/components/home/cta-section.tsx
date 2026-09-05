'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bell,
  Mail,
  CheckCircle,
  ShieldAlert,
  Search,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '@/components/layout/language-context';
import type { Dictionary } from '@/lib/i18n';

const QUICK_ACTIONS: {
  icon: typeof ShieldAlert;
  key: keyof Dictionary['cta']['quickActions'];
  href: string;
  gradient: string;
}[] = [
  { icon: ShieldAlert, key: 'reportFraud', href: '/services/report-fraud', gradient: 'from-green-500 to-emerald-600' },
  { icon: Search, key: 'track', href: '/track', gradient: 'from-amber-500 to-yellow-600' },
  { icon: BookOpen, key: 'publications', href: '/publications', gradient: 'from-blue-500 to-indigo-600' },
];

type SubscribeState = 'idle' | 'loading' | 'success' | 'already' | 'error';

export function CtaSection() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubscribeState>('idle');
  const { dict } = useLanguage();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const res = await fetch('/api/v1/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`subscribe failed: ${res.status}`);
      const body = (await res.json()) as { data?: { subscribed?: boolean; already?: boolean } };
      setState(body?.data?.already ? 'already' : 'success');
    } catch {
      setState('error');
    }
  };

  return (
    <>
      {/* ── Quick Actions Row ── */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border-2 border-border/40 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-sm`}>
                  <action.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <span className="font-semibold text-base text-primary-dark group-hover:text-primary transition-colors">{dict.cta.quickActions[action.key]}</span>
                <ArrowRight className="h-4 w-4 text-text-muted/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative py-20 lg:py-24 bg-primary-dark overflow-hidden">
        {/* Animated Kente threads */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[25%] left-0 right-0 h-px opacity-[0.1]" style={{ background: 'linear-gradient(90deg, transparent, #D4A017 30%, #D4A017 70%, transparent)', animation: 'kente-thread-h 8s ease-in-out infinite' }} />
          <div className="absolute top-[65%] left-0 right-0 h-px opacity-[0.07]" style={{ background: 'linear-gradient(90deg, transparent, #E8C547 20%, #E8C547 80%, transparent)', animation: 'kente-thread-h 12s ease-in-out 3s infinite reverse' }} />
          <div className="absolute left-[20%] top-0 bottom-0 w-px opacity-[0.06]" style={{ background: 'linear-gradient(0deg, transparent, #2E7D32 30%, #2E7D32 70%, transparent)', animation: 'kente-thread-v 10s ease-in-out 1s infinite' }} />
          <div className="absolute left-[75%] top-0 bottom-0 w-px opacity-[0.08]" style={{ background: 'linear-gradient(0deg, transparent, #2E7D32 40%, #2E7D32 60%, transparent)', animation: 'kente-thread-v 8s ease-in-out infinite' }} />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: [
              'repeating-linear-gradient(0deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 48px)',
              'repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 48px)',
            ].join(', '),
          }}
        />

        {/* Gold corner accents */}
        <div aria-hidden="true" className="absolute top-6 left-6 opacity-30" style={{ animation: 'corner-glow 3s ease-in-out infinite' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M2 30V4a2 2 0 012-2h26" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" /><circle cx="4" cy="4" r="1.5" fill="#D4A017" /></svg>
        </div>
        <div aria-hidden="true" className="absolute top-6 right-6 opacity-30" style={{ animation: 'corner-glow 3s ease-in-out 0.75s infinite' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M30 30V4a2 2 0 00-2-2H2" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" /><circle cx="28" cy="4" r="1.5" fill="#D4A017" /></svg>
        </div>
        <div aria-hidden="true" className="absolute bottom-6 left-6 opacity-30" style={{ animation: 'corner-glow 3s ease-in-out 1.5s infinite' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M2 2V28a2 2 0 002 2h26" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" /><circle cx="4" cy="28" r="1.5" fill="#D4A017" /></svg>
        </div>
        <div aria-hidden="true" className="absolute bottom-6 right-6 opacity-30" style={{ animation: 'corner-glow 3s ease-in-out 2.25s infinite' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M30 2V28a2 2 0 01-2 2H2" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" /><circle cx="28" cy="28" r="1.5" fill="#D4A017" /></svg>
        </div>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
            <Bell className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="text-sm font-semibold text-accent tracking-wide">{dict.cta.stayConnected}</span>
          </div>

          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-5">
            {dict.cta.headlineA}{' '}
            <span className="relative inline-block">
              {dict.cta.headlineAccent}
              <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/30 rounded-sm -z-10" />
            </span>
          </h2>
          <p className="text-lg text-white/55 leading-relaxed mb-10 max-w-lg mx-auto">
            {dict.cta.body}
          </p>

          <div className="mb-12">
            <Link
              href="/services/report-fraud"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold text-base rounded-xl hover:bg-accent-light hover:shadow-lg transition-all duration-200"
            >
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              {dict.cta.reportButton}
            </Link>
          </div>

          <p className="text-sm font-semibold text-white/70 mb-4">{dict.cta.subscribePrompt}</p>
          {state === 'success' || state === 'already' ? (
            <div className="bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-2xl p-8 max-w-md mx-auto">
              <CheckCircle className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {state === 'already' ? dict.cta.alreadyTitle : dict.cta.successTitle}
              </h3>
              <p className="text-base text-white/60">
                {state === 'already' ? (
                  dict.cta.alreadyBody
                ) : (
                  <>
                    {dict.cta.successDetail}{' '}
                    <span className="font-semibold text-accent">{email}</span>. {dict.cta.successBody}.
                  </>
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.cta.emailPlaceholder}
                    required
                    aria-label={dict.cta.emailPlaceholder}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.08] border-2 border-white/15 text-white text-base placeholder:text-white/30 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
                <Button type="submit" variant="accent" size="lg" loading={state === 'loading'} className="shrink-0">
                  {dict.cta.subscribe}
                </Button>
              </div>
              {state === 'error' && (
                <div
                  role="alert"
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{dict.cta.errorBody}</span>
                  <button
                    type="submit"
                    className="font-semibold text-accent underline underline-offset-2 hover:text-accent-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    {dict.cta.retry}
                  </button>
                </div>
              )}
              <p className="text-xs text-white/30 mt-3">{dict.cta.finePrint}</p>
            </form>
          )}

        </div>
      </section>
    </>
  );
}
