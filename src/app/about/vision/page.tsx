import { PageHero } from '@/components/layout/page-hero';
import { Sidebar } from '@/components/layout/sidebar';
import { Eye } from 'lucide-react';

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

export default function VisionPage() {
  return (
    <>
      <PageHero
        title="Our Vision"
        subtitle="The guiding aspiration of the Internal Audit Department within the Office of the Head of Civil Service."
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Vision' }]}
        accent="gold"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="bg-primary/5 border-2 border-primary/10 rounded-2xl p-8 lg:p-12 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
                <Eye className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <blockquote className="font-display text-2xl lg:text-3xl font-bold text-primary-dark leading-snug">
                &ldquo;To serve OHCS to achieve its mandate for the Internal Audit
                Class.&rdquo;
              </blockquote>
            </div>

            <div className="space-y-6 text-text-muted text-lg leading-relaxed">
              <p>
                Everything the department does — training officers of the Internal Audit
                Class, co-ordinating Internal Audit Units in MDAs, advising management, and
                safeguarding public resources — is directed at helping the Office of the
                Head of Civil Service achieve its mandate.
              </p>
              <p>
                In practice, this means building a professional, well-resourced, and
                equitably distributed Internal Audit Class whose work promotes
                accountability, transparency, and value for money across Ghana&apos;s
                Civil Service.
              </p>
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
