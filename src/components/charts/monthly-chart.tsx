"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { applications } from "@/lib/data"
import { format } from 'date-fns'

const monthlyCounts = applications.reduce((acc, app) => {
    const month = format(new Date(app.date + "T00:00:00"), 'MMM');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
}, {} as Record<string, number>);


const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentMonthIndex = new Date().getMonth();

const sortedMonths = allMonths.slice(currentMonthIndex + 1).concat(allMonths.slice(0, currentMonthIndex + 1));

const chartData = sortedMonths.map(month => ({
    name: month,
    Postulaciones: monthlyCounts[month] || 0,
})).slice(-6); // Show last 6 months


export function MonthlyChart() {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
          <Tooltip contentStyle={{
              background: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}/>
          <Legend />
          <Line type="monotone" dataKey="Postulaciones" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
