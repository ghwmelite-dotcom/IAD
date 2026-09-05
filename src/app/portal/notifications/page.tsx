'use client';

import { useCallback, useEffect, useState } from 'react';
import { CheckCheck } from 'lucide-react';
import {
  getNotifications,
  markNotificationsRead,
  type PortalNotification,
} from '@/lib/portal-api';
import { notificationText } from '@/components/portal/notifications-bell';
import { PageLoading, PageError, EmptyState } from '@/components/portal/page-states';
import { Button } from '@/components/ui/button';
import { formatDateShort, cn } from '@/lib/utils';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<PortalNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setNotifications(await getNotifications());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Runtime data fetch on mount — portal pages are client-rendered (static export).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const markAll = async () => {
    try {
      await markNotificationsRead({ all: true });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // Non-fatal; reload can retry.
    }
  };

  const markOne = async (n: PortalNotification) => {
    if (n.read) return;
    try {
      await markNotificationsRead({ ids: [n.id] });
      setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    } catch {
      // Non-fatal.
    }
  };

  if (loading) return <PageLoading rows={5} />;
  if (error) return <PageError message={error} onRetry={load} />;

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-text-muted">
          {unread} unread of {notifications.length}
        </p>
        {unread > 0 && (
          <Button size="sm" variant="secondary" onClick={markAll}>
            <CheckCheck className="h-4 w-4 mr-1.5" aria-hidden="true" />
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" hint="Assignments, new findings and overdue recommendations will show up here." />
      ) : (
        <ul className="bg-surface-card rounded-xl border border-border/60 shadow-card divide-y divide-border/40">
          {notifications.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => markOne(n)}
                className={cn(
                  'w-full text-left px-5 py-4 flex items-start gap-3 transition-colors hover:bg-primary/[0.03]',
                  !n.read && 'bg-primary/[0.04]',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', n.read ? 'bg-border' : 'bg-accent')}
                />
                <span className="min-w-0 flex-1">
                  <span className={cn('block text-sm leading-snug', n.read ? 'text-text-muted' : 'text-text font-medium')}>
                    {notificationText(n)}
                  </span>
                  <span className="block text-xs text-text-muted mt-1">
                    {n.type.replace(/_/g, ' ')} · {formatDateShort(n.created_at)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
