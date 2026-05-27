import type { Metadata } from 'next'
import Link from 'next/link'
import AdBlock from './components/AdBlock'
import FlagArg from './components/FlagArg'

export const metadata: Metadata = {
  title: 'GeneradorRandom — 5 Herramientas Creativas Gratuitas Online',
  description:
    'Genera nombres aleatorios, contraseñas seguras, paletas de colores, historias y chistes al instante. 100% gratis, sin registro.',
}

const HERRAMIENTAS = [
  {
    href: '/generadores/nombres',
    emoji: '👤',
    titulo: 'Nombres',
    desc: 'Personas, empresas y mascotas. Con nombres raros incluidos.',
    badge: 'Popular',
    color: 'blue',
  },
  {
    href: '/generadores/contrasenas',
    emoji: '🔒',
    titulo: 'Contraseñas',
    desc: 'Seguras y personalizables. Longitud, símbolos y más.',
    badge: 'Seguro',
    color: 'emerald',
  },
  {
    href: '/generadores/colores',
    emoji: '🎨',
    titulo: 'Colores',
    desc: 'Paletas de 5 colores con HEX y RGB. Guarda favoritos.',
    badge: 'Diseño',
    color: 'purple',
  },
  {
    href: '/generadores/historias',
    emoji: '📖',
    titulo: 'Historias',
    desc: 'Aventura, romance, misterio y fantasía. Con voz.',
    badge: 'Creativo',
    color: 'amber',
  },
  {
    href: '/generadores/chistes',
    emoji: '😂',
    titulo: 'Chistes',
    desc: 'Chistes malos. Revela el remate y comparte.',
    badge: 'Humor',
    color: 'rose',
  },
  {
    href: '/generadores/chistes-argentinos',
    emoji: null,
    titulo: 'Chistes Argentinos',
    desc: 'Con lunfardo, mate, asado e inflación. Sin filtro.',
    badge: '🇦🇷 Nuevo',
    color: 'sky',
    flag: true,
  },
]

const BORDER: Record<string, string> = {
  blue:    'hover:border-blue-600/40',
  emerald: 'hover:border-emerald-600/40',
  purple:  'hover:border-purple-600/40',
  amber:   'hover:border-amber-600/40',
  rose:    'hover:border-rose-600/40',
  sky:     'hover:border-sky-600/40',
}

const ICON_BG: Record<string, string> = {
  blue:    'bg-blue-600/15 text-blue-400',
  emerald: 'bg-emerald-600/15 text-emerald-400',
  purple:  'bg-purple-600/15 text-purple-400',
  amber:   'bg-amber-600/15 text-amber-400',
  rose:    'bg-rose-600/15 text-rose-400',
  sky:     'bg-sky-600/15 text-sky-400',
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-24 px-4">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[200px] md:h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-slate-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Gratis · Sin registro · Funciona al instante
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
            Todo lo que necesitas<br />
            <span className="gradient-text">generar al azar</span>
          </h1>

          <p className="text-slate-400 text-base md:text-xl mb-8 max-w-xl mx-auto leading-relaxed px-2">
            6 herramientas creativas en un solo lugar. Úsalas todas, sin límites.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
            <Link href="/generadores/nombres" className="btn-primary text-base text-center">
              Empezar gratis →
            </Link>
            <Link href="/generadores/chistes-argentinos" className="btn-secondary text-base text-center flex items-center justify-center gap-2">
              <FlagArg className="w-5 h-3.5" /> Chistes Argentinos
            </Link>
          </div>
        </div>
      </section>

      {/* Ad — más sutil */}
      <div className="max-w-4xl mx-auto px-4 ad-wrapper">
        <AdBlock slot="1234567890" />
      </div>

      {/* Grid herramientas */}
      <section className="py-10 md:py-16 px-4" aria-labelledby="herramientas-h2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 id="herramientas-h2" className="text-2xl md:text-3xl font-bold text-white mb-2">
              Elige tu herramienta
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Haz clic y empieza en segundos. Sin formularios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {HERRAMIENTAS.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className={`group bg-slate-900 border border-slate-800 ${BORDER[h.color]} rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 active:scale-[0.98]`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ICON_BG[h.color]}`}>
                    {h.flag
                      ? <FlagArg className="w-6 h-4" />
                      : <span className="text-lg" aria-hidden="true">{h.emoji}</span>
                    }
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full border border-slate-700 flex-shrink-0">
                    {h.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base mb-1">{h.titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
                <div className="mt-3 text-xs font-medium text-slate-600 group-hover:text-blue-400 transition-colors">
                  Abrir →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué — compacto en mobile */}
      <section className="py-10 md:py-16 px-4 bg-slate-900/40 border-y border-slate-800/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
            ¿Por qué GeneradorRandom?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: '⚡', titulo: 'Instantáneo', desc: 'Resultado en menos de un segundo.' },
              { icon: '🔐', titulo: 'Privado', desc: 'Todo en tu navegador. Nada en servidores.' },
              { icon: '📱', titulo: 'Mobile', desc: 'Perfecto en celular, tablet y PC.' },
              { icon: '♾️', titulo: 'Sin límites', desc: 'Generá todo lo que quieras.' },
            ].map((item) => (
              <div key={item.titulo} className="text-center p-4 md:p-5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-2xl md:text-3xl mb-2" aria-hidden="true">{item.icon}</div>
                <h3 className="text-white font-semibold text-sm md:text-base mb-1">{item.titulo}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad inferior */}
      <div className="max-w-4xl mx-auto px-4 ad-wrapper">
        <AdBlock slot="0987654321" />
      </div>
    </div>
  )
}
