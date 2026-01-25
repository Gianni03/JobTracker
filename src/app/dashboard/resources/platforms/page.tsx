import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const platforms = [
    { name: "LinkedIn", url: "https://www.linkedin.com/jobs/", description: "La red profesional más grande del mundo. Ideal para networking y encontrar ofertas de alta calidad." },
    { name: "Indeed", url: "https://www.indeed.com/", description: "Uno de los mayores agregadores de ofertas de empleo." },
    { name: "Glassdoor", url: "https://www.glassdoor.com/Job/", description: "Busca trabajos y obtén información sobre salarios, entrevistas y cultura de empresa." },
    { name: "Wellfound (antes AngelList Talent)", url: "https://wellfound.com/", description: "Plataforma líder para encontrar trabajo en startups y empresas de tecnología." },
    { name: "Get on Board", url: "https://getonbrd.com/", description: "Plataforma de reclutamiento especializada en tecnología en Latinoamérica." },
    { name: "Hired", url: "https://hired.com/", description: "Plataforma donde las empresas te postulan a ti, invirtiendo el modelo tradicional." },
    { name: "GitHub Jobs", url: "https://jobs.github.com/", description: "Un tablón de anuncios de empleo directamente en la plataforma que usan los desarrolladores." },
];

export default function PlatformsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/resources">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold font-headline text-foreground">Dónde Aplicar</h1>
                    <p className="text-muted-foreground">Una selección de las mejores plataformas para encontrar tu próximo trabajo.</p>
                </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
                <p>A continuación encontrarás contenido de ejemplo. Reemplázalo con la información de tu Notion.</p>
                <div className="space-y-4 not-prose">
                    {platforms.map(platform => (
                        <div key={platform.name} className="p-4 border rounded-lg">
                            <a href={platform.url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">{platform.name}</a>
                            <p className="text-sm text-muted-foreground mt-1">{platform.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
