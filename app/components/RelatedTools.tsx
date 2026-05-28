import Link from 'next/link'

const ALL_TOOLS = [
  { href: '/generadores/nombres',            emoji: '👤', label: 'Generador de Nombres',     desc: 'Personas, empresas y mascotas.' },
  { href: '/generadores/contrasenas',        emoji: '🔒', label: 'Contraseñas Seguras',       desc: 'Personalizables al instante.' },
  { href: '/generadores/colores',            emoji: '🎨', label: 'Paletas de Colores',        desc: 'HEX y RGB listos para copiar.' },
  { href: '/generadores/historias',          emoji: '📖', label: 'Generador de Historias',    desc: 'Aventura, romance, misterio.' },
  { href: '/generadores/chistes',            emoji: '😂', label: 'Chistes Malos',             desc: 'Revela el remate y comparte.' },
  { href: '/generadores/chistes-argentinos', emoji: '🇦🇷', label: 'Chistes Argentinos',      desc: 'Con lunfardo y sin filtro.' },
  { href: '/generadores/ruleta',             emoji: '🎡', label: 'Ruleta Aleatoria',          desc: 'Sorteos y decisiones al azar.' },
  { href: '/generadores/numeros',            emoji: '🎲', label: 'Número al Azar',            desc: 'Elegí el rango que quieras.' },
  { href: '/generadores/moneda',             emoji: '🪙', label: 'Cara o Cruz',               desc: '50/50 garantizado.' },
]

interface RelatedToolsProps {
  current: string
}

export default function RelatedTools({ current }: RelatedToolsProps) {
  const tools = ALL_TOOLS.filter(t => t.href !== current).slice(0, 4)

  return (
    <section className="mt-10" aria-label="Otras herramientas gratuitas">
      <h2 className="text-white font-bold text-lg mb-4">Otras herramientas gratuitas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 hover:border-blue-600/40 hover:bg-gray-800 transition-all group block"
          >
            <div className="text-2xl mb-2 leading-none" aria-hidden="true">{tool.emoji}</div>
            <p className="text-white text-sm font-semibold leading-tight group-hover:text-blue-400 transition-colors">
              {tool.label}
            </p>
            <p className="text-gray-500 text-xs mt-1 leading-tight">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
