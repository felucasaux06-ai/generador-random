'use client'

import { useState, useCallback } from 'react'
import type { Metadata } from 'next'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import { CHISTES_ARGENTINOS } from '../../lib/data'
import { generarAleatorio, copiarAlPortapapeles } from '../../lib/utils'

const FAQS = [
  {
    pregunta: '¿Son chistes argentinos de verdad?',
    respuesta: 'Sí. Todos los chistes usan referencias auténticas de la cultura argentina: el mate, el asado, el fernet, la crisis económica, el psicoanálisis, el ego nacional y el lunfardo. No son chistes genéricos traducidos.',
  },
  {
    pregunta: '¿Qué es el lunfardo?',
    respuesta: 'El lunfardo es el slang rioplatense, una mezcla de español con palabras de origen italiano, africano y de otras lenguas que se usa en Argentina y Uruguay. Palabras como "pibe", "chabón", "quilombo", "morfar" o "laburo" son lunfardo.',
  },
  {
    pregunta: '¿Puedo compartir estos chistes en WhatsApp?',
    respuesta: 'Sí, hay un botón de WhatsApp que abre una conversación con el chiste listo para enviar. También podés copiarlo con el botón de copiar.',
  },
  {
    pregunta: '¿Por qué los argentinos tienen tantos chistes sobre sí mismos?',
    punchline: '¡Porque tienen sentido del humor! El humor de autodescubrimiento es una característica cultural argentina. Se burlan de su propio ego, de la crisis económica y de sus contradicciones con una mezcla única de orgullo e ironía.',
    respuesta: '¡Porque tienen sentido del humor! El humor de autodescubrimiento es una característica cultural argentina. Se burlan de su propio ego, de la crisis económica y de sus contradicciones con una mezcla única de orgullo e ironía.',
  },
  {
    pregunta: '¿Cuántos chistes argentinos tienen?',
    respuesta: 'Más de 40 chistes argentinos auténticos, con lunfardo real y referencias culturales locales. Se van agregando más regularmente.',
  },
]

