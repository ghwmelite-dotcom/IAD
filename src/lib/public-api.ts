// Public (unauthenticated) API client for the transparency surface:
// /transparency, /registry and /verify. Backed by the read-only Pages
// Functions under functions/api/public/** (see docs/API-CONTRACT.md).
// Envelope: { data: T } on success, { error: { code, message } } on failure.

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TransparencyTotals {
  findings: number;
  open: number;
  closed: number;
  resolutionRate: number;
  engagements: number;
  mdasCovered: number;
}

export interface SeverityCount {
  severity: string;
  count: number;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface StatusCount {
  status: string;
  count: number;
}

export interface TrendPoint {
  month: string; // 'YYYY-MM'
  raised: number;
  closed: number;
}

export interface RiskHeatCell {
  likelihood: number; // 1-5
  impact: number; // 1-5
  count: number;
}

export interface TransparencySummary {
  totals: TransparencyTotals;
  bySeverity: SeverityCount[];
  byCategory: CategoryCount[];
  byStatus: StatusCount[];
  trend: TrendPoint[];
  riskHeat: RiskHeatCell[];
}

export interface MdaTransparency {
  mda_name: string;
  findings: number;
  closed: number;
  resolutionRate: number;
  openHigh: number;
}

export interface RegistryEntry {
  name: string;
  grade: string | null;
  mda_name: string | null;
  public_slug: string;
  verified: boolean;
  /** Not yet returned by GET /api/public/registry — rendered when available. */
  credentials?: { body: string }[];
}

export interface RegistryCredential {
  body: string;
  designation: string;
  year: number | null;
}

export interface LinkedCertificate {
  title: string;
  serial: string;
  verifyCode: string;
  issuedAt: string;
}

export interface RegistryProfile {
  name: string;
  grade: string | null;
  mda_name: string | null;
  verified: boolean;
  credentials: RegistryCredential[];
  cpdPoints: number;
  memberSince: string;
  /** Not yet returned by GET /api/public/registry/:slug — rendered when available. */
  certificates?: LinkedCertificate[];
}

export interface CertificateVerification {
  valid: boolean;
  title?: string;
  serial?: string;
  issuedAt?: string;
  auditorName?: string;
}

// ─── Errors ─────────────────────────────────────────────────────────────────

export class PublicApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = 'PublicApiError';
    this.code = code;
    this.status = status;
  }
}

interface ErrorEnvelope {
  error?: { code?: string; message?: string };
}

async function request<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`);
  } catch {
    throw new PublicApiError(
      'The public data service could not be reached.',
      'UNREACHABLE',
      0,
    );
  }

  const body: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const err = (body as ErrorEnvelope | null)?.error;
    throw new PublicApiError(
      err?.message ?? res.statusText,
      err?.code ?? 'UNKNOWN',
      res.status,
    );
  }

  return (body as { data: T }).data;
}

// ─── Transparency ───────────────────────────────────────────────────────────

export function fetchTransparencySummary(): Promise<TransparencySummary> {
  return request<TransparencySummary>('/api/public/transparency/summary');
}

export function fetchTransparencyByMda(): Promise<MdaTransparency[]> {
  return request<MdaTransparency[]>('/api/public/transparency/by-mda');
}

// ─── Registry ───────────────────────────────────────────────────────────────

export function searchRegistry(query?: string): Promise<RegistryEntry[]> {
  const q = query?.trim();
  return request<RegistryEntry[]>(
    q ? `/api/public/registry?q=${encodeURIComponent(q)}` : '/api/public/registry',
  );
}

export function fetchRegistryProfile(slug: string): Promise<RegistryProfile> {
  return request<RegistryProfile>(
    `/api/public/registry/${encodeURIComponent(slug)}`,
  );
}

// ─── Certificates ───────────────────────────────────────────────────────────

export function verifyCertificate(code: string): Promise<CertificateVerification> {
  return request<CertificateVerification>(
    `/api/public/certificates/verify/${encodeURIComponent(code.trim())}`,
  );
}

// ─── Formatting helpers ─────────────────────────────────────────────────────

/** 'financial_management' → 'Financial Management' */
export function formatLabel(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** '2026-03' → 'Mar 2026' */
export function formatMonth(month: string): string {
  const date = new Date(`${month}-01T00:00:00`);
  if (Number.isNaN(date.getTime())) return month;
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

/** ISO-8601 → '15 Jan 2026' */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
