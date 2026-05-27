import type { Metadata } from 'next'
import Link from 'next/link'
import AdBlock from './components/AdBlock'

export const metadata: Metadata = {
  title: 'GeneradorRandom — 5 Herramientas Creativas Gratuitas Online',
  description:
    'Genera nombres aleatorios, contraseñas seguras, paletas de colores, historias y chistes al instante. 100% gratis, sin registro, funciona en segundos.',
}

const HERRAMIENTAS = [
  {
    href: '/generadores/nombres',
    emoji: '👤',
    titulo: 'Nombres',
    desc: 'Personas, apellidos, empresas y mascotas. Más de 400 opciones.',
    badge: '400+ nombres',
    color: 'blue',
  },
  {
    href: '/generadores/contrasenas',
    emoji: '🔒',
    titulo: 'Contraseñas',
    desc: 'Seguras y personalizables. Longitud, mayúsculas, números y símbolos.',
    badge: 'Ultra seguras',
    color: 'emerald',
  },
  {
    href: '/generadores/colores',
    emoji: '🎨',
    titulo: 'Colores',
    desc: 'Paletas de 5 colores con HEX y RGB. Guarda tus favoritos.',
    badge: 'Para diseñadores',
    color: 'purple',
  },
  {
    href: '/generadores/historias',
    emoji: '📖',
    titulo: 'Historias',
    desc: 'Aventura, romance, misterio y fantasía. Con lectura en voz alta.',
    badge: '4 géneros',
    color: 'amber',
  },
  {
    href: '/generadores/chistes',
    emoji: '😂',
    titulo: 'Chistes',
    desc: 'Chistes malos garantizados. Vota y comparte en WhatsApp.',
    badge: '30+ chistes',
    color: 'rose',
  },
]

const COLOR_MAP: Record<string, string> = {
  blue:    'group-hover:bg-blue-600/10 group-hover:border-blue-600/40 text-blue-400',
  emerald: 'group-hover:bg-emerald-600/10 group-hover:border-emerald-600/40 text-emerald-400',
  purple:  'group-hover:bg-purple-600/10 group-hover:border-purple-600/40 text-purple-400',
  amber:   'group-hover:bg-amber-600/10 group-hover:border-amber-600/40 text-amber-400',
  rose:    'group-hover:bg-rose-600/10 group-hover:border-rose-600/40 text-rose-400',
}

const ICON_BG: Record<string, string> = {
  blue:    'bg-blue-600/15 text-blue-400',
  emerald: 'bg-emerald-600/15 text-emerald-400',
  purple:  'bg-purple-600/15 text-purple-400',
  amber:   'bg-amber-600/15 text-amber-400',
  rose:    'bg-rose-600/15 text-rose-400',
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Gratis · Sin registro · Funciona al instante
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
            Todo lo que necesitas<br />
            <span className="gradient-text">generar al azar</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            5 herramientas creativas en un solo lugar. Úsalas todas, sin límites.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/generadores/nombres"
              className="btn-primary text-base"
              aria-label="Empezar con el generador de nombres"
            >
              Empezar gratis →
            </Link>
            <Link
              href="/generadores/contrasenas"
              className="btn-secondary text-base"
              aria-label="Ir al generador de contraseñas"
            >
              🔒 Generar contraseña
            </Link>
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <AdBlock slot="1234567890" format="horizontal" />
      </div>

      {/* Herramientas */}
      <section className="py-16 px-4" aria-labelledby="herramientas-h2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="herramientas-h2" className="text-2xl md:text-3xl font-bold text-white mb-3">
              Elige tu herramienta
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Haz clic y empieza en segundos. Sin formularios, sin esperas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HERRAMIENTAS.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className={`group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 ${COLOR_MAP[h.color]}`}
                aria-label={`Ir a ${h.titulo}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${ICON_BG[h.color]} transition-all duration-300`}>
                    {h.emoji}
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                    {h.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1.5">{h.titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
                <div className="mt-4 text-sm font-medium flex items-center gap-1 text-slate-600 group-hover:text-current transition-colors">
                  Abrir <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}

            {/* Promo card */}
            <div className="bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-900/40 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-3" aria-hidden="true">✨</div>
                <h3 className="text-white font-semibold text-lg mb-2">100% Gratuito</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Sin suscripción, sin límites de uso, sin datos personales. Solo herramientas que funcionan.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-1.5">
                {['Sin registro', 'Sin límites', 'Funciona offline'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-emerald-400" aria-hidden="true">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué */}
      <section className="py-16 px-4 bg-slate-900/40 border-y border-slate-800/60" aria-labelledby="porque-h2">
        <div className="max-w-5xl mx-auto">
          <h2 id="porque-h2" className="text-2xl font-bold text-white text-center mb-12">
            ¿Por qué GeneradorRandom?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', titulo: 'Instantáneo', desc: 'Resultado en menos de un segundo, sin esperas ni carga.' },
              { icon: '🔐', titulo: 'Privado', desc: 'Todo se genera en tu navegador. Nada se guarda en servidores.' },
              { icon: '📱', titulo: 'Responsive', desc: 'Funciona perfecto en móvil, tablet y escritorio.' },
              { icon: '♾️', titulo: 'Sin límites', desc: 'Genera todo lo que quieras, sin cuotas ni restricciones.' },
            ].map((item) => (
              <div key={item.titulo} className="text-center p-5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad inferior */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <AdBlock slot="0987654321" format="horizontal" />
      </div>
    </div>
  )
}
