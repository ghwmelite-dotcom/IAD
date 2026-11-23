import { DEPARTMENT_SERVICES } from '@/lib/department-content';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { FileSearch, MessageSquare, ShieldAlert, FileText, Send, Search } from 'lucide-react';

const services = [
  {
    title: 'Special Audit Requests',
    description: 'Request a special audit, risk assessment, or review of controls and administrative processes',
    href: '/services/special-audit',
    icon: FileSearch,
    gradient: 'from-primary to-primary-light',
  },
  {
    title: 'Consultancy',
    description: 'Request advisory and consultancy services on internal audit matters',
    href: '/services/consultancy',
    icon: MessageSquare,
    gradient: 'from-accent to-accent-light',
  },
  {
    title: 'Report Fraud / Whistleblowing',
    description: 'Reporting channel preview — optional contact fields',
    href: '/services/report-fraud',
    icon: ShieldAlert,
    gradient: 'from-error to-red-400',
  },
  {
    title: 'Right to Information',
    description: 'Submit RTI requests for public records and data',
    href: '/services/rti',
    icon: FileText,
    gradient: 'from-success to-emerald-400',
  },
  {
    title: 'Feedback',
    description: 'Share your feedback to help us improve',
    href: '/services/feedback',
    icon: Send,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Track Submission',
    description: 'Check the status of a submission using your reference number',
    href: '/track',
    icon: Search,
    gradient: 'from-purple-500 to-violet-600',
  },
] as const;


export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Eight departmental services supporting OHCS management, controls, compliance and resource safeguarding, with prototype online request channels.',
  openGraph: {
    title: 'Our Services',
    description:
      'Eight departmental services supporting OHCS management, controls, compliance and resource safeguarding, with prototype online request channels.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        theme="services"
        title="Our Services"
        subtitle="Management advice, policy and contract review, special audits, compliance and resource safeguarding within OHCS. Class management and support functions extend to Internal Auditors in MDAs."
        breadcrumbs={[{ label: 'Services' }]}
        accent="green"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <section aria-labelledby="departmental-services" className="mb-16">
          <h2 id="departmental-services" className="mb-8 font-display text-3xl font-bold text-text">Our Eight Departmental Services</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {DEPARTMENT_SERVICES.map((service) => <article key={service.title} className="rounded-2xl border border-border bg-white p-6"><h3 className="mb-3 text-lg font-semibold text-primary">{service.title}</h3><p className="leading-relaxed text-text-muted">{service.description}</p></article>)}
          </div>
          <Link href="/about/functions" className="mt-6 inline-flex min-h-12 items-center font-semibold text-primary underline underline-offset-4">Explore our six Class management functions</Link>
        </section>
        <h2 className="mb-8 font-display text-3xl font-bold text-text">Online Channel Previews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group relative bg-white rounded-2xl border-2 border-border/40 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-xl font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                <p className="text-text-muted text-sm mb-4">{service.description}</p>
                <span className="text-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Get started
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
