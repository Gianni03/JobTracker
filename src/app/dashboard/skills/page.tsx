import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  FolderTree,
  Github,
  MessageSquare,
  MessagesSquare,
  Search,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/skills/code-block';
import { SkillsAnalytics } from '@/components/skills/skills-analytics';

type SkillCommand = {
  label: string;
  code: string;
};

type SkillSetup = {
  title: string;
  description: string;
  code?: string;
  codeLabel?: string;
};

type SkillApp = {
  name: string;
  level: 'Sin código' | 'Intermedio' | 'Dev';
  type: string;
  description: string;
  how: string;
  caveat: string;
};

type Skill = {
  id: string;
  name: string;
  version: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  modes: { title: string; description: string }[];
  commands?: SkillCommand[];
  setup: SkillSetup[];
  usage: string[];
  outputs: string[];
  requirements: string[];
  limits: string[];
};

const repoUrl = 'https://github.com/Gianni03/gianni-skills';

const skills: Skill[] = [
  {
    id: 'job-search',
    name: 'job-search',
    version: '1.0',
    icon: Search,
    tagline: 'Busca, filtra y rankea ofertas reales.',
    description:
      'Busca postings en LinkedIn, GetOnBoard, Computrabajo, RemoteOK, freehire y canales públicos de Telegram. Filtra por ubicación y antigüedad, deduplica entre corridas, puntúa contra tu profile.json y genera un reporte HTML interactivo. Los botones de Aplicado y Fuera de rango alimentan la próxima búsqueda.',
    modes: [
      {
        title: 'Búsqueda completa',
        description:
          'Corre todas las fuentes declaradas en profile.json y devuelve solo lo nuevo de la ventana configurada (7 días por defecto).',
      },
      {
        title: 'Un portal',
        description:
          'Consultá GetOnBoard, Computrabajo, RemoteOK, Telegram, LinkedIn o freehire por separado.',
      },
      {
        title: 'Dedupe y scoring',
        description:
          'Evita repetir ofertas ya vistas y puntúa el fit contra tu perfil.',
      },
      {
        title: 'Reporte interactivo',
        description:
          'HTML autocontenido con botones para marcar aplicado o fuera de rango; el feedback entrena la próxima corrida.',
      },
    ],
    commands: [
      {
        label: 'Búsqueda completa',
        code: 'python3 tools/run.py --posts /tmp/opencode/posts.json',
      },
      {
        label: 'Un portal',
        code: 'bin/portals search -q "react" -l "Rosario" -s computrabajo --jobage 7 -n 20 -f json',
      },
      {
        label: 'LinkedIn',
        code: 'bin/linkedin search -q "frontend developer" -l "Rosario, Santa Fe, Argentina" --jobage 7 --limit 20 --format json',
      },
      {
        label: 'Servidor del reporte',
        code: 'python3 tools/serve.py',
      },
    ],
    setup: [
      {
        title: 'Creá tu perfil',
        description:
          'En la carpeta de la skill, copiá el ejemplo y editalo con tus roles, stack, seniority y ubicación.',
        code: 'cp profile.example.json profile.json\n$EDITOR profile.json',
        codeLabel: 'En skills/job-search',
      },
      {
        title: 'Ajustá la búsqueda',
        description:
          'profile.json también define las búsquedas que corre run.py. La guía completa con ejemplos está en assets/profile-guide.md.',
      },
    ],
    usage: [
      'buscar ofertas de frontend en Rosario',
      'qué hay nuevo',
      'buscar remoto React',
      'buscar trabajo',
    ],
    outputs: [
      'ofertas/<fecha>_ofertas.html — reporte interactivo',
      'ofertas/<fecha>_ofertas.md — misma lista, editable',
      'state/seen_jobs.json — dedupe entre corridas',
    ],
    requirements: [
      'bun (los wrappers de portales lo usan)',
      'python3 (dedupe, render y serve)',
    ],
    limits: [
      'Uso personal. LinkedIn usa endpoints públicos y automatizar el acceso va contra sus ToS.',
      'No hace crawl ni paginación profunda: una búsqueda por categoría por corrida.',
      'Ventana de 7 días por defecto; lo más viejo no se muestra.',
      'No hace búsquedas de personas.',
    ],
  },
  {
    id: 'job-application',
    name: 'job-application',
    version: '2.0',
    icon: FileText,
    tagline: 'Del JD al CV, la carta y el outreach.',
    description:
      'Genera artefactos personalizados desde una descripción de puesto y tu perfil: CV adaptado (md, docx y pdf), carta de presentación, cold outreach, research de empresa, why-this-company y referencia salarial. No inventa skills: trabaja sobre assets/profile.md.',
    modes: [
      {
        title: 'setup',
        description:
          'Genera tu perfil desde PDFs o desde la plantilla manual.',
      },
      {
        title: 'adapt-resume',
        description:
          'Adapta tu CV a las keywords del JD, en md + docx + pdf y con reglas ATS.',
      },
      {
        title: 'cover-letter',
        description:
          'Carta de presentación específica para la empresa y el puesto.',
      },
      {
        title: 'cold-outreach',
        description: 'Mensaje para recruiter o hiring manager.',
      },
      {
        title: 'company-research',
        description:
          'Brief de la empresa para preparar la conversación.',
      },
      {
        title: 'why-company',
        description: 'Párrafo de por qué esta empresa, sin clichés.',
      },
      {
        title: 'salary-reference',
        description: 'Referencia salarial en USD para negociar.',
      },
    ],
    commands: [
      {
        label: 'Convertir CV a docx',
        code: 'python3 assets/make_docx.py output/cv.md output/cv.docx',
      },
      {
        label: 'Convertir docx a pdf',
        code: 'libreoffice --headless --convert-to pdf output/cv.docx --outdir output',
      },
    ],
    setup: [
      {
        title: 'Opción automática',
        description:
          'Poné tus PDFs (LinkedIn export, CV actual) en assets/ y pedile al agente que genere tu perfil. Clasifica cada skill en Working, Familiar o Learning y te pide confirmación.',
        code: 'generar mi perfil',
        codeLabel: 'Pedido al agente',
      },
      {
        title: 'Opción manual',
        description:
          'Copiá la plantilla y completala con tu experiencia real.',
        code: 'cp assets/profile-template.md assets/profile.md\n$EDITOR assets/profile.md',
        codeLabel: 'En skills/job-application',
      },
    ],
    usage: [
      'adaptar cv a esta JD',
      'carta de presentación para Acme',
      'generar mi perfil',
      'investigar la empresa',
      'negociar salario',
    ],
    outputs: [
      'output/<nombre>_<puesto>_<empresa>.md + .docx + .pdf para el CV adaptado',
      'output/<nombre>_application_<empresa>.md para carta, outreach, research, why-company y salary',
    ],
    requirements: [
      'python3 + python-docx',
      'pdftotext y pdfinfo (poppler-utils)',
      'libreoffice para exportar PDF',
      'webfetch del agente para company research (opcional)',
    ],
    limits: [
      'Tus PDFs originales son read-only: la skill no los modifica.',
      'No inventa skills: si no está en tu perfil, no aparece en el CV.',
      'Reglas ATS: sin #, -, / ni * en el texto del CV; solo | como separador.',
      'El perfil separa Working, Familiar y Learning para no inflar el CV.',
    ],
  },
  {
    id: 'interview-prep',
    name: 'interview-prep',
    version: '1.1',
    icon: MessagesSquare,
    tagline: 'Estrategia, playbook y simulacro con scoring.',
    description:
      'Prepara entrevistas en tres modos: estrategia de personalidad con Interviewology Four Styles, playbook por JD y mock interview con scoring por cinco áreas. Es interactiva: pregunta antes de producir y no tira una pared de texto.',
    modes: [
      {
        title: 'personality-strategy',
        description:
          'Estrategia según tu mood y tu estilo (Charmer, Challenger, Examiner, Harmonizer).',
      },
      {
        title: 'playbook',
        description:
          'Documento de preparación por JD: behavioral, cultural fit y soft skills.',
      },
      {
        title: 'mock-interview',
        description:
          'Simulacro con preguntas del banco y scoring.',
      },
      {
        title: 'full sequence',
        description: 'Corre estrategia, playbook y mock en orden.',
      },
    ],
    setup: [
      {
        title: 'Sin configuración',
        description:
          'La skill trae metodología, banco de preguntas, rúbrica y cheatsheet. Solo necesita tu JD y el agente.',
      },
    ],
    usage: [
      'preparar entrevista para Acme',
      'simulacro de entrevista',
      'playbook para esta JD',
      'cultural fit',
    ],
    outputs: [
      'Respuestas y feedback inline',
      'output/playbook_<empresa>.md para el playbook',
      'output/mock-scorecard_<fecha>.md si pedís el scorecard',
    ],
    requirements: ['Solo el agente; no requiere binarios extra.'],
    limits: [
      'Behavioral, cultural fit y soft skills. No leetcode, algoritmos ni system design.',
      'No cubre salario ni lenguaje corporal.',
      'Es interactiva: pregunta antes de producir.',
      'Usa Interviewology Four Styles, no DISC, MBTI ni Big Five.',
    ],
  },
];

