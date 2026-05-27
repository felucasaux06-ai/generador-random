import type { Metadata } from 'next'
import Link from 'next/link'
import AdBlock from './components/AdBlock'

export const metadata: Metadata = {
  title: 'Generador Random - Herramientas Creativas Gratuitas Online',
  description:
    'Genera nombres aleatorios, contraseñas seguras, paletas de colores, historias cortas y chistes al instante. 100% gratis, sin registro.',
}

const HERRAMIENTAS = [
  {
    href: '/generadores/nombres',
    emoji: '👤',
    titulo: 'Generador de Nombres',
    descripcion: 'Genera nombres de personas, apellidos, empresas y mascotas al instante.',
    color: 'from-blue-600 to-blue-800',
    badge: '100+ nombres',
  },
  {
    href: '/generadores/contrasenas',
    emoji: '🔒',
    titulo: 'Generador de Contraseñas',
    descripcion: 'Crea contraseñas seguras con longitud y complejidad personalizables.',
    color: 'from-emerald-600 to-emerald-800',
    badge: 'Ultra seguras',
  },
  {
    href: '/generadores/colores',
    emoji: '🎨',
    titulo: 'Generador de Colores',
    descripcion: 'Genera paletas de 5 colores únicos con códigos HEX y RGB listos para copiar.',
    color: 'from-purple-600 to-purple-800',
    badge: 'Para diseñadores',
  },
  {
    href: '/generadores/historias',
    emoji: '📖',
    titulo: 'Generador de Historias',
    descripcion: 'Historias cortas de aventura, romance, misterio y fantasía generadas al azar.',
    color: 'from-amber-600 to-amber-800',
    badge: '4 géneros',
  },
  {
    href: '/generadores/chistes',
    emoji: '😂',
    titulo: 'Generador de Chistes',
    descripcion: 'Chistes malos garantizados. Revela el remate, comparte y vota si te hizo reír.',
    color: 'from-rose-600 to-rose-800',
    badge: '30+ chistes',
  },
]

const STATS = [
  { valor: '5', label: 'Herramientas' },
  { valor: '400+', label: 'Items de datos' },
  { valor: '100%', label: 'Gratis' },
  { valor: '0', label: 'Registro requerido' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-dark to-gray-900 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-6" aria-hidden="true">🎲</div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Tu Suite de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Herramientas Creativas
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            5 generadores en un solo lugar. Nombres, contraseñas, colores, historias y chistes.
            Todo gratis, todo al instante, sin registro.
          </p>
          <Link
            href="/generadores/nombres"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            aria-label="Comenzar con el generador de nombres"
          >
            Empezar Gratis →
          </Link>
        </div>
      </section>

      {/* Ad Superior */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdBlock slot="1234567890" format="horizontal" />
      </div>

      {/* Stats */}
      <section className="py-10 px-4" aria-label="Estadísticas del sitio">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-extrabold text-blue-400">{stat.valor}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Herramientas Grid */}
      <section className="py-12 px-4" aria-labelledby="herramientas-titulo">
        <div className="max-w-7xl mx-auto">
          <h2 id="herramientas-titulo" className="text-3xl font-bold text-white text-center mb-4">
            Elige tu Herramienta
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Haz clic en cualquier generador y empieza a crear al instante.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HERRAMIENTAS.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className="group relative bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                aria-label={`Ir a ${h.titulo}`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${h.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                  {h.emoji}
                </div>
                <span className="absolute top-4 right-4 text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                  {h.badge}
                </span>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {h.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{h.descripcion}</p>
                <div className="mt-4 text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Abrir herramienta <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}

            {/* Card CTA extra */}
            <div className="bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border border-blue-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-3" aria-hidden="true">✨</div>
              <h3 className="text-white font-bold text-lg mb-2">¡Todo Gratis!</h3>
              <p className="text-gray-400 text-sm">
                Sin suscripción, sin límites, sin anuncios intrusivos. Solo herramientas útiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Inferior */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdBlock slot="0987654321" format="horizontal" />
      </div>

      {/* SEO Text */}
      <section className="py-12 px-4 bg-gray-900/50" aria-labelledby="seo-titulo">
        <div className="max-w-4xl mx-auto">
          <h2 id="seo-titulo" className="text-2xl font-bold text-white mb-6 text-center">
            ¿Por qué usar GeneradorRandom?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-400 text-sm leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">🎯 Herramientas en un solo lugar</h3>
              <p>
                Ya sea que necesites un nombre creativo para tu personaje, una contraseña robusta para tu cuenta,
                la paleta perfecta para tu diseño o simplemente un chiste para animar el día, lo tienes todo aquí.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">⚡ Rápido y sin complicaciones</h3>
              <p>
                Sin formularios de registro, sin email de confirmación, sin suscripciones de pago.
                Llegas, haces clic y obtienes tu resultado en menos de un segundo.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">📱 Funciona en cualquier dispositivo</h3>
              <p>
                Diseño mobile-first que se adapta perfectamente a teléfonos, tabletas y escritorios.
                Genera lo que necesites desde donde estés.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">🔐 Privacidad garantizada</h3>
              <p>
                Todo se genera en tu navegador. No guardamos tus contraseñas ni datos personales en ningún servidor.
                Tu privacidad es lo primero.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
