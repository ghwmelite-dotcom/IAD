import { AlertTriangle } from 'lucide-react';

// Marks an admin page that still renders mock/sample data so testers
// don't mistake the figures for live data. Pages with a working backend
// (e.g. /admin/registry, Settings → Users) are live-wired instead and
// do not carry this banner.

export function DemoBanner({ message }: { message?: string }) {
  return (
    <div
      role="status"
      aria-label="Preview mode"
      className="mb-4 flex items-center gap-3 rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-900"
    >
      <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span className="font-semibold">Preview</span>
      <span className="text-amber-800">
        {message ?? 'Sample data — this page is not yet wired to live data.'}
      </span>
    </div>
  );
}
