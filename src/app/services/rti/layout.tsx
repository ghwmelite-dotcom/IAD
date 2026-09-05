import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Right to Information',
  description:
    'Submit a Right to Information (RTI) request for public records held by the Internal Audit Department.',
  openGraph: {
    title: 'Right to Information',
    description:
      'Submit a Right to Information (RTI) request for public records held by the Internal Audit Department.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
