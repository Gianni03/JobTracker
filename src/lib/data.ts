import { createClient } from '@/utils/supabase/server';
import { Application } from './definitions';

export async function fetchUserApplications() {
  const supabase = await createClient();

  // Obtenemos el usuario actual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }

  // Mapeamos los datos planos de la DB a nuestra interfaz anidada Application
  return (data as any[]).map((app) => ({
    id: app.id,
    company: app.company,
    role: app.role,
    status: app.status,
    date: app.date,
    platform: app.platform,
    link: app.link,
    description: app.description,
    interviewStage: app.interview_stage,
    interviewDate: app.interview_date,
    salary: {
      desired: app.salary_desired,
      expressed: app.salary_expressed,
      offer: app.salary_offer,
    },
    contact: {
      name: app.contact_name,
      method: app.contact_method,
    },
    notes: {
      general: app.notes_general,
      interview: app.notes_interview,
    },
    feedback: app.feedback, // Por si existe la columna
  })) as Application[];
}

export async function getApplicationById(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    console.error('Error fetching application by id:', error);
    return null;
  }

  const app = data;
  return {
    id: app.id,
    company: app.company,
    role: app.role,
    status: app.status,
    date: app.date,
    platform: app.platform,
    link: app.link,
    description: app.description,
    interviewStage: app.interview_stage,
    interviewDate: app.interview_date,
    salary: {
      desired: app.salary_desired,
      expressed: app.salary_expressed,
      offer: app.salary_offer,
    },
    contact: {
      name: app.contact_name,
      method: app.contact_method,
    },
    notes: {
      general: app.notes_general,
      interview: app.notes_interview,
    },
    feedback: app.feedback,
  } as Application;
}
