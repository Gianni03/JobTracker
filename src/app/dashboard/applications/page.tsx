import { fetchUserApplications } from '@/lib/data';
import { ApplicationsFilterableTable } from '@/components/dashboard/applications-filterable-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function AllApplicationsPage() {
  const applications = await fetchUserApplications();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Todas las Postulaciones
          </h1>
          <p className="text-muted-foreground">
            Filtra y gestiona el historial completo de tus postulaciones.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/applications/new">
            <Plus className="mr-2 h-4 w-4" /> Nueva Postulación
          </Link>
        </Button>
      </div>

      <ApplicationsFilterableTable initialApplications={applications} />
    </div>
  );
}
