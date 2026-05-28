import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Uso | GeneradorRandom',
  description: 'Términos y condiciones de uso de GeneradorRandom.com. Información sobre uso permitido, propiedad intelectual y limitación de responsabilidad.',
  alternates: { canonical: 'https://generadorrandom.com/terminos' },
  robots: { index: true, follow: true },
}

export default function Terminos() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Términos de Uso</h1>
      <p className="text-slate-500 text-sm mb-10">Última actualización: 27 de mayo de 2026</p>

      <div className="space-y-10 text-slate-400 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Aceptación de los términos</h2>
          <p>
            Al acceder y usar GeneradorRandom.com aceptás estos Términos de Uso en su totalidad.
            Si no estás de acuerdo con alguno de ellos, por favor no uses el sitio. El uso continuado
            del sitio después de cualquier modificación implica la aceptación de los términos actualizados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Descripción del servicio</h2>
          <p>
            GeneradorRandom.com es un sitio web que ofrece herramientas online gratuitas para la
            generación aleatoria de contenido: números, nombres, contraseñas, colores, historias,
            chistes, ruleta, cara o cruz y otras herramientas similares. El servicio se provee de
            forma gratuita y sin garantía de disponibilidad continua.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Uso permitido</h2>
          <p className="mb-3">Podés usar GeneradorRandom.com para:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Uso personal, educativo y comercial de los contenidos generados.</li>
            <li>Compartir los resultados generados libremente, sin restricciones.</li>
            <li>Usar las herramientas sin límite de veces ni registro previo.</li>
            <li>Usar los artículos del blog como referencia, citando la fuente.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Uso prohibido</h2>
          <p className="mb-3">Está prohibido:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Intentar acceder a sistemas, datos o áreas no autorizadas del sitio.</li>
            <li>Reproducir, copiar o redistribuir el sitio completo o sus herramientas sin autorización expresa.</li>
            <li>Usar el sitio para actividades ilegales o que violen derechos de terceros.</li>
            <li>Realizar ataques de denegación de servicio (DoS/DDoS) o cualquier acción que afecte la disponibilidad del sitio.</li>
            <li>Usar scrapers automatizados de forma masiva que perjudiquen el rendimiento del servicio.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Propiedad intelectual</h2>
          <p className="mb-3">
            El diseño, código fuente, marca, logotipo y contenido editorial de GeneradorRandom.com
            son propiedad de sus titulares y están protegidos por las leyes de propiedad intelectual
            de la República Argentina y tratados internacionales.
          </p>
          <p>
            El <strong className="text-slate-300">contenido generado</strong> por las herramientas
            (números, nombres, contraseñas, colores, historias, chistes) es de uso libre para el usuario
            que lo generó. No reclamamos ningún derecho sobre los resultados producidos por las herramientas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Limitación de responsabilidad</h2>
          <p className="mb-3">
            El sitio se provee <strong className="text-slate-300">"tal cual"</strong>, sin garantías de
            ningún tipo. En la máxima medida permitida por la ley aplicable:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>
              <strong className="text-slate-300">Contraseñas:</strong> no garantizamos que las contraseñas
              generadas sean adecuadas para todos los contextos de seguridad. El usuario es el único
              responsable de evaluar la fortaleza necesaria según su caso de uso.
            </li>
            <li>
              <strong className="text-slate-300">Sorteos y resultados aleatorios:</strong> los resultados
              son pseudoaleatorios e imparciales para uso práctico, pero no están certificados para
              sorteos regulados por ley, loterías con dinero real ni procesos que requieran aleatoriedad
              criptográfica certificada.
            </li>
            <li>
              <strong className="text-slate-300">Contenido generado:</strong> historias, chistes y nombres
              se generan algorítmicamente. No nos hacemos responsables si el contenido resulta inapropiado,
              ofensivo o inexacto en algún contexto específico.
            </li>
            <li>
              <strong className="text-slate-300">Disponibilidad:</strong> no garantizamos que el servicio
              esté disponible de forma ininterrumpida. Podemos suspender, modificar o discontinuar
              cualquier herramienta sin previo aviso.
            </li>
          </ul>
          <p className="mt-4">
            GeneradorRandom.com no será responsable por daños directos, indirectos, incidentales o
            consecuentes derivados del uso o la imposibilidad de uso del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Modificación del servicio</h2>
          <p>
            Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte del
            servicio en cualquier momento y sin previo aviso. No seremos responsables ante vos ni
            ante terceros por cualquier modificación, suspensión o discontinuación del servicio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Cambios en los términos</h2>
          <p>
            Podemos modificar estos Términos de Uso en cualquier momento. Los cambios se publicarán
            en esta página con la fecha de actualización. El uso continuado del sitio después de
            publicados los cambios implica la aceptación de los nuevos términos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Ley aplicable y jurisdicción</h2>
          <p>
            Estos Términos de Uso se rigen por las leyes de la <strong className="text-slate-300">República Argentina</strong>.
            Cualquier disputa que surja en relación con estos términos o el uso del sitio será sometida
            a la jurisdicción de los tribunales ordinarios de la República Argentina, renunciando
            expresamente a cualquier otro fuero que pudiera corresponder.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Contacto</h2>
          <p>
            Para consultas sobre estos términos, escribinos a{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}
