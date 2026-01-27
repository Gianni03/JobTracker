# Auditoría del Proyecto: JobTracker

Este documento detalla el estado actual del proyecto, la estructura de archivos, las modificaciones recientes realizadas para estabilizar la aplicación y los "caminos técnicos" que requieren atención inmediata.

## Estructura de Archivos Actual

```text
src/
├── app/                  # App Router de Next.js
│   ├── auth/             # Acciones de autenticación de Supabase
│   ├── dashboard/        # Área protegida (utiliza Server Components para data)
│   │   ├── applications/ # Gestión de postulaciones (listado, creación, edición)
│   │   ├── analyzer/     # Analizador de Feedback con IA
│   │   ├── statics/      # Estadísticas y gráficos
│   │   ├── settings/     # Perfil de usuario (actualmente estático)
│   │   └── layout.tsx    # Layout del dashboard con Sidebar
│   ├── layout.tsx        # Layout raíz
│   └── page.tsx          # Landing / Login
├── components/           # Componentes de UI
│   ├── charts/           # Gráficos (Sankey, Pie, Line, Progress) - Refs data-driven
│   ├── dashboard/        # Tablas, Filtros y Formularios complejos
│   └── layout/           # Sidebar y Header
├── lib/                  # Lógica compartida
│   ├── data.ts           # Fetching desde Supabase (SEGURO PARA SERVIDOR)
│   ├── definitions.ts    # Typescript Interfaces + Mocks seguros (Cliente/Servidor)
│   └── actions.ts        # Server Actions para CRUD
└── utils/                # Utilidades de Supabase (Cliente, Servidor, middleware)
```

## Modificaciones Recientes (Estabilización)

Se realizaron cambios críticos para integrar Supabase sin romper la experiencia de usuario ni causar errores de compilación:

1.  **Mapeo de Datos en `lib/data.ts`**: Se implementó una capa de transformación que convierte las columnas planas de Supabase (ej: `salary_desired`) en los objetos anidados que espera el frontend (`salary: { desired: ... }`).
2.  **Refactor a Server Components**: Las páginas de `/dashboard/applications` y `/dashboard/statics` ahora son asíncronas. Obtienen los datos directamente desde el servidor y los pasan a componentes de cliente interactivos.
3.  **Segregación de Dependencias**: El mock del usuario se movió a `definitions.ts`. Esto resolvió el error `next/headers` que ocurría cuando componentes de cliente (como el Sidebar) intentaban importar indirectamente utilidades del servidor.
4.  **Gráficos Data-Driven**: Se eliminó la dependencia de datos mock directos en los componentes de Recharts. Ahora todos reciben los datos por `props`, permitiendo que el Dashboard muestre información real.

## Puntos Críticos y Deuda Técnica ("Mal Camino")

A pesar de que la aplicación funciona, existen riesgos y fallas en la arquitectura actual que deben corregirse:

### 1. Inconsistencia en la Información del Usuario ⚠️

- **Falla**: El Sidebar y la página de Settings muestran datos de un usuario mock (`Gianni Example`) a pesar de que el usuario real está logueado por Supabase.
- **Riesgo**: Confusión del usuario y falta de personalización real.
- **Solución**: El Layout del dashboard debe pasar la metadata del usuario (`user_metadata`) obtenida de `supabase.auth.getUser()` a los componentes de cliente.

### 2. Seguridad en las Consultas (RLS) 🔐

- **Falla**: Algunas funciones en `lib/data.ts` ya filtran por `user_id`, pero se debe asegurar que las políticas de Row Level Security en Supabase estén activas para evitar que un usuario manipule IDs de otros vía consola o API.

### 3. Tipado Débil en Formularios (`any`) 🩹

- **Falla**: En `ApplicationForm.tsx`, se están usando casts de `any` para el `resolver` de Zod y el `handleSubmit`.
- **Riesgo**: Errores en tiempo de ejecución si cambia el esquema de datos de la base de datos sin actualizar el formulario.

### 4. Flujo de Autenticación "Ciego" 📧

- **Falla**: El formulario de Auth (`AuthForm`) maneja errores imprimiendo en consola (`console.log`), pero no muestra nada al usuario si el login falla (ej: contraseña incorrecta).
- **Solución**: Conectar los resultados de las Server Actions de auth con `react-hook-form` o mostrar un Toast descriptivo.

### 5. Falta de Estados de Carga (UX) ⏳

- **Falla**: Al navegar entre secciones del dashboard, la app puede parecer "congelada" mientras el servidor responde las queries.
- **Solución**: Implementar archivos `loading.tsx` con esqueletos (Skeletons) para mejorar el Feedback visual.

## Próximos Pasos Recomendados

1.  **Sincronizar el Perfil**: Reemplazar el `user` mock en `definitions.ts` por una llamada real en el layout superior.
2.  **Validación de CRUD**: Probar el flujo completo de `Crear -> Editar -> Borrar` una postulación y verificar que los gráficos se actualicen al instante (usando `revalidatePath`).
3.  **Manejo de Errores en Auth**: Añadir visualización de errores en el login/register.
