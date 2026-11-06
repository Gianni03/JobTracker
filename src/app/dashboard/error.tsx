'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, LayoutDashboard, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-headline">
            No pudimos cargar el dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Revisá tu conexión e intentá de nuevo. Si el problema sigue, volvé
            al inicio del dashboard.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <Button onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reintentar
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Ir al dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
