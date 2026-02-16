# Estructura del Proyecto - JobTracker

Este documento proporciona una visión general de la jerarquía de carpetas y archivos del proyecto **JobTracker (Offer Ready)**, junto con una breve descripción de su propósito.

## 📂 Directorios Principales

### 📁 `/` (Raíz)

Archivos de configuración y gestión del proyecto.

- `next.config.ts`: Configuración principal de Next.js.
- `tailwind.config.ts`: Configuración de estilos y temas de Tailwind CSS.
- `tsconfig.json`: Configuración de TypeScript.
- `package.json`: Definición de dependencias y scripts de npm.
- `middleware.ts`: Middleware de Next.js para manejo de sesiones y redirecciones.
- `components.json`: Configuración de componentes (Shadcn UI).
- `PROJECT_AUDIT.md`: Auditoría del estado actual del proyecto.
- `README.md`: Documentación inicial para desarrolladores.
- `AGENTS.md`: Instrucciones y contexto para agentes de IA (como Antigravity).

---

### 📁 `src/`

Contiene el código fuente principal de la aplicación.

#### 📁 `src/app/`

Utiliza el **App Router** de Next.js para definir las rutas y vistas.

- `layout.tsx`: Layout principal que envuelve toda la aplicación (Navbar, Footer, etc.).
- `page.tsx`: Página de inicio (Landing/Home).
- `globals.css`: Estilos CSS globales.
- `dashboard/`: Vistas relacionadas con el panel de control del usuario.
- `auth/`: Rutas para autenticación (login, registro).
- `forgot-password/`: Flujo de recuperación de contraseña.

#### 📁 `src/components/`

Componentes de React organizados por funcionalidad.

- `ui/`: Componentes básicos y reutilizables (Botones, Inputs, Modales) basados en Shadcn UI.
- `layout/`: Componentes estructurales como Header, Footer y Sidebar.
- `charts/`: Componentes de visualización de datos (Sankey, Funnel, Gráficos mensuales).
- `dashboard/`: Componentes específicos para la vista del dashboard.
- `auth/`: Formularios y elementos relacionados con la autenticación.
- `theme-provider.tsx`: Contexto para la gestión de temas (Claro/Oscuro).

#### 📁 `src/lib/`

Lógica de apoyo y utilidades del lado del servidor.

- `actions.ts`: **Server Actions** para interactuar con la base de datos (Supabase).
- `data.ts`: Funciones para la obtención de datos (Queries).
- `definitions.ts`: Interfaces y tipos de TypeScript para el dominio del proyecto.
- `date-utils.ts`: Utilidades para formateo y manejo de fechas.
- `utils.ts`: Funciones auxiliares genéricas (ej. mezcla de clases de Tailwind).

#### 📁 `src/utils/`

Configuraciones externas y drivers.

- `supabase/`: Lógica de inicialización del cliente de Supabase (Server, Client y Middleware).

#### 📁 `src/hooks/`

Hooks personalizados de React.

- `use-toast.ts`: Manejo de notificaciones flotantes.
- `use-mobile.tsx`: Detección de dispositivos móviles para ajustes de UI responsive.

#### 📁 `src/ai/`

Módulo para integraciones de Inteligencia Artificial.

- `genkit.ts`: Configuración de Firebase Genkit.
- `flows/`: Definición de flujos de trabajo de IA.

---

### 📁 `docs/`

Documentación técnica y estratégica.

- `blueprint.md`: Plan maestro del proyecto.
- `agileBreackdown.md`: Desglose de tareas y metodología ágil.
- `AGENTS.md`: Copia de instrucciones para asistentes.
- `legacy/`: Archivos de documentación de versiones anteriores.

---

## 🌳 Árbol de Directorios (Resumido)

```text
.
├── docs/                   # Documentación estratégica
├── src/
│   ├── ai/                # Integraciones de IA
│   ├── app/               # Rutas y páginas (Next.js 15)
│   ├── components/        # Componentes de UI
│   │   ├── charts/        # Gráficos y estadísticas
│   │   ├── layout/        # Estructura (Header/Footer)
│   │   └── ui/            # Componentes base (Shadcn)
│   ├── hooks/             # Hooks de React
│   ├── lib/               # Server Actions y lógica de datos
│   └── utils/             # Configuración de Supabase
├── tailwind.config.ts      # Estilos
├── next.config.ts          # Configuración Next.js
└── package.json            # Dependencias
```
