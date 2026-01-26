# Project Status: JobTracker

## Overview

JobTracker is a Next.js application designed to manage job applications intelligently. It includes a dashboard, job tracking, statistics visualization, and an AI-powered feedback analyzer.

## Current State

The application is in an **MVP / Development** state.

- **Frontend**: Fully functional UI with responsive layouts and dark mode support.
- **Backend/Logic**: Uses Next.js Server Actions and Genkit for AI. Data is currently mocked.
- **Auth**: Mocked via a placeholder `AuthForm` and client-side redirection.

## Architecture & Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI/Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) (Radix UI Primitives)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) + [Google AI (Gemini)](https://ai.google.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## Folder Structure

```text
src/
├── app/                  # App Router: Layouts, Pages, and Global CSS
│   ├── dashboard/        # Main application protected area
│   │   ├── analyzer/     # AI Feedback Analyzer page
│   │   ├── applications/ # Job application management (list, new, edit)
│   │   ├── resources/    # Interview resources and guides
│   │   ├── settings/     # User preferences
│   │   └── statics/      # Statistics and charts (route: /dashboard/statics)
│   ├── layout.tsx        # Root layout with ThemeProvider and Toaster
│   └── page.tsx          # Landing page with AuthForm
├── components/           # UI Components
│   ├── analyzer/         # AI Feedback Analyzer components
│   ├── auth/             # Login/Signup forms (mocked)
│   ├── charts/           # Recharts wrappers (Sankey, Pie, Line, Bar)
│   ├── dashboard/        # Dashboard-specific components (Table, Form, Cards)
│   ├── layout/           # Shared layout components (Sidebar, Header)
│   ├── resources/        # Resource cards
│   ├── ui/               # Shadcn UI base components
│   └── theme-provider.tsx# Next-Themes provider
├── ai/                   # AI Logic and Genkit Flows
│   └── flows/            # Genkit flow definitions
├── lib/                  # Utilities, Actions, and Mock Data
│   ├── actions.ts        # Server Actions (AI analysis)
│   ├── data.ts           # Mocked application data and user info
│   ├── definitions.ts    # TypeScript interfaces and types
│   └── utils.ts          # Tailwind merge utility
└── hooks/                # Custom React hooks (toast, mobile detection)
```

## Design Patterns

- **Layout Pattern**: Nested layouts for shared UI elements like the Sidebar and Header.
- **Compound Components**: Extensive use of Shadcn/Radix compound patterns for accessible UI.
- **Flow Pattern (Genkit)**: Encapsulated AI logic in Genkit flows for observability and scaling.
- **Action Pattern**: Consolidating logic in Next.js Server Actions for form handling.

## Data Model (Mocked)

- **User**: Profile info (name, email, avatar).
- **Application**:
  - Status: `Aplicado`, `Entrevista`, `Oferta`, `Rechazado`, `Ghosted`.
  - Stages: `Entrevista 1`, `Entrevista 2`, etc.
  - Tracking: Dates, Platform, Links, Contact info, Description, Salary (Desired, Expressed, Offer).
  - AI Feedback: Text received from recruiters + AI analysis.

## Development to Production (Pending Changes)

1. **Authentication**:
   - Replace placeholder `AuthForm` and `LoginForm` with a real provider (e.g., Supabase Auth, Clerk, or NextAuth).
   - Implement route protection (middleware) to ensure `/dashboard` is inaccessible to unauthenticated users.
2. **Database Integration**:
   - Replace `src/lib/data.ts` with database queries (e.g., using Supabase, Prisma, or Drizzle).
   - Update Server Actions in `src/lib/actions.ts` to perform CRUD operations on the database.
3. **AI Services**:
   - Ensure `GENAI_API_KEY` is securely managed in production.
   - Improve error handling and rate limiting for AI flows.
4. **Type Safety**:
   - Resolve environment-specific TypeScript conflicts in `ApplicationForm.tsx` (temporarily using `any` casts for `resolver` and `handleSubmit`).
5. **Route Cleanliness**:
   - Consider renaming `/dashboard/statics` to `/dashboard/statistics` for better clarity (requires folder renaming and navigation updates).

## Key Components

- **`FeedbackAnalyzer`**: Real-time AI analysis of recruiter feedback.
- **`ApplicationsTable`**: Sortable visualization of all active and past applications.
- **`SankeyChart`**: Visual representation of the job application funnel.
- **`ApplicationForm`**: Complex form with conditional fields based on status.

## Roadmap de Integración (Actualizado)

### Fase 1: El Motor (Infraestructura de Datos)
- [ ] **Configuración de Supabase**: Crear proyecto, tablas de `profiles` y `applications`.
- [ ] **Auth Real**: Reemplazar mocks en `AuthForm` por Supabase Auth (Email/Password + Google).
- [ ] **Middleware de Protección**: Bloquear `/dashboard/*` si no hay sesión activa.

### Fase 2: CRUD de Postulaciones
- [ ] **Migración de Mock a DB**: Crear Server Actions reales para `getApplications`, `createApplication`, y `updateApplication`.
- [ ] **Filtro por UserID**: Asegurar que cada usuario solo vea sus propios datos (Row Level Security en Supabase).
- [ ] **Hydration del Dashboard**: Reemplazar `import { applications } from "@/lib/data"` por llamadas asíncronas a la DB.

### Fase 3: Inteligencia y Pulido
- [ ] **Genkit Persistence**: Guardar los análisis de feedback en la DB vinculados a la postulación.
- [ ] **Estadísticas Reales**: Conectar los gráficos (`Sankey`, `Pie`) a los datos reales de Supabase.
- [ ] **Refactor de Tipos**: Eliminar los `any` en `ApplicationForm.tsx` con la nueva definición de Supabase.