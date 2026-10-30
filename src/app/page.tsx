import type { Metadata } from 'next';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  ListChecks,
  MessagesSquare,
  Search,
  TrendingUp,
  Wand2,
} from 'lucide-react';
import { AuthForm } from '@/components/auth/auth-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: 'JobTracker — Tu búsqueda laboral, en orden',
  description:
    'Seguí tus postulaciones, visualizá métricas y prepará entrevistas. Todo en un solo lugar.',
};

const features = [
  {
    icon: ListChecks,
    title: 'Seguimiento completo',
    description:
      'Empresa, puesto, salario, contacto, notas y feedback en un solo registro.',
  },
  {
    icon: BarChart3,
    title: 'Métricas que importan',
    description:
      'Conversión, evolución mensual y un Sankey para ver dónde se cae el proceso.',
  },
  {
    icon: BookOpen,
    title: 'Preparación integrada',
    description:
      'Recursos de entrevistas, método STAR y banco de preguntas para llegar listo.',
  },
  {
    icon: Wand2,
    title: 'Skills de agente',
    description:
      'Workflows instalables para buscar ofertas, adaptar el CV y preparar entrevistas.',
  },
];

const steps = [
  {
    title: 'Creá tu cuenta',
    description: 'Con email o Google, en menos de un minuto.',
  },
  {
    title: 'Cargá tu primera postulación',
    description: 'Empresa, puesto, estado, fecha y salario si lo tenés.',
  },
  {
    title: 'Movete por el proceso',
    description:
      'Cambiá de estado, agregá feedback y mirá cómo se mueven las métricas.',
  },
];

const skillTeasers = [
  {
    icon: Search,
    name: 'job-search',
    description: 'Busca y filtra ofertas reales.',
  },
  {
    icon: FileText,
    name: 'job-application',
    description: 'Adapta tu CV y escribe la carta.',
  },
  {
    icon: MessagesSquare,
    name: 'interview-prep',
    description: 'Prepara y simula entrevistas.',
  },
];

const productPoints = [
  'Todos los estados y etapas en una sola vista.',
  'Salarios, contacto y feedback sin planillas.',
  'Métricas que se actualizan al cambiar el estado.',
  'Recursos y skills de IA en el mismo lugar.',
];

const bars = [35, 55, 40, 70, 60, 85, 75];

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-headline text-2xl font-bold text-[#F4F3F0]">
        {value}
      </p>
      <p className="text-xs text-[#F4F3F0]/50">{label}</p>
    </div>
  );
}

function StatusPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function MockKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-3">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-headline text-xl font-bold">{value}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className={`${fraunces.variable} min-h-screen bg-background`}>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline text-xl font-bold">JobTracker</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#producto" className="transition hover:text-foreground">
              Producto
            </a>
            <a
              href="#como-funciona"
              className="transition hover:text-foreground"
            >
              Cómo funciona
            </a>
            <a href="#skills" className="transition hover:text-foreground">
              Skills IA
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <a href="#login">Ingresar</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20 lg:pt-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#3D405B] p-8 text-[#F4F3F0] shadow-2xl shadow-[#3D405B]/20 sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 18% 12%, rgba(224,122,95,0.45), transparent 42%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: 'auto, 44px 44px, 44px 44px',
              }}
            />
            <div className="relative space-y-8">
              <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both">
                <p className="text-xs uppercase tracking-[0.3em] text-[#E07A5F]">
                  Tu búsqueda, en orden
                </p>
                <h1
                  className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl"
                  style={{ fontFamily: 'var(--font-fraunces)' }}
                >
                  De postulación en postulación,{' '}
                  <span className="italic text-[#E07A5F]">
                    sin perder el hilo.
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F4F3F0]/75 sm:text-lg">
                  Seguí cada aplicación, mirá tus métricas y prepará tus
                  entrevistas. Todo en un solo lugar, sin planillas.
                </p>
              </div>

              <div
                className="flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both"
                style={{ animationDelay: '120ms' }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E07A5F] text-white hover:bg-[#d66a50]"
                >
                  <a href="#login">
                    Crear cuenta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="#producto">Ver el producto</a>
                </Button>
              </div>

              <div
                className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both"
                style={{ animationDelay: '220ms' }}
              >
                <MiniStat value="5" label="estados" />
                <MiniStat value="1" label="dashboard" />
                <MiniStat value="0" label="planillas" />
              </div>

              <div
                className="rounded-2xl border border-white/10 bg-white/5 p-4 animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both"
                style={{ animationDelay: '320ms' }}
              >
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
                  Tu proceso
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill className="border-yellow-200 bg-yellow-100 text-yellow-900">
                    Aplicado
                  </StatusPill>
                  <ArrowRight className="h-4 w-4 text-white/40" />
                  <StatusPill className="border-blue-200 bg-blue-100 text-blue-900">
                    Entrevista
                  </StatusPill>
                  <ArrowRight className="h-4 w-4 text-white/40" />
                  <StatusPill className="border-green-200 bg-green-100 text-green-900">
                    Oferta
                  </StatusPill>
                </div>
              </div>
            </div>
          </div>

          <div id="login" className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-1 text-center lg:text-left">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  Empezá hoy
                </p>
                <h2 className="font-headline text-2xl font-bold">
                  Entrá a tu cuenta
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tu búsqueda laboral, ordenada de principio a fin.
                </p>
              </div>
              <AuthForm />
              <p className="text-center text-xs text-muted-foreground">
                Gratis. Tus datos quedan en tu cuenta.
              </p>
            </div>
          </div>
        </section>

        <section
          id="producto"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">
                El panel
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Todo el proceso, en una sola vista.
              </h2>
              <p className="max-w-xl text-muted-foreground">
                Postulaciones, estados, entrevistas y ofertas. Los números que
                importan, sin armar una planilla.
              </p>
              <ul className="space-y-3">
                {productPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
              <Card className="relative overflow-hidden rounded-3xl border-primary/20 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 text-primary" />
                    <span className="font-headline font-semibold">Dashboard</span>
                  </div>
                  <Badge variant="secondary">Esta semana</Badge>
                </CardHeader>
                <CardContent className="space-y-4 p-5">
                  <div className="grid grid-cols-3 gap-3">
                    <MockKpi label="Activas" value="12" />
                    <MockKpi label="Entrevistas" value="3" />
                    <MockKpi label="Ofertas" value="1" />
                  </div>

                  <div className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">
                        Postulaciones por mes
                      </p>
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="mt-4 flex h-24 items-end gap-2">
                      {bars.map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t bg-primary/70"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="font-medium">Acme</span>
                      <span className="text-muted-foreground">
                        Frontend Engineer
                      </span>
                      <StatusPill className="border-blue-200 bg-blue-100 text-blue-900">
                        Entrevista
                      </StatusPill>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="font-medium">Nimbus</span>
                      <span className="text-muted-foreground">
                        Product Engineer
                      </span>
                      <StatusPill className="border-yellow-200 bg-yellow-100 text-yellow-900">
                        Aplicado
                      </StatusPill>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="como-funciona"
          className="border-y bg-muted/30 py-16 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">
                Cómo funciona
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Tres pasos y estás en marcha.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <Card key={step.title}>
                  <CardHeader>
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-headline text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24"
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-[#3D405B] p-8 text-[#F4F3F0] sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 85% 20%, rgba(224,122,95,0.5), transparent 40%)',
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#E07A5F]">
                  Skills de agente
                </p>
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                  IA que trabaja con vos, no en un chat.
                </h2>
                <p className="max-w-xl text-[#F4F3F0]/75">
                  Instalá skills de agente para buscar ofertas, adaptar tu CV y
                  preparar entrevistas. Se ejecutan en tu agente, con tus
                  archivos y tu terminal.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/skills">
                    Ver la guía de skills
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-white/50">
                  Guía pública. No es un chat: es un agente con acceso a
                  archivos.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {skillTeasers.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <skill.icon className="h-5 w-5 text-[#E07A5F]" />
                    <p className="mt-3 font-mono text-sm font-medium">
                      {skill.name}
                    </p>
                    <p className="mt-1 text-xs text-[#F4F3F0]/60">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="rounded-[2rem] border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Empezá
            </p>
            <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Tu próxima postulación empieza acá.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Dejá la planilla, ordená el proceso y llegá a la entrevista con
              todo el contexto a mano.
            </p>
            <Button asChild size="lg" className="mt-6">
              <a href="#login">
                Crear cuenta
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} JobTracker.</p>
          <p>Hecho para ordenar la búsqueda.</p>
        </div>
      </footer>
    </div>
  );
}
