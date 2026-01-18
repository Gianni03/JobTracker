
interface Job {
  id: string;
  company: string;
  position: string;
  status: string;
  date: string;
}

export function RecentJobs({ jobs }: { jobs: Job[] }) {

  if(jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Postulaciones Recientes</h3>
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
        <h3 className="text-lg font-bold text-gray-800">Postulaciones Recientes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">Empresa</th>
              <th className="px-6 py-4 font-semibold">Puesto</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold text-right">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-gray-900">{job.company}</td>
                <td className="px-6 py-4 text-gray-600">{job.position}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize 
                    ${job.status === 'entrevista' ? 'bg-blue-100 text-blue-600' : 
                      job.status === 'rechazado' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-gray-400 text-sm">{job.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}