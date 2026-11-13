import 'server-only';

import type { User } from '@supabase/supabase-js';
import { createAdminClient } from '@/utils/supabase/admin';
import { classifyUsers } from './user-metrics';
import type { UserMetrics } from './types';

const USERS_PAGE_SIZE = 1000;
const MAX_USER_PAGES = 100;

export async function fetchAuthUsers(): Promise<User[]> {
  const supabase = createAdminClient();
  const users: User[] = [];

  for (let page = 1; page <= MAX_USER_PAGES; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: USERS_PAGE_SIZE,
    });

    if (error) throw error;

    users.push(...data.users);

    if (data.users.length < USERS_PAGE_SIZE) break;
  }

  return users;
}

export async function fetchUserMetrics(days: number): Promise<UserMetrics> {
  const users = await fetchAuthUsers();
  return classifyUsers(users, days);
}
