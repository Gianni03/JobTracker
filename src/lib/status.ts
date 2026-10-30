import type { ApplicationStatus } from '@/lib/definitions';

export const STATUS_FLOW: ApplicationStatus[] = [
  'Aplicado',
  'Entrevista',
  'Oferta',
];

export const STATUS_OPTIONS: ApplicationStatus[] = [
  'Aplicado',
  'Entrevista',
  'Oferta',
  'Rechazado',
  'Ghosted',
];

export const STATUS_PILL_CLASS: Record<ApplicationStatus, string> = {
  Oferta:
    'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300',
  Entrevista:
    'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300',
  Aplicado:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300',
  Rechazado:
    'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300',
  Ghosted:
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-300',
};

export const STATUS_DOT_CLASS: Record<ApplicationStatus, string> = {
  Oferta: 'bg-green-500',
  Entrevista: 'bg-blue-500',
  Aplicado: 'bg-yellow-500',
  Rechazado: 'bg-red-500',
  Ghosted: 'bg-gray-400',
};

export function getStatusJourney(application: {
  status: ApplicationStatus;
  interviewStage?: string;
  interviewDate?: string;
}): ApplicationStatus[] {
  const { status, interviewStage, interviewDate } = application;

  if (status === 'Rechazado' || status === 'Ghosted') {
    const path: ApplicationStatus[] = ['Aplicado'];
    if (interviewStage || interviewDate) {
      path.push('Entrevista');
    }
    path.push(status);
    return path;
  }

  const index = STATUS_FLOW.indexOf(status);
  return STATUS_FLOW.slice(0, index + 1);
}
