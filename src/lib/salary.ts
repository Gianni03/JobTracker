import type {
  Application,
  ApplicationCurrency,
  ApplicationSalaryFrequency,
} from '@/lib/definitions';

export const HOURS_PER_YEAR = 2080;

export function annualizeSalary(
  amount: number,
  frequency?: ApplicationSalaryFrequency,
): number {
  switch (frequency) {
    case 'hour':
      return amount * HOURS_PER_YEAR;
    case 'month':
      return amount * 12;
    case 'year':
    default:
      return amount;
  }
}

export function salaryMidpoint(
  min?: number | null,
  max?: number | null,
): number | undefined {
  if (min != null && max != null) return (min + max) / 2;
  if (min != null) return min;
  if (max != null) return max;
  return undefined;
}

export type SalaryCurrencyInsight = {
  currency: ApplicationCurrency;
  count: number;
  desiredAverage?: number;
  expressedAverage?: number;
  offerAverage?: number;
  offerToDesiredPct?: number;
};

type SalaryGroup = {
  count: number;
  desired: number[];
  expressed: number[];
  offer: number[];
};

function average(values: number[]): number | undefined {
  if (values.length === 0) return undefined;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function getSalaryInsights(
  applications: Application[],
): SalaryCurrencyInsight[] {
  const groups = new Map<ApplicationCurrency, SalaryGroup>();

  for (const application of applications) {
    const currency = application.salary.currency;
    if (!currency) continue;

    const frequency = application.salary.frequency;
    const desired = salaryMidpoint(
      application.salary.desired,
      application.salary.desiredMax,
    );
    const expressed = salaryMidpoint(
      application.salary.expressed,
      application.salary.expressedMax,
    );
    const offer = application.salary.offer;

    if (desired == null && expressed == null && offer == null) continue;

    const group = groups.get(currency) ?? {
      count: 0,
      desired: [],
      expressed: [],
      offer: [],
    };

    group.count += 1;
    if (desired != null) group.desired.push(annualizeSalary(desired, frequency));
    if (expressed != null) {
      group.expressed.push(annualizeSalary(expressed, frequency));
    }
    if (offer != null) group.offer.push(annualizeSalary(offer, frequency));

    groups.set(currency, group);
  }

  return Array.from(groups.entries())
    .map(([currency, group]) => {
      const desiredAverage = average(group.desired);
      const offerAverage = average(group.offer);

      return {
        currency,
        count: group.count,
        desiredAverage,
        expressedAverage: average(group.expressed),
        offerAverage,
        offerToDesiredPct:
          desiredAverage && offerAverage
            ? Math.round(((offerAverage - desiredAverage) / desiredAverage) * 100)
            : undefined,
      };
    })
    .sort((a, b) => b.count - a.count || a.currency.localeCompare(b.currency));
}
