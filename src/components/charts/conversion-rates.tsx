import { Progress } from '@/components/ui/progress';
import type { Application } from '@/lib/definitions';

export function ConversionRates({
  applications,
}: {
  applications: Application[];
}) {
  const applied = applications.length;
  const interviews = applications.filter((app) =>
    ['Entrevista', 'Oferta'].includes(app.status)
  ).length;
  const offers = applications.filter((app) => app.status === 'Oferta').length;

  const appliedToInterviewRate = applied > 0 ? (interviews / applied) * 100 : 0;
  const interviewToOfferRate = interviews > 0 ? (offers / interviews) * 100 : 0;
  const successRate = applied > 0 ? (offers / applied) * 100 : 0;

  return (
    <div className="space-y-6">
      <RateItem title="Aplicado → Entrevista" value={appliedToInterviewRate} />
      <RateItem title="Entrevista → Oferta" value={interviewToOfferRate} />
      <RateItem title="Tasa de Éxito General" value={successRate} />
    </div>
  );
}

function RateItem({ title, value }: { title: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-sm font-bold text-foreground">
          {value.toFixed(1)}%
        </span>
      </div>
      <Progress value={value} />
    </div>
  );
}
