"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface JobData {
  id?: string;
  company: string;
  position: string;
  description: string;
  status: string;
  date: string;
  interview_stage: string;
  salary_asked?: number | string;
  company_budget_salary?: number | string;
  salary_offered?: number | string;
  contact_person?: string;
  reach_method?: string;
  platform?: string;
  link?: string;
  notes_general?: string;
  notes_interview?: string;
  feedback?: string;
}

export default function JobForm({ initialData }: { initialData?: JobData }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
   const jobPayload = {
    company: formData.get("company"),
    position: formData.get("position"),
    description: formData.get("description"),
    status: formData.get("status"),
    date: formData.get("date"),
    interview_stage: formData.get("interview_stage"),
    salary_asked: formData.get("salary_asked") || null,
    company_budget_salary: formData.get("company_budget_salary") || null,
    salary_offered: formData.get("salary_offered") || null,
    contact_person: formData.get("contact_person"),
    reach_method: formData.get("reach_method"),
    platform: formData.get("platform"),
    link: formData.get("link"),
    notes_general: formData.get("notes_general"),
    notes_interview: formData.get("notes_interview"),
    feedback: formData.get("feedback"),
    }; 

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No usuario autenticado");

      let error;

      if (isEditing) {
        // --- LÓGICA DE ACTUALIZAR ---
        const { error: updateError } = await supabase
          .from("jobs")
          .update(jobPayload)
          .eq("id", initialData.id)
          .eq("user_id", user.id);
        error = updateError;
      } else {
        // --- LÓGICA DE CREAR ---
        const { error: insertError } = await supabase
          .from("jobs")
          .insert([{ ...jobPayload, user_id: user.id }]);
        error = insertError;
      }

      if (error) throw error;

      // Éxito: Redirigir y refrescar
      router.push("/dashboard");
      router.refresh(); 

    } catch (err) {
      console.error("Error guardando:", err);
      alert("Hubo un error al guardar. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <button type="button" onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-gray-800">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? `Editar: ${initialData.company}` : "Nueva Postulación"}
        </h1>
      </div>

      {/* Grid de campos principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Empresa *</label>
          <input name="company" defaultValue={initialData?.company} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Google" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Puesto *</label>
          <input name="position" defaultValue={initialData?.position} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Frontend Dev" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea name="description" defaultValue={initialData?.description} className="w-full p-2 border rounded-lg" placeholder="Descripción del puesto..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select name="status" defaultValue={initialData?.status || "aplicado"} className="w-full p-2 border rounded-lg bg-white">
            <option value="aplicado">Aplicado</option>
            <option value="entrevista">Entrevista</option>
            <option value="oferta">Oferta</option>
            <option value="rechazado">Rechazado</option>
            <option value="ghosted">Ghosted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Aplicación</label>
          <input type="date" name="date" defaultValue={initialData?.date || new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded-lg" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notas Entrevista</label>
        <textarea name="notes_interview" rows={3} defaultValue={initialData?.notes_interview} className="w-full p-2 border rounded-lg" placeholder="Notas sobre la postulación..." />
      </div>

      {/* Sección de Salarios */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Información Salarial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500">Sueldo Pretendido</label>
            <input type="number" name="salary_asked" defaultValue={initialData?.salary_asked} className="w-full p-2 border rounded-lg" placeholder="0" />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Sueldo Presupuestado</label>
            <input type="number" name="company_budget_salary" defaultValue={initialData?.company_budget_salary} className="w-full p-2 border rounded-lg" placeholder="0" />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Sueldo Ofrecido</label>
            <input type="number" name="salary_offered" defaultValue={initialData?.salary_offered} className="w-full p-2 border rounded-lg" placeholder="0" />
          </div>
        </div>
      </div>

      {/* recruiter data */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Recruiter</label>
        <input type="text" name="contact_person" defaultValue={initialData?.contact_person} className="w-full p-2 border rounded-lg" placeholder="Nombre del reclutador" />
        <input type="text" name="reach_method" defaultValue={initialData?.reach_method} className="w-full p-2 border rounded-lg" placeholder="Método de contacto" />
      </div>

      {/* Notas Extras */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notas / Link</label>
        <input type="url" name="link" defaultValue={initialData?.link} className="w-full p-2 border rounded-lg mb-2" placeholder="https://linkedin.com/jobs/..." />
        <textarea name="notes_general" rows={3} defaultValue={initialData?.notes_general} className="w-full p-2 border rounded-lg" placeholder="Notas sobre la postulación..." />
      </div>

      {/* feedback */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
        <textarea name="feedback" rows={3} defaultValue={initialData?.feedback} className="w-full p-2 border rounded-lg" placeholder="Feedback sobre la postulación..." />
      </div>

      

      {/* Botón Guardar */}
      <div className="flex justify-end pt-4">
        <button type="submit" disabled={loading} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {isEditing ? "Guardar Cambios" : "Crear Postulación"}
        </button>
      </div>
    </form>
  );
}