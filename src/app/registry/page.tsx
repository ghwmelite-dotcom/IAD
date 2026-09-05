'use client';

import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { RegistryDirectory } from '@/components/registry/registry-directory';

export default function RegistryPage() {
  return (
    <>
      <PageHero
        title="Internal Audit Class Registry"
        subtitle="The public register of verified Internal Audit Class officers serving across Ghana's Civil Service."
        breadcrumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Registry' }]}
        accent="green"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <BadgeCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Verified officers only</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Credentials checked by the department</span>
          </div>
        </div>
      </PageHero>

      <KenteSectionDivider />

      <RegistryDirectory />
    </>
  );
}
