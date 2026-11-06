-- Application event history used by the detail-page timeline.
-- Run this in the Supabase SQL editor before relying on recorded history.
-- The app degrades gracefully (derived timeline) until it is applied.
--
-- Verify afterwards with:
--   select * from pg_policies
--   where schemaname = 'public' and tablename = 'application_events';

create table if not exists public.application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null
    references public.applications(id) on delete cascade,
  user_id uuid not null
    references auth.users(id) on delete cascade,
  type text not null check (
    type in (
      'created',
      'status_changed',
      'interview_scheduled',
      'offer_received',
      'feedback_updated'
    )
  ),
  from_status text,
  to_status text,
  detail text,
  created_at timestamptz not null default now()
);

create index if not exists application_events_application_created_idx
  on public.application_events (application_id, created_at);

alter table public.application_events enable row level security;
alter table public.application_events force row level security;

drop policy if exists "application_events_select_own"
  on public.application_events;
drop policy if exists "application_events_insert_own"
  on public.application_events;
drop policy if exists "application_events_delete_own"
  on public.application_events;

create policy "application_events_select_own"
  on public.application_events
  for select
  using (auth.uid() = user_id);

create policy "application_events_insert_own"
  on public.application_events
  for insert
  with check (auth.uid() = user_id);

create policy "application_events_delete_own"
  on public.application_events
  for delete
  using (auth.uid() = user_id);
