import type {
  Application,
  ApplicationCurrency,
  ApplicationSalaryFrequency,
} from '@/lib/definitions';

export type ImportedJob = {
  company?: string;
  role?: string;
  platform: Application['platform'];
  link: string;
  description?: string;
  salary?: {
    desired?: number;
    desiredMax?: number;
    currency?: ApplicationCurrency;
    frequency?: ApplicationSalaryFrequency;
  };
};

export type JobImportActionResult =
  | { success: true; job: ImportedJob }
  | { success: false; error: string };

export const JOB_IMPORT_LIMITS = {
  maxUrlLength: 2048,
  maxResponseBytes: 1_500_000,
  timeoutMs: 5_000,
  maxRedirects: 3,
} as const;

export const SUPPORTED_SALARY_CURRENCIES = new Set<ApplicationCurrency>([
  'ARS',
  'USD',
  'EUR',
  'GBP',
  'BRL',
  'MXN',
  'COP',
  'CLP',
]);

export const JOB_BOARD_HOSTS = [
  'linkedin.com',
  'indeed.com',
  'glassdoor.com',
  'getonboard.com',
  'computrabajo.com',
  'remoteok.com',
  'wellfound.com',
  'bumeran.com',
  'zonajobs.com',
  'infojobs.net',
  'infoempleo.com',
  'trabajando.com',
  'monster.com',
  'careerjet.com',
  'jooble.org',
  'talent.com',
  'simplyhired.com',
  'empleos.cl',
] as const;

export const JOB_BOARD_NAME_KEYWORDS = [
  'linkedin',
  'indeed',
  'glassdoor',
  'getonboard',
  'computrabajo',
  'remoteok',
  'wellfound',
  'bumeran',
  'zonajobs',
  'infojobs',
  'infoempleo',
  'trabajando',
  'monster',
  'careerjet',
  'jooble',
  'simplyhired',
] as const;
