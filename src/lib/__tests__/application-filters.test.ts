import { describe, expect, it } from 'vitest';
import type { Application } from '@/lib/definitions';
import {
  filterApplicationsBySearch,
  sortApplications,
} from '@/lib/application-filters';

function application(
  id: string,
  company: string,
  role: string,
  date: string,
  status: Application['status'],
): Application {
  return {
    id,
    company,
    role,
    status,
    date,
    platform: 'LinkedIn',
    link: '',
    salary: {},
    contact: {},
    description: '',
  };
}

const applications = [
  application('1', 'Beta', 'Frontend Engineer', '2026-10-01', 'Entrevista'),
  application('2', 'Acme', 'Backend Engineer', '2026-11-01', 'Aplicado'),
  application('3', 'Gamma', 'Product Designer', '2026-09-01', 'Oferta'),
];

describe('filterApplicationsBySearch', () => {
  it('matches company or role case-insensitively', () => {
    expect(
      filterApplicationsBySearch(applications, 'acme').map((app) => app.id),
    ).toEqual(['2']);
    expect(
      filterApplicationsBySearch(applications, 'DESIGNER').map((app) => app.id),
    ).toEqual(['3']);
  });

  it('returns everything for an empty query', () => {
    expect(filterApplicationsBySearch(applications, '   ')).toHaveLength(3);
  });
});

describe('sortApplications', () => {
  it('sorts by date and company', () => {
    expect(
      sortApplications(applications, 'date-desc').map((app) => app.id),
    ).toEqual(['2', '1', '3']);
    expect(
      sortApplications(applications, 'date-asc').map((app) => app.id),
    ).toEqual(['3', '1', '2']);
    expect(
      sortApplications(applications, 'company-asc').map((app) => app.id),
    ).toEqual(['2', '1', '3']);
  });

  it('sorts by status using the pipeline order', () => {
    expect(
      sortApplications(applications, 'status').map((app) => app.status),
    ).toEqual(['Aplicado', 'Entrevista', 'Oferta']);
  });

  it('does not mutate the input array', () => {
    const original = [...applications];
    sortApplications(applications, 'company-asc');

    expect(applications).toEqual(original);
  });
});
