import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface DailyBarsProps {
  data: Array<{ date: string; count: number }>;
}

function formatDay(value?: string): string {
  if (!value) return '';

  try {
    return format(parseISO(value), 'd MMM', { locale: es });
  } catch {
    return value;
  }
}

export function DailyBars({ data }: DailyBarsProps) {
  if (data.length === 0) {
    return <p className="text-sm italic text-muted-foreground">Sin datos.</p>;
  }

  const max = Math.max(...data.map((day) => day.count), 1);

  return (
    <div>
      <div
        className="flex h-36 items-end gap-1"
        role="img"
        aria-label="Postulaciones creadas por día"
      >
        {data.map((day) => {
          const height = Math.round((day.count / max) * 100);

          return (
            <div
              key={day.date}
              className="group relative flex h-full flex-1 flex-col justify-end"
            >
              <div
                className="w-full rounded-t bg-primary/70 transition-colors group-hover:bg-primary"
                style={{
                  height: `${Math.max(height, day.count > 0 ? 4 : 0)}%`,
                }}
                title={`${formatDay(day.date)}: ${day.count} postulaciones`}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{formatDay(data[0]?.date)}</span>
        <span>{formatDay(data[data.length - 1]?.date)}</span>
      </div>
    </div>
  );
}
