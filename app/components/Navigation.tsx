'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import FlagArg from './FlagArg'
import { useLanguage } from '../contexts/LanguageContext'

const LINKS_ES = [
  { href: '/generadores/nombres',            label: 'Nombres',            emoji: '👤', flag: false },
  { href: '/generadores/contrasenas',        label: 'Contraseñas',        emoji: '🔒', flag: false },
  { href: '/generadores/colores',            label: 'Colores',            emoji: '🎨', flag: false },
  { href: '/generadores/historias',          label: 'Historias',          emoji: '📖', flag: false },
  { href: '/generadores/chistes',            label: 'Chistes',            emoji: '😂', flag: false },
  { href: '/generadores/chistes-argentinos', label: 'Chistes Arg.',       emoji: '',   flag: true  },
  { href: '/generadores/ruleta',             label: 'Ruleta',             emoji: '🎡', flag: false },
  { href: '/generadores/numeros',            label: 'Números',            emoji: '🎲', flag: false },
  { href: '/generadores/moneda',             label: 'Moneda',             emoji: '🪙', flag: false },
  { href: '/blog',                           label: 'Blog',               emoji: '📝', flag: false },
]

const LINKS_EN = [
  { href: '/generadores/nombres',            label: 'Names',              emoji: '👤', flag: false },
  { href: '/generadores/contrasenas',        label: 'Passwords',          emoji: '🔒', flag: false },
  { href: '/generadores/colores',            label: 'Colors',             emoji: '🎨', flag: false },
  { href: '/generadores/historias',          label: 'Stories',            emoji: '📖', flag: false },
  { href: '/generadores/chistes',            label: 'Jokes',              emoji: '😂', flag: false },
  { href: '/generadores/chistes-argentinos', label: 'Arg. Jokes',         emoji: '',   flag: true  },
  { href: '/generadores/ruleta',             label: 'Wheel',              emoji: '🎡', flag: false },
  { href: '/generadores/numeros',            label: 'Numbers',            emoji: '🎲', flag: false },
  { href: '/generadores/moneda',             label: 'Coin',               emoji: '🪙', flag: false },
  { href: '/blog',                           label: 'Blog',               emoji: '📝', flag: false },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const LINKS = lang === 'es' ? LINKS_ES : LINKS_EN

  return (
    <nav
      className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#080808]/95 backdrop-blur-md"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="GeneradorRandom — Inicio">
          <div className="w-8 h-8 rounded-lg bg-fuchsia-600 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-fuchsia-900/40 group-hover:bg-fuchsia-500 transition-colors">
            GR
          </div>
          <span className="font-semibold text-white text-sm hidden lg:block">
            generadorrandom<span className="text-fuchsia-400">.com</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                pathname === l.href
                  ? 'bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
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

        {/* Right side: language toggle + mobile hamburger */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label={t.nav.langLabel}
            className="h-8 px-2.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-fuchsia-600/50 text-zinc-300 hover:text-fuchsia-400 text-xs font-bold transition-all duration-150 tracking-widest"
          >
            {t.nav.langToggle}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span className={`block w-5 h-0.5 bg-zinc-400 transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-zinc-400 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-zinc-400 transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-[#080808] px-4 py-3 space-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === l.href
                  ? 'bg-fuchsia-600/20 text-fuchsia-400'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
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
