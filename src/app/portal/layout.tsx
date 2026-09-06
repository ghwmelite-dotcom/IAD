'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  getPortalUser,
  portalLogout,
  getNotifications,
  PORTAL_ROLE_LABELS,
  type PortalUser,
  type PortalNotification,
} from '@/lib/portal-api';
import { PortalSidebar, PORTAL_NAV_ITEMS } from '@/components/portal/portal-sidebar';
import { NotificationsBell } from '@/components/portal/notifications-bell';
import { PortalUserProvider } from '@/components/portal/portal-user-context';

const ROLE_BADGE_COLORS: Record<string, string> = {
  admin: 'bg-red-100 text-red-800',
  director: 'bg-primary/10 text-primary',
  manager: 'bg-emerald-100 text-emerald-800',
  auditor: 'bg-amber-100 text-amber-800',
  mda_liaison: 'bg-blue-100 text-blue-800',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<PortalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState<PortalNotification[]>([]);

  const isLoginPage = pathname === '/portal/login' || pathname === '/portal/login/';

  // Hide public marketing header/footer for all portal pages.
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    return () => {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  useEffect(() => {
    if (isLoginPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    getPortalUser().then((u) => {
      if (!u) {
        router.replace('/portal/login');
      } else {
        setUser(u);
        getNotifications()
          .then(setNotifications)
          .catch(() => setNotifications([]));
      }
      setLoading(false);
    });
  }, [isLoginPage, router]);

  const handleLogout = useCallback(async () => {
    await portalLogout();
    router.replace('/portal/login');
  }, [router]);

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-surface flex items-center justify-center">
        <div className="text-center">
          <Image
            src="/images/ohcs-crest.png"
            alt="OHCS"
            width={48}
            height={48}
            className="object-contain mx-auto mb-4 opacity-0"
            style={{ width: 'auto', height: 48, animation: 'hero-reveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards' }}
          />
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted text-sm">Loading audit portal…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-surface">
      <PortalSidebar
        userName={user.name}
        userEmail={user.email}
        role={user.role}
        onLogout={handleLogout}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <div
        className={cn(
          'flex-1 flex flex-col min-h-screen overflow-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          collapsed ? 'lg:ml-[76px]' : 'lg:ml-72',
        )}
      >
        {/* ── Top bar ── */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-border/30 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src="/images/ohcs-crest.png"
              alt="OHCS"
              width={32}
              height={32}
              className="object-contain lg:hidden shrink-0"
              style={{ width: 'auto', height: 32 }}
            />
            <div className="min-w-0">
              <h1 className="text-xl font-display font-bold text-primary-dark truncate">
                {getPageTitle(pathname)}
              </h1>
              <p className="text-xs text-text-muted mt-0.5 hidden sm:block">{getPageSubtitle(pathname)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <NotificationsBell notifications={notifications} onChanged={setNotifications} />
            <div className="w-px h-8 bg-border/40" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-primary-dark">{user.name}</p>
                <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', ROLE_BADGE_COLORS[user.role])}>
                  {PORTAL_ROLE_LABELS[user.role]}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* ── Mobile nav (sidebar is hidden below lg) ── */}
        <nav aria-label="Portal navigation" className="lg:hidden flex gap-2 px-4 py-3 overflow-x-auto border-b border-border/30 bg-white/60">
          {PORTAL_NAV_ITEMS.filter((item) => {
            if ('liaisonOnly' in item && item.liaisonOnly) return user.role === 'mda_liaison';
            if (item.internal) return user.role !== 'mda_liaison';
            return true;
          }).map((item) => {
            const active =
              item.href === '/portal'
                ? pathname === '/portal' || pathname === '/portal/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface-card text-text-muted border-border hover:text-primary',
                )}
              >
                <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-8">
          <PortalUserProvider user={user}>{children}</PortalUserProvider>
        </main>

        <footer className="px-4 sm:px-8 py-4 border-t border-border/20 text-xs text-text-muted/40 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} Internal Audit Department — Audit Operations Portal</span>
          <span>Restricted to authorised users</span>
        </footer>
      </div>
    </div>
  );
}

function getPageTitle(pathname: string): string {
  const p = pathname.replace(/\/$/, '');
  const map: Record<string, string> = {
    '/portal': 'Dashboard',
    '/portal/universe': 'Audit Universe',
    '/portal/plans': 'Annual Audit Plans',
    '/portal/plans/detail': 'Plan Detail',
    '/portal/engagements': 'Engagements',
    '/portal/engagements/detail': 'Engagement Detail',
    '/portal/findings': 'Findings Tracker',
    '/portal/findings/detail': 'Finding Detail',
    '/portal/my-mda': 'My MDA',
    '/portal/knowledge': 'Knowledge Hub',
    '/portal/notifications': 'Notifications',
  };
  return map[p] ?? 'Audit Portal';
}

function getPageSubtitle(pathname: string): string {
  const p = pathname.replace(/\/$/, '');
  const map: Record<string, string> = {
    '/portal': 'Operational overview of audit activity',
    '/portal/universe': 'Auditable entities and risk assessment',
    '/portal/plans': 'Annual risk-based audit planning',
    '/portal/engagements': 'Audit engagements and fieldwork',
    '/portal/findings': 'Track findings, recommendations and resolution',
    '/portal/my-mda': 'Findings and management responses for your MDA',
    '/portal/knowledge': 'Manuals, templates, standards and circulars',
    '/portal/notifications': 'Your alerts and assignments',
  };
  return map[p] ?? '';
}
