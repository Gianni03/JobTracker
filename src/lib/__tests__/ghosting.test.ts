import { describe, expect, it } from 'vitest';
import { getGhostedCutoffDate } from '@/lib/data';

describe('getGhostedCutoffDate', () => {
  it('returns the local date 14 days before now', () => {
    expect(getGhostedCutoffDate(new Date(2026, 10, 6, 12, 0, 0))).toBe(
      '2026-10-23',
    );
  });

  it('pads single-digit months and days', () => {
    expect(getGhostedCutoffDate(new Date(2026, 0, 5, 9, 0, 0))).toBe(
      '2025-12-22',
    );
  });
});
