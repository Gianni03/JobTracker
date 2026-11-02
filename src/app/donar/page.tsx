import type { Metadata } from 'next';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Coffee,
  CreditCard,
  Database,
  ExternalLink,
  Heart,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

const cafecitoUrl = 'https://cafecito.app/gianni03';
const mercadopagoSubscriptionUrl = 'https://mpago.la/29fCJaQ';
const mercadopagoOneTimeUrl =
  'https://link.mercadopago.com.ar/giannipasquinelli';

export const metadata: Metadata = {
  title: 'Doná a JobTracker — Mantené el proyecto online',
  description:
    'JobTracker es gratis y sin anuncios. Si te sirve, podés donar con Cafecito o Mercado Pago para mantener la infraestructura y el desarrollo.',
};

const costs = [
  {
    icon: Server,
    title: 'Hosting',
    description: 'El lugar donde vive la app, todos los días.',
  },
  {
    icon: Database,
    title: 'Base de datos y auth',
    description: 'Tus postulaciones, tu cuenta y tus datos seguros.',
  },
  {
    icon: Clock,
    title: 'Tiempo de desarrollo',
    description: 'Horas de mejoras, soporte y mantenimiento.',
  },
  {
    icon: Sparkles,
    title: 'Nuevas mejoras',
    description: 'Lo que viene: más herramientas para tu búsqueda.',
  },
];

const faqs = [
  {
    question: '¿Es obligatorio donar?',
    answer:
      'No. JobTracker sigue siendo gratis para todos. La donación es opcional y no desbloquea nada: la app es la misma para quien dona y para quien no.',
  },
  {
    question: '¿Es una suscripción?',
    answer:
      'Cafecito es un pago único. Mercado Pago te permite suscribirte con el monto que elijas y cancelar cuando quieras. Ninguna de las dos es obligatoria; el pago único también está disponible.',
  },
  {
    question: '¿Qué hacen con mis datos?',
    answer:
      'No se venden ni se usan para publicidad. El proyecto no tiene anunciantes; se mantiene con aportes de quienes lo usan.',
  },
  {
    question: '¿Puedo ayudar sin donar?',
    answer:
      'Sí. Compartí JobTracker con alguien que esté buscando trabajo. Eso también ayuda muchísimo y no cuesta nada.',
  },
];

