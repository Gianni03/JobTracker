import { ApplicationForm } from '@/components/dashboard/application-form';
import { getApplicationById } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  const application = await getApplicationById(params.id);

  if (!application) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Editar Postulación
          </h1>
          <p className="text-muted-foreground">
            Actualiza la información de tu postulación a {application.company}
          </p>
        </div>
      </div>
      <ApplicationForm application={application} />
    </div>
  );
}
