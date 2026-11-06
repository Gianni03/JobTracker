# Feature: Quick wins + timeline + URL import + salary analytics

Branch: `feat/quick-wins-and-value`. Delivery: single PR slice (ask before push).
Test runner: Vitest (to be added in T1) + `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Specs

Scope source: the user selected "toda la sección de quick wins" plus high-value items 9, 13 (priority) and 14 from the prior list.

### S1 — Settings funcional

The dashboard settings form must persist the user's first and last name and allow changing the password.

- Acceptance: submitting the profile form updates Supabase `user_metadata` (`first_name`, `last_name`, `full_name`) and the sidebar reflects the new name after revalidation.
- Acceptance: submitting a new password (min 8 chars, confirmation must match) updates the Supabase session password and shows a success toast.
- Error states are shown to the user (invalid input, Supabase failure), not only logged to console.

### S2 — Server-side validation, no `any`

All application mutations must validate their input on the server with the same Zod schema used by the form.

- Acceptance: `createApplication` and `updateApplication` accept `unknown`, parse it, and reject invalid payloads (missing company/role, bad status, bad URL, oversized text).
- Acceptance: no `any` cast remains in `application-form.tsx` for the resolver or submit handler.
- Acceptance: the shared schema lives in `src/lib/validation/` and is imported by both client and server.

### S3 — RLS audit deliverable

- Acceptance: a verification SQL + checklist exists in `docs/sql/verify-rls.sql`, covering `applications` and the new `application_events` table.
- Limitation: production RLS cannot be executed from this runtime without Supabase credentials; the deliverable is the SQL to run plus a report of the blocking step.

### S4 — Platform analytics

- Acceptance: statistics page shows a "Rendimiento por plataforma" section with total applications, interviews/offers, and interview rate per platform, sorted by volume.
- Acceptance: uses the existing `platform` field; no schema change.

### S5 — Search, sort and bulk actions

- Acceptance: the applications table can search by company/role, sort by date (newest/oldest), company (A–Z), and status.
- Acceptance: rows can be selected (desktop and mobile) and bulk-updated to a status or bulk-deleted, with confirmation for delete.
- Acceptance: selection clears after a bulk action and the page refreshes.
- Acceptance: all bulk mutations are validated server-side and scoped to `user_id`.

### S6 — Error boundaries and loading states

- Acceptance: a root `error.tsx` and a dashboard `error.tsx` render a recoverable error UI instead of a blank/crashed screen.
- Acceptance: applications, statistics and settings routes render skeleton loading states.
- Acceptance: a root `not-found.tsx` exists.

### S7 — Tests

- Acceptance: Vitest runs in CI via `pnpm test`.
- Acceptance: unit coverage exists for date filtering, status journey, salary normalization/insights, URL import parsing/SSRF guards, and the shared application schema.
- Limitation: CRUD E2E is not runnable without a seeded Supabase test user/project; it is reported as pending, not faked.

### S8 — Auto-ghost without render-time double work

- Acceptance: ghosting is applied with one scoped `UPDATE` (status `Aplicado`, date older than the 14-day cutoff, current user) and each page fetches applications once.
- Acceptance: the cutoff is a pure, tested function.

### S9 — Timeline and status history

- Acceptance: `docs/sql/application-events.sql` creates a per-user event table with RLS and cascade delete.
- Acceptance: create, status change and feedback update record events best-effort; a missing table never breaks the mutation.
- Acceptance: the application detail page shows a timeline; when no events exist, it derives a useful fallback from the application dates/status.
- Acceptance: the app works before the migration is applied (graceful degradation).

### S10 — Quick-add from URL (priority)

- Acceptance: on the new-application page, the user can paste a job URL and get company, role, platform, description and salary prefilled.
- Acceptance: the server fetches only `http/https`, blocks private/loopback/link-local hosts (SSRF), follows at most 3 redirects revalidating each target, uses a 5s timeout, caps response size and requires an HTML content type.
- Acceptance: parsing supports OpenGraph, `<title>` and JSON-LD `JobPosting`; unknown fields are left empty instead of invented.
- Acceptance: the action requires an authenticated user and returns typed errors.
- Acceptance: parser and URL guards have unit tests.

### S11 — Salary analytics

- Acceptance: statistics page shows salary insights by currency using annualized midpoints (hour × 2080, month × 12, year × 1) with the assumption labeled.
- Acceptance: shows desired vs expressed vs offer averages and the offer-to-desired gap when data exists.
- Acceptance: no invented FX conversion across currencies; groups stay per currency.

## Tasks

| ID | Spec | Route | Status | Commit |
| --- | --- | --- | --- | --- |
| T1 | S7 | inline | pending | — |
| T2 | S1, S2 | inline | pending | — |
| T3 | S10 | inline | pending | — |
| T4 | S9 | inline | pending | — |
| T5 | S11, S4 | inline | pending | — |
| T6 | S5, S8 | inline | pending | — |
| T7 | S6, S3 | inline | pending | — |
| T8 | all | inline | pending | — |

## Log

### L1 — Request (verbatim)

> bueno lo que me interesa es toda la seccion de quick wins, de la features de alto valor:los puntos 9, 13 (prioridad) y 14. y despues vemos como seguimos

Referenced scope (from the prior assistant message):

> Quick wins: 1. Settings funcional. 2. Validación Zod en el servidor + matar los `any`. 3. Auditar RLS en producción. 4. Analítica por plataforma. 5. Búsqueda, orden y acciones masivas en la tabla. 6. `error.tsx` + loading states faltantes. 7. Tests de la lógica pura + E2E del CRUD. 8. Sacar `autoMarkAsGhosted` del render.
> Features: 9. Timeline e historial de estados por postulación. 13. Quick-add desde URL (prioridad). 14. Salarios con comparativa real.

### L2 — Implementation notes

- Branch protection requires a PR for `main`; work stays on `feat/quick-wins-and-value` and push/PR are a separate human decision.
- S3 execution and S7 CRUD E2E are environmental blockers, not silently skipped.
- S9 requires the user to apply `docs/sql/application-events.sql` in Supabase; code degrades gracefully until then.
- S11 avoids FX rates because none are available or verifiable; comparisons stay within one currency.
