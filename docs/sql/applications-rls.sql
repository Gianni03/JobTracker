-- Row Level Security for the applications table.
-- Run this in the Supabase SQL Editor.
-- Verify afterwards with:
--   select * from pg_policies where schemaname = 'public' and tablename = 'applications';

alter table public.applications enable row level security;
alter table public.applications force row level security;

drop policy if exists "applications_select_own" on public.applications;
drop policy if exists "applications_insert_own" on public.applications;
drop policy if exists "applications_update_own" on public.applications;
drop policy if exists "applications_delete_own" on public.applications;

create policy "applications_select_own"
  on public.applications
  for select
  using (auth.uid() = user_id);

create policy "applications_insert_own"
  on public.applications
  for insert
  with check (auth.uid() = user_id);

create policy "applications_update_own"
  on public.applications
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "applications_delete_own"
  on public.applications
  for delete
  using (auth.uid() = user_id);
