import { PageHero } from '@/components/layout/page-hero';
import { Sidebar } from '@/components/layout/sidebar';
import {
  GraduationCap,
  GitBranch,
  Users,
  Handshake,
  ClipboardList,
  MessagesSquare,
} from 'lucide-react';

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

const FUNCTIONS = [
  {
    icon: GraduationCap,
    title: 'Training',
    description: 'Train officers in the Internal Audit Class of the Civil Service.',
  },
  {
    icon: GitBranch,
    title: 'Co-ordination & Monitoring',
    description: 'Co-ordinate and monitor the activities of Internal Audit Units in MDAs.',
  },
  {
    icon: Users,
    title: 'Equitable Staffing',
    description: 'Ensure the equitable distribution of Internal Audit staff in MDAs — postings, secondment, and conversion.',
  },
  {
    icon: Handshake,
    title: 'Staffing Policy Liaison',
    description: 'Liaise with the Internal Audit Agency to plan and implement staffing policies for MDAs.',
  },
  {
    icon: ClipboardList,
    title: 'Class Management',
    description: 'Manage the Internal Audit Class of the Civil Service.',
  },
  {
    icon: MessagesSquare,
    title: 'Counselling & Consultancy',
    description: 'Offer counselling and consultancy services on issues affecting Internal Auditors in the MDAs.',
  },
];

export default function FunctionsPage() {
  return (
    <>
      <PageHero
        title="Our Functions"
        subtitle="The department's core responsibilities for the Internal Audit Class of the Civil Service."
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Functions' }]}
        accent="green"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FUNCTIONS.map((fn) => (
                <div
                  key={fn.title}
                  className="bg-white rounded-2xl border-2 border-border/40 p-7 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-4">
                    <fn.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-semibold text-lg text-primary-dark mb-2">{fn.title}</h2>
                  <p className="text-base text-text-muted leading-relaxed">{fn.description}</p>
                </div>
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
