import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Prototype and sample records are not authoritative search results.
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children;
}
