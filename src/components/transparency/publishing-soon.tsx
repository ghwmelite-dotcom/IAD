import { CloudOff, RefreshCw } from 'lucide-react';

interface PublishingSoonProps {
  onRetry?: () => void;
}

/**
 * Friendly fallback when the public data service is unreachable.
 * Deliberately not styled as an error — the transparency feed is new and
 * may simply not be publishing yet.
 */
export function PublishingSoon({ onRetry }: PublishingSoonProps) {
  return (
    <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl border-2 border-dashed border-border/50 p-12">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
        <CloudOff className="h-7 w-7 text-white" aria-hidden="true" />
      </div>
      <h3 className="font-display text-2xl font-bold text-primary-dark mb-3">
        Data publishes soon
      </h3>
      <p className="text-base text-text-muted leading-relaxed mb-6">
        The live transparency feed is being prepared and is not reachable right now.
        Aggregate audit statistics will appear here as soon as publishing begins —
        please check back shortly.
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary/5 border-2 border-primary/10 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  );
}
