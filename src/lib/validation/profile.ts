import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'El nombre es requerido.')
    .max(80, 'El nombre es demasiado largo.'),
  lastName: z
    .string()
    .trim()
    .max(80, 'El apellido es demasiado largo.')
    .optional()
    .default(''),
});

export type ProfileValues = z.input<typeof profileSchema>;
export type ProfileOutput = z.output<typeof profileSchema>;

export const passwordUpdateSchema = z.object({
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .max(72, 'La contraseña es demasiado larga.'),
});

export const passwordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres.')
      .max(72, 'La contraseña es demasiado larga.'),
    confirmPassword: z.string().min(1, 'Confirmá la contraseña.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
