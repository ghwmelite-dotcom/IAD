import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';

const LEADERS = [
  {
    name: 'Solomon Wemegah',
    title: 'Director, Internal Audit Department',
    bio: 'Solomon Wemegah is the Director of the Internal Audit Department at the Office of the Head of the Civil Service. The department supports effective internal audit systems at OHCS and manages the Internal Audit Class of the Civil Service. Its functions include training officers, coordinating and monitoring MDA Internal Audit Units, supporting equitable staffing, liaising with the Internal Audit Agency on staffing policies, and providing counselling and consultancy to Internal Auditors in MDAs.',
    photoUrl: '/images/leadership/solomon-wemegah.jpg',
  },

];


export const metadata: Metadata = {
  title: 'Our Leadership',
  description:
    'The Director of the Internal Audit Department, Office of the Head of Civil Service.',
  openGraph: {
    title: 'Our Leadership',
    description:
      'The Director of the Internal Audit Department, Office of the Head of Civil Service.',
  },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        theme="leadership"
        title="Our Leadership"
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Our Leadership' }]}
        accent="warm"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="space-y-8">
          {LEADERS.map((leader) => (
            <div key={leader.title} className="bg-white rounded-2xl border-2 border-border/40 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="relative h-80 md:h-auto md:min-h-[340px]">
                  {leader.photoUrl ? (
                    <Image
                      src={leader.photoUrl}
                      alt={leader.name}
                      fill
                      className="object-cover object-[50%_20%]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-primary-dark"
                    >
                      <span className="font-display text-7xl font-extrabold tracking-[6px] text-accent/70">
                        IAD
                      </span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    {leader.title}
                  </p>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-primary-dark mb-4">
                    {leader.name}
                  </h2>
                  <p className="text-lg text-text-muted leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
