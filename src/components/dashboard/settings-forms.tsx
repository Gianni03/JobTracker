'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePassword, updateProfile } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  passwordFormSchema,
  profileSchema,
  type PasswordFormValues,
  type ProfileOutput,
  type ProfileValues,
} from '@/lib/validation/profile';

interface SettingsFormsProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function SettingsForms({
  firstName,
  lastName,
  email,
}: SettingsFormsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isProfilePending, startProfileTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();

  const profileForm = useForm<ProfileValues, unknown, ProfileOutput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName, lastName },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onProfileSubmit = profileForm.handleSubmit((values) => {
    startProfileTransition(async () => {
      const result = await updateProfile(values);

      if (result?.error) {
        toast({
          title: 'No se pudo guardar el perfil',
          description: result.error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Perfil actualizado',
        description: 'Tus datos se guardaron correctamente.',
      });
      profileForm.reset({
        firstName: values.firstName,
        lastName: values.lastName ?? '',
      });
      router.refresh();
    });
  });

  const onPasswordSubmit = passwordForm.handleSubmit((values) => {
    startPasswordTransition(async () => {
      const result = await updatePassword({ password: values.password });

      if (result?.error) {
        toast({
          title: 'No se pudo cambiar la contraseña',
          description: result.error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Contraseña actualizada',
        description: 'Usá la nueva contraseña la próxima vez que ingreses.',
      });
      passwordForm.reset();
    });
  });

  return (
    <div className="space-y-6">
      <form onSubmit={onProfileSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  {...profileForm.register('firstName')}
                />
                {profileForm.formState.errors.firstName && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  {...profileForm.register('lastName')}
                />
                {profileForm.formState.errors.lastName && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={email}
                disabled
                className="bg-muted"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                El email no se puede cambiar por seguridad.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isProfilePending}>
            {isProfilePending ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>

      <form onSubmit={onPasswordSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Nueva contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...passwordForm.register('password')}
                />
                {passwordForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {passwordForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...passwordForm.register('confirmPassword')}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Mínimo 8 caracteres. La contraseña se actualiza en tu cuenta de
              Supabase.
            </p>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="outline"
                disabled={isPasswordPending}
              >
                {isPasswordPending ? 'Actualizando...' : 'Cambiar Contraseña'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
