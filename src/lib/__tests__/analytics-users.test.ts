import { describe, expect, it } from 'vitest';
import { classifyUsers } from '@/lib/analytics/user-metrics';

const now = new Date('2026-11-13T12:00:00.000Z');

describe('classifyUsers', () => {
  it('classifies active, inactive and never-signed-in users', () => {
    const metrics = classifyUsers(
      [
        {
          created_at: '2026-10-01T00:00:00.000Z',
          last_sign_in_at: '2026-11-10T00:00:00.000Z',
        },
        {
          created_at: '2026-10-01T00:00:00.000Z',
          last_sign_in_at: '2026-09-01T00:00:00.000Z',
        },
        {
          created_at: '2026-11-01T00:00:00.000Z',
          last_sign_in_at: null,
        },
      ],
      30,
      now,
    );

    expect(metrics).toEqual({
      total: 3,
      active: 1,
      inactive: 2,
      neverSignedIn: 1,
      newUsers: 1,
    });
  });

  it('treats the cutoff as inclusive', () => {
    const metrics = classifyUsers(
      [
        {
          created_at: '2026-10-14T12:00:00.000Z',
          last_sign_in_at: '2026-10-14T12:00:00.000Z',
        },
      ],
      30,
      now,
    );

    expect(metrics.active).toBe(1);
    expect(metrics.newUsers).toBe(1);
  });
});
