import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  User,
  FileText,
  Settings,
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  ExternalLink,
  Target,
  Zap,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

export default function CvPortfolioPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/resources">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            CV de Alto Impacto
          </h1>
          <p className="text-muted-foreground">
            Crea un currículum que capture la atención y pase los filtros ATS.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* SECCIÓN: Claves Generales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Claves para un CV Exitoso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border bg-card/50 shadow-sm space-y-3 transition-all hover:shadow-md">
              <h3 className="font-bold text-primary">Adapta tu CV</h3>
              <p className="text-sm text-muted-foreground">
                Ajusta tu experiencia y habilidades para cada puesto específico.
                No uses el mismo para todo.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 shadow-sm space-y-3 transition-all hover:shadow-md">
              <h3 className="font-bold text-primary">Logros vs Tareas</h3>
              <p className="text-sm text-muted-foreground">
                Usa verbos de acción y cuantifica resultados (&quot;Logré Y
                haciendo X, resultando en Z%&quot;).
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 shadow-sm space-y-3 transition-all hover:shadow-md">
              <h3 className="font-bold text-primary">Formato ATS</h3>
              <p className="text-sm text-muted-foreground">
                Usa un diseño limpio, fácil de escanear por softwares y humanos.
                Viñetas y negritas son clave.
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN DETALLADA POR SECCIÓN */}
        <section className="space-y-12">
          <h2 className="text-2xl font-bold font-headline text-center">
            Guía Detallada por Sección
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Información Personal */}
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b bg-muted/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Información Personal</h3>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary tracking-widest">
                    <Zap className="h-3 w-3" /> Optimización ATS
                  </div>
                  <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                    <li>Nombre legal completo y credenciales profesionales.</li>
                    <li>Email profesional (evita apodos).</li>
                    <li>LinkedIn y GitHub activos y actualizados.</li>
                  </ul>
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-green-600 tracking-widest">
                    <Lightbulb className="h-3 w-3" /> Pro Tips
                  </div>
                  <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                    <li>El título debe coincidir con el rol al que aplicas.</li>
                    <li>Web personal o portfolio &gt; blog personal.</li>
                    <li>
                      Mantén la info de contacto en una sola línea para ahorrar
                      espacio.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Resumen Profesional */}
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b bg-muted/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Resumen Profesional</h3>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-sm text-red-600 font-medium">
                  Crítico: El 90% de los CVs en tech fallan aquí por no ser
                  personalizados.
                </div>
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase text-primary tracking-widest">
                    Fórmula Ganadora
                  </div>
                  <p className="text-xs font-mono bg-muted p-3 rounded-lg border">
                    [X+ años de exp] + [Rol] + [Tech Principal] + [Logro
                    Cuantificado] + [Educación/Cert]
                  </p>
                </div>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                  <li>Debe coincidir en 60%+ con las keywords del JD.</li>
                  <li>
                    Evita lenguaje genérico de IA (se nota y se penaliza).
                  </li>
                  <li>Menciona tecnologías específicas del anuncio.</li>
                </ul>
              </div>
            </div>

            {/* 3. Habilidades Técnicas */}
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b bg-muted/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                  <Settings className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Habilidades Técnicas</h3>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase text-primary tracking-widest">
                    Lo más buscado en 2026
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'AI/ML Frameworks',
                      'Cloud Architecture',
                      'DevOps/CI/CD',
                      'Microservices',
                      'AWS Solutions Architect',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-md bg-primary/5 text-primary text-[10px] font-bold border border-primary/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-600 tracking-widest">
                    <AlertCircle className="h-3 w-3" /> Errores fatales
                  </div>
                  <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                    <li>
                      Certs básicas (Cloud Practitioner) en roles Senior son una
                      Red Flag.
                    </li>
                    <li>
                      Saca certificaciones que no sean relevantes al target.
                    </li>
                    <li>Agrupa por categorías para mejorar el escaneo.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Experiencia Profesional */}
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm flex flex-col border-primary/20 ring-1 ring-primary/5 shadow-primary/5">
              <div className="p-6 border-b bg-primary/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Experiencia Profesional</h3>
              </div>
              <div className="p-8 space-y-6 flex-1 text-balance">
                <div className="text-xs font-bold uppercase text-primary tracking-widest">
                  Fórmula de Impacto (STAR)
                </div>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-xs italic font-medium">
                  [Verbo de Acción] + [Tecnología] + [Contexto] + [Resultado
                  Cuantificado]
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-red-500 uppercase">
                      ❌ Evitar
                    </span>
                    <p className="text-[11px] text-muted-foreground italic">
                      &quot;Responsable de...&quot;, &quot;Ayudé a...&quot;,
                      &quot;Colaboré en...&quot;
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-green-500 uppercase">
                      ✔️ Usar
                    </span>
                    <p className="text-[11px] text-muted-foreground italic">
                      &quot;Arquitecté...&quot;, &quot;Desarrollé...&quot;,
                      &quot;Optimicé...&quot;
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground pt-4 border-t">
                  * Los Hiring Managers buscan: Criterio senior, mentalidad de
                  mejora de procesos y capacidad de generar impacto de negocio.
                </p>
              </div>
            </div>

            {/* 5. Proyectos */}
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b bg-muted/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                  <Code className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Proyectos Técnicos</h3>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                  <li>
                    <strong>URLs Vivas:</strong> Siempre incluye GitHub + Demo
                    links.
                  </li>
                  <li>
                    <strong>Impacto de Usuario:</strong> &quot;Servir a 500+
                    usuarios&quot; mata cualquier detalle técnico.
                  </li>
                  <li>
                    <strong>Stack Moderno:</strong> Usa tecnologías vigentes y
                    demandadas.
                  </li>
                  <li>
                    <strong>Problemas Reales:</strong> Resuelve necesidades de
                    negocio, no solo &quot;Tutoriales&quot;.
                  </li>
                </ul>
                <div className="p-4 bg-muted/50 rounded-xl text-[11px] space-y-1">
                  <p className="font-bold">Evitar:</p>
                  <p>
                    Clones de tutoriales, apps CRUD básicas, stacks obsoletos o
                    links rotos.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Educación */}
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b bg-muted/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Educación</h3>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase text-primary tracking-widest">
                    Estrategia de Ubicación
                  </div>
                  <ul className="text-[13px] space-y-2 text-muted-foreground">
                    <li>
                      <strong>Junior/Grads:</strong> Arriba, incluye promedio si
                      es 8.5+.
                    </li>
                    <li>
                      <strong>Seniors (5+ exp):</strong> Abajo, 1-2 líneas
                      máximo. El espacio premium es para experiencia.
                    </li>
                    <li>
                      <strong>No-Grado:</strong> Enfoque total en
                      Certificaciones y Bootcamps.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Carta de Presentación */}
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm lg:col-span-2">
              <div className="p-6 border-b bg-muted/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-bold">
                  Carta de Presentación (Cover Letter)
                </h3>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary italic">
                      1. Apertura
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Gancho + Posición + Breve resumen de calificación.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary italic">
                      2. Cuerpo
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Logros específicos + Investigación de empresa + Valor
                      agregado.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary italic">
                      3. Cierre
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Llamado a la acción + Agradecimiento + Firma profesional.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-500" /> Máximo
                      una página
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />{' '}
                      Personalizada por empresa
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-xs font-bold text-primary">
                    Aumenta un 50% tus chances de entrevista
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Herramientas */}
        <section className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold font-headline">
                Constructores Recomendados
              </h2>
              <p className="text-muted-foreground max-w-md">
                Utiliza estas herramientas para asegurar un formato profesional
                y compatible con ATS.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-2xl gap-2 font-bold group"
                asChild
              >
                <a
                  href="https://torcresumetemplate.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Torc Resume Template
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl gap-2 font-bold group bg-background/50"
                asChild
              >
                <a
                  href="https://flowcv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FlowCV (Gratis)
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
          {/* Abstract blobs for aesthetics */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </section>
      </div>
    </div>
  );
}
