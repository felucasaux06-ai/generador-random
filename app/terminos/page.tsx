import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Uso',
  description: 'Términos y condiciones de uso de GeneradorRandom.com.',
  alternates: { canonical: 'https://generadorrandom.com/terminos' },
}

export default function Terminos() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Términos de Uso</h1>
      <p className="text-slate-500 text-sm mb-10">Última actualización: mayo 2026</p>

      <div className="space-y-10 text-slate-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Aceptación</h2>
          <p>
            Al acceder y usar GeneradorRandom.com aceptas estos términos. Si no estás de acuerdo,
            por favor no uses el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Uso permitido</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Uso personal, educativo y comercial de los contenidos generados</li>
            <li>Compartir los resultados libremente</li>
            <li>Usar las herramientas sin límite de veces</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Uso prohibido</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Intentar acceder a sistemas o datos no autorizados</li>
            <li>Reproducir el sitio completo sin permiso</li>
            <li>Usar el sitio para actividades ilegales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Limitación de responsabilidad</h2>
          <p>
            El sitio se provee "tal cual". No garantizamos que las contraseñas generadas sean adecuadas
            para todos los usos. El usuario es responsable del uso que hace de los contenidos generados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Cambios</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Los cambios se publicarán en esta página.
          </p>
        </section>
      </div>
    </div>
  )
}
