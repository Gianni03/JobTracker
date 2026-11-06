import type {
  Application,
  ApplicationEvent,
  ApplicationEventType,
  ApplicationStatus,
} from '@/lib/definitions';

export type TimelineItem = {
  id: string;
  type: ApplicationEventType;
  title: string;
  description?: string;
  date?: string;
};

function statusTransition(
  fromStatus?: ApplicationStatus,
  toStatus?: ApplicationStatus,
): string | undefined {
  if (fromStatus && toStatus) return `${fromStatus} → ${toStatus}`;
  if (toStatus) return `Estado: ${toStatus}`;
  if (fromStatus) return `Estado anterior: ${fromStatus}`;
  return undefined;
}

function eventToItem(event: ApplicationEvent): TimelineItem {
  if (event.type === 'status_changed') {
    return {
      id: event.id,
      type: event.type,
      title: 'Cambio de estado',
      description:
        statusTransition(event.fromStatus, event.toStatus) ?? event.detail,
      date: event.createdAt,
    };
  }

  if (event.type === 'created') {
    return {
      id: event.id,
      type: event.type,
      title: 'Postulación creada',
      description: event.toStatus
        ? `Estado inicial: ${event.toStatus}`
        : event.detail,
      date: event.createdAt,
    };
  }

  if (event.type === 'interview_scheduled') {
    return {
      id: event.id,
      type: event.type,
      title: 'Entrevista agendada',
      description: event.detail,
      date: event.createdAt,
    };
  }

  if (event.type === 'offer_received') {
    return {
      id: event.id,
      type: event.type,
      title: 'Oferta recibida',
      description: event.detail,
      date: event.createdAt,
    };
  }

  return {
    id: event.id,
    type: event.type,
    title: 'Feedback actualizado',
    description: event.detail,
    date: event.createdAt,
  };
}

function timestamp(value?: string): number {
  if (!value) return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

const TYPE_PRIORITY: Record<ApplicationEventType, number> = {
  status_changed: 5,
  feedback_updated: 4,
  offer_received: 3,
  interview_scheduled: 2,
  created: 1,
};

function sortItems(items: TimelineItem[]): TimelineItem[] {
  return items.sort(
    (a, b) =>
      timestamp(b.date) - timestamp(a.date) ||
      TYPE_PRIORITY[b.type] - TYPE_PRIORITY[a.type],
  );
}

/**
 * Prefer real events. Before the migration is applied (or for applications
 * created earlier), derive a useful timeline from what the application stores.
 */
export function buildTimeline(
  application: Application,
  events: ApplicationEvent[],
): TimelineItem[] {
  if (events.length > 0) {
    return sortItems(events.map(eventToItem));
  }

  const createdDate = application.createdAt ?? application.date;
  const updatedDate = application.updatedAt ?? createdDate;
  const items: TimelineItem[] = [
    {
      id: 'derived-created',
      type: 'created',
      title: 'Postulación creada',
      description: `${application.role} en ${application.company}`,
      date: createdDate,
    },
  ];

  if (application.interviewDate) {
    items.push({
      id: 'derived-interview',
      type: 'interview_scheduled',
      title: 'Entrevista agendada',
      description: application.interviewStage,
      date: application.interviewDate,
    });
  }

  if (application.status === 'Oferta' || application.offerStage) {
    items.push({
      id: 'derived-offer',
      type: 'offer_received',
      title: 'Oferta',
      description: application.offerStage,
      date: updatedDate,
    });
  }

  if (application.feedback) {
    items.push({
      id: 'derived-feedback',
      type: 'feedback_updated',
      title: 'Feedback registrado',
      date: updatedDate,
    });
  }

  if (application.status !== 'Aplicado') {
    items.push({
      id: 'derived-status',
      type: 'status_changed',
      title: `Estado actual: ${application.status}`,
      date: updatedDate,
    });
  }

  return sortItems(items);
}
