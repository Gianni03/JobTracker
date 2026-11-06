import type { Application } from '@/lib/definitions';
import { getPlatformInsights } from '@/lib/platform-stats';

interface PlatformPerformanceProps {
  applications: Application[];
}

export function PlatformPerformance({
  applications,
}: PlatformPerformanceProps) {
  const insights = getPlatformInsights(applications);

  if (insights.length === 0) {
    return (
      <p className="text-sm italic text-muted-foreground">
        Todavía no hay postulaciones en este rango de fechas.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <div key={insight.platform} className="space-y-1.5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="text-sm font-medium text-foreground">
              {insight.platform}
            </span>
            <span className="text-xs text-muted-foreground">
              {insight.total} postulaciones · {insight.interviews} entrevistas
              {insight.offers > 0 ? ` · ${insight.offers} ofertas` : ''}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${insight.interviewRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{insight.interviewRate}% entrevistas</span>
            <span>{insight.responseRate}% respuesta</span>
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        La barra compara la tasa de entrevistas de cada plataforma sobre su
        propio volumen.
      </p>
    </div>
  );
}
