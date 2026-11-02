# JobTracker — Análisis de brechas de seguridad y privacidad

- **Fecha:** 2026-11-02
- **Alcance:** aplicación web JobTracker (Next.js 15.1.11, React 18, Supabase, Vercel, GA4, GitHub)
- **Tipo:** autoevaluación técnica y de gobernanza; no es una auditoría formal ni asesoramiento legal
- **Dueño:** Gianni Pasquinelli
- **Base técnica:** auditoría de seguridad previa del repositorio y revisión del estado de producción

---

## 1. Resumen ejecutivo

JobTracker tiene una **base técnica razonable para un producto early-stage**: autenticación con Supabase, rutas protegidas por middleware, datos leídos en el servidor, scope por `user_id` y RLS verificado en `applications`. No hay `service_role` en el cliente ni consultas directas a la base desde el browser.

Para **SOC 2, ISO 27001 o ISO 27701 no está listo todavía**. Lo que falta no es principalmente código: falta el sistema de gestión, las políticas, la evidencia, el monitoreo, la gestión de proveedores, la respuesta a incidentes y la privacidad formal.

**Veredicto:** con 48 usuarios, no recomiendo certificar. Recomiendo un **hardening alineado** (Fase 0), documentar controles y evidencia (Fase 1), y recién iniciar una certificación si un cliente B2B la exige o si el producto apunta a ventas enterprise (Fase 2).

### Lo bueno

- Supabase Auth con login, registro, recuperación y callback.
- Middleware y layout de dashboard protegidos.
- RLS en `applications` con `auth.uid() = user_id`; verificado en la auditoría previa.
- Consultas server-side con scope explícito por usuario.
- Sin `service_role` en el cliente; sin acceso directo a Supabase desde el navegador.
- Analytics sin PII y página de donación sin datos de pago.
- Lockfile de pnpm y build reproducible.

### Lo crítico

- Next.js **15.1.11** con CVEs críticos conocidos; `pnpm audit --prod` reporta **101 vulnerabilidades: 7 críticas, 41 altas, 46 moderadas y 7 bajas**.
- Sin CI, sin tests automatizados y sin escaneo de dependencias en el pipeline.
- Sin monitoreo de errores, alertas, logs de auditoría ni seguimiento de disponibilidad.
- Sin prueba documentada de restauración de backups ni RPO/RTO.
- Sin política de privacidad, términos reales, consentimiento de GA4, retención, borrado de cuenta ni proceso de derechos de titulares.
- Sin políticas, registro de riesgos, respuesta a incidentes, BCP/DR ni revisión de accesos.
- Sin MFA de usuarios ni evidencia de MFA en las cuentas administrativas.

---

## 2. Qué significa cada marco

| Marco | Naturaleza | Qué evalúa | Cómo se obtiene |
|---|---|---|---|
| **SOC 2** | Informe de atestación (AICPA Trust Services Criteria) | Seguridad y, opcionalmente, disponibilidad, integridad de procesamiento, confidencialidad y privacidad | Auditor CPA; Type I (punto en el tiempo) y Type II (evidencia de un período, normalmente 3–12 meses) |
| **ISO 27001** | Certificación de un sistema de gestión de seguridad de la información (ISMS) | Riesgos, políticas, controles, auditoría interna, revisión gerencial, mejora continua | Organismo certificador acreditado; ciclo de auditoría y vigilancia |
| **ISO 27701** | Extensión de privacidad sobre ISO 27001/27002 (PIMS) | Datos personales, roles controller/processor, DPIA, derechos de titulares, retención, contratos | Certificación complementaria a 27001; no reemplaza el cumplimiento legal |

Puntos importantes:

- **SOC 2 no es una certificación.** Es un informe de un auditor; normalmente se comparte bajo NDA.
- **ISO 27001 certifica el sistema de gestión**, no cada línea de código. La app es solo una parte del alcance.
- **ISO 27701 es privacidad**, no seguridad técnica. Se apoya en 27001 y en obligaciones legales aplicables (GDPR, Ley 25.326 en Argentina, etc.).
- **Vercel y Supabase tienen sus propios reportes SOC 2/ISO y DPAs.** Cubren su capa de infraestructura; no certifican JobTracker. Hay que gestionarlos como proveedores y conservar sus reportes.

---

## 3. Alcance, activos y datos

### Activos

- Aplicación Next.js y funciones server-side.
- Proyecto Supabase: Auth, Postgres, RLS y backups.
- Proyecto Vercel: build, deploy, variables de entorno y logs.
- GitHub: código, PRs, Actions y secretos.
- GA4: analítica de uso.
- Dominio `www.jobtracker.com.ar`.

### Datos personales tratados

- Cuenta: email, nombre, metadata de autenticación.
- Postulaciones: empresa, rol, estado, etapa, fechas, salario, descripción, feedback, contacto.
- Datos de contacto del formulario: teléfono, dirección, ciudad, provincia, código postal.
- Analítica: eventos de uso sin PII deliberada.

### Clasificación sugerida

