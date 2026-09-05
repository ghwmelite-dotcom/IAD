'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  BadgeCheck,
  Loader2,
  Search,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { verifyCertificate, formatDate } from '@/lib/public-api';
import type { CertificateVerification } from '@/lib/public-api';

type Status = 'idle' | 'loading' | 'done' | 'unavailable';

/**
 * Certificate verification tool. Reads an optional ?code= prefilled code
 * (linked from registry profiles) — must be rendered inside a Suspense
 * boundary for the static export build (Next 16).
 */
export function CertificateVerifier() {
  const searchParams = useSearchParams();
  const prefill = (searchParams.get('code') ?? '').trim();

  const [code, setCode] = useState(prefill);
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<CertificateVerification | null>(null);

  const runCheck = useCallback(async (value: string) => {
    setStatus('loading');
    setResult(null);
    try {
      const data = await verifyCertificate(value);
      setResult(data);
      setStatus('done');
    } catch {
      setStatus('unavailable');
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    void runCheck(code.trim());
  }

  // Auto-verify when arriving with a prefilled code (e.g. from a profile).
  // Deferred to a timeout so the loading state isn't set synchronously in the effect.
  useEffect(() => {
    if (!prefill) return;
    const timer = setTimeout(() => void runCheck(prefill), 0);
    return () => clearTimeout(timer);
  }, [prefill, runCheck]);

  return (
    <div className="max-w-xl mx-auto">
      {/* Input card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border-2 border-border/40 shadow-sm p-6 sm:p-8"
      >
        <label
          htmlFor="verify-code"
          className="block text-sm font-semibold text-primary-dark mb-2"
        >
          Certificate verify code
        </label>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted/40"
            aria-hidden="true"
          />
          <input
            id="verify-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. IAD-CERT-2026-0001"
            autoComplete="off"
            spellCheck={false}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border/60 bg-white text-base font-mono focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
        <p className="text-xs text-text-muted/60 mt-2">
          Printed on the certificate, usually in the format IAD-CERT-YYYY-NNNN.
        </p>
        <button
          type="submit"
          disabled={!code.trim() || status === 'loading'}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          )}
          {status === 'loading' ? 'Checking…' : 'Verify Certificate'}
        </button>
      </form>

      {/* Result */}
      {status === 'done' && result?.valid && (
        <div
          role="status"
          className="mt-6 bg-green-50 rounded-2xl border-2 border-green-200 p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
              <BadgeCheck className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-green-900">
                Certificate is valid
              </h3>
              <p className="text-sm text-green-700">
                Verified against the department&apos;s records.
              </p>
            </div>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="font-semibold text-green-900 sm:w-32 shrink-0">Certificate</dt>
              <dd className="text-green-800">{result.title}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="font-semibold text-green-900 sm:w-32 shrink-0">Serial</dt>
              <dd className="text-green-800 font-mono">{result.serial}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="font-semibold text-green-900 sm:w-32 shrink-0">Issued</dt>
              <dd className="text-green-800">
                {result.issuedAt ? formatDate(result.issuedAt) : '—'}
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="font-semibold text-green-900 sm:w-32 shrink-0">Awarded to</dt>
              <dd className="text-green-800">{result.auditorName}</dd>
            </div>
          </dl>
        </div>
      )}

      {status === 'done' && result && !result.valid && (
        <div
          role="alert"
          className="mt-6 bg-red-50 rounded-2xl border-2 border-red-200 p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-sm">
              <XCircle className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="font-display text-xl font-bold text-red-900">
              Certificate not found
            </h3>
          </div>
          <p className="text-sm text-red-800 leading-relaxed mb-4">
            No certificate matches the code{' '}
            <span className="font-mono font-semibold">{code.trim()}</span>. Check the
            code for typing errors. If the code is correct, the certificate may not
            have been issued by this department.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-800 hover:text-red-900 underline underline-offset-2"
          >
            Contact IAD to report a suspicious certificate
          </Link>
        </div>
      )}

      {status === 'unavailable' && (
        <div
          role="alert"
          className="mt-6 bg-amber-50 rounded-2xl border-2 border-amber-200 p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-6 w-6 text-amber-600" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold text-amber-900">
              Verification service unavailable
            </h3>
          </div>
          <p className="text-sm text-amber-800 leading-relaxed">
            The verification service could not be reached just now. Your code was not
            checked — please try again in a moment.
          </p>
        </div>
      )}
    </div>
  );
}
