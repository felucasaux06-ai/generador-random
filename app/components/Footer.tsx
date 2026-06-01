'use client'

import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

const HERRAMIENTAS_ES = [
  { href: '/generadores/nombres',            label: 'Generador de Nombres' },
  { href: '/generadores/contrasenas',        label: 'Generador de Contraseñas' },
  { href: '/generadores/colores',            label: 'Generador de Colores' },
  { href: '/generadores/historias',          label: 'Generador de Historias' },
  { href: '/generadores/chistes',            label: 'Generador de Chistes' },
  { href: '/generadores/chistes-argentinos', label: 'Chistes Argentinos' },
  { href: '/generadores/ruleta',             label: 'Ruleta Aleatoria' },
  { href: '/generadores/numeros',            label: 'Número al Azar' },
  { href: '/generadores/moneda',             label: 'Cara o Cruz' },
]

const HERRAMIENTAS_EN = [
  { href: '/generadores/nombres',            label: 'Name Generator' },
  { href: '/generadores/contrasenas',        label: 'Password Generator' },
  { href: '/generadores/colores',            label: 'Color Generator' },
  { href: '/generadores/historias',          label: 'Story Generator' },
  { href: '/generadores/chistes',            label: 'Joke Generator' },
  { href: '/generadores/chistes-argentinos', label: 'Argentine Jokes' },
  { href: '/generadores/ruleta',             label: 'Spin the Wheel' },
  { href: '/generadores/numeros',            label: 'Random Number' },
  { href: '/generadores/moneda',             label: 'Heads or Tails' },
]

export default function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()
  const HERRAMIENTAS = lang === 'es' ? HERRAMIENTAS_ES : HERRAMIENTAS_EN

  return (
    <footer className="border-t border-zinc-800 bg-[#080808] mt-20" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fuchsia-600 flex items-center justify-center text-sm font-bold text-white">GR</div>
            <span className="font-semibold text-white">generadorrandom.com</span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            {t.footer.tagline}
          </p>
        </div>

        {/* Herramientas */}
        <div>
          <h3 className="text-zinc-300 font-semibold text-sm mb-4 uppercase tracking-wider">{t.footer.tools}</h3>
          <ul className="space-y-2.5">
            {HERRAMIENTAS.map((h) => (
              <li key={h.href}>
                <Link href={h.href} className="text-zinc-500 hover:text-fuchsia-400 text-sm transition-colors">
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal y sitio */}
        <div>
          <h3 className="text-zinc-300 font-semibold text-sm mb-4 uppercase tracking-wider">{t.footer.site}</h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/blog" className="text-zinc-500 hover:text-fuchsia-400 text-sm transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/acerca" className="text-zinc-500 hover:text-fuchsia-400 text-sm transition-colors">
                {t.footer.about}
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="text-zinc-500 hover:text-fuchsia-400 text-sm transition-colors">
                {t.footer.contact}
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="text-zinc-500 hover:text-fuchsia-400 text-sm transition-colors">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="text-zinc-500 hover:text-fuchsia-400 text-sm transition-colors">
                {t.footer.terms}
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="text-zinc-500 hover:text-fuchsia-400 text-sm transition-colors">
                {t.footer.disclaimer}
              </Link>
            </li>
          </ul>
          <div className="mt-6 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="text-zinc-500 text-xs">
              {t.footer.badges}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-5 px-4">
        <p className="text-center text-zinc-600 text-xs">
          {t.footer.copyright(year)}
        </p>
      </div>
    </footer>
  )
}
