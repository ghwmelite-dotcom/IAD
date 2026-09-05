'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { portalLoginStart } from '@/lib/portal-api';

const LoginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function PortalLoginPage() {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      await portalLoginStart(values.email);
      setSentEmail(values.email);
      setSent(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Could not send sign-in link.');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/ohcs-crest.png"
            alt="OHCS crest"
            width={64}
            height={64}
            className="object-contain mx-auto mb-4"
            style={{ width: 'auto', height: 64 }}
          />
          <h1 className="text-2xl font-display font-bold text-primary-dark">Audit Operations Portal</h1>
          <p className="text-sm text-text-muted mt-1">
            Internal Audit Department · Office of the Head of the Civil Service
          </p>
          {/* Kente stripe */}
          <div
            className="mt-4 h-[3px] rounded-full max-w-48 mx-auto"
            style={{ background: 'linear-gradient(90deg, #1B5E20 25%, #D4A017 25%, #D4A017 50%, #B71C1C 50%, #B71C1C 75%, #212121 75%)' }}
          />
        </div>

        <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-8">
          {sent ? (
            <div className="text-center" role="status">
              <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                <MailCheck className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-display font-semibold text-primary-dark">Check your email</h2>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">
                If <span className="font-semibold text-text">{sentEmail}</span> has a portal
                account, a sign-in link is on its way. The link is valid for 15 minutes and can
                be used once — it signs you in and brings you straight to the dashboard.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-semibold text-primary hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <p className="text-sm text-text-muted">
                Sign in with your official email address. We&apos;ll email you a secure,
                single-use sign-in link — no password required.
              </p>
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                placeholder="you@ohcs.gov.gh"
                error={errors.email?.message}
                {...register('email')}
              />
              {serverError && (
                <p role="alert" className="text-sm text-error">
                  {serverError}
                </p>
              )}
              <Button type="submit" loading={isSubmitting} className="w-full">
                Email me a sign-in link
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Access is restricted to authorised audit staff and MDA liaison officers.{' '}
          <Link href="/" className="text-primary hover:underline">
            Back to the public site
          </Link>
        </p>
      </div>
    </div>
  );
}
