'use client';

import { useState, useTransition } from 'react';
import { AlertCircle, Link2, Loader2, Wand2 } from 'lucide-react';
import { importJobFromUrl } from '@/lib/job-import/actions';
import type { ImportedJob } from '@/lib/job-import/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';

interface JobUrlImporterProps {
  onImported: (job: ImportedJob) => void;
}

export function JobUrlImporter({ onImported }: JobUrlImporterProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleImport = () => {
    if (!url.trim() || isPending) return;

    setError(null);

    startTransition(async () => {
      const result = await importJobFromUrl({ url });

      if (!result.success) {
        setError(result.error);
        return;
      }

      onImported(result.job);
      trackEvent('import_job_url', {
        has_company: Boolean(result.job.company),
        has_role: Boolean(result.job.role),
        has_salary: Boolean(result.job.salary),
      });
      toast({
        title: 'Oferta importada',
        description:
          'Revisá los datos autocompletados antes de guardar la postulación.',
      });
    });
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wand2 className="h-5 w-5 text-primary" />
          Importar desde URL
        </CardTitle>
        <CardDescription>
          Pegá el link de LinkedIn, GetOnBoard o la web de la empresa y
          autocompletamos empresa, puesto, descripción y salario cuando estén
          disponibles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleImport();
          }}
          className="space-y-3"
        >
          <div className="space-y-2">
            <Label htmlFor="job-url">URL de la oferta</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="job-url"
                  type="url"
                  inputMode="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://www.linkedin.com/jobs/view/..."
                  className="pl-9"
                  disabled={isPending}
                />
              </div>
              <Button
                type="submit"
                disabled={isPending || !url.trim()}
                className="sm:w-auto"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importando...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Autocompletar
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <p className="flex items-start gap-2 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Solo funcionan páginas públicas. Algunos portales bloquean la
            lectura automática: en ese caso podés cargar los datos a mano.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