| Dato | Clasificación | Nota |
|---|---|---|
| Credenciales y sesiones | Alta | Gestionadas por Supabase Auth |
| Email y datos de cuenta | Media | PII |
| Postulaciones y feedback | Media | PII laboral; puede contener datos de terceros |
| Datos de contacto | Media | PII |
| Analítica | Baja | Sin PII deliberada; revisar configuración |
| Datos de pago | Fuera de alcance | Las donaciones se hacen en Cafecito/Mercado Pago |

---

## 4. Matriz de estado actual

Estados: **OK** = control presente y razonable; **Parcial** = existe pero falta formalización o evidencia; **Falta** = no existe o no es demostrable.

| # | Control | Estado | Evidencia / brecha | Prioridad |
|---|---|---|---|---|
| 1 | Autenticación y sesión | Parcial | Supabase Auth; sin MFA de usuarios, sin política de sesión documentada, sin alertas de login | P1 |
| 2 | Autorización y aislamiento | OK | RLS verificado; scope server-side por `user_id`; sin `service_role` en cliente | — |
| 3 | Validación de entrada | Parcial | Zod en formularios/acciones; no hay esquema centralizado ni tests de validación | P1 |
| 4 | Gestión de vulnerabilidades | Falta | Next 15.1.11; 101 vulnerabilidades (7 críticas, 41 altas); sin escaneo en CI | P0 |
| 5 | CI/CD y gestión de cambios | Falta | Sin CI, sin tests, PRs sin aprobaciones; solo check de Vercel | P0 |
| 6 | Secretos y claves | Parcial | Variables en Vercel/.env.local; sin rotación, sin secret scanning, sin inventario | P0 |
| 7 | Hardening web | Falta | Sin CSP/HSTS/X-Frame-Options/Referrer-Policy; sin rate limiting propio | P0 |
| 8 | Logs y monitoreo | Falta | Sin logs de auditoría, alertas, error tracking ni uptime | P0 |
| 9 | Backups y restore | Parcial | Backups del proveedor; sin prueba de restauración, RPO/RTO ni evidencia | P0 |
| 10 | Continuidad (BCP/DR) | Falta | Sin plan, contactos, escenarios ni simulacros | P1 |
| 11 | Respuesta a incidentes | Falta | Sin procedimiento, severidades, plazos ni canal de contacto | P1 |
| 12 | Accesos administrativos | Parcial | Cuentas Vercel/Supabase/GitHub; verificar MFA y revisar accesos | P0 |
| 13 | Gestión de proveedores | Parcial | Vercel/Supabase/Google tienen reportes; faltan DPAs, lista de subprocessors y revisión | P1 |
| 14 | Privacidad y consentimiento | Falta | Sin política de privacidad, términos, consentimiento GA4 ni aviso de cookies | P0 |
| 15 | Retención y derechos | Falta | Sin retención definida, borrado de cuenta, exportación ni proceso DSAR | P0 |
| 16 | Riesgos y políticas | Falta | Sin registro de riesgos, políticas ni revisión gerencial | P1 |
| 17 | Pruebas de seguridad | Falta | Sin SAST/DAST, sin pentest, sin revisión de dependencias continua | P1 |
| 18 | Capacitación | Falta | No aplica como programa formal; un auditor lo pediría | P2 |
| 19 | Seguridad física/red | OK (heredado) | Vercel/Supabase; conservar reportes y DPAs | — |
| 20 | Cifrado | Parcial | TLS en tránsito; cifrado en reposo del proveedor; sin cifrado de campos a nivel app | P2 |
| 21 | Disponibilidad/SLO | Parcial | Infra gestionada; sin SLO, status page ni monitoreo | P1 |
| 22 | Security page / divulgación | Falta | Sin página de seguridad ni canal para reportar vulnerabilidades | P2 |

---

## 5. Brechas priorizadas

### P0 — 0 a 30 días (hardening y riesgo inmediato)

1. **Actualizar Next.js** y dependencias; eliminar paquetes no usados (`genkit`, `@genkit-ai/google-genai`, `sweetalert2` si no se usan). Revalidar con `pnpm audit --prod`.
2. **CI mínimo:** instalar con lockfile, `pnpm audit --prod`, lint, `tsc --noEmit` y build en cada PR. Activar Dependabot y secret scanning.
3. **MFA** en Vercel, Supabase y GitHub; revisar miembros, tokens y sesiones; rotar claves si hay dudas.
4. **Monitoreo:** error tracking (Sentry o equivalente), uptime y alertas a un canal real.
5. **Backup/restore:** probar una restauración en un proyecto de staging; documentar RPO/RTO.
6. **Privacidad mínima:** política de privacidad y términos; enlazarlos desde el registro; consentimiento de GA4/cookies si corresponde; borrado de cuenta y exportación de datos.
7. **Security headers** y revisión de rate limiting en auth.
8. **Contacto de seguridad** y procedimiento básico de incidentes.

### P1 — 30 a 90 días (gobernanza y evidencia)

