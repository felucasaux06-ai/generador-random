'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const aceptar = () => {
    localStorage.setItem('cookie-consent', 'all')
    setVisible(false)
  }

  const esenciales = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 shadow-2xl shadow-black/50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-slate-400 leading-relaxed">
          <span className="text-white font-semibold">🍪 Usamos cookies</span>{' '}
          para analítica (Google Analytics) y publicidad (Google AdSense). Ningún dato personal
          es recopilado. Podés aceptar todas o solo las esenciales.{' '}
          <Link href="/privacidad" className="text-blue-400 hover:underline whitespace-nowrap">
            Más información
          </Link>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={esenciales}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white border border-slate-600 hover:border-slate-500 transition-colors"
          >
            Solo esenciales
          </button>
          <button
            onClick={aceptar}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  )
}
