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
import { login, signup, signInWithGoogle } from '@/app/auth/actions';

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  // Manejador para Login
  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    const result = await login(formData);
    setIsLoading(false);
    if (result?.error) console.log(result.error);
  }

  // Manejador para Registro
  async function handleRegister(formData: FormData) {
    setIsLoading(true);
    const result = await signup(formData);
    setIsLoading(false);
    if (result?.error) console.log(result.error);
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
                  <Input id="email" name="email" placeholder="nombre@ejemplo.com" type="email" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button disabled={isLoading} className="w-full font-semibold" type="submit">
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
                    <Input id="first-name" name="first-name" placeholder="Juan" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Apellido</Label>
                    <Input id="last-name" name="last-name" placeholder="Pérez" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" name="email" placeholder="nombre@ejemplo.com" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reg-password">Contraseña</Label>
                  <Input id="reg-password" name="password" type="password" required />
                </div>
                <Button disabled={isLoading} className="w-full font-semibold" type="submit">
                  {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        {/* SEPARADOR VISUAL */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
          </div>
        </div>

        {/* BOTÓN DE GOOGLE */}
        <form action={signInWithGoogle}>
          <Button 
            variant="outline" 
            type="submit" 
            className="w-full bg-background/50" 
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-xs text-muted-foreground w-full">
          Al continuar, aceptas nuestros términos y condiciones.
        </p>
      </CardFooter>
    </Card>
  );
}