import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Knowledge Hub — Publications & Downloads',
  description:
    'Resource catalogue preview supporting audit practice and officer development. Publication records require departmental approval.',
  openGraph: {
    title: 'Knowledge Hub — Publications & Downloads',
    description:
      'Resource catalogue preview — publication records require departmental approval.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
