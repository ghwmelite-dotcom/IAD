import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Award, FileSearch, ShieldCheck, Stamp } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { Skeleton } from '@/components/ui/skeleton';
import { CertificateVerifier } from '@/components/registry/certificate-verifier';
import { FaqSection } from '@/components/seo/faq-section';
import { JsonLd } from '@/components/seo/json-ld';
import { faqPageSchema, type FaqItem } from '@/lib/json-ld';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Verify a Certificate',
  description:
    'Preview a certificate record lookup. Official certificate validity requires confirmation by the department.',
  openGraph: {
    title: 'Verify a Certificate',
    description:
      'Preview a certificate record lookup. Official validity requires departmental confirmation.',
    images: [DEFAULT_OG_IMAGE],
  },
};

// Visible FAQ copy MUST stay in sync with the FAQPage JSON-LD below.
const VERIFY_FAQS: FaqItem[] = [
  {
    question: 'How do I verify an IAD certificate?',
    answer:
      'Enter the verify code printed on the certificate — usually in the format IAD-CERT-YYYY-NNNN — into the checker above and press "Verify Certificate". The code is checked against records in this prototype.',
  },
  {
    question: 'What does a valid result mean?',
    answer:
      'A valid result means a matching record exists in this prototype. It does not establish official issuance or credential validity; seek confirmation from the department.',
  },
  {
    question: 'What should I do if a code comes back "not found"?',
    answer:
      'Check the code for typing errors. A missing prototype record does not prove a certificate is invalid or fraudulent. Seek confirmation through official departmental channels.',
  },
];

export default function VerifyPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(VERIFY_FAQS)} />

      <PageHero
        theme="verification"
        title="Verify a Certificate"
        subtitle="Preview a certificate record lookup. Official validity requires departmental confirmation."
        breadcrumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Verify Certificate' }]}
        accent="green"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Prototype record lookup</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <Award className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Free and instant</span>
          </div>
        </div>
      </PageHero>

      <KenteSectionDivider />

      {/* ── Verification tool ── */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="max-w-xl mx-auto">
                <Skeleton className="h-64 rounded-2xl" />
              </div>
            }
          >
            <CertificateVerifier />
          </Suspense>
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── Why verification matters ── */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary tracking-wide">
                Why Verify
              </span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
              Trust, but{' '}
              <span className="relative inline-block">
                Verify
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/30 rounded-sm -z-10"
                />
              </span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Every certificate issued by the department carries a unique verify code.
              Checking it takes seconds and protects everyone relying on the credential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Stamp,
                title: 'Authenticity',
                body: 'A matching record exists in this prototype. Official issuance and validity still require confirmation from the department.',
                gradient: 'from-green-500 to-emerald-600',
              },
              {
                icon: FileSearch,
                title: 'Fraud prevention',
                body: 'A code that returns "not found" may simply be absent from this prototype. Do not infer fraud or invalidity from an incomplete record.',
                gradient: 'from-amber-500 to-yellow-600',
              },
              {
                icon: ShieldCheck,
                title: 'Public confidence',
                body: 'Open verification lets employers, MDAs, and citizens confirm an officer\'s credentials without writing to the department first.',
                gradient: 'from-blue-500 to-indigo-600',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-2xl border-2 border-border/40 p-7 hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300`}
                >
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── FAQ (visible content mirrors the FAQPage JSON-LD) ── */}
      <FaqSection faqs={VERIFY_FAQS} heading="Common Questions" pill="Certificate Verification" />
    </>
  );
}
