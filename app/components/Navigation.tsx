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
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ background: 'rgba(10, 7, 5, 0.96)', borderBottom: '1px solid #2C2015' }}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group" aria-label="GeneradorRandom — Inicio">
          <span
            className="font-display text-lg tracking-tight transition-colors duration-150"
            style={{ color: '#F2E9D4' }}
          >
            GR<span style={{ color: '#E8531E' }}>.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0 overflow-x-auto no-scrollbar flex-1 justify-center">
          {LINKS.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative flex items-center gap-1 px-2.5 py-5 text-xs font-semibold tracking-widest uppercase transition-all duration-150 whitespace-nowrap"
                style={{ color: active ? '#E8531E' : '#8A7862' }}
                aria-current={active ? 'page' : undefined}
              >
                {active && (
                  <span
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: '#E8531E' }}
                    aria-hidden="true"
                  />
                )}
                {l.flag
                  ? <FlagArg className="w-4 h-3" />
                  : <span aria-hidden="true" className="text-sm">{l.emoji}</span>
                }
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Lang + hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label={t.nav.langLabel}
            className="h-7 px-3 text-xs font-bold font-mono tracking-widest transition-all duration-150"
            style={{
              border: '1px solid #2C2015',
              color: '#8A7862',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#E8531E'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#E8531E'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = '#8A7862'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#5A4A35'
            }}
          >
            {t.nav.langToggle}
          </button>

          <button
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 transition-colors"
            style={{ color: '#8A7862' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span className={`block w-5 h-px transition-all duration-200 origin-center`}
              style={{ background: '#A09080', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span className={`block w-5 h-px transition-all duration-200`}
              style={{ background: '#A09080', opacity: open ? 0 : 1 }} />
            <span className={`block w-5 h-px transition-all duration-200 origin-center`}
              style={{ background: '#A09080', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 py-3 space-y-0.5" style={{ borderTop: '1px solid #2C2015', background: '#0A0705' }}>
          {LINKS.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all"
                style={{
                  color: active ? '#E8531E' : '#8A7862',
                  borderLeft: active ? '2px solid #E8531E' : '2px solid transparent',
                  background: active ? 'rgba(232, 83, 30, 0.06)' : 'transparent',
                }}
                onClick={() => setOpen(false)}
              >
                {l.flag
                  ? <FlagArg className="w-5 h-3.5" />
                  : <span aria-hidden="true" className="text-base w-5 text-center">{l.emoji}</span>
                }
                {l.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
