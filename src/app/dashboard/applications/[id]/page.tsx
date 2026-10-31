import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  MessageSquareQuote,
  Pencil,
  StickyNote,
  User,
  Wallet,
} from 'lucide-react';
import { getApplicationById } from '@/lib/data';
import { ApplicationStatusJourney } from '@/components/dashboard/application-status-journey';
import { ApplicationFeedbackCard } from '@/components/dashboard/application-feedback-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatSalaryRange } from '@/lib/format';

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="min-w-0 space-y-0.5 break-words">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="text-sm text-foreground">{children}</div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground italic">{children}</p>;
}

export default async function ApplicationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const application = await getApplicationById(id);

  if (!application) {
    notFound();
  }

  const backHref =
    from === 'dashboard' ? '/dashboard' : '/dashboard/applications';
  const editHref = from
    ? `/dashboard/applications/${application.id}/edit?from=${from}`
    : `/dashboard/applications/${application.id}/edit`;

  const salaryRows = [
    {
      label: 'Pretendido',
      value: formatSalaryRange(
        application.salary.desired,
        application.salary.desiredMax,
        application.salary.currency,
        application.salary.frequency,
      ),
    },
    {
      label: 'Expresado',
      value: formatSalaryRange(
        application.salary.expressed,
        application.salary.expressedMax,
        application.salary.currency,
        application.salary.frequency,
      ),
    },
    {
      label: 'Oferta',
      value: application.salary.offer
        ? formatSalaryRange(
            application.salary.offer,
            null,
            application.salary.currency,
            application.salary.frequency,
          )
        : '-',
    },
  ].filter((row) => row.value !== '-');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={backHref} aria-label="Volver">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0 space-y-2">
            <h1 className="break-words text-2xl font-bold font-headline text-foreground sm:text-3xl">
              {application.company}
            </h1>
            <p className="break-words text-base text-muted-foreground sm:text-lg">
              {application.role}
            </p>
            <ApplicationStatusJourney
              id={application.id}
              status={application.status}
              interviewStage={application.interviewStage}
              interviewDate={application.interviewDate}
              offerStage={application.offerStage}
            />
          </div>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href={editHref}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard
            title="Descripción del puesto"
            icon={<StickyNote className="h-5 w-5 text-primary" />}
          >
            {application.description ? (
              <p className="break-words whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {application.description}
              </p>
            ) : (
              <EmptyState>Sin descripción cargada.</EmptyState>
            )}
          </SectionCard>

          <SectionCard
            title="Notas"
            icon={<StickyNote className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Generales
                </p>
                {application.notes?.general ? (
                  <p className="break-words whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {application.notes.general}
                  </p>
                ) : (
                  <EmptyState>Sin notas generales.</EmptyState>
                )}
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Entrevista
                </p>
                {application.notes?.interview ? (
                  <p className="break-words whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {application.notes.interview}
                  </p>
                ) : (
                  <EmptyState>Sin notas de entrevista.</EmptyState>
                )}
              </div>
            </div>
          </SectionCard>

          <ApplicationFeedbackCard
            id={application.id}
            feedback={application.feedback}
          />
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Detalles"
            icon={<CalendarDays className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-4">
              <DetailRow
                icon={<CalendarDays className="h-4 w-4" />}
                label="Fecha de aplicación"
              >
                {format(new Date(application.date + 'T00:00:00'), 'd MMM yyyy', {
                  locale: es,
                })}
              </DetailRow>
              <Separator />
              <DetailRow
                icon={<ExternalLink className="h-4 w-4" />}
                label="Plataforma"
              >
                {application.platform}
              </DetailRow>
              {application.status === 'Entrevista' &&
                application.interviewDate && (
                  <>
                    <Separator />
                    <DetailRow
                      icon={<CalendarDays className="h-4 w-4" />}
                      label="Fecha de entrevista"
                    >
                      {format(
                        new Date(application.interviewDate),
                        'd MMM yyyy, HH:mm',
                        { locale: es },
                      )}
                    </DetailRow>
                  </>
                )}
              <Separator />
              <DetailRow
                icon={<ExternalLink className="h-4 w-4" />}
                label="Link a la oferta"
              >
                {application.link ? (
                  <a
                    href={application.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 break-all text-primary hover:underline"
                  >
                    {application.link}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                ) : (
                  '-'
                )}
              </DetailRow>
            </div>
          </SectionCard>

          <SectionCard
            title="Contacto"
            icon={<User className="h-5 w-5 text-primary" />}
          >
            {application.contact.name || application.contact.method ? (
              <div className="space-y-4">
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Nombre"
                >
                  {application.contact.name || '-'}
                </DetailRow>
                <Separator />
                <DetailRow
                  icon={<MessageSquareQuote className="h-4 w-4" />}
                  label="Medio de contacto"
                >
                  {application.contact.method || '-'}
                </DetailRow>
              </div>
            ) : (
              <EmptyState>Sin información de contacto.</EmptyState>
            )}
          </SectionCard>

          <SectionCard
            title="Salario"
            icon={<Wallet className="h-5 w-5 text-primary" />}
          >
            {salaryRows.length > 0 ? (
              <div className="space-y-3">
                {salaryRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-center justify-between gap-1 text-sm"
                  >
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="min-w-0 break-words text-right font-medium text-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState>Sin información salarial.</EmptyState>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
