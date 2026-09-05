// JSON-LD structured-data builders (schema.org). Pure functions — unit-tested
// for shape; rendered via <script type="application/ld+json"> in pages.

import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { SITE_ORIGIN, DEFAULT_OG_IMAGE } from '@/lib/seo';
import type { RegistryProfile, TransparencySummary } from '@/lib/public-api';

export interface FaqItem {
  question: string;
  answer: string;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: SITE_NAME,
    alternateName: 'IAD',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`,
    description: SITE_DESCRIPTION,
    parentOrganization: {
      '@type': 'GovernmentOrganization',
      name: 'Office of the Head of Civil Service',
      alternateName: 'OHCS',
      url: 'https://www.ohcs.gov.gh',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GH',
      addressLocality: 'Accra',
    },
  };
}

export function personSchema(profile: RegistryProfile, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `${SITE_ORIGIN}/registry/${slug}`,
    jobTitle: profile.grade ?? 'Internal Auditor',
    worksFor: {
      '@type': 'GovernmentOrganization',
      name: profile.mda_name ?? SITE_NAME,
    },
    memberOf: {
      '@type': 'Organization',
      name: `Internal Audit Class Registry — ${SITE_NAME}`,
      url: `${SITE_ORIGIN}/registry`,
    },
    hasCredential: profile.credentials.map((cred) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: cred.body,
      name: cred.designation,
      ...(cred.year ? { dateCreated: String(cred.year) } : {}),
    })),
  };
}

export function transparencyDatasetSchema(summary: TransparencySummary | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Public Audit Findings Tracker — Aggregate Audit Statistics',
    description:
      'Aggregate statistics on audit findings raised and resolved across Ghana\'s Ministries, Departments and Agencies: totals, resolution rates, severity and category breakdowns, monthly trends, and audit-universe risk distribution. Aggregates only — no finding text or personal data.',
    url: `${SITE_ORIGIN}/transparency`,
    creator: {
      '@type': 'GovernmentOrganization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    temporalCoverage: summary?.trend.length
      ? `${summary.trend[0]!.month}/${summary.trend[summary.trend.length - 1]!.month}`
      : undefined,
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${SITE_ORIGIN}/api/public/transparency/summary`,
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${SITE_ORIGIN}/api/public/transparency/by-mda`,
      },
    ],
    keywords: [
      'internal audit',
      'Ghana',
      'MDAs',
      'audit findings',
      'resolution rate',
      'public accountability',
    ],
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
