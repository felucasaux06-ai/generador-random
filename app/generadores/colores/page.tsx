'use client'

import { useState, useEffect, useCallback } from 'react'
import AdBlock from '../../components/AdBlock'
import { generarPaleta, hexARgb, esColorClaro, copiarAlPortapapeles } from '../../lib/utils'

interface ColorGuardado {
  hex: string
  fecha: string
}

export default function GeneradorColores() {
  const [paleta, setPaleta] = useState<string[]>([])
  const [favoritos, setFavoritos] = useState<ColorGuardado[]>([])
  const [copiadoId, setCopiadoId] = useState<string | null>(null)
  const [palCopiada, setPalCopiada] = useState(false)

  useEffect(() => {
    setPaleta(generarPaleta())
    const guardados = localStorage.getItem('colores-favoritos')
    if (guardados) {
      try { setFavoritos(JSON.parse(guardados)) } catch {}
    }
  }, [])

  const regenerar = () => setPaleta(generarPaleta())

  const copiarColor = async (hex: string) => {
    const ok = await copiarAlPortapapeles(hex)
    if (ok) {
      setCopiadoId(hex)
      setTimeout(() => setCopiadoId(null), 1800)
    }
  }

  const copiarPaleta = async () => {
    const texto = paleta.join(', ')
    const ok = await copiarAlPortapapeles(texto)
    if (ok) {
      setPalCopiada(true)
      setTimeout(() => setPalCopiada(false), 2000)
    }
  }

  const guardarColor = useCallback((hex: string) => {
    setFavoritos((prev) => {
      if (prev.some((f) => f.hex === hex)) return prev
      const nuevos: ColorGuardado[] = [
        { hex, fecha: new Date().toLocaleDateString('es') },
        ...prev,
      ].slice(0, 20)
      localStorage.setItem('colores-favoritos', JSON.stringify(nuevos))
      return nuevos
    })
  }, [])

  const eliminarFavorito = useCallback((hex: string) => {
    setFavoritos((prev) => {
      const nuevos = prev.filter((f) => f.hex !== hex)
      localStorage.setItem('colores-favoritos', JSON.stringify(nuevos))
      return nuevos
    })
  }, [])

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">🎨</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Generador de Colores</h1>
          <p className="text-gray-400 text-lg">
            Paletas de 5 colores únicas con HEX y RGB. Guarda tus favoritos para más tarde.
          </p>
        </div>

        {/* Ad Superior */}
        <AdBlock slot="6789012345" format="horizontal" className="mb-8" />

        {/* Paleta principal */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden mb-6">
          {/* Vista paleta */}
          <div className="flex h-40 md:h-56" role="list" aria-label="Paleta de colores generada">
            {paleta.map((hex) => {
              const { r, g, b } = hexARgb(hex)
              const textoClaro = esColorClaro(hex)
              return (
                <div
                  key={hex}
                  style={{ backgroundColor: hex }}
                  className="flex-1 relative group cursor-pointer transition-all duration-200 hover:flex-[1.5]"
                  role="listitem"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${textoClaro ? 'bg-black/30 text-black' : 'bg-white/30 text-white'}`}>
                      {hex.toUpperCase()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Lista de colores */}
          <div className="p-4 space-y-3">
            {paleta.map((hex) => {
              const { r, g, b } = hexARgb(hex)
              return (
                <div key={hex} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-xl group">
                  <div
                    className="w-12 h-12 rounded-lg border border-gray-600 flex-shrink-0 shadow-md"
                    style={{ backgroundColor: hex }}
                    aria-label={`Muestra de color ${hex}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-mono font-bold text-lg">{hex.toUpperCase()}</p>
                    <p className="text-gray-400 text-sm font-mono">rgb({r}, {g}, {b})</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => copiarColor(hex)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        copiadoId === hex
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 hover:bg-gray-500 text-gray-300 hover:text-white'
                      }`}
                      aria-label={`Copiar color ${hex}`}
                    >
                      {copiadoId === hex ? '✅' : '📋 HEX'}
                    </button>
                    <button
                      onClick={() => copiarAlPortapapeles(`rgb(${r}, ${g}, ${b})`)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-600 hover:bg-gray-500 text-gray-300 hover:text-white transition-all"
                      aria-label={`Copiar RGB de color ${hex}`}
                    >
                      📋 RGB
                    </button>
                    <button
                      onClick={() => guardarColor(hex)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600/30 hover:bg-amber-600/50 text-amber-400 hover:text-amber-300 transition-all"
                      aria-label={`Guardar color ${hex} en favoritos`}
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Botones de acción */}
          <div className="px-4 pb-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={regenerar}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Generar nueva paleta de colores"
            >
              🎨 Nueva paleta
            </button>
            <button
              onClick={copiarPaleta}
              className={`flex-1 font-bold py-3 px-6 rounded-xl border-2 transition-all duration-200 ${
                palCopiada
                  ? 'border-green-500 bg-green-600/20 text-green-400'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
              }`}
              aria-label="Copiar todos los colores de la paleta"
            >
              {palCopiada ? '✅ ¡Copiada!' : '📋 Copiar paleta'}
            </button>
          </div>
        </div>

        {/* Favoritos */}
        {favoritos.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span aria-hidden="true">⭐</span> Colores guardados ({favoritos.length})
            </h2>
            <div className="flex flex-wrap gap-3">
              {favoritos.map((fav) => (
                <div key={fav.hex} className="group relative">
                  <div
                    className="w-12 h-12 rounded-xl border border-gray-600 cursor-pointer shadow-md hover:scale-110 transition-transform"
                    style={{ backgroundColor: fav.hex }}
                    onClick={() => copiarColor(fav.hex)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Copiar color favorito ${fav.hex}`}
                    onKeyDown={(e) => e.key === 'Enter' && copiarColor(fav.hex)}
                  />
                  <button
                    onClick={() => eliminarFavorito(fav.hex)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    aria-label={`Eliminar color ${fav.hex} de favoritos`}
                  >
                    ×
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-1 font-mono">
                    {fav.hex.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info SEO */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 text-gray-400 text-sm leading-relaxed mb-8">
          <h2 className="text-white font-semibold mb-2">Para diseñadores y creativos</h2>
          <p>
            Genera combinaciones de colores únicas con los valores HEX y RGB listos para copiar.
            Perfecto para proyectos de diseño gráfico, desarrollo web, branding e ilustración.
            Guarda tus paletas favoritas directamente en tu navegador.
          </p>
        </div>

        {/* Ad Inferior */}
        <AdBlock slot="7890123456" format="horizontal" />
      </div>
    </div>
  )
}
