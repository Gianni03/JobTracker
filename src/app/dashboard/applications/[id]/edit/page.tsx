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

  const detailHref = from
    ? `/dashboard/applications/${id}?from=${from}`
    : `/dashboard/applications/${id}`;

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 sm:gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={detailHref}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold font-headline text-foreground sm:text-3xl">
            Editar Postulación
          </h1>
          <p className="break-words text-sm text-muted-foreground sm:text-base">
            Actualiza la información de tu postulación a {application.company}
          </p>
        </div>
      </div>
      <ApplicationForm application={application} redirectTo={detailHref} />
    </div>
  );
}
