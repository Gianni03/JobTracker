import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  CalendarDays,
  CheckCircle2,
  MessageSquareQuote,
  PlusCircle,
  Trophy,
} from 'lucide-react';
import type {
  Application,
  ApplicationEvent,
  ApplicationEventType,
} from '@/lib/definitions';
import { buildTimeline } from '@/lib/timeline';

const ICONS: Record<ApplicationEventType, typeof PlusCircle> = {
  created: PlusCircle,
  status_changed: CheckCircle2,
  interview_scheduled: CalendarDays,
  offer_received: Trophy,
  feedback_updated: MessageSquareQuote,
};

function formatTimelineDate(value?: string): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  return format(date, dateOnly ? 'd MMM yyyy' : 'd MMM yyyy, HH:mm', {
    locale: es,
  });
}

interface ApplicationTimelineProps {
  application: Application;
  events: ApplicationEvent[];
}

export function ApplicationTimeline({
  application,
  events,
}: ApplicationTimelineProps) {
  const items = buildTimeline(application, events);

  return (
    <ol className="relative space-y-5 border-l border-border pl-5">
      {items.map((item) => {
        const Icon = ICONS[item.type];
        const dateLabel = formatTimelineDate(item.date);

        return (
          <li key={item.id} className="relative">
            <span className="absolute -left-[29px] flex h-4 w-4 items-center justify-center rounded-full border bg-background">
              <Icon className="h-2.5 w-2.5 text-primary" />
            </span>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">
                {item.title}
              </p>
              {item.description && (
                <p className="break-words text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
              {dateLabel && (
                <p
                  className="text-xs text-muted-foreground"
                  suppressHydrationWarning
                >
                  {dateLabel}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
