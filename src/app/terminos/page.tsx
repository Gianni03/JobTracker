import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y condiciones | JobTracker',
  description: 'Borrador de términos y condiciones de JobTracker.',
};

export default function TermsPage() {
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
            Términos y condiciones
          </h1>
          <p className="text-muted-foreground">JobTracker</p>
        </header>

        <aside className="mb-8 rounded-lg border border-amber-500/40 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>Borrador para revisión.</strong> No publicar hasta confirmar
          quién opera legalmente el servicio, completar el domicilio legal y
          revisar el texto con asesoramiento jurídico.
        </aside>

        <div className="space-y-8 leading-7 text-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Sobre el servicio</h2>
            <p>
              JobTracker es una aplicación para organizar postulaciones
              laborales, entrevistas, ofertas y notas relacionadas. Está
              orientada principalmente a personas de Argentina. El sitio no
              aplica bloqueo geográfico, por lo que se puede acceder desde
              otros países; las normas aplicables pueden variar según el lugar
              de residencia de cada persona.
            </p>
            <p>
              El servicio no garantiza entrevistas, ofertas de empleo ni
              resultados de contratación. La información y las herramientas de
              JobTracker no sustituyen asesoramiento profesional, legal o
              financiero.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Cuenta y uso</h2>
            <p>
              Para usar las funciones privadas es necesario crear una cuenta.
              La persona usuaria debe proporcionar información de registro
              correcta, proteger sus credenciales y avisar si detecta un uso no
              autorizado de su cuenta.
            </p>
            <p>
              Cada persona es responsable del contenido que agrega y de contar
              con autorización para incluir datos de contacto u otra
              información de terceros. Recomendamos no ingresar datos
              sensibles ni información de otras personas que no sea necesaria
              para organizar una postulación.
            </p>
            <p>
              No está permitido usar el servicio para actividades ilegales,
              acceder a cuentas o datos ajenos, interferir con su seguridad o
              disponibilidad, ni intentar obtener acceso no autorizado a sus
              sistemas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Contenido de la cuenta</h2>
            <p>
              La persona usuaria conserva sus derechos sobre la información que
              carga en JobTracker. Autoriza al operador del servicio a alojarla,
              almacenarla y procesarla únicamente en la medida necesaria para
              proporcionar, mantener y proteger las funciones solicitadas.
            </p>
            <p>
              JobTracker no vende el contenido de las postulaciones. El
              tratamiento de datos personales se describe en la{' '}
              <Link
                href="/privacidad"
                className="text-primary underline underline-offset-4"
              >
                Política de privacidad
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Servicios de terceros</h2>
            <p>
              JobTracker utiliza proveedores externos para funciones como
              autenticación, alojamiento, base de datos y medición de uso. El
              acceso mediante Google y los enlaces a servicios de donación
              también pueden estar sujetos a los términos y políticas de esos
              proveedores. JobTracker no recibe los datos de pago ingresados en
              los sitios externos de donación.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Disponibilidad y cambios</h2>
            <p>
              El servicio se ofrece según su disponibilidad y puede recibir
              cambios, mantenimiento o interrupciones. No se ofrece un acuerdo
              de nivel de servicio. Esta condición no limita los derechos que
              correspondan y que no puedan excluirse conforme a la normativa
              aplicable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Cuenta y solicitudes</h2>
            <p>
              Para solicitar acceso, corrección o supresión de datos, o pedir la
              baja de una cuenta, se puede escribir a{' '}
              <a
                href="mailto:giannipasquinelli@gmail.com"
                className="text-primary underline underline-offset-4"
              >
                giannipasquinelli@gmail.com
              </a>
              . La solicitud puede requerir una verificación razonable de
              identidad para proteger la cuenta.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Ley aplicable</h2>
            <p>
              Estos términos se interpretan conforme a las leyes de la
              República Argentina, sin limitar las normas imperativas ni los
              derechos de consumidores que resulten aplicables a cada persona.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Contacto y vigencia</h2>
            <p>
              Para consultas sobre estos términos, escribí a{' '}
              <a
                href="mailto:giannipasquinelli@gmail.com"
                className="text-primary underline underline-offset-4"
              >
                giannipasquinelli@gmail.com
              </a>
              . La fecha de vigencia se completará al aprobar y publicar la
              versión final.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
