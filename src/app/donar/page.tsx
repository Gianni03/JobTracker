import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { DonationContent } from '@/components/donar/donation-content';

export const metadata: Metadata = {
  title: 'Doná a JobTracker — Mantené el proyecto online',
  description:
    'JobTracker es gratis y sin anuncios. Si te sirve, podés donar con Cafecito o Mercado Pago para mantener la infraestructura y el desarrollo.',
};

export const dynamic = 'force-dynamic';

export default async function DonatePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard/donar');
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold font-headline sm:text-xl">
              JobTracker
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a la app
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <DonationContent />
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} JobTracker.</p>
          <p>Hecho con café y Supabase.</p>
        </div>
      </footer>
    </div>
  );
}
