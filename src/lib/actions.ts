'use server';

import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { ApplicationStatus } from '@/lib/definitions';
import { getRequestOrigin } from '@/lib/auth-url';
import { recordApplicationEvent } from '@/lib/events';
import {
  APPLICATION_STATUSES,
  applicationFormSchema,
  applicationIdSchema,
  type ApplicationFormValues,
} from '@/lib/validation/application';

function parseApplicationInput(input: unknown): ApplicationFormValues {
  const parsed = applicationFormSchema.safeParse(input);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Datos inválidos';
    throw new Error(message);
  }

  return parsed.data;
}

function parseApplicationId(id: string): string {
  const parsed = applicationIdSchema.safeParse(id);

  if (!parsed.success) {
    throw new Error('Postulación no válida');
  }

  return parsed.data;
}

export async function createApplication(input: unknown) {
  const data = parseApplicationInput(input);
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error('No estás autenticado');

  // 1. Validar límite de campañas (Solo en Create)
  const { count } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (count !== null && count >= 1000) {
    throw new Error(
      'Has alcanzado el límite de 1000 postulaciones. Por favor, contacta a soporte para aumentar tu plan.'
    );
  }

  // Limpiamos los datos: si es un string vacío, mandamos null
  // Y truncamos textos largos por seguridad extra (aunque el cliente ya valida)
  const cleanData = {
    user_id: user.id,
    company: data.company,
    role: data.role,
    status: data.status,
    date: data.date || new Date().toISOString().split('T')[0],
    platform: data.platform,
    link: data.link || null,
    description: data.description ? data.description.slice(0, 10000) : null,
    interview_stage: data.interviewStage || null,
    offer_stage: data.offerStage || null,
    interview_date: data.interviewDate || null,
    salary_desired: data.salary?.desired || null,
    salary_desired_max: data.salary?.desiredMax || null,
    salary_expressed: data.salary?.expressed || null,
    salary_expressed_max: data.salary?.expressedMax || null,
    salary_offer: data.salary?.offer || null,
    salary_currency: data.salary?.currency || 'USD',
    salary_frequency: data.salary?.frequency || 'year',
    contact_name: data.contact?.name || null,
    contact_method: data.contact?.method || null,
    notes_general: data.notes?.general
      ? data.notes.general.slice(0, 10000)
      : null,
    notes_interview: data.notes?.interview
      ? data.notes.interview.slice(0, 10000)
      : null,
    feedback: data.feedback ? data.feedback.slice(0, 10000) : null,
  };

  const { data: inserted, error } = await supabase
    .from('applications')
    .insert([cleanData])
    .select('id')
    .single();

  if (error) {
    console.error('DETALLE ERROR SUPABASE:', error); // Esto lo verás en tu TERMINAL
    throw new Error(error.message);
  }

  if (inserted) {
    await recordApplicationEvent(supabase, user.id, {
      applicationId: inserted.id,
      type: 'created',
      toStatus: data.status,
    });
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  return { success: true };
}

export async function updateApplication(id: string, input: unknown) {
  const applicationId = parseApplicationId(id);
  const data = parseApplicationInput(input);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No autorizado');

  const { data: current } = await supabase
    .from('applications')
    .select('status')
    .eq('id', applicationId)
    .eq('user_id', user.id)
    .single();

  const { error } = await supabase
    .from('applications')
    .update({
      company: data.company,
      role: data.role,
      status: data.status,
      date: data.date,
      platform: data.platform,
      link: data.link || null,
      description: data.description ? data.description.slice(0, 10000) : null,
      interview_stage: data.interviewStage || null,
      offer_stage: data.offerStage || null,
      interview_date: data.interviewDate || null,
      salary_desired: data.salary?.desired || null,
      salary_desired_max: data.salary?.desiredMax || null,
      salary_expressed: data.salary?.expressed || null,
      salary_expressed_max: data.salary?.expressedMax || null,
      salary_offer: data.salary?.offer || null,
      salary_currency: data.salary?.currency || 'USD',
      salary_frequency: data.salary?.frequency || 'year',
      contact_name: data.contact?.name || null,
      contact_method: data.contact?.method || null,
      notes_general: data.notes?.general
        ? data.notes.general.slice(0, 10000)
        : null,
      notes_interview: data.notes?.interview
        ? data.notes.interview.slice(0, 10000)
        : null,
      feedback: data.feedback ? data.feedback.slice(0, 10000) : null,
    })
    .eq('id', applicationId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error en update:', error);
    throw error;
  }

  if (current && current.status !== data.status) {
    await recordApplicationEvent(supabase, user.id, {
      applicationId,
      type: 'status_changed',
      fromStatus: current.status as ApplicationStatus,
      toStatus: data.status,
    });
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  revalidatePath(`/dashboard/applications/${applicationId}`);

  return { success: true };
}

export async function changeApplicationStatus(
  id: string,
  nextStatus: ApplicationStatus,
) {
  const applicationId = parseApplicationId(id);
  const statusResult = z.enum(APPLICATION_STATUSES).safeParse(nextStatus);

  if (!statusResult.success) {
    throw new Error('Estado no válido');
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No autorizado');

  const { data: current, error: fetchError } = await supabase
    .from('applications')
    .select('status, interview_stage, offer_stage')
    .eq('id', applicationId)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !current) {
    throw new Error('No se encontró la postulación');
  }

  const currentStatus = current.status as ApplicationStatus;

  if (currentStatus === nextStatus) {
    throw new Error('La postulación ya está en ese estado');
  }

  const update: Record<string, string> = { status: nextStatus };

  if (
    !current.interview_stage &&
    (nextStatus === 'Entrevista' || currentStatus === 'Entrevista')
  ) {
    update.interview_stage = 'Recruiter';
  }

  if (nextStatus === 'Oferta' && !current.offer_stage) {
    update.offer_stage = 'Analisis';
  }

  const { error } = await supabase
    .from('applications')
    .update(update)
    .eq('id', applicationId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error al cambiar el estado:', error);
    throw new Error(error.message);
  }

  await recordApplicationEvent(supabase, user.id, {
    applicationId,
    type: 'status_changed',
    fromStatus: currentStatus,
    toStatus: nextStatus,
  });

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  revalidatePath(`/dashboard/applications/${applicationId}`);
  revalidatePath(`/dashboard/applications/${applicationId}/edit`);

  return { success: true, status: nextStatus };
}

export async function updateApplicationFeedback(id: string, feedback: string) {
  const applicationId = parseApplicationId(id);
  const feedbackResult = z
    .string()
    .max(10000, 'El feedback no puede superar los 10000 caracteres.')
    .safeParse(feedback);

  if (!feedbackResult.success) {
    throw new Error(
      feedbackResult.error.issues[0]?.message ?? 'Feedback no válido',
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No autorizado');

  const cleanFeedback = feedbackResult.data.trim();

  const { data: current } = await supabase
    .from('applications')
    .select('feedback')
    .eq('id', applicationId)
    .eq('user_id', user.id)
    .single();

  const { error } = await supabase
    .from('applications')
    .update({ feedback: cleanFeedback || null })
    .eq('id', applicationId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error al guardar el feedback:', error);
    throw new Error(error.message);
  }

  if (current && (current.feedback ?? '') !== cleanFeedback) {
    await recordApplicationEvent(supabase, user.id, {
      applicationId,
      type: 'feedback_updated',
    });
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  revalidatePath(`/dashboard/applications/${applicationId}`);
  revalidatePath(`/dashboard/applications/${applicationId}/edit`);

  return { success: true };
}

export async function deleteApplication(id: string) {
  const applicationId = parseApplicationId(id);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No autorizado');

  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', applicationId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function resetPassword(formData: FormData) {
  try {
    const supabase = await createClient();
    const email = formData.get('email') as string;

    if (!email) return { error: 'El email es requerido' };

    const origin = await getRequestOrigin();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/dashboard/settings`,
    });

    if (error) return { error: error.message };

    return { success: 'Revisa tu correo para restablecer la contraseña.' };
  } catch (error: unknown) {
    // Validamos si el error es una instancia de Error de JS
    if (error instanceof Error) {
      return { error: error.message };
    }
    // Si por alguna razón lo que se lanzó no es un objeto Error
    return { error: 'Ocurrió un error inesperado' };
  }
}
