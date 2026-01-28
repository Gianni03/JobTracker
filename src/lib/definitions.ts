export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string; // URL to avatar image or initials
};

export type ApplicationStatus =
  | 'Aplicado'
  | 'Entrevista'
  | 'Oferta'
  | 'Rechazado'
  | 'Ghosted';

export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  interviewStage?: string;
  date: string; // ISO 8601 format
  interviewDate?: string;
  platform: 'LinkedIn' | 'Web de la Empresa' | 'Referido' | 'Indeed' | 'Otro';
  link: string;
  salary: {
    desired: number;
    expressed?: number;
    offer?: number;
  };
  contact: {
    name?: string;
    method?: string;
  };
  description: string;
  notes?: {
    general?: string;
    interview?: string;
  };
  feedback?: string;
};