'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { ArrowRight, Check, Loader2, Plus } from 'lucide-react';
import { changeApplicationStatus } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ApplicationStatus } from '@/lib/definitions';
import {
  getStatusJourney,
  STATUS_DOT_CLASS,
  STATUS_OPTIONS,
  STATUS_PILL_CLASS,
} from '@/lib/status';

interface ApplicationStatusJourneyProps {
  id: string;
  status: ApplicationStatus;
  interviewStage?: string;
  interviewDate?: string;
  offerStage?: string;
}

export function ApplicationStatusJourney({
  id,
  status,
  interviewStage,
  interviewDate,
  offerStage,
}: ApplicationStatusJourneyProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const journey = getStatusJourney({
    status,
    interviewStage,
    interviewDate,
  });

  const stageFor = (step: ApplicationStatus) => {
    if (step === 'Entrevista' && interviewStage) return interviewStage;
    if (step === 'Oferta' && offerStage) return offerStage;
    return null;
  };

  const handleChange = (newStatus: ApplicationStatus) => {
    if (newStatus === status) return;

    startTransition(async () => {
      try {
        await changeApplicationStatus(id, newStatus);

        if (newStatus === 'Oferta' || newStatus === 'Entrevista') {
          confetti({
            particleCount: newStatus === 'Oferta' ? 400 : 200,
            spread: 170,
            origin: { y: 0.6 },
            colors: ['#E07A5F', '#3D405B', '#81B29A', '#F2CC8F'],
          });
          toast({
            title: '¡Progreso registrado!',
            description:
              newStatus === 'Oferta'
                ? '¡FELICIDADES! ¡Lo lograste!'
                : '¡Avanzaste a la etapa de entrevista!',
            duration: 5000,
            className: 'bg-primary text-primary-foreground',
          });
        } else {
          toast({
            title: 'Estado actualizado',
            description: `Ahora estás en ${newStatus}.`,
          });
        }

        router.refresh();
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el estado. Inténtalo de nuevo.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {journey.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          {index > 0 && (
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          )}
          <Badge
            variant="outline"
            className={`${STATUS_PILL_CLASS[step]} font-normal`}
          >
            {step}
            {stageFor(step) ? ` · ${stageFor(step)}` : ''}
          </Badge>
        </div>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending}
            title="Cambiar estado"
            aria-label="Cambiar estado"
            className="h-7 gap-1 rounded-full border-dashed px-3 text-xs text-muted-foreground hover:text-foreground"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            Estado
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuLabel>Cambiar estado</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {STATUS_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option}
              disabled={option === status}
              onSelect={() => handleChange(option)}
              className="gap-2"
            >
              <span
                className={`h-2 w-2 rounded-full ${STATUS_DOT_CLASS[option]}`}
              />
              <span className="flex-1">{option}</span>
              {option === status && <Check className="h-3.5 w-3.5" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
