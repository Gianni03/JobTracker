'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { ApplicationStatus } from '@/lib/definitions';
import { STATUS_OPTIONS } from '@/lib/status';
import { getRequestOrigin } from '@/lib/auth-url';

// OJO: Asumimos que recibís el objeto del formulario ya formateado
// Si usas FormData directo es más complejo, pero como usas React Hook Form
// probablemente envíes el JSON.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createApplication(data: any) {
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

  const { error } = await supabase.from('applications').insert([cleanData]);

  if (error) {
    console.error('DETALLE ERROR SUPABASE:', error); // Esto lo verás en tu TERMINAL
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  return { success: true };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateApplication(id: string, data: any) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No autorizado');

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
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error en update:', error);
    throw error;
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  revalidatePath(`/dashboard/applications/${id}`);

  return { success: true };
}

export async function changeApplicationStatus(
  id: string,
  nextStatus: ApplicationStatus,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No autorizado');

  const { data: current, error: fetchError } = await supabase
    .from('applications')
    .select('status, interview_stage, offer_stage')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !current) {
    throw new Error('No se encontró la postulación');
  }

  const currentStatus = current.status as ApplicationStatus;

  if (!STATUS_OPTIONS.includes(nextStatus)) {
    throw new Error('Estado no válido');
  }

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
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error al cambiar el estado:', error);
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  revalidatePath(`/dashboard/applications/${id}`);
  revalidatePath(`/dashboard/applications/${id}/edit`);

  return { success: true, status: nextStatus };
}

export async function updateApplicationFeedback(id: string, feedback: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No autorizado');

  const cleanFeedback = feedback.trim().slice(0, 10000);

  const { error } = await supabase
    .from('applications')
    .update({ feedback: cleanFeedback || null })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error al guardar el feedback:', error);
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
  revalidatePath(`/dashboard/applications/${id}`);
  revalidatePath(`/dashboard/applications/${id}/edit`);

  return { success: true };
}

export async function deleteApplication(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No autorizado');

  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)
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
