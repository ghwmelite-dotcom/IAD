import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knowledge Hub — Publications & Downloads',
  description:
    'Manuals, templates, standards, circulars, guidelines, reports, forms and policies from the Internal Audit Department — searchable and free to download.',
  openGraph: {
    title: 'Knowledge Hub — Publications & Downloads',
    description:
      'Manuals, templates, standards, circulars, guidelines, reports, forms and policies from the Internal Audit Department.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
