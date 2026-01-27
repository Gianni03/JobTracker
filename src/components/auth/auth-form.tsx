'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { login, signup } from '@/app/auth/actions'; // Importamos las acciones
import { Toast } from '@/components/ui/toast';

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  // Manejador para Login
  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    const result = await login(formData);
    setIsLoading(false);

    if (result?.error) {
      console.log(result.error);
    }
  }

  // Manejador para Registro
  async function handleRegister(formData: FormData) {
    setIsLoading(true);
    const result = await signup(formData);
    setIsLoading(false);

    if (result?.error) {
      console.log(result.error);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Bienvenido
        </CardTitle>
        <CardDescription>
          Ingresa a tu cuenta para gestionar tus postulaciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Ingresar</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login" className="space-y-4">
            <form action={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="nombre@ejemplo.com"
                    type="email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    {/* Agregamos el link que faltaba aquí */}
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                {/* type="submit" asegura que funcione el Enter */}
                <Button
                  disabled={isLoading}
                  className="w-full font-semibold"
                  type="submit"
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* REGISTER TAB */}
          <TabsContent value="register" className="space-y-4">
            <form action={handleRegister}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">Nombre</Label>
                    <Input
                      id="first-name"
                      name="first-name"
                      placeholder="Juan"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Apellido</Label>
                    <Input
                      id="last-name"
                      name="last-name"
                      placeholder="Pérez"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    name="email"
                    placeholder="nombre@ejemplo.com"
                    type="email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reg-password">Contraseña</Label>
                  <Input
                    id="reg-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <Button disabled={isLoading} className="w-full font-semibold">
                  {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>{/* Footer content */}</CardFooter>
    </Card>
  );
}
