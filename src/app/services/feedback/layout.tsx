import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback',
  description:
    'Share your feedback to help the Internal Audit Department improve its services.',
  openGraph: {
    title: 'Feedback',
    description:
      'Share your feedback to help the Internal Audit Department improve its services.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
