import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TechnicalInterviewsPage() {
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
            Entrevistas Técnicas
          </h1>
          <p className="text-muted-foreground">
            Consejos y recursos para brillar en tus entrevistas técnicas.
          </p>
        </div>
      </div>
      <article className="prose dark:prose-invert max-w-none">
        <p>
          A continuación encontrarás contenido de ejemplo. Reemplázalo con la
          información de tu Notion.
        </p>

        <h2>Coding Challenges</h2>
        <p>
          Son el corazón de muchas entrevistas técnicas. El objetivo no es solo
          encontrar la solución, sino demostrar tu proceso de pensamiento.
        </p>
        <ul>
          <li>
            <strong>Entiende el Problema:</strong> Antes de escribir una sola
            línea de código, haz preguntas para aclarar todos los requisitos y
            casos límite.
          </li>
          <li>
            <strong>Piensa en Voz Alta:</strong> Comunica tu enfoque, las
            estructuras de datos que estás considerando y los pros y contras de
            diferentes soluciones.
          </li>
          <li>
            <strong>Empieza Simple:</strong> A menudo es mejor implementar una
            solución funcional (aunque no sea la más óptima) primero y luego
            refinarla.
          </li>
          <li>
            <strong>Prueba tu Código:</strong> Considera casos de prueba,
            incluyendo casos límite (edge cases), para demostrar que tu solución
            es robusta.
          </li>
        </ul>

        <h2>Preguntas sobre Arquitectura y Diseño de Sistemas</h2>
        <p>
          Estas preguntas evalúan tu capacidad para diseñar sistemas escalables
          y robustos. Por ejemplo: &quot;Diseña un acortador de URLs como
          Bitly&quot; o &quot;Diseña la arquitectura de Twitter&quot;.
        </p>
        <ul>
          <li>
            <strong>Aclara Requisitos:</strong> ¿Cuáles son las funcionalidades
            clave? ¿Cuál es la escala esperada (usuarios, peticiones por
            segundo)?
          </li>
          <li>
            <strong>Diseño de Alto Nivel:</strong> Dibuja un diagrama simple con
            los componentes principales (servidores, bases de datos, cachés,
            load balancers).
          </li>
          <li>
            <strong>Profundiza en los Componentes:</strong> Discute el esquema
            de la base de datos, la elección entre SQL y NoSQL, las estrategias
            de caché, etc.
          </li>
          <li>
            <strong>Identifica Cuellos de Botella:</strong> Piensa en qué partes
            del sistema podrían fallar o volverse lentas bajo carga y cómo
            mitigar esos riesgos.
          </li>
        </ul>

        <h2>Plataformas para Practicar</h2>
        <ul>
          <li>
            <a
              href="https://www.leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LeetCode
            </a>
          </li>
          <li>
            <a
              href="https://www.hackerrank.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              HackerRank
            </a>
          </li>
          <li>
            <a
              href="https://www.codewars.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codewars
            </a>
          </li>
          <li>
            <a
              href="https://www.pramp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pramp
            </a>{' '}
            (para practicar entrevistas con otros ingenieros)
          </li>
        </ul>
      </article>
    </div>
  );
}
