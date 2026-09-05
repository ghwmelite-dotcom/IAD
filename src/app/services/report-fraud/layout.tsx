import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report Fraud / Whistleblowing',
  description:
    'Report suspected fraud, abuse, or waste to the Internal Audit Department — anonymously if you wish. Whistleblowers are protected under Act 720.',
  openGraph: {
    title: 'Report Fraud / Whistleblowing',
    description:
      'Report suspected fraud, abuse, or waste to the Internal Audit Department — anonymously if you wish. Whistleblowers are protected under Act 720.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
