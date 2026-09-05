import { Badge, type BadgeProps } from '@/components/ui/badge';
import type {
  FindingSeverity,
  FindingStatus,
  EngagementPhase,
  PlanStatus,
  PlanItemStatus,
  Priority,
  RecommendationStatus,
} from '@/lib/portal-api';

const SEVERITY_VARIANT: Record<FindingSeverity, BadgeProps['variant']> = {
  high: 'error',
  medium: 'warning',
  low: 'info',
};

const FINDING_STATUS_VARIANT: Record<FindingStatus, BadgeProps['variant']> = {
  open: 'error',
  responded: 'info',
  in_progress: 'warning',
  closed: 'success',
  verified: 'success',
};

const PHASE_VARIANT: Record<EngagementPhase, BadgeProps['variant']> = {
  planning: 'info',
  fieldwork: 'warning',
  reporting: 'accent',
  follow_up: 'warning',
  closed: 'success',
};

const PLAN_STATUS_VARIANT: Record<PlanStatus, BadgeProps['variant']> = {
  draft: 'default',
  submitted: 'warning',
  approved: 'success',
};

const PLAN_ITEM_STATUS_VARIANT: Record<PlanItemStatus, BadgeProps['variant']> = {
  planned: 'info',
  in_progress: 'warning',
  done: 'success',
  deferred: 'default',
};

const RECOMMENDATION_STATUS_VARIANT: Record<RecommendationStatus, BadgeProps['variant']> = {
  open: 'error',
  in_progress: 'warning',
  implemented: 'info',
  verified: 'success',
  overdue: 'error',
};

const PRIORITY_VARIANT: Record<Priority, BadgeProps['variant']> = {
  high: 'error',
  medium: 'warning',
  low: 'info',
};

function label(value: string): string {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SeverityBadge({ severity }: { severity: FindingSeverity }) {
  return <Badge variant={SEVERITY_VARIANT[severity]}>{label(severity)}</Badge>;
}

export function FindingStatusBadge({ status }: { status: FindingStatus }) {
  return <Badge variant={FINDING_STATUS_VARIANT[status]}>{label(status)}</Badge>;
}

export function PhaseBadge({ phase }: { phase: EngagementPhase }) {
  return <Badge variant={PHASE_VARIANT[phase]}>{label(phase)}</Badge>;
}

export function PlanStatusBadge({ status }: { status: PlanStatus }) {
  return <Badge variant={PLAN_STATUS_VARIANT[status]}>{label(status)}</Badge>;
}

export function PlanItemStatusBadge({ status }: { status: PlanItemStatus }) {
  return <Badge variant={PLAN_ITEM_STATUS_VARIANT[status]}>{label(status)}</Badge>;
}

export function RecommendationStatusBadge({ status }: { status: RecommendationStatus }) {
  return <Badge variant={RECOMMENDATION_STATUS_VARIANT[status]}>{label(status)}</Badge>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge variant={PRIORITY_VARIANT[priority]}>{label(priority)}</Badge>;
}
