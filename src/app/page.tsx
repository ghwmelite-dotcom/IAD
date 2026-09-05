import { Hero } from '@/components/home/hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { QuickServices } from '@/components/home/quick-services';
import { StatsBanner } from '@/components/home/stats-banner';
import { NewsEventsSection } from '@/components/home/news-events-section';
import { TransparencyShowcase } from '@/components/home/transparency-showcase';
import { LeadershipSpotlight } from '@/components/home/leadership-spotlight';
import { AuditUnitsGrid } from '@/components/home/audit-units-grid';
import { CtaSection } from '@/components/home/cta-section';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <KenteSectionDivider />
      <QuickServices />
      <KenteSectionDivider />
      <StatsBanner />
      <KenteSectionDivider />
      <NewsEventsSection />
      <KenteSectionDivider />
      <TransparencyShowcase />
      <KenteSectionDivider />
      <LeadershipSpotlight />
      <KenteSectionDivider />
      <AuditUnitsGrid />
      <KenteSectionDivider />
      <CtaSection />
      <KenteSectionDivider />
    </main>
  );
}
