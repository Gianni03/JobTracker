'use client';

import { Sankey, ResponsiveContainer, Tooltip, Rectangle } from 'recharts';
import type { Application } from '@/lib/definitions';

const COLORS = [
  '#E07A5F', // 0: Total (Coral)
  '#81B29A', // 1: En Revisión (Sage Green - Active)
  '#F2CC8F', // 2: Descartes Iniciales (Sand)
  '#3D405B', // 3: Avanzaron (Indigo)
  '#5F79E0', // 4: Entrevistas en Curso (Blue - Active)
  '#F28482', // 5: Fallidas (Rose Red)
  '#4CAF50', // 6: Ofertas (Green)
];

const sankeyData = (applications: Application[]) => {
  const total = applications.length;
  if (total === 0) return { nodes: [], links: [] };

  // --- CATEGORIZACIÓN NIVEL 1 -> NIVEL 2 ---

  // 1. En Revisión: Estado 'Aplicado' y sin datos de entrevista
  const inReviewManual = applications.filter(
    (app) =>
      app.status === 'Aplicado' && !app.interviewStage && !app.interviewDate,
  ).length;

  // 2. Avanzaron: Todo lo que llegó a entrevista o es oferta
  const reachedInterview = applications.filter(
    (app) =>
      ['Entrevista', 'Oferta'].includes(app.status) ||
      (app.status === 'Rechazado' && (app.interviewStage || app.interviewDate)),
  );
  const reachedInterviewCount = reachedInterview.length;

  // 3. Descartes Iniciales: Rechazo/Ghosted sin haber avanzado a entrevista
  const initialDrops = applications.filter(
    (app) =>
      (app.status === 'Rechazado' || app.status === 'Ghosted') &&
      !(app.interviewStage || app.interviewDate),
  ).length;

  // --- CATEGORIZACIÓN NIVEL 2 (Avanzaron) -> NIVEL 3 ---

  // 4. Entrevistas en Curso: Estado 'Entrevista'
  const activeInterviews = reachedInterview.filter(
    (app) => app.status === 'Entrevista',
  ).length;

  // 5. Fallidas: Estado 'Rechazado' habiendo tenido entrevista
  const failedInterviews = reachedInterview.filter(
    (app) => app.status === 'Rechazado',
  ).length;

  // 6. Ofertas: Estado 'Oferta'
  const successOffers = reachedInterview.filter(
    (app) => app.status === 'Oferta',
  ).length;

  const nodes = [
    { name: 'Total Postulaciones' }, // 0
    { name: 'En Revisión (Applied)' }, // 1
    { name: 'Descarte Inicial' }, // 2
    { name: 'Llegaron a Entrevista' }, // 3
    { name: 'Entrevistas en Curso' }, // 4
    { name: 'Falló la Entrevista' }, // 5
    { name: 'Ofertas Logradas' }, // 6
  ];

  const links = [
    // Flujos desde el Total
    { source: 0, target: 1, value: inReviewManual },
    { source: 0, target: 2, value: initialDrops },
    { source: 0, target: 3, value: reachedInterviewCount },

    // Flujos desde "Llegaron a Entrevista"
    { source: 3, target: 4, value: activeInterviews },
    { source: 3, target: 5, value: failedInterviews },
    { source: 3, target: 6, value: successOffers },
  ].filter((link) => link.value > 0);

  return { nodes, links };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomSankeyNode = ({ x, y, width, height, index, payload }: any) => {
  const isLeft = x < 200;
  const isRight = x > 600;

  let textAnchor = 'middle';
  let textX = x + width / 2;

  if (isLeft) {
    textAnchor = 'start';
    textX = x + width + 12;
  } else if (isRight) {
    textAnchor = 'end';
    textX = x - 12;
  }

  return (
    <g>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={COLORS[index % COLORS.length]}
        stroke="hsl(var(--background))"
        strokeWidth={1}
        radius={4}
      />
      <text
        x={textX}
        y={y + height / 2}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        className="fill-foreground text-[10px] md:text-[11px] font-bold"
      >
        {payload.name} ({payload.value})
      </text>
    </g>
  );
};

export function SankeyChart({ applications }: { applications: Application[] }) {
  const data = sankeyData(applications);

  if (data.links.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <p className="text-muted-foreground italic text-sm text-center px-6">
          Registra algunas aplicaciones y entrevistas para ver tu flujo de
          conversión detallado.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[450px] w-full pt-8 pr-12 pl-12 md:pr-32 md:pl-32">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          nodePadding={50}
          node={<CustomSankeyNode />}
          margin={{
            left: 0,
            right: 0,
            top: 40,
            bottom: 40,
          }}
          link={{
            stroke: 'hsl(var(--primary))',
            strokeOpacity: 0.08,
          }}
        >
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '16px',
              fontSize: '11px',
              boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
