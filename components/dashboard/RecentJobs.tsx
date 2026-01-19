'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import {
  Trash2,
  Search,
  Edit2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
} from 'lucide-react';
import Swal from 'sweetalert2';

interface Job {
  id: string;
  company: string;
  position: string;
  status: string;
  date: string;
}

export function RecentJobs({ jobs: initialJobs }: { jobs: Job[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5); // Estado para controlar cuántos ver
  const router = useRouter();
  const supabase = createClient();

  // 1. FILTRADO (Buscador + Status)
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 2. LÓGICA DE PAGINACIÓN
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastItem = currentPage * jobsPerPage;
  const indexOfFirstItem = indexOfLastItem - jobsPerPage;

  // Estos son los que realmente se deben mostrar:
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (
    e: React.MouseEvent,
    id: string,
    company: string
  ) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás la postulación de ${company}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f96e46',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (!error) {
        setJobs(jobs.filter((j) => j.id !== id));
        router.refresh();
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
      {/* HEADER: Filtros y Buscador */}
      <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Historial de Búsqueda
          </h2>
          <p className="text-sm text-gray-400">
            Total: {filteredJobs.length} registros
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Selector: Items por página */}
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
            <span>Ver:</span>
            <select
              value={jobsPerPage}
              onChange={(e) => {
                setJobsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-transparent font-bold text-gray-700 outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Filtro por Status */}
          <div className="relative">
            <select
              className="pl-4 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none appearance-none focus:ring-2 focus:ring-[#f96e46] text-gray-600 font-medium"
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Todos los estados</option>
              <option value="aplicado">Aplicado</option>
              <option value="entrevista">Entrevista</option>
              <option value="oferta">Oferta</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar empresa..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#f96e46] outline-none transition-all"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[0.15em]">
            <tr>
              <th className="px-8 py-4 font-bold">Compañía / Puesto</th>
              <th className="px-8 py-4 font-bold text-center">Estado</th>
              <th className="px-8 py-4 font-bold">Fecha</th>
              <th className="px-8 py-4 font-bold">Salarios</th>
              <th className="px-8 py-4 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentItems.map((job) => (
              <tr
                key={job.id}
                className="group hover:bg-gray-50/50 transition-all border-b border-gray-50 last:border-0"
              >
                {/* 1. EMPRESA Y PUESTO */}
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-gray-800 group-hover:text-[#f96e46] transition-colors tracking-tight">
                      {job.company}
                    </span>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-tighter">
                      {job.position}
                    </span>
                  </div>
                </td>

                {/* 2. ESTADO DETALLADO */}
                <td className="px-8 py-6">
                  <div className="flex flex-col items-start gap-1">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        job.status === 'entrevista'
                          ? 'bg-orange-50 text-orange-600 border-orange-100'
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </td>

                {/* 3. FECHA FORMATEADA */}
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-gray-700">
                    {new Date(job.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </td>

                {/* 4. SALARIOS (Pretendido vs Expresado) */}
                <td className="px-8 py-6">
                  <div className="flex flex-col text-[11px] gap-1">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                      <span className="font-medium">Pretendido:</span>
                      <span className="font-bold text-gray-700">
                        ${job.salary_expected || '---'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span className="font-medium">Ofrecido:</span>
                      <span className="font-bold text-gray-700">
                        ${job.company_budget_salary || '---'}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 5. FEEDBACK / NOTAS */}
                {/* <td className="px-8 py-6">
                  <button
                    onClick={() => router.push(`/feedback/${job.id}`)}
                    className="text-xs font-bold text-[#f96e46] hover:underline flex items-center gap-1"
                  >
                    Ver detalles <ChevronRight size={14} />
                  </button>
                </td> */}

                {/* 6. ACCIONES RAPIDAS */}
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className="p-2 bg-white border border-gray-100 rounded-xl shadow-sm hover:text-[#f96e46]"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, job.id, job.company)}
                      className="p-2 bg-white border border-gray-100 rounded-xl shadow-sm hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER: Paginación */}
      <div className="p-6 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
        <p className="text-xs text-gray-400 font-medium">
          Mostrando{' '}
          <span className="text-gray-700 font-bold">
            {indexOfFirstItem + 1}
          </span>{' '}
          -{' '}
          <span className="text-gray-700 font-bold">
            {Math.min(indexOfLastItem, filteredJobs.length)}
          </span>{' '}
          de {filteredJobs.length}
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 rounded-xl border border-gray-200 disabled:opacity-20 hover:bg-white hover:shadow-sm transition-all bg-white/50"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 rounded-xl border border-gray-200 disabled:opacity-20 hover:bg-white hover:shadow-sm transition-all bg-white/50"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
