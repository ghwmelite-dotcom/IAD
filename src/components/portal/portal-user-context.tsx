'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { PortalUser } from '@/lib/portal-api';

const PortalUserContext = createContext<PortalUser | null>(null);

export function PortalUserProvider({ user, children }: { user: PortalUser; children: ReactNode }) {
  return <PortalUserContext.Provider value={user}>{children}</PortalUserContext.Provider>;
}

/**
 * The signed-in portal user, provided by the portal shell layout.
 * Returns null only outside the shell (e.g. login page, tests).
 */
export function usePortalUser(): PortalUser | null {
  return useContext(PortalUserContext);
}
