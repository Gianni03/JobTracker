'use client';

import Script from 'next/script';
import Link from 'next/link';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  clearGoogleAnalyticsCookies,
  getAnalyticsConsent,
  saveAnalyticsConsent,
  type AnalyticsConsentDecision,
} from '@/lib/analytics-consent';
import {
  GOOGLE_ANALYTICS_ID,
  initializeGoogleAnalytics,
} from '@/lib/analytics';

const AnalyticsPreferencesContext = createContext<() => void>(() => {});

export function AnalyticsConsentProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [decision, setDecision] = useState<AnalyticsConsentDecision | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    const storedDecision = getAnalyticsConsent();
    if (storedDecision === 'granted') {
      initializeGoogleAnalytics();
    } else {
      clearGoogleAnalyticsCookies();
    }
    setDecision(storedDecision);
    setIsReady(true);

    function handleStorageChange(event: StorageEvent) {
      if (event.key !== ANALYTICS_CONSENT_STORAGE_KEY) return;

      const nextDecision = getAnalyticsConsent();
      setDecision(nextDecision);
      if (nextDecision === 'granted') {
        initializeGoogleAnalytics();
        return;
      }

      clearGoogleAnalyticsCookies();
      window.location.reload();
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  function chooseAnalyticsConsent(nextDecision: AnalyticsConsentDecision) {
    const previousDecision = decision;
    const persisted = saveAnalyticsConsent(nextDecision);
    setDecision(nextDecision);
    setIsPreferencesOpen(false);

    if (!persisted) {
      setStorageError(true);
      setIsPreferencesOpen(true);
      if (nextDecision === 'denied') {
        clearGoogleAnalyticsCookies();
        window.dataLayer = [];
        window.gtag = () => {};
      } else {
        initializeGoogleAnalytics();
      }
      return;
    }

    setStorageError(false);
    if (nextDecision === 'granted') {
      initializeGoogleAnalytics();
      return;
    }

    clearGoogleAnalyticsCookies();
    if (previousDecision === 'granted') {
      window.location.reload();
    }
  }

  const showPreferences =
    isReady && (decision === null || isPreferencesOpen);

  return (
    <AnalyticsPreferencesContext.Provider
      value={() => setIsPreferencesOpen(true)}
    >
      {children}

      {isReady && decision === 'granted' && (
        <Script
          id="google-analytics-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
      )}

      {showPreferences && (
        <aside
          aria-label="Preferencias de analítica"
          className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-4 shadow-2xl backdrop-blur sm:p-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="font-semibold">Analítica opcional</h2>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Google Analytics nos ayuda a medir el uso de JobTracker. No se
                carga ni envía eventos hasta que aceptes. Podés cambiar esta
                decisión más adelante desde Preferencias de analítica.
              </p>
              <Link
                href="/privacidad"
                className="text-sm text-primary underline underline-offset-4"
              >
                Leer la Política de Privacidad
              </Link>
              {storageError && (
                <p role="alert" className="text-sm text-destructive">
                  No pudimos guardar tu elección de forma persistente. Se aplica
                  en esta sesión, pero podría no mantenerse después de recargar.
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {decision !== null && (
                <button
                  type="button"
                  onClick={() => setIsPreferencesOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Cerrar
                </button>
              )}
              <button
                type="button"
                onClick={() => chooseAnalyticsConsent('denied')}
                className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                Rechazar analítica
              </button>
              <button
                type="button"
                onClick={() => chooseAnalyticsConsent('granted')}
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Aceptar analítica
              </button>
            </div>
          </div>
        </aside>
      )}
    </AnalyticsPreferencesContext.Provider>
  );
}

export function AnalyticsPreferencesButton() {
  const openPreferences = useContext(AnalyticsPreferencesContext);

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-sm text-primary underline underline-offset-4 hover:text-primary/80"
    >
      Preferencias de analítica
    </button>
  );
}
