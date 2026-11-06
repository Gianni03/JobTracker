import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SettingsForms } from '@/components/dashboard/settings-forms';

// Ya no necesitamos recibir props, la página busca sus propios datos
export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const fullName = String(user.user_metadata?.full_name ?? '').trim();
  const nameParts = fullName.split(/\s+/).filter(Boolean);

  const userData = {
    firstName:
      String(user.user_metadata?.first_name ?? '').trim() ||
      nameParts[0] ||
      '',
    lastName:
      String(user.user_metadata?.last_name ?? '').trim() ||
      nameParts.slice(1).join(' '),
    email: user.email || '',
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Configuración
        </h1>
        <p className="text-muted-foreground">
          Administra tu perfil y preferencias
        </p>
      </div>

      <SettingsForms
        firstName={userData.firstName}
        lastName={userData.lastName}
        email={userData.email}
      />
    </div>
  );
}
