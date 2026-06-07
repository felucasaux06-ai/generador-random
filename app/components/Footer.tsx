'use client'

import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

const HERRAMIENTAS_ES = [
  { href: '/generadores/nombres',            label: 'Generador de Nombres' },
  { href: '/generadores/contrasenas',        label: 'Generador de Contraseñas' },
  { href: '/generadores/colores',            label: 'Generador de Colores' },
  { href: '/generadores/historias',          label: 'Generador de Historias' },
  { href: '/generadores/ruleta',             label: 'Ruleta Aleatoria' },
  { href: '/generadores/numeros',            label: 'Número al Azar' },
  { href: '/generadores/cara-o-cruz',             label: 'Cara o Cruz' },
]

const HERRAMIENTAS_EN = [
  { href: '/generadores/nombres',            label: 'Name Generator' },
  { href: '/generadores/contrasenas',        label: 'Password Generator' },
  { href: '/generadores/colores',            label: 'Color Generator' },
  { href: '/generadores/historias',          label: 'Story Generator' },
  { href: '/generadores/ruleta',             label: 'Spin the Wheel' },
  { href: '/generadores/numeros',            label: 'Random Number' },
  { href: '/generadores/cara-o-cruz',             label: 'Heads or Tails' },
]

export default function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()
  const HERRAMIENTAS = lang === 'es' ? HERRAMIENTAS_ES : HERRAMIENTAS_EN

  return (
    <footer className="mt-20" style={{ borderTop: '1px solid #2C2015', background: '#0A0705' }} role="contentinfo">
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>
          <p className="font-display text-2xl mb-4" style={{ color: '#F2E9D4' }}>
            GR<span style={{ color: '#E8531E' }}>.</span>
          </p>
          <p className="text-sm leading-relaxed font-mono" style={{ color: '#B8A898' }}>
            {t.footer.tagline}
          </p>
        </div>

        {/* Herramientas */}
        <div>
          <h3 className="font-mono text-xs mb-5 uppercase tracking-[0.2em]" style={{ color: '#7A6A55' }}>
            {t.footer.tools}
          </h3>
          <ul className="space-y-2.5">
            {HERRAMIENTAS.map((h) => (
              <li key={h.href}>
                <Link
                  href={h.href}
                  className="text-sm transition-colors duration-150"
                  style={{ color: '#B8A898' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8531E')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#B8A898')}
                >
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-mono text-xs mb-5 uppercase tracking-[0.2em]" style={{ color: '#7A6A55' }}>
            {t.footer.site}
          </h3>
          <ul className="space-y-2.5">
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
                  className="text-sm transition-colors duration-150"
                  style={{ color: '#B8A898' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8531E')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#B8A898')}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-3" style={{ border: '1px solid #1E160D', background: '#0D0A06' }}>
            <p className="text-xs font-mono" style={{ color: '#7A6A55' }}>{t.footer.badges}</p>
          </div>
        </div>
      </div>

      <div className="py-5 px-5" style={{ borderTop: '1px solid #1E160D' }}>
        <p className="text-center text-xs font-mono" style={{ color: '#7A6A55' }}>
          {t.footer.copyright(year)}
        </p>
      </div>
    </footer>
  )
}
