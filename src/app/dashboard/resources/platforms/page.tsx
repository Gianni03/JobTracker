import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Globe,
  MapPin,
  Building2,
  ExternalLink,
  Search,
  Info,
  Zap,
  MousePointer2,
  Command,
  BarChart3,
} from 'lucide-react';

const platformCategories = [
  {
    title: 'Latinoamérica y Argentina',
    icon: <MapPin className="h-5 w-5 text-blue-500" />,
    links: [
      { name: 'Bumeran', url: 'https://www.bumeran.com.ar/', region: '🇦🇷' },
      {
        name: 'Get on Board',
        url: 'https://www.getonbrd.com/',
        region: '🇦🇷🇨🇴🇲🇽🇨🇱🇵🇪🇪🇨',
      },
      {
        name: 'ChumiJobs',
        url: 'https://www.chumijobs.com/',
        region: '🇦🇷🇨🇴🇲🇽',
      },
      {
        name: 'Empleos IT',
        url: 'https://www.empleosit.com.ar/',
        region: '🇦🇷',
      },
      {
        name: 'Weremoto',
        url: 'https://www.weremoto.com/',
        region: '🗺️ LatAm',
      },
      {
        name: 'Tribu Latam',
        url: 'https://www.tribulatam.com/feed',
        region: '🗺️ LatAm',
      },
      {
        name: 'Pilar Humano',
        url: 'https://www.pilarhumano.com.ar/',
        region: '🇦🇷',
      },
      { name: 'Simera', url: 'https://simera.io/', region: '🗺️ Remote' },
      { name: 'La Pieza', url: 'https://lapieza.io/', region: '🇲🇽 🗺️' },
      { name: '5411 Hub', url: 'https://www.5411hub.com/', region: '🇦🇷' },
    ],
  },
  {
    title: 'España y Europa',
    icon: <Globe className="h-5 w-5 text-green-500" />,
    links: [
      {
        name: 'Tecnoempleo',
        url: 'https://www.tecnoempleo.com/',
        region: '🇪🇸',
      },
      { name: 'Manfred', url: 'https://www.getmanfred.com/', region: '🇪🇸' },
      { name: 'Ticjob', url: 'https://ticjob.es/', region: '🇪🇸' },
      { name: 'Circular.io', url: 'https://circular.io/', region: '🇪🇺' },
      { name: 'Landing.jobs', url: 'https://landing.jobs/', region: '🇪🇺' },
      { name: 'Rviewer', url: 'https://rviewer.io/', region: '🇪🇺' },
      {
        name: 'TWT Spain',
        url: 'https://careers.twtspain.com/',
        region: '🇪🇸🇪🇺',
      },
      {
        name: 'Oliver Bernard',
        url: 'https://oliverbernard.com/jobs',
        region: '🇬🇧🇪🇺',
      },
      { name: 'Reed.co.uk', url: 'https://www.reed.co.uk/', region: '🇬🇧' },
      { name: 'IrishJobs', url: 'https://www.irishjobs.ie/', region: '🇮🇪' },
      { name: 'S1 Jobs', url: 'https://www.s1jobs.com/', region: '🇬🇧' },
    ],
  },
  {
    title: 'Global y Remoto (US Focus)',
    icon: <Zap className="h-5 w-5 text-orange-500" />,
    links: [
      {
        name: 'DevJobScanner',
        url: 'https://www.devjobsscanner.com/',
        region: '🔎🗺️',
      },
      {
        name: 'Glassdoor',
        url: 'https://www.glassdoor.es/Empleo/index.htm',
        region: '🗺️',
      },
      { name: 'Remote OK', url: 'https://remoteok.com/', region: '🗺️' },
      { name: 'Torre.ai', url: 'https://torre.ai/', region: '🗺️' },
      {
        name: 'Jobspresso',
        url: 'https://jobspresso.co/remote-work/',
        region: '🗺️',
      },
      { name: 'FlexJobs', url: 'https://www.flexjobs.com/', region: '🗺️' },
      { name: 'Dice', url: 'https://www.dice.com/', region: '🇺🇸' },
      { name: 'Indeed Global', url: 'https://es.indeed.com/', region: '🗺️' },
      {
        name: 'Athyna',
        url: 'https://www.athyna.com/for-talent',
        region: '🗺️',
      },
      {
        name: 'JavaScript Jobs',
        url: 'https://javascript.jobs/remote',
        region: '🌐 JS',
      },
      {
        name: 'Torc',
        url: 'https://platform.torc.dev/#/dashboard',
        region: '🌐 Tech',
      },
    ],
  },
  {
    title: 'Directo en Big Tech',
    icon: <Building2 className="h-5 w-5 text-purple-500" />,
    links: [
      {
        name: 'Google Careers',
        url: 'https://www.google.com/about/careers/applications/',
        region: '🇺🇸 / 🗺️',
      },
      {
        name: 'Meta Careers',
        url: 'https://www.metacareers.com/',
        region: '🇺🇸 / 🗺️',
      },
      {
        name: 'Apple Careers',
        url: 'https://www.apple.com/careers/us/',
        region: '🇺🇸 / 🗺️',
      },
      {
        name: 'Netflix Jobs',
        url: 'https://explore.jobs.netflix.net/careers',
        region: '🇺🇸 / 🗺️',
      },
      {
        name: 'Spotify Jobs',
        url: 'https://www.lifeatspotify.com/jobs',
        region: '🗺️ / 🇸🇪',
      },
      {
        name: 'Atlassian',
        url: 'https://www.atlassian.com/company/careers/all-jobs',
        region: '🗺️ / 🇦🇺',
      },
      {
        name: 'YouTube Jobs',
        url: 'https://www.youtube.com/jobs/',
        region: '🇺🇸 / 🗺️',
      },
    ],
  },
];

