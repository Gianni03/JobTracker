import type { User, Application } from "./definitions";

export const user: User = {
  id: '1',
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan@email.com',
  avatar: 'JP',
};

export const applications: Application[] = [
  {
    id: 'google',
    company: 'Google',
    role: 'Senior Frontend Developer',
    status: 'Entrevista',
    interviewStage: 'Entrevista 2',
    date: '2024-01-15',
    interviewDate: '2024-02-15T11:00:00',
    platform: 'LinkedIn',
    link: 'https://careers.google.com/jobs/123456',
    contact: {
      name: 'María García',
      method: 'https://linkedin.com/in/mariagarcia',
    },
    description: 'Buscamos un desarrollador senior con experiencia en React, TypeScript y arquitectura de aplicaciones web modernas.',
    salary: {
      desired: 120000,
      expressed: 115000,
    },
    notes: {
      general: 'Empresa con excelente cultura de trabajo.',
      interview: 'Entrevista 1: Entrevista inicial con HR.\n\nEntrevista 2: Entrevista técnica con el equipo.',
    },
    feedback: 'Nos impresionó tu experiencia con React y tu enfoque en la accesibilidad. Tu portfolio demuestra un excelente dominio de las mejores prácticas. Nos gustaría avanzar a la siguiente etapa del proceso.'
  },
  {
    id: 'microsoft',
    company: 'Microsoft',
    role: 'Software Engineer II',
    status: 'Oferta',
    date: '2024-01-10',
    platform: 'LinkedIn',
    link: 'https://careers.microsoft.com/job/456789',
    contact: {
      name: 'John Smith',
      method: 'john.smith@microsoft.com',
    },
    description: 'Desarrollador con experiencia en .NET, Azure y arquitectura cloud.',
    salary: {
      desired: 135000,
      expressed: 130000,
      offer: 140000,
    },
    notes: {
      general: 'Gran empresa con beneficios excelentes.',
    },
    feedback: 'Tu desempeño en la entrevista técnica fue sobresaliente. Nos gustó especialmente tu enfoque para resolver el problema de optimización. Estamos preparando una oferta formal que recibirás en los próximos días.'
  },
  {
    id: 'netflix',
    company: 'Netflix',
    role: 'UI/UX Designer',
    status: 'Entrevista',
    interviewStage: 'Entrevista 1',
    date: '2024-01-20',
    interviewDate: '2024-02-20T16:00:00',
    platform: 'Web de la Empresa',
    link: 'https://jobs.netflix.com/designer',
    contact: {
      name: 'Sarah Johnson',
      method: 'https://linkedin.com/in/sarahjohnson',
    },
    description: 'Diseñador con experiencia en productos digitales.',
    salary: {
      desired: 110000,
      expressed: 105000,
    },
    notes: {
      general: 'Cultura innovadora y creativa.',
      interview: 'Primera entrevista con el equipo de diseño.',
    },
    feedback: 'Tu portfolio es impresionante y tu enfoque en diseño centrado en el usuario es exactamente lo que buscamos. Nos gustaría programar una entrevista con el equipo de diseño para conocerte mejor.'
  },
  {
    id: 'amazon',
    company: 'Amazon',
    role: 'Full Stack Developer',
    status: 'Rechazado',
    date: '2024-01-05',
    platform: 'LinkedIn',
    link: 'https://amazon.jobs/fullstack',
    contact: {
      name: 'David Lee',
      method: 'david.lee@amazon.com',
    },
    description: 'Desarrollador full stack con experiencia en AWS.',
    salary: {
      desired: 125000,
      expressed: 120000,
    },
    notes: {
      general: 'Proceso muy exigente.',
    },
    feedback: 'Apreciamos tu interés en Amazon. Si bien tu experiencia es sólida, buscamos candidatos con más experiencia en arquitectura de microservicios y AWS. Te recomendamos fortalecer estas áreas y volver a postularte en el futuro.'
  },
  {
    id: 'spotify',
    company: 'Spotify',
    role: 'Product Designer',
    status: 'Ghosted',
    date: '2023-12-28',
    platform: 'Referido',
    link: 'https://spotify.com/jobs/designer',
    contact: {},
    description: 'Diseñador de producto con experiencia en música.',
    salary: {
      desired: 105000,
      expressed: 100000,
    },
    notes: {
      general: 'No recibí respuesta después de la aplicación.',
    },
    feedback: ''
  }
];

export function getApplicationById(id: string): Application | undefined {
  return applications.find(app => app.id === id);
}
