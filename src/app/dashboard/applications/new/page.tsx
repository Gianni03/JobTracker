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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={redirectTo}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Nueva Postulación
          </h1>
          <p className="text-muted-foreground">
            Añade una nueva postulación para hacerle seguimiento
          </p>
        </div>
      </div>
      <ApplicationForm redirectTo={redirectTo} />
    </div>
  );
}