export default function DonatePage() {
  return (
    <div className={`${fraunces.variable} min-h-screen bg-background`}>
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
        <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:pb-20 lg:pt-12">
          <div className="relative min-w-0 overflow-hidden rounded-[2rem] bg-[#3D405B] p-7 text-[#F4F3F0] shadow-2xl shadow-[#3D405B]/20 sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 18% 12%, rgba(224,122,95,0.45), transparent 42%), radial-gradient(circle at 90% 80%, rgba(129,178,154,0.28), transparent 38%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: 'auto, auto, 44px 44px, 44px 44px',
              }}
            />
            <div className="relative space-y-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-white/20 bg-white/10 font-normal text-white"
                >
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400" />
                  Proyecto online
                </Badge>
                <span className="text-xs text-white/50">
                  Sin anuncios. Sin plan pago.
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#E07A5F]">
                  El proyecto es gratis. La infraestructura no.
                </p>
                <h1
                  className="break-words text-4xl font-semibold leading-[0.98] tracking-tight sm:text-5xl xl:text-6xl"
                  style={{ fontFamily: 'var(--font-fraunces)' }}
                >
                  Mantené JobTracker online con una{' '}
                  <span className="italic text-[#E07A5F]">donación.</span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-[#F4F3F0]/75 sm:text-lg">
                  Sin anuncios, sin planes pagos y sin vender tus datos.
                  JobTracker se mantiene con aportes de quienes lo usan y con
                  horas de trabajo. Si te sirve, ayudá a que siga así.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E07A5F] text-white hover:bg-[#d66a50]"
                >
                  <a
                    href={cafecitoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Coffee className="mr-2 h-4 w-4" />
                    Doná con Cafecito
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <a
                    href={mercadopagoSubscriptionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Suscribirme con Mercado Pago
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>

              <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-sm text-[#F4F3F0]/75">
                  <ShieldCheck className="h-4 w-4 text-[#81B29A]" />
                  Sin anuncios
                </div>
                <div className="flex items-center gap-2 text-sm text-[#F4F3F0]/75">
                  <Heart className="h-4 w-4 text-[#E07A5F]" />
                  Sin paywall
                </div>
                <div className="flex items-center gap-2 text-sm text-[#F4F3F0]/75">
                  <Users className="h-4 w-4 text-[#81B29A]" />
                  Datos que no se venden
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <Card className="min-w-0 overflow-hidden border-primary/20 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Una donación, un proyecto que sigue
                    </CardTitle>
                    <CardDescription>
                      Simple, directo y sin vueltas.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Cada aporte ayuda a cubrir el hosting, la base de datos, el
                  tiempo de mantenimiento y las próximas mejoras. No hay una
                  empresa detrás: hay una persona sosteniendo el proyecto.
                </p>
                <div className="rounded-2xl border bg-muted/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Estado del proyecto
                      </p>
                      <p className="mt-1 flex items-center gap-2 font-medium">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        Online
                      </p>
                    </div>
                    <Heart className="h-8 w-8 text-primary/60 animate-beat" />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    El próximo mes también se paga. Si JobTracker te sirve, no
                    lo dejes para después.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="min-w-0 border-primary/20">
              <CardContent className="flex items-start gap-3 p-4">
                <Heart className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Sin letra chica.
                  </span>{' '}
                  La suscripción de Mercado Pago es opcional: elegís el monto y
                  la cancelás cuando quieras. La app sigue gratis para todos.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Elegí cómo donar
            </p>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Dos formas, el mismo gracias.
            </h2>
            <p className="text-muted-foreground">
              Podés donar con Cafecito o suscribirte por Mercado Pago con el
              monto que elijas. Si preferís una sola vez, también hay pago
              único.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="min-w-0 transition hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Cafecito</CardTitle>
                <CardDescription>
                  Rápido, simple y desde Argentina.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Elegís un monto y listo. Es la forma más directa de decir
                  “gracias, seguí con esto”.
                </p>
                <Button asChild className="w-full">
                  <a
                    href={cafecitoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Donar con Cafecito
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="min-w-0 transition hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Mercado Pago</CardTitle>
                <CardDescription>
                  Suscripción mensual, con el monto que elijas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Elegís cuánto aportar cada mes y podés cancelar cuando
                  quieras. Si preferís una sola vez, también hay pago único.
                </p>
                <Button asChild className="w-full">
                  <a
                    href={mercadopagoSubscriptionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Suscribirme
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={mercadopagoOneTimeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hacer un pago único
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">
                A dónde va
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Tu aporte tiene destino claro.
              </h2>
              <p className="text-muted-foreground">
                No hay oficina, no hay anunciantes y no hay inversores. Esto es
                lo que se mantiene todos los meses.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {costs.map((cost) => (
                <Card key={cost.title} className="min-w-0">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <cost.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{cost.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {cost.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#3D405B] p-8 text-[#F4F3F0] sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 85% 20%, rgba(224,122,95,0.5), transparent 40%)',
              }}
            />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#E07A5F]">
                  Transparencia
                </p>
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                  Sin anuncios. Sin plan pago. Sin respaldo de una empresa.
                </h2>
                <p className="max-w-xl text-[#F4F3F0]/75">
                  Cada mes se renueva la infraestructura. Si el proyecto te
                  sirve, ayudá a que el próximo mes no dependa solo de mí. No
                  hay una cuenta regresiva inventada: la urgencia es real,
                  mantenerlo online cuesta todos los meses.
                </p>
                <p className="text-sm text-[#F4F3F0]/60">
                  Y si no podés donar, compartilo con alguien que esté buscando
                  trabajo. Eso también ayuda muchísimo.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="h-5 w-5 text-[#81B29A]" />
                  <p className="mt-2 text-sm font-medium">Siempre gratis</p>
                  <p className="mt-1 text-xs text-white/60">
                    Para quien dona y para quien no.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="h-5 w-5 text-[#81B29A]" />
                  <p className="mt-2 text-sm font-medium">Sin anuncios</p>
                  <p className="mt-1 text-xs text-white/60">
                    Tus datos no se venden.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Heart className="h-5 w-5 text-[#E07A5F]" />
                  <p className="mt-2 text-sm font-medium">Hecho con cariño</p>
                  <p className="mt-1 text-xs text-white/60">
                    Y con café, mucho café.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Sparkles className="h-5 w-5 text-[#E07A5F]" />
                  <p className="mt-2 text-sm font-medium">Mejora continua</p>
                  <p className="mt-1 text-xs text-white/60">
                    Cada aporte vuelve en features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Preguntas frecuentes
            </p>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Antes de que lo pienses demasiado.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.question} className="min-w-0">
                <CardHeader>
                  <CardTitle className="break-words text-base">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="break-words text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="rounded-[2rem] border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
            <Heart className="mx-auto h-8 w-8 text-primary animate-beat" />
            <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Gracias por estar.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Ojalá que la próxima oferta que aparezca sea la tuya. Y si
              JobTracker te ayudó en el camino, ya sabés dónde donar.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a
                  href={cafecitoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Doná con Cafecito
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                  <a
                    href={mercadopagoSubscriptionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Suscribirme con Mercado Pago
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
              </Button>
            </div>
          </div>
        </section>
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
