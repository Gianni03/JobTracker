import { Application } from './definitions';
import {
  subDays,
  subMonths,
  subYears,
  isAfter,
  parseISO,
  startOfDay,
} from 'date-fns';

export type DateRangeOption = '30d' | '3m' | '6m' | '1y' | 'all' | 'custom';

export function filterApplicationsByDate(
  applications: Application[],
  range: string,
  from?: string
): Application[] {
  // If no range is specified, default to 30d
  const selectedRange = (range || '30d') as DateRangeOption;

  if (selectedRange === 'all') {
    return applications;
  }

  const now = new Date();

  if (selectedRange === 'custom' && from) {
    const fromDate = startOfDay(parseISO(from));
    return applications.filter((app) => {
      const appDate = parseISO(app.date); // app.date is likely YYYY-MM-DD string
      return (
        isAfter(appDate, fromDate) || appDate.getTime() === fromDate.getTime()
      );
    });
  }

  let cutoffDate = subDays(now, 30); // Default 30d

  switch (selectedRange) {
    case '30d':
      cutoffDate = subDays(now, 30);
      break;
    case '3m':
      cutoffDate = subMonths(now, 3);
      break;
    case '6m':
      cutoffDate = subMonths(now, 6);
      break;
    case '1y':
      cutoffDate = subYears(now, 1);
      break;
    default:
      // If recognized range but not handled above, or just fallback
      if (selectedRange !== 'custom') {
        cutoffDate = subDays(now, 30);
      }
      break;
  }

  // Ensure we compare start of day to cover the full range correctly if needed,
  // but date-fns sub* functions return exact time.
  // Since app.date is usually YYYY-MM-DD (string), let's parse it and compare.

  return applications.filter((app) => {
    // app.date is YYYY-MM-DD.
    // We treat it as local date or UTC? Usually YYYY-MM-DD is plain date.
    // Let's parse it to a date object.
    const appDate = parseISO(app.date);
    return isAfter(appDate, cutoffDate);
  });
}
