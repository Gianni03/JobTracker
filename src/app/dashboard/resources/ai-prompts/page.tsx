import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
                    <h1 className="text-3xl font-bold font-headline text-foreground">Prompts de IA para Búsqueda Laboral</h1>
                    <p className="text-muted-foreground">Aprovecha la inteligencia artificial para optimizar tu búsqueda de empleo.</p>
                </div>
            </div>
            <article className="prose dark:prose-invert max-w-none">
                <p>A continuación encontrarás contenido de ejemplo. Reemplázalo con la información de tu Notion.</p>

                <h2>Para Optimizar tu CV</h2>
                <p>Pega la descripción de tu puesto y la descripción del trabajo, luego usa este prompt:</p>
                <pre><code>Actúa como un experto en reclutamiento. Analiza la descripción de este puesto de trabajo [pegar descripción] y mi CV [pegar CV]. Sugiere 5 mejoras específicas en mi CV para alinearlo mejor con los requisitos del puesto, enfocándote en logros cuantificables.</code></pre>

                <h2>Para Generar una Carta de Presentación</h2>
                <pre><code>Basado en mi CV [pegar CV] y en la descripción de este puesto de [pegar puesto] en [pegar empresa], escribe una carta de presentación concisa y profesional. Destaca mi experiencia en [mencionar 2-3 habilidades clave] y muestra entusiasmo por la misión de la empresa.</code></pre>

                <h2>Para Preparar Entrevistas Conductuales</h2>
                <pre><code>Voy a tener una entrevista para el puesto de [puesto] en [empresa]. Basado en la descripción del puesto [pegar descripción], genera 5 preguntas de entrevista conductual probables que podrían hacerme. Para cada pregunta, explícame qué habilidad se busca evaluar.</code></pre>

                <h2>Para Simular una Entrevista Técnica</h2>
                <pre><code>Simulemos una entrevista técnica para un puesto de [puesto]. Hazme una pregunta de nivel intermedio sobre [tecnología, ej: JavaScript, React, etc.]. Evalúa mi respuesta y dame feedback constructivo sobre su claridad, corrección y eficiencia.</code></pre>
            </article>
        </div>
    );
}
