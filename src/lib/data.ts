import { createClient } from '@/utils/supabase/server';
import { Application } from './definitions';

// Días después de los cuales una postulación en "Aplicado" pasa a "Ghosted"
const GHOSTED_THRESHOLD_DAYS = 14;

/**
 * Actualiza automáticamente aplicaciones que llevan mucho tiempo en "Aplicado"
 * a estado "Ghosted" después de X días sin respuesta
 */
export async function autoMarkAsGhosted(applications: Application[]): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const now = new Date();
  const applicationsToGhost: string[] = [];

  for (const app of applications) {
    if (app.status !== 'Aplicado') continue;

    const applicationDate = new Date(app.date);
    const daysDiff = Math.floor((now.getTime() - applicationDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff >= GHOSTED_THRESHOLD_DAYS) {
      applicationsToGhost.push(app.id);
    }
  }

  if (applicationsToGhost.length === 0) return;

  // Actualizar en batch
  const { error } = await supabase
    .from('applications')
    .update({ status: 'Ghosted' })
    .in('id', applicationsToGhost)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error auto-marking as ghosted:', error);
  }
}

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    offerStage: app.offer_stage,
    interviewDate: app.interview_date,
    salary: {
      desired: app.salary_desired,
      desiredMax: app.salary_desired_max,
      expressed: app.salary_expressed,
      expressedMax: app.salary_expressed_max,
      offer: app.salary_offer,
      currency: app.salary_currency || 'USD',
      frequency: app.salary_frequency || 'year',
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
    offerStage: app.offer_stage,
    interviewDate: app.interview_date,
    salary: {
      desired: app.salary_desired,
      desiredMax: app.salary_desired_max,
      expressed: app.salary_expressed,
      expressedMax: app.salary_expressed_max,
      offer: app.salary_offer,
      currency: app.salary_currency || 'USD',
      frequency: app.salary_frequency || 'year',
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
