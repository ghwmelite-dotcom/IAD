import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report Fraud / Whistleblowing',
  description:
    'Preview the reporting interface supporting the prevention and detection of abuse and waste. Sensitive reporting is not yet activated.',
  openGraph: {
    title: 'Report Fraud / Whistleblowing',
    description:
      'Preview the reporting interface supporting the prevention and detection of abuse and waste. Sensitive reporting is not yet activated.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
