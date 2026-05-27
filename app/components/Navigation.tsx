'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/generadores/nombres',            label: 'Nombres',          emoji: '👤' },
  { href: '/generadores/contrasenas',        label: 'Contraseñas',      emoji: '🔒' },
  { href: '/generadores/colores',            label: 'Colores',          emoji: '🎨' },
  { href: '/generadores/historias',          label: 'Historias',        emoji: '📖' },
  { href: '/generadores/chistes',            label: 'Chistes',          emoji: '😂' },
  { href: '/generadores/chistes-argentinos', label: 'Chistes Arg.',     emoji: '🇦🇷', flag: true },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="GeneradorRandom — Inicio">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-900/40 group-hover:bg-blue-500 transition-colors">
            GR
          </div>
          <span className="font-semibold text-white text-sm hidden sm:block">
            generadorrandom<span className="text-blue-400">.com</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === l.href
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.flag && <span className="text-base leading-none" aria-hidden="true">🇦🇷</span>}
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                pathname === l.href
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">{l.emoji}</span>
              {l.flag ? 'Chistes Argentinos' : l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
