'use client';

import { Progress } from '@/components/ui/progress';
import type { Application } from '@/lib/definitions';

const ADVANCED_STAGES = [
  'Técnica',
  'Live coding',
  'Team',
  'Manager/Leader',
  'Offer',
];

export function ConversionRates({
  applications,
}: {
  applications: Application[];
}) {
  const total = applications.length;

  // Consideramos entrevista si el estado es Entrevista, Oferta o Rechazado (si pasó por entrevista)
  const interviews = applications.filter(
    (a) =>
      ['Entrevista', 'Oferta'].includes(a.status) ||
      (a.status === 'Rechazado' && a.interviewStage),
  ).length;

  const offers = applications.filter((a) => a.status === 'Oferta').length;

  // Nuevas métricas: Avance dentro de la etapa de entrevista
  const reachedTechnical = applications.filter(
    (a) =>
      ADVANCED_STAGES.includes(a.interviewStage || '') || a.status === 'Oferta',
  ).length;

  // Tasas
  const interviewRate = total > 0 ? (interviews / total) * 100 : 0;
  const technicalRate =
    interviews > 0 ? (reachedTechnical / interviews) * 100 : 0;
  const offerRate = interviews > 0 ? (offers / interviews) * 100 : 0;

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-foreground">
            De Aplicación a Entrevista
          </span>
          <span className="text-muted-foreground font-medium">
            {interviews} de {total} ({Math.round(interviewRate)}%)
          </span>
        </div>
        <Progress value={interviewRate} className="h-2.5 bg-muted" />
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          Porcentaje de CVs que logran romper el hielo y obtener una primera
          llamada.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-foreground">
            Avance Técnico / Profundo
          </span>
          <span className="text-muted-foreground font-medium">
            {reachedTechnical} de {interviews} ({Math.round(technicalRate)}%)
          </span>
        </div>
        <Progress value={technicalRate} className="h-2.5 bg-muted" />
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          ¿Estás superando las etapas iniciales (Recruiter/Screening)? Mide tu
          progreso hacia etapas finales.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-foreground">
            De Entrevista a Oferta
          </span>
          <span className="text-muted-foreground font-medium">
            {offers} de {interviews} ({Math.round(offerRate)}%)
          </span>
        </div>
        <Progress value={offerRate} className="h-2.5 bg-muted" />
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          Tu tasa de cierre. Refleja qué tan efectivo eres cuando llegas al
          final del proceso.
        </p>
      </div>
    </div>
  );
}
