import type { UserMetrics } from './types';

const DAY_MS = 24 * 60 * 60 * 1000;

export type UserActivity = {
  created_at: string;
  last_sign_in_at?: string | null;
};

/**
 * `active` means the user signed in at least once inside the selected window.
 * `inactive` includes users who never signed in, which are also reported
 * separately as `neverSignedIn`.
 */
export function classifyUsers(
  users: UserActivity[],
  days: number,
  now = new Date(),
): UserMetrics {
  const cutoff = new Date(now.getTime() - days * DAY_MS);

  let active = 0;
  let neverSignedIn = 0;
  let newUsers = 0;

  for (const user of users) {
    if (user.last_sign_in_at) {
      if (new Date(user.last_sign_in_at) >= cutoff) active += 1;
    } else {
      neverSignedIn += 1;
    }

    if (new Date(user.created_at) >= cutoff) newUsers += 1;
  }

  return {
    total: users.length,
    active,
    inactive: users.length - active,
    neverSignedIn,
    newUsers,
  };
}
