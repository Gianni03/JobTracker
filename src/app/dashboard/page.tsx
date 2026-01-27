import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, CalendarCheck, Plus, Trophy, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ApplicationsTable } from "@/components/dashboard/applications-table";
import { fetchUserApplications } from "@/lib/data";
import { differenceInDays } from "date-fns";

export default async function DashboardPage() {
    const applications = await fetchUserApplications();
    const totalApplications = applications.length;
    const interviews = applications.filter(app => app.status === 'Entrevista').length;
    const offers = applications.filter(app => app.status === 'Oferta').length;
    const responseRate = totalApplications > 0 ? Math.round(((totalApplications - applications.filter(app => app.status === 'Ghosted').length) / totalApplications) * 100) : 0;

    const activeApplications = applications.filter(app => {
      const isRejectedOrGhosted = app.status === 'Rechazado' || app.status === 'Ghosted';
      if (isRejectedOrGhosted) {
          return false;
      }

      if (app.status === 'Aplicado') {
          const daysSinceApplication = differenceInDays(new Date(), new Date(app.date + "T00:00:00"));
          if (daysSinceApplication > 20) {
              return false;
          }
      }

      return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Gestiona y realiza seguimiento de todas tus postulaciones</p>
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
        <h2 className="text-xl font-bold font-headline text-foreground">Mis Postulaciones Activas</h2>
        <Link href="/dashboard/applications/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Postulación
          </Button>
        </Link>
      </div>
      
      <ApplicationsTable applications={activeApplications} />
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
           
           <ApplicationsTable applications={applications} />
        </div>
        <div className="col-span-3">
           <RecentActivity applications={applications} />
        </div>
      </div>
    </div> */}

    </div>
  );
}
