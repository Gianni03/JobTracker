'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface CodeBlockProps {
  code: string;
  label?: string;
  className?: string;
  analyticsContext?: string;
}

export function CodeBlock({
  code,
  label,
  className,
  analyticsContext,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      trackEvent('copy_command', {
        context: analyticsContext ?? 'general',
        label: label ?? 'unnamed',
      });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable in non-secure contexts.
    }
  };

  return (
    <div className={cn('relative rounded-lg border bg-muted/40', className)}>
      {label && (
        <div className="border-b px-3 py-1.5 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      )}
      <div className="flex items-start gap-2 p-3">
        <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={copy}
          aria-label="Copiar comando"
          title="Copiar"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}
