import { describe, expect, it } from 'vitest';
import type { Application, ApplicationEvent } from '@/lib/definitions';
import { buildTimeline } from '@/lib/timeline';

const application: Application = {
  id: 'app-1',
  company: 'Acme',
  role: 'Engineer',
  status: 'Entrevista',
  date: '2026-10-01',
  platform: 'LinkedIn',
  link: '',
  salary: {},
  contact: {},
  description: '',
  createdAt: '2026-10-01T10:00:00.000Z',
  updatedAt: '2026-10-10T10:00:00.000Z',
};

describe('buildTimeline', () => {
  it('maps real events newest first', () => {
    const events: ApplicationEvent[] = [
      {
        id: 'e1',
        applicationId: 'app-1',
        type: 'created',
        toStatus: 'Aplicado',
        createdAt: '2026-10-01T10:00:00.000Z',
      },
      {
        id: 'e2',
        applicationId: 'app-1',
        type: 'status_changed',
        fromStatus: 'Aplicado',
        toStatus: 'Entrevista',
        createdAt: '2026-10-05T10:00:00.000Z',
      },
      {
        id: 'e3',
        applicationId: 'app-1',
        type: 'feedback_updated',
        createdAt: '2026-10-07T10:00:00.000Z',
      },
    ];

    const timeline = buildTimeline(application, events);

    expect(timeline.map((item) => item.id)).toEqual(['e3', 'e2', 'e1']);
    expect(timeline[1].description).toBe('Aplicado → Entrevista');
  });

  it('derives a fallback timeline when no events exist', () => {
    const timeline = buildTimeline(
      {
        ...application,
        status: 'Oferta',
        offerStage: 'Aceptada',
        interviewDate: '2026-10-04T14:00:00.000Z',
        interviewStage: 'Técnica',
        feedback: 'Good feedback',
      },
      [],
    );

    expect(timeline.map((item) => item.type)).toEqual([
      'status_changed',
      'feedback_updated',
      'offer_received',
      'interview_scheduled',
      'created',
    ]);
    expect(timeline.find((item) => item.type === 'interview_scheduled')?.description).toBe(
      'Técnica',
    );
  });

  it('always includes the creation date', () => {
    const timeline = buildTimeline(
      { ...application, status: 'Aplicado', createdAt: undefined },
      [],
    );

    expect(timeline.at(-1)).toMatchObject({
      type: 'created',
      date: '2026-10-01',
    });
  });
});
