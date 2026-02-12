'use client';

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { Application } from '@/lib/definitions';
import { format } from 'date-fns';

export function MonthlyChart({
  applications,
}: {
  applications: Application[];
}) {
  const monthlyCounts = applications.reduce(
    (acc, app) => {
      const month = format(new Date(app.date + 'T00:00:00'), 'MMM');
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const allMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentMonthIndex = new Date().getMonth();
  const sortedMonths = allMonths
    .slice(currentMonthIndex + 1)
    .concat(allMonths.slice(0, currentMonthIndex + 1));

  const chartData = sortedMonths
    .map((month) => ({
      name: month,
      Postulaciones: monthlyCounts[month] || 0,
    }))
    .slice(-6); // Show last 6 months

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E07A5F" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#E07A5F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
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
            verticalAlign="top"
            align="right"
            height={36}
            formatter={(value) => (
              <span className="text-xs font-medium text-muted-foreground">
                {value}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="Postulaciones"
            stroke="#E07A5F"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPost)"
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
