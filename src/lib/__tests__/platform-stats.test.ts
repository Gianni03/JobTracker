import { describe, expect, it } from 'vitest';
import type { Application } from '@/lib/definitions';
import { getPlatformInsights } from '@/lib/platform-stats';

function application(
  id: string,
  platform: Application['platform'],
  status: Application['status'],
  extra: Partial<Application> = {},
): Application {
  return {
    id,
    company: 'Acme',
    role: 'Engineer',
    status,
    date: '2026-11-01',
    platform,
    link: '',
    salary: {},
    contact: {},
    description: '',
    ...extra,
  };
}

describe('getPlatformInsights', () => {
  it('counts volume, interviews and response rate per platform', () => {
    const insights = getPlatformInsights([
      application('1', 'LinkedIn', 'Entrevista'),
      application('2', 'LinkedIn', 'Oferta'),
      application('3', 'LinkedIn', 'Rechazado'),
      application('4', 'LinkedIn', 'Aplicado'),
      application('5', 'Indeed', 'Aplicado'),
      application('6', 'Indeed', 'Ghosted'),
      application('7', 'Indeed', 'Rechazado', { interviewStage: 'Técnica' }),
    ]);

    const linkedin = insights.find((item) => item.platform === 'LinkedIn');
    const indeed = insights.find((item) => item.platform === 'Indeed');

    expect(linkedin).toMatchObject({
      total: 4,
      interviews: 2,
      offers: 1,
      interviewRate: 50,
      responseRate: 75,
    });
    expect(indeed).toMatchObject({
      total: 3,
      interviews: 1,
      offers: 0,
      interviewRate: 33,
      responseRate: 33,
    });
  });

  it('sorts by volume and handles an empty list', () => {
    const insights = getPlatformInsights([
      application('1', 'LinkedIn', 'Aplicado'),
      application('2', 'LinkedIn', 'Aplicado'),
      application('3', 'Referido', 'Aplicado'),
    ]);

    expect(insights[0].platform).toBe('LinkedIn');
    expect(getPlatformInsights([])).toEqual([]);
  });
});
