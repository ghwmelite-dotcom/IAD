import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Submission',
  description:
    'Check the status of a submission made to the Internal Audit Department using your reference number.',
  openGraph: {
    title: 'Track Submission',
    description:
      'Check the status of a submission made to the Internal Audit Department using your reference number.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
