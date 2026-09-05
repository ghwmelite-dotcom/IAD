import type { NavItem, Directorate, SubmissionStatus } from '@/types';

// ─── Site Metadata ────────────────────────────────────────────────────────────

export const SITE_NAME = 'Internal Audit Department';
export const SITE_SHORT_NAME = 'IAD';
export const SITE_URL = 'https://iad.ohcsghana.org';
export const SITE_DESCRIPTION =
  'The Internal Audit Department of the Office of the Head of the Civil Service provides independent assurance, audit coordination, and advisory services that strengthen accountability, risk management, and compliance across Ghana\'s Civil Service.';

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
      { label: 'Leadership', href: '/about/leadership', icon: 'Users', description: 'The Director and senior leadership of the department' },
      { label: 'Organisational Structure', href: '/about/structure', icon: 'GitBranch', description: 'How the Internal Audit Department is organised' },
    ],
  },
  { label: 'Audit Units', href: '/audit-units' },
  {
    label: 'Transparency',
    href: '/transparency',
    children: [
      { label: 'Audit Findings Tracker', href: '/transparency', icon: 'FileSearch', description: 'Live public dashboard of audit findings and resolution rates across MDAs' },
      { label: 'IAC Registry', href: '/registry', icon: 'Users', description: 'Verified Internal Audit Class officers and their credentials' },
      { label: 'Verify Certificate', href: '/verify', icon: 'Shield', description: 'Check the authenticity of an IAD-issued certificate' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Special Audit Requests', href: '/services/special-audit', icon: 'FileSearch', description: 'Request a special audit or risk assessment' },
      { label: 'Consultancy', href: '/services/consultancy', icon: 'MessageSquare', description: 'Request advisory and consultancy services' },
      { label: 'Report Fraud / Whistleblowing', href: '/services/report-fraud', icon: 'ShieldAlert', description: 'Report fraud, abuse, or waste — anonymously if you wish' },
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
    description:
      'Provides independent assurance over financial management, budgeting, and control processes at the Ministry of Finance, safeguarding public funds and supporting compliance with applicable laws and regulations.',
    icon: 'Wallet',
  },
  {
    slug: 'ministry-of-health-iau',
    name: 'Ministry of Health Internal Audit Unit',
    shortName: 'MoH IAU',
    description:
      'Delivers audit and advisory services across the Ministry of Health, reviewing controls over health sector resources, procurement, and programme delivery.',
    icon: 'HeartPulse',
  },
  {
    slug: 'ministry-of-education-iau',
    name: 'Ministry of Education Internal Audit Unit',
    shortName: 'MoE IAU',
    description:
      'Assures the economical, effective, and efficient use of education sector resources through risk-based audits, compliance reviews, and advisory support.',
    icon: 'GraduationCap',
  },
  {
    slug: 'ministry-of-food-agriculture-iau',
    name: 'Ministry of Food & Agriculture Internal Audit Unit',
    shortName: 'MoFA IAU',
    description:
      'Reviews controls over agricultural programmes, subsidies, and assets to ensure resources reach their intended purposes.',
    icon: 'Wheat',
  },
  {
    slug: 'ministry-of-local-government-iau',
    name: 'Ministry of Local Government, Decentralisation & Rural Development Internal Audit Unit',
    shortName: 'MLGDRD IAU',
    description:
      'Provides assurance over decentralised administration, inter-governmental transfers, and local governance programmes.',
    icon: 'Landmark',
  },
  {
    slug: 'ministry-of-works-housing-iau',
    name: 'Ministry of Works & Housing Internal Audit Unit',
    shortName: 'MWH IAU',
    description:
      'Audits infrastructure projects, contracts, and public housing programmes to strengthen value-for-money and contract compliance.',
    icon: 'Building2',
  },
  {
    slug: 'ministry-of-transport-iau',
    name: 'Ministry of Transport Internal Audit Unit',
    shortName: 'MoT IAU',
    description:
      'Reviews financial, managerial, and operational activities across the transport sector to promote accountability and safeguard assets.',
    icon: 'Truck',
  },
  {
    slug: 'ministry-of-interior-iau',
    name: 'Ministry of the Interior Internal Audit Unit',
    shortName: 'MoI IAU',
    description:
      'Provides assurance over security sector spending, stores, and administrative processes within the Ministry of the Interior.',
    icon: 'Shield',
  },
  {
    slug: 'ministry-of-justice-iau',
    name: 'Ministry of Justice & Attorney-General\'s Department Internal Audit Unit',
    shortName: 'MoJAGD IAU',
    description:
      'Supports compliance with laws, regulations, and procedures through audits of the justice sector\'s financial and operational activities.',
    icon: 'Scale',
  },
  {
    slug: 'ministry-of-energy-iau',
    name: 'Ministry of Energy Internal Audit Unit',
    shortName: 'MoEn IAU',
    description:
      'Undertakes risk assessment, special audits, and controls reviews across energy sector programmes and state agencies.',
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
