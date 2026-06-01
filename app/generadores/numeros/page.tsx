'use client'

import { useState } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import RelatedTools from '../../components/RelatedTools'
import { copiarAlPortapapeles } from '../../lib/utils'
import { useLanguage } from '../../contexts/LanguageContext'

const RANGOS_RAPIDOS = [
  { label: '1 – 10', min: 1, max: 10 },
  { label: '1 – 100', min: 1, max: 100 },
  { label: '1 – 1000', min: 1, max: 1000 },
  { label: '0 – 9', min: 0, max: 9 },
  { label: '1 – 6 (dado)', min: 1, max: 6 },
  { label: '1 – 52 (cartas)', min: 1, max: 52 },
  { label: '0 – 100', min: 0, max: 100 },
  { label: '1 – 365 (día del año)', min: 1, max: 365 },
]

interface FuenteEntropía {
  nombre: string
  valor: string
  aporte: number
}

// Mezcla un valor en la semilla (xorshift + multiplicación)
function mezclar(semilla: number, valor: number): number {
  semilla = (semilla ^ (valor >>> 0)) >>> 0
  semilla = Math.imul(semilla ^ (semilla >>> 16), 0x45d9f3b) >>> 0
  semilla = Math.imul(semilla ^ (semilla >>> 16), 0x9e3779b9) >>> 0
  semilla ^= semilla >>> 16
  return semilla >>> 0
}

