import { DEPARTMENT_DESCRIPTION } from '@/lib/department-content';
import type { NavItem, Directorate, SubmissionStatus } from '@/types';

// ─── Site Metadata ────────────────────────────────────────────────────────────

export const SITE_NAME = 'Internal Audit Department';
export const SITE_SHORT_NAME = 'IAD';
export const SITE_URL = 'https://iad.ohcsghana.org';
export const SITE_DESCRIPTION = DEPARTMENT_DESCRIPTION;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Mandate & Services', href: '/about', icon: 'Shield', description: 'Our mandate and the assurance services we provide' },
      { label: 'Vision', href: '/about/vision', icon: 'Eye', description: 'Serving OHCS to achieve its mandate for the Internal Audit Class' },
      { label: 'Functions', href: '/about/functions', icon: 'ClipboardCheck', description: 'What the department does for the Internal Audit Class' },
      { label: 'Leadership', href: '/about/leadership', icon: 'Users', description: 'The Director of the Internal Audit Department' },
      { label: 'Organisational Structure', href: '/about/structure', icon: 'GitBranch', description: 'How the Internal Audit Department is organised' },
    ],
  },
  { label: 'Audit Units', href: '/audit-units' },
  {
    label: 'Transparency',
    href: '/transparency',
    children: [
      { label: 'Audit Findings Tracker', href: '/transparency', icon: 'FileSearch', description: 'Prototype findings dashboard — demonstration data' },
      { label: 'IAC Registry', href: '/registry', icon: 'Users', description: 'Prototype Internal Audit Class registry — records awaiting validation' },
      { label: 'Verify Certificate', href: '/verify', icon: 'Shield', description: 'Preview the certificate record checker' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Special Audit Requests', href: '/services/special-audit', icon: 'FileSearch', description: 'Request a special audit or risk assessment' },
      { label: 'Consultancy', href: '/services/consultancy', icon: 'MessageSquare', description: 'Request advisory and consultancy services' },
      { label: 'Report Fraud / Whistleblowing', href: '/services/report-fraud', icon: 'ShieldAlert', description: 'Reporting channel preview — optional contact fields' },
      { label: 'Right to Information', href: '/services/rti', icon: 'FileText', description: 'Submit RTI requests for public records' },
      { label: 'Feedback', href: '/services/feedback', icon: 'Send', description: 'Share your feedback to help us improve' },
      { label: 'Track Submission', href: '/track', icon: 'Search', description: 'Check the status of your submission' },
    ],
  },
  {
    label: 'News & Events',
    href: '/news',
    children: [
      { label: 'News', href: '/news', icon: 'Newspaper', description: 'Latest announcements and updates from the department' },
      { label: 'Events', href: '/events', icon: 'Calendar', description: 'Upcoming workshops, training, and ceremonies' },
      { label: 'Publications', href: '/publications', icon: 'FileText', description: 'Audit reports, annual plans, policies, and manuals' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

// ─── Audit Units (placeholder directory of Internal Audit Units in MDAs) ──────
// TODO(rebrand): replace with the real, current list of Internal Audit Units.

export const AUDIT_UNITS: Directorate[] = [
  {
    slug: 'ministry-of-finance-iau',
    name: 'Ministry of Finance Internal Audit Unit',
    shortName: 'MoF IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'Wallet',
  },
  {
    slug: 'ministry-of-health-iau',
    name: 'Ministry of Health Internal Audit Unit',
    shortName: 'MoH IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'HeartPulse',
  },
  {
    slug: 'ministry-of-education-iau',
    name: 'Ministry of Education Internal Audit Unit',
    shortName: 'MoE IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'GraduationCap',
  },
  {
    slug: 'ministry-of-food-agriculture-iau',
    name: 'Ministry of Food & Agriculture Internal Audit Unit',
    shortName: 'MoFA IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'Wheat',
  },
  {
    slug: 'ministry-of-local-government-iau',
    name: 'Ministry of Local Government, Decentralisation & Rural Development Internal Audit Unit',
    shortName: 'MLGDRD IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'Landmark',
  },
  {
    slug: 'ministry-of-works-housing-iau',
    name: 'Ministry of Works & Housing Internal Audit Unit',
    shortName: 'MWH IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'Building2',
  },
  {
    slug: 'ministry-of-transport-iau',
    name: 'Ministry of Transport Internal Audit Unit',
    shortName: 'MoT IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'Truck',
  },
  {
    slug: 'ministry-of-interior-iau',
    name: 'Ministry of the Interior Internal Audit Unit',
    shortName: 'MoI IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'Shield',
  },
  {
    slug: 'ministry-of-justice-iau',
    name: 'Ministry of Justice & Attorney-General\'s Department Internal Audit Unit',
    shortName: 'MoJAGD IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'Scale',
  },
  {
    slug: 'ministry-of-energy-iau',
    name: 'Ministry of Energy Internal Audit Unit',
    shortName: 'MoEn IAU',
    description: 'Illustrative MDA directory entry. An approved current unit profile, remit and contact details have not yet been supplied.',
    icon: 'Zap',
  },
];

// ─── Submission Status Labels & Colours ───────────────────────────────────────

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  received: 'Received',
  under_review: 'Under Review',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const SUBMISSION_STATUS_COLORS: Record<SubmissionStatus, string> = {
  received: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-orange-100 text-orange-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-600',
};
