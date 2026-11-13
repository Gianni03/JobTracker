import 'server-only';

import { GoogleAuth, type AuthClient } from 'google-auth-library';
import type { Ga4Overview, Ga4Result, Ga4Totals } from './types';

const ANALYTICS_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const GA4_API_BASE = 'https://analyticsdata.googleapis.com/v1beta';

const TRACKED_EVENTS = [
  'sign_up',
  'login',
  'create_application',
  'import_job_url',
  'change_status',
  'advance_to_interview',
  'advance_to_offer',
  'add_feedback',
  'bulk_change_status',
  'bulk_delete_applications',
  'delete_application',
  'update_application',
  'view_skills',
  'copy_command',
] as const;

type Ga4Row = {
  dimensionValues?: Array<{ value?: string | null }>;
  metricValues?: Array<{ value?: string | null }>;
};

type Ga4Report = {
  rows?: Ga4Row[];
};

type Ga4Config = {
  propertyId: string;
  clientEmail: string;
  privateKey: string;
};

function readConfig(): Ga4Config | null {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const clientEmail = process.env.GA4_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  if (!propertyId || !clientEmail || !privateKey) return null;

  return { propertyId, clientEmail, privateKey };
}

let authClientPromise: Promise<AuthClient> | null = null;

function getAuthClient(config: Ga4Config): Promise<AuthClient> {
  if (!authClientPromise) {
    const auth = new GoogleAuth({
      credentials: {
        client_email: config.clientEmail,
        private_key: config.privateKey,
      },
      scopes: [ANALYTICS_SCOPE],
    });

    authClientPromise = auth.getClient().catch((error) => {
      authClientPromise = null;
      throw error;
    });
  }

  return authClientPromise;
}

async function getAccessToken(config: Ga4Config): Promise<string> {
  const client = await getAuthClient(config);
  const { token } = await client.getAccessToken();

  if (!token) {
    throw new Error('GA4 no devolvió un access token.');
  }

  return token;
}

async function runReport(
  config: Ga4Config,
  body: Record<string, unknown>,
  realtime = false,
): Promise<Ga4Report> {
  const token = await getAccessToken(config);
  const method = realtime ? 'runRealtimeReport' : 'runReport';

  const response = await fetch(
    `${GA4_API_BASE}/properties/${config.propertyId}:${method}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GA4 ${response.status}: ${detail.slice(0, 300)}`);
  }

  return (await response.json()) as Ga4Report;
}

function metric(row: Ga4Row | undefined, index: number): number {
  const raw = row?.metricValues?.[index]?.value;
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

function dimension(row: Ga4Row | undefined, index: number): string {
  return row?.dimensionValues?.[index]?.value?.trim() || 'Sin datos';
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function buildDateRanges(days: number, now = new Date()) {
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1),
  );
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const previousEnd = new Date(start);
  previousEnd.setUTCDate(previousEnd.getUTCDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setUTCDate(previousStart.getUTCDate() - (days - 1));

  return {
    start: formatDate(start),
    end: formatDate(end),
    previousStart: formatDate(previousStart),
    previousEnd: formatDate(previousEnd),
  };
}

async function fetchTotals(
  config: Ga4Config,
  startDate: string,
  endDate: string,
): Promise<Ga4Totals> {
  const report = await runReport(config, {
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'newUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
    ],
  });

  const row = report.rows?.[0];

  return {
    activeUsers: metric(row, 0),
    newUsers: metric(row, 1),
    sessions: metric(row, 2),
    pageViews: metric(row, 3),
    engagementRate: metric(row, 4),
    averageSessionDuration: metric(row, 5),
  };
}

let regionNames: Intl.DisplayNames | null = null;

function countryName(code: string): string {
  if (code === 'Sin datos') return code;

  try {
    regionNames ??= new Intl.DisplayNames(['es'], { type: 'region' });
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

async function loadGa4Overview(
  config: Ga4Config,
  days: number,
): Promise<Ga4Overview> {
  const { start, end, previousStart, previousEnd } = buildDateRanges(days);

  const [
    totals,
    previousTotals,
    activityReport,
    realtimeReport,
    countryReport,
    sourceReport,
    deviceReport,
    eventReport,
  ] = await Promise.all([
    fetchTotals(config, start, end),
    fetchTotals(config, previousStart, previousEnd),
    runReport(config, {
      dateRanges: [{ startDate: start, endDate: end }],
      metrics: [
        { name: 'active1DayUsers' },
        { name: 'active7DayUsers' },
        { name: 'active28DayUsers' },
      ],
    }),
    runReport(
      config,
      {
        metrics: [{ name: 'activeUsers' }],
      },
      true,
    ),
    runReport(config, {
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: [{ name: 'countryId' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 10,
    }),
    runReport(config, {
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: [{ name: 'sessionSourceMedium' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    }),
    runReport(config, {
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 10,
    }),
    runReport(config, {
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: { values: [...TRACKED_EVENTS] },
        },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 20,
    }),
  ]);

  const activityRow = activityReport.rows?.[0];

  return {
    configured: true,
    totals,
    previousTotals,
    active1Day: metric(activityRow, 0),
    active7Day: metric(activityRow, 1),
    active28Day: metric(activityRow, 2),
    realtimeUsers: metric(realtimeReport.rows?.[0], 0),
    countries: (countryReport.rows ?? []).map((row) => ({
      country: countryName(dimension(row, 0)),
      activeUsers: metric(row, 0),
      sessions: metric(row, 1),
    })),
    sources: (sourceReport.rows ?? []).map((row) => ({
      source: dimension(row, 0),
      sessions: metric(row, 0),
      activeUsers: metric(row, 1),
    })),
    devices: (deviceReport.rows ?? []).map((row) => ({
      device: dimension(row, 0),
      activeUsers: metric(row, 0),
    })),
    events: (eventReport.rows ?? []).map((row) => ({
      eventName: dimension(row, 0),
      count: metric(row, 0),
    })),
  };
}

export async function fetchGa4Overview(days: number): Promise<Ga4Result> {
  const config = readConfig();

  if (!config) {
    return {
      configured: false,
      reason:
        'Faltan GA4_PROPERTY_ID, GA4_CLIENT_EMAIL o GA4_PRIVATE_KEY. Seguí la guía de docs/ANALYTICS.md para conectar Google Analytics.',
    };
  }

  try {
    return await loadGa4Overview(config, days);
  } catch (error) {
    console.error(
      'GA4 analytics failed:',
      error instanceof Error ? error.message : error,
    );

    return {
      configured: false,
      reason:
        'No pudimos consultar Google Analytics. Revisá las credenciales y que la service account tenga acceso de lectura a la propiedad.',
    };
  }
}
