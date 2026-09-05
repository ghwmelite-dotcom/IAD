import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Audit Requests',
  description:
    'Request a special audit, risk assessment, or review of controls and administrative processes from the Internal Audit Department.',
  openGraph: {
    title: 'Special Audit Requests',
    description:
      'Request a special audit, risk assessment, or review of controls and administrative processes from the Internal Audit Department.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
