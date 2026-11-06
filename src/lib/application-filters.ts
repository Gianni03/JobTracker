import type { Application } from '@/lib/definitions';
import { STATUS_OPTIONS } from '@/lib/status';

export type ApplicationSort =
  | 'date-desc'
  | 'date-asc'
  | 'company-asc'
  | 'status';

export function filterApplicationsBySearch(
  applications: Application[],
  query: string,
): Application[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return applications;

  return applications.filter((application) =>
    `${application.company} ${application.role}`
      .toLowerCase()
      .includes(normalized),
  );
}

export function sortApplications(
  applications: Application[],
  sortBy: ApplicationSort,
): Application[] {
  const sorted = [...applications];

  switch (sortBy) {
    case 'date-asc':
      sorted.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case 'company-asc':
      sorted.sort((a, b) =>
        a.company.localeCompare(b.company, 'es', { sensitivity: 'base' }),
      );
      break;
    case 'status':
      sorted.sort(
        (a, b) =>
          STATUS_OPTIONS.indexOf(a.status) - STATUS_OPTIONS.indexOf(b.status),
      );
      break;
    case 'date-desc':
    default:
      sorted.sort((a, b) => b.date.localeCompare(a.date));
      break;
  }

  return sorted;
}
