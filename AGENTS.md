# Project Status: JobTracker - MVP Finalizado ✅

## Overview

JobTracker es una aplicación Next.js diseñada para gestionar postulaciones laborales de manera inteligente. Incluye un dashboard completo, seguimiento de postulaciones, visualización de estadísticas y filtrado por rangos de fecha.

## Current State

La aplicación ha alcanzado el estado de **MVP (Minimum Viable Product) Completado**.

- **Frontend**: UI profesional y responsiva con soporte para modo oscuro. Dashboard funcional con filtros integrados.
- **Backend**: Integración total con **Supabase** para persistencia de datos y autenticación.
- **Auth**: Flujo de autenticación real (Login, Registro, Recuperación de contraseña) implementado con Supabase Auth y Middleware de protección de rutas.
- **Filtros y Métricas**: Sistema de filtrado por rango de fechas (30 días, 3 meses, 6 meses, 1 año, personalizado) operativo en el dashboard y estadísticas.

## Architecture & Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **UI/Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Visualización**: [Recharts](https://recharts.org/) (Componentes desacoplados y orientados a datos)
- **Utilidades**: `date-fns` para manipulación de fechas, `canvas-confetti` para feedback visual de progreso.

## Folder Structure

```text
src/
├── app/                  # App Router: Layouts, Pages y CSS Global
│   ├── auth/             # Rutas y acciones de autenticación
│   ├── dashboard/        # Área protegida (Data fetching en Servidor)
│   │   ├── applications/ # CRUD de postulaciones
│   │   ├── statistics/   # Estadísticas y gráficos
│   │   └── settings/     # Perfil y configuración (En progreso)
├── components/           # Componentes UI
│   ├── charts/           # Gráficos de Recharts (Props-based)
│   ├── dashboard/        # Componentes complejos (Tablas, Filtros, Formularios)
│   └── ui/               # Componentes base (Shadcn)
├── lib/                  # Lógica de negocio y definiciones
│   ├── actions.ts        # Server Actions (CRUD, Auth)
│   ├── data.ts           # Fetching desde Supabase (Server-side)
│   ├── definitions.ts    # Tipos e interfaces de TypeScript
│   └── date-utils.ts     # Lógica de filtrado de fechas
└── utils/                # Clientes de Supabase y Middleware
```

## Cambios Recientes (Finalización MVP)

1.  **Filtros de Fecha**: Implementación de `DateRangeFilter` que permite segmentar métricas en el Dashboard y Estadísticas.
2.  **Etapas Dinámicas**:
    - **Entrevistas**: Agregadas etapas específicas (Recruiter, Screening, Técnica, etc.).
    - **Ofertas**: Agregadas etapas de análisis (Análisis, Aceptada, Rechazada).
    - **Auto-población**: El formulario selecciona automáticamente la etapa inicial al cambiar el estado.
3.  **Feedback Visual**: Integración de Confetti y Toasts para celebrar hitos (paso a entrevista u oferta).
4.  **Estadísticas Reales**: Gráficos de Sankey, Pie y Barras ahora consumen datos reales filtrados.
5.  **Robustez de Auth**: Implementación de `signOut`, recuperación de contraseña y flujo de registro con perfiles automáticos.

## Roadmap Post-MVP

### Próximos Steps: Mejoras y New Features

- [ ] **AI Analyzer Integration**: Re-integrar el analizador de feedback usando Genkit para analizar descripciones y feedback de reclutadores.
- [ ] **Sincronización de Perfil**: Permitir al usuario editar su metadata (nombre, avatar) desde `/dashboard/settings`.
- [ ] **Exportación de Datos**: Opción para descargar el historial de postulaciones en CSV o PDF.
- [ ] **Notificaciones**: Sistema de recordatorios para entrevistas próximas.
- [ ] **Mobile App**: Explorar versión minimalista con PWA.

### Bugfixing y Optimización

- [ ] **Refactor de Tipos**: Eliminar los últimos `any` en `ApplicationForm.tsx` y `actions.ts`.
- [ ] **UX (Loading States)**: Implementar `loading.tsx` con Skeletons en todas las rutas del dashboard.
- [ ] **Manejo de Errores**: Crear páginas `error.tsx` robustas para interceptar fallos de red o base de datos.
- [ ] **Testing**: Implementar tests unitarios para `date-utils.ts` y tests de integración para Server Actions críticos.

