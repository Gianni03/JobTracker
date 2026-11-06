import { describe, expect, it } from 'vitest';
import { getStatusJourney } from '@/lib/status';

describe('getStatusJourney', () => {
  it('walks the happy path up to the current status', () => {
    expect(getStatusJourney({ status: 'Aplicado' })).toEqual(['Aplicado']);
    expect(getStatusJourney({ status: 'Entrevista' })).toEqual([
      'Aplicado',
      'Entrevista',
    ]);
    expect(getStatusJourney({ status: 'Oferta' })).toEqual([
      'Aplicado',
      'Entrevista',
      'Oferta',
    ]);
  });

  it('includes the interview step when a rejection had an interview', () => {
    expect(
      getStatusJourney({ status: 'Rechazado', interviewStage: 'Técnica' }),
    ).toEqual(['Aplicado', 'Entrevista', 'Rechazado']);
  });

  it('does not invent an interview step for a plain rejection', () => {
    expect(getStatusJourney({ status: 'Rechazado' })).toEqual([
      'Aplicado',
      'Rechazado',
    ]);
  });

  it('uses the interview date as evidence of an interview', () => {
    expect(
      getStatusJourney({
        status: 'Ghosted',
        interviewDate: '2026-10-01T10:00:00.000Z',
      }),
    ).toEqual(['Aplicado', 'Entrevista', 'Ghosted']);
  });
});
