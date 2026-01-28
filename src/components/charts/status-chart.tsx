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
  Aplicado: 'hsl(var(--chart-3))',
  Entrevista: 'hsl(var(--chart-4))',
  Oferta: 'hsl(var(--chart-2))',
  Rechazado: 'hsl(var(--destructive))',
  Ghosted: 'hsl(var(--muted))',
};

export function StatusChart({ applications }: { applications: Application[] }) {
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
          />
          <Legend />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label={(entry) => entry.value}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || 'hsl(var(--chart-1))'}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
