import { NAV_ITEMS, AUDIT_UNITS } from '@/lib/constants';

export type SearchGroup = 'pages' | 'services' | 'audit-units' | 'publications';

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  group: SearchGroup;
}

const SERVICE_HREFS = new Set([
  '/services/special-audit',
  '/services/consultancy',
  '/services/report-fraud',
  '/services/rti',
  '/services/feedback',
]);

function fromNav(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const item of NAV_ITEMS) {
    entries.push({
      title: item.label,
      description: `Go to the ${item.label} page`,
      href: item.href,
      keywords: [],
      group: 'pages',
    });
    for (const child of item.children ?? []) {
      entries.push({
        title: child.label,
        description: child.description ?? `Go to the ${child.label} page`,
        href: child.href,
        keywords: [],
        group: SERVICE_HREFS.has(child.href) ? 'services' : 'pages',
      });
    }
  }
  // De-duplicate by href+title (parent and child can share an href).
  const seen = new Set<string>();
  return entries.filter((e) => {
    const key = `${e.href}|${e.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const PUBLICATION_ENTRIES: SearchEntry[] = [
  {
    title: 'Audit Reports',
    description: 'Annual consolidated and special audit reports published by the department',
    href: '/publications',
    keywords: ['report', 'findings', 'annual', 'consolidated', 'pdf'],
    group: 'publications',
  },
  {
    title: 'Annual Plans',
    description: 'Risk-based annual audit plans and training calendars',
    href: '/publications',
    keywords: ['plan', 'planning', 'training', 'calendar', 'risk-based'],
    group: 'publications',
  },
  {
    title: 'Policies & Charters',
    description: 'Internal Audit Charter, whistleblowing policy, and client service charter',
    href: '/publications',
    keywords: ['policy', 'charter', 'whistleblowing', 'governance'],
    group: 'publications',
  },
  {
    title: 'Manuals & Templates',
    description: 'Internal audit manuals, workpaper templates, and report style guides',
    href: '/publications',
    keywords: ['manual', 'template', 'workpaper', 'style guide'],
    group: 'publications',
  },
];

const KEY_PAGE_ENTRIES: SearchEntry[] = [
  {
    title: 'Transparency Dashboard',
    description: 'Live public dashboard of audit findings and resolution rates across MDAs',
    href: '/transparency',
    keywords: ['dashboard', 'findings', 'resolution', 'mda', 'open data'],
    group: 'pages',
  },
  {
    title: 'IAC Registry',
    description: 'Verified Internal Audit Class officers and their credentials',
    href: '/registry',
    keywords: ['auditor', 'credential', 'verified', 'officer', 'class', 'register'],
    group: 'pages',
  },
  {
    title: 'Verify Certificate',
    description: 'Check the authenticity of an IAD-issued certificate',
    href: '/verify',
    keywords: ['certificate', 'verify code', 'authenticity', 'serial'],
    group: 'pages',
  },
  {
    title: 'Track Submission',
    description: 'Check the status of your submission with your reference number',
    href: '/track',
    keywords: ['reference', 'status', 'progress', 'ohcs'],
    group: 'pages',
  },
  {
    title: 'Contact Us',
    description: 'Reach the Internal Audit Department by phone, email, or visit our offices',
    href: '/contact',
    keywords: ['phone', 'email', 'address', 'accra', 'office hours'],
    group: 'pages',
  },
  {
    title: 'Portal Login',
    description: 'Sign in to the Internal Audit Class portal',
    href: '/portal/login',
    keywords: ['login', 'sign in', 'portal', 'account', 'auditor'],
    group: 'pages',
  },
];

const AUDIT_UNIT_ENTRIES: SearchEntry[] = AUDIT_UNITS.map((unit) => ({
  title: unit.name,
  description: unit.description,
  href: `/audit-units/${unit.slug}`,
  keywords: [unit.shortName, 'iau', 'ministry', 'mda', 'audit unit'],
  group: 'audit-units',
}));

export const SEARCH_INDEX: SearchEntry[] = [
  ...fromNav(),
  ...KEY_PAGE_ENTRIES,
  ...PUBLICATION_ENTRIES,
  ...AUDIT_UNIT_ENTRIES,
];

export function searchSite(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter((entry) => {
    if (entry.title.toLowerCase().includes(q)) return true;
    if (entry.description.toLowerCase().includes(q)) return true;
    return entry.keywords.some((k) => k.toLowerCase().includes(q));
  });
}
