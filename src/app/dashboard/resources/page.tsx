import { ResourceCard } from "@/components/resources/resource-card";
import { Briefcase, Code, FileText, Search, Users, Wand2 } from "lucide-react";

const resources = [
    {
      title: "Tipos de Entrevistas",
      description: "Conoce los diferentes tipos de entrevistas: screening, técnica, conductual y más.",
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      href: "/dashboard/resources/interview-types",
    },
    {
      title: "Prompts de IA para Búsqueda Laboral",
      description: "Utiliza la IA para potenciar tu búsqueda de empleo, desde la creación de CV hasta la preparación de entrevistas.",
      icon: <Wand2 className="w-6 h-6 text-primary" />,
      href: "/dashboard/resources/ai-prompts",
    },
    {
      title: "Entrevistas Conductuales",
      description: "Aprende a responder preguntas sobre tu experiencia y habilidades blandas con el método STAR.",
      icon: <Users className="w-6 h-6 text-primary" />,
      href: "/dashboard/resources/behavioral-interviews",
    },
    {
      title: "Entrevistas Técnicas",
      description: "Prepárate con preguntas comunes y consejos para resolver coding challenges.",
      icon: <Code className="w-6 h-6 text-primary" />,
      href: "/dashboard/resources/technical-interviews",
    },
    {
      title: "CV y Portfolio",
      description: "Crea un CV impactante y un portfolio que destaque tus mejores proyectos.",
      icon: <FileText className="w-6 h-6 text-primary" />,
      href: "/dashboard/resources/cv-portfolio",
    },
    {
      title: "Dónde Aplicar",
      description: "Un listado de las mejores plataformas y bolsas de trabajo para encontrar tu próximo desafío.",
      icon: <Search className="w-6 h-6 text-primary" />,
      href: "/dashboard/resources/platforms",
    },
  ];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">Recursos de Entrevista</h1>
        <p className="text-muted-foreground">Prepárate para tus entrevistas con estos recursos</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </div>
  );
}
