'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export function SkillsAnalytics() {
  useEffect(() => {
    trackEvent('view_skills');
  }, []);

  return null;
}
