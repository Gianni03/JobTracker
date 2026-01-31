import { fetchUserApplications } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { StatusChart } from '@/components/charts/status-chart';
import { MonthlyChart } from '@/components/charts/monthly-chart';
import { ConversionRates } from '@/components/charts/conversion-rates';
import { SankeyChart } from '@/components/charts/sankey-chart';
import { DateRangeFilter } from '@/components/dashboard/date-range-filter';
import { filterApplicationsByDate } from '@/lib/date-utils';

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const applicationsRaw = await fetchUserApplications();

  const range = (searchParams?.range as string) || '30d';
  const from = searchParams?.from as string;

  const applications = filterApplicationsByDate(applicationsRaw, range, from);

  // --- CÁLCULOS DE MÉTRICAS ---
  const total = applications.length;
  const active = applications.filter((app) =>
    ['Aplicado', 'Entrevista', 'Oferta'].includes(app.status)
  ).length;
  const interviews =
    applications.filter(
      (app) =>
        ['Entrevista', 'Oferta', 'Rechazado'].includes(app.status) &&
        app.interviewStage
    ).length + applications.filter((app) => app.status === 'Entrevista').length;
  // Ajuste simple: Contamos como entrevista si el estado es entrevista u oferta
  const interviewCount = applications.filter(
    (a) => a.status === 'Entrevista' || a.status === 'Oferta'
  ).length;
  const offers = applications.filter((app) => app.status === 'Oferta').length;
  const rejections = applications.filter(
    (app) => app.status === 'Rechazado'
  ).length;

  // Tasa de conversión (evitamos dividir por cero)
  const responseRate =
    total > 0 ? Math.round((interviewCount / total) * 100) : 0;
  const offerRate =
    interviewCount > 0 ? Math.round((offers / interviewCount) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Estadísticas
          </h1>
          <p className="text-muted-foreground">
            Analiza el rendimiento de tus postulaciones
          </p>
        </div>
        <DateRangeFilter />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Postulaciones
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground">
              {active} activas actualmente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewCount}</div>
            <p className="text-xs text-muted-foreground">
              {responseRate}% tasa de respuesta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ofertas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers}</div>
            <p className="text-xs text-muted-foreground">
              {offerRate}% de éxito en entrevistas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazos</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejections}</div>
            <p className="text-xs text-muted-foreground">
              No te desanimes, sigue adelante.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Estadísticas
          </h1>
          <p className="text-muted-foreground">
            Análisis visual de tu rendimiento en las postulaciones.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Flujo de Postulaciones</CardTitle>
          </CardHeader>
          <CardContent>
            {/* El Sankey/Funnel Chart */}
            <SankeyChart applications={applications} />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusChart applications={applications} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Postulaciones por Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyChart applications={applications} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <ConversionRates applications={applications} />
          </CardContent>
        </Card>
      </div>

      {/* <Card>
        <CardHeader>
          <CardTitle>Flujo de Postulaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <SankeyChart applications={applications} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusChart applications={applications} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Postulaciones por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart applications={applications} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tasa de Conversión</CardTitle>
        </CardHeader>
        <CardContent>
          <ConversionRates applications={applications} />
        </CardContent>
      </Card> */}
    </div>
  );
}
