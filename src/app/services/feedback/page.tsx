'use client';

import { useState } from 'react';
import { PageHero } from '@/components/layout/page-hero';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { SubmissionForm } from '@/components/forms/submission-form';
import { feedbackFormSchema, type FeedbackFormData } from '@/lib/validations';
import type { Path } from 'react-hook-form';
import {
  Send,
  ThumbsUp,
  Star,
  TrendingUp,
  Heart,
  ArrowRight,
} from 'lucide-react';

const fields: Array<{
  name: Path<FeedbackFormData>;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  required?: boolean;
  rows?: number;
}> = [
  { name: 'name', label: 'Full Name', placeholder: 'Enter your full name', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+233 XX XXX XXXX' },
  { name: 'subject', label: 'Subject', placeholder: 'What is your feedback about?' },
  { name: 'body', label: 'Your Feedback', type: 'textarea', placeholder: 'Share your feedback, suggestion, or concern...', required: true, rows: 6 },
];

const IMPACT = [
  { icon: TrendingUp, title: 'Service Improvement', desc: 'Your feedback directly shapes how we improve our audit and advisory services.', gradient: 'from-green-500 to-emerald-600' },
  { icon: Star, title: 'Professional Standards', desc: 'Feedback helps us uphold professional standards across the Internal Audit Class.', gradient: 'from-amber-500 to-yellow-600' },
  { icon: ThumbsUp, title: 'Accountability', desc: 'Feedback ensures transparency and accountability in everything the department does.', gradient: 'from-sky-500 to-blue-600' },
  { icon: Heart, title: 'Stakeholder Voice', desc: 'Every piece of feedback strengthens the bond between the department and those we serve.', gradient: 'from-rose-500 to-pink-600' },
];

export default function FeedbackPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <PageHero
        title="Share Your Feedback"
        subtitle="Help us improve the work of the Internal Audit Department. Your feedback — positive or constructive — drives meaningful change."
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Feedback' }]}
        accent="gold"
      />

      {/* ── Submit Feedback Section ── */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
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
                    <Send className="h-8 w-8 text-primary-dark" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                    Ready to Share Your Feedback?
                  </h2>
                  <p className="text-base text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
                    Your feedback will be assigned a unique reference number so you can track
                    how it is addressed.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold text-base rounded-xl hover:bg-accent-light hover:shadow-lg transition-all duration-200"
                  >
                    Open Feedback Form
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                  <Send className="h-5 w-5 text-primary-dark" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-primary-dark">Feedback Form</h2>
                  <p className="text-sm text-text-muted">All fields marked * are required</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-border/40 p-8 lg:p-10">
                <SubmissionForm<FeedbackFormData>
                  schema={feedbackFormSchema}
                  fields={fields}
                  submissionType="feedback"
                  submitLabel="Submit Feedback"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── Impact Section ── */}
      <section className="py-20 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#FFF8F0' }}>
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary tracking-wide">Your Impact</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark">
              Feedback{' '}
              <span className="relative inline-block">
                Matters
                <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/15 rounded-sm -z-10" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border-2 border-border/40 p-7 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-5 shadow-sm`}>
                  <item.icon className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg text-primary-dark mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
