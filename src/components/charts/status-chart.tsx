'use client';

import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import type { Application } from '@/lib/definitions';

const COLORS: { [key: string]: string } = {
  Aplicado: '#E07A5F', // Coral
  Entrevista: '#3D405B', // Indigo
  Oferta: '#81B29A', // Sage Green
  Rechazado: '#F28482', // Rose Red
  Ghosted: '#F2CC8F', // Sand
};

export function StatusChart({ applications }: { applications: Application[] }) {
  const statusCounts = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-xs font-medium text-muted-foreground">
                {value}
              </span>
            )}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            fill="#8884d8"
            label={({ value }) => `${value}`}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || 'hsl(var(--chart-1))'}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
