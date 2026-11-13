import 'server-only';

import { createClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client that uses the service role key.
 *
 * Never import this module from a Client Component. It bypasses Row Level
 * Security and is only meant for aggregate admin metrics behind the
 * /analytics allowlist.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY para calcular las métricas.',
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