const agents = [
  {
    name: 'OpenCode',
    path: '~/.config/opencode/skills/<skill>/',
    note: 'Detectado por install.sh. Modo interactivo completo.',
  },
  {
    name: 'Claude Code',
    path: '~/.claude/commands/<skill>/',
    note: 'Detectado por install.sh.',
  },
  {
    name: 'Gemini CLI',
    path: '~/.gemini/agents/<skill>/',
    note: 'Detectado por install.sh.',
  },
  {
    name: 'Cursor',
    path: '~/.cursor/agents/<skill>/',
    note: 'Detectado por install.sh.',
  },
  {
    name: 'Kiro',
    path: '~/.kiro/agents/<skill>/',
    note: 'Detectado por install.sh.',
  },
  {
    name: 'Windsurf',
    path: '~/.windsurf/workflows/<skill>/',
    note: 'Detectado por install.sh.',
  },
  {
    name: 'Codex',
    path: 'Config TOML, ruta variable',
    note: 'Instalación manual.',
  },
];

const apps: SkillApp[] = [
  {
    name: 'Claude (web y desktop)',
    level: 'Sin código',
    type: 'Chat con Skills',
    description:
      'La forma más simple de probar una skill sin tocar una terminal. Claude la carga cuando el pedido coincide.',
    how: 'Customize > Skills > Add > Upload skill. Subí la carpeta de la skill y activala. Necesitás ejecución de código habilitada.',
    caveat:
      'Corre en un sandbox: puede no tener bun, libreoffice ni red. Ideal para interview-prep; para job-search y export docx/pdf usá un agente local.',
  },
  {
    name: 'Claude Cowork',
    level: 'Sin código',
    type: 'Espacio de trabajo agéntico',
    description:
      'Sesiones de trabajo con las skills habilitadas en tu cuenta de Claude. Pensado para tareas de oficina, no solo código.',
    how: 'Habilitá la skill en Customize y usala dentro de una sesión de Cowork.',
    caveat:
      'No lee la carpeta personal de skills de tu máquina: usa las que están habilitadas en tu cuenta. Disponibilidad según plan.',
  },
  {
    name: 'Manus',
    level: 'Sin código',
    type: 'Agente generalista',
    description:
      'Agente con interfaz web que puede importar skills desde GitHub o desde una carpeta.',
    how: 'Skills > + Add > Upload a skill o Import from GitHub.',
    caveat:
      'Verificá que el sandbox tenga las herramientas de la skill. interview-prep es la más directa.',
  },
  {
    name: 'OpenCode Desktop',
    level: 'Intermedio',
    type: 'Agente de escritorio',
    description:
      'La versión con interfaz de OpenCode. Detecta skills en la misma carpeta global.',
    how: 'Instalá OpenCode Desktop y copiá o symlinkeá las skills en ~/.config/opencode/skills/. Reiniciá.',
    caveat:
      'Necesitás configurar un modelo/proveedor. Más técnico que Claude, pero sin terminal.',
  },
  {
    name: 'Goose Desktop',
    level: 'Intermedio',
    type: 'Agente de escritorio y CLI',
    description:
      'Agente open source con app de escritorio. Lee skills desde ~/.agents/skills/.',
    how: 'Instalá Goose, habilitá la extensión de Skills y copiá la carpeta.',
    caveat: 'Pensado para tareas técnicas; requiere configurar el modelo.',
  },
];