export default function ChistesArgentinos() {
  const [chisteActual, setChisteActual] = useState<(typeof CHISTES_ARGENTINOS)[0] | null>(null)
  const [revelado, setRevelado] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [stats, setStats] = useState({ ri: 0, noRi: 0 })
  const [votoActual, setVotoActual] = useState<'ri' | 'noRi' | null>(null)
  const [historial, setHistorial] = useState<typeof CHISTES_ARGENTINOS>([])

  const generar = useCallback(() => {
    const disponibles = CHISTES_ARGENTINOS.filter(
      (c) => !historial.slice(-5).includes(c)
    )
    const pool = disponibles.length > 0 ? disponibles : CHISTES_ARGENTINOS
    const nuevo = generarAleatorio(pool)
    setChisteActual(nuevo)
    setHistorial((prev) => [...prev, nuevo].slice(-10))
    setRevelado(false)
    setCopiado(false)
    setVotoActual(null)
  }, [historial])

  const copiar = async () => {
    if (!chisteActual) return
    const texto = `🇦🇷 ${chisteActual.setup}\n\n${chisteActual.punchline}\n\n— generadorrandom.com`
    const ok = await copiarAlPortapapeles(texto)
    if (ok) { setCopiado(true); setTimeout(() => setCopiado(false), 2000) }
  }

  const votar = (tipo: 'ri' | 'noRi') => {
    if (votoActual) return
    setVotoActual(tipo)
    setStats((prev) => ({ ...prev, [tipo]: prev[tipo] + 1 }))
  }

  const compartirWhatsApp = () => {
    if (!chisteActual) return
    const texto = encodeURIComponent(
      `🇦🇷 Chiste argentino:\n\n${chisteActual.setup}\n\n${chisteActual.punchline}\n\nMás en generadorrandom.com/generadores/chistes-argentinos`
    )
    window.open(`https://wa.me/?text=${texto}`, '_blank', 'noopener,noreferrer')
  }

  const compartirTwitter = () => {
    if (!chisteActual) return
    const texto = encodeURIComponent(
      `🇦🇷 ${chisteActual.setup} ${chisteActual.punchline} #ChistesArgentinos #humor`
    )
    window.open(`https://twitter.com/intent/tweet?text=${texto}`, '_blank', 'noopener,noreferrer')
  }

  const totalVotos = stats.ri + stats.noRi
  const porcentajeRisa = totalVotos > 0 ? Math.round((stats.ri / totalVotos) * 100) : 0

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-3" aria-hidden="true">🇦🇷</div>
          <h1 className="text-4xl font-bold text-white mb-3">Chistes Argentinos</h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Humor argentino de verdad. Con lunfardo, crisis económica, ego y mate. Sin filtro.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['🧉 Mate', '🥩 Asado', '💸 Inflación', '🛋️ Psicoanálisis', '⚽ Fútbol'].map((tag) => (
              <span key={tag} className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ad superior */}
        <AdBlock slot="1122334455" format="horizontal" className="mb-8" />

        {/* Botón */}
        <button
          onClick={generar}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/30 mb-6"
          aria-label="Generar chiste argentino"
        >
          🇦🇷 ¡Dame un chiste, boludo!
        </button>

        {/* Chiste */}
        {chisteActual && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-6 animate-fade-in">

            {/* Setup */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">La pregunta</span>
              <p className="text-white text-xl font-semibold mt-2 leading-relaxed" aria-live="polite">
                {chisteActual.setup}
              </p>
            </div>

            {/* Punchline */}
            {!revelado ? (
              <button
                onClick={() => setRevelado(true)}
                className="w-full border-2 border-dashed border-blue-500/40 text-blue-400 hover:border-blue-500 hover:bg-blue-600/10 font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg"
                aria-label="Revelar el remate"
              >
                🎭 Mostrar remate
              </button>
            ) : (
              <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-5 animate-fade-in">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">El remate</span>
                <p className="text-blue-200 text-xl font-bold mt-2" aria-live="polite">
                  {chisteActual.punchline} 😂
                </p>
              </div>
            )}

            {/* Acciones post-reveal */}
            {revelado && (
              <div className="mt-5 space-y-4 animate-fade-in">

                {/* Votación */}
                <div>
                  <p className="text-slate-500 text-sm mb-3 text-center">¿Te mató de risa o fue un bodrio?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => votar('ri')}
                      disabled={!!votoActual}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-lg transition-all border-2 ${
                        votoActual === 'ri'
                          ? 'border-emerald-500 bg-emerald-600/20 text-emerald-400 scale-105'
                          : votoActual
                          ? 'border-slate-700 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                          : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400'
                      }`}
                      aria-label="Me mató de risa"
                    >
                      😂 ¡Me mató!
                    </button>
                    <button
                      onClick={() => votar('noRi')}
                      disabled={!!votoActual}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-lg transition-all border-2 ${
                        votoActual === 'noRi'
                          ? 'border-yellow-500 bg-yellow-600/20 text-yellow-400 scale-105'
                          : votoActual
                          ? 'border-slate-700 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                          : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-yellow-500 hover:text-yellow-400'
                      }`}
                      aria-label="Fue un bodrio"
                    >
                      😐 Bodrio
                    </button>
                  </div>

                  {totalVotos > 0 && (
                    <div className="mt-3 p-3 bg-slate-800/50 rounded-xl">
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>😂 {stats.ri} risas</span>
                        <span>{totalVotos} chistes vistos</span>
                        <span>😐 {stats.noRi} bodrios</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${porcentajeRisa}%` }}
                          role="progressbar"
                          aria-valuenow={porcentajeRisa}
                        />
                      </div>
                      <p className="text-xs text-center text-slate-500 mt-1">
                        {porcentajeRisa}% de efectividad
                      </p>
                    </div>
                  )}
                </div>

                {/* Compartir */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={copiar}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border-2 ${
                      copiado
                        ? 'border-emerald-500 bg-emerald-600/20 text-emerald-400'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {copiado ? '✅ Copiado' : '📋 Copiar'}
                  </button>
                  <button
                    onClick={compartirWhatsApp}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-emerald-900/30 border-2 border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/50 transition-all"
                  >
                    📱 WhatsApp
                  </button>
                  <button
                    onClick={compartirTwitter}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-sky-900/30 border-2 border-sky-800/50 text-sky-400 hover:bg-sky-900/50 transition-all"
                  >
                    🐦 Twitter
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estado vacío */}
        {!chisteActual && (
          <div className="text-center py-16 text-slate-600">
            <div className="text-6xl mb-4" aria-hidden="true">🧉</div>
            <p className="text-lg">Preparate el mate y apretá el botón</p>
          </div>
        )}

        {/* FAQ */}
        <FaqSection faqs={FAQS} titulo="Preguntas sobre los Chistes Argentinos" />

        {/* Ad inferior */}
        <AdBlock slot="5544332211" format="horizontal" className="mt-8" />
      </div>
    </div>
  )
}
