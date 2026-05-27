'use client'

import { useEffect } from 'react'

interface AdBlockProps {
  slot: string
  className?: string
}

declare global {
  interface Window { adsbygoogle: unknown[] }
}

export default function AdBlock({ slot, className = '' }: AdBlockProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      }
    } catch {}
  }, [])

  const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  if (!CLIENT_ID) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-900/50 border border-dashed border-slate-700 rounded-xl text-slate-600 text-xs h-16 ${className}`}
        aria-label="Espacio publicitario"
      >
        Publicidad
      </div>
    )
  }

  return (
    <div className={`w-full overflow-hidden rounded-xl ${className}`} aria-label="Anuncio">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
