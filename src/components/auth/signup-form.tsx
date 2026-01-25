"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export function SignUpForm() {
    const router = useRouter();

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd handle registration here.
        // For this MVP, we'll just redirect to the dashboard.
        router.push("/dashboard");
      };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">Nombre</Label>
          <Input id="first-name" placeholder="Juan" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Apellido</Label>
          <Input id="last-name" placeholder="Pérez" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-signup">Email</Label>
        <Input id="email-signup" type="email" placeholder="tu@email.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-signup">Contraseña</Label>
        <Input id="password-signup" type="password" required placeholder="••••••••" />
      </div>
      <div className="flex items-start gap-2 pt-2">
          <Checkbox id="terms" required/>
          <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
            Acepto los términos y condiciones y la política de privacidad
          </Label>
      </div>
      <Button type="submit" className="w-full">
        Crear Cuenta
      </Button>
    </form>
  );
}
