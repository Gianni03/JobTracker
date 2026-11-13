import type { ApplicationStatus } from '@/lib/definitions';

export const ANALYTICS_RANGES = [7, 28, 90] as const;

export type AnalyticsRange = (typeof ANALYTICS_RANGES)[number];

export type UserMetrics = {
  total: number;
  active: number;
  inactive: number;
  neverSignedIn: number;
  newUsers: number;
};

export type StatusCount = {
  status: ApplicationStatus;
  count: number;
};

export type LabeledCount = {
  label: string;
  count: number;
};

export type ApplicationMetrics = {
  total: number;
  inRange: number;
  byStatus: StatusCount[];
  byPlatform: LabeledCount[];
  interviews: number;
  offers: number;
  rejected: number;
  ghosted: number;
  applied: number;
  interviewRate: number;
  offerRate: number;
  usersWithApplications: number;
  applicationsPerUser: number;
  topCompanies: LabeledCount[];
  daily: Array<{ date: string; count: number }>;
};

export type Ga4Totals = {
  activeUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  engagementRate: number;
  averageSessionDuration: number;
};

export type Ga4Overview = {
  configured: true;
  totals: Ga4Totals;
  previousTotals: Ga4Totals | null;
  active1Day: number;
  active7Day: number;
  active28Day: number;
  realtimeUsers: number;
  countries: Array<{ country: string; activeUsers: number; sessions: number }>;
  sources: Array<{ source: string; sessions: number; activeUsers: number }>;
  devices: Array<{ device: string; activeUsers: number }>;
  events: Array<{ eventName: string; count: number }>;
};

export type Ga4Unavailable = {
  configured: false;
  reason: string;
};

export type Ga4Result = Ga4Overview | Ga4Unavailable;
