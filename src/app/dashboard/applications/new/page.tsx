import { ApplicationForm } from '@/components/dashboard/application-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function NewApplicationPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const redirectTo =
    from === 'dashboard' ? '/dashboard' : '/dashboard/applications';

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 sm:gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={redirectTo}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold font-headline text-foreground sm:text-3xl">
            Nueva Postulación
          </h1>
          <p className="break-words text-sm text-muted-foreground sm:text-base">
            Añade una nueva postulación para hacerle seguimiento
          </p>
        </div>
      </div>
      <ApplicationForm redirectTo={redirectTo} />
    </div>
  );
}
