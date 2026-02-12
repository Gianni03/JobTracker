import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Target,
  TrendingUp,
  Award,
  ShieldCheck,
  CheckCircle2,
  Info,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Zap,
  Users,
  Code,
  FileText,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function SeniorityRoadmapPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-2xl" asChild>
            <Link href="/dashboard/resources">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-headline text-foreground tracking-tight">
              Autoevaluación &{' '}
              <span className="text-primary italic">Seniority</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Mide tu nivel actual y traza tu camino profesional.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="secondary"
            className="py-1.5 px-3 rounded-xl bg-primary/10 text-primary border-none text-xs font-bold"
          >
            IC1 - IC5 Framework
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="evaluation" className="space-y-8">
        <TabsList className="bg-muted/50 p-1.5 rounded-[1.5rem] h-auto flex-wrap border w-fit">
          <TabsTrigger
            value="evaluation"
            className="rounded-xl px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-bold"
          >
            <Target className="h-4 w-4 mr-2" />
            Autoevaluación
          </TabsTrigger>
          <TabsTrigger
            value="technical"
            className="rounded-xl px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-bold"
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            Aspectos Técnicos
          </TabsTrigger>
          <TabsTrigger
            value="roadmap"
            className="rounded-xl px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-bold"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Roadmap de Seniority
          </TabsTrigger>
          <TabsTrigger
            value="expectations"
            className="rounded-xl px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-bold"
          >
            <Award className="h-4 w-4 mr-2" />
            Expectativas del Rol
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="evaluation"
          className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-primary/5 overflow-hidden bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="border-b bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Matriz de Habilidades Técnicas
                </CardTitle>
                <CardDescription>
                  Compara tu desempeño actual con los estándares internacionales
                  de la industria.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="w-[180px] font-bold">
                          Dimensión
                        </TableHead>
                        <TableHead className="font-bold border-x text-blue-600 dark:text-blue-400">
                          Mildly Strong
                        </TableHead>
                        <TableHead className="font-bold border-x text-primary">
                          Strong (Senior Target)
                        </TableHead>
                        <TableHead className="font-bold text-orange-600 dark:text-orange-400">
                          Very Strong (Staff+)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-semibold text-xs md:text-sm">
                          Data Structures & Alg.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed border-x">
                          Domina arreglos, mapas, pilas y colas. Algoritmos
                          funcionales de búsqueda/ordenamiento.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed border-x font-medium">
                          Elige estructuras por eficiencia. Implementa grafos y
                          árboles. Algoritmos óptimos.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed">
                          Entiende impacto a bajo nivel (memoria/CPU).
                          Optimización extrema y flujos de datos complejos.
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-semibold text-xs md:text-sm">
                          Diseño (OOP / Patterns)
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed border-x">
                          Conoce conceptos teóricos (Herencia, Abstracción) y
                          los usa correctamente.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed border-x font-medium">
                          Diseña clases cohesivas con límites claros. Conoce y
                          aplica Design Patterns típicos.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed">
                          Domina SOLID (especialmente OCP/DIP). Código altamente
                          testeable y flexible.
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-semibold text-xs md:text-sm">
                          Arquitectura
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed border-x">
                          Conoce Client-Server, HTTP básico y el patrón MVC.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed border-x font-medium">
                          Diseña apps monolíticas modulares. Interfaces HTTP
                          robustas. Separación de capas.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed">
                          Sistemas distribuidos complejos. Clean Architecture,
                          DDD y microservicios escalables.
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-semibold text-xs md:text-sm">
                          Performance
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed border-x">
                          Comprensión básica del uso de recursos. Formato de
                          código prolijo.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed border-x font-medium">
                          Analiza complejidad tiempo/espacio. Caching, índices
                          SQL y optimización de consultas.
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed">
                          Monitoreo avanzado. Decisiones basadas en trade-offs
                          legibilidad vs performance extrema.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-[2.5rem] border-primary/5 bg-primary/5 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Habilidades Culturales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      label: 'Autonomía',
                      level: 90,
                      desc: 'De seguir guías a proponer soluciones.',
                    },
                    {
                      label: 'Comunicación',
                      level: 85,
                      desc: 'Simplificar lo complejo para otros.',
                    },
                    {
                      label: 'Colaboración',
                      level: 95,
                      desc: 'Potenciar el impacto del equipo.',
                    },
                  ].map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                        <span>{skill.label}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground italic leading-tight">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="p-8 rounded-[2.5rem] bg-foreground text-background space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2 italic">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Mantra de Seniority
                </h4>
                <p className="text-xs leading-relaxed opacity-80">
                  No se trata de cuántas líneas escribes, sino de{' '}
                  <strong>cuántos problemas resuelves</strong> antes de que
                  ocurran y qué tan <strong>autónomo</strong> eres ante la
                  ambigüedad.
                </p>
                <Badge className="bg-primary/20 text-primary border-none">
                  Focus on Impact
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="technical"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Naming',
                icon: <Info className="text-blue-500" />,
                desc: '¿Las variables y funciones expresan claramente lo que contienen o hacen?',
              },
              {
                title: 'Documentación',
                icon: <FileText className="text-primary" />,
                desc: "¿Hay comentarios que expliquen el 'por qué' de decisiones complejas, no el 'qué'?",
              },
              {
                title: 'Modularización',
                icon: <Zap className="text-orange-500" />,
                desc: '¿El código separa responsabilidades o es un método gigante e inmanejable?',
              },
              {
                title: 'Magic Numbers',
                icon: <Code className="text-purple-500" />,
                desc: '¿Los valores están definidos por constantes descriptivas que dan contexto?',
              },
              {
                title: 'Escalabilidad',
                icon: <TrendingUp className="text-green-500" />,
                desc: '¿La solución considera crecimientos futuros o nuevos tipos de entrada?',
              },
              {
                title: 'Error Handling',
                icon: <ShieldCheck className="text-red-500" />,
                desc: '¿Los errores se capturan y manejan según la responsabilidad de la capa?',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-[2.5rem] bg-card border hover:shadow-xl hover:border-primary/20 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="roadmap"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="grid gap-8">
            {[
              {
                level: 'Software Engineer',
                badge: 'IC1-IC2',
                color: 'border-blue-500/20 bg-blue-500/5',
                description:
                  'Enfoque en ejecución y aprendizaje. Capacidad para resolver tareas bien definidas.',
                items: [
                  'Conocimiento sólido de OOP y estructuras de datos básicas.',
                  'Habilidad para navegar y explicar código ajeno.',
                  'Entrega de código testeado y libre de errores evidentes.',
                  'Requiere instrucción moderada en el día a día.',
                ],
              },
              {
                level: 'Sr. Software Engineer',
                badge: 'IC3',
                color: 'border-primary/20 bg-primary/5',
                description:
                  'Enfoque en calidad, mentoría e impacto en el equipo. Maneja ambigüedad.',
                items: [
                  'Diseño profundo de sistemas modulares y escalables.',
                  'Sabe cuándo refactorizar y cuándo priorizar la velocidad.',
                  'Lidera code reviews y aboga por estándares de calidad.',
                  'Requiere solo objetivos de alto nivel para ejecutar.',
                ],
              },
              {
                level: 'Staff Software Engineer',
                badge: 'IC4-IC5',
                color: 'border-orange-500/20 bg-orange-500/5',
                description:
                  'Enfoque estratégico e impacto multi-equipo o global en la organización.',
                items: [
                  'Referente técnico para objetivos estratégicos complejos.',
                  'Resuelve problemas técnicos de alta criticidad que pocos pueden.',
                  'Diseña arquitecturas distribuidas con simplicidad extrema.',
                  'Habilita a otros a través de herramientas y frameworks internos.',
                ],
              },
            ].map((tier, i) => (
              <Card
                key={i}
                className={`p-10 rounded-[3rem] border-2 ${tier.color} transition-all hover:shadow-lg`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div className="space-y-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold uppercase tracking-widest"
                    >
                      {tier.badge}
                    </Badge>
                    <h3 className="text-3xl font-bold font-headline">
                      {tier.level}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xl italic">
                      {tier.description}
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded-2xl border shadow-sm">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <ul className="grid md:grid-cols-2 gap-6">
                  {tier.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-4 text-sm text-foreground/80 leading-relaxed bg-background/40 p-5 rounded-[1.5rem] border border-transparent hover:border-primary/10 transition-all"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary flex-none mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="expectations"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <Card className="rounded-[3rem] border-primary/5 overflow-hidden">
            <CardHeader className="bg-primary/5 p-8 border-b">
              <CardTitle className="text-2xl font-bold font-headline">
                Guía de Expectativas por Dimensión
              </CardTitle>
              <CardDescription>
                Cómo evalúan los managers tu crecimiento según el Career
                Framework.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[150px] font-bold py-6 px-8">
                        Competencia
                      </TableHead>
                      <TableHead className="font-bold border-x px-8">
                        Software Engineer
                      </TableHead>
                      <TableHead className="font-bold border-x px-8">
                        Sr. Software Engineer
                      </TableHead>
                      <TableHead className="font-bold px-8">
                        Staff Software Engineer
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: 'Knowledge',
                        se: 'Desarrollo: Conoce OOP y Data Structures básicas. Lee módulos ajenos.',
                        sr: 'Mastery: Entiende cuándo refactorizar. Considera performance y seguridad global.',
                        staff:
                          'Strategic: Domina el producto completo y sus interacciones entre múltiples equipos.',
                      },
                      {
                        name: 'Quality',
                        se: 'Foco: Código claro, testeado y libre de errores obvios en casos felices.',
                        sr: 'Flexibility: Código adaptable y altamente eficiente. Master de los tests automáticos.',
                        staff:
                          'Standard: Define el estándar de calidad para la organización. Debugging experto.',
                      },
                      {
                        name: 'Impact',
                        se: 'Execution: Sigue prioridades del equipo y contribuye al bienestar mutuo.',
                        sr: 'Influence: Desafía prioridades si es necesario. Fomenta un ambiente seguro.',
                        staff:
                          'Global: Ejecuta oportunidades de impacto masivo. Technical referent estratégico.',
                      },
                      {
                        name: 'Collaboration',
                        se: 'Teamwork: Colabora activamente para sacar las tareas adelante.',
                        sr: 'Silos breaker: Construye puentes entre equipos y aclara ambigüedades.',
                        staff:
                          'Visionary: Influye en otros para el mejor resultado de la compañía global.',
                      },
                    ].map((row, i) => (
                      <TableRow key={i} className="hover:bg-muted/10">
                        <TableCell className="font-bold py-8 px-8 align-top text-primary">
                          {row.name}
                        </TableCell>
                        <TableCell className="py-8 px-8 align-top text-xs border-x leading-relaxed">
                          {row.se}
                        </TableCell>
                        <TableCell className="py-8 px-8 align-top text-xs border-x leading-relaxed font-medium">
                          {row.sr}
                        </TableCell>
                        <TableCell className="py-8 px-8 align-top text-xs leading-relaxed">
                          {row.staff}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <footer className="mt-12 p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-primary/10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <Badge className="bg-primary/20 text-primary border-none">
                DOCUMENTACIÓN DE REFERENCIA
              </Badge>
              <h3 className="text-2xl font-bold font-headline">
                Framework de Carrera de Dropbox
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                Utiliza el framework de IC1 a IC5 para entender cómo progresar
                de forma estructurada en tu carrera como ingeniero.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                <Button className="rounded-2xl gap-2 font-bold group" asChild>
                  <a
                    href="https://dropbox.github.io/dbx-career-framework/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Career Framework
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl gap-2 font-bold"
                  asChild
                >
                  <a
                    href="https://levels.fyi/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Levels.fyi Standards
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="w-40 h-40 bg-card rounded-full flex items-center justify-center border-4 border-primary/10 shadow-inner relative overflow-hidden flex-none">
              <Target className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </footer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
