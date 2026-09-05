//
// ─── AUDIT OPERATIONS PORTAL API CLIENT ─────────────────────────────────────
// Client-side fetch client for /api/portal/** (Cloudflare Pages Functions,
// cookie-backed sessions). Used exclusively from client components under
// src/app/portal — the site is a static export, so all data is fetched at
// runtime. Any 401 redirects to /portal/login.
//

// ─── Types (mirror functions/api/portal/** response shapes) ─────────────────

export type PortalRole = 'admin' | 'director' | 'manager' | 'auditor' | 'mda_liaison';

export interface PortalUser {
  id: string;
  email: string;
  name: string;
  role: PortalRole;
  mda_id: string | null;
}

export interface DashboardData {
  kpis: {
    findings: number;
    open: number;
    closed: number;
    resolutionRate: number;
    overdueRecommendations: number;
    engagements: number;
    activeEngagements: number;
  };
  bySeverity: Array<{ severity: string; count: number }>;
  byStatus: Array<{ status: string; count: number }>;
  recentActivity: Array<{
    id: string;
    action: string;
    entity: string;
    entity_id: string | null;
    created_at: string;
  }>;
}

export interface UniverseEntry {
  id: string;
  mda_name: string;
  unit_name: string;
  category: string;
  risk_likelihood: number;
  risk_impact: number;
  risk_score: number;
  last_audited_at: string | null;
  notes: string | null;
  created_at: string;
}

export type PlanStatus = 'draft' | 'submitted' | 'approved';
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type Priority = 'high' | 'medium' | 'low';
export type PlanItemStatus = 'planned' | 'in_progress' | 'done' | 'deferred';

export interface Plan {
  id: string;
  year: number;
  title: string;
  status: PlanStatus;
  created_by: string;
  created_at: string;
  item_count: number;
}

export interface PlanItem {
  id: string;
  plan_id: string;
  universe_id: string;
  quarter: Quarter;
  priority: Priority;
  status: PlanItemStatus;
  mda_name: string;
  unit_name: string;
  risk_likelihood: number;
  risk_impact: number;
  risk_score: number;
}

export interface PlanDetail extends Omit<Plan, 'item_count'> {
  items: PlanItem[];
}

export type EngagementPhase = 'planning' | 'fieldwork' | 'reporting' | 'follow_up' | 'closed';

export interface Engagement {
  id: string;
  code: string;
  title: string;
  universe_id: string;
  plan_item_id: string | null;
  phase: EngagementPhase;
  lead_auditor_id: string | null;
  start_date: string;
  end_date: string | null;
  overall_rating: string | null;
  created_at: string;
  mda_name: string;
  unit_name: string;
  lead_auditor_name: string | null;
}

export interface TeamMember {
  user_id: string;
  team_role: string;
  name: string;
  email: string;
}

export interface WorkingPaper {
  id: string;
  title: string;
  r2_key: string;
  uploaded_by: string;
  created_at: string;
}

export interface EngagementDetail extends Engagement {
  team: TeamMember[];
  papers: WorkingPaper[];
}

export type FindingSeverity = 'high' | 'medium' | 'low';
export type FindingStatus = 'open' | 'responded' | 'in_progress' | 'closed' | 'verified';

export interface Finding {
  id: string;
  engagement_id: string;
  universe_id: string;
  title: string;
  description: string;
  category: string;
  severity: FindingSeverity;
  condition: string | null;
  criteria: string | null;
  cause: string | null;
  effect: string | null;
  status: FindingStatus;
  closed_at: string | null;
  created_at: string;
  mda_name: string;
  unit_name: string;
  engagement_code: string;
}

export type RecommendationStatus = 'open' | 'in_progress' | 'implemented' | 'verified' | 'overdue';

export interface Recommendation {
  id: string;
  finding_id: string;
  text: string;
  owner: string;
  due_date: string;
  status: RecommendationStatus;
  created_at: string;
}

export interface ManagementResponse {
  id: string;
  finding_id: string;
  recommendation_id: string | null;
  respondent_name: string;
  mda_name: string;
  response_text: string;
  action_plan: string | null;
  evidence_r2_key: string | null;
  submitted_at: string;
}

export interface FindingDetail extends Finding {
  engagement_title: string;
  recommendations: Recommendation[];
  responses: ManagementResponse[];
}

export interface PortalNotification {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  read: boolean;
  created_at: string;
}

// ─── Role helpers ────────────────────────────────────────────────────────────

export const FULL_ACCESS_ROLES: PortalRole[] = ['admin', 'director', 'manager'];
export const INTERNAL_ROLES: PortalRole[] = ['admin', 'director', 'manager', 'auditor'];

export function hasFullAccess(role: PortalRole): boolean {
  return FULL_ACCESS_ROLES.includes(role);
}

/** Internal audit staff (all roles except external MDA liaisons). */
export function isInternalRole(role: PortalRole): boolean {
  return INTERNAL_ROLES.includes(role);
}

export const PORTAL_ROLE_LABELS: Record<PortalRole, string> = {
  admin: 'Administrator',
  director: 'Director',
  manager: 'Audit Manager',
  auditor: 'Auditor',
  mda_liaison: 'MDA Liaison',
};

// ─── Fetch client ────────────────────────────────────────────────────────────

export class PortalApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

interface ApiSuccess<T> {
  data: T;
}

function redirectToLogin(): void {
  if (typeof window === 'undefined') return;
  if (!window.location.pathname.startsWith('/portal/login')) {
    window.location.assign('/portal/login/');
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; formData?: FormData } = {},
): Promise<T> {
  const init: RequestInit = {
    method: options.method ?? 'GET',
    credentials: 'include',
  };

  if (options.formData) {
    // Let the browser set the multipart boundary.
    init.body = options.formData;
  } else if (options.body !== undefined) {
    init.headers = { 'Content-Type': 'application/json' };
    init.body = JSON.stringify(options.body);
  }

  const res = await fetch(path, init);

  if (res.status === 401) {
    redirectToLogin();
    throw new PortalApiError(401, 'AUTH_MISSING', 'authentication required');
  }

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as {
      error?: { code?: string; message?: string };
    } | null;
    throw new PortalApiError(
      res.status,
      err?.error?.code ?? 'UNKNOWN',
      err?.error?.message ?? res.statusText,
    );
  }

  const body = (await res.json()) as ApiSuccess<T>;
  return body.data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function portalLoginStart(email: string): Promise<{ sent: boolean }> {
  return request('/api/portal/auth/start', { method: 'POST', body: { email } });
}

export async function getPortalUser(): Promise<PortalUser | null> {
  try {
    return await request<PortalUser>('/api/portal/auth/me');
  } catch (err) {
    if (err instanceof PortalApiError && (err.status === 401 || err.status === 403)) return null;
    return null;
  }
}

