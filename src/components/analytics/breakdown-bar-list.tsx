interface BreakdownItem {
  label: string;
  count: number;
}

interface BreakdownBarListProps {
  items: BreakdownItem[];
  total: number;
  emptyLabel?: string;
}

export function BreakdownBarList({
  items,
  total,
  emptyLabel = 'Sin datos en este rango.',
}: BreakdownBarListProps) {
  if (items.length === 0) {
    return <p className="text-sm italic text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percentage =
          total > 0 ? Math.round((item.count / total) * 100) : 0;

        return (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className="text-xs tabular-nums text-muted-foreground">
                {item.count} · {percentage}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
