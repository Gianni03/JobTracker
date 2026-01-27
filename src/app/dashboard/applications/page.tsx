import { fetchUserApplications } from '@/lib/data';
import { ApplicationsFilterableTable } from '@/components/dashboard/applications-filterable-table';

export default async function AllApplicationsPage() {
  const applications = await fetchUserApplications();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Todas las Postulaciones
        </h1>
        <p className="text-muted-foreground">
          Filtra y gestiona el historial completo de tus postulaciones.
        </p>
      </div>

      <ApplicationsFilterableTable initialApplications={applications} />
    </div>
  );
}
