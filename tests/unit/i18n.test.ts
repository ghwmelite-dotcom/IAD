import { describe, it, expect } from 'vitest';
import { en, fr, getDictionary, navLabel, NAV_LABEL_KEYS, type Dictionary } from '@/lib/i18n';
import { NAV_ITEMS } from '@/lib/constants';

function leafKeys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
    leafKeys(value, prefix ? `${prefix}.${key}` : key),
  );
}

describe('i18n dictionaries', () => {
  it('FR covers exactly the same keys as EN', () => {
    expect(leafKeys(fr).sort()).toEqual(leafKeys(en).sort());
  });

  it('every FR leaf is a non-empty string', () => {
    for (const key of leafKeys(fr)) {
      const value = key.split('.').reduce<unknown>(
        (acc, part) => (acc as Record<string, unknown>)[part],
        fr,
      );
      expect(typeof value).toBe('string');
      expect((value as string).length).toBeGreaterThan(0);
    }
  });

  it('falls back to EN for unknown languages', () => {
    expect(getDictionary('en').nav.home).toBe('Home');
    expect(getDictionary('fr').nav.home).toBe('Accueil');
  });

  it('translates every NAV_ITEMS label (top-level and children)', () => {
    const labels: string[] = [];
    for (const item of NAV_ITEMS) {
      labels.push(item.label);
      for (const child of item.children ?? []) labels.push(child.label);
    }
    for (const label of labels) {
      expect(NAV_LABEL_KEYS[label], `missing nav key for "${label}"`).toBeDefined();
    }
  });

  it('navLabel falls back to the English label when unmapped', () => {
    const dict: Dictionary = en;
    expect(navLabel('Home', dict)).toBe('Home');
    expect(navLabel('Something New', dict)).toBe('Something New');
    expect(navLabel('Home', fr)).toBe('Accueil');
    expect(navLabel('IAC Registry', fr)).toBe('Registre de la Classe d’Audit Interne');
  });
});
