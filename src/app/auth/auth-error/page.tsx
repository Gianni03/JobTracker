import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Error de autenticación — JobTracker',
  robots: { index: false, follow: false },
};

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-destructive/30 bg-card/50 shadow-xl backdrop-blur-sm">
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <CardTitle>No pudimos completar el inicio de sesión</CardTitle>
          <CardDescription>
            El link puede haber vencido o ya fue usado. Probá de nuevo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/forgot-password">Recuperar contraseña</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
