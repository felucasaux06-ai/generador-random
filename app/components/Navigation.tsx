'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import FlagArg from './FlagArg'
import { useLanguage } from '../contexts/LanguageContext'

const LINKS_ES = [
  { href: '/generadores/nombres',            label: 'Nombres',      emoji: '👤', flag: false },
  { href: '/generadores/contrasenas',        label: 'Contraseñas',  emoji: '🔒', flag: false },
  { href: '/generadores/colores',            label: 'Colores',      emoji: '🎨', flag: false },
  { href: '/generadores/historias',          label: 'Historias',    emoji: '📖', flag: false },
  { href: '/generadores/chistes',            label: 'Chistes',      emoji: '😂', flag: false },
  { href: '/generadores/chistes-argentinos', label: 'Chistes Arg.', emoji: '',   flag: true  },
  { href: '/generadores/ruleta',             label: 'Ruleta',       emoji: '🎡', flag: false },
  { href: '/generadores/numeros',            label: 'Números',      emoji: '🎲', flag: false },
  { href: '/generadores/moneda',             label: 'Moneda',       emoji: '🪙', flag: false },
  { href: '/blog',                           label: 'Blog',         emoji: '📝', flag: false },
]

const LINKS_EN = [
  { href: '/generadores/nombres',            label: 'Names',        emoji: '👤', flag: false },
  { href: '/generadores/contrasenas',        label: 'Passwords',    emoji: '🔒', flag: false },
  { href: '/generadores/colores',            label: 'Colors',       emoji: '🎨', flag: false },
  { href: '/generadores/historias',          label: 'Stories',      emoji: '📖', flag: false },
  { href: '/generadores/chistes',            label: 'Jokes',        emoji: '😂', flag: false },
  { href: '/generadores/chistes-argentinos', label: 'Arg. Jokes',   emoji: '',   flag: true  },
  { href: '/generadores/ruleta',             label: 'Wheel',        emoji: '🎡', flag: false },
  { href: '/generadores/numeros',            label: 'Numbers',      emoji: '🎲', flag: false },
  { href: '/generadores/moneda',             label: 'Coin',         emoji: '🪙', flag: false },
  { href: '/blog',                           label: 'Blog',         emoji: '📝', flag: false },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const LINKS = lang === 'es' ? LINKS_ES : LINKS_EN

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#141414] bg-[#080808]/98 backdrop-blur-md"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="GeneradorRandom — Inicio">
          <span className="font-mono text-[#333] text-xs group-hover:text-[#555] transition-colors select-none">//</span>
          <span className="font-black text-white text-sm tracking-tight group-hover:text-[#bbff00] transition-colors duration-150">
            GR<span className="text-[#bbff00]">.</span>
          </span>
          <span className="text-[#2a2a2a] font-mono text-[11px] hidden lg:block select-none">
            generadorrandom.com
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0 overflow-x-auto no-scrollbar">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative flex items-center gap-1.5 px-2.5 py-5 text-xs font-semibold transition-all duration-150 whitespace-nowrap tracking-wide uppercase ${
                pathname === l.href
                  ? 'text-[#bbff00]'
                  : 'text-[#444] hover:text-[#ccc]'
              }`}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {pathname === l.href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#bbff00]" aria-hidden="true" />
              )}
              {l.flag
                ? <FlagArg className="w-4 h-3" />
                : <span aria-hidden="true" className="text-sm">{l.emoji}</span>
              }
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right: lang + hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label={t.nav.langLabel}
            className="h-7 px-3 border border-[#222] hover:border-[#bbff00]/50 text-[#444] hover:text-[#bbff00] text-xs font-bold font-mono transition-all duration-150 tracking-widest"
          >
            {t.nav.langToggle}
          </button>

          <button
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 hover:bg-[#111] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span className={`block w-5 h-px bg-[#666] transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-[#666] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#666] transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#141414] bg-[#080808] px-4 py-3 space-y-0.5">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-all border-l-2 ${
                pathname === l.href
                  ? 'border-[#bbff00] text-[#bbff00] bg-[#bbff00]/5'
                  : 'border-transparent text-[#444] hover:text-white hover:bg-[#0f0f0f]'
              }`}
              onClick={() => setOpen(false)}
            >
              {l.flag
                ? <FlagArg className="w-5 h-3.5" />
                : <span aria-hidden="true" className="text-base w-5 text-center">{l.emoji}</span>
              }
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
