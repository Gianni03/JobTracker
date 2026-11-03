export const ANALYTICS_CONSENT_STORAGE_KEY =
  'jobtracker_analytics_consent_v1';

export type AnalyticsConsentDecision = 'granted' | 'denied';

let runtimeConsentOverride: AnalyticsConsentDecision | null = null;

export function getAnalyticsConsent(): AnalyticsConsentDecision | null {
  if (typeof window === 'undefined') return null;
  if (runtimeConsentOverride !== null) return runtimeConsentOverride;

  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === 'granted';
}

export function saveAnalyticsConsent(
  decision: AnalyticsConsentDecision,
): boolean {
  if (typeof window === 'undefined') return false;

  runtimeConsentOverride = decision;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, decision);
    runtimeConsentOverride = null;
    return true;
  } catch {
    return false;
  }
}

export function clearGoogleAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;

  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter(
      (name) =>
        name === '_ga' ||
        name.startsWith('_ga_') ||
        name === '_gid' ||
        name.startsWith('_gat'),
    );
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
  }
}
