// ISO-8601 timestamp helper for the audit-ops tables (0012+), which store
// dates as ISO TEXT per docs/API-CONTRACT.md ("Dates ISO-8601").

export function nowIso(): string {
  return new Date().toISOString();
}
