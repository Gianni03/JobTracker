import type {
  ApplicationCurrency,
  ApplicationSalaryFrequency,
} from '@/lib/definitions';

const FREQUENCY_SUFFIX: Record<ApplicationSalaryFrequency, string> = {
  hour: '/hr',
  month: '/mes',
  year: '/año',
};

export function formatSalaryRange(
  min: number | null | undefined,
  max: number | null | undefined,
  currency: ApplicationCurrency = 'USD',
  frequency?: ApplicationSalaryFrequency,
): string {
  if (!min && !max) return '-';

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 0,
  });

  const suffixStr = frequency ? FREQUENCY_SUFFIX[frequency] : '';

  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}${suffixStr}`;
  }

  if (min) {
    return `${formatter.format(min)}${suffixStr}`;
  }

  return `${formatter.format(max!)}${suffixStr}`;
}
