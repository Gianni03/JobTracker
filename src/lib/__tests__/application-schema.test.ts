import { describe, expect, it } from 'vitest';
import { applicationFormSchema } from '@/lib/validation/application';

const validPayload = {
  company: 'Acme',
  role: 'Frontend Engineer',
  status: 'Aplicado',
  date: '2026-11-01',
  platform: 'LinkedIn',
  link: 'https://example.com/job/1',
  contact: { name: 'Ada', method: 'ada@example.com' },
  description: 'Build things.',
  salary: { desired: 1000, currency: 'USD', frequency: 'month' },
  notes: { general: 'Follow up next week.' },
  feedback: '',
};

describe('applicationFormSchema', () => {
  it('accepts a complete valid payload', () => {
    const result = applicationFormSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
  });

  it('rejects a missing company or role', () => {
    expect(
      applicationFormSchema.safeParse({ ...validPayload, company: '  ' })
        .success,
    ).toBe(false);
    expect(
      applicationFormSchema.safeParse({ ...validPayload, role: '' }).success,
    ).toBe(false);
  });

  it('rejects an unknown status or platform', () => {
    expect(
      applicationFormSchema.safeParse({ ...validPayload, status: 'Hired' })
        .success,
    ).toBe(false);
    expect(
      applicationFormSchema.safeParse({ ...validPayload, platform: 'Facebook' })
        .success,
    ).toBe(false);
  });

  it('rejects an invalid link and oversized text', () => {
    expect(
      applicationFormSchema.safeParse({ ...validPayload, link: 'not-a-url' })
        .success,
    ).toBe(false);
    expect(
      applicationFormSchema.safeParse({
        ...validPayload,
        description: 'x'.repeat(10001),
      }).success,
    ).toBe(false);
  });

  it('coerces numeric salary strings and allows empty values', () => {
    const parsed = applicationFormSchema.parse({
      ...validPayload,
      salary: { desired: '1500', desiredMax: '', currency: 'USD' },
    });

    expect(parsed.salary?.desired).toBe(1500);
    expect(parsed.salary?.desiredMax).toBeNull();
  });
});
