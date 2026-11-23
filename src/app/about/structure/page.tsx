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

// Functional relationships from the departmental brief, not an approved organogram.
const TIERS = [
  { tier: 'OHCS audit systems', description: 'Support efficient internal audit systems and processes within OHCS, advise management, review policies and contracts, undertake special audits, and safeguard the Office’s resources.' },
  { tier: 'Civil Service Internal Audit Class', description: 'Manage the Class, train officers, support equitable staffing through postings, secondment and conversion, and offer counselling and consultancy.' },
  { tier: 'Internal Audit Units in MDAs', description: 'Co-ordinate and monitor unit activities. This responsibility does not, by itself, establish a direct reporting line from every MDA unit to the Director.' },
  { tier: 'Internal Audit Agency liaison', description: 'Work with the Internal Audit Agency to plan and implement staffing policies for MDAs.' },
];

export const metadata: Metadata = {
  title: 'Organisational Structure',
  description:
    "The department’s functional relationships within OHCS, with MDA Internal Audit Units and with the Internal Audit Agency.",
  openGraph: {
    title: 'Organisational Structure',
    description:
      "The department’s functional relationships within OHCS, with MDA Internal Audit Units and with the Internal Audit Agency.",
  },
};

export default function StructurePage() {
  return (
    <>
      <PageHero
        theme="structure"
        title="Organisational Structure"
        subtitle="How the department’s OHCS audit responsibilities connect with Civil Service Class management, MDA coordination and Internal Audit Agency liaison."
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Organisational Structure' }]}
        accent="green"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-primary-dark mb-6">
              Roles & Working Relationships
            </h2>
            <p className="mb-8 text-text-muted leading-relaxed">This is a functional overview based on the departmental brief. An approved organogram and formal reporting lines have not been supplied.</p>
            <ol className="relative border-l-2 border-primary/20 ml-3 space-y-8 mb-14">
              {TIERS.map((t, i) => (
                <li key={t.tier} className="ml-6 relative">
                  <div
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-white"
                  />
                  <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                    Area {i + 1}
                  </span>
                  <h3 className="font-semibold text-lg text-primary-dark mb-1">{t.tier}</h3>
                  <p className="text-base text-text-muted leading-relaxed max-w-2xl">
                    {t.description}
                  </p>
                </li>
              ))}
            </ol>

            <h2 className="font-display text-2xl font-bold text-primary-dark mb-6">
              Illustrative MDA Directory
            </h2>
            <p className="mb-6 text-text-muted">The entries below demonstrate the directory layout and are awaiting an approved, current unit list.</p>
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
