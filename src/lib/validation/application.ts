import { z } from 'zod';
import type {
  ApplicationCurrency,
  ApplicationSalaryFrequency,
  ApplicationStatus,
} from '@/lib/definitions';

export const APPLICATION_STATUSES = [
  'Aplicado',
  'Entrevista',
  'Oferta',
  'Rechazado',
  'Ghosted',
] as const satisfies readonly ApplicationStatus[];

export const APPLICATION_PLATFORMS = [
  'LinkedIn',
  'Web de la Empresa',
  'Referido',
  'Indeed',
  'Portal de empleo',
  'Otro',
] as const;

export const APPLICATION_CURRENCIES = [
  'ARS',
  'USD',
  'EUR',
  'GBP',
  'BRL',
  'MXN',
  'COP',
  'CLP',
] as const satisfies readonly ApplicationCurrency[];

export const SALARY_FREQUENCIES = [
  'hour',
  'month',
  'year',
] as const satisfies readonly ApplicationSalaryFrequency[];

const optionalAmount = z.preprocess(
  (value) =>
    value === '' || value === null || value === undefined ? null : value,
  z.coerce.number().min(0, 'El salario no puede ser negativo.').nullable(),
);

const optionalText = (max: number, message: string) =>
  z.string().max(max, message).optional();

export const applicationFormSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, 'El nombre de la empresa es requerido.')
    .max(200, 'El nombre de la empresa es demasiado largo.'),
  role: z
    .string()
    .trim()
    .min(1, 'El puesto es requerido.')
    .max(200, 'El puesto es demasiado largo.'),
  status: z.enum(APPLICATION_STATUSES, {
    error: 'Seleccioná un estado válido.',
  }),
  interviewStage: optionalText(120, 'La etapa es demasiado larga.'),
  offerStage: optionalText(120, 'La etapa es demasiado larga.'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Usá una fecha válida (YYYY-MM-DD).'),
  interviewDate: z.string().nullable().optional(),
  platform: z.enum(APPLICATION_PLATFORMS, {
    error: 'Seleccioná una plataforma válida.',
  }),
  link: z
    .string()
    .trim()
    .url('Debe ser una URL válida.')
    .or(z.literal(''))
    .optional(),
  contact: z
    .object({
      name: optionalText(200, 'El nombre de contacto es demasiado largo.'),
      method: optionalText(300, 'El método de contacto es demasiado largo.'),
    })
    .optional(),
  description: optionalText(
    10000,
    'La descripción no puede superar los 10000 caracteres.',
  ),
  salary: z
    .object({
      desired: optionalAmount,
      desiredMax: optionalAmount,
      expressed: optionalAmount,
      expressedMax: optionalAmount,
      offer: optionalAmount,
      currency: z.enum(APPLICATION_CURRENCIES).optional(),
      frequency: z.enum(SALARY_FREQUENCIES).optional(),
    })
    .optional(),
  notes: z
    .object({
      general: optionalText(
        10000,
        'Las notas no pueden superar los 10000 caracteres.',
      ),
      interview: optionalText(
        10000,
        'Las notas no pueden superar los 10000 caracteres.',
      ),
    })
    .optional(),
  feedback: optionalText(
    10000,
    'El feedback no puede superar los 10000 caracteres.',
  ),
});

export type ApplicationFormInput = z.input<typeof applicationFormSchema>;
export type ApplicationFormValues = z.output<typeof applicationFormSchema>;

export const applicationIdSchema = z.string().min(1).max(64);

export const applicationIdsSchema = z
  .array(applicationIdSchema)
  .min(1, 'Seleccioná al menos una postulación.')
  .max(500, 'No puedes modificar más de 500 postulaciones a la vez.');
