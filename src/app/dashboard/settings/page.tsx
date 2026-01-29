import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// Ya no necesitamos recibir props, la página busca sus propios datos
export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  // Preparamos los datos del usuario real
  const userData = {
    firstName: user.user_metadata?.full_name?.split(' ')[0] || '',
    lastName: user.user_metadata?.full_name?.split(' ')[1] || '',
    email: user.email || '',
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Configuración
        </h1>
        <p className="text-muted-foreground">
          Administra tu perfil y preferencias
        </p>
      </div>

      {/* NOTA: Para que este formulario funcione y guarde cambios, 
          en el futuro deberás agregarle una Server Action en el 'action={...}'.
          Por ahora es visual.
      */}
      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" name="firstName" defaultValue={userData.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" name="lastName" defaultValue={userData.lastName} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={userData.email} disabled className="bg-muted" />
              <p className="text-[0.8rem] text-muted-foreground">El email no se puede cambiar por seguridad.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferencias</CardTitle>
            <CardDescription>
              Gestiona tus notificaciones y recordatorios.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            <PreferenceItem
              title="Notificaciones por Email"
              description="Recibe actualizaciones sobre tus postulaciones"
              defaultChecked
            />
            <PreferenceItem
              title="Recordatorios de Seguimiento"
              description="Recibe recordatorios para hacer seguimiento"
              defaultChecked
            />
            <PreferenceItem
              title="Estadísticas Semanales"
              description="Recibe un resumen semanal de tu progreso"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" type="button">Cambiar Contraseña</Button>
            {/* Aquí podrías conectar la acción de signOut que creamos antes */}
            <Button variant="destructive" type="button">
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </div>
  );
}

function PreferenceItem({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <Label className="font-medium">{title}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}