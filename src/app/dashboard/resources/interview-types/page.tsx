import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function InterviewTypesPage() {
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
            Tipos de Entrevistas
          </h1>
          <p className="text-muted-foreground">
            Conoce los diferentes formatos de entrevista y cómo prepararte para
            cada uno.
          </p>
        </div>
      </div>
      <article className="prose dark:prose-invert max-w-none">
        <p>
          A continuación encontrarás contenido de ejemplo. Reemplázalo con la
          información de tu Notion.
        </p>

        <h2>1. Entrevista de Screening (o Filtro)</h2>
        <p>
          Generalmente es la primera conversación, conducida por un reclutador o
          personal de RR.HH. El objetivo es verificar que cumples con los
          requisitos básicos del puesto, entender tus expectativas salariales y
          evaluar tu interés en la empresa.
        </p>
        <h4>Consejos:</h4>
        <ul>
          <li>
            Ten tu &quot;elevator pitch&quot; listo: un resumen conciso de quién
            eres y qué buscas.
          </li>
          <li>Investiga la empresa y el puesto de antemano.</li>
          <li>Sé claro sobre tus expectativas salariales y disponibilidad.</li>
        </ul>

        <h2>2. Entrevista Técnica</h2>
        <p>
          Evalúa tus habilidades técnicas y conocimientos específicos para el
          puesto. Puede incluir live coding, problemas de algoritmos, preguntas
          sobre arquitectura de software o la revisión de tu portfolio.
        </p>
        <h4>Consejos:</h4>
        <ul>
          <li>
            Practica problemas de código en plataformas como LeetCode o
            HackerRank.
          </li>
          <li>
            Repasa los fundamentos de las tecnologías requeridas para el puesto.
          </li>
          <li>
            Piensa en voz alta durante los ejercicios de código para mostrar tu
            proceso de razonamiento.
          </li>
        </ul>

        <h2>3. Entrevista Conductual</h2>
        <p>
          Se enfoca en cómo has manejado situaciones laborales en el pasado. El
          entrevistador quiere entender tus habilidades blandas (soft skills)
          como trabajo en equipo, resolución de conflictos, liderazgo y
          comunicación.
        </p>
        <h4>Consejos:</h4>
        <ul>
          <li>
            Utiliza el método STAR (Situación, Tarea, Acción, Resultado) para
            estructurar tus respuestas.
          </li>
          <li>
            Prepara varios ejemplos de tu experiencia que demuestren diferentes
            habilidades.
          </li>
          <li>Sé honesto y reflexivo sobre tus éxitos y fracasos.</li>
        </ul>

        <h2>4. Entrevista con el Manager o Equipo</h2>
        <p>
          En esta etapa, conocerás a tu posible futuro jefe y/o a los miembros
          del equipo. El objetivo es evaluar el &quot;cultural fit&quot;, tu
          dinámica de trabajo en equipo y si encajas con la visión del manager.
        </p>
        <h4>Consejos:</h4>
        <ul>
          <li>
            Prepara preguntas inteligentes sobre el equipo, los proyectos y la
            cultura de la empresa.
          </li>
          <li>
            Muestra entusiasmo e interés genuino en el trabajo que realizan.
          </li>
          <li>Sé tú mismo y deja que tu personalidad brille.</li>
        </ul>
      </article>
    </div>
  );
}
