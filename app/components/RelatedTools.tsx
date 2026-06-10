import Link from 'next/link'

const ALL_TOOLS = [
  { href: '/generadores/nombres',     emoji: '👤', label: 'Generador de Nombres',  desc: 'Personas, empresas y mascotas.' },
  { href: '/generadores/contrasenas', emoji: '🔒', label: 'Contraseñas Seguras',   desc: 'Personalizables al instante.' },
  { href: '/generadores/colores',     emoji: '🎨', label: 'Paletas de Colores',    desc: 'HEX y RGB listos para copiar.' },
  { href: '/generadores/historias',   emoji: '📖', label: 'Generador de Historias', desc: 'Aventura, romance, misterio.' },
  { href: '/generadores/ruleta',      emoji: '🎡', label: 'Ruleta Aleatoria',      desc: 'Sorteos y decisiones al azar.' },
  { href: '/generadores/numeros',     emoji: '🎲', label: 'Número al Azar',        desc: 'Elegí el rango que quieras.' },
  { href: '/generadores/cara-o-cruz', emoji: '🪙', label: 'Cara o Cruz',           desc: '50/50 garantizado.' },
  { href: '/generadores/chistes',     emoji: '😂', label: 'Chistes Aleatorios',    desc: 'Para romper el hielo.' },
]

// Clusters tematicos: cada herramienta enlaza primero a las mas afines
const RELATED: Record<string, string[]> = {
  '/generadores/nombres':     ['/generadores/historias', '/generadores/contrasenas', '/generadores/colores', '/generadores/ruleta'],
  '/generadores/contrasenas': ['/generadores/numeros', '/generadores/nombres', '/generadores/colores', '/generadores/cara-o-cruz'],
  '/generadores/colores':     ['/generadores/nombres', '/generadores/historias', '/generadores/numeros', '/generadores/ruleta'],
  '/generadores/historias':   ['/generadores/nombres', '/generadores/colores', '/generadores/chistes', '/generadores/ruleta'],
  '/generadores/ruleta':      ['/generadores/cara-o-cruz', '/generadores/numeros', '/generadores/nombres', '/generadores/historias'],
  '/generadores/numeros':     ['/generadores/ruleta', '/generadores/cara-o-cruz', '/generadores/contrasenas', '/generadores/nombres'],
  '/generadores/cara-o-cruz': ['/generadores/ruleta', '/generadores/numeros', '/generadores/nombres', '/generadores/chistes'],
  '/generadores/chistes':     ['/generadores/historias', '/generadores/nombres', '/generadores/ruleta', '/generadores/cara-o-cruz'],
  '/generadores/chistes-argentinos': ['/generadores/chistes', '/generadores/historias', '/generadores/nombres', '/generadores/ruleta'],
}

interface RelatedToolsProps {
  current: string
}

export default function RelatedTools({ current }: RelatedToolsProps) {
  const order = RELATED[current]
  const tools = order
    ? order
        .map(href => ALL_TOOLS.find(t => t.href === href))
        .filter((t): t is (typeof ALL_TOOLS)[number] => Boolean(t))
        .slice(0, 4)
    : ALL_TOOLS.filter(t => t.href !== current).slice(0, 4)

  return (
    <section className="mt-10" aria-label="Otras herramientas gratuitas">
      <h2 className="text-white font-bold text-lg mb-4">Otras herramientas gratuitas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-[#E8531E]/40 hover:bg-zinc-800 transition-all group block"
          >
            <div className="text-2xl mb-2 leading-none" aria-hidden="true">{tool.emoji}</div>
            <p className="text-white text-sm font-semibold leading-tight group-hover:text-[#E8531E] transition-colors">
              {tool.label}
            </p>
            <p className="text-gray-500 text-xs mt-1 leading-tight">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
