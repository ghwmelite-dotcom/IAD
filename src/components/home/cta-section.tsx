'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  { icon: ShieldAlert, key: 'reportFraud', href: '/services/report-fraud', gradient: 'from-primary-light to-primary' },
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

      <section aria-labelledby="connect-heading" className="border-t border-home-border bg-home-canvas py-16 lg:py-24">
        <div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <div>
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-home-gold">
              <Bell className="h-4 w-4" aria-hidden="true" />
              {dict.cta.stayConnected}
            </p>
            <h2 id="connect-heading" className="mb-5 font-display text-3xl font-bold leading-tight text-home-ink lg:text-4xl">
              {dict.cta.headlineA} {dict.cta.headlineAccent}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-home-muted lg:text-lg">{dict.cta.body}</p>
            <Link href="/services/report-fraud" className="mt-7 inline-flex min-h-12 items-center gap-3 font-brand text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              {dict.cta.reportButton}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-2xl border border-home-border bg-white p-6 sm:p-9">
            <p className="mb-6 text-base font-semibold leading-relaxed text-home-ink">{dict.cta.subscribePrompt}</p>
            {state === 'success' || state === 'already' ? (
              <div role="status" className="py-3">
                <CheckCircle className="mb-4 h-9 w-9 text-primary" aria-hidden="true" />
                <h3 className="mb-3 font-display text-xl font-bold text-home-ink">{state === 'already' ? dict.cta.alreadyTitle : dict.cta.successTitle}</h3>
                <p className="text-sm leading-relaxed text-home-muted">
                  {state === 'already' ? dict.cta.alreadyBody : <>{dict.cta.successDetail} <span className="break-words font-semibold text-primary">{email}</span>. {dict.cta.successBody}.</>}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-home-muted" aria-hidden="true" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={dict.cta.emailPlaceholder}
                      required
                      autoComplete="email"
                      aria-label={dict.cta.emailPlaceholder}
                      className="min-h-14 w-full rounded-lg border border-home-border bg-home-canvas py-4 pl-12 pr-4 text-base text-home-ink placeholder:text-home-muted focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" loading={state === 'loading'} className="w-full gap-3 rounded-lg font-brand text-sm font-bold">
                    {dict.cta.subscribe}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
                {state === 'error' && (
                  <div role="alert" className="mt-4 flex flex-wrap items-center gap-2 text-sm text-error">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{dict.cta.errorBody}</span>
                    <button type="submit" className="min-h-11 font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{dict.cta.retry}</button>
                  </div>
                )}
                <p className="mt-4 text-xs leading-relaxed text-home-muted">{dict.cta.finePrint}</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