const levelClass: Record<SkillApp['level'], string> = {
  'Sin código':
    'border-green-300 text-green-700 dark:border-green-800 dark:text-green-300',
  Intermedio:
    'border-blue-300 text-blue-700 dark:border-blue-800 dark:text-blue-300',
  Dev: 'border-muted-foreground/30 text-muted-foreground',
};

const faqs = [
  {
    question: '¿Puedo usar esto en ChatGPT o Gemini web?',
    answer:
      'No. Un chat web no puede leer la carpeta donde está instalada la skill, no ve tus PDFs locales, no ejecuta los CLIs de job-search y no mantiene state/ entre conversaciones. Podés copiar prompts sueltos, pero perdés el workflow completo.',
  },
  {
    question: '¿Esta página ejecuta las skills?',
    answer:
      'No. La web te documenta y te guía. La ejecución pasa en tu agente local, que es el que tiene acceso a archivos y terminal.',
  },
  {
    question: '¿Cómo las actualizo?',
    answer:
      'Hacé git pull en el repo clonado. Como install.sh crea symlinks, el agente ve la versión nueva al reiniciarse.',
  },
  {
    question: '¿Necesito pagar una API?',
    answer:
      'Las skills no traen una API key propia: usan el modelo y las herramientas de tu agente. Si tu agente es BYOK, esa key es la que paga el uso.',
  },
  {
    question: '¿Dónde se guardan los archivos?',
    answer:
      'job-application escribe en output/; job-search guarda profile.json y state/ (personales y gitignoreados). Los PDFs originales no se tocan.',
  },
  {
    question: '¿Son seguras?',
    answer:
      'Corren con los permisos de tu agente. Revisá install.sh y los scripts antes de usarlas. No pongas secretos en profile.json ni en profile.md.',
  },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SkillsPage() {
  return (
    <div className="space-y-12 pb-12">
      <SkillsAnalytics />
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold font-headline text-foreground">
              Skills de Agente
            </h1>
            <Badge variant="secondary" className="font-normal">
              3 skills
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Workflows instalables para tu agente de IA. No son prompts de chat:
            leen tus archivos, ejecutan comandos y generan entregables.
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href={repoUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Ver repo
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Esto no se usa en un chat
                </h2>
                <p className="text-sm text-muted-foreground">
                  Una skill es un contrato en Markdown más sus assets. El agente
                  la carga, lee tus archivos y ejecuta los comandos. Un chat web
                  no tiene ese acceso.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-background p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="h-4 w-4" />
                    Chat AI
                  </div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>Pegás texto y recibís texto.</li>
                    <li>No lee tu carpeta de skills ni tus PDFs locales.</li>
                    <li>No ejecuta los CLIs del repo ni escribe en tu disco.</li>
                    <li>No mantiene state/ entre conversaciones.</li>
                  </ul>
                </div>
                <div className="rounded-lg border bg-background p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Terminal className="h-4 w-4" />
                    Agente con skills
                  </div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>Lee SKILL.md, assets y tu perfil.</li>
                    <li>Accede a archivos y ejecuta comandos.</li>
                    <li>Escribe en output/ y guarda state/.</li>
                    <li>Es el mismo agente que usás para programar.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-bold font-headline">
            <Sparkles className="h-5 w-5 text-primary" />
            Apps para usar las skills
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            No necesitás ser dev para probarlas. Estas apps cargan el formato
            SKILL.md; la diferencia es qué herramientas tienen: archivos,
            terminal, red y ejecución de código.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => (
            <Card key={app.name} className="flex flex-col">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">{app.name}</CardTitle>
                  <Badge
                    variant="outline"
                    className={`font-normal ${levelClass[app.level]}`}
                  >
                    {app.level}
                  </Badge>
                </div>
                <CardDescription>{app.type}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  {app.description}
                </p>
                <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                  <p className="font-medium">Cómo se usa</p>
                  <p className="mt-1 text-muted-foreground">{app.how}</p>
                </div>
                <p className="mt-auto text-xs text-muted-foreground">
                  {app.caveat}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4 text-sm">
              <p className="font-medium">Para empezar sin ser dev</p>
              <p className="mt-1 text-muted-foreground">
                Probá Claude (web o desktop) con interview-prep: no necesita
                binarios ni red. Cuando quieras el flujo completo de búsqueda o
                exportar docx/pdf, pasá a un agente local.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-sm">
              <p className="font-medium">Si ya sos dev</p>
              <p className="mt-1 text-muted-foreground">
                Cursor, Windsurf, Kiro, Claude Code, Codex y Gemini CLI también
                leen SKILL.md y tienen acceso completo a archivos y terminal.
                Las rutas están en la tabla de instalación manual.
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            ChatGPT y Gemini web no cargan SKILL.md.
          </span>{' '}
          Son chat, no agentes con archivos y terminal. Sirven para prompts
          sueltos, no para estas skills.
        </p>
      </section>

      <section id="instalacion" className="scroll-mt-6 space-y-6">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-bold font-headline">
            <Download className="h-5 w-5 text-primary" />
            Instalación en 4 pasos
          </h2>
          <p className="text-sm text-muted-foreground">
            El instalador detecta los agentes instalados y crea symlinks. No
            copia los archivos: si actualizás el repo, actualizás la skill. Si
            usás Claude, Cowork o Manus, subí la carpeta desde la app: el
            instalador es para agentes locales.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  1
                </span>
                Cloná el repo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Necesitás git. El repo es público.
              </p>
              <CodeBlock
                code={'git clone https://github.com/Gianni03/gianni-skills.git\ncd gianni-skills'}
                analyticsContext="install"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  2
                </span>
                Ejecutá el instalador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Detecta OpenCode, Claude Code, Gemini CLI, Cursor, Kiro y
                Windsurf. Podés forzar uno y reemplazar lo existente.
              </p>
              <CodeBlock
                code={'chmod +x install.sh\n./install.sh'}
                analyticsContext="install"
              />
              <CodeBlock
                code={'./install.sh --agent opencode\n./install.sh --force'}
                label="Opciones"
                analyticsContext="install"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  3
                </span>
                Reiniciá el agente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cerrá y abrí tu agente para que cargue las skills. En OpenCode
                quedan en ~/.config/opencode/skills/. Si no reiniciás, no las
                ve.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  4
                </span>
                Configurá la skill que lo necesite
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                job-search necesita profile.json. job-application necesita
                assets/profile.md. interview-prep funciona sin configuración.
                El detalle está en cada tab.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FolderTree className="h-4 w-4 text-primary" />
                Instalación manual
              </CardTitle>
              <CardDescription>
                Si preferís no usar el script, copiá o symlinkeá la carpeta de
                cada skill a la ruta de tu agente.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agente</TableHead>
                    <TableHead>Ruta</TableHead>
                    <TableHead className="hidden md:table-cell">Nota</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.name}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {agent.path}
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground md:table-cell">
                        {agent.note}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Wrench className="h-4 w-4 text-primary" />
                Requisitos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Base</p>
                <BulletList
                  items={[
                    'git',
                    'Un agente con soporte de skills (no un chat web)',
                  ]}
                />
              </div>
              <div>
                <p className="text-sm font-medium">job-search</p>
                <BulletList items={['bun', 'python3']} />
              </div>
              <div>
                <p className="text-sm font-medium">job-application</p>
                <BulletList
                  items={[
                    'python3 + python-docx',
                    'poppler-utils (pdftotext, pdfinfo)',
                    'libreoffice',
                  ]}
                />
              </div>
              <div>
                <p className="text-sm font-medium">interview-prep</p>
                <BulletList items={['Nada extra: solo el agente']} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="skills" className="scroll-mt-6 space-y-6">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-bold font-headline">
            <Sparkles className="h-5 w-5 text-primary" />
            Las tres skills
          </h2>
          <p className="text-sm text-muted-foreground">
            Cada una resuelve una parte distinta del proceso. Se pueden usar
            juntas: buscar, aplicar y preparar la entrevista.
          </p>
        </div>

        <Tabs defaultValue={skills[0].id} className="space-y-4">
          <TabsList className="grid h-auto w-full grid-cols-1 gap-1 sm:grid-cols-3">
            {skills.map((skill) => (
              <TabsTrigger
                key={skill.id}
                value={skill.id}
                className="gap-2 py-2"
              >
                <skill.icon className="h-4 w-4" />
                {skill.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {skills.map((skill) => (
            <TabsContent
              key={skill.id}
              value={skill.id}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <skill.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-2xl font-headline">
                      {skill.name}
                    </CardTitle>
                    <Badge variant="secondary" className="font-normal">
                      v{skill.version}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-green-300 font-normal text-green-700 dark:border-green-800 dark:text-green-300"
                    >
                      Activa
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {skill.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Qué hace</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                      {skill.modes.map((mode) => (
                        <div
                          key={mode.title}
                          className="rounded-lg border bg-muted/30 p-4"
                        >
                          <p className="font-mono text-sm font-medium">
                            {mode.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {mode.description}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {skill.commands && skill.commands.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Terminal className="h-4 w-4 text-primary" />
                          Comandos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {skill.commands.map((command) => (
                          <CodeBlock
                            key={command.label}
                            label={command.label}
                            code={command.code}
                            analyticsContext={skill.name}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Cómo pedírsela al agente
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Escribí cualquiera de estas frases en tu agente. La skill
                        se activa por su trigger.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skill.usage.map((example) => (
                          <Badge
                            key={example}
                            variant="secondary"
                            className="font-normal"
                          >
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Wrench className="h-4 w-4 text-primary" />
                        Setup
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skill.setup.map((step) => (
                        <div key={step.title} className="space-y-2">
                          <p className="text-sm font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                          {step.code && (
                            <CodeBlock
                              code={step.code}
                              label={step.codeLabel}
                              analyticsContext={skill.name}
                            />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FolderTree className="h-4 w-4 text-primary" />
                        Requisitos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BulletList items={skill.requirements} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Salidas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DotList items={skill.outputs} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Límites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DotList items={skill.limits} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-bold font-headline">
            <MessageSquare className="h-5 w-5 text-primary" />
            Preguntas frecuentes
          </h2>
          <p className="text-sm text-muted-foreground">
            Lo que conviene saber antes de instalar.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        Repo: {' '}
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          github.com/Gianni03/gianni-skills
        </a>
        {' '}— licencia Apache-2.0.
      </div>
    </div>
  );
}
