import { StatCard } from "@/components/dashboard/StatCard";
import { RecentJobs } from "@/components/dashboard/RecentJobs";
import { stats } from "@/lib/data-mock";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Header del Dashboard */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-gray-500">Bienvenido de nuevo, aquí está el resumen de tu búsqueda.</p>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} color={s.color} />
        ))}
      </div>

      {/* Tabla y Sección Inferior */}
      <div className="grid grid-cols-1 gap-6">
        <RecentJobs />
      </div>
    </div>
  );
}