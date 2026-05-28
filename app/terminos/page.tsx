import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos de Uso | GeneradorRandom',
  description: 'Términos y condiciones de uso de GeneradorRandom.com. Propiedad intelectual, limitación de responsabilidad y ley aplicable (Argentina).',
  alternates: { canonical: 'https://generadorrandom.com/terminos' },
  robots: { index: true, follow: true },
}

export default function Terminos() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Términos de Uso</h1>
      <p className="text-slate-500 text-sm mb-10">Última actualización: 28 de mayo de 2026</p>

      <div className="space-y-10 text-slate-400 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Aceptación de los términos</h2>
          <p>
            Al acceder y usar GeneradorRandom.com aceptás estos términos en su totalidad. Si no
            estás de acuerdo con alguno de los puntos, por favor no uses el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Descripción del servicio</h2>
          <p>
            GeneradorRandom.com ofrece herramientas gratuitas online de generación aleatoria
            (nombres, contraseñas, colores, números, chistes, historias, ruleta, cara o cruz).
            El servicio se presta tal cual, sin registro previo ni costo alguno.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Uso permitido</h2>
          <p className="mb-3">Podés usar el sitio para:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Uso personal, educativo y comercial de los contenidos generados</li>
            <li>Compartir libremente los resultados obtenidos</li>
            <li>Usar las herramientas sin límite de veces</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Uso prohibido</h2>
          <p className="mb-3">No está permitido:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Intentar acceder a sistemas, datos o áreas no autorizadas del sitio</li>
            <li>Reproducir, copiar o redistribuir el sitio completo sin autorización</li>
            <li>Usar el sitio para actividades ilegales, fraudulentas o que dañen a terceros</li>
            <li>Realizar scraping masivo o automatizado que afecte la disponibilidad del sitio</li>
            <li>Usar las herramientas para generar contenido que viole derechos de terceros</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Propiedad intelectual</h2>
          <p className="mb-3">
            El código, diseño, marca, logotipos y estructura de GeneradorRandom.com son propiedad
            del titular del sitio. El contenido generado por las herramientas (nombres, contraseñas,
            colores, etc.) es de libre uso para los usuarios.
          </p>
          <p>
            Los artículos del blog son propiedad de GeneradorRandom.com y pueden citarse con
            atribución y enlace al original.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Limitación de responsabilidad</h2>
          <p className="mb-3">
            El sitio se provee <strong className="text-slate-300">"tal cual"</strong>, sin garantías
            de ningún tipo. No garantizamos:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Disponibilidad ininterrumpida del servicio</li>
            <li>Ausencia total de errores</li>
            <li>Resultados específicos del uso de las herramientas</li>
          </ul>
          <p className="mt-4">
            Para conocer los límites específicos de cada herramienta, consultá nuestro{' '}
            <Link href="/disclaimer" className="text-blue-400 hover:underline">
              Descargo de Responsabilidad
            </Link>.
          </p>
          <p className="mt-4">
            GeneradorRandom.com no será responsable por daños directos, indirectos, incidentales
            o consecuentes derivados del uso o imposibilidad de uso del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Modificación de servicios</h2>
          <p>
            Nos reservamos el derecho de modificar, suspender o eliminar cualquier herramienta o
            función del sitio en cualquier momento, sin previo aviso y sin responsabilidad alguna.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Privacidad</h2>
          <p>
            El tratamiento de tus datos se rige por nuestra{' '}
            <Link href="/privacidad" className="text-blue-400 hover:underline">
              Política de Privacidad
            </Link>
            , que forma parte integral de estos términos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Enlaces a terceros</h2>
          <p>
            El sitio puede contener enlaces a sitios externos. No somos responsables del contenido
            ni de las prácticas de privacidad de esos sitios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Ley aplicable y jurisdicción</h2>
          <p>
            Estos términos se rigen por las leyes de la <strong className="text-slate-300">República Argentina</strong>.
            Cualquier disputa relacionada con el uso del sitio será resuelta en los tribunales
            competentes de Argentina.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">11. Cambios en los términos</h2>
          <p>
            Podemos modificar estos términos en cualquier momento. Los cambios se publicarán en
            esta página con la fecha de última actualización. El uso continuado del sitio implica
            la aceptación de los términos modificados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">12. Contacto</h2>
          <p>
            Para consultas sobre estos términos, escribinos a{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>{' '}
            o desde la{' '}
            <Link href="/contacto" className="text-blue-400 hover:underline">
              página de contacto
            </Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
