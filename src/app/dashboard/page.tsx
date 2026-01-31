import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  CalendarCheck,
  Plus,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { ApplicationsTable } from '@/components/dashboard/applications-table';
import { DateRangeFilter } from '@/components/dashboard/date-range-filter';
import { fetchUserApplications } from '@/lib/data';
import { filterApplicationsByDate } from '@/lib/date-utils';
import { differenceInDays } from 'date-fns';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const applications = await fetchUserApplications();

  const range = (searchParams?.range as string) || '30d';
  const from = searchParams?.from as string;

  const filteredApplications = filterApplicationsByDate(
    applications,
    range,
    from
  );

  const totalApplications = filteredApplications.length;
  const interviews = filteredApplications.filter(
    (app) => app.status === 'Entrevista' // Note: Original code was just 'Entrevista'. Consider matching stats page logic later if needed.
  ).length;
  const offers = filteredApplications.filter(
    (app) => app.status === 'Oferta'
  ).length;

  // Calculate response rate based on the filtered set
  const responseRate =
    totalApplications > 0
      ? Math.round(
          ((totalApplications -
            filteredApplications.filter((app) => app.status === 'Ghosted')
              .length) /
            totalApplications) *
            100
        )
      : 0;

  // Filter for active applications.
  // Should we show ALL active applications regardless of date, or only active ones in the date range?
  // Usually "Dashboard" "My Active Applications" might imply "Current Work".
  // However, the prompt specifically asked for date ranges on dashboard and metrics page.
  // If I filter by "Last 30 days", showing a 2-month old active application in the table might be confusing if the stats say "Total: 5" (from this month).
  // So I will apply the date filter to everything on the page.

  const activeApplications = filteredApplications.filter((app) => {
    const isRejectedOrGhosted =
      app.status === 'Rechazado' || app.status === 'Ghosted';
    if (isRejectedOrGhosted) {
      return false;
    }

    if (app.status === 'Aplicado') {
      const daysSinceApplication = differenceInDays(
        new Date(),
        new Date(app.date + 'T00:00:00')
      );
      if (daysSinceApplication > 20) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Gestiona y realiza seguimiento de tus postulaciones
          </p>
        </div>
        <DateRangeFilter />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <StatCard
          title="Total Postulaciones"
          value={totalApplications}
          icon={<Briefcase className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Entrevistas"
          value={interviews}
          icon={<CalendarCheck className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Ofertas"
          value={offers}
          icon={<Trophy className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Tasa de Respuesta"
          value={`${responseRate}%`}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold font-headline text-foreground">
          Postulaciones Activas (en rango)
        </h2>
        <Link href="/dashboard/applications/new?from=dashboard">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Postulación
          </Button>
        </Link>
      </div>

      <ApplicationsTable applications={activeApplications} />
    </div>
  );
}
