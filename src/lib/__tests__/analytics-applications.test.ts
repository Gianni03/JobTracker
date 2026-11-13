import { describe, expect, it } from 'vitest';
import {
  aggregateApplications,
  type ApplicationMetricRow,
} from '@/lib/analytics/application-metrics';

const now = new Date('2026-11-13T12:00:00.000Z');

function row(
  overrides: Partial<ApplicationMetricRow> &
    Pick<ApplicationMetricRow, 'status' | 'date'>,
): ApplicationMetricRow {
  return {
    user_id: 'user-1',
    company: 'Acme',
    platform: 'LinkedIn',
    created_at: `${overrides.date}T10:00:00.000Z`,
    interview_stage: null,
    offer_stage: null,
    ...overrides,
  };
}

describe('aggregateApplications', () => {
  it('aggregates statuses, conversion rates, users and daily counts', () => {
    const metrics = aggregateApplications(
      [
        row({ status: 'Aplicado', date: '2026-11-01', user_id: 'u1' }),
        row({
          status: 'Entrevista',
          date: '2026-10-01',
          user_id: 'u1',
          interview_stage: 'Técnica',
        }),
        row({
          status: 'Oferta',
          date: '2026-09-01',
          user_id: 'u2',
          company: 'Globex',
          platform: 'Referido',
          offer_stage: 'Aceptada',
        }),
        row({
          status: 'Rechazado',
          date: '2026-08-01',
          user_id: 'u2',
          interview_stage: 'RRHH',
        }),
        row({
          status: 'Ghosted',
          date: '2026-07-01',
          user_id: 'u3',
          company: 'Initech',
          platform: 'Portal de empleo',
        }),
      ],
      28,
      now,
    );

    expect(metrics.total).toBe(5);
    expect(metrics.inRange).toBe(1);
    expect(metrics.interviews).toBe(3);
    expect(metrics.offers).toBe(1);
    expect(metrics.interviewRate).toBe(60);
    expect(metrics.offerRate).toBe(33);
    expect(metrics.usersWithApplications).toBe(3);
    expect(metrics.applicationsPerUser).toBe(1.7);
    expect(metrics.byStatus).toEqual([
      { status: 'Aplicado', count: 1 },
      { status: 'Entrevista', count: 1 },
      { status: 'Oferta', count: 1 },
      { status: 'Rechazado', count: 1 },
      { status: 'Ghosted', count: 1 },
    ]);
    expect(metrics.byPlatform[0]).toEqual({ label: 'LinkedIn', count: 3 });
    expect(metrics.topCompanies).toEqual([
      { label: 'Acme', count: 3 },
      { label: 'Globex', count: 1 },
      { label: 'Initech', count: 1 },
    ]);
    expect(metrics.daily).toHaveLength(28);
    expect(metrics.daily.at(-1)?.date).toBe('2026-11-13');
    expect(
      metrics.daily.find((day) => day.date === '2026-11-01')?.count,
    ).toBe(1);
  });

  it('returns zeros and a full daily series for an empty dataset', () => {
    const metrics = aggregateApplications([], 7, now);

    expect(metrics.total).toBe(0);
    expect(metrics.inRange).toBe(0);
    expect(metrics.interviewRate).toBe(0);
    expect(metrics.offerRate).toBe(0);
    expect(metrics.applicationsPerUser).toBe(0);
    expect(metrics.daily).toHaveLength(7);
    expect(metrics.daily.every((day) => day.count === 0)).toBe(true);
  });
});
