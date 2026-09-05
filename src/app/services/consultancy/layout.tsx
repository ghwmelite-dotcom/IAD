import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultancy Services',
  description:
    'Request advisory and consultancy services from the Internal Audit Department.',
  openGraph: {
    title: 'Consultancy Services',
    description:
      'Request advisory and consultancy services from the Internal Audit Department.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
