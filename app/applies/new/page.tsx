import JobForm from "@/components/dashboard/JobForm";

export default function NewJobPage() {
  // Renderizamos el formulario vacío (MODO CREAR)
  return (
    <div className="p-8">
      <JobForm />
    </div>
  );
}