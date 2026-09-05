import { PageHero } from '@/components/layout/page-hero';
import type { Metadata } from 'next';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import Link from 'next/link';
import {
  Landmark,
  ClipboardCheck,
  BadgeCheck,
  GraduationCap,
  ShieldCheck,
  Eye,
  ClipboardList,
  Users,
  GitBranch,
  ArrowRight,
} from 'lucide-react';

// TODO(rebrand): replace with verified departmental figures.
const STATS = [
  { number: '40+', label: 'MDAs Covered', icon: Landmark },
  { number: '10', label: 'Audit Units Coordinated', icon: GitBranch },
  { number: '120+', label: 'Audits Completed', icon: ClipboardCheck },
  { number: '300+', label: 'Auditors Trained', icon: GraduationCap },
];

const SERVICES = [
  'Advises management on how to better execute their responsibilities and duties.',
  'Reviews policy documents and contracts, and provides advice on them.',
  'Undertakes special audits, risk assessments, and reviews of controls and administrative processes, and issues reports for management attention.',
  'Ensures government resources are safeguarded and used judiciously to attain the Office\u2019s goals.',
  'Ensures that the financial, managerial, and operational activities of the Office comply with applicable laws, regulations, policies, standards, and procedures.',
  'Ensures that the assets and properties of the Office are adequately safeguarded, used judiciously, and applied to their intended purposes.',
  'Ensures that the resources of the Office are used economically, effectively, and efficiently.',
  'Facilitates the prevention and detection of abuse and waste.',
];

const QUICK_LINKS = [
  { label: 'Our Vision', href: '/about/vision', desc: 'Serving OHCS to achieve its mandate for the Internal Audit Class', icon: Eye },
  { label: 'Our Functions', href: '/about/functions', desc: 'Training, coordination, postings, and management of the Internal Audit Class', icon: ClipboardList },
  { label: 'Our Leadership', href: '/about/leadership', desc: 'The Director and senior leadership of the department', icon: Users },
  { label: 'Organisational Structure', href: '/about/structure', desc: 'How the Internal Audit Department is organised', icon: GitBranch },
];


export const metadata: Metadata = {
  title: 'About the Department',
  description:
    'Providing independent assurance, advisory, and audit coordination services within the Office of the Head of the Civil Service.',
  openGraph: {
    title: 'About the Department',
    description:
      'Providing independent assurance, advisory, and audit coordination services within the Office of the Head of the Civil Service.',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About the Internal Audit Department"
        subtitle="Providing independent assurance, advisory, and audit coordination services within the Office of the Head of the Civil Service."
        breadcrumbs={[{ label: 'About' }]}
        accent="green"
      >
        {/* Stats row inside hero */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] rounded-2xl p-5 text-center"
            >
              <stat.icon className="h-5 w-5 text-accent mx-auto mb-2" aria-hidden="true" />
              <p className="text-2xl lg:text-3xl font-bold text-white leading-none mb-1">{stat.number}</p>
              <p className="text-xs text-white/50 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* ── Section: Mandate ── */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary tracking-wide">Who We Are</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark mb-6">
              Our{' '}
              <span className="relative inline-block">
                Mandate
                <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/20 rounded-sm -z-10" />
              </span>
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              The Internal Audit Department (IAD) of the Office of the Head of the Civil Service
              exists to provide support for the development and establishment of an efficient
              and well-functioning internal audit system and processes at the OHCS.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              Beyond the Office itself, the department manages the Internal Audit Class of the
              Civil Service — training officers, co-ordinating and monitoring Internal Audit
              Units in Ministries, Departments, and Agencies (MDAs), and working with the
              Internal Audit Agency on staffing policies.
            </p>
          </div>
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── Section: What We Do — full width dark ── */}
      <section className="relative py-20 lg:py-24 bg-primary-dark overflow-hidden">
        {/* Kente texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: [
              'repeating-linear-gradient(0deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 40px)',
              'repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 40px)',
            ].join(', '),
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(46,125,50,0.2) 0%, transparent 60%)' }}
        />

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-sm font-semibold text-accent tracking-wide">What We Do</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
              Services We{' '}
              <span className="relative inline-block">
                Provide
                <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/30 rounded-sm -z-10" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.1] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                  <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <p className="text-base text-white/70 leading-relaxed">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KenteSectionDivider />

      {/* ── Section: Explore More — light green bg ── */}
      <section className="py-20 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#F0F7F1' }}>
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary tracking-wide">Learn More</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark">
              Explore{' '}
              <span className="relative inline-block">
                IAD
                <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/15 rounded-sm -z-10" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-5 bg-white rounded-2xl border-2 border-border/40 p-7 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary/25 group-hover:to-primary/10 transition-colors">
                  <link.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-primary-dark mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                    {link.label}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" aria-hidden="true" />
                  </h3>
                  <p className="text-base text-text-muted leading-relaxed">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-text-muted">
              <BadgeCheck className="inline h-4 w-4 text-primary mr-1 -mt-0.5" aria-hidden="true" />
              The Internal Audit Department is a department of the{' '}
              <span className="font-semibold text-primary-dark">Office of the Head of the Civil Service</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
