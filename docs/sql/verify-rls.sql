-- Read-only RLS verification. Run in the Supabase SQL editor.
-- This script does not change data or policies.
--
-- Expected checklist:
--   1. applications has SELECT, INSERT, UPDATE and DELETE policies owned by auth.uid().
--   2. application_events has SELECT, INSERT and DELETE policies owned by auth.uid().
--   3. Both tables have row level security enabled AND forced.
--   4. The policies use auth.uid() = user_id (never a client-supplied id).
--   5. The anon role has no direct access beyond the policies.

-- 1) Policies per table
select
  tablename,
  policyname,
  cmd,
  roles,
  qual as using_expression,
  with_check as with_check_expression
from pg_policies
where schemaname = 'public'
  and tablename in ('applications', 'application_events')
order by tablename, cmd, policyname;

-- 2) RLS enabled and forced
select
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as rls_forced
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('applications', 'application_events')
order by c.relname;

-- 3) Table grants: authenticated should be able to use the table only
--    through RLS; anon should not have broad access.
select
  table_name,
  grantee,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('applications', 'application_events')
order by table_name, grantee, privilege_type;

-- 4) Optional spot check: every row is owned by a real auth user.
--    This query is safe to run but may be slow on a very large table.
select count(*) as orphaned_applications
from public.applications a
left join auth.users u on u.id = a.user_id
where u.id is null;
