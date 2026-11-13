import { describe, expect, it } from 'vitest';
import { classifyUsers } from '@/lib/analytics/user-metrics';
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
    created_at: overrides.date ? `${overrides.date}T10:00:00.000Z` : null,
    interview_stage: null,
    offer_stage: null,
    ...overrides,
  };
}

describe('classifyUsers edges', () => {
  it('returns zeros for an empty user list', () => {
    expect(classifyUsers([], 28, now)).toEqual({
      total: 0,
      active: 0,
      inactive: 0,
      neverSignedIn: 0,
      newUsers: 0,
    });
  });

  it('treats one millisecond before the cutoff as inactive', () => {
    const metrics = classifyUsers(
      [
        {
          created_at: '2026-10-14T11:59:59.999Z',
          last_sign_in_at: '2026-10-14T11:59:59.999Z',
        },
      ],
      30,
      now,
    );

    expect(metrics.active).toBe(0);
    expect(metrics.inactive).toBe(1);
    expect(metrics.newUsers).toBe(0);
  });
});

describe('aggregateApplications edges', () => {
  it('breaks company ties alphabetically and handles null platform/company', () => {
    const metrics = aggregateApplications(
      [
        row({
          user_id: 'u1',
          company: 'Beta',
          status: 'Aplicado',
          platform: null,
          date: '2026-11-12',
        }),
        row({
          user_id: 'u1',
          company: 'Alpha',
          status: 'Aplicado',
          platform: '  ',
          date: '2026-11-12',
        }),
        row({
          user_id: 'u2',
          company: null,
          status: 'Rechazado',
          platform: 'LinkedIn',
          date: '2026-11-12',
        }),
      ],
      28,
      now,
    );

    expect(metrics.topCompanies.map((company) => company.label)).toEqual([
      'Alpha',
      'Beta',
    ]);
    expect(
      metrics.byPlatform.find((platform) => platform.label === 'Sin plataforma')
        ?.count,
    ).toBe(2);
  });

  it('counts interview_stage on Aplicado and falls back to created_at', () => {
    const metrics = aggregateApplications(
      [
        row({
          user_id: 'u1',
          company: 'A',
          status: 'Aplicado',
          platform: 'LinkedIn',
          date: '2026-11-12',
          interview_stage: 'RRHH',
        }),
        row({
          user_id: 'u1',
          company: 'B',
          status: 'Aplicado',
          platform: 'LinkedIn',
          date: null,
          created_at: null,
        }),
      ],
      28,
      now,
    );

    expect(metrics.interviews).toBe(1);
    expect(metrics.inRange).toBe(1);
  });
});
