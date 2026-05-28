import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acerca de GeneradorRandom | Herramientas aleatorias gratuitas',
  description: 'Conocé GeneradorRandom.com, la suite gratuita de 9 herramientas aleatorias online en español. Sin registro, sin límites, todo en tu navegador.',
  alternates: { canonical: 'https://generadorrandom.com/acerca' },
}

const HERRAMIENTAS = [
  { href: '/generadores/nombres',            emoji: '👤', label: 'Generador de Nombres',     desc: 'Personas, apellidos, empresas y mascotas' },
  { href: '/generadores/contrasenas',        emoji: '🔒', label: 'Generador de Contraseñas', desc: 'Contraseñas seguras y personalizables' },
  { href: '/generadores/colores',            emoji: '🎨', label: 'Generador de Colores',      desc: 'Colores y paletas aleatorias con HEX/RGB' },
  { href: '/generadores/historias',          emoji: '📖', label: 'Generador de Historias',    desc: 'Puntos de partida para escritura creativa' },
  { href: '/generadores/chistes',            emoji: '😂', label: 'Generador de Chistes',      desc: 'Humor en español para todos los gustos' },
  { href: '/generadores/chistes-argentinos', emoji: '🇦🇷', label: 'Chistes Argentinos',        desc: 'Humor rioplatense y cultura argentina' },
  { href: '/generadores/ruleta',             emoji: '🎡', label: 'Ruleta Aleatoria',           desc: 'Hasta 48 opciones, ideal para sorteos' },
  { href: '/generadores/numeros',            emoji: '🎲', label: 'Generador de Números',      desc: 'Cualquier rango, hasta 10 a la vez' },
  { href: '/generadores/moneda',             emoji: '🪙', label: 'Cara o Cruz',                desc: 'Decisiones rápidas con estadísticas' },
]

export default function Acerca() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold text-white">
          GR
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">GeneradorRandom.com</h1>
          <p className="text-slate-500 text-sm">9 herramientas aleatorias gratuitas en español</p>
        </div>
      </div>

      <div className="space-y-8 text-slate-400 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">¿Qué es GeneradorRandom?</h2>
          <p>
            GeneradorRandom es una colección de herramientas online gratuitas diseñadas para hacer tu
            vida más fácil y creativa. Desde nombres para tus personajes hasta contraseñas seguras para
            tus cuentas, pasando por paletas de colores, ruletas para sorteos, dados virtuales y mucho más.
          </p>
          <p className="mt-3">
            Todo fue construido pensando en hispanohablantes: nombres argentinos y latinoamericanos,
            chistes en castellano rioplatense, interfaces completamente en español.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Nuestro principio</h2>
          <p>
            Simple: que funcione al instante, sin registro, sin trucos. Llegás, generás, te vas.
            Todo el procesamiento ocurre en tu navegador — nada se envía a ningún servidor. Sin cuentas,
            sin emails, sin datos personales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Las 9 herramientas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {HERRAMIENTAS.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className="flex items-start gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-600/40 hover:text-blue-400 transition-all text-slate-300 group"
              >
                <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{h.emoji}</span>
                <div>
                  <p className="font-semibold text-sm group-hover:text-blue-400 transition-colors">{h.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{h.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Blog</h2>
          <p>
            También tenemos un <Link href="/blog" className="text-blue-400 hover:underline">blog</Link> con
            guías sobre generadores aleatorios: para qué sirven, cómo funcionan, usos creativos y más.
            Todo en español, todo gratuito.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Contacto</h2>
          <p>
            ¿Sugerencias, errores o ideas para nuevas herramientas? Estamos para escucharte.{' '}
            <Link href="/contacto" className="text-blue-400 hover:underline">
              Visitá nuestra página de contacto
            </Link>{' '}
            o escribinos directamente a{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}
