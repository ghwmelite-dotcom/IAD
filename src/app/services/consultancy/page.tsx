'use client';

import { useState } from 'react';
import { PageHero } from '@/components/layout/page-hero';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { SubmissionForm } from '@/components/forms/submission-form';
import { consultancyFormSchema, type ConsultancyFormData } from '@/lib/validations';
import type { Path } from 'react-hook-form';
import {
  MessageSquare,
  FileText,
  Users,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

const fields: Array<{
  name: Path<ConsultancyFormData>;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  required?: boolean;
  rows?: number;
}> = [
  { name: 'name', label: 'Full Name', placeholder: 'Enter your full name', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+233 XX XXX XXXX' },
  { name: 'subject', label: 'Subject of Request', placeholder: 'What advice or support do you need?', required: true },
  { name: 'body', label: 'Request Details', type: 'textarea', placeholder: 'Describe the issue, the policy document or contract involved (if any), and the advice you are seeking...', required: true, rows: 6 },
];

const AREAS = [
  { icon: Lightbulb, title: 'Management Advice', desc: 'Advice to management on how to better execute their responsibilities and duties.' },
  { icon: FileText, title: 'Policy & Contract Review', desc: 'Review of policy documents and contracts, with professional advice on them.' },
  { icon: Users, title: 'Counselling for Auditors', desc: 'Counselling and consultancy on issues affecting Internal Auditors in the MDAs.' },
  { icon: MessageSquare, title: 'Process Guidance', desc: 'Guidance on controls, administrative processes, and compliance requirements.' },
];

export default function ConsultancyPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <PageHero
        title="Consultancy & Advisory Services"
        subtitle="The department advises management, reviews policy documents and contracts, and offers counselling and consultancy to Internal Auditors across MDAs."
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Consultancy' }]}
        accent="warm"
      />

      {/* ── Areas Section ── */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/15 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-sm font-semibold text-accent tracking-wide">Advisory Areas</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
              How We Can{' '}
              <span className="relative inline-block">
                Advise
                <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/20 rounded-sm -z-10" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AREAS.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border-2 border-border/40 p-7 text-center hover:-translate-y-1 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <item.icon className="h-7 w-7 text-primary-dark" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg text-primary-dark mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── Submit Request Section ── */}
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
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MessageSquare className="h-8 w-8 text-primary-dark" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                    Ready to Request Consultancy?
                  </h2>
                  <p className="text-base text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
                    Your request will be assigned a unique reference number for tracking.
                    A valid email address is required for correspondence.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold text-base rounded-xl hover:bg-accent-light hover:shadow-lg transition-all duration-200"
                  >
                    Open Request Form
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary-dark" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-primary-dark">Consultancy Request Form</h2>
                  <p className="text-sm text-text-muted">All fields marked * are required</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-border/40 p-8 lg:p-10">
                <SubmissionForm<ConsultancyFormData>
                  schema={consultancyFormSchema}
                  fields={fields}
                  submissionType="consultancy"
                  submitLabel="Submit Consultancy Request"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
