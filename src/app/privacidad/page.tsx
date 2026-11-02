import type { Metadata } from 'next';
import Link from 'next/link';
import { AnalyticsPreferencesButton } from '@/components/analytics/analytics-consent-provider';

export const metadata: Metadata = {
  title: 'Política de privacidad | JobTracker',
  description: 'Borrador de política de privacidad de JobTracker.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          Volver a JobTracker
        </Link>

        <header className="mb-8 mt-8 space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
            Documento legal
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Política de privacidad
          </h1>
          <p className="text-muted-foreground">JobTracker</p>
        </header>

        <aside className="mb-8 rounded-lg border border-amber-500/40 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>Borrador para revisión.</strong> Antes de publicar hay que
          confirmar el responsable y su domicilio legal, la región de los
          proveedores y los plazos de retención. Este texto no es asesoramiento
          jurídico.
        </aside>

        <div className="space-y-8 leading-7 text-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Responsable y contacto</h2>
            <p>
              Responsable indicado para este borrador: Gianni Pasquinelli. La
              identidad legal definitiva y el domicilio legal deben confirmarse
              antes de publicar esta política.
            </p>
            <p>
              Para ejercer derechos sobre tus datos personales, escribir a{' '}
              <a
                href="mailto:giannipasquinelli@gmail.com"
                className="text-primary underline underline-offset-4"
              >
                giannipasquinelli@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Datos que tratamos</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Datos de cuenta: nombre, email y datos necesarios para iniciar
                sesión con email o Google.
              </li>
              <li>
                Datos que agregás a tus postulaciones: empresa, puesto, estado,
                fechas, salario, enlaces, datos de contacto, descripciones,
                notas y feedback.
              </li>
              <li>
                Datos técnicos y de seguridad necesarios para mantener la
                sesión, proteger el servicio y diagnosticar errores.
              </li>
              <li>
                Datos de uso para analítica, como eventos de registro e inicio
                de sesión, cambios de estado de postulaciones y visitas a la
                sección Skills.
              </li>
            </ul>
            <p>
              El contenido libre de notas o descripciones puede incluir datos
              personales de terceros que decidas ingresar. Evitá agregar datos
              sensibles o información que no sea necesaria para tu seguimiento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Finalidades</h2>
            <p>
              Usamos los datos para crear y proteger tu cuenta, guardar y mostrar
              tus postulaciones, mantener las funciones del servicio, atender
              solicitudes y medir el uso general de JobTracker. No vendemos tus
              postulaciones ni usamos su contenido para publicidad dirigida.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              4. Proveedores y transferencias
            </h2>
            <p>
              JobTracker utiliza Supabase para autenticación y base de datos,
              Vercel para alojamiento y Google para el inicio de sesión y Google
              Analytics. Estos proveedores pueden procesar datos desde países
              distintos de Argentina. Las regiones concretas, los contratos de
              tratamiento y las salvaguardas de transferencias deben verificarse
              antes de publicar la versión final.
            </p>
            <p>
              Los enlaces de donación llevan a sitios externos. Los datos de
              pago que ingreses allí son tratados por esos sitios, no por
              JobTracker.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Analítica</h2>
            <p>
              Google Analytics 4 es opcional. La etiqueta y los eventos de
              analítica solo se activan después de que aceptes expresamente esta
              opción. Si la rechazás antes de aceptarla, GA4 no se carga. Si
              revocás una aceptación previa, dejamos de invocar la analítica y
              eliminamos las cookies GA conocidas. La elección se guarda en este
              navegador y es independiente para cada navegador o dispositivo.
              Podés modificarla o revocarla en cualquier momento desde el
              siguiente control o desde el footer. Si el navegador bloquea el
              almacenamiento, el cambio solo puede aplicarse en la sesión actual.
            </p>
            <AnalyticsPreferencesButton />
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Conservación y supresión</h2>
            <p>
              Los datos se conservan mientras la cuenta esté activa y sean
              necesarios para prestar el servicio. Podés solicitar acceso,
              rectificación, actualización o supresión escribiendo al contacto
              indicado. El plazo de conservación de copias de respaldo y el
              procedimiento operativo de baja deben confirmarse antes de
              publicar la versión final.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Tus derechos en Argentina</h2>
            <p>
              Podés solicitar acceso a tus datos personales, y pedir su
              rectificación, actualización o supresión. Según la información
              publicada por la AAIP, el plazo para responder una solicitud de
              acceso es de 10 días corridos y para rectificación, actualización
              o supresión es de 5 días hábiles.
            </p>
            <p>
              También podés presentar un reclamo ante la{' '}
              <a
                href="https://www.argentina.gob.ar/aaip/datospersonales/derechos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Agencia de Acceso a la Información Pública (AAIP)
              </a>
              . Si accedés desde otro país, pueden existir derechos adicionales
              según la normativa aplicable en ese lugar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Seguridad y cambios</h2>
            <p>
              Aplicamos controles técnicos y organizativos para proteger las
              cuentas y separar los datos de cada usuario. Ningún servicio
              conectado a Internet puede garantizar seguridad absoluta.
            </p>
            <p>
              Esta política se actualizará cuando cambien las prácticas de
              tratamiento. La fecha de vigencia se completará al aprobar y
              publicar la versión final.
            </p>
          </section>

          <p className="border-t pt-6 text-sm text-muted-foreground">
            Para más información, consultá los{' '}
            <Link
              href="/terminos"
              className="text-primary underline underline-offset-4"
            >
              Términos y condiciones
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
