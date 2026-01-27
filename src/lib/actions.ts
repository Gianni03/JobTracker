'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Application } from './definitions';

// OJO: Asumimos que recibís el objeto del formulario ya formateado
// Si usas FormData directo es más complejo, pero como usas React Hook Form
// probablemente envíes el JSON.

export async function createApplication(data: any) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: 'No autorizado' };

  // Aplanamos los datos para Supabase
  const dbData = {
    user_id: user.id,
    company: data.company,
    role: data.role,
    status: data.status,
    link: data.link,
    platform: data.platform,
    date: data.date,
    description: data.description,
    // Mapeo de objetos anidados a columnas planas
    salary_desired: data.salary?.desired,
    salary_expressed: data.salary?.expressed,
    salary_offer: data.salary?.offer,
    contact_name: data.contact?.name,
    contact_method: data.contact?.method,
    notes_general: data.notes?.general,
    notes_interview: data.notes?.interview,
    // Campos opcionales
    interview_stage: data.interviewStage,
    interview_date: data.interviewDate,
  };

  const { error } = await supabase.from('applications').insert(dbData);

  if (error) {
    console.error('Supabase Error:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateApplication(id: string, data: any) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: 'No autorizado' };

  const dbData = {
    company: data.company,
    role: data.role,
    status: data.status,
    link: data.link,
    platform: data.platform,
    date: data.date,
    description: data.description,
    salary_desired: data.salary?.desired,
    salary_expressed: data.salary?.expressed,
    salary_offer: data.salary?.offer,
    contact_name: data.contact?.name,
    contact_method: data.contact?.method,
    notes_general: data.notes?.general,
    notes_interview: data.notes?.interview,
    interview_stage: data.interviewStage,
    interview_date: data.interviewDate,
  };

  const { error } = await supabase
    .from('applications')
    .update(dbData)
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteApplication(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('applications').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard/settings`,
  });

  if (error) return { error: error.message };
  return { success: "Revisa tu correo para restablecer la contraseña." };
}
