import { Briefcase, ListChecks, BarChart3, BookOpen } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-headline">JobTracker</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Gestiona tus postulaciones laborales de forma inteligente
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Realiza seguimiento de cada aplicación, analiza tus estadísticas, prepárate para entrevistas y mantén toda tu información organizada en un solo lugar.
              </p>
            </div>

            <div className="space-y-6">
              <FeatureItem
                icon={<ListChecks className="h-6 w-6 text-primary" />}
                title="Seguimiento Completo"
                description="Registra cada postulación con detalles de empresa, puesto, salarios y estado del proceso."
              />
              <FeatureItem
                icon={<BarChart3 className="h-6 w-6 text-primary" />}
                title="Estadísticas Detalladas"
                description="Visualiza tu progreso con gráficos interactivos y métricas de conversión."
              />
              <FeatureItem
                icon={<BookOpen className="h-6 w-6 text-primary" />}
                title="Recursos de Preparación"
                description="Accede a guías y recursos para prepararte para tus entrevistas."
              />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <AuthForm />
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex items-center justify-center">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} JobTracker. Todos los derechos reservados.
            </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
