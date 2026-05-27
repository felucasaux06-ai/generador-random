'use client'

import { useState } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import { copiarAlPortapapeles } from '../../lib/utils'

const FAQS_NUMEROS = [
  {
    pregunta: '¿Cómo funciona el generador de números aleatorios?',
    respuesta: 'Usamos Math.random() de JavaScript, que genera un número decimal entre 0 y 1 con alta precisión. Lo multiplicamos y ajustamos para obtener un entero en el rango que elegís. El resultado es impredecible.',
  },
  {
    pregunta: '¿Los números son verdaderamente aleatorios?',
    respuesta: 'Son pseudoaleatorios: impredecibles para fines prácticos. Para sorteos, decisiones y juegos son perfectamente válidos. Si necesitás aleatoriedad criptográfica certificada, precisás hardware especializado.',
  },
  {
    pregunta: '¿Cuántos números puedo generar a la vez?',
    respuesta: 'De 1 a 10 números por vez con el slider de cantidad. El historial guarda los últimos 20 resultados de la sesión. Si necesitás más, generá varias tandas.',
  },
  {
    pregunta: '¿Puedo generar números negativos?',
    respuesta: 'Sí, el mínimo puede ser negativo. Por ejemplo, de -100 a 100 genera números en ese rango completo. El único requisito es que el mínimo sea estrictamente menor al máximo.',
  },
  {
    pregunta: '¿Para qué sirve un generador de números aleatorios?',
    respuesta: 'Sorteos, juegos de mesa, estadística, programación, simulaciones, contraseñas numéricas, elegir una película de la lista, o simplemente cuando necesitás un número al azar sin pensar. La herramienta más versátil.',
  },
]

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
      setError('El mínimo debe ser menor al máximo.')
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
          <h1 className="text-4xl font-extrabold text-white mb-3">Generador de Números</h1>
          <p className="text-gray-400 text-lg">
            Elegí el rango y generá números al azar al instante.
          </p>
        </div>

        <AdBlock slot="3344556677" className="mb-8" />

        {/* Configuración */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6 space-y-6">
          <h2 className="text-white font-bold text-lg">⚙️ Configurar rango</h2>

          {/* Mínimo / Máximo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minVal" className="text-gray-400 text-sm block mb-2 font-medium">
                Desde
              </label>
              <input
                id="minVal"
                type="number"
                value={minVal}
                onChange={e => { setMinVal(Number(e.target.value)); setError('') }}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white text-2xl font-bold text-center focus:outline-none focus:border-blue-500 transition-colors"
                aria-label="Número mínimo"
              />
            </div>
            <div>
              <label htmlFor="maxVal" className="text-gray-400 text-sm block mb-2 font-medium">
                Hasta
              </label>
              <input
                id="maxVal"
                type="number"
                value={maxVal}
                onChange={e => { setMaxVal(Number(e.target.value)); setError('') }}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white text-2xl font-bold text-center focus:outline-none focus:border-blue-500 transition-colors"
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
              <label htmlFor="cantidad" className="text-gray-400 text-sm font-medium">
                Cantidad de números
              </label>
              <span className="text-blue-400 font-bold text-lg">{cantidad}</span>
            </div>
            <input
              id="cantidad"
              type="range"
              min={1}
              max={10}
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
              className="w-full accent-blue-600"
              aria-label={`Generar ${cantidad} número${cantidad > 1 ? 's' : ''}`}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          {/* Rangos rápidos */}
          <div>
            <p className="text-gray-500 text-xs mb-2 font-medium uppercase tracking-wider">Rangos rápidos</p>
            <div className="flex flex-wrap gap-2">
              {RANGOS_RAPIDOS.map(r => (
                <button
                  key={r.label}
                  onClick={() => aplicarRango(r.min, r.max)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    minVal === r.min && maxVal === r.max
                      ? 'bg-blue-600/20 border-blue-600/50 text-blue-400'
                      : 'bg-gray-700 border-gray-600 text-gray-400 hover:text-white hover:border-gray-500'
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
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-black py-4 rounded-2xl text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/30 mb-6"
          aria-label="Generar número aleatorio"
        >
          {animando ? '🎲 Generando…' : '🎲 Generar'}
        </button>

        {/* Resultado */}
        {hayResultado && !animando && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6 animate-fade-in">
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
                  <p className="text-gray-500 text-sm">
                    Entre {minVal} y {maxVal}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap justify-center gap-3 mb-2" aria-live="polite">
                    {multiplesResultados.map((n, i) => (
                      <span
                        key={i}
                        className="text-3xl md:text-4xl font-black text-white bg-gray-700 rounded-2xl px-5 py-3 border border-gray-600"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">
                    {cantidad} números entre {minVal} y {maxVal}
                  </p>
                </>
              )}
            </div>

            <button
              onClick={copiar}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${
                copiado
                  ? 'border-green-500 bg-green-600/20 text-green-400'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
              }`}
              aria-label="Copiar resultado"
            >
              {copiado ? '✅ ¡Copiado!' : '📋 Copiar resultado'}
            </button>
          </div>
        )}

        {/* Historial */}
        {historial.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-sm">🕐 Historial de la sesión</h2>
              <button
                onClick={() => setHistorial([])}
                className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
              >
                Limpiar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {historial.map((n, i) => (
                <span
                  key={i}
                  className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-sm font-mono border border-gray-600"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        <FaqSection faqs={FAQS_NUMEROS} titulo="Preguntas sobre el Generador de Números" />

        <AdBlock slot="4455667788" className="mt-8" />
      </div>
    </div>
  )
}
