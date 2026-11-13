# Panel de uso (`/analytics`)

Página interna para ver el uso de JobTracker. No está enlazada en la app: se
entra escribiendo la URL a mano.

## Qué muestra

- **Usuarios**: registrados, activos, inactivos, nuevos y nunca ingresaron.
  Fuente: Supabase Auth (Admin API).
- **Tráfico**: usuarios activos, nuevos, sesiones, páginas vistas, engagement,
  duración media, activos ahora y países/fuentes/dispositivos.
  Fuente: Google Analytics 4 (Data API).
- **Postulaciones**: total, en el rango, entrevistas, ofertas, tasas de
  conversión, distribución por estado y plataforma, top de empresas y serie
  diaria. Fuente: Supabase (`applications`) agregado con service role.
- **Eventos de producto**: `sign_up`, `login`, `create_application`,
  `import_job_url`, `change_status`, etc. Fuente: GA4.

## Acceso

La página se protege con una allowlist de emails. Sin `ANALYTICS_ALLOWED_EMAILS`
no entra nadie (fail closed). Cualquier usuario autenticado que no esté en la
lista recibe un **404**, no un 403.

```bash
# .env.local
ANALYTICS_ALLOWED_EMAILS=tu@email.com
```

Podés separar varios emails con coma:

```bash
ANALYTICS_ALLOWED_EMAILS=uno@email.com,dos@email.com
```

En Vercel, agregá la misma variable en Production (y Preview si la usás).

> La URL oculta no es seguridad. La allowlist sí. Igual conviene no enlazarla y
> la página se marca `noindex`.

## Conectar Google Analytics 4

La app ya manda eventos a GA4 (`src/lib/analytics.ts`) cuando el usuario acepta
analítica. Para leerlos desde el panel necesitás una service account:

1. En Google Cloud Console, creá o elegí un proyecto.
2. Habilitá **Google Analytics Data API**.
3. Creá una **service account** y una clave JSON.
4. En GA4: **Admin → Property access management**, agregá el email de la service
   account con rol **Viewer**.
5. En GA4: **Admin → Property settings**, copiá el **Property ID numérico**
   (no el `G-XXXXXXXXXX`). 528538053
6. Configurá las variables:

```bash
GA4_PROPERTY_ID=123456789
GA4_CLIENT_EMAIL=jobtracker-analytics@tu-proyecto.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

`GA4_PRIVATE_KEY` puede tener saltos de línea reales o literales `\n`: el código
normaliza ambos.

En Vercel:

- `GA4_PROPERTY_ID`
- `GA4_CLIENT_EMAIL`
- `GA4_PRIVATE_KEY`
- `ANALYTICS_ALLOWED_EMAILS`

`SUPABASE_SERVICE_ROLE_KEY` ya se usa para las métricas de Supabase. Tiene que
estar configurada **solo del lado servidor** y nunca con prefijo `NEXT_PUBLIC_`.

## Definiciones

- **Rango**: 7, 28 o 90 días. Los reportes estándar de GA4 usan días completos
  (hasta ayer); “activos ahora” sale de Realtime.
- **Activo (Supabase)**: `last_sign_in_at` dentro del rango.
- **Inactivo**: sin login dentro del rango, incluyendo cuentas que nunca
  ingresaron. Esas últimas se muestran aparte.
- **Nuevo**: `created_at` dentro del rango.
- **Entrevista**: estado `Entrevista` u `Oferta`, o `interview_stage` cargado.
- **Oferta**: estado `Oferta` u `offer_stage` cargado.
- **Tasa de entrevistas**: entrevistas / postulaciones.
- **Tasa de ofertas**: ofertas / entrevistas.

## Limitaciones

- GA4 solo registra usuarios que aceptaron analítica. Los números de tráfico son
  un piso, no el total real.
- `last_sign_in_at` no se actualiza con una sesión persistente. Un usuario puede
  estar usando la app sin aparecer como “activo” en Supabase.
- `countryId` se traduce con `Intl.DisplayNames`; si un código no existe, se
  muestra tal cual.
- Las métricas de Supabase se agregan en memoria. Para volúmenes grandes conviene
  mover los cálculos a una función RPC o a vistas materializadas.
- La service account y la service role key son secretos de servidor. No las
  expongas en componentes cliente ni en logs.

## Verificación local

```bash
pnpm typecheck
pnpm test
pnpm build
```

Con `ANALYTICS_ALLOWED_EMAILS` configurada y sesión iniciada, entrá a
`http://localhost:3000/analytics`. Si GA4 no está configurado, la sección de
tráfico muestra un aviso y el resto del panel sigue funcionando con Supabase.
