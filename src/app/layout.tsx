import type { Metadata } from 'next';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AnalyticsConsentProvider } from '@/components/analytics/analytics-consent-provider';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'JobTracker',
  description: 'Gestiona tus postulaciones laborales de forma inteligente',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      {/* Browser extensions such as Grammarly inject attributes into body before hydration. */}
      <body
        className={cn(inter.className, "font-body antialiased")}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsConsentProvider>
            {children}
            <Toaster />
          </AnalyticsConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
