export interface Job {
  id: string;
  company: string;
  position: string;
  status: 'aplicado' | 'entrevista' | 'oferta' | 'rechazado' | 'ghosted';
  date: string;
}

export const recentJobs: Job[] = [
  { id: '1', company: 'Google', position: 'Frontend Developer', status: 'entrevista', date: '2024-05-10' },
  { id: '2', company: 'Meta', position: 'Product Designer', status: 'aplicado', date: '2024-05-12' },
  { id: '3', company: 'Amazon', position: 'Software Engineer', status: 'rechazado', date: '2024-05-08' },
];

export const stats = [
  { label: 'Total Postulaciones', value: 42, color: 'bg-blue-500' },
  { label: 'Entrevistas', value: 8, color: 'bg-purple-500' },
  { label: 'Ofertas', value: 2, color: 'bg-green-500' },
];