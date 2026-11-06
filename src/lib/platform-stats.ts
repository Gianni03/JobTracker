import type { Application } from '@/lib/definitions';

export type PlatformInsight = {
  platform: Application['platform'];
  total: number;
  interviews: number;
  offers: number;
  interviewRate: number;
  responseRate: number;
};

type PlatformGroup = {
  total: number;
  interviews: number;
  offers: number;
  responses: number;
};

export function getPlatformInsights(
  applications: Application[],
): PlatformInsight[] {
  const groups = new Map<Application['platform'], PlatformGroup>();

  for (const application of applications) {
    const group = groups.get(application.platform) ?? {
      total: 0,
      interviews: 0,
      offers: 0,
      responses: 0,
    };

    const hadInterview =
      application.status === 'Entrevista' ||
      application.status === 'Oferta' ||
      Boolean(application.interviewStage) ||
      Boolean(application.interviewDate);

    group.total += 1;
    if (hadInterview) group.interviews += 1;
    if (application.status === 'Oferta') group.offers += 1;
    if (application.status !== 'Aplicado' && application.status !== 'Ghosted') {
      group.responses += 1;
    }

    groups.set(application.platform, group);
  }

  return Array.from(groups.entries())
    .map(([platform, group]) => ({
      platform,
      total: group.total,
      interviews: group.interviews,
      offers: group.offers,
      interviewRate: Math.round((group.interviews / group.total) * 100),
      responseRate: Math.round((group.responses / group.total) * 100),
    }))
    .sort(
      (a, b) => b.total - a.total || a.platform.localeCompare(b.platform),
    );
}
