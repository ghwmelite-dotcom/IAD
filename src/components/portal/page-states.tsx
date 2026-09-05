import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function PageLoading({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-label="Loading">
      <Skeleton className="h-8 w-1/3" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

export function PageError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="bg-error/5 border border-error/20 rounded-xl p-6 flex items-start gap-3" role="alert">
      <AlertCircle className="h-5 w-5 text-error shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-semibold text-error">Something went wrong</p>
        <p className="text-sm text-text-muted mt-1">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="mt-3 text-sm font-semibold text-primary hover:underline">
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="bg-surface-card rounded-xl border border-border/60 shadow-card p-10 text-center">
      <p className="font-display font-semibold text-primary-dark">{title}</p>
      {hint && <p className="text-sm text-text-muted mt-1">{hint}</p>}
    </div>
  );
}
