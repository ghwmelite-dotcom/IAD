import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications & Downloads',
  description:
    'Audit reports, annual plans, policies and charters, and manuals and templates from the Internal Audit Department.',
  openGraph: {
    title: 'Publications & Downloads',
    description:
      'Audit reports, annual plans, policies and charters, and manuals and templates from the Internal Audit Department.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