// PRNG Mulberry32 — alta calidad estadística
function crearGenerador(semilla: number) {
  return () => {
    semilla |= 0
    semilla = (semilla + 0x6D2B79F5) | 0
    let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

async function recolectarEntropía(): Promise<{ fuentes: FuenteEntropía[], semilla: number, hexSemilla: string }> {
  const fuentes: FuenteEntropía[] = []
  let semilla = 0xDEADBEEF

  // 1. CSPRNG del sistema operativo (fuente principal)
  const cryptoArr = new Uint32Array(8)
  crypto.getRandomValues(cryptoArr)
  const cryptoVal = cryptoArr.reduce((a, v) => mezclar(a, v), 0)
  fuentes.push({ nombre: 'crypto.getRandomValues()', valor: `0x${cryptoVal.toString(16).padStart(8, '0').toUpperCase()}`, aporte: cryptoVal })
  semilla = mezclar(semilla, cryptoVal)

  // 2. Tiempo de alta resolución (microsegundos)
  const t0 = performance.now()
  const perfVal = Math.floor(t0 * 10000) % 0x7FFFFFFF
  fuentes.push({ nombre: 'performance.now()', valor: `${t0.toFixed(4)} ms`, aporte: perfVal })
  semilla = mezclar(semilla, perfVal)

  // 3. Timestamp Unix + fracción de segundo
  const ahora = Date.now()
  const msVal = ahora % 0x7FFFFFFF
  fuentes.push({ nombre: 'Date.now()', valor: new Date(ahora).toISOString().replace('T', ' ').replace('Z', ''), aporte: msVal })
  semilla = mezclar(semilla, msVal)

  // 4. Pantalla: resolución, profundidad de color, pixel ratio
  const pantallaVal = Math.floor(
    (screen.width * 31337 + screen.height * 7919 + screen.colorDepth * 1301 + (window.devicePixelRatio || 1) * 9973) % 0x7FFFFFFF
  )
  fuentes.push({
    nombre: 'Pantalla',
    valor: `${screen.width}×${screen.height} @${(window.devicePixelRatio || 1).toFixed(1)}x (${screen.colorDepth}bit)`,
    aporte: pantallaVal,
  })
  semilla = mezclar(semilla, pantallaVal)

  // 5. Zona horaria (→ ubicación geográfica aproximada)
  const tzOffset = new Date().getTimezoneOffset()
  const tzLabel = `UTC${tzOffset <= 0 ? '+' : ''}${String(-tzOffset / 60).replace('.5', ':30')}`
  fuentes.push({ nombre: 'Zona horaria', valor: tzLabel, aporte: Math.abs(tzOffset * 60 + 43200) })
  semilla = mezclar(semilla, Math.abs(tzOffset * 60 + 43200))

  // 6. CPU: núcleos lógicos
  const cpu = navigator.hardwareConcurrency || 4
  fuentes.push({ nombre: 'Núcleos CPU', valor: `${cpu} núcleos`, aporte: cpu * 7699 })
  semilla = mezclar(semilla, cpu * 7699)

  // 7. Memoria JS heap (si está disponible)
  const perf = performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }
  if (perf.memory) {
    const memVal = perf.memory.usedJSHeapSize % 0x7FFFFFFF
    fuentes.push({
      nombre: 'Memoria JS heap',
      valor: `${Math.round(perf.memory.usedJSHeapSize / 1024)} KB usados / ${Math.round(perf.memory.totalJSHeapSize / 1024)} KB totales`,
      aporte: memVal,
    })
    semilla = mezclar(semilla, memVal)
  }

  // 8. Idioma del navegador
  const lang = navigator.language || 'es'
  const langVal = lang.split('').reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1) * 97, 0)
  fuentes.push({ nombre: 'Idioma del navegador', valor: lang, aporte: langVal })
  semilla = mezclar(semilla, langVal)

  // 9. Tamaño del viewport (diferente a screen, incluye scroll)
  const viewVal = (window.innerWidth * 2053 + window.innerHeight * 1187 + window.scrollY * 613) % 0x7FFFFFFF
  fuentes.push({ nombre: 'Viewport + scroll', valor: `${window.innerWidth}×${window.innerHeight} scroll:${window.scrollY}px`, aporte: viewVal })
  semilla = mezclar(semilla, viewVal)

  // 10. Canvas fingerprint (único por GPU + driver + browser)
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillStyle = '#f60'
      ctx.fillRect(125, 1, 62, 20)
      ctx.fillStyle = '#069'
      ctx.fillText('Héllo, wörld! 🎲', 2, 15)
      ctx.fillStyle = 'rgba(102,204,0,0.7)'
      ctx.fillText('Héllo, wörld! 🎲', 4, 17)
      const data = canvas.toDataURL()
      const canvasVal = data.split('').reduce((a, c) => mezclar(a, c.charCodeAt(0)), 0)
      fuentes.push({ nombre: 'Canvas fingerprint (GPU)', valor: `hash 0x${canvasVal.toString(16).padStart(8, '0').toUpperCase()}`, aporte: canvasVal })
      semilla = mezclar(semilla, canvasVal)
    }
  } catch {}

  // 11. Audio context (oscilación del hardware de audio)
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioCtx) {
      const ac = new AudioCtx()
      const osc = ac.createOscillator()
      const analyser = ac.createAnalyser()
      osc.connect(analyser)
      analyser.connect(ac.destination)
      osc.start(0)
      const buf = new Float32Array(analyser.frequencyBinCount)
      analyser.getFloatFrequencyData(buf)
      const audioVal = Math.abs(Math.floor(buf.slice(0, 20).reduce((a, v) => a + (isFinite(v) ? v : 0), 0) * 10000)) % 0x7FFFFFFF
      osc.stop()
      await ac.close()
      fuentes.push({ nombre: 'Audio hardware oscillator', valor: `${buf[0].toFixed(4)} dB`, aporte: audioVal })
      semilla = mezclar(semilla, audioVal)
    }
  } catch {}

  // 12. GPS — solo si el usuario ya lo tiene cacheado (no pide permiso activamente)
  try {
    const geoPromise = new Promise<GeolocationPosition | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(resolve, () => resolve(null), {
        timeout: 2000,
        maximumAge: 300000,
        enableHighAccuracy: false,
      })
    })
    const pos = await Promise.race([geoPromise, new Promise<null>(r => setTimeout(() => r(null), 1500))])
    if (pos) {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      const alt = pos.coords.altitude ?? 0
      const geoVal = Math.abs(Math.floor((lat * lon * alt + lat * 1e6 + lon * 1e3) * 137)) % 0x7FFFFFFF
      fuentes.push({
        nombre: 'GPS',
        valor: `${lat.toFixed(5)}°, ${lon.toFixed(5)}° ±${Math.round(pos.coords.accuracy)}m`,
        aporte: geoVal,
      })
      semilla = mezclar(semilla, geoVal)
    }
  } catch {}

  // 13. Tiempo total de recolección (el propio proceso aporta entropía)
  const tFinal = performance.now()
  const tiempoRecoleccion = Math.floor((tFinal - t0) * 10000) % 0x7FFFFFFF
  fuentes.push({ nombre: 'Δt recolección', valor: `${(tFinal - t0).toFixed(4)} ms`, aporte: tiempoRecoleccion })
  semilla = mezclar(semilla, tiempoRecoleccion)

  const hexSemilla = `0x${semilla.toString(16).padStart(8, '0').toUpperCase()}`
  return { fuentes, semilla, hexSemilla }
}

