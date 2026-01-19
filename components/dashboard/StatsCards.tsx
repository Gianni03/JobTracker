"use client";
import { Briefcase, MessageSquare, CheckCircle } from "lucide-react";

export function StatsCards({ jobs }: { jobs: any[] }) {
  // Calculamos los números basándonos en la data real
 const stats = [
    { label: "Total Postulaciones", value: jobs.length, icon: Briefcase, bg: "bg-blue-50", text: "text-blue-600" },
    { label: "En Proceso", value: jobs.filter(j => j.status === 'entrevista').length, icon: MessageSquare, bg: "bg-orange-50", text: "text-orange-600" },
    { label: "Ofertas Recibidas", value: jobs.filter(j => j.status === 'oferta').length, icon: CheckCircle, bg: "bg-green-50", text: "text-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.text}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-800">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}