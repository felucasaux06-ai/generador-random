import Link from 'next/link'

const HERRAMIENTAS = [
  { href: '/generadores/nombres',     label: 'Generador de Nombres' },
  { href: '/generadores/contrasenas', label: 'Generador de Contraseñas' },
  { href: '/generadores/colores',     label: 'Generador de Colores' },
  { href: '/generadores/historias',   label: 'Generador de Historias' },
  { href: '/generadores/chistes',     label: 'Generador de Chistes' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-20" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold text-white">GR</div>
            <span className="font-semibold text-white">generadorrandom.com</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Herramientas creativas gratuitas para nombres, contraseñas, colores, historias y humor.
            Sin registro. Sin límites.
          </p>
        </div>

        {/* Herramientas */}
        <div>
          <h3 className="text-slate-300 font-semibold text-sm mb-4 uppercase tracking-wider">Herramientas</h3>
          <ul className="space-y-2.5">
            {HERRAMIENTAS.map((h) => (
              <li key={h.href}>
                <Link href={h.href} className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-slate-300 font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/privacidad" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                Términos de Uso
              </Link>
            </li>
            <li>
              <Link href="/acerca" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                Acerca de
              </Link>
            </li>
          </ul>
          <div className="mt-6 p-3 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-slate-500 text-xs">
              ✅ Gratis · ✅ Sin registro · ✅ Privado
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 px-4">
        <p className="text-center text-slate-600 text-xs">
          © {year} generadorrandom.com — Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