export default function PlatformsPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="flex-none">
          <Link href="/dashboard/resources">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-foreground">
            Dónde Aplicar
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Las mejores plataformas y recursos para encontrar tu próximo salto
            profesional.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* TIP: Google Dorks */}
        <section className="p-6 md:p-8 rounded-3xl bg-secondary/30 border border-secondary relative overflow-hidden group">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center relative z-10 text-center md:text-left">
            <div className="p-4 rounded-2xl bg-background border flex-none shadow-sm group-hover:scale-105 transition-transform duration-500">
              <Command className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold flex items-center justify-center md:justify-start gap-2">
                <Search className="h-5 w-5 text-primary" />
                Pro Tip: Búsquedas Avanzadas en Google
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Muchas empresas usan <strong>Greenhouse</strong> o{' '}
                <strong>Lever</strong>. Podés encontrarlas directamente buscando
                en Google con dorks específicos: [puesto] [ubicación]
                site:https://job-boards.greenhouse.io/
              </p>
              <div className="bg-background/80 font-mono text-[10px] md:text-xs p-3 rounded-lg border border-primary/20 text-primary break-all md:break-normal">
                frontend developer remote site:https://job-boards.greenhouse.io/
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {platformCategories.map((category) => (
            <section
              key={category.title}
              className="bg-card border rounded-[2rem] overflow-hidden flex flex-col shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-5 md:p-6 border-b bg-muted/20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-background border shadow-sm flex-none">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-base md:text-lg truncate">
                    {category.title}
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground bg-background px-2 py-1 rounded-full border flex-none">
                  {category.links.length} LINKS
                </span>
              </div>
              <div className="p-3 md:p-4 flex-1">
                <div className="grid grid-cols-1 gap-1">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-all group gap-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors flex-none" />
                        <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                          {link.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-none">
                        {link.region && (
                          <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider">
                            {link.region}
                          </span>
                        )}
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bonus Section: Tools */}
        <section className="p-8 md:p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 via-background to-transparent border border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <Info className="h-4 w-4" /> Bonus Tool
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-headline leading-tight">
                Levels.fyi
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Antes de aplicar, compará salarios y niveles de bandas entre
                empresas como Mercado Libre, Globant, y las Big Tech de USA.
                Información crítica para negociar tu oferta.
              </p>
              <Button
                variant="outline"
                className="rounded-2xl gap-2 group border-primary/20 hover:bg-primary/5 w-full md:w-auto"
                asChild
              >
                <a
                  href="https://www.levels.fyi/?compare=Mercado%20Libre,Globant,MURAL&track=Software%20Engineer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explorar Salarios
                  <MousePointer2 className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform border-none" />
                </a>
              </Button>
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10 overflow-hidden flex-none">
              <BarChart3 className="h-10 w-10 md:h-12 md:w-12 text-primary" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
