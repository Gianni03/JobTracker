import 'server-only';

import { createAdminClient } from '@/utils/supabase/admin';
import {
  aggregateApplications,
  type ApplicationMetricRow,
} from './application-metrics';
import type { ApplicationMetrics } from './types';

const ROWS_PAGE_SIZE = 1000;
const MAX_ROW_PAGES = 50;

export async function fetchApplicationMetrics(
  days: number,
): Promise<ApplicationMetrics> {
  const supabase = createAdminClient();
  const rows: ApplicationMetricRow[] = [];

  for (let page = 0; page < MAX_ROW_PAGES; page += 1) {
    const from = page * ROWS_PAGE_SIZE;
    const to = from + ROWS_PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('applications')
      .select(
        'user_id, company, status, platform, date, created_at, interview_stage, offer_stage',
      )
      .order('date', { ascending: true })
      .order('id', { ascending: true })
      .range(from, to);

    if (error) throw error;

    const batch = (data ?? []) as ApplicationMetricRow[];
    rows.push(...batch);

    if (batch.length < ROWS_PAGE_SIZE) break;
  }

  return aggregateApplications(rows, days);
}
