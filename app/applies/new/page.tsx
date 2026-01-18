"use client";

import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Definimos qué datos vamos a manejar (match con tu DB)
type JobFormData = {
  company: string;
  position: string;
  status: string;
  link: string;
  salary_expected: number;
};

export default function NewJobPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<JobFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: JobFormData) => {
    setLoading(true);

    // 1. Obtenemos el usuario actual para saber de quién es este trabajo
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Error: No estás logueado");
      setLoading(false);
      return;
    }

    // 2. Insertamos en Supabase
    const { error } = await supabase.from("jobs").insert({
      company: data.company,
      position: data.position,
      status: data.status,
      link: data.link,
      salary_expected: data.salary_expected || 0,
      user_id: user.id, // ¡Importante! Vinculamos el dato al usuario
    });

    if (error) {
      console.error(error);
      alert("Error al guardar: " + error.message);
    } else {
      // 3. Si todo sale bien, volvemos al dashboard
      router.push("/dashboard");
      router.refresh(); // Refresca los datos del dashboard
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Cabecera */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="text-gray-500" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nueva Postulación</h1>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        
        {/* Fila 1: Empresa y Puesto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Empresa *</label>
            <input
              {...register("company", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="Ej: Google"
            />
            {errors.company && <span className="text-red-500 text-xs">Campo requerido</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Puesto *</label>
            <input
              {...register("position", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="Ej: Frontend Dev"
            />
          </div>
        </div>

        {/* Fila 2: Estado y Sueldo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              {...register("status")}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
            >
              <option value="aplicado">Aplicado</option>
              <option value="entrevista">Entrevista</option>
              <option value="oferta">Oferta</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sueldo Esperado (k)</label>
            <input
              type="number"
              {...register("salary_expected")}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="Ej: 120"
            />
          </div>
        </div>

        {/* Fila 3: Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Link de la Vacante</label>
          <input
            {...register("link")}
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="https://..."
          />
        </div>

        {/* Botón Guardar */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Guardando...</span>
            ) : (
              <>
                <Save size={20} />
                Guardar Postulación
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}