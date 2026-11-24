'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Mail, CheckCircle, ShieldAlert, Search, BookOpen, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/layout/language-context';
import type { Dictionary } from '@/lib/i18n';

const QUICK_ACTIONS: {
  icon: typeof ShieldAlert;
  key: keyof Dictionary['cta']['quickActions'];
  href: string;
}[] = [
  { icon: ShieldAlert, key: 'reportFraud', href: '/services/report-fraud' },
  { icon: Search, key: 'track', href: '/track' },
  { icon: BookOpen, key: 'publications', href: '/publications' },
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
      if (!res.ok) throw new Error('Subscribe request failed: ' + res.status);
      const body = (await res.json()) as { data?: { subscribed?: boolean; already?: boolean } };
      setState(body?.data?.already ? 'already' : 'success');
    } catch {
      setState('error');
    }
  };

  return (
    <section aria-labelledby="connect-heading" className="bg-home-canvas py-16 sm:py-20 lg:py-24" data-home-section="connect">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-home-border bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="mb-6 flex items-center gap-3 font-brand text-sm font-medium text-home-gold"><ShieldAlert className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />{dict.cta.stayConnected}</p>
              <h2 id="connect-heading" className="mb-6 max-w-md font-display text-3xl font-semibold leading-tight text-home-ink sm:text-4xl">{dict.cta.headlineA} {dict.cta.headlineAccent}</h2>
              <p className="max-w-lg text-base leading-relaxed text-home-muted">{dict.cta.body}</p>
              <Link href="/services/report-fraud" className="mt-7 inline-flex min-h-12 items-center gap-4 font-brand text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{dict.cta.reportButton}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="mx-6 border-t border-home-border py-8 sm:mx-10 lg:mx-0 lg:my-12 lg:border-t-0 lg:border-l lg:px-12 lg:py-0">
              <Mail className="mb-5 h-6 w-6 text-home-gold" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mb-6 max-w-sm font-display text-xl font-semibold leading-relaxed text-home-ink">{dict.cta.subscribePrompt}</h3>
              {state === 'success' || state === 'already' ? (
                <div role="status" className="py-3">
                  <CheckCircle className="mb-4 h-9 w-9 text-primary" aria-hidden="true" />
                  <h4 className="mb-3 font-brand text-xl font-semibold text-home-ink">{state === 'already' ? dict.cta.alreadyTitle : dict.cta.successTitle}</h4>
                  <p className="text-sm leading-relaxed text-home-muted">
                    {state === 'already' ? dict.cta.alreadyBody : <>{dict.cta.successDetail} <span className="break-words font-semibold text-primary">{email}</span>. {dict.cta.successBody}.</>}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <label htmlFor="homepage-newsletter-email" className="sr-only">{dict.cta.emailPlaceholder}</label>
                  <input id="homepage-newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={dict.cta.emailPlaceholder} required autoComplete="email" className="min-h-14 w-full min-w-0 rounded-xl border border-home-border bg-home-canvas px-4 py-4 font-brand text-base text-home-ink placeholder:text-home-muted focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary" />
                  <Button type="submit" variant="primary" size="lg" loading={state === 'loading'} className="mt-3 w-full gap-4 rounded-xl font-brand text-sm font-semibold">{dict.cta.subscribe}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
                  {state === 'error' && (
                    <div role="alert" className="mt-4 flex flex-wrap items-center gap-2 text-sm text-error">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /><span>{dict.cta.errorBody}</span>
                      <button type="submit" className="min-h-11 font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{dict.cta.retry}</button>
                    </div>
                  )}
                  <p className="mt-4 text-xs leading-relaxed text-home-muted">{dict.cta.finePrint}</p>
                </form>
              )}
            </div>
          </div>
          <nav aria-label="Quick actions" className="grid gap-px border-t border-home-border bg-home-border sm:grid-cols-3">
            {QUICK_ACTIONS.map(({ icon: Icon, key, href }) => (
              <Link key={href} href={href} className="group flex min-w-0 items-center gap-3 bg-white px-6 py-5 transition-colors duration-200 hover:bg-home-canvas focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary sm:px-7">
                <Icon className="h-5 w-5 shrink-0 text-home-gold" strokeWidth={1.5} aria-hidden="true" />
                <span className="flex-1 font-brand text-sm font-medium text-home-ink">{dict.cta.quickActions[key]}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-home-muted group-hover:text-primary" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
