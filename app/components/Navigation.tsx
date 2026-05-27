'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/', label: 'Inicio', emoji: '🏠' },
  { href: '/generadores/nombres', label: 'Nombres', emoji: '👤' },
  { href: '/generadores/contrasenas', label: 'Contraseñas', emoji: '🔒' },
  { href: '/generadores/colores', label: 'Colores', emoji: '🎨' },
  { href: '/generadores/historias', label: 'Historias', emoji: '📖' },
  { href: '/generadores/chistes', label: 'Chistes', emoji: '😂' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <nav className="bg-dark shadow-lg sticky top-0 z-50" role="navigation" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg hover:text-blue-400 transition-colors">
            <span className="text-2xl" aria-hidden="true">🎲</span>
            <span>GeneradorRandom</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                <span aria-hidden="true">{link.emoji}</span> {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuAbierto && (
          <div className="md:hidden pb-4 border-t border-gray-700 pt-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-all ${
                  pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setMenuAbierto(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                <span className="text-lg" aria-hidden="true">{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
