'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Trash2, ExternalLink, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface Job {
  id: string;
  company: string;
  position: string;
  status: string;
  date: string;
}

export function RecentJobs({ jobs: initialJobs }: { jobs: Job[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [jobs, setJobs] = useState(initialJobs);

  const handleDelete = async (
    e: React.MouseEvent,
    id: string,
    company: string
  ) => {
    e.stopPropagation(); // Evita que el clic dispare la edición de la fila

    if (
      !confirm(
        `¿Estás seguro de que quieres eliminar la postulación de ${company}?`
      )
    )
      return;

    try {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (error) throw error;

      // Optimistic update: quitamos el job de la lista visualmente
      setJobs(jobs.filter((j) => j.id !== id));
      router.refresh();
    } catch (err) {
      console.error('Error al borrar:', err);
      alert('No se pudo eliminar.');
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-800">
            Postulaciones Recientes
          </h3>
        </div>
        <div className="p-6 text-center text-gray-500">
          No hay postulaciones recientes
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-800">
          Postulaciones Recientes
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-100">
              <th className="pb-4 font-medium">Empresa</th>
              <th className="pb-4 font-medium">Puesto</th>
              <th className="pb-4 font-medium">Estado</th>
              <th className="pb-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {jobs.map((job) => (
              <tr
                key={job.id}
                onClick={() => router.push(`/jobs/${job.id}`)}
                className="group hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="py-4">
                  <div className="font-semibold text-gray-900">
                    {job.company}
                  </div>
                  <div className="text-xs text-gray-400">{job.date}</div>
                </td>
                <td className="py-4 text-gray-600">{job.position}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${
                    job.status === 'oferta'
                      ? 'bg-green-100 text-green-700'
                      : job.status === 'rechazado'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {/* Botón borrar */}
                    <button
                      onClick={(e) => handleDelete(e, job.id, job.company)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
