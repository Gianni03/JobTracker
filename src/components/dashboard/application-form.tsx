'use client';

import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Application } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { createApplication, updateApplication } from '@/lib/actions';
import { useTransition, useEffect } from 'react';

const formSchema = z.object({
  company: z.string().min(1, 'El nombre de la empresa es requerido.'),
  role: z.string().min(1, 'El puesto es requerido.'),
  status: z.enum(['Aplicado', 'Entrevista', 'Oferta', 'Rechazado', 'Ghosted']),
  interviewStage: z.string().optional(),
  offerStage: z.string().optional(),
  date: z.string().min(1, 'La fecha es requerida.'),
  interviewDate: z.string().optional(),
  platform: z.enum([
    'LinkedIn',
    'Web de la Empresa',
    'Referido',
    'Indeed',
    'Otro',
  ]),
  link: z.string().url('Debe ser una URL válida.').or(z.literal('')).optional(),
  contact: z
    .object({
      name: z.string().optional(),
      method: z.string().optional(),
    })
    .optional(),
  description: z.string().optional(),
  salary: z.object({
    desired: z.coerce.number().min(0, 'El salario debe ser positivo.'),
    expressed: z.coerce.number().min(0).optional(),
    offer: z.coerce.number().min(0).optional(),
  }),
  notes: z
    .object({
      general: z.string().optional(),
      interview: z.string().optional(),
    })
    .optional(),
  feedback: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  application?: Application;
  redirectTo?: string;
}

export function ApplicationForm({ application, redirectTo = '/dashboard/applications' }: ApplicationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      company: application?.company || '',
      role: application?.role || '',
      status: application?.status || 'Aplicado',
      interviewStage: application?.interviewStage || '',
      offerStage: application?.offerStage || '',
      date: application?.date
        ? new Date(application.date + 'T00:00:00').toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      interviewDate: application?.interviewDate
        ? new Date(application.interviewDate).toISOString().slice(0, 16)
        : '',
      platform: application?.platform || 'LinkedIn',
      link: application?.link || '',
      contact: {
        name: application?.contact?.name || '',
        method: application?.contact?.method || '',
      },
      description: application?.description || '',
      salary: {
        desired: application?.salary?.desired || 0,
        expressed: application?.salary?.expressed || 0,
        offer: application?.salary?.offer || 0,
      },
      notes: {
        general: application?.notes?.general || '',
        interview: application?.notes?.interview || '',
      },
      feedback: application?.feedback || '',
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;

  const status = watch('status');

  // Set default values when status changes
  useEffect(() => {
    if (status === 'Entrevista' && !form.getValues('interviewStage')) {
      form.setValue('interviewStage', 'Recruiter');
    }
    if (status === 'Oferta' && !form.getValues('offerStage')) {
      form.setValue('offerStage', 'Analisis');
    }
  }, [status, form]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    startTransition(async () => {
      try {
        if (application) {
          await updateApplication(application.id, data);
        } else {
          await createApplication(data);
        }
        router.push(redirectTo);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="company">Empresa *</Label>
            <Input
              id="company"
              {...register('company')}
              placeholder="Ej: Google"
            />
            {errors.company && (
              <p className="text-destructive text-sm mt-1">
                {errors.company.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="role">Puesto *</Label>
            <Input
              id="role"
              {...register('role')}
              placeholder="Ej: Senior Developer"
            />
            {errors.role && (
              <p className="text-destructive text-sm mt-1">
                {errors.role.message}
              </p>
            )}
          </div>
          <div>
            <Label>Estado *</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aplicado">Aplicado</SelectItem>
                    <SelectItem value="Entrevista">Entrevista</SelectItem>
                    <SelectItem value="Oferta">Oferta</SelectItem>
                    <SelectItem value="Rechazado">Rechazado</SelectItem>
                    <SelectItem value="Ghosted">Ghosted</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {status === 'Entrevista' && (
            <>
              <div>
                <Label htmlFor="interviewStage">Etapa de Entrevista</Label>
                <Controller
                  control={control}
                  name="interviewStage"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una etapa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Recruiter">Recruiter</SelectItem>
                        <SelectItem value="Screening">Screening</SelectItem>
                        <SelectItem value="Cultural fit">Cultural fit</SelectItem>
                        <SelectItem value="Técnica">Técnica</SelectItem>
                        <SelectItem value="Live coding">Live coding</SelectItem>
                        <SelectItem value="Team">Team</SelectItem>
                        <SelectItem value="Manager/Leader">Manager/Leader</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </>
          )}
          {status === 'Oferta' && (
            <>
              <div>
                <Label htmlFor="offerStage">Etapa de Oferta</Label>
                <Controller
                  control={control}
                  name="offerStage"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una etapa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Analisis">Analisis</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Aceptada">Aceptada</SelectItem>
                        <SelectItem value="Rechazada">Rechazada</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="date">Fecha de Aplicación *</Label>
            <Input id="date" type="date" {...register('date')} />
            {errors.date && (
              <p className="text-destructive text-sm mt-1">
                {errors.date.message}
              </p>
            )}
          </div>
          {status === 'Entrevista' && (
            <div>
              <Label htmlFor="interviewDate">Fecha de Entrevista</Label>
              <Input
                id="interviewDate"
                type="datetime-local"
                {...register('interviewDate')}
              />
            </div>
          )}
          <div>
            <Label>Plataforma</Label>
            <Controller
              control={control}
              name="platform"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Web de la Empresa">
                      Web de la Empresa
                    </SelectItem>
                    <SelectItem value="Referido">Referido</SelectItem>
                    <SelectItem value="Indeed">Indeed</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="link">Link a la Oferta</Label>
            <Input
              id="link"
              type="url"
              {...register('link')}
              placeholder="https://..."
            />
            {errors.link && (
              <p className="text-destructive text-sm mt-1">
                {errors.link.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="contact.name">Contact Person</Label>
            <Input
              id="contact.name"
              {...register('contact.name')}
              placeholder="Nombre del reclutador"
            />
          </div>
          <div>
            <Label htmlFor="contact.method">Reach Method</Label>
            <Input
              id="contact.method"
              {...register('contact.method')}
              placeholder="LinkedIn URL o email"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Descripción del Puesto</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="description"
            {...register('description')}
            rows={6}
            placeholder="Copia aquí la descripción del puesto..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Salarial</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Label htmlFor="salary.desired">Sueldo Pretendido</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="salary.desired"
                type="number"
                {...register('salary.desired')}
                className="pl-7"
                placeholder="120000"
              />
            </div>
            {errors.salary?.desired && (
              <p className="text-destructive text-sm mt-1">
                {errors.salary.desired.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="salary.expressed">Sueldo Expresado</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="salary.expressed"
                type="number"
                {...register('salary.expressed')}
                className="pl-7"
                placeholder="115000"
              />
            </div>
          </div>
          {status === 'Oferta' && (
            <div>
              <Label htmlFor="salary.offer">Sueldo de Oferta</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="salary.offer"
                  type="number"
                  {...register('salary.offer')}
                  className="pl-7"
                  placeholder="125000"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notas y Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="notes.general">Notas Generales</Label>
            <Textarea
              id="notes.general"
              {...register('notes.general')}
              rows={4}
              placeholder="Agrega notas sobre esta postulación..."
            />
          </div>
          {status === 'Entrevista' && (
            <div>
              <Label htmlFor="notes.interview">Notas de Entrevista</Label>
              <Textarea
                id="notes.interview"
                {...register('notes.interview')}
                rows={4}
                placeholder="Preguntas realizadas, impresiones, próximos pasos..."
              />
            </div>
          )}
          <div>
            <Label htmlFor="feedback">Feedback Recibido</Label>
            <Textarea
              id="feedback"
              {...register('feedback')}
              rows={4}
              placeholder="Comentarios del reclutador o empresa..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? 'Guardando...'
            : application
            ? 'Guardar Cambios'
            : 'Crear Postulación'}
        </Button>
      </div>
    </form>
  );
}
