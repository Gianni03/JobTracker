import { Badge } from '@/components/ui/badge';
import type { Application } from '@/lib/definitions';
import { formatSalaryRange } from '@/lib/format';
import { getSalaryInsights } from '@/lib/salary';

interface SalaryInsightsProps {
  applications: Application[];
}

function SalaryMetric({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-lg border bg-muted/20 p-3">
      <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">
        {value !== undefined ? value : '—'}
      </p>
    </div>
  );
}

export function SalaryInsights({ applications }: SalaryInsightsProps) {
  const insights = getSalaryInsights(applications);

  if (insights.length === 0) {
    return (
      <p className="text-sm italic text-muted-foreground">
        Todavía no hay datos salariales en este rango de fechas.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {insights.map((insight) => {
        const desired = insight.desiredAverage
          ? formatSalaryRange(
              insight.desiredAverage,
              null,
              insight.currency,
              'year',
            )
          : undefined;
        const expressed = insight.expressedAverage
          ? formatSalaryRange(
              insight.expressedAverage,
              null,
              insight.currency,
              'year',
            )
          : undefined;
        const offer = insight.offerAverage
          ? formatSalaryRange(
              insight.offerAverage,
              null,
              insight.currency,
              'year',
            )
          : undefined;

        return (
          <div key={insight.currency} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                {insight.currency}
              </p>
              <Badge variant="outline" className="font-normal">
                {insight.count} con datos
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <SalaryMetric label="Deseado" value={desired} />
              <SalaryMetric label="Expresado" value={expressed} />
              <SalaryMetric label="Oferta" value={offer} />
            </div>
            {insight.offerToDesiredPct !== undefined && (
              <p className="text-xs text-muted-foreground">
                La oferta promedio está{' '}
                <span
                  className={
                    insight.offerToDesiredPct >= 0
                      ? 'font-semibold text-green-600 dark:text-green-400'
                      : 'font-semibold text-destructive'
                  }
                >
                  {insight.offerToDesiredPct >= 0 ? '+' : ''}
                  {insight.offerToDesiredPct}%
                </span>{' '}
                respecto al salario deseado.
              </p>
            )}
          </div>
        );
      })}
      <p className="text-xs text-muted-foreground">
        Promedios anualizados: por hora se estiman 2.080 h/año y mensual × 12.
        No se convierten monedas, por eso cada una se compara por separado.
      </p>
    </div>
  );
}
