import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { filterApplicationsByDate } from '@/lib/date-utils';
import type { Application } from '@/lib/definitions';

function application(id: string, date: string): Application {
  return {
    id,
    company: 'Acme',
    role: 'Engineer',
    status: 'Aplicado',
    date,
    platform: 'LinkedIn',
    link: '',
    salary: {},
    contact: {},
    description: '',
  };
}

describe('filterApplicationsByDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-06T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const applications = [
    application('recent', '2026-11-05'),
    application('month', '2026-10-08'),
    application('old', '2026-09-01'),
    application('future', '2026-12-01'),
  ];

  it('returns everything for the all range', () => {
    expect(filterApplicationsByDate(applications, 'all')).toHaveLength(4);
  });

  it('keeps only applications inside the last 30 days', () => {
    const result = filterApplicationsByDate(applications, '30d');

    expect(result.map((app) => app.id)).toEqual(['recent', 'month']);
  });

  it('supports a custom start date inclusive of that day', () => {
    const result = filterApplicationsByDate(applications, 'custom', '2026-10-08');

    expect(result.map((app) => app.id)).toEqual(['recent', 'month', 'future']);
  });

  it('falls back to 30 days for unknown ranges', () => {
    const result = filterApplicationsByDate(applications, 'unknown');

    expect(result.map((app) => app.id)).toEqual(['recent', 'month']);
  });
});