- Registro de riesgos y tratamiento.
- Políticas: acceso, cambios, proveedores, incidentes, continuidad, retención, uso aceptable.
- Revisión de accesos y altas/bajas.
- DPAs y lista de subprocessors de Vercel, Supabase y Google.
- Logs de auditoría de eventos relevantes y retención.
- Tests de flujos críticos y evidencia de cambios.
- SAST/DAST y revisión de dependencias continua.
- Proceso DSAR, retención y borrado.
- Security page y canal de divulgación.
- Simulacro de incidente y revisión de continuidad.

### P2 — 90 a 180 días (madurez y certificación)

- Auditoría interna y revisión gerencial.
- Capacitación/atestación del equipo.
- Pentest externo.
- Decisión y preparación de SOC 2 o ISO 27001.
- ISO 27701 como extensión si hay requisitos de privacidad enterprise.

---

## 6. Roadmap 30 / 60 / 90

### Días 0–30

- Parchear Next y dependencias.
- CI, Dependabot y secret scanning.
- MFA administrativo y revisión de accesos.
- Monitoreo, alertas y backup restore.
- Política de privacidad, términos, consentimiento y borrado/exportación.
- Security headers y rate limiting.

**Salida esperada:** riesgo crítico de dependencias reducido, pipeline reproducible, visibilidad operativa y base legal de privacidad.

### Días 31–60

- Registro de riesgos y políticas iniciales.
- DPAs/subprocessors y revisión de proveedores.
- Logs de auditoría y retención.
- Tests de auth, RLS y acciones críticas.
- Procedimiento de incidentes y contactos.
- Revisión de accesos.

**Salida esperada:** controles documentados y evidencia incipiente.

### Días 61–90

- Simulacro de incidente.
- SAST/DAST y primer pentest acotado.
- Revisión de continuidad y backups.
- Gap review contra SOC 2/ISO 27001.
- Decisión: ¿certificar o solo mantener alineación?

**Salida esperada:** decisión informada y presupuesto, no certificación a ciegas.

---

## 7. ¿Certificar o no?

### B2C, 48 usuarios, sin exigencia contractual

**No certificar.** El costo y la carga de evidencia no se justifican. Alcanza con:

- hardening técnico,
- política de privacidad y términos,
- security page,
- backups y monitoreo,
- proceso de incidentes y DSAR,
- controles alineados a SOC 2/ISO documentados.

### B2B SMB con clientes de EE. UU.

**SOC 2 Type I** primero; luego Type II con 3–6 meses de evidencia. Es el camino más directo para responder a un security questionnaire. No prometer Type II antes de tener el período de evidencia.

### Enterprise, Unión Europea o datos sensibles

**ISO 27001** como sistema de gestión, y **ISO 27701** si el cliente exige privacidad formal. SOC 2 puede seguir siendo necesario para clientes de EE. UU.; no hacer los tres a la vez.

### Orden de magnitud de costos

Depende del auditor, alcance y herramienta de compliance. Como referencia:

- SOC 2 Type I: varios miles de USD.
- SOC 2 Type II: más, con 3–12 meses de evidencia.
- ISO 27001: decenas de miles de USD y 6–12 meses.
- ISO 27701: adicional sobre 27001.

Para un producto con 48 usuarios y donaciones, la certificación no tiene retorno directo. La alineación sí: reduce riesgo real y sirve para responder cuestionarios de clientes.

---

## 8. Evidencia que un auditor pediría

- [ ] Políticas aprobadas y firmadas.
- [ ] Registro de riesgos y tratamiento.
- [ ] Inventario de activos y datos.
- [ ] Matriz de accesos y revisión periódica.
- [ ] MFA en cuentas administrativas.
- [ ] Escaneos de vulnerabilidades y tickets de remediación.
- [ ] Logs de CI, tests y builds.
- [ ] Evidencia de backup y restore.
- [ ] Simulacro de incidente.
- [ ] Reportes SOC 2/ISO y DPAs de proveedores.
- [ ] Lista de subprocessors.
- [ ] Política de privacidad y términos publicados.
- [ ] Registro de consentimiento y configuración de GA4.
- [ ] Proceso y registro de DSAR.
- [ ] Retención y evidencia de borrado.
- [ ] Capacitación/atestación.
- [ ] Pentest y remediaciones.
- [ ] Cambios con revisión y aprobación.

---

## 9. Límites de este análisis

- Es una **autoevaluación** basada en el repositorio, la configuración visible y la auditoría técnica previa; no reemplaza una auditoría formal.
- No incluye revisión legal de contratos, DPAs ni cumplimiento específico por jurisdicción.
- No incluye pruebas de penetración ni revisión de la configuración interna de Vercel/Supabase.
- Los costos y plazos son órdenes de magnitud, no cotizaciones.
- La certificación SOC 2/ISO depende de un auditor externo y de evidencia sostenida en el tiempo; no se obtiene solo con cambios de código.

---

## 10. Referencias

- AICPA Trust Services Criteria (SOC 2).
- ISO/IEC 27001 e ISO/IEC 27002.
- ISO/IEC 27701.
- NIST Cybersecurity Framework 2.0 (útil como mapa de madurez).
- OWASP ASVS y OWASP Top 10.
- Trust centers y DPAs de Vercel, Supabase y Google.
