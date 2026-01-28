'use client';

import { Progress } from "@/components/ui/progress";
import type { Application } from '@/lib/definitions';

export function ConversionRates({ applications }: { applications: Application[] }) {
  const total = applications.length;
  // Consideramos entrevista si el estado es Entrevista, Oferta o Rechazado (si pasó por entrevista)
  // Como simplificación usamos el status actual.
  const interviews = applications.filter(a => ['Entrevista', 'Oferta'].includes(a.status)).length;
  const offers = applications.filter(a => a.status === 'Oferta').length;

  // Tasas
  const interviewRate = total > 0 ? (interviews / total) * 100 : 0;
  const offerRate = interviews > 0 ? (offers / interviews) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">De Aplicación a Entrevista</span>
          <span className="text-muted-foreground">{interviews} de {total} ({Math.round(interviewRate)}%)</span>
        </div>
        <Progress value={interviewRate} className="h-2" />
        <p className="text-xs text-muted-foreground pt-1">
          Porcentaje de CVs que logran una primera llamada.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">De Entrevista a Oferta</span>
          <span className="text-muted-foreground">{offers} de {interviews} ({Math.round(offerRate)}%)</span>
        </div>
        <Progress value={offerRate} className="h-2" color="bg-green-500" /> {/* Nota: Progress usa clases de Tailwind */}
        <p className="text-xs text-muted-foreground pt-1">
          Efectividad de tu performance en las entrevistas.
        </p>
      </div>
    </div>
  );
}