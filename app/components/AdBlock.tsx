'use client'

import { useEffect } from 'react'

interface AdBlockProps {
  slot: string
  format?: 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdBlock({ slot, format = 'horizontal', className = '' }: AdBlockProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      }
    } catch {}
  }, [])

  const dimensiones = {
    horizontal: { width: '100%', height: '90px', label: 'Anuncio (728×90)' },
    vertical: { width: '300px', height: '600px', label: 'Anuncio (300×600)' },
    rectangle: { width: '336px', height: '280px', label: 'Anuncio (336×280)' },
  }[format]

  const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  if (!CLIENT_ID) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm ${className}`}
        style={{ minHeight: dimensiones.height, width: dimensiones.width }}
        aria-label="Espacio publicitario"
      >
        {dimensiones.label}
      </div>
    )
  }

  return (
    <div className={`flex justify-center ${className}`} aria-label="Anuncio">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: dimensiones.width, height: dimensiones.height }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