## Deuda Técnica

- **Seguridad RLS**: Realizar una auditoría completa de las políticas de Row Level Security en Supabase para asegurar aislamiento total entre usuarios.
- **Validación Zod**: Sincronizar estrictamente el schema de Zod con el modelo de datos de Supabase.

# Plan de Acción Post-MVP (Roadmap de Ejecución)

El desarrollo se organizará en 4 fases secuenciales, priorizando la estabilidad y corrección de errores antes de nuevas funcionalidades complejas.

## 📅 Fase 1: Quick Wins & Fixes (Prioridad Alta)

_Objetivo: Eliminar bugs visuales/funcionales y pulir la UX inmediata._

1.  **Bug Menu Mobile**:
    - El menú lateral (`Sheet`) debe cerrarse automáticamente al hacer clic en un enlace de navegación.✅
2.  **UX Inputs Salarios**:
    - Eliminar el `0` inicial por defecto. El campo debe mostrarse vacío (placeholder) si el valor es 0 o nulo.✅
3.  **Traducciones (Contact Info)**:
    - Traducir etiquetas restantes en el formulario (Phone, Address, City, State, Zip Code, Contact Info).✅
4.  **Mejora Date/Time Picker (Entrevistas)**:
    - **Formato**: Cambiar selector de hora a formato **24 horas**.
    - **Intervalos**: Restringir los minutos a incrementos de **15 minutos** (00, 15, 30, 45).
5.  **Bug Zona Horaria en Tabla**:
    - Corregir la visualización de la "Fecha de Entrevista" en la tabla de postulaciones. Actualmente muestra la hora desplazada (probablemente UTC) en lugar de la hora local seleccionada por el usuario.✅

## 🎨 Fase 2: Contenido y Estilo (Polish)

_Objetivo: Que la web se sienta "llena" y terminada visualmente._

1.  **Sección Recursos**:
    - Completar el contenido estático de las tabs faltantes (CV Templates, Interview Tips, Networking, etc.).✅
2.  **Refinamiento de Gráficos**:
    - Ajustar estilos de Tooltips en Recharts para mejorar contraste en modo Dark/Light.

### Fase 2: Contenido y Estilo (Polish) - Completados ✅

[x] Permitir la opción de recordar usuario en el login, para no logearse cada vez que se abre la web - Implementado checkbox "Recordarme" en el formulario de login - Supabase ya persiste sesiones por defecto (cookies HTTP-only de 7 días)

[x] Crear componente reutilizable ResourceCard - Componente mejorado con soporte para enlaces externos - Prop `isExternal` para diferenciar enlaces internos/externos - Iconos diferenciados (ArrowRight vs ExternalLink) - Apertura en nueva pestaña para enlaces externos

[ ] Pulir Gráficos: Revisar colores y tooltips de Recharts para mejorar la legibilidad en Dark Mode.

## 🗄️ Fase 3: Mejora en Lógica de Salarios (Base de Datos)

_Objetivo: Soportar datos más reales y flexibles._

1.  **Frecuencia de Pago**:
    - Agregar columna `salary_frequency` en BD (enum: 'hour', 'month', 'year').
    - Agregar selector en la UI del formulario.
2.  **Inputs Numéricos**:
    - Mantener el campo como numérico para las estadísticas, pero evaluar agregar campos de rango si es estrictamente necesario (actualmente se prioriza la frecuencia).

## ✨ Fase 4: Nueva Feature "View vs Edit" (Cambio Estructural)

_Objetivo: Separar la experiencia de lectura de la de edición._

1.  **Vista de Detalle (`/applications/[id]`)**:
    - Nueva página para visualizar la postulación en modo lectura (estilo Job Description).
    - Edición rápida de "Estado" y "Etapa" desde esta vista.
2.  **Refactor de Edición**:
    - Mover el formulario completo a `/applications/[id]/edit`.
    - Agregar botón de "Editar" (lápiz) en la tabla de postulaciones.

---
