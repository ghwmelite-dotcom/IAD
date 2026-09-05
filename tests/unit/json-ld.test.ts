import { describe, it, expect } from 'vitest';
import {
  faqPageSchema,
  organizationSchema,
  personSchema,
  transparencyDatasetSchema,
} from '@/lib/json-ld';
import type { RegistryProfile } from '@/lib/public-api';

const PROFILE: RegistryProfile = {
  name: 'Yaw Osei Frimpong',
  grade: 'Principal Internal Auditor',
  mda_name: 'Ministry of Finance',
  verified: true,
  credentials: [
    { body: 'FCCA', designation: 'Fellow of the Association of Chartered Certified Accountants', year: 2019 },
  ],
  cpdPoints: 42,
  memberSince: '2025-01-15T00:00:00.000Z',
};

describe('organizationSchema', () => {
  it('describes IAD as a GovernmentOrganization under OHCS', () => {
    const schema = organizationSchema();
    expect(schema['@type']).toBe('GovernmentOrganization');
    expect(schema.name).toBe('Internal Audit Department');
    expect(schema.parentOrganization.name).toBe('Office of the Head of Civil Service');
    expect(schema.url).toMatch(/^https:\/\//);
  });
});

describe('personSchema', () => {
  it('builds a Person schema containing the officer name', () => {
    const schema = personSchema(PROFILE, 'yaw-osei-frimpong');
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Yaw Osei Frimpong');
    expect(schema.jobTitle).toBe('Principal Internal Auditor');
    expect(schema.worksFor.name).toBe('Ministry of Finance');
    expect(schema.url).toContain('/registry/yaw-osei-frimpong');
  });

  it('maps verified credentials to EducationalOccupationalCredential entries', () => {
    const schema = personSchema(PROFILE, 'yaw-osei-frimpong');
    expect(schema.hasCredential).toHaveLength(1);
    expect(schema.hasCredential[0]!.credentialCategory).toBe('FCCA');
    expect(schema.hasCredential[0]!.dateCreated).toBe('2019');
  });

  it('falls back gracefully when grade and MDA are null', () => {
    const schema = personSchema({ ...PROFILE, grade: null, mda_name: null }, 'x');
    expect(schema.jobTitle).toBe('Internal Auditor');
    expect(schema.worksFor.name).toBe('Internal Audit Department');
  });
});

describe('transparencyDatasetSchema', () => {
  it('builds a Dataset schema pointing at the live JSON distributions', () => {
    const schema = transparencyDatasetSchema(null);
    expect(schema['@type']).toBe('Dataset');
    expect(schema.isAccessibleForFree).toBe(true);
    const urls = schema.distribution.map((d) => d.contentUrl);
    expect(urls.some((u) => u.includes('/api/public/transparency/summary'))).toBe(true);
    expect(urls.some((u) => u.includes('/api/public/transparency/by-mda'))).toBe(true);
  });

  it('derives temporalCoverage from the trend range when available', () => {
    const schema = transparencyDatasetSchema({
      totals: { findings: 0, open: 0, closed: 0, resolutionRate: 0, engagements: 0, mdasCovered: 0 },
      bySeverity: [],
      byCategory: [],
      byStatus: [],
      trend: [{ month: '2025-06', raised: 1, closed: 0 }, { month: '2026-05', raised: 2, closed: 1 }],
      riskHeat: [],
    });
    expect(schema.temporalCoverage).toBe('2025-06/2026-05');
  });
});

describe('faqPageSchema', () => {
  it('builds a valid FAQPage with one Question per item', () => {
    const schema = faqPageSchema([
      { question: 'How do I verify?', answer: 'Enter the code.' },
      { question: 'Is it free?', answer: 'Yes.' },
    ]);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]!).toEqual({
      '@type': 'Question',
      name: 'How do I verify?',
      acceptedAnswer: { '@type': 'Answer', text: 'Enter the code.' },
    });
  });
});
