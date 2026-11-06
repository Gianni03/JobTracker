import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <FileQuestion className="h-7 w-7 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-headline">
            Página no encontrada
          </h1>
          <p className="text-sm text-muted-foreground">
            La página que buscás no existe o fue movida.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/">Ir al inicio</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Ir al dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
