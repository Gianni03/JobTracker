'use client';

import { useState } from 'react';
import { resetPassword } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setMessage(null);
    
    const result = await resetPassword(formData);
    
    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: result.success as string });
    }
    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recuperar contraseña</CardTitle>
          <CardDescription>
            Ingresá tu email y te enviaremos un link para volver a entrar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="tu@email.com"
                type="email"
                required
                disabled={isLoading}
              />
            </div>
            
            {message && (
              <p className={`text-sm p-3 rounded-md ${
                message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'
              }`}>
                {message.text}
              </p>
            )}

            <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar link de recuperación'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" asChild className="w-full">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}