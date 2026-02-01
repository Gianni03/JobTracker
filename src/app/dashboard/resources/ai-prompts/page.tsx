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
      <article className="prose dark:prose-invert max-w-none">
        <div>
          <h2>Para Optimizar tu CV según la oferta de empleo</h2>
          <p>
            Pega la descripción de tu puesto y la descripción del trabajo, luego
            usa este prompt:
          </p>
          <p>
            <ol>
              <li>
                Identificar las palabras clave y requisitos principales del
                puesto.
              </li>
              <li>
                Señalar cuáles de esas palabras clave ya están en mi CV y cuáles
                faltan.
              </li>
              <li>
                Reescribir mi CV incorporando únicamente las palabras clave que
                reflejen experiencias, habilidades o logros que realmente tengo,
                sin inventar información ni modificar la esencia de mi perfil.
              </li>
              <li>
                Mantener un estilo profesional, claro y conciso, optimizado para
                ATS.
              </li>
            </ol>
            Aquí está la descripción del puesto: [pegar descripción].
          </p>
        </div>

        <div>
          <h2>PROMPT PARA BUSQUEDA LABORAL ESPECIALIZADA</h2>
          <div>
            <span>OBJETIVO:</span> Encontrar oportunidades laborales de alta
            calidad que coincidan exactamente con el perfil profesional
            proporcionado, mediante métodos avanzados de investigación online.
            <br />
            <span>DATOS DEL PERFIL:</span> - Áreas de experiencia: desarrollo
            web, frontend developer. React, HTML, CSS, JavaScript, typescript -
            Nombre del puesto: UI developer, frontend developer, web developer,
            react developer, javascript developer, frontend creativo  •
            Ubicación: Rosario, Argentina para puestos onsite, worldwide para
            puestos remotos (que acepten Latam o argentina) - Periodo de
            búsqueda: Últimos 7 días. mi cv esta como archivo adjunto para
            comparacion y analisis  PLATAFORMAS CLAVE: google jobs - LinkedIn. -
            Greenhouse, Glassdoor, hiringroom  OPCIONALES: - Indeed. - Bumeran.
            -  infojobs - irish jobs - manfred - WeWorkRemotely -  seek,
            Remotive.io - AngelList (Wellfound) - GetOnBoard - Jooble /
            Recruit.net - Hired - repelio  CRITERIOS DE BÚSQUEDA Requisitos : -
            Tipo de puesto: Excluir trainee, pasantías, mas de 9 años de
            experiencia y ofertas fullstack enfocadas en el backend- Contrato:
            Tiempo completo o indefinido. - Empresas: Startups , PyMEs o
            corporaciones internacionales. - Sectores prioritarios: Tecnología,
            Comercio Internacional, Consultoría, software factories, music
            related - tecnologías que incluya por lo menos alguna de estas HTML,
            CSS, javascript, typescript, react - tecnologias a excluir: angular,
            react, node si estan puestas como excluyentes, Obligatorio el link a
            la oferta  MÉTODO DE INVESTIGACIÓN: Búsqueda inicial: - Utilizar
            filtros avanzados y búsquedas booleanas precisas - Revisar
            directamente las páginas oficiales y perfiles empresariales
            relevantes. Investigación profunda: - Identificar empresas en
            expansión dentro de la ubicación indicada. - Analizar tendencias
            actuales del mercado laboral en sectores específicos. Validación
            final: - Verificar la legitimidad y prestigio de cada oferta
            laboral. - Consultar la reputación empresarial mediante Glassdoor,
            LinkedIn y otras fuentes fiables.  RESULTADOS ESPERADOS: Entregar 3
            tablas estructuradas con un mínimo de 5 max 10 resultados de alto
            valor:  tabla 1, exclusiva para posiciones solo en rosario y
            arlrededores hasta 60km.  tabla 2 exclusiva para startups de estados
            unidos con posibilidad remote Latam.  tabla 3 puesto con opcion
            remote Latam argentina  Distribución mínima requerida:   Puesto con
            link a la oferta ( si o si el link) - Empresa - Ubicación  
            Importante: Priorizar siempre la calidad sobre la cantidad. Cada
            resultado proporcionado debe ser altamente relevante, específico y
            completamente validado según los criterios detallados anteriormente.
            Es de suma importancia que en la tabla final, cada posición tenga el
            link respectivo de la vacante para que pueda postularme. Hacer una
            lista corta ultra-calificada con match exacto al CV evaluando
            requisitos técnicos de cada anuncio contra mi CV y recomedar
            posibles cambios puntuales en el cv para postular)  actua con
            enpatia hacia mi, que hace meses estoy en busque laboral sin éxito,
            cada oferta debe ser relevante con alta posibilidad de una primera
            entrevista
          </div>
        </div>

        <div>
          <h2>Para Preparar Entrevistas Conductuales</h2>
          <pre>
            <code>
              Voy a tener una entrevista para el puesto de [puesto] en
              [empresa]. Basado en la descripción del puesto [pegar
              descripción], genera 5 preguntas de entrevista conductual
              probables que podrían hacerme. Para cada pregunta, explícame qué
              habilidad se busca evaluar.
            </code>
          </pre>
        </div>

        <div>
          <h2>Para Simular una Entrevista Técnica</h2>
          <pre>
            <code>
              Simulemos una entrevista técnica para un puesto de [puesto]. Hazme
              una pregunta de nivel intermedio sobre [tecnología, ej:
              JavaScript, React, etc.]. Evalúa mi respuesta y dame feedback
              constructivo sobre su claridad, corrección y eficiencia.
            </code>
          </pre>
        </div>
      </article>
    </div>
  );
}
