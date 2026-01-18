import { createClient } from "@/utils/supabase/server";
import JobForm from "@/components/dashboard/JobForm";
import { notFound, redirect } from "next/navigation";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: PageProps) {
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !job) {
    return notFound();
  }

  return (
    <div className="p-8">
      <JobForm initialData={job} />
    </div>
  );
}