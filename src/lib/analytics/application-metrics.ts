import type { ApplicationStatus } from '@/lib/definitions';
import type {
  ApplicationMetrics,
  LabeledCount,
  StatusCount,
} from './types';

const DAY_MS = 24 * 60 * 60 * 1000;
const TOP_COMPANIES_LIMIT = 10;

const STATUS_ORDER: ApplicationStatus[] = [
  'Aplicado',
  'Entrevista',
  'Oferta',
  'Rechazado',
  'Ghosted',
];

export type ApplicationMetricRow = {
  user_id: string;
  company: string | null;
  status: ApplicationStatus;
  platform: string | null;
  date: string | null;
  created_at: string | null;
  interview_stage: string | null;
  offer_stage: string | null;
};

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function applicationDate(row: ApplicationMetricRow): string {
  return row.date ?? row.created_at?.slice(0, 10) ?? '';
}

export function aggregateApplications(
  rows: ApplicationMetricRow[],
  days: number,
  now = new Date(),
): ApplicationMetrics {
  const cutoffKey = toDateKey(new Date(now.getTime() - days * DAY_MS));

  const statusCounts = new Map<ApplicationStatus, number>(
    STATUS_ORDER.map((status) => [status, 0]),
  );
  const platformCounts = new Map<string, number>();
  const companyCounts = new Map<string, number>();
  const dailyCounts = new Map<string, number>();
  const userIds = new Set<string>();

  let inRange = 0;
  let interviews = 0;
  let offers = 0;
  let rejected = 0;
  let ghosted = 0;
  let applied = 0;

  for (const row of rows) {
    statusCounts.set(row.status, (statusCounts.get(row.status) ?? 0) + 1);

    const platform = row.platform?.trim() || 'Sin plataforma';
    platformCounts.set(platform, (platformCounts.get(platform) ?? 0) + 1);

    const company = row.company?.trim();
    if (company) {
      companyCounts.set(company, (companyCounts.get(company) ?? 0) + 1);
    }

    userIds.add(row.user_id);

    const date = applicationDate(row);
    if (date && date >= cutoffKey) {
      inRange += 1;
      dailyCounts.set(date, (dailyCounts.get(date) ?? 0) + 1);
    }

    if (
      row.status === 'Entrevista' ||
      row.status === 'Oferta' ||
      Boolean(row.interview_stage)
    ) {
      interviews += 1;
    }
    if (row.status === 'Oferta' || Boolean(row.offer_stage)) offers += 1;
    if (row.status === 'Rechazado') rejected += 1;
    if (row.status === 'Ghosted') ghosted += 1;
    if (row.status === 'Aplicado') applied += 1;
  }

  const total = rows.length;

  const byStatus: StatusCount[] = STATUS_ORDER.map((status) => ({
    status,
    count: statusCounts.get(status) ?? 0,
  }));

  const byPlatform: LabeledCount[] = [...platformCounts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const topCompanies: LabeledCount[] = [...companyCounts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, TOP_COMPANIES_LIMIT);

  const daily: Array<{ date: string; count: number }> = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = toDateKey(new Date(now.getTime() - offset * DAY_MS));
    daily.push({ date, count: dailyCounts.get(date) ?? 0 });
  }

  return {
    total,
    inRange,
    byStatus,
    byPlatform,
    interviews,
    offers,
    rejected,
    ghosted,
    applied,
    interviewRate: total > 0 ? Math.round((interviews / total) * 100) : 0,
    offerRate: interviews > 0 ? Math.round((offers / interviews) * 100) : 0,
    usersWithApplications: userIds.size,
    applicationsPerUser:
      userIds.size > 0 ? Math.round((total / userIds.size) * 10) / 10 : 0,
    topCompanies,
    daily,
  };
}