export default function GeneradorNumeros() {
  const { t } = useLanguage()
  const [minVal, setMinVal] = useState(1)
  const [maxVal, setMaxVal] = useState(100)
  const [cantidad, setCantidad] = useState(1)
  const [resultado, setResultado] = useState<number | null>(null)
  const [multiplesResultados, setMultiplesResultados] = useState<number[]>([])
  const [animando, setAnimando] = useState(false)
  const [historial, setHistorial] = useState<number[]>([])
  const [copiado, setCopiado] = useState(false)
  const [error, setError] = useState('')
  const [fuentes, setFuentes] = useState<FuenteEntropía[]>([])
  const [hexSemilla, setHexSemilla] = useState('')
  const [mostrarSemilla, setMostrarSemilla] = useState(false)

  const validar = () => {
    if (minVal >= maxVal) { setError(t.numeros.errorMsg); return false }
    setError('')
    return true
  }

  const generar = async () => {
    if (!validar() || animando) return
    setAnimando(true)
    setMostrarSemilla(false)

    const { fuentes: f, semilla, hexSemilla: hex } = await recolectarEntropía()
    const rng = crearGenerador(semilla)

    setTimeout(() => {
      const rango = maxVal - minVal + 1
      if (cantidad === 1) {
        const num = Math.floor(rng() * rango) + minVal
        setResultado(num)
        setMultiplesResultados([])
        setHistorial(prev => [num, ...prev].slice(0, 20))
      } else {
        const nums = Array.from({ length: cantidad }, () => Math.floor(rng() * rango) + minVal)
        setMultiplesResultados(nums)
        setResultado(null)
        setHistorial(prev => [...nums, ...prev].slice(0, 20))
      }
      setFuentes(f)
      setHexSemilla(hex)
      setAnimando(false)
    }, 220)
  }

  const copiar = async () => {
    const texto = cantidad === 1 && resultado !== null ? String(resultado) : multiplesResultados.join(', ')
    if (!texto) return
    const ok = await copiarAlPortapapeles(texto)
    if (ok) { setCopiado(true); setTimeout(() => setCopiado(false), 2000) }
  }

  const aplicarRango = (min: number, max: number) => { setMinVal(min); setMaxVal(max); setError('') }
  const hayResultado = resultado !== null || multiplesResultados.length > 0

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">🎲</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">{t.numeros.title}</h1>
          <p className="text-zinc-400 text-lg">{t.numeros.subtitle}</p>
        </div>

        <AdBlock slot="3344556677" className="mb-8" />

        {/* Configuración */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-6 space-y-6">
          <h2 className="text-white font-bold text-lg">{t.numeros.configTitle}</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minVal" className="text-zinc-400 text-sm block mb-2 font-medium">{t.numeros.from}</label>
              <input
                id="minVal" type="number" value={minVal}
                onChange={e => { setMinVal(Number(e.target.value)); setError('') }}
                className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-4 py-3 text-white text-2xl font-bold text-center focus:outline-none focus:border-[#E8531E] transition-colors"
                aria-label="Número mínimo"
              />
            </div>
            <div>
              <label htmlFor="maxVal" className="text-zinc-400 text-sm block mb-2 font-medium">{t.numeros.to}</label>
              <input
                id="maxVal" type="number" value={maxVal}
                onChange={e => { setMaxVal(Number(e.target.value)); setError('') }}
                className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-4 py-3 text-white text-2xl font-bold text-center focus:outline-none focus:border-[#E8531E] transition-colors"
                aria-label="Número máximo"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm flex items-center gap-1" role="alert">⚠️ {error}</p>}

          {/* Cantidad */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="cantidad" className="text-zinc-400 text-sm font-medium">{t.numeros.qty}</label>
              <span className="text-[#E8531E] font-bold text-lg">{cantidad}</span>
            </div>
            <input id="cantidad" type="range" min={1} max={10} value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
              className="w-full accent-[#E8531E]"
              aria-label={`Generar ${cantidad} número${cantidad > 1 ? 's' : ''}`}
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1"><span>1</span><span>10</span></div>
          </div>

          {/* Rangos rápidos */}
          <div>
            <p className="text-zinc-500 text-xs mb-2 font-medium uppercase tracking-wider">{t.numeros.quickRanges}</p>
            <div className="flex flex-wrap gap-2">
              {RANGOS_RAPIDOS.map(r => (
                <button key={r.label} onClick={() => aplicarRango(r.min, r.max)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    minVal === r.min && maxVal === r.max
                      ? 'bg-[#E8531E]/10 border-[#E8531E]/40 text-[#E8531E]'
                      : 'bg-zinc-700 border-zinc-600 text-zinc-400 hover:text-white hover:border-zinc-500'
                  }`}
                >{r.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Botón generar */}
        <button onClick={generar} disabled={animando}
          className="w-full bg-[#E8531E] hover:bg-[#D4481A] disabled:opacity-60 text-white font-black py-4 rounded-2xl text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#E8531E]/20 mb-6"
          aria-label="Generar número aleatorio"
        >
          {animando ? t.numeros.generating : t.numeros.generate}
        </button>

        {/* Resultado */}
        {hayResultado && !animando && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-4 animate-fade-in">
            <div className="text-center mb-4">
              {cantidad === 1 && resultado !== null ? (
                <>
                  <div className="text-8xl md:text-9xl font-black text-white leading-none mb-2"
                    aria-live="polite" aria-label={`Número generado: ${resultado}`}>{resultado}</div>
                  <p className="text-zinc-500 text-sm">{t.numeros.between} {minVal} {t.numeros.and} {maxVal}</p>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap justify-center gap-3 mb-2" aria-live="polite">
                    {multiplesResultados.map((n, i) => (
                      <span key={i} className="text-3xl md:text-4xl font-black text-white bg-zinc-700 rounded-2xl px-5 py-3 border border-zinc-600">{n}</span>
                    ))}
                  </div>
                  <p className="text-zinc-500 text-sm">{cantidad} {t.numeros.numbers} {minVal} {t.numeros.and} {maxVal}</p>
                </>
              )}
            </div>

            <button onClick={copiar}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm border-2 transition-all mb-3 ${
                copiado ? 'border-green-500 bg-green-600/20 text-green-400' : 'border-zinc-600 bg-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
              }`} aria-label="Copiar resultado"
            >{copiado ? t.numeros.copied : t.numeros.copy}</button>

            {/* Semilla de entropía */}
            {hexSemilla && (
              <div>
                <button
                  onClick={() => setMostrarSemilla(v => !v)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#E8531E]/40 transition-colors text-left"
                >
                  <span className="font-mono text-xs text-zinc-400">
                    🔬 Semilla: <span className="text-[#E8531E]">{hexSemilla}</span>
                    <span className="text-zinc-600 ml-2">— {fuentes.length} fuentes de entropía</span>
                  </span>
                  <span className="text-zinc-500 text-xs">{mostrarSemilla ? '▲' : '▼'}</span>
                </button>

                {mostrarSemilla && (
                  <div className="mt-2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2 animate-fade-in">
                    <p className="text-zinc-500 text-xs font-mono mb-3 border-b border-zinc-800 pb-2">
                      Fuentes mezcladas con xorshift + Mulberry32 PRNG
                    </p>
                    {fuentes.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-zinc-600 w-4 flex-shrink-0">{i + 1}.</span>
                        <div className="min-w-0">
                          <p className="font-mono text-xs text-zinc-500">{f.nombre}</p>
                          <p className="font-mono text-xs text-[#E8531E] break-all">{f.valor}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-zinc-800 pt-2 mt-2">
                      <p className="font-mono text-xs text-zinc-400">
                        Semilla combinada: <span className="text-[#E8531E]">{hexSemilla}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Historial */}
        {historial.length > 0 && (
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-sm">{t.numeros.history}</h2>
              <button onClick={() => setHistorial([])} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">{t.numeros.clear}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {historial.map((n, i) => (
                <span key={i} className="bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg text-sm font-mono border border-zinc-600">{n}</span>
              ))}
            </div>
          </div>
        )}

        {/* Contenido SEO */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-3">Generador de números aleatorios: usos y aplicaciones</h2>
          <div className="text-zinc-400 text-sm leading-relaxed space-y-3">
            <p>El <strong className="text-zinc-300">generador de números aleatorios</strong> más flexible en español. Elegís exactamente el rango: desde 1 hasta 100, de 1 a 6 como un <strong className="text-zinc-300">dado virtual</strong>, del 1 al 52 para una baraja de cartas, o cualquier rango personalizado incluyendo negativos.</p>
            <p>Usos frecuentes: <strong className="text-zinc-300">sorteos de números</strong> para rifas y loterías caseras, elegir el orden de presentación en una clase, definir quién empieza en un juego de mesa, generar datos aleatorios para programación, estadística y simulaciones, o simplemente tomar una decisión cuando tenés demasiadas opciones.</p>
            <p>Podés generar <strong className="text-zinc-300">hasta 10 números a la vez</strong> con el slider de cantidad. El historial de la sesión guarda los últimos 20 resultados. Los rangos rápidos prearmados (1-10, 1-100, dado, cartas) te ahorran configuración cuando tenés prisa.</p>
          </div>
        </div>

        <FaqSection faqs={t.numeros.faqs} titulo={t.numeros.faqTitle} />
        <RelatedTools current="/generadores/numeros" />
        <AdBlock slot="4455667788" className="mt-8" />
      </div>
    </div>
  )
}
