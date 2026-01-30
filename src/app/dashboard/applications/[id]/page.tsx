import { ApplicationForm } from '@/components/dashboard/application-form';
import { getApplicationById } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditApplicationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const application = await getApplicationById(id);

  if (!application) {
    notFound();
  }

  const redirectTo =
    from === 'dashboard' ? '/dashboard' : '/dashboard/applications';

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={redirectTo}>
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
      <ApplicationForm application={application} redirectTo={redirectTo} />
    </div>
  );
}
