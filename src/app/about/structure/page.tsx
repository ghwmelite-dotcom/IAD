import { PageHero } from '@/components/layout/page-hero';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/sidebar';
import Link from 'next/link';
import { AUDIT_UNITS } from '@/lib/constants';

const ABOUT_SIDEBAR = [
  {
    title: 'About IAD',
    links: [
      { label: 'Mandate & Services', href: '/about' },
      { label: 'Vision', href: '/about/vision' },
      { label: 'Functions', href: '/about/functions' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Organisational Structure', href: '/about/structure' },
    ],
  },
];

// TODO(rebrand): confirm the approved organogram and grade structure.
const TIERS = [
  {
    tier: 'Director',
    description:
      'Heads the Internal Audit Department — the headquarters of internal audit in the Ghana Civil Service. Every Internal Audit Unit in every Ministry, Department and Agency, though led by its own Head of Unit, ultimately answers to the Director of Internal Audit.',
  },
  {
    tier: 'Audit Managers',
    description:
      'Supervise audit engagements, special audits, and risk assessments, and review reports issued for management attention.',
  },
  {
    tier: 'Auditors',
    description:
      'Execute audit plans, compliance reviews, and advisory assignments within the Office and in support of MDA Internal Audit Units.',
  },
  {
    tier: 'Internal Audit Units (MDAs)',
    description:
      'Every Ministry, Department and Agency has its own Internal Audit Unit with its own Head of Unit. All Heads of Units answer to the Director of Internal Audit; the department co-ordinates and monitors their work and manages equitable staff distribution through postings, secondment, and conversion.',
  },
];


export const metadata: Metadata = {
  title: 'Organisational Structure',
  description:
    "How the Internal Audit Department is organised — the headquarters of internal audit in the Civil Service, coordinating every MDA's Internal Audit Unit.",
  openGraph: {
    title: 'Organisational Structure',
    description:
      "How the Internal Audit Department is organised — the headquarters of internal audit in the Civil Service, coordinating every MDA's Internal Audit Unit.",
  },
};

export default function StructurePage() {
  return (
    <>
      <PageHero
        title="Organisational Structure"
        subtitle="The Internal Audit Department is the headquarters of internal audit in the Civil Service — every MDA's Internal Audit Unit, led by its own Head of Unit, answers to the Director of Internal Audit."
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Organisational Structure' }]}
        accent="green"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-primary-dark mb-6">
              Departmental Hierarchy
            </h2>
            <ol className="relative border-l-2 border-primary/20 ml-3 space-y-8 mb-14">
              {TIERS.map((t, i) => (
                <li key={t.tier} className="ml-6 relative">
                  <div
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-white"
                  />
                  <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                    Level {i + 1}
                  </span>
                  <h3 className="font-semibold text-lg text-primary-dark mb-1">{t.tier}</h3>
                  <p className="text-base text-text-muted leading-relaxed max-w-2xl">
                    {t.description}
                  </p>
                </li>
              ))}
            </ol>

            <h2 className="font-display text-2xl font-bold text-primary-dark mb-6">
              Co-ordinated Internal Audit Units
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AUDIT_UNITS.map((unit) => (
                <Link
                  key={unit.slug}
                  href={`/audit-units/${unit.slug}`}
                  className="block bg-accent/5 rounded-xl p-5 hover:bg-accent/10 transition-colors border border-accent/10"
                >
                  <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                    {unit.shortName}
                  </span>
                  <span className="font-semibold text-base text-primary-dark">{unit.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Sidebar sections={ABOUT_SIDEBAR} />
          </div>
        </div>
      </div>
    </>
  );
}
