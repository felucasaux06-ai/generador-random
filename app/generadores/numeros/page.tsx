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

  const validar = () => {
    if (minVal >= maxVal) {
      setError(t.numeros.errorMsg)
      return false
    }
    setError('')
    return true
  }

  const generar = () => {
    if (!validar() || animando) return

    setAnimando(true)
    setTimeout(() => {
      const rango = maxVal - minVal + 1

      if (cantidad === 1) {
        const num = Math.floor(Math.random() * rango) + minVal
        setResultado(num)
        setMultiplesResultados([])
        setHistorial(prev => [num, ...prev].slice(0, 20))
      } else {
        const nums = Array.from({ length: cantidad }, () =>
          Math.floor(Math.random() * rango) + minVal
        )
        setMultiplesResultados(nums)
        setResultado(null)
        setHistorial(prev => [...nums, ...prev].slice(0, 20))
      }

      setAnimando(false)
    }, 220)
  }

  const copiar = async () => {
    const texto = cantidad === 1 && resultado !== null
      ? String(resultado)
      : multiplesResultados.join(', ')
    if (!texto) return
    const ok = await copiarAlPortapapeles(texto)
    if (ok) {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const aplicarRango = (min: number, max: number) => {
    setMinVal(min)
    setMaxVal(max)
    setError('')
  }

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
              <label htmlFor="minVal" className="text-zinc-400 text-sm block mb-2 font-medium">
                {t.numeros.from}
              </label>
              <input
                id="minVal"
                type="number"
                value={minVal}
                onChange={e => { setMinVal(Number(e.target.value)); setError('') }}
                className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-4 py-3 text-white text-2xl font-bold text-center focus:outline-none focus:border-[#E8531E] transition-colors"
                aria-label="Número mínimo"
              />
            </div>
            <div>
              <label htmlFor="maxVal" className="text-zinc-400 text-sm block mb-2 font-medium">
                {t.numeros.to}
              </label>
              <input
                id="maxVal"
                type="number"
                value={maxVal}
                onChange={e => { setMaxVal(Number(e.target.value)); setError('') }}
                className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-4 py-3 text-white text-2xl font-bold text-center focus:outline-none focus:border-[#E8531E] transition-colors"
                aria-label="Número máximo"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm flex items-center gap-1" role="alert">
              ⚠️ {error}
            </p>
          )}

          {/* Cantidad */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="cantidad" className="text-zinc-400 text-sm font-medium">
                {t.numeros.qty}
              </label>
              <span className="text-[#E8531E] font-bold text-lg">{cantidad}</span>
            </div>
            <input
              id="cantidad"
              type="range"
              min={1}
              max={10}
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
              className="w-full accent-[#E8531E]"
              aria-label={`Generar ${cantidad} número${cantidad > 1 ? 's' : ''}`}
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          {/* Rangos rápidos */}
          <div>
            <p className="text-zinc-500 text-xs mb-2 font-medium uppercase tracking-wider">{t.numeros.quickRanges}</p>
            <div className="flex flex-wrap gap-2">
              {RANGOS_RAPIDOS.map(r => (
                <button
                  key={r.label}
                  onClick={() => aplicarRango(r.min, r.max)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    minVal === r.min && maxVal === r.max
                      ? 'bg-[#E8531E]/10 border-[#E8531E]/40 text-[#E8531E]'
                      : 'bg-zinc-700 border-zinc-600 text-zinc-400 hover:text-white hover:border-zinc-500'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Botón generar */}
        <button
          onClick={generar}
          disabled={animando}
          className="w-full bg-[#E8531E] hover:bg-[#D4481A] disabled:opacity-60 text-white font-black py-4 rounded-2xl text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#E8531E]/20 mb-6"
          aria-label="Generar número aleatorio"
        >
          {animando ? t.numeros.generating : t.numeros.generate}
        </button>

        {/* Resultado */}
        {hayResultado && !animando && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-6 animate-fade-in">
            <div className="text-center mb-4">
              {cantidad === 1 && resultado !== null ? (
                <>
                  <div
                    className="text-8xl md:text-9xl font-black text-white leading-none mb-2"
                    aria-live="polite"
                    aria-label={`Número generado: ${resultado}`}
                  >
                    {resultado}
                  </div>
                  <p className="text-zinc-500 text-sm">
                    {t.numeros.between} {minVal} {t.numeros.and} {maxVal}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap justify-center gap-3 mb-2" aria-live="polite">
                    {multiplesResultados.map((n, i) => (
                      <span
                        key={i}
                        className="text-3xl md:text-4xl font-black text-white bg-zinc-700 rounded-2xl px-5 py-3 border border-zinc-600"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                  <p className="text-zinc-500 text-sm">
                    {cantidad} {t.numeros.numbers} {minVal} {t.numeros.and} {maxVal}
                  </p>
                </>
              )}
            </div>

            <button
              onClick={copiar}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${
                copiado
                  ? 'border-green-500 bg-green-600/20 text-green-400'
                  : 'border-zinc-600 bg-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
              }`}
              aria-label="Copiar resultado"
            >
              {copiado ? t.numeros.copied : t.numeros.copy}
            </button>
          </div>
        )}

        {/* Historial */}
        {historial.length > 0 && (
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-sm">{t.numeros.history}</h2>
              <button
                onClick={() => setHistorial([])}
                className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
              >
                {t.numeros.clear}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {historial.map((n, i) => (
                <span
                  key={i}
                  className="bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg text-sm font-mono border border-zinc-600"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contenido SEO */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-3">Generador de números aleatorios: usos y aplicaciones</h2>
          <div className="text-zinc-400 text-sm leading-relaxed space-y-3">
            <p>
              El <strong className="text-zinc-300">generador de números aleatorios</strong> más flexible en español. Elegís exactamente el rango: desde 1 hasta 100, de 1 a 6 como un <strong className="text-zinc-300">dado virtual</strong>, del 1 al 52 para una baraja de cartas, o cualquier rango personalizado incluyendo negativos.
            </p>
            <p>
              Usos frecuentes: <strong className="text-zinc-300">sorteos de números</strong> para rifas y loterías caseras, elegir el orden de presentación en una clase, definir quién empieza en un juego de mesa, generar datos aleatorios para programación, estadística y simulaciones, o simplemente tomar una decisión cuando tenés demasiadas opciones.
            </p>
            <p>
              Podés generar <strong className="text-zinc-300">hasta 10 números a la vez</strong> con el slider de cantidad. El historial de la sesión guarda los últimos 20 resultados. Los rangos rápidos prearmados (1-10, 1-100, dado, cartas) te ahorran configuración cuando tenés prisa.
            </p>
          </div>
        </div>

        <FaqSection faqs={t.numeros.faqs} titulo={t.numeros.faqTitle} />

        <RelatedTools current="/generadores/numeros" />

        <AdBlock slot="4455667788" className="mt-8" />
      </div>
    </div>
  )
}
