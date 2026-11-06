import { createClient } from '@/utils/supabase/server';
import type {
  Application,
  ApplicationCurrency,
  ApplicationEvent,
  ApplicationEventType,
  ApplicationSalaryFrequency,
  ApplicationStatus,
} from './definitions';

type ApplicationRow = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  date: string;
  platform: Application['platform'];
  link: string | null;
  description: string | null;
  interview_stage: string | null;
  offer_stage: string | null;
  interview_date: string | null;
  salary_desired: number | null;
  salary_desired_max: number | null;
  salary_expressed: number | null;
  salary_expressed_max: number | null;
  salary_offer: number | null;
  salary_currency: ApplicationCurrency | null;
  salary_frequency: ApplicationSalaryFrequency | null;
  contact_name: string | null;
  contact_method: string | null;
  notes_general: string | null;
  notes_interview: string | null;
  feedback: string | null;
  created_at?: string;
  updated_at?: string;
};

// Días después de los cuales una postulación en "Aplicado" pasa a "Ghosted"
export const GHOSTED_THRESHOLD_DAYS = 14;

export function getGhostedCutoffDate(now = new Date()): string {
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - GHOSTED_THRESHOLD_DAYS);

  const year = cutoff.getFullYear();
  const month = String(cutoff.getMonth() + 1).padStart(2, '0');
  const day = String(cutoff.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Marca como "Ghosted" las postulaciones que llevan demasiado tiempo en
 * "Aplicado" con un único UPDATE acotado al usuario actual.
 */
export async function autoMarkAsGhosted(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from('applications')
    .update({ status: 'Ghosted' })
    .eq('user_id', user.id)
    .eq('status', 'Aplicado')
    .lte('date', getGhostedCutoffDate());

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
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }

  // Mapeamos los datos planos de la DB a nuestra interfaz anidada Application
  return (data as ApplicationRow[]).map((app) => ({
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
    createdAt: app.created_at,
    updatedAt: app.updated_at,
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

  const app = data as ApplicationRow;
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
    createdAt: app.created_at,
    updatedAt: app.updated_at,
  } as Application;
}

export async function fetchApplicationEvents(
  applicationId: string,
): Promise<ApplicationEvent[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('application_events')
    .select(
      'id, application_id, type, from_status, to_status, detail, created_at',
    )
    .eq('application_id', applicationId)
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    // The timeline table is optional until the migration is applied.
    if (error.code !== '42P01' && error.code !== 'PGRST205') {
      console.error('Error fetching application events:', error);
    }
    return [];
  }

  return (data ?? []).map((event) => ({
    id: event.id,
    applicationId: event.application_id,
    type: event.type as ApplicationEventType,
    fromStatus: (event.from_status as ApplicationStatus | null) ?? undefined,
    toStatus: (event.to_status as ApplicationStatus | null) ?? undefined,
    detail: event.detail ?? undefined,
    createdAt: event.created_at,
  }));
}
