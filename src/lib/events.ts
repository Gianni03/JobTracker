import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  ApplicationEventType,
  ApplicationStatus,
} from '@/lib/definitions';

export type ApplicationEventInput = {
  applicationId: string;
  type: ApplicationEventType;
  fromStatus?: ApplicationStatus;
  toStatus?: ApplicationStatus;
  detail?: string;
};

/**
 * Best-effort event recording. The app keeps working before the
 * application_events migration is applied, so a missing table is expected
 * and must not break the mutation that triggered the event.
 */
export async function recordApplicationEvent(
  supabase: SupabaseClient,
  userId: string,
  event: ApplicationEventInput,
): Promise<void> {
  const { error } = await supabase.from('application_events').insert([
    {
      user_id: userId,
      application_id: event.applicationId,
      type: event.type,
      from_status: event.fromStatus ?? null,
      to_status: event.toStatus ?? null,
      detail: event.detail ?? null,
    },
  ]);

  if (error && error.code !== '42P01' && error.code !== 'PGRST205') {
    console.error('Error recording application event:', error);
  }
}
