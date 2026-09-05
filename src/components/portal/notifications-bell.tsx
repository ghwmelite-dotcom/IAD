'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, CheckCheck } from 'lucide-react';
import type { PortalNotification } from '@/lib/portal-api';
import { getNotifications, markNotificationsRead } from '@/lib/portal-api';
import { formatDateShort } from '@/lib/utils';

export function notificationText(n: PortalNotification): string {
  const p = n.payload as Record<string, string | undefined>;
  switch (n.type) {
    case 'engagement_assigned':
      return `Assigned to ${p.code ?? 'an engagement'}${p.title ? ` — ${p.title}` : ''}${p.role ? ` (${p.role})` : ''}`;
    case 'finding_assigned':
      return `New finding${p.title ? `: ${p.title}` : ''}`;
    case 'response_submitted':
      return `${p.mda_name ?? 'An MDA'} responded${p.finding_title ? ` to: ${p.finding_title}` : ''}`;
    case 'recommendation_overdue':
      return 'A recommendation is now overdue';
    default:
      return n.type.replace(/_/g, ' ');
  }
}

interface NotificationsBellProps {
  /** Pre-fetched notifications from the shell; the bell stays in sync. */
  notifications: PortalNotification[];
  onChanged: (next: PortalNotification[]) => void;
}

export function NotificationsBell({ notifications, onChanged }: NotificationsBellProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const markAll = async () => {
    try {
      await markNotificationsRead({ all: true });
      onChanged(notifications.map((n) => ({ ...n, read: true })));
    } catch {
      // Non-fatal; the page view can retry.
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ''}`}
        aria-expanded={open}
        className="relative w-9 h-9 rounded-xl bg-black/[0.04] flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/5 transition-colors"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-0.5 bg-kente-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-surface-card rounded-xl border border-border/60 shadow-elevated z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <p className="text-sm font-semibold text-primary-dark">Notifications</p>
            {unread > 0 && (
              <button
                onClick={markAll}
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Mark all read
              </button>
            )}
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {notifications.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-text-muted">No notifications yet.</li>
            )}
            {notifications.slice(0, 8).map((n) => (
              <li
                key={n.id}
                className={`px-4 py-3 border-b border-border/40 last:border-0 text-sm ${n.read ? 'text-text-muted' : 'text-text bg-primary/[0.03]'}`}
              >
                <p className="leading-snug">{notificationText(n)}</p>
                <p className="text-[11px] text-text-muted mt-1">{formatDateShort(n.created_at)}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/portal/notifications"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-center text-xs font-semibold text-primary hover:bg-primary/5 border-t border-border/60"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}

/** Fetch helper used by the shell and the notifications page. */
export async function fetchNotifications(): Promise<PortalNotification[]> {
  return getNotifications();
}
