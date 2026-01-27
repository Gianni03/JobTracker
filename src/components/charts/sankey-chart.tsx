import { Sankey, ResponsiveContainer, Tooltip, Rectangle } from 'recharts';
import type { Application } from '@/lib/definitions';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const sankeyData = (applications: Application[]) => {
  const totalApplications = applications.length;
  const interviews = applications.filter(
    (app) =>
      ['Entrevista', 'Oferta'].includes(app.status) ||
      (app.status === 'Rechazado' && (app.interviewStage || app.interviewDate))
  ).length;
  const offers = applications.filter((app) => app.status === 'Oferta').length;

  const dropBeforeInterview = totalApplications - interviews;
  const dropAfterInterview = interviews - offers;

  const nodes = [
    { name: 'Postulaciones' },
    { name: 'Entrevistas' },
    { name: 'Ofertas' },
    { name: 'Descartado' },
  ];

  const links = [
    { source: 0, target: 1, value: interviews },
    { source: 1, target: 2, value: offers },
    { source: 0, target: 3, value: dropBeforeInterview },
    { source: 1, target: 3, value: dropAfterInterview },
  ].filter((link) => link.value > 0);

  return { nodes, links };
};

const CustomSankeyNode = ({ x, y, width, height, index, payload }: any) => {
  if (!payload.value) return null;
  return (
    <g transform={`translate(${x},${y})`}>
      <Rectangle
        width={width}
        height={height}
        fill={COLORS[index % COLORS.length]}
        stroke="hsl(var(--background))"
        strokeWidth={2}
        radius={4}
      />
      <text
        x={width / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-primary-foreground font-semibold"
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
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">
          No hay suficientes datos para mostrar el diagrama de flujo.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          node={<CustomSankeyNode />}
          nodePadding={50}
          margin={{
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          }}
          link={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.4 }}
        >
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
