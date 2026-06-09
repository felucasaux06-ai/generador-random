'use client'

import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

const HERRAMIENTAS_ES = [
  { href: '/generadores/nombres',     label: 'Generador de Nombres' },
  { href: '/generadores/contrasenas', label: 'Generador de Contraseñas' },
  { href: '/generadores/colores',     label: 'Generador de Colores' },
  { href: '/generadores/historias',   label: 'Generador de Historias' },
  { href: '/generadores/ruleta',      label: 'Ruleta Aleatoria' },
  { href: '/generadores/numeros',     label: 'Número al Azar' },
  { href: '/generadores/cara-o-cruz', label: 'Cara o Cruz' },
]

const HERRAMIENTAS_EN = [
  { href: '/generadores/nombres',     label: 'Name Generator' },
  { href: '/generadores/contrasenas', label: 'Password Generator' },
  { href: '/generadores/colores',     label: 'Color Generator' },
  { href: '/generadores/historias',   label: 'Story Generator' },
  { href: '/generadores/ruleta',      label: 'Spin the Wheel' },
  { href: '/generadores/numeros',     label: 'Random Number' },
  { href: '/generadores/cara-o-cruz', label: 'Heads or Tails' },
]

export default function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()
  const HERRAMIENTAS = lang === 'es' ? HERRAMIENTAS_ES : HERRAMIENTAS_EN
  const half = Math.ceil(HERRAMIENTAS.length / 2)

  return (
    <footer
      className="mt-20 border-t border-outline-variant"
      style={{ background: '#0d0a08' }}
      role="contentinfo"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" aria-label="GeneradorRandom — Inicio">
            <span className="font-display text-2xl font-extrabold tracking-tighter text-primary">
              GR<span className="text-glow-orange">.</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed font-mono text-on-surface-variant">
            {t.footer.tagline}
          </p>
          <div className="mt-6 inline-block px-4 py-2 rounded-lg font-mono text-xs text-on-surface-variant border border-outline-variant">
            {t.footer.badges}
          </div>
        </div>

        {/* Tools col 1 */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-outline mb-5">
            {t.footer.tools}
          </h3>
          <ul className="space-y-3">
            {HERRAMIENTAS.slice(0, half).map((h) => (
              <li key={h.href}>
                <Link
                  href={h.href}
                  className="text-sm text-on-surface-variant transition-colors hover:text-primary"
                >
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools col 2 */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-outline mb-5 sm:opacity-0 lg:opacity-100">
            &nbsp;
          </h3>
          <ul className="space-y-3">
            {HERRAMIENTAS.slice(half).map((h) => (
              <li key={h.href}>
                <Link
                  href={h.href}
                  className="text-sm text-on-surface-variant transition-colors hover:text-primary"
                >
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Site links */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-outline mb-5">
            {t.footer.site}
          </h3>
          <ul className="space-y-3">
            {[
              { href: '/blog',       label: 'Blog' },
              { href: '/acerca',     label: t.footer.about },
              { href: '/contacto',   label: t.footer.contact },
              { href: '/privacidad', label: t.footer.privacy },
              { href: '/terminos',   label: t.footer.terms },
              { href: '/disclaimer', label: t.footer.disclaimer },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-on-surface-variant transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant py-5 px-5">
        <p className="text-center text-xs font-mono text-outline">
          {t.footer.copyright(year)}
        </p>
      </div>
    </footer>
  )
}
