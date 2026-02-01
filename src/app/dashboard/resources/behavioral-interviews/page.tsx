import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BehavioralInterviewsPage() {
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
            Entrevistas Conductuales
          </h1>
          <p className="text-muted-foreground">
            Domina el arte de contar tus historias de éxito profesional.
          </p>
        </div>
      </div>
      <article className="prose dark:prose-invert max-w-none">
        <p>
          A continuación encontrarás contenido de ejemplo. Reemplázalo con la
          información de tu Notion.
        </p>

        <h2>El Método STAR</h2>
        <p>
          La técnica STAR es la forma más efectiva de responder a preguntas de
          entrevistas conductuales. Te ayuda a estructurar tus respuestas de una
          manera clara, concisa y convincente.
        </p>
        <ul>
          <li>
            <strong>S (Situación):</strong> Describe el contexto. ¿Dónde y
            cuándo ocurrió? ¿Quién estaba involucrado?
          </li>
          <li>
            <strong>T (Tarea):</strong> Describe tu responsabilidad en esa
            situación. ¿Cuál era tu objetivo o la tarea que debías completar?
          </li>
          <li>
            <strong>A (Acción):</strong> Describe las acciones específicas que
            tomaste para abordar la tarea. Enfócate en el &quot;yo&quot;, no en
            el &quot;nosotros&quot;.
          </li>
          <li>
            <strong>R (Resultado):</strong> Describe el resultado de tus
            acciones. Cuantifica tus logros siempre que sea posible. ¿Qué
            aprendiste?
          </li>
        </ul>

        <h2>Ejemplo de Pregunta y Respuesta</h2>
        <p>
          <strong>Pregunta:</strong> &quot;Háblame de una vez que tuviste que
          lidiar con un plazo de entrega muy ajustado.&quot;
        </p>

        <h4>Respuesta usando STAR:</h4>
        <blockquote>
          <p>
            <strong>(Situación)</strong> En mi trabajo anterior, estábamos a una
            semana de lanzar una nueva funcionalidad clave para un cliente
            importante, pero un miembro del equipo se enfermó inesperadamente,
            dejando su parte del trabajo incompleta.
          </p>
          <p>
            <strong>(Tarea)</strong> Mi tarea era asumir esa responsabilidad
            adicional, que incluía la integración de una API de pagos, y
            asegurar que cumpliéramos con la fecha de lanzamiento sin sacrificar
            la calidad.
          </p>
          <p>
            <strong>(Acción)</strong> Lo primero que hice fue reevaluar las
            tareas restantes y priorizarlas. Me comuniqué con mi manager para
            ajustar las expectativas sobre tareas secundarias. Luego, dediqué
            horas extra enfocadas, documenté mi progreso de manera transparente
            para el equipo y realicé pruebas exhaustivas en cada etapa de la
            integración.
          </p>
          <p>
            <strong>(Resultado)</strong> Gracias a esa gestión, no solo logramos
            lanzar la funcionalidad a tiempo, sino que la integración funcionó
            sin errores desde el primer día. El cliente quedó muy satisfecho y
            el proyecto generó un aumento del 15% en las transacciones durante
            el primer mes. Además, aprendí a manejar la presión y a priorizar
            eficazmente en momentos críticos.
          </p>
        </blockquote>
      </article>
    </div>
  );
}
