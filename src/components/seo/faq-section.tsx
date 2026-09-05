import { HelpCircle } from 'lucide-react';
import type { FaqItem } from '@/lib/json-ld';

interface FaqSectionProps {
  faqs: FaqItem[];
  /** Section heading, e.g. 'Common Questions'. */
  heading?: string;
  /** Pill badge label, e.g. 'FAQ'. */
  pill?: string;
}

/**
 * Visible FAQ section — its content MUST match the FAQPage JSON-LD emitted
 * alongside it (search engines require parity between schema and page).
 * Server- and client-safe (no interactivity).
 */
export function FaqSection({ faqs, heading = 'Common Questions', pill = 'FAQ' }: FaqSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-sm font-semibold text-primary tracking-wide">{pill}</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
            {heading.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="relative inline-block">
              {heading.split(' ').slice(-1)}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/30 rounded-sm -z-10"
              />
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-primary/[0.02] rounded-2xl border-2 border-border/40 p-6 lg:p-7"
            >
              <h3 className="flex items-start gap-3 font-semibold text-base text-primary-dark mb-2.5">
                <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                {faq.question}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed pl-8">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
