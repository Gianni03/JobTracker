// src/app/dashboard/layout.tsx
import { createClient } from '@/utils/supabase/server';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/'); // Seguridad: si no hay sesión, al login
  }

  // Mapeamos los datos de Supabase al formato que espera tu UI
  const realUser = {
    id: user.id,
    firstName: user.user_metadata?.full_name?.split(' ')[0] || 'Usuario',
    lastName: user.user_metadata?.full_name?.split(' ')[1] || '',
    email: user.email || '',
    avatar:
      user.user_metadata?.avatar_url ||
      (user.email ? user.email[0].toUpperCase() : 'U'),
  };

  return (
    <SidebarProvider>
      <AppSidebar user={realUser} />
      <div className="flex-1 flex flex-col">
        {/* También lo pasamos al Header si lo necesita */}
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
