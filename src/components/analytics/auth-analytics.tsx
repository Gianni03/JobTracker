'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export function AuthAnalytics() {
  useEffect(() => {
    try {
      const intent = window.sessionStorage.getItem('auth_intent');
      if (!intent) return;

      window.sessionStorage.removeItem('auth_intent');
      trackEvent('login', { method: intent });
    } catch {
      // sessionStorage can be unavailable in restricted browser contexts.
    }
  }, []);

  return null;
}
