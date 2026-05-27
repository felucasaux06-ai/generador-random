'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import FlagArg from './FlagArg'

const LINKS = [
  { href: '/generadores/nombres',            label: 'Nombres',            emoji: '👤', flag: false },
  { href: '/generadores/contrasenas',        label: 'Contraseñas',        emoji: '🔒', flag: false },
  { href: '/generadores/colores',            label: 'Colores',            emoji: '🎨', flag: false },
  { href: '/generadores/historias',          label: 'Historias',          emoji: '📖', flag: false },
  { href: '/generadores/chistes',            label: 'Chistes',            emoji: '😂', flag: false },
  { href: '/generadores/chistes-argentinos', label: 'Chistes Argentinos', emoji: '',   flag: true  },
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
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="GeneradorRandom — Inicio">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-900/40 group-hover:bg-blue-500 transition-colors">
            GR
          </div>
          <span className="font-semibold text-white text-sm hidden lg:block">
            generadorrandom<span className="text-blue-400">.com</span>
          </span>
        </Link>

        {/* Desktop nav — scroll horizontal si no entra */}
        <div className="hidden md:flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                pathname === l.href
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.flag
                ? <FlagArg className="w-5 h-3.5" />
                : <span aria-hidden="true" className="text-sm">{l.emoji}</span>
              }
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === l.href
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              onClick={() => setOpen(false)}
            >
              {l.flag
                ? <FlagArg className="w-6 h-4" />
                : <span aria-hidden="true" className="text-lg w-6 text-center">{l.emoji}</span>
              }
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
