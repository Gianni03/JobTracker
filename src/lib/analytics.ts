import { hasAnalyticsConsent } from '@/lib/analytics-consent';

type AnalyticsValue = string | number | boolean | undefined;

export type AnalyticsParams = Record<string, AnalyticsValue>;

export const GOOGLE_ANALYTICS_ID = 'G-XXH598M857';

let googleAnalyticsConfigured = false;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function initializeGoogleAnalytics() {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return false;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google Tag queues the arguments object as each dataLayer command.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

  if (!googleAnalyticsConfigured) {
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ANALYTICS_ID);
    googleAnalyticsConfigured = true;
  }

  return true;
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!initializeGoogleAnalytics()) return;

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  window.gtag?.('event', name, cleanParams);
}
