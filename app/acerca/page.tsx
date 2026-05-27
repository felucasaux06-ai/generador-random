import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acerca de GeneradorRandom',
  description: 'Conoce GeneradorRandom.com, suite gratuita de herramientas creativas online en español.',
  alternates: { canonical: 'https://generadorrandom.com/acerca' },
}

export default function Acerca() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold text-white">
          GR
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">GeneradorRandom.com</h1>
          <p className="text-slate-500 text-sm">Herramientas creativas gratuitas</p>
        </div>
      </div>

      <div className="space-y-8 text-slate-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">¿Qué es GeneradorRandom?</h2>
          <p>
            GeneradorRandom es una colección de herramientas online gratuitas diseñadas para
            hacer tu vida más fácil y creativa. Desde nombres para tus personajes hasta contraseñas
            seguras para tus cuentas, pasando por paletas de colores para tus diseños.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Nuestro principio</h2>
          <p>
            Simple: que funcione al instante, sin registro, sin trucos. Llegás, generás, te vas.
            Todo el procesamiento ocurre en tu navegador — nada se envía a ningún servidor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Las herramientas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {[
              { href: '/generadores/nombres',     emoji: '👤', label: 'Generador de Nombres' },
              { href: '/generadores/contrasenas', emoji: '🔒', label: 'Generador de Contraseñas' },
              { href: '/generadores/colores',     emoji: '🎨', label: 'Generador de Colores' },
              { href: '/generadores/historias',   emoji: '📖', label: 'Generador de Historias' },
              { href: '/generadores/chistes',     emoji: '😂', label: 'Generador de Chistes' },
            ].map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-600/40 hover:text-blue-400 transition-all text-slate-300"
              >
                <span aria-hidden="true">{h.emoji}</span>
                <span className="font-medium">{h.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Contacto</h2>
          <p>
            ¿Sugerencias, errores o ideas para nuevas herramientas? Escríbenos a{' '}
            <a href="mailto:hola@generadorrandom.com" className="text-blue-400 hover:underline">
              hola@generadorrandom.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
