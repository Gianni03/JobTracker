# Project Status: JobTracker

## Overview

JobTracker is a Next.js application designed to manage job applications intelligently. It includes a dashboard, job tracking, statistics visualization, and an AI-powered feedback analyzer.

## Current State

The application is in an **MVP / Integration** state.

- **Frontend**: Fully functional UI with responsive layouts and dark mode support. Refactored main dashboard and application pages to use **Server Components** for efficient data fetching.
- **Backend/Logic**: Integrated with **Supabase**. Real data is now fetched and mapped from the `applications` table.
- **Auth**: Partially integrated with Supabase (middleware and server actions ready). Currently uses a shared `user` mock in `lib/definitions.ts` for UI consistency.

## Architecture & Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **UI/Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) + [Google AI (Gemini)](https://ai.google.dev/)
- **Charts**: [Recharts](https://recharts.org/) (Refactored as pure UI components)

## Folder Structure

```text
src/
├── app/                  # App Router: Layouts, Pages, and Global CSS
│   ├── dashboard/        # Main application protected area (Server Components)
│   │   ├── applications/ # Job application management (list, new, edit)
│   │   └── statics/      # Statistics and charts
├── components/           # UI Components
│   ├── charts/           # Pure UI charts (Props-based)
│   ├── dashboard/        # Dashboard-specific components (Table, FilterableTable, Form)
│   └── layout/           # Sidebar (Client Component), Header
├── lib/                  # Server-side logic and Shared Definitions
│   ├── data.ts           # Server-only Supabase fetching and mapping
│   ├── definitions.ts    # TS interfaces + Shared constants/mocks (Safe for Client/Server)
│   └── actions.ts        # Server Actions (CRUD & AI)
└── utils/                # Supabase helpers (Client, Server, Middleware)
```

## Design Patterns

- **Server-First Data Fetching**: Main pages fetch data server-side and pass it to interactive client components.
- **Data Mapping Layer**: Flat database results are transformed into nested TypeScript entities in `lib/data.ts`.
- **Client/Server Separation**: Strict separation of server-only modules (`next/headers`) from client components by placing shared mocks in `definitions.ts`.

## Roadmap de Integración (Actualizado)

### Fase 1: El Motor (Infraestructura de Datos)

- [x] **Configuración de Supabase**: Crear proyecto, tablas de `profiles` y `applications`.
- [ ] **Auth Real**: Reemplazar mocks en `AuthForm` por Supabase Auth.
- [x] **Middleware de Protección**: Bloquear `/dashboard/*` si no hay sesión activa.

### Fase 2: CRUD de Postulaciones

- [x] **Migración de Mock a DB**: Crear Server Actions reales para `getApplications`, `createApplication`, y `updateApplication`.
- [x] **Filtro por UserID**: Asegurar que cada usuario solo vea sus propios datos (Implementado en `getApplicationById`).
- [x] **Hydration del Dashboard**: Reemplazar imports de mocks por llamadas asíncronas a la DB en Server Components.

### Fase 3: Inteligencia y Pulido

- [ ] **Genkit Persistence**: Guardar los análisis de feedback en la DB vinculados a la postulación.
- [x] **Estadísticas Reales**: Conectar los gráficos (`Sankey`, `Pie`) a los datos reales de Supabase (Refactor prop-based).
- [ ] **Refactor de Tipos**: Eliminar los `any` en `ApplicationForm.tsx` con la nueva definición de Supabase.


## Estado de las Fases

### Fase 1: Cimientos (100% Completado) ✅
- [x] Configuración de Next.js 15 y Tailwind CSS.
- [x] Conexión inicial con Supabase (Client, Server y Middleware).
- [x] Middleware de protección de rutas (Auth Guard).
- [x] Estabilización del esquema de base de datos (Tabla `applications` y limpieza de FKs).

### Fase 2: Lógica Core & Hidratación (90% Completado) 🏗️
- [x] **Identidad Real**: El `DashboardLayout` obtiene el usuario de la sesión de Supabase.
- [x] **Sidebar Dinámico**: Ya no usa datos estáticos; muestra nombre, email y avatar del usuario logueado.
- [x] **Auth Mejorado**: 
    - [x] Implementación de `signOut` vía Server Action.
    - [x] Botón "Enter" funcional en formularios de login.
    - [x] Flujo de "Olvidé mi contraseña" (Página + Acción de reset).
- [x] **Lectura de Datos**: `fetchUserApplications` y `getApplicationById` funcionando con mapeo de objetos anidados (`salary`, `contact`).
- [ ] **Escritura (CRUD)**: Conectar el `ApplicationForm` con las Server Actions de `create` y `update` (Pendiente integración final en UI).

### Fase 3: Inteligencia y Pulido (En progreso) 🧠
- [ ] **Persistencia Genkit**: Guardar los análisis de IA en la base de datos.
- [x] **Componentes UI de Estadísticas**: Refactorizados para recibir datos por props (Sankey, Pie, etc.).
- [ ] **Refactor de Tipos**: Eliminar los remanentes de `any` en los formularios usando las nuevas definiciones.
- [ ] **Feedback Visual**: Implementar `loading.tsx` y esqueletos para mejorar la percepción de velocidad.

## Deuda Técnica & Próximos Pasos
1.  **Conexión Final de Formulario**: Hacer que al darle "Guardar" en una nueva postulación, los datos lleguen a Supabase.
2.  **Validación de RLS**: Verificar en el dashboard de Supabase que las políticas impidan que un usuario vea datos de otro.
3.  **Manejo de Errores en UI**: Reemplazar los `console.log` por Toasts o mensajes de error visibles en el login/registro.

## Pruebas Futuras & Consideraciones

1. **Flujo de Auth Completo**: Probar el registro y login con usuarios reales y verificar la creación automática de perfiles.
2. **Robustez de Server Actions**: Verificar que `createApplication` y `updateApplication` manejen correctamente las transacciones y revalidación de caché (`revalidatePath`).
3. **Escalabilidad de Estadísticas**: Probar los gráficos con grandes volúmenes de datos para asegurar el rendimiento de los cálculos en el cliente.
4. **Manejo de Errores**: Implementar `error.tsx` y `loading.tsx` (Suspense) en las rutas del dashboard para una mejor UX durante la carga de datos.
5. **RLS (Row Level Security)**: Verificar en el dashboard de Supabase que las políticas de seguridad impidan el acceso cruzado de datos entre usuarios.
