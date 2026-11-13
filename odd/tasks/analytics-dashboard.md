# Feature: Internal usage analytics dashboard

Branch: `feat/analytics-dashboard`. Delivery: PR to `main`.
Test runner: `pnpm test` (Vitest), plus `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Specs

### S1 — Hidden, protected page

- `/analytics` is reachable only by typing the URL; it is not linked from the sidebar, header, footer or any dashboard page.
- Unauthenticated users and authenticated users whose email is not in `ANALYTICS_ALLOWED_EMAILS` receive a 404 via `notFound()`.
- The allowlist fails closed when the env var is missing or empty.
- The auth check runs before any service-role or GA4 data fetch.
- The page is `noindex` and dynamic (`force-dynamic`).

### S2 — User metrics

- Source: Supabase Auth Admin API (`auth.admin.listUsers`), paginated.
- Shows total registered users, active users (last sign-in inside the selected range), inactive users, users who never signed in, and new users (created inside the selected range).
- Definitions are visible in the UI; persistent sessions are called out as a possible underestimation.

### S3 — Application metrics

- Source: Supabase `applications` aggregated with the service role key, paginated with a stable order.
- Shows total, in-range, interviews, offers, interview rate, offer rate, users with applications, average per user, status distribution, platform distribution, top companies and a daily series.
- Interview = status `Entrevista`/`Oferta` or non-null `interview_stage`.
- Offer = status `Oferta` or non-null `offer_stage`.

### S4 — GA4 traffic and audience

- Source: Google Analytics 4 Data API, server-side.
- Shows active users, new users, sessions, page views, engagement, average session duration, active now (Realtime), active 1/7/28 days, countries, traffic sources, devices and tracked product events.
- Current period is compared with an equal-length previous period.
- Standard reports end yesterday; Realtime covers “now”.

### S5 — Range selector

- 7, 28 or 90 days via `?range=`.
- Invalid values fall back to 28.
- All Supabase and GA4 queries use the same selected range where applicable.

### S6 — Secret isolation

- `SUPABASE_SERVICE_ROLE_KEY` and GA4 credentials are used only in server-only modules.
- `server-only` guards on the Supabase admin client and the GA4 client.
- No secret uses a `NEXT_PUBLIC_` prefix.
- No PII (emails, user IDs) is rendered; only aggregates.

### S7 — Graceful degradation

- Missing GA4 env vars or a failed GA4 request render a setup/error card while Supabase metrics still render.
- A failed Supabase admin query renders an unavailable card instead of crashing the route.

### S8 — Tests and docs

- Pure metric functions are unit tested, including cutoff, empty input, tie-break and fallback cases.
- `docs/ANALYTICS.md` documents access, GA4 setup, env vars, definitions, limitations and verification.

## Tasks

| ID | Spec | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S2, S3, S5, S8 | inline | done | `src/lib/analytics/{types,user-metrics,application-metrics}.ts` + tests |
| T2 | S2, S3, S4, S6 | inline | done | `src/lib/analytics/{users,applications,ga4}.ts`, `src/utils/supabase/admin.ts` |
| T3 | S1, S4, S7 | inline | done | `src/app/analytics/page.tsx`, `src/components/analytics/*` |
| T4 | S6, S8 | inline | done | `server-only`, `google-auth-library`, `docs/ANALYTICS.md` |
| T5 | all | delegated verify | done | independent verifier pass, no blockers |

## Log

### L1 — Request (verbatim)

> creo que quiero las dos cosas, porque tambien me interesa sabes sobre cantidad de usuarios, activos, inactivos, de donde son, mas las metricas de aplicaciones...

Prior context: the user asked for an in-app usage stats page, no admin role, reachable via a manual URL like `/analytics` with no link in the app.

### L2 — Implementation notes

- Kept pure metric logic separate from server fetch modules so it is testable without importing `server-only`.
- Supabase user data comes from the Auth Admin API; there is no `profiles` table.
- Application aggregation uses the service role because RLS intentionally blocks cross-user reads.
- GA4 uses `google-auth-library` plus the REST Data API (not gRPC) to keep the server bundle simple and avoid gRPC issues.
- The page lives outside `/dashboard`; it checks the session itself because it does not inherit the dashboard layout guard.

### L3 — Decisions

- Access control is an email allowlist, not a hidden URL. The URL is unlinked, but the allowlist is the actual gate; unauthorized users get 404 to avoid confirming the route.
- “Active” means `last_sign_in_at` inside the selected range. “Inactive” includes never-signed-in users, shown separately.
- GA4 events are only a floor because they depend on analytics consent; this is stated in the UI and docs.
- The dashboard is not linked anywhere; the only navigation link on the page goes back to `/dashboard`.

### L4 — Verification evidence

- `pnpm typecheck`: pass.
- `pnpm test`: 14 files, 85 tests passing.
- `pnpm lint`: pass.
- `pnpm build`: pass; `/analytics` is dynamic (`ƒ`).
- Independent verifier: pass, no blockers. Advisories addressed: direct `server-only` guards, `.catch` around GA4, edge-case regression tests, stable pagination tiebreaker.
- Scratch copy used by the verifier removed from `/tmp`.

### L5 — Delivery

- Feature branch created from `origin/main`.
- Commits are split into dependencies, dashboard + tests, and docs.
- PR targets `main`; merge and production deployment remain human decisions.

### L6 — Pending human steps

- Add `ANALYTICS_ALLOWED_EMAILS` to Vercel Production.
- Confirm `GA4_PROPERTY_ID`, `GA4_CLIENT_EMAIL` and `GA4_PRIVATE_KEY` in Vercel Production.
- Merge the PR to deploy to production, then verify `/analytics` with the exact allowlisted email.
