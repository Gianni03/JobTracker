import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  isExternal?: boolean;
}

export function ResourceCard({
  title,
  description,
  icon,
  href,
  isExternal = false,
}: ResourceCardProps) {
  const cardContent = (
    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md group">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-sm font-medium text-primary">
          {isExternal ? 'Visitar recurso' : 'Ver recurso'}
          {isExternal ? (
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          ) : (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    );
  }

  return <Link href={href}>{cardContent}</Link>;
}
