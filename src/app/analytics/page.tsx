import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  BarChart3,
  Briefcase,
  Building2,
  Clock,
  Eye,
  Globe2,
  Link2,
  MousePointerClick,
  Percent,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  UserX,
  Zap,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { fetchUserMetrics } from '@/lib/analytics/users';
import { fetchApplicationMetrics } from '@/lib/analytics/applications';
import { fetchGa4Overview } from '@/lib/analytics/ga4';
import {
  ANALYTICS_RANGES,
  type AnalyticsRange,
} from '@/lib/analytics/types';
import { AnalyticsRangeTabs } from '@/components/analytics/range-tabs';
import { MetricCard } from '@/components/analytics/metric-card';
import { BreakdownBarList } from '@/components/analytics/breakdown-bar-list';
import { DataTable } from '@/components/analytics/data-table';
import { DailyBars } from '@/components/analytics/daily-bars';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Uso de la app · JobTracker',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const numberFormatter = new Intl.NumberFormat('es-AR');

const DEVICE_LABELS: Record<string, string> = {
  desktop: 'Desktop',
  mobile: 'Mobile',
  tablet: 'Tablet',
  smarttv: 'Smart TV',
};

const EVENT_LABELS: Record<string, string> = {
  sign_up: 'Registros',
  login: 'Inicios de sesión',
  create_application: 'Postulaciones creadas',
  import_job_url: 'Imports desde URL',
  change_status: 'Cambios de estado',
  advance_to_interview: 'Pasos a entrevista',
  advance_to_offer: 'Ofertas',
  add_feedback: 'Feedback agregado',
  bulk_change_status: 'Cambios masivos de estado',
  bulk_delete_applications: 'Borrados masivos',
  delete_application: 'Postulaciones eliminadas',
  update_application: 'Postulaciones editadas',
  view_skills: 'Vistas de Skills',
  copy_command: 'Comandos copiados',
};

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function formatRate(value: number): string {
  return `${Math.round(value)}%`;
}

