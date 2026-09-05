import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Internal Audit Department, Office of the Head of Civil Service — enquiries, feedback, and stakeholder engagement.',
  openGraph: {
    title: 'Contact Us',
    description:
      'Get in touch with the Internal Audit Department, Office of the Head of Civil Service — enquiries, feedback, and stakeholder engagement.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
