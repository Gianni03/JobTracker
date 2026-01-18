# Contexto del Proyecto: JobTracker AI

## 1. Descripción del Proyecto

Migración de un prototipo UXMagic (HTML/CSS/JS) a una Web App funcional en React. La aplicación es un "Job Tracker" que permite a los usuarios gestionar sus postulaciones laborales, entrevistas, ofertas y estadísticas.

## 2. Tech Stack Objetivo

- **Framework:** Next.js 14+ (App Router).
- **Lenguaje:** TypeScript (Tipado estricto progresivo).
- **Estilos:** Tailwind CSS v4 + Variables CSS nativas (híbrido).
- **Iconos:** Lucide React.
- **Base de Datos:** Supabase (PostgreSQL).
- **Auth:** Supabase Auth `@supabase/ssr`..
- **Estado:** React Hooks / Context API / Zustand (si crece la complejidad).
- **Visualización:** Chart.js (react-chartjs-2) para mantener fidelidad con el diseño original. D3 si es necesario para gráficos complejos.
- **Estrategia:** proxy basado en `createServerClient` con gestión manual de cookies para Next.js 15.

## 3. Estructura de Carpetas

- `/app`: Rutas de la aplicación (Pages). 
  - `app/(public)`: Rutas abiertas (Landing, Login). Sin Sidebar.
  - `app/(dashboard)`: Rutas protegidas. Incluye `DashboardLayout` con Sidebar.
  - `page.tsx`: Landing / Dashboard principal.
  - `layout.tsx`: Layout raíz (contiene fuentes y globals.css).
- `/components`: Bloques de construcción.
  - `/layout`: Sidebar, Header.
  - `/dashboard`: Cards de KPI, Tablas.
  - `/ui`: Componentes atómicos (Botones, Badges).
- `/lib`: Lógica de negocio y clientes (Supabase client).

## 4. Estructura de Navegación (Final)
- `/` -> Landing Page (Pública).
- `/login` -> Login (Público).
- `/dashboard` -> Dashboard principal (Privado).
- `/jobs` -> Listado de trabajos (Privado).

## 5. Estructura de Datos (Schema Tentativo)

Basado en el objeto `jobsDatabase` del script original:

- **Users:** (Manejado por Supabase Auth)
- **Jobs:**
  - id, user_id (FK), company, position, status (applied, interview, offer, rejected, ghosted)
  - date_applied, platform, link, contact_person, reach_method
  - salary_asked, salary_offered, notes, feedback
- **Interviews:** (Relación 1:N con Jobs) - _Fase 2_

## 6. Componentes Clave a Migrar

1.  **Layout:** Sidebar fija + Header móvil + Dark Mode toggle.
2.  **Dashboard:** KPI Cards (Total, Entrevistas, Ofertas) + Tabla de aplicaciones recientes.
3.  **JobForm:** Formulario para Crear/Editar postulaciones (debe manejar lógica condicional de visibilidad).
4.  **Analytics:** Gráficos de Chart.js portados a React.
5.  **Auth:** Pantallas de Login y Registro conectadas a Supabase.

## 7. Reglas de Desarrollo

- **Estilos:** Usar Tailwind CSS nativo. Evitar CSS puro (`styles.css`) a menos que sean animaciones custom no soportadas por Tailwind.
- **Iconos:** Reemplazar SVGs inline por componentes `lucide-react`.
- **Idioma:** Código en inglés, UI en Español (según prototipo).
- **Responsive:** Mantener la fidelidad móvil del prototipo original.

## 8. Estado del Proyecto

- [x] Configuración inicial de Next.js.
- [x] Limpieza de boilerplate.
- [x] Definición de estructura de carpetas.
- [x] Migración de Sidebar (HTML -> React).
- [x] Configuración de Base de Datos Supabase.
- [x] Migración técnica a @supabase/ssr completada.
- [x] proxy de protección de rutas funcionando.
- [ ] Integración de Lógica.

## 9. Glosario para el Desarrollador (Tú)

- **Componente:** Un pedazo de interfaz reutilizable (ej: un botón, el sidebar).
- **Prop (Propiedad):** Datos que le pasamos a un componente para configurarlo.
- **State (Estado):** La "memoria" del componente (ej: si el menú está abierto o cerrado).

## 10. Referencia de Diseño (Legacy)

IMPORTANTE: El diseño visual y la lógica base se encuentran en la carpeta `/legacy`.

- **/legacy/index.html**: Contiene la estructura DOM y las clases de utilidad visuales. Úsalo como "Mapa" para crear los componentes React.
- **/legacy/script.js**: Contiene la lógica de negocio, datos de ejemplo (jobsDatabase) y configuración de gráficos Chart.js.
- **/legacy/styles.css**: Referencia para colores y estilos no cubiertos por Tailwind por defecto.

## 11. Agile Breakdown ( Pasos a seguir)

- **agileBreackdown.md**: Contiene el desglose de tareas y subtareas para el proyecto.

**Instrucción para la IA:** Antes de crear un componente, revisa la sección correspondiente en `/legacy/index.html` para replicar clases y estructura.