function formatRatio(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatDuration(seconds: number): string {
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${minutes}m ${rest.toString().padStart(2, '0')}s`;
}

function formatDelta(
  current: number,
  previous: number | null | undefined,
): string | undefined {
  if (previous === null || previous === undefined || previous === 0) {
    return undefined;
  }

  const delta = Math.round(((current - previous) / previous) * 100);
  return `${delta >= 0 ? '+' : ''}${delta}% vs. período anterior`;
}

function parseRange(value: string | string[] | undefined): AnalyticsRange {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  return ANALYTICS_RANGES.includes(parsed as AnalyticsRange)
    ? (parsed as AnalyticsRange)
    : 28;
}

function UnavailableCard({ label }: { label: string }) {
  return (
    <Card className="rounded-2xl border-dashed">
      <CardContent className="flex items-center gap-3 p-6 text-sm text-muted-foreground">
        <AlertCircle className="h-4 w-4 shrink-0" />
        No pudimos cargar {label}. Revisá la configuración del servidor.
      </CardContent>
    </Card>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string | string[] }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allowedEmails = (process.env.ANALYTICS_ALLOWED_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!user?.email || !allowedEmails.includes(user.email.toLowerCase())) {
    notFound();
  }

  const params = await searchParams;
  const range = parseRange(params.range);

  const [users, applications, ga4] = await Promise.all([
    fetchUserMetrics(range).catch((error) => {
      console.error('User metrics failed:', error);
      return null;
    }),
    fetchApplicationMetrics(range).catch((error) => {
      console.error('Application metrics failed:', error);
      return null;
    }),
    fetchGa4Overview(range).catch((error) => {
      console.error('GA4 metrics failed:', error);
      return {
        configured: false as const,
        reason:
          'No pudimos consultar Google Analytics. Revisá las credenciales y la configuración del servidor.',
      };
    }),
  ]);

  const inactiveWithLogin = users
    ? Math.max(users.inactive - users.neverSignedIn, 0)
    : 0;

  const userBreakdown = users
    ? [
        { label: 'Activos', count: users.active },
        { label: 'Inactivos con login previo', count: inactiveWithLogin },
        { label: 'Nunca ingresaron', count: users.neverSignedIn },
      ]
    : [];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al dashboard
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Uso de JobTracker
              </h1>
              <Badge variant="outline">Acceso restringido</Badge>
            </div>
            <p className="max-w-3xl text-sm text-muted-foreground">
              Usuarios y postulaciones desde Supabase; tráfico, geografía y
              eventos desde Google Analytics. GA4 solo incluye sesiones con
              consentimiento, así que sus números son un piso.
            </p>
          </div>
          <AnalyticsRangeTabs current={range} />
        </header>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Usuarios</h2>
            <p className="text-sm text-muted-foreground">
              Fuente: Supabase Auth. Activo = último inicio de sesión dentro de
              los últimos {range} días.
            </p>
          </div>

          {users ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  label="Registrados"
                  value={formatNumber(users.total)}
                  hint="Cuentas totales"
                  icon={Users}
                />
                <MetricCard
                  label="Activos"
                  value={formatNumber(users.active)}
                  hint={`Login en los últimos ${range} días`}
                  icon={UserCheck}
                  accent="success"
                />
                <MetricCard
                  label="Inactivos"
                  value={formatNumber(users.inactive)}
                  hint={`Sin login en ${range} días o nunca`}
                  icon={UserX}
                  accent="warning"
                />
                <MetricCard
                  label="Nuevos"
                  value={formatNumber(users.newUsers)}
                  hint={`Creados en los últimos ${range} días`}
                  icon={UserPlus}
                />
              </div>

              <Card className="rounded-2xl border-primary/10">
                <CardHeader>
                  <CardTitle className="text-base">
                    Actividad de cuentas
                  </CardTitle>
                  <CardDescription>
                    Una sesión persistente no actualiza el último login, así que
                    los activos pueden estar subestimados.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BreakdownBarList
                    items={userBreakdown}
                    total={users.total}
                  />
                </CardContent>
              </Card>
            </>
          ) : (
            <UnavailableCard label="las métricas de usuarios" />
          )}
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Tráfico y audiencia</h2>
              <p className="text-sm text-muted-foreground">
                Fuente: Google Analytics 4. Los reportes estándar usan días
                completos; “ahora” sale de Realtime.
              </p>
            </div>
            {ga4.configured ? (
              <Badge variant="outline">GA4 conectado</Badge>
            ) : null}
          </div>

          {ga4.configured ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  label="Usuarios activos"
                  value={formatNumber(ga4.totals.activeUsers)}
                  hint={formatDelta(
                    ga4.totals.activeUsers,
                    ga4.previousTotals?.activeUsers,
                  )}
                  icon={Activity}
                />
                <MetricCard
                  label="Usuarios nuevos"
                  value={formatNumber(ga4.totals.newUsers)}
                  hint={formatDelta(
                    ga4.totals.newUsers,
                    ga4.previousTotals?.newUsers,
                  )}
                  icon={UserPlus}
                />
                <MetricCard
                  label="Sesiones"
                  value={formatNumber(ga4.totals.sessions)}
                  hint={formatDelta(
                    ga4.totals.sessions,
                    ga4.previousTotals?.sessions,
                  )}
                  icon={MousePointerClick}
                />
                <MetricCard
                  label="Páginas vistas"
                  value={formatNumber(ga4.totals.pageViews)}
                  hint={formatDelta(
                    ga4.totals.pageViews,
                    ga4.previousTotals?.pageViews,
                  )}
                  icon={Eye}
                />
                <MetricCard
                  label="Engagement"
                  value={formatRatio(ga4.totals.engagementRate)}
                  hint={formatDelta(
                    ga4.totals.engagementRate,
                    ga4.previousTotals?.engagementRate,
                  )}
                  icon={Percent}
                />
                <MetricCard
                  label="Duración media"
                  value={formatDuration(ga4.totals.averageSessionDuration)}
                  hint="Por sesión"
                  icon={Clock}
                />
                <MetricCard
                  label="Activos ahora"
                  value={formatNumber(ga4.realtimeUsers)}
                  hint="Últimos 30 minutos"
                  icon={Zap}
                  accent="success"
                />
                <MetricCard
                  label="Activos 28 días"
                  value={formatNumber(ga4.active28Day)}
                  hint={`1d: ${formatNumber(ga4.active1Day)} · 7d: ${formatNumber(ga4.active7Day)}`}
                  icon={TrendingUp}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Globe2 className="h-4 w-4 text-primary" />
                      Países
                    </CardTitle>
                    <CardDescription>
                      Usuarios activos y sesiones por país.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      columns={[
                        {
                          key: 'country',
                          header: 'País',
                          render: (row) => row.country,
                        },
                        {
                          key: 'users',
                          header: 'Usuarios',
                          align: 'right',
                          render: (row) => formatNumber(row.activeUsers),
                        },
                        {
                          key: 'sessions',
                          header: 'Sesiones',
                          align: 'right',
                          render: (row) => formatNumber(row.sessions),
                        },
                      ]}
                      rows={ga4.countries}
                      getRowKey={(row) => row.country}
                    />
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Link2 className="h-4 w-4 text-primary" />
                      Fuentes de tráfico
                    </CardTitle>
                    <CardDescription>
                      De dónde llegan las sesiones.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      columns={[
                        {
                          key: 'source',
                          header: 'Fuente / medio',
                          render: (row) => row.source,
                        },
                        {
                          key: 'sessions',
                          header: 'Sesiones',
                          align: 'right',
                          render: (row) => formatNumber(row.sessions),
                        },
                        {
                          key: 'users',
                          header: 'Usuarios',
                          align: 'right',
                          render: (row) => formatNumber(row.activeUsers),
                        },
                      ]}
                      rows={ga4.sources}
                      getRowKey={(row) => row.source}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-base">Dispositivos</CardTitle>
                    <CardDescription>
                      Usuarios activos por tipo de dispositivo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BreakdownBarList
                      items={ga4.devices.map((device) => ({
                        label: DEVICE_LABELS[device.device] ?? device.device,
                        count: device.activeUsers,
                      }))}
                      total={ga4.devices.reduce(
                        (sum, device) => sum + device.activeUsers,
                        0,
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Eventos de producto
                    </CardTitle>
                    <CardDescription>
                      Acciones trackeadas en la app durante el rango.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      columns={[
                        {
                          key: 'event',
                          header: 'Evento',
                          render: (row) =>
                            EVENT_LABELS[row.eventName] ?? row.eventName,
                        },
                        {
                          key: 'count',
                          header: 'Veces',
                          align: 'right',
                          render: (row) => formatNumber(row.count),
                        },
                      ]}
                      rows={ga4.events}
                      getRowKey={(row) => row.eventName}
                    />
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <Card className="rounded-2xl border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Google Analytics no está conectado
                </CardTitle>
                <CardDescription>{ga4.reason}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Variables necesarias:{' '}
                  <code className="rounded bg-muted px-1 py-0.5">
                    GA4_PROPERTY_ID
                  </code>
                  ,{' '}
                  <code className="rounded bg-muted px-1 py-0.5">
                    GA4_CLIENT_EMAIL
                  </code>{' '}
                  y{' '}
                  <code className="rounded bg-muted px-1 py-0.5">
                    GA4_PRIVATE_KEY
                  </code>
                  .
                </p>
                <p>
                  La guía paso a paso está en{' '}
                  <code className="rounded bg-muted px-1 py-0.5">
                    docs/ANALYTICS.md
                  </code>
                  .
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Postulaciones</h2>
            <p className="text-sm text-muted-foreground">
              Fuente: Supabase, agregando todas las cuentas con service role.
              “En el rango” usa la fecha de postulación.
            </p>
          </div>

          {applications ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  label="Postulaciones"
                  value={formatNumber(applications.total)}
                  hint="Histórico total"
                  icon={Briefcase}
                />
                <MetricCard
                  label="En el rango"
                  value={formatNumber(applications.inRange)}
                  hint={`Últimos ${range} días`}
                  icon={BarChart3}
                />
                <MetricCard
                  label="Entrevistas"
                  value={formatNumber(applications.interviews)}
                  hint={`${formatRate(applications.interviewRate)} del total`}
                  icon={Users}
                  accent="success"
                />
                <MetricCard
                  label="Ofertas"
                  value={formatNumber(applications.offers)}
                  hint={`${formatRate(applications.offerRate)} de las entrevistas`}
                  icon={Trophy}
                  accent="success"
                />
                <MetricCard
                  label="Tasa de entrevistas"
                  value={formatRate(applications.interviewRate)}
                  hint="Entrevistas / postulaciones"
                  icon={Target}
                />
                <MetricCard
                  label="Tasa de ofertas"
                  value={formatRate(applications.offerRate)}
                  hint="Ofertas / entrevistas"
                  icon={Percent}
                />
                <MetricCard
                  label="Usuarios con postulaciones"
                  value={formatNumber(applications.usersWithApplications)}
                  hint="Cuentas con al menos una"
                  icon={UserCheck}
                />
                <MetricCard
                  label="Promedio por usuario"
                  value={formatNumber(applications.applicationsPerUser)}
                  hint="Postulaciones por cuenta activa"
                  icon={TrendingUp}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-base">Por estado</CardTitle>
                    <CardDescription>
                      Distribución actual de todas las postulaciones.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BreakdownBarList
                      items={applications.byStatus.map((item) => ({
                        label: item.status,
                        count: item.count,
                      }))}
                      total={applications.total}
                    />
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-base">Por plataforma</CardTitle>
                    <CardDescription>
                      Dónde se originaron las postulaciones.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BreakdownBarList
                      items={applications.byPlatform}
                      total={applications.total}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Building2 className="h-4 w-4 text-primary" />
                      Empresas con más postulaciones
                    </CardTitle>
                    <CardDescription>
                      Top {applications.topCompanies.length} por cantidad.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      columns={[
                        {
                          key: 'company',
                          header: 'Empresa',
                          render: (row) => row.label,
                        },
                        {
                          key: 'count',
                          header: 'Postulaciones',
                          align: 'right',
                          render: (row) => formatNumber(row.count),
                        },
                      ]}
                      rows={applications.topCompanies}
                      getRowKey={(row) => row.label}
                    />
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Postulaciones por día
                    </CardTitle>
                    <CardDescription>
                      Últimos {range} días, según la fecha de postulación.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DailyBars data={applications.daily} />
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <UnavailableCard label="las métricas de postulaciones" />
          )}
        </section>

        <footer className="border-t pt-4 text-xs text-muted-foreground">
          Página no enlazada en la app. El acceso se valida contra
          ANALYTICS_ALLOWED_EMAILS y devuelve 404 para cualquier otra cuenta.
        </footer>
      </div>
    </main>
  );
}
