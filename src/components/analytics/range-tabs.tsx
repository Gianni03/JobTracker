import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ANALYTICS_RANGES,
  type AnalyticsRange,
} from '@/lib/analytics/types';

const RANGE_LABELS: Record<AnalyticsRange, string> = {
  7: '7 días',
  28: '28 días',
  90: '90 días',
};

export function AnalyticsRangeTabs({
  current,
}: {
  current: AnalyticsRange;
}) {
  return (
    <div className="inline-flex rounded-xl border bg-muted/40 p-1">
      {ANALYTICS_RANGES.map((range) => (
        <Link
          key={range}
          href={`/analytics?range=${range}`}
          aria-current={current === range ? 'page' : undefined}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            current === range
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {RANGE_LABELS[range]}
        </Link>
      ))}
    </div>
  );
}
