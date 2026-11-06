import { describe, expect, it } from 'vitest';
import type { Application } from '@/lib/definitions';
import {
  annualizeSalary,
  getSalaryInsights,
  salaryMidpoint,
} from '@/lib/salary';

function application(
  id: string,
  salary: Application['salary'],
): Application {
  return {
    id,
    company: 'Acme',
    role: 'Engineer',
    status: 'Aplicado',
    date: '2026-11-01',
    platform: 'LinkedIn',
    link: '',
    salary,
    contact: {},
    description: '',
  };
}

describe('annualizeSalary', () => {
  it('annualizes hourly, monthly and yearly amounts', () => {
    expect(annualizeSalary(10, 'hour')).toBe(20800);
    expect(annualizeSalary(1000, 'month')).toBe(12000);
    expect(annualizeSalary(100000, 'year')).toBe(100000);
    expect(annualizeSalary(100000, undefined)).toBe(100000);
  });
});

describe('salaryMidpoint', () => {
  it('averages a range and falls back to the available bound', () => {
    expect(salaryMidpoint(100, 200)).toBe(150);
    expect(salaryMidpoint(100, null)).toBe(100);
    expect(salaryMidpoint(null, 200)).toBe(200);
    expect(salaryMidpoint(null, null)).toBeUndefined();
    expect(salaryMidpoint(undefined, undefined)).toBeUndefined();
  });
});

describe('getSalaryInsights', () => {
  it('groups by currency and annualizes mixed frequencies', () => {
    const insights = getSalaryInsights([
      application('a', {
        desired: 100000,
        desiredMax: 140000,
        offer: 130000,
        currency: 'USD',
        frequency: 'year',
      }),
      application('b', {
        desired: 10000,
        currency: 'USD',
        frequency: 'month',
      }),
      application('c', {
        desired: 1000000,
        currency: 'ARS',
        frequency: 'year',
      }),
      application('d', {}),
    ]);

    const usd = insights.find((item) => item.currency === 'USD');
    const ars = insights.find((item) => item.currency === 'ARS');

    expect(usd).toMatchObject({
      count: 2,
      desiredAverage: 120000,
      offerAverage: 130000,
      offerToDesiredPct: 8,
    });
    expect(ars).toMatchObject({ count: 1, desiredAverage: 1000000 });
    expect(insights).toHaveLength(2);
  });

  it('never converts between currencies', () => {
    const insights = getSalaryInsights([
      application('a', { desired: 100000, currency: 'USD' }),
      application('b', { desired: 90000, currency: 'EUR' }),
    ]);

    expect(insights.map((item) => item.currency).sort()).toEqual(['EUR', 'USD']);
    expect(insights.every((item) => item.count === 1)).toBe(true);
  });

  it('returns no insight for applications without salary data', () => {
    expect(getSalaryInsights([application('a', {})])).toEqual([]);
  });
});
