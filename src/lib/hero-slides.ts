import { z } from 'zod';
import { en, fr, type Dictionary } from './i18n';

export const HERO_MAX_SLIDES = 12;
export const HERO_MAX_BYTES = 6 * 1024 * 1024;
export const HERO_EDITOR_ROLES = ['super_admin', 'content_manager', 'admin', 'director'] as const;
const localImage =
  /^\/images\/hero\/(ohcs-audit-committee\.jpg|audit-training\.jpg|audit-committee-psrs\.jpeg|civil-service-office\.jpg)$/;
export const HERO_IMAGE_KEY =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp)$/;
export function safeHeroLink(value: string): boolean {
  if (!value || /[\\\s\u0000-\u001f]/.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch {
    return false;
  }
}
const link = z
  .string()
  .max(500)
  .refine(safeHeroLink, 'Use a site path beginning with / or an HTTPS URL.');
const optionalLink = z.union([z.literal(''), link]);
export const heroCopySchema = z
  .object({
    label: z.string().trim().min(1).max(60),
    title: z.string().trim().min(3).max(160),
    body: z.string().trim().min(3).max(500),
    buttonText: z.string().trim().min(1).max(60),
    secondaryText: z.string().trim().max(60).default(''),
  })
  .strict();
export const heroSlideSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9_-]{3,64}$/),
    enabled: z.boolean(),
    image: z
      .string()
      .refine(
        (s) =>
          localImage.test(s) ||
          (s.startsWith('/api/public/hero-images/') &&
            HERO_IMAGE_KEY.test(s.slice('/api/public/hero-images/'.length))),
        'Choose an uploaded hero image.',
      ),
    alt: z.string().trim().min(5).max(250),
    copy: z.object({ en: heroCopySchema, fr: heroCopySchema.nullable() }).strict(),
    buttonHref: link,
    secondaryHref: optionalLink,
    credit: z.string().trim().max(160),
    creditUrl: optionalLink,
    desktopX: z.number().min(0).max(100),
    desktopY: z.number().min(0).max(100),
    mobileX: z.number().min(0).max(100),
    mobileY: z.number().min(0).max(100),
    layout: z.enum(['cover', 'portrait']),
  })
  .strict();
export const heroManifestSchema = z
  .array(heroSlideSchema)
  .min(1)
  .max(HERO_MAX_SLIDES)
  .refine(
    (s) => new Set(s.map((v) => v.id)).size === s.length,
    'Each slide must have a unique ID.',
  );
export type HeroCopy = z.infer<typeof heroCopySchema>;
export type HeroSlide = z.infer<typeof heroSlideSchema>;
export interface HeroEditorState {
  draft: HeroSlide[];
  published: HeroSlide[];
  revision: number;
  publishedRevision: number;
  updatedAt: string | null;
  publishedAt: string | null;
}
export function defaultHeroSlides(): HeroSlide[] {
  const copy = (d: Dictionary, i: number): HeroCopy => {
    const entries = [
      {
        label: d.hero.assuranceLabel,
        title: `${d.hero.headlineA} ${d.hero.headlineAccent} ${d.hero.headlineB}`,
        body: d.hero.subtitle,
        buttonText: d.hero.ctaUnits,
      },
      {
        label: d.hero.practiceLabel,
        title: d.hero.practiceTitle,
        body: d.hero.practiceBody,
        buttonText: d.nav.publications,
      },
      {
        label: d.hero.accountabilityLabel,
        title: d.hero.accountabilityTitle,
        body: d.hero.accountabilityBody,
        buttonText: d.nav.mandate,
      },
      {
        label: d.hero.serviceLabel,
        title: d.hero.serviceTitle,
        body: d.hero.serviceBody,
        buttonText: d.nav.mandate,
      },
    ];
    return { ...entries[i]!, secondaryText: d.hero.ctaFraud };
  };
  const images = [
    [
      'ohcs-audit-committee.jpg',
      'Participants at the OHCS Audit Committee inauguration in 2022',
      '/audit-units',
      '2022',
      'https://iaa.gov.gh/2022/09/12/iaa-inaugurates-the-audit-committee-of-the-ohcs/',
      60,
      0,
    ],
    [
      'audit-training.jpg',
      'An Internal Audit Agency working-paper management training session in 2024',
      '/publications',
      '2024',
      'https://iaa.gov.gh/2024/07/08/training-workshop/',
      50,
      35,
    ],
    [
      'audit-committee-psrs.jpeg',
      'The inauguration of the Public Sector Reforms Secretariat Audit Committee in 2025',
      '/about',
      '2025',
      'https://iaa.gov.gh/2025/06/13/iaa-inaugurates-the-audit-committee-of-psrs/',
      65,
      40,
    ],
    [
      'civil-service-office.jpg',
      'An official seated at a desk between the Ghana and Civil Service flags',
      '/about',
      '',
      '',
      100,
      50,
    ],
  ] as const;
  return images.map((v, i) => ({
    id: `original-${i + 1}`,
    enabled: true,
    image: `/images/hero/${v[0]}`,
    alt: v[1],
    copy: { en: copy(en, i), fr: copy(fr, i) },
    buttonHref: v[2],
    secondaryHref: '/services/report-fraud',
    credit: i === 3 ? en.hero.suppliedPhoto : `${en.hero.photoCredit} · ${v[3]}`,
    creditUrl: v[4],
    desktopX: v[5],
    desktopY: v[6],
    mobileX: i === 3 ? 50 : v[5],
    mobileY: i === 3 ? 58 : v[6],
    layout: i === 3 ? 'portrait' : 'cover',
  }));
}
