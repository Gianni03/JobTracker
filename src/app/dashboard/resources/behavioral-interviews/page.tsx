import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Star,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
} from 'lucide-react';

export default function BehavioralInterviewsPage() {
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
            Entrevistas Conductuales
          </h1>
          <p className="text-muted-foreground">
            Domina el arte de contar tus historias de éxito profesional con
            impacto.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* SECCIÓN 1: El Método STAR */}
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Star className="h-4 w-4" />
            <span>Técnica de Respuesta</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-headline">
                El Método STAR
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Es la técnica fundamental para responder preguntas conductuales
                y situacionales. Permite estructurar historias reales con un
                inicio, conflicto y resolución claros.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl border bg-card/50 shadow-sm transition-all hover:shadow-md">
                  <div className="flex-none w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xl">
                    S
                  </div>
                  <div>
                    <h3 className="font-bold">Situación</h3>
                    <p className="text-sm text-muted-foreground">
                      Contexto. ¿Qué pasó? Brinda 2 o 3 detalles clave sobre el
                      desafío o situación laboral/académica.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border bg-card/50 shadow-sm transition-all hover:shadow-md">
                  <div className="flex-none w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xl">
                    T
                  </div>
                  <div>
                    <h3 className="font-bold">Tarea</h3>
                    <p className="text-sm text-muted-foreground">
                      Tu responsabilidad. ¿Cuál era el objetivo final? Debes ser
                      breve aquí.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border bg-card/50 shadow-sm transition-all hover:shadow-md border-primary/20 ring-1 ring-primary/10">
                  <div className="flex-none w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h3 className="font-bold">Acción (Crucial)</h3>
                    <p className="text-sm text-muted-foreground italic font-medium">
                      Usa &quot;Yo&quot;, no &quot;Nosotros&quot;.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Describe los pasos específicos que TÚ tomaste. Es donde
                      más tiempo debes dedicar.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border bg-card/50 shadow-sm transition-all hover:shadow-md">
                  <div className="flex-none w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center font-bold text-xl">
                    R
                  </div>
                  <div>
                    <h3 className="font-bold">Resultado</h3>
                    <p className="text-sm text-muted-foreground">
                      ¿Cuál fue el desenlace? Cuantifica logros y menciona qué
                      aprendiste.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 overflow-hidden relative">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Cómo prepararse
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                  <p>
                    <strong>Revisa el JD:</strong> Identifica qué desafíos
                    podrías enfrentar en ese puesto específico.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                  <p>
                    <strong>Prepara respuestas STAR:</strong> Escribe 3 a 5
                    historias potentes de tu carrera.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                  <p>
                    <strong>Practica en voz alta:</strong> Asegúrate de que tus
                    historias sean concisas y coherentes.
                  </p>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-background rounded-lg border italic text-xs text-muted-foreground">
                PRO TIP: Si no tienes mucha experiencia, usa ejemplos de
                pasantías, voluntariados o proyectos de la universidad.
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: Tips y Preguntas Frecuentes */}
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <MessageSquare className="h-4 w-4" />
            <span>Consejos y Ejemplos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cómo presentarte */}
            <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b bg-muted/30">
                <h3 className="font-bold flex items-center gap-2">
                  🧔🏻‍♂️ Cómo Presentarte
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-green-500">
                    ✔️ SI
                  </span>
                  <p className="text-sm">
                    Mostrar experiencia técnica relevante. Mencionar proyectos
                    propios y open source.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-red-500">
                    ❌ NO
                  </span>
                  <p className="text-sm">
                    Hablar de proyectos irrelevantes o experiencias de hace
                    muchos años. Hobbies sin conexión profesional.
                  </p>
                </div>
              </div>
            </div>

            {/* Interés en la posición */}
            <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b bg-muted/30">
                <h3 className="font-bold flex items-center gap-2">
                  🪑 ¿Por qué esta posición?
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-green-500">
                    ✔️ SI
                  </span>
                  <p className="text-sm">
                    Mencionar características del producto. Cómo tus habilidades
                    hacen &quot;fit&quot; exacto.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-red-500">
                    ❌ NO
                  </span>
                  <p className="text-sm">
                    Generalidades de la industria. Hablar solo de lo que tú
                    quieres obtener (dinero, aprender).
                  </p>
                </div>
              </div>
            </div>

            {/* Historias Profesionales */}
            <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b bg-muted/30">
                <h3 className="font-bold flex items-center gap-2">
                  👨🏻‍💻 Historias Profesionales
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-green-500">
                    ✔️ SI
                  </span>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>Hacé tu historia corta y con mensajes claros.</li>
                    <li>Hablá de lo que hiciste personalmente (agencia).</li>
                    <li>Enseñale algo al entrevistador.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-red-500">
                    ❌ NO
                  </span>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>
                      Detalles innecesarios o contextos técnicos excesivos.
                    </li>
                    <li>
                      Hablar solo de lo que hizo el equipo o leadership team.
                    </li>
                    <li>Presentarte como una víctima de un proceso.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Preguntas para ellos */}
            <div className="bg-card border rounded-2xl overflow-hidden shadow-sm md:col-span-2 lg:col-span-1">
              <div className="p-6 border-b bg-muted/30">
                <h3 className="font-bold flex items-center gap-2">
                  👩🏼‍🏫 Preguntas para nosotros
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-green-500">
                    ✔️ SI
                  </span>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>Preguntas que no estén en recursos públicos.</li>
                    <li>
                      Preguntas sobre runway, attrition, product market fit,
                      etc.
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-red-500">
                    ❌ NO
                  </span>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>
                      Preguntas genéricas (&quot;¿cómo es un día típico?&quot;).
                    </li>
                    <li>Preguntas ya respondidas en el website.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">
              Preguntas Comunes para Practicar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <ul className="space-y-3">
                <li className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> Cuenta una vez que
                  enfrentaste un problema difícil.
                </li>
                <li className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> ¿Alguna vez tuviste
                  que tomar una decisión impopular?
                </li>
                <li className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> Describe una situación
                  de alta presión en el trabajo.
                </li>
                <li className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> Cuéntame sobre un
                  error que cometiste.
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> Cuéntame de una vez
                  que no estabas de acuerdo con tu jefe.
                </li>
                <li className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> Describe una situación
                  de conflicto con un colega.
                </li>
                <li className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> Cuéntame de una vez
                  que fallaste. ¿Qué aprendiste?
                </li>
                <li className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> ¿Has tenido que
                  motivar a otros? ¿Cómo lo hiciste?
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: Evaluación de Respuestas */}
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <AlertCircle className="h-4 w-4" />
            <span>Niveles de Evaluación</span>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg border text-sm text-center font-medium">
              Nota: Un{' '}
              <span className="text-green-600 font-bold">
                &quot;Strong Yes&quot;
              </span>{' '}
              es generalmente lo que garantiza el paso a la siguiente etapa de
              entrevista.
            </div>

            {/* STRONG YES */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-green-500 rounded-full" />
                <h3 className="text-xl font-bold text-green-600 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Strong Yes
                </h3>
              </div>
              <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm border-l-4 border-l-green-500">
                <p className="text-sm italic">
                  &quot;Me interesa esta posición porque no estoy buscando
                  simplemente cambiar de trabajo; estoy buscando crecer en
                  impacto y nivel de exigencia. Me motiva trabajar en productos
                  que realmente usan personas reales y donde la experiencia
                  frontend no es un detalle estético sino parte central del
                  negocio.
                  <br />
                  En mi recorrido profesional fui profundizando cada vez más en
                  performance, arquitectura y experiencia de usuario, y me di
                  cuenta de que quiero estar en equipos donde el estándar
                  técnico sea alto y el feedback sea directo. Este rol me atrae
                  porque combina producto, escala y calidad técnica.
                  <br />
                  Además, vengo de trabajar en contextos donde muchas veces tuve
                  que resolver con recursos limitados. Eso me dio mentalidad de
                  ownership y foco en resultados. Hoy quiero llevar esa
                  experiencia a un entorno más desafiante, donde pueda aportar
                  criterio, no solo código. No busco solo una empresa
                  reconocida. Busco un lugar donde el nivel me obligue a
                  crecer.&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                    Alineado con la misión
                  </span>
                  <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                    Experiencia técnica relevante
                  </span>
                  <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                    Conexión personal
                  </span>
                </div>
              </div>
            </div>

            {/* YES */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-blue-500 rounded-full" />
                <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Yes
                </h3>
              </div>
              <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm border-l-4 border-l-blue-500">
                <p className="text-sm italic">
                  &quot;Me interesa trabajar en Spotify porque admiro cómo
                  combinan tecnología y experiencia de usuario para crear
                  productos intuitivos a escala global. En mi último puesto
                  participé en la optimización del onboarding móvil, mejorando
                  la retención temprana a partir de pruebas A/B. Estoy buscando
                  un entorno donde pueda enfrentar desafíos de mayor escala y
                  complejidad, y creo que el enfoque en producto y datos de
                  Spotify sería un buen siguiente paso para mi
                  crecimiento..&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                    Cultura basada en diseño
                  </span>
                  <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                    Motivación clara
                  </span>
                  <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                    Profundizar más en resultados concretos
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* NO */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-yellow-600 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" /> No
                  </h3>
                </div>
                <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm border-l-4 border-l-yellow-500 min-h-[160px]">
                  <p className="text-sm italic text-muted-foreground">
                    &quot;Siempre he admirado Tesla desde que era estudiante. Me
                    parece increíble lo que hacen con la innovación en autos
                    eléctricos. Me encantaría formar parte del equipo y aportar
                    mis conocimientos para contribuir al crecimiento de la
                    compañía.&quot;
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                      Falta especificidad
                    </span>
                    <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                      Foco en pasión, no en métricas
                    </span>
                    <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                      No conecta experiencia concreta con el rol
                    </span>
                  </div>
                </div>
              </div>

              {/* STRONG NO */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 bg-red-500 rounded-full" />
                  <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
                    <XCircle className="h-5 w-5" /> Strong No
                  </h3>
                </div>
                <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm border-l-4 border-l-red-500 min-h-[160px]">
                  <p className="text-sm italic text-muted-foreground">
                    &quot;La verdad, estoy interesado principalmente porque
                    quiero migrar hacia roles de machine learning y esta empresa
                    trabaja con IA. Además, sé que el salario es competitivo y
                    eso es importante para mí ahora. No he usado mucho el
                    producto, pero creo que sería una buena oportunidad para
                    probar algo distinto.&quot;
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                      Foco en beneficios personales
                    </span>
                    <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                      Desalineado con misión
                    </span>
                    <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                      Exploratorio y no comprometido
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer final con Mentalidad */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 space-y-6">
          <h2 className="text-2xl font-bold font-headline text-center">
            Venta vs Autenticidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold">Incentivo Corto Plazo: Venderte</h4>
              <p className="text-muted-foreground leading-relaxed">
                Presentar tu mejor versión posible para conseguir la oferta
                inmediata.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold">Incentivo Largo Plazo: Match Real</h4>
              <p className="text-muted-foreground leading-relaxed">
                Encontrar una relación laboral fructífera donde tus valores y
                los de la empresa coincidan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
