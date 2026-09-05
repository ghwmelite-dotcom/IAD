import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { AUDIT_UNITS } from '@/lib/constants';
import {
  Wallet,
  HeartPulse,
  GraduationCap,
  Wheat,
  Landmark,
  Building2,
  Truck,
  Shield,
  Scale,
  Zap,
  ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  HeartPulse,
  GraduationCap,
  Wheat,
  Landmark,
  Building2,
  Truck,
  Shield,
  Scale,
  Zap,
};

const GRADIENTS = [
  'from-green-500 to-emerald-600',
  'from-blue-500 to-indigo-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-purple-500 to-violet-600',
];

const BORDERS = [
  'border-green-200 hover:border-green-400',
  'border-blue-200 hover:border-blue-400',
  'border-amber-200 hover:border-amber-400',
  'border-rose-200 hover:border-rose-400',
  'border-purple-200 hover:border-purple-400',
];

const BGS = ['bg-green-50', 'bg-blue-50', 'bg-amber-50', 'bg-rose-50', 'bg-purple-50'];


export const metadata: Metadata = {
  title: 'Internal Audit Units in MDAs',
  description:
    'Every Ministry, Department and Agency has an Internal Audit Unit led by its own Head of Unit, coordinated by the Internal Audit Department.',
  openGraph: {
    title: 'Internal Audit Units in MDAs',
    description:
      'Every Ministry, Department and Agency has an Internal Audit Unit led by its own Head of Unit, coordinated by the Internal Audit Department.',
  },
};

export default function AuditUnitsPage() {
  return (
    <>
      <PageHero
        title="Internal Audit Units in MDAs"
        subtitle="The Internal Audit Department is the headquarters of internal audit in the Ghana Civil Service. Every Ministry, Department and Agency has an Internal Audit Unit led by its own Head of Unit — and every Head of Unit answers to the Director of Internal Audit."
        breadcrumbs={[{ label: 'Audit Units' }]}
        accent="green"
      >
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-5 py-2">
            <span className="text-2xl font-bold text-white">{AUDIT_UNITS.length}</span>
            <span className="text-sm text-white/50">Internal Audit Units</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-5 py-2">
            <span className="text-sm text-white/50">Co-ordinated & monitored by IAD, OHCS</span>
          </div>
        </div>
      </PageHero>

      {/* ── Audit Units Section ── */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary tracking-wide">Directory</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
              Audit{' '}
              <span className="relative inline-block">
                Units
                <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/15 rounded-sm -z-10" />
              </span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Internal Audit Units provide independent assurance within their respective MDAs, supported and monitored by this department.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUDIT_UNITS.map((unit, i) => {
              const Icon = ICON_MAP[unit.icon] ?? Building2;
              const gradient = GRADIENTS[i % GRADIENTS.length]!;
              const border = BORDERS[i % BORDERS.length]!;
              const bg = BGS[i % BGS.length]!;
              return (
                <Link
                  key={unit.slug}
                  href={`/audit-units/${unit.slug}`}
                  className={`group block ${bg} rounded-2xl border-2 ${border} p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-text-muted/30 group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-2">
                    {unit.shortName}
                  </span>
                  <h3 className="font-semibold text-lg text-primary-dark mb-2 group-hover:text-primary transition-colors">
                    {unit.name}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                    {unit.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
