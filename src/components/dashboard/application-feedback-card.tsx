'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, MessageSquareQuote, Pencil, X } from 'lucide-react';
import { updateApplicationFeedback } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ApplicationFeedbackCardProps {
  id: string;
  feedback?: string;
}

export function ApplicationFeedbackCard({
  id,
  feedback,
}: ApplicationFeedbackCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(feedback ?? '');
  const [isPending, startTransition] = useTransition();

  const startEditing = () => {
    setValue(feedback ?? '');
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setValue(feedback ?? '');
    setIsEditing(false);
  };

  const saveFeedback = () => {
    startTransition(async () => {
      try {
        await updateApplicationFeedback(id, value);
        toast({
          title: 'Feedback guardado',
          description: 'El feedback de la postulación se actualizó.',
        });
        setIsEditing(false);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'No se pudo guardar el feedback. Inténtalo de nuevo.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquareQuote className="h-5 w-5 text-primary" />
          Feedback recibido
        </CardTitle>
        {!isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={startEditing}
            className="gap-1 text-muted-foreground hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5" />
            {feedback ? 'Editar' : 'Agregar'}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              rows={6}
              maxLength={10000}
              autoFocus
              placeholder="Pegá acá el feedback del reclutador o la empresa..."
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={cancelEditing}
                disabled={isPending}
                className="gap-1"
              >
                <X className="h-3.5 w-3.5" />
                Cancelar
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={saveFeedback}
                disabled={isPending}
                className="gap-1"
              >
                {isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
                Guardar
              </Button>
            </div>
          </div>
        ) : feedback ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {feedback}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Sin feedback registrado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
