import type { LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const ACCENTS = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  muted: 'bg-muted text-muted-foreground',
} as const;

interface MetricCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  accent?: keyof typeof ACCENTS;
}

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = 'primary',
}: MetricCardProps) {
  return (
    <Card className="rounded-2xl border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </CardTitle>
        <span className={cn('rounded-xl p-2', ACCENTS[accent])}>
          <Icon className="h-4 w-4" />
        </span>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {hint ? (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
