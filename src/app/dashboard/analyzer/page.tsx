import { FeedbackAnalyzer } from "@/components/analyzer/feedback-analyzer";

export default function AnalyzerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">Analizador de Feedback con IA</h1>
        <p className="text-muted-foreground">Pega el feedback de un reclutador para obtener un análisis y sugerencias.</p>
      </div>
      <FeedbackAnalyzer />
    </div>
  );
}
