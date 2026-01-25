import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { user } from "@/lib/data";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">Configuración</h1>
        <p className="text-muted-foreground">Administra tu perfil y preferencias</p>
      </div>

      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" defaultValue={user.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" defaultValue={user.lastName} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Preferencias</CardTitle>
                <CardDescription>Gestiona tus notificaciones y recordatorios.</CardDescription>
            </CardHeader>
            <CardContent className="divide-y">
                <PreferenceItem title="Notificaciones por Email" description="Recibe actualizaciones sobre tus postulaciones" defaultChecked />
                <PreferenceItem title="Recordatorios de Seguimiento" description="Recibe recordatorios para hacer seguimiento" defaultChecked />
                <PreferenceItem title="Estadísticas Semanales" description="Recibe un resumen semanal de tu progreso" />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-2">
                <Button>Cambiar Contraseña</Button>
                <Button variant="outline">Cerrar Sesión en todos los dispositivos</Button>
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button>Guardar Cambios</Button>
        </div>
      </form>
    </div>
  );
}

function PreferenceItem({ title, description, defaultChecked = false }: { title: string, description: string, defaultChecked?: boolean }) {
    return (
        <div className="flex items-center justify-between py-4">
            <div>
                <Label className="font-medium">{title}</Label>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Switch defaultChecked={defaultChecked} />
        </div>
    )
}
