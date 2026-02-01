import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CvPortfolioPage() {
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
            CV y Portfolio
          </h1>
          <p className="text-muted-foreground">
            Crea un CV impactante y un portfolio que demuestre tu valor.
          </p>
        </div>
      </div>
      <article className="prose dark:prose-invert max-w-none">
        <p>
          A continuación encontrarás contenido de ejemplo. Reemplázalo con la
          información de tu Notion.
        </p>

        <h2>Claves para un CV Exitoso</h2>
        <ul>
          <li>
            <strong>Adapta tu CV:</strong> No uses el mismo CV para todas las
            postulaciones. Ajústalo para resaltar la experiencia y las
            habilidades más relevantes para cada puesto específico.
          </li>
          <li>
            <strong>Enfócate en Logros, no Tareas:</strong> En lugar de decir
            &quot;Responsable de X&quot;, di &quot;Logré Y haciendo X, lo que
            resultó en un Z% de mejora&quot;. Usa verbos de acción y cuantifica
            tus resultados.
          </li>
          <li>
            <strong>Formato Limpio y Legible:</strong> Usa un diseño profesional
            y fácil de escanear. Los reclutadores dedican solo unos segundos a
            cada CV. Usa viñetas, negritas y espacios en blanco.
          </li>
          <li>
            <strong>Información de Contacto Clara:</strong> Incluye tu nombre,
            teléfono, email y un enlace a tu perfil de LinkedIn y portfolio.
          </li>
          <li>
            <strong>Palabras Clave:</strong> Incluye palabras clave de la
            descripción del puesto para pasar los filtros de los Sistemas de
            Seguimiento de Candidatos (ATS).
          </li>
        </ul>

        <h2>Construyendo un Portfolio de Alto Impacto</h2>
        <p>
          Tu portfolio es tu mejor carta de presentación. Es donde muestras, no
          solo cuentas, lo que puedes hacer.
        </p>
        <ul>
          <li>
            <strong>Selecciona tus Mejores Proyectos:</strong> Elige 3-5
            proyectos que demuestren una variedad de habilidades y resuelvan
            problemas interesantes. La calidad es mejor que la cantidad.
          </li>
          <li>
            <strong>Crea un Caso de Estudio:</strong> Para cada proyecto, no
            solo muestres el resultado final. Explica el problema, tu proceso,
            los desafíos que enfrentaste, las decisiones que tomaste y el
            resultado final.
          </li>
          <li>
            <strong>Diseño Profesional:</strong> La presentación importa.
            Asegúrate de que tu sitio de portfolio sea limpio, rápido y fácil de
            navegar.
          </li>
          <li>
            <strong>&quot;Sobre Mí&quot;:</strong> Incluye una sección que hable
            un poco de ti, tu pasión por tu campo y tus intereses.
          </li>
        </ul>
      </article>
    </div>
  );
}
