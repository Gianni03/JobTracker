import { fetchUserApplications } from '@/lib/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  BarChart3,
  TrendingUp,
  Users,
  XCircle,
  Sparkles,
  Target,
} from 'lucide-react';
import { StatusChart } from '@/components/charts/status-chart';
import { MonthlyChart } from '@/components/charts/monthly-chart';
import { ConversionRates } from '@/components/charts/conversion-rates';
import { SankeyChart } from '@/components/charts/sankey-chart';
import { DateRangeFilter } from '@/components/dashboard/date-range-filter';
import { filterApplicationsByDate } from '@/lib/date-utils';
import { Badge } from '@/components/ui/badge';

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const applicationsRaw = await fetchUserApplications();
  const params = await searchParams;

  const range = (params?.range as string) || '30d';
  const from = params?.from as string;

  const applications = filterApplicationsByDate(applicationsRaw, range, from);

  // --- CÁLCULOS DE MÉTRICAS ---
  const total = applications.length;
  const active = applications.filter((app) =>
    ['Aplicado', 'Entrevista', 'Oferta'].includes(app.status),
  ).length;

  const interviewCount = applications.filter(
    (a) =>
      a.status === 'Entrevista' ||
      a.status === 'Oferta' ||
      (a.status === 'Rechazado' && a.interviewStage),
  ).length;

  const offers = applications.filter((app) => app.status === 'Oferta').length;
  const rejections = applications.filter(
    (app) => app.status === 'Rechazado',
  ).length;

  // Tasa de conversión
  const responseRate =
    total > 0 ? Math.round((interviewCount / total) * 100) : 0;
  const offerRate =
    interviewCount > 0 ? Math.round((offers / interviewCount) * 100) : 0;

  return (
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground tracking-tight">
            Estadísticas de{' '}
            <span className="text-primary italic">Rendimiento</span>
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Analiza visualmente el éxito de tu proceso de búsqueda.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="h-9 px-4 rounded-xl border-dashed"
          >
            {total} Postulaciones
          </Badge>
          <DateRangeFilter />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[2rem] border-primary/5 bg-primary/5 overflow-hidden group hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Postulaciones
            </CardTitle>
            <div className="p-2 bg-background rounded-xl border">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-primary font-bold">{active}</span> activas
              actualmente
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-primary/5 bg-primary/5 overflow-hidden group hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Entrevistas Logradas
            </CardTitle>
            <div className="p-2 bg-background rounded-xl border">
              <Users className="h-4 w-4 text-[#3D405B]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {interviewCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-[#3D405B] font-bold">{responseRate}%</span>{' '}
              tasa de respuesta
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-primary/5 bg-primary/5 overflow-hidden group hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Ofertas Finales
            </CardTitle>
            <div className="p-2 bg-background rounded-xl border">
              <TrendingUp className="h-4 w-4 text-[#81B29A]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{offers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-[#81B29A] font-bold">{offerRate}%</span>{' '}
              éxito en entrevistas
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-primary/5 bg-primary/5 overflow-hidden group hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Descartes
            </CardTitle>
            <div className="p-2 bg-background rounded-xl border">
              <XCircle className="h-4 w-4 text-[#F28482]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {rejections}
            </div>
            <p className="text-xs text-muted-foreground mt-1 italic">
              Keep going, it&apos;s a funnel.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sankey Chart - Full Width */}
      <Card className="rounded-[2.5rem] border-primary/5 overflow-hidden shadow-sm">
        <CardHeader className="border-b bg-muted/20 pb-4 px-8 pt-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Flujo de Postulaciones</CardTitle>
              <CardDescription>
                Diagrama de Sankey mostrando la evolución de tus procesos.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <SankeyChart applications={applications} />
        </CardContent>
      </Card>

      {/* Distribution & Volume Charts - Side by Side */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="rounded-[2.5rem] border-primary/5 overflow-hidden shadow-sm">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <CardTitle className="text-lg">Distribución por Estado</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <StatusChart applications={applications} />
          </CardContent>
        </Card>
        <Card className="rounded-[2.5rem] border-primary/5 overflow-hidden shadow-sm">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <CardTitle className="text-lg">Volumen Mensual</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <MonthlyChart applications={applications} />
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel - Bottom Full Width */}
      <Card className="rounded-[2.5rem] border-primary/5 bg-muted/10 overflow-hidden shadow-sm">
        <CardHeader className="border-b bg-muted/10 pb-4 px-8 pt-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold font-headline italic">
                Tasa de Conversión & Eficiencia
              </CardTitle>
              <CardDescription>
                Identifica en qué etapa del embudo estás perdiendo más
                oportunidades.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <ConversionRates applications={applications} />
        </CardContent>
      </Card>
    </div>
  );
}