export async function portalLogout(): Promise<void> {
  try {
    await request('/api/portal/auth/logout', { method: 'POST' });
  } catch {
    // Best effort — the cookie expires server-side regardless.
  }
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export async function getDashboard(): Promise<DashboardData> {
  return request('/api/portal/dashboard');
}

// ─── Universe ────────────────────────────────────────────────────────────────

export interface UniverseInput {
  mda_name: string;
  unit_name: string;
  category: string;
  risk_likelihood: number;
  risk_impact: number;
  last_audited_at?: string;
  notes?: string;
}

export async function getUniverse(): Promise<UniverseEntry[]> {
  return request('/api/portal/universe');
}

export async function createUniverseEntry(input: UniverseInput): Promise<{ id: string }> {
  return request('/api/portal/universe', { method: 'POST', body: input });
}

export async function updateUniverseEntry(
  id: string,
  input: Partial<UniverseInput>,
): Promise<{ id: string }> {
  return request(`/api/portal/universe/${id}`, { method: 'PATCH', body: input });
}

// ─── Plans ───────────────────────────────────────────────────────────────────

export async function getPlans(): Promise<Plan[]> {
  return request('/api/portal/plans');
}

export async function createPlan(input: {
  year: number;
  title: string;
  status?: PlanStatus;
}): Promise<{ id: string }> {
  return request('/api/portal/plans', { method: 'POST', body: input });
}

export async function getPlan(id: string): Promise<PlanDetail> {
  return request(`/api/portal/plans/${id}`);
}

export async function updatePlan(
  id: string,
  input: Partial<{ year: number; title: string; status: PlanStatus }>,
): Promise<{ id: string }> {
  return request(`/api/portal/plans/${id}`, { method: 'PATCH', body: input });
}

export async function addPlanItem(
  planId: string,
  input: { universe_id: string; quarter: Quarter; priority: Priority; status?: PlanItemStatus },
): Promise<{ id: string }> {
  return request(`/api/portal/plans/${planId}/items`, { method: 'POST', body: input });
}

export async function updatePlanItem(
  id: string,
  input: Partial<{ quarter: Quarter; priority: Priority; status: PlanItemStatus }>,
): Promise<{ id: string }> {
  return request(`/api/portal/plan-items/${id}`, { method: 'PATCH', body: input });
}

// ─── Engagements ─────────────────────────────────────────────────────────────

export async function getEngagements(): Promise<Engagement[]> {
  return request('/api/portal/engagements');
}

export async function createEngagement(input: {
  title: string;
  universe_id: string;
  plan_item_id?: string;
  lead_auditor_id?: string;
  start_date: string;
}): Promise<{ id: string; code: string }> {
  return request('/api/portal/engagements', { method: 'POST', body: input });
}

export async function getEngagement(id: string): Promise<EngagementDetail> {
  return request(`/api/portal/engagements/${id}`);
}

export async function updateEngagement(
  id: string,
  input: Partial<{
    title: string;
    phase: EngagementPhase;
    lead_auditor_id: string | null;
    start_date: string;
    end_date: string | null;
    overall_rating: string | null;
  }>,
): Promise<{ id: string }> {
  return request(`/api/portal/engagements/${id}`, { method: 'PATCH', body: input });
}

export async function addTeamMember(
  engagementId: string,
  input: { user_id: string; team_role: string },
): Promise<{ engagement_id: string; user_id: string }> {
  return request(`/api/portal/engagements/${engagementId}/team`, { method: 'POST', body: input });
}

export async function uploadWorkingPaper(
  engagementId: string,
  title: string,
  file: File,
): Promise<{ id: string; r2_key: string }> {
  const formData = new FormData();
  formData.set('title', title);
  formData.set('file', file);
  return request(`/api/portal/engagements/${engagementId}/papers`, {
    method: 'POST',
    formData,
  });
}

// ─── Findings ────────────────────────────────────────────────────────────────

export async function getFindings(): Promise<Finding[]> {
  return request('/api/portal/findings');
}

export async function createFinding(input: {
  engagement_id: string;
  title: string;
  description: string;
  category: string;
  severity: FindingSeverity;
  condition?: string;
  criteria?: string;
  cause?: string;
  effect?: string;
}): Promise<{ id: string }> {
  return request('/api/portal/findings', { method: 'POST', body: input });
}

export async function getFinding(id: string): Promise<FindingDetail> {
  return request(`/api/portal/findings/${id}`);
}

export async function updateFinding(
  id: string,
  input: Partial<{
    title: string;
    description: string;
    category: string;
    severity: FindingSeverity;
    condition: string | null;
    criteria: string | null;
    cause: string | null;
    effect: string | null;
    status: FindingStatus;
  }>,
): Promise<{ id: string }> {
  return request(`/api/portal/findings/${id}`, { method: 'PATCH', body: input });
}

export async function addRecommendation(
  findingId: string,
  input: { text: string; owner: string; due_date: string },
): Promise<{ id: string }> {
  return request(`/api/portal/findings/${findingId}/recommendations`, {
    method: 'POST',
    body: input,
  });
}

export async function updateRecommendation(
  id: string,
  input: Partial<{
    text: string;
    owner: string;
    due_date: string;
    status: RecommendationStatus;
  }>,
): Promise<{ id: string }> {
  return request(`/api/portal/recommendations/${id}`, { method: 'PATCH', body: input });
}

export async function addManagementResponse(
  findingId: string,
  input: {
    recommendation_id?: string;
    respondent_name: string;
    response_text: string;
    action_plan?: string;
    evidence_r2_key?: string;
  },
): Promise<{ id: string }> {
  return request(`/api/portal/findings/${findingId}/responses`, {
    method: 'POST',
    body: input,
  });
}

// ─── Notifications ───────────────────────────────────────────────────────────

export async function getNotifications(): Promise<PortalNotification[]> {
  return request('/api/portal/notifications');
}

export async function markNotificationsRead(input: { ids: string[] } | { all: true }): Promise<void> {
  await request('/api/portal/notifications/read', { method: 'POST', body: input });
}

// ─── Derived helpers ─────────────────────────────────────────────────────────

const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days a finding has been open (created_at → closed_at/now). */
export function findingAgeDays(finding: Pick<Finding, 'created_at' | 'closed_at'>): number {
  const start = new Date(finding.created_at).getTime();
  const end = finding.closed_at ? new Date(finding.closed_at).getTime() : Date.now();
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  return Math.max(0, Math.floor((end - start) / DAY_MS));
}

/**
 * Build a 12-month raised-vs-closed series from the (role-scoped) findings
 * list. The dashboard endpoint ships no trend series, so the chart derives
 * it client-side from created_at / closed_at.
 */
export function buildMonthlyTrend(
  findings: Array<Pick<Finding, 'created_at' | 'closed_at'>>,
): Array<{ month: string; raised: number; closed: number }> {
  const now = new Date();
  const buckets: Array<{ key: string; month: string; raised: number; closed: number }> = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const month = d.toLocaleDateString('en-GH', { month: 'short' });
    buckets.push({ key, month, raised: 0, closed: 0 });
  }
  const byKey = new Map(buckets.map((b) => [b.key, b]));

  for (const f of findings) {
    const created = new Date(f.created_at);
    if (!Number.isNaN(created.getTime())) {
      const key = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}`;
      const bucket = byKey.get(key);
      if (bucket) bucket.raised += 1;
    }
    if (f.closed_at) {
      const closed = new Date(f.closed_at);
      if (!Number.isNaN(closed.getTime())) {
        const key = `${closed.getFullYear()}-${String(closed.getMonth() + 1).padStart(2, '0')}`;
        const bucket = byKey.get(key);
        if (bucket) bucket.closed += 1;
      }
    }
  }

  return buckets.map(({ month, raised, closed }) => ({ month, raised, closed }));
}
