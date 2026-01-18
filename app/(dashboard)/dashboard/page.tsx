import { StatCard } from '@/components/dashboard/StatCard';
import { RecentJobs } from '@/components/dashboard/RecentJobs';

import { stats } from '@/lib/data-mock';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  const { data: jobs } = await supabase
    .from('jobs')
    .select('id, company, position, status, date') // Solo traemos lo necesario para la tabla
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header del Dashboard */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-gray-500">
          Bienvenido de nuevo, aquí está el resumen de tu búsqueda.
        </p>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            color={s.color}
          />
        ))}
      </div>

      <Link
        href="/applies/new"
        className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-blue-200"
      >
        <Plus size={20} />
        Nueva Postulación
      </Link>

      {/* Tabla y Sección Inferior */}
      <div className="grid grid-cols-1 gap-6">
        <RecentJobs jobs={jobs || []} />
      </div>
    </div>
  );
}
