import { Github, Mail, Bug, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 text-sm text-muted-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:px-8">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            Desarrollado por{' '}
            <a
              href="https://giannipasquinelli-webdev.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(224,122,95,0.8)]"
            >
              Gianni Pasquinelli
            </a>
          </span>
          <span className="hidden md:inline">•</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="mailto:giannipasquinelli@gmail.com"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            title="Email"
          >
            <Mail className="h-5 w-5" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/gianni-pasquinelli/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#0077b5] transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>

          <Link
            href="https://github.com/gianni03"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            title="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>

          <Link
            href="mailto:giannipasquinelli@gmail.com?subject=[JobTracker] Bug Report / Sugerencia"
            className="flex items-center gap-2 hover:text-orange-500 transition-colors"
            title="Reportar Bug o Sugerencia"
          >
            <Bug className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
