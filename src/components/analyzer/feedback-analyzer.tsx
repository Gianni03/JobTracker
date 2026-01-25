'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { analyzeFeedbackAction } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: null,
  errors: {},
  analysis: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analizando...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Analizar Feedback
        </>
      )}
    </Button>
  );
}

export function FeedbackAnalyzer() {
  const [state, formAction] = useFormState(analyzeFeedbackAction, initialState);

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Ingresar Feedback</CardTitle>
          <CardDescription>
            Pega el texto del correo o mensaje recibido por el reclutador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                name="feedback"
                placeholder="Ej: Gracias por participar en el proceso. En esta ocasión hemos decidido no avanzar porque buscábamos a alguien con más experiencia en..."
                className="min-h-[200px] resize-none"
                required
              />
              {state?.errors?.feedback && (
                <p className="text-sm text-destructive font-medium">
                  {state.errors.feedback[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state?.message && !state.analysis && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">{state.message}</p>
        </div>
      )}

      {state?.analysis && (
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-950/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-green-800 dark:text-green-300">
                Áreas de Mejora
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert prose-sm max-w-none text-foreground/80">
                {state.analysis.areasForImprovement
                  .split('\n')
                  .map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-primary">
                Sugerencias Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert prose-sm max-w-none text-foreground/80">
                {state.analysis.personalizedSuggestions
                  .split('\n')
                  .map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
