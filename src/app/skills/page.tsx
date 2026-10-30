import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { SkillsGuide } from '@/components/skills/skills-guide';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Skills para IA — JobTracker',
  description:
    'Guía de instalación y uso de las skills de agente para búsqueda laboral, postulaciones y entrevistas.',
};

export default function PublicSkillsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline text-xl font-bold">JobTracker</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/">Ingresar</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <SkillsGuide />
      </main>
    </div>
  );
}
