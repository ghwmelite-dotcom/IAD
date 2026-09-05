'use client';

import { useState } from 'react';
import { PageHero } from '@/components/layout/page-hero';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { SubmissionForm } from '@/components/forms/submission-form';
import { FaqSection } from '@/components/seo/faq-section';
import { JsonLd } from '@/components/seo/json-ld';
import { faqPageSchema, type FaqItem } from '@/lib/json-ld';
import { fraudReportFormSchema, type FraudReportFormData } from '@/lib/validations';
import type { Path } from 'react-hook-form';
import {
  ShieldAlert,
  EyeOff,
  Lock,
  FileWarning,
  ArrowRight,
} from 'lucide-react';

const fields: Array<{
  name: Path<FraudReportFormData>;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  required?: boolean;
  rows?: number;
}> = [
  { name: 'name', label: 'Full Name (optional)', placeholder: 'Leave blank to remain anonymous' },
  { name: 'email', label: 'Email Address (optional)', type: 'email', placeholder: 'Only if you want us to follow up' },
  { name: 'phone', label: 'Phone Number (optional)', type: 'tel', placeholder: '+233 XX XXX XXXX' },
  { name: 'subject', label: 'Subject of Report (optional)', placeholder: 'Brief summary of the issue' },
  { name: 'body', label: 'Report Details', type: 'textarea', placeholder: 'Describe the suspected fraud, abuse, or waste: what happened, where, when, and who or which unit is involved...', required: true, rows: 8 },
];

const ASSURANCES = [
  { icon: EyeOff, title: 'Fully Anonymous', desc: 'You do not have to give your name or any contact details. No identity is stored unless you volunteer it.' },
  { icon: Lock, title: 'Confidential Handling', desc: 'Reports are handled with strict confidentiality and accessed only by authorised officers.' },
  { icon: FileWarning, title: 'Every Report Reviewed', desc: 'Each report is assessed and, where warranted, investigated through a special audit or referral.' },
];

// Visible FAQ copy MUST stay in sync with the FAQPage JSON-LD.
const FAQS: FaqItem[] = [
  {
    question: 'Can I report fraud or waste anonymously?',
    answer:
      'Yes. All identity fields on the report form are optional — leave them blank to remain completely anonymous. No identifying details are stored unless you choose to provide them.',
  },
  {
    question: 'What happens after I submit a report?',
    answer:
      'Every report is assessed by authorised officers of the Internal Audit Department and, where warranted, investigated through a special audit or referred to the appropriate body. If you provide contact details you receive a reference number, which you can use on the Track Submission page to follow progress.',
  },
  {
    question: 'Am I protected as a whistleblower?',
    answer:
      'Yes. Whistleblowers are protected under the Whistleblower Act, 2006 (Act 720). Reports are handled with strict confidentiality and accessed only by authorised officers.',
  },
];

export default function ReportFraudPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />

      <PageHero
        title="Report Fraud or Waste"
        subtitle="Help us safeguard public resources. Report suspected fraud, abuse, or waste — you can remain completely anonymous."
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Report Fraud / Whistleblowing' }]}
        accent="warm"
      />

      {/* ── Assurances Section ── */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/15 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-sm font-semibold text-accent tracking-wide">Your Protection</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
              Speak Up{' '}
              <span className="relative inline-block">
                Safely
                <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/20 rounded-sm -z-10" />
              </span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              The Internal Audit Department facilitates the prevention and detection of abuse
              and waste. Whistleblowers are protected under the Whistleblower Act, 2006 (Act 720).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ASSURANCES.map((item) => (
              <div key={item.title} className="bg-rose-50 rounded-2xl border-2 border-rose-200 p-7 text-center hover:-translate-y-1 hover:shadow-xl hover:border-rose-400 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <item.icon className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg text-primary-dark mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── Submit Report Section ── */}
      <section className="py-20 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#FFF8F0' }}>
        <FloatingShapes />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showForm ? (
            <div className="text-center">
              <div className="relative bg-primary-dark rounded-2xl p-10 lg:p-14 overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: [
                      'repeating-linear-gradient(0deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 32px)',
                      'repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 32px)',
                    ].join(', '),
                  }}
                />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <ShieldAlert className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                    Ready to Make a Report?
                  </h2>
                  <p className="text-base text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
                    All identity fields are optional — leave them blank to remain anonymous.
                    No identifying details are stored unless you choose to provide them.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold text-base rounded-xl hover:bg-accent-light hover:shadow-lg transition-all duration-200"
                  >
                    Open Report Form
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
                  <ShieldAlert className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-primary-dark">Fraud / Whistleblowing Report Form</h2>
                  <p className="text-sm text-text-muted">Only the report details are required — all identity fields are optional</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-border/40 p-8 lg:p-10">
                <SubmissionForm<FraudReportFormData>
                  schema={fraudReportFormSchema}
                  fields={fields}
                  submissionType="fraud_report"
                  submitLabel="Submit Report"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── FAQ (visible content mirrors the FAQPage JSON-LD) ── */}
      <FaqSection faqs={FAQS} heading="Common Questions" pill="Whistleblowing" />
    </>
  );
}
