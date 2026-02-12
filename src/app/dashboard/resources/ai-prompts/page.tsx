import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AiPromptsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/resources">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Prompts de IA para Búsqueda Laboral
          </h1>
          <p className="text-muted-foreground">
            Aprovecha la inteligencia artificial para optimizar tu búsqueda de
            empleo.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-12 pb-12">
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">
            Para Optimizar tu CV según la oferta de empleo
          </h2>
          <p className="text-muted-foreground mb-6">
            Pega la descripción de tu puesto y la descripción del trabajo, luego
            usa este prompt:
          </p>
          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  1
                </span>
                <p>
                  Identificar las palabras clave y requisitos principales del
                  puesto.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  2
                </span>
                <p>
                  Señalar cuáles de esas palabras clave ya están en mi CV y
                  cuáles faltan.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  3
                </span>
                <p>
                  Reescribir mi CV incorporando únicamente las palabras clave
                  que reflejen experiencias, habilidades o logros que realmente
                  tengo, sin inventar información ni modificar la esencia de mi
                  perfil.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  4
                </span>
                <p>
                  Mantener un estilo profesional, claro y conciso, optimizado
                  para ATS.
                </p>
              </li>
            </ul>
            <div className="pt-4 border-t">
              <p className="text-sm font-medium">
                Aquí está la descripción del puesto:{' '}
                <span className="text-primary italic">[pegar descripción]</span>
                .
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline mb-6">
            Prompt para Búsqueda Laboral Especializada
          </h2>
          <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 space-y-8">
              {/* Objetivo */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Objetivo
                </span>
                <p className="text-lg leading-relaxed font-medium">
                  Encontrar oportunidades laborales de alta calidad que
                  coincidan exactamente con el perfil profesional proporcionado,
                  mediante métodos avanzados de investigación online.
                </p>
              </div>

              {/* Datos del Perfil */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Datos del Perfil
                  </span>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                      <p>
                        <strong>Áreas de experiencia:</strong> (industrias y
                        tecnologías que buscas)
                      </p>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                      <p>
                        <strong>Nombre del puesto:</strong> (puesto que buscas)
                      </p>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                      <p>
                        <strong>Ubicación:</strong> (donde buscas, puedes
                        colocar diferentes opciones para diferentes tablas)
                      </p>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                      <p>
                        <strong>Periodo de búsqueda:</strong> (limitar fechas de
                        publicaciones)
                      </p>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground italic pl-4 border-l-2">
                    * Mi CV está adjunto para comparación y análisis.
                  </p>
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Criterios de Búsqueda
                  </span>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-primary">✓</span>
                      <p>
                        <strong>Tipo de puesto:</strong> Excluir trainee,
                        pasantías y ofertas no acordes.
                      </p>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-primary">✓</span>
                      <p>
                        <strong>Contrato:</strong> Tiempo completo o indefinido.
                      </p>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-primary">✓</span>
                      <p>
                        <strong>Tecnologías:</strong> (todo lo que conoces y
                        quieres trabajar)
                      </p>
                    </li>
                    <li className="flex items-start gap-2 text-sm font-bold text-destructive">
                      <span className="mt-1">⚠</span>
                      <p>Obligatorio el link a la oferta.</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Método de Investigación */}
              <div className="space-y-4 pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Método de Investigación
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-bold text-sm">1. Búsqueda Inicial</p>
                    <p className="text-xs text-muted-foreground">
                      Filtros avanzados y búsquedas booleanas en páginas
                      oficiales.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-bold text-sm">2. Investigación</p>
                    <p className="text-xs text-muted-foreground">
                      Identificación de empresas en expansión y tendencias de
                      mercado.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-bold text-sm">3. Validación</p>
                    <p className="text-xs text-muted-foreground">
                      Verificación de legitimidad y reputación en
                      Glassdoor/LinkedIn.
                    </p>
                  </div>
                </div>
              </div>

              {/* Resultados Esperados */}
              <div className="space-y-4 pt-4 border-t">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Resultados Esperados
                </span>
                <p className="text-sm">
                  Entregar 3 tablas estructuradas (5-10 resultados c/u):
                </p>
                <div className="space-y-3">
                  <div className="flex gap-4 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <span className="flex-none font-bold text-primary">
                      Tabla 1
                    </span>
                    <p className="text-sm">
                      Posiciones presenciales en{' '}
                      <span className="font-medium inline-block underline decoration-primary/30">
                        (tu ubicación)
                      </span>{' '}
                      y alrededores (60km).
                    </p>
                  </div>
                  <div className="flex gap-4 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <span className="flex-none font-bold text-primary">
                      Tabla 2
                    </span>
                    <p className="text-sm">
                      Startups de Estados Unidos con posibilidad{' '}
                      <span className="font-medium inline-block underline decoration-primary/30">
                        remoto Latam
                      </span>
                      .
                    </p>
                  </div>
                  <div className="flex gap-4 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <span className="flex-none font-bold text-primary">
                      Tabla 3
                    </span>
                    <p className="text-sm">
                      Puestos con opción{' '}
                      <span className="font-medium inline-block underline decoration-primary/30">
                        remoto Argentina / Latam
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer del Prompt */}
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg italic text-sm space-y-2 text-balance">
                <p>
                  &quot;Priorizar siempre la calidad sobre la cantidad. Cada
                  resultado debe ser altamente relevante y validado según los
                  criterios detallados. Es de suma importancia incluir el link
                  de cada vacante.&quot;
                </p>
                <p>
                  &quot;Haz una lista corta ultra-calificada con match exacto al CV.
                  Actúa con empatía hacia mi búsqueda activa; cada oferta debe
                  ser una posibilidad real de entrevista.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-headline">
              Para Preparar Entrevistas Conductuales
            </h2>
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <p className="text-sm leading-relaxed">
                Voy a tener una entrevista para el puesto de{' '}
                <span className="font-bold text-primary">[puesto]</span> en{' '}
                <span className="font-bold text-primary">[empresa]</span>.
                Basado en la descripción del puesto{' '}
                <span className="italic text-muted-foreground">
                  [pegar descripción]
                </span>
                , genera 5 preguntas de entrevista conductual probables. Para
                cada pregunta, explícame qué habilidad se busca evaluar.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-headline">
              Para Simular una Entrevista Técnica
            </h2>
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <p className="text-sm leading-relaxed">
                Simulemos una entrevista técnica para un puesto de{' '}
                <span className="font-bold text-primary">[puesto]</span>. Hazme
                una pregunta de nivel intermedio sobre{' '}
                <span className="italic text-muted-foreground">
                  [tecnología, ej: JavaScript]
                </span>
                . Evalúa mi respuesta y dame feedback constructivo sobre su
                claridad, corrección y eficiencia.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
