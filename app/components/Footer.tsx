import Link from 'next/link'

export default function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="bg-dark border-t border-gray-700 mt-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl" aria-hidden="true">🎲</span>
              <span className="text-white font-bold text-lg">GeneradorRandom</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu suite de herramientas creativas online. Genera nombres, contraseñas seguras,
              paletas de colores, historias e incluso chistes, todo en un solo lugar.
            </p>
          </div>

          {/* Herramientas */}
          <div>
            <h3 className="text-white font-semibold mb-4">Herramientas</h3>
            <ul className="space-y-2">
              {[
                { href: '/generadores/nombres', label: '👤 Generador de Nombres' },
                { href: '/generadores/contrasenas', label: '🔒 Generador de Contraseñas' },
                { href: '/generadores/colores', label: '🎨 Generador de Colores' },
                { href: '/generadores/historias', label: '📖 Generador de Historias' },
                { href: '/generadores/chistes', label: '😂 Generador de Chistes' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✅ 100% Gratuito</li>
              <li>✅ Sin registro requerido</li>
              <li>✅ Funciona en móvil y escritorio</li>
              <li>✅ Actualizado constantemente</li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-500">
                ¿Tienes sugerencias?{' '}
                <a
                  href="mailto:contacto@generadorrandom.com"
                  className="text-blue-400 hover:underline"
                >
                  Contáctanos
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {anio} GeneradorRandom.com · Todos los derechos reservados
          </p>
          <p className="text-gray-600 text-xs">
            Hecho con ❤️ para creativos, desarrolladores y gente curiosa
          </p>
        </div>
      </div>
    </footer>
  )
}
