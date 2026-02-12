import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Layout,
  Users,
  Trophy,
  Scale,
  MessageSquare,
  Target,
  Zap,
  BarChart3,
  ShieldAlert,
  TrendingUp,
  Microscope,
  Terminal,
  Clock,
  Briefcase,
  AlertTriangle,
  HeartHandshake,
} from 'lucide-react';

export default function InterviewTypesPage() {
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
            Ecosistema de Entrevistas
          </h1>
          <p className="text-muted-foreground">
            Comprende la lógica detrás de cada proceso y cómo generar la mejor
            &quot;señal&quot;.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-20">
        {/* INTRO: La Búsqueda de Señal */}
        <section className="relative p-8 md:p-12 rounded-[2.5rem] bg-card border shadow-sm overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Microscope className="h-3.5 w-3.5" />
                Filosofía de Selección
              </div>
              <h2 className="text-4xl font-bold font-headline leading-tight">
                Las entrevistas son una{' '}
                <span className="text-primary italic">búsqueda de señal</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                No las veas como un examen escolar donde solo importa
                &quot;aprobar&quot;. Las empresas buscan indicadores de talento,
                adaptabilidad y potencial de largo plazo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 p-1 rounded bg-green-500/10 text-green-600">
                    <Target className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">
                    Resolución ≠ Contratación
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="mt-1 p-1 rounded bg-blue-500/10 text-blue-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">
                    Señal Positiva &gt; Resultado Perfecto
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
              <h3 className="text-sm font-bold uppercase mb-4 text-center text-primary/70">
                Calidad de Señal por Tipo
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: 'Live Coding',
                    signal: 'Alta',
                    color: 'bg-green-500',
                  },
                  {
                    label: 'System Design',
                    signal: 'Media/Alta',
                    color: 'bg-green-400',
                  },
                  {
                    label: 'Behavioral',
                    signal: 'Media',
                    color: 'bg-yellow-500',
                  },
                  {
                    label: 'Takehome',
                    signal: 'Moderada',
                    color: 'bg-orange-500',
                  },
                  {
                    label: 'Auto-Challenges',
                    signal: 'Baja',
                    color: 'bg-red-400',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="text-xs font-bold w-32">{item.label}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{
                          width:
                            item.signal === 'Alta'
                              ? '100%'
                              : item.signal === 'Media/Alta'
                                ? '80%'
                                : item.signal === 'Media'
                                  ? '60%'
                                  : item.signal === 'Moderada'
                                    ? '40%'
                                    : '20%',
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground w-16 text-right">
                      {item.signal}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONCEPTOS CLAVE: El Triángulo de Hierro */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <Scale className="h-3.5 w-3.5" />
              Recruiting Iron Triangle
            </div>
            <h2 className="text-3xl font-bold font-headline">
              Velocidad, Calidad y Costo
            </h2>
            <p className="text-muted-foreground">
              Las empresas balancean tres variables. Si buscas las mejores
              condiciones (Costo alto), la empresa inevitablemente subirá la
              vara de Calidad y el proceso será más exhaustivo.
            </p>
            <div className="p-6 rounded-2xl bg-muted/50 border space-y-4">
              <h4 className="font-bold text-sm">Mentalidad de Ganador:</h4>
              <p className="text-sm italic text-muted-foreground leading-relaxed">
                &quot;Si quiero jugar en las grandes ligas, tengo que entrenar como alguien que ya pertenece a ellas. El mercado es global, y mi preparación también tiene que serlo. Las condiciones de partida no son iguales para todos, pero el estándar que sostengo cada día sí es una decisión. No busco simplemente cumplir: busco competir al máximo nivel.&quot;
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border bg-card shadow-sm flex flex-col items-center justify-center text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="font-bold text-sm">Crecimiento Técnico</span>
            </div>
            <div className="p-6 rounded-2xl border bg-card shadow-sm flex flex-col items-center justify-center text-center space-y-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <span className="font-bold text-sm">Competencia Real</span>
            </div>
            <div className="p-6 rounded-2xl border bg-card shadow-sm flex flex-col items-center justify-center text-center space-y-2">
              <ShieldAlert className="h-8 w-8 text-red-500" />
              <span className="font-bold text-sm">Vara Alta = Seguridad</span>
            </div>
            <div className="p-6 rounded-2xl border bg-card shadow-sm flex flex-col items-center justify-center text-center space-y-2">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-sm">Equipo Elite</span>
            </div>
          </div>
        </section>

        {/* DETALLE: Tipos de Entrevistas */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold font-headline">
              Formatos de Evaluación
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada etapa tiene un propósito específico. Entenderlo te permite
              enfocar tu preparación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Auto Challenges */}
            <div className="group bg-card border rounded-3xl p-8 space-y-6 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Automated Challenges</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Plataformas como CoderByte o HackerRank. Se usan para filtrar
                volumen rápidamente. El objetivo es demostrar bases sólidas sin
                intervención humana.
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  ATS FRIENDLY
                </span>
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  ALGORITMOS BÁSICOS
                </span>
              </div>
            </div>

            {/* Technical Conversation */}
            <div className="group bg-card border rounded-3xl p-8 space-y-6 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Charla Técnica</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Revisión de experiencia y decisiones de arquitectura pasadas.
                Aquí importa la articulación y el criterio senior más que el
                código sintáctico.
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  SOFT SKILLS
                </span>
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  CRITERIO
                </span>
              </div>
            </div>

            {/* System Design */}
            <div className="group bg-card border rounded-3xl p-8 space-y-6 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">System Design</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Diseño de componentes a gran escala. Escalabilidad,
                disponibilidad y trade-offs. Vital para roles Senior y Staff.
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  ARQUITECTURA
                </span>
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  ESCALABILIDAD
                </span>
              </div>
            </div>

            {/* Live Coding */}
            <div className="group bg-card border rounded-3xl p-8 space-y-6 hover:border-primary/50 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-red-400/10 text-red-500 flex items-center justify-center relative">
                <Terminal className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
              <h3 className="text-xl font-bold italic underline decoration-red-500/30">
                Live Coding
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La prueba de fuego. Evalúa resolución de problemas bajo presión,
                fluidez con el IDE y comunicación constante.
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-red-500/5 text-red-600 text-[10px] font-extrabold border border-red-500/20">
                  EL FILTRO DEFINITIVO
                </span>
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  GRIT
                </span>
              </div>
            </div>

            {/* Takehome */}
            <div className="group bg-card border rounded-3xl p-8 space-y-6 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Takehome Challenges</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Proyectos de 4-12 horas. Evalúan calidad de código, estructura
                de carpetas y tests. Ojo con el bias: premian el tiempo
                invertido más que la capacidad bruta.
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  DOCS & TESTS
                </span>
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  ARQUITECTURA
                </span>
              </div>
            </div>

            {/* Work Test */}
            <div className="group bg-card border rounded-3xl p-8 space-y-6 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Work Test</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Período de prueba pago (1-2 semanas). La forma más real de
                evaluar, pero la más cara y difícil de coordinar para ambas
                partes.
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  REAL WORLD
                </span>
                <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold">
                  PAGO
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TABLA: Tiers y Compensación */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl font-bold font-headline">
              Relación Dificultad vs Salario
            </h2>
            <p className="text-muted-foreground text-sm italic">
              Datos aproximados para el mercado US/Remote LatAm.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border bg-card/50 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 text-xs font-bold uppercase tracking-wider">
                  <th className="p-6 border-b">Nivel (Tier)</th>
                  <th className="p-6 border-b">Proceso Típico</th>
                  <th className="p-6 border-b">Dificultad</th>
                  <th className="p-6 border-b">Compensación (USD)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="hover:bg-primary/5 transition-colors group">
                  <td className="p-6 border-b font-bold text-primary">
                    S-Tier (Top 1%)
                  </td>
                  <td className="p-6 border-b text-muted-foreground">
                    Live Coding Hard + System Design Elite
                  </td>
                  <td className="p-6 border-b italic">Extrema</td>
                  <td className="p-6 border-b font-mono font-bold text-green-600">
                    150k - 250k+ /yr
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors group">
                  <td className="p-6 border-b font-bold text-primary/80">
                    A-Tier (Top 5%)
                  </td>
                  <td className="p-6 border-b text-muted-foreground">
                    Live Coding Medium + Proyectos Técnicos
                  </td>
                  <td className="p-6 border-b italic">Alta</td>
                  <td className="p-6 border-b font-mono font-bold text-green-500">
                    100k - 150k /yr
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors group">
                  <td className="p-6 border-b font-bold text-primary/60">
                    B-Tier
                  </td>
                  <td className="p-6 border-b text-muted-foreground">
                    Takehome + Charla Técnica + Culture
                  </td>
                  <td className="p-6 border-b italic">Moderada</td>
                  <td className="p-6 border-b font-mono font-bold text-yellow-600">
                    70k - 100k /yr
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors group border-b-0">
                  <td className="p-6 font-bold text-primary/40">C-Tier</td>
                  <td className="p-6 text-muted-foreground">
                    Charla trivial + Preguntas teóricas
                  </td>
                  <td className="p-6 italic">Baja</td>
                  <td className="p-6 font-mono font-bold text-muted-foreground">
                    &lt; 70k /yr
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FEEDBACK: El Arte de Recibirlo */}
        <section className="p-12 rounded-[3.5rem] bg-gradient-to-br from-red-500/5 via-primary/5 to-transparent border border-primary/20 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary text-primary-foreground">
              <HeartHandshake className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-headline italic">
                El Arte del Feedback
              </h2>
              <p className="text-muted-foreground">
                Cómo convertir un rechazo en una oportunidad de crecimiento.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold flex items-center gap-2 text-green-600">
                <BarChart3 className="h-4 w-4" /> La Regla de Oro
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong>Pedí Feedback Siempre.</strong> El feedback es un regalo
                valioso que te dice exactamente dónde estás corto. Al pedirlo,
                asegurá al entrevistador que solo querés mejorar, no pelear la
                decisión.
              </p>
              <div className="p-4 rounded-xl bg-background border border-primary/10 italic text-xs">
                &quot;Gracias por hacérmelo saber. ¿Podría pedirles feedback?
                Realmente quiero entender mis puntos débiles para mejorar en el
                futuro.&quot;
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold flex items-center gap-2 text-red-500">
                <AlertTriangle className="h-4 w-4" /> El Error Fatal: Discutir
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong>NUNCA discutas el feedback.</strong> Puede ser injusto o
                erróneo, pero debatirlo solo demuestra falta de madurez y ego
                herido. Eso te garantiza una entrada directa a la lista negra.
              </p>
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 italic text-xs text-red-600/80">
                ⚠️ Evitá: &quot;El ejercicio no era realista&quot;, &quot;Me
                puse nervioso, no me evaluaron bien&quot;, &quot;Mi solución es
                óptima aunque no lo vean&quot;.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
