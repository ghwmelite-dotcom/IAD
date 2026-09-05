import { describe, it, expect } from 'vitest';
import {
  REGISTRY_PAGE_SIZE,
  isValidPage,
  pageCount,
  pageSlice,
  registryPageHref,
  registryProfileHref,
} from '@/lib/registry-pagination';

describe('pageCount', () => {
  it('is at least 1 even with no entries', () => {
    expect(pageCount(0)).toBe(1);
  });

  it('fits exact multiples on one page set', () => {
    expect(pageCount(REGISTRY_PAGE_SIZE)).toBe(1);
    expect(pageCount(REGISTRY_PAGE_SIZE * 2)).toBe(2);
  });

  it('rounds up partial pages', () => {
    expect(pageCount(REGISTRY_PAGE_SIZE + 1)).toBe(2);
    expect(pageCount(1)).toBe(1);
    expect(pageCount(50)).toBe(3); // 24 + 24 + 2
  });
});

describe('pageSlice', () => {
  const entries = Array.from({ length: 50 }, (_, i) => `officer-${i + 1}`);

  it('returns the first 24 entries for page 1', () => {
    const slice = pageSlice(entries, 1);
    expect(slice).toHaveLength(24);
    expect(slice[0]).toBe('officer-1');
    expect(slice[23]).toBe('officer-24');
  });

  it('returns the remainder on the last partial page', () => {
    const slice = pageSlice(entries, 3);
    expect(slice).toHaveLength(2);
    expect(slice[0]).toBe('officer-49');
  });

  it('returns [] for out-of-range pages', () => {
    expect(pageSlice(entries, 0)).toEqual([]);
    expect(pageSlice(entries, 99)).toEqual([]);
  });
});

describe('isValidPage', () => {
  it('accepts pages within range', () => {
    expect(isValidPage(1, 50)).toBe(true);
    expect(isValidPage(3, 50)).toBe(true);
  });

  it('rejects pages outside range', () => {
    expect(isValidPage(0, 50)).toBe(false);
    expect(isValidPage(4, 50)).toBe(false);
    expect(isValidPage(1.5, 50)).toBe(false);
  });
});

describe('href helpers', () => {
  it('maps page 1 to the canonical /registry/ route', () => {
    expect(registryPageHref(1)).toBe('/registry/');
    expect(registryPageHref(2)).toBe('/registry/page/2/');
  });

  it('prefers static profile URLs, falling back to the runtime page', () => {
    expect(registryProfileHref('yaw-osei-frimpong', true)).toBe('/registry/yaw-osei-frimpong/');
    expect(registryProfileHref('new-officer', false)).toBe('/registry/profile?s=new-officer');
  });
});
