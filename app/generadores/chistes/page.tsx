'use client'

import { useState, useCallback } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import { CHISTES } from '../../lib/data'

const FAQS_CHISTES = [
  {
    pregunta: '¿Cuántos chistes tiene el generador?',
    respuesta: 'El generador cuenta con más de 30 chistes malos en español, cuidadosamente seleccionados para garantizar una sonrisa o al menos un buen groaning. Se van añadiendo más regularmente.',
  },
  {
    pregunta: '¿Puedo compartir los chistes en WhatsApp?',
    respuesta: 'Sí, hay un botón directo de WhatsApp que abre una conversación con el chiste ya escrito y listo para enviar. También puedes compartirlos en Twitter/X con un solo clic.',
  },
  {
    pregunta: '¿Para qué sirve el sistema de votación?',
    respuesta: 'Puedes votar si cada chiste te hizo reír o no. El sistema muestra estadísticas de tu sesión: cuántos chistes viste y qué porcentaje de efectividad cómica tienen. Es solo para diversión.',
  },
  {
    pregunta: '¿Qué son los chistes malos?',
    respuesta: 'Los chistes malos (también llamados "dad jokes" en inglés) son chistes de humor inocente que suelen ser predecibles, con juegos de palabras o respuestas absurdas. Su gracia está precisamente en lo malos que son.',
  },
  {
    pregunta: '¿Puedo copiar los chistes?',
    respuesta: 'Sí, hay un botón de copiar que guarda el chiste completo (pregunta y remate) en tu portapapeles, listo para pegar donde quieras.',
  },
]
import { generarAleatorio, copiarAlPortapapeles } from '../../lib/utils'

export default function GeneradorChistes() {
  const [chisteActual, setChisteActual] = useState<(typeof CHISTES)[0] | null>(null)
  const [revelado, setRevelado] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [stats, setStats] = useState({ ri: 0, noRi: 0 })
  const [votoActual, setVotoActual] = useState<'ri' | 'noRi' | null>(null)

  const generar = useCallback(() => {
    const nuevo = generarAleatorio(CHISTES)
    setChisteActual(nuevo)
    setRevelado(false)
    setCopiado(false)
    setVotoActual(null)
  }, [])

  const revelar = () => setRevelado(true)

  const copiar = async () => {
    if (!chisteActual) return
    const texto = `${chisteActual.setup}\n\n${chisteActual.punchline}`
    const ok = await copiarAlPortapapeles(texto)
    if (ok) {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const votar = (tipo: 'ri' | 'noRi') => {
    if (votoActual) return
    setVotoActual(tipo)
    setStats((prev) => ({ ...prev, [tipo]: prev[tipo] + 1 }))
  }

  const compartirWhatsApp = () => {
    if (!chisteActual) return
    const texto = encodeURIComponent(
      `😂 Chiste del día:\n\n${chisteActual.setup}\n\n${chisteActual.punchline}\n\nMás chistes en GeneradorRandom.com`
    )
    window.open(`https://wa.me/?text=${texto}`, '_blank', 'noopener,noreferrer')
  }

  const compartirTwitter = () => {
    if (!chisteActual) return
    const texto = encodeURIComponent(
      `😂 ${chisteActual.setup} ${chisteActual.punchline} #chistes #humor`
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
          <div className="text-5xl mb-4" aria-hidden="true">😂</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Generador de Chistes</h1>
          <p className="text-gray-400 text-lg">
            Chistes malos garantizados. Revela el remate, vota y compártelos.
          </p>
        </div>

        {/* Ad Superior */}
        <AdBlock slot="0123456789" className="mb-8" />

        {/* Botón generar */}
        <button
          onClick={generar}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-rose-900/30 mb-6"
          aria-label="Generar nuevo chiste"
        >
          😂 ¡Dame un chiste!
        </button>

        {/* Chiste */}
        {chisteActual && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6 animate-fade-in">
            {/* Setup */}
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">La pregunta</span>
              <p className="text-white text-xl font-semibold mt-2 leading-relaxed" aria-live="polite">
                {chisteActual.setup}
              </p>
            </div>

            {/* Punchline */}
            {!revelado ? (
              <button
                onClick={revelar}
                className="w-full border-2 border-dashed border-rose-500/50 text-rose-400 hover:border-rose-500 hover:bg-rose-600/10 font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg"
                aria-label="Revelar el remate del chiste"
              >
                🎭 ¡Revelar remate!
              </button>
            ) : (
              <div className="bg-rose-900/20 border border-rose-700/50 rounded-xl p-5 animate-fade-in">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">El remate</span>
                <p className="text-rose-200 text-xl font-bold mt-2" aria-live="polite">
                  {chisteActual.punchline} 😂
                </p>
              </div>
            )}

            {/* Acciones */}
            {revelado && (
              <div className="mt-5 space-y-4 animate-fade-in">
                {/* Votación */}
                <div>
                  <p className="text-gray-400 text-sm mb-3 text-center">¿Te hizo reír?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => votar('ri')}
                      disabled={!!votoActual}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-lg transition-all border-2 ${
                        votoActual === 'ri'
                          ? 'border-green-500 bg-green-600/20 text-green-400 scale-105'
                          : votoActual
                          ? 'border-gray-700 bg-gray-700/50 text-gray-500 cursor-not-allowed'
                          : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-green-500 hover:text-green-400 hover:bg-green-600/10'
                      }`}
                      aria-label="Votar: me hizo reír"
                      aria-pressed={votoActual === 'ri'}
                    >
                      😂 ¡Me reí!
                    </button>
                    <button
                      onClick={() => votar('noRi')}
                      disabled={!!votoActual}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-lg transition-all border-2 ${
                        votoActual === 'noRi'
                          ? 'border-yellow-500 bg-yellow-600/20 text-yellow-400 scale-105'
                          : votoActual
                          ? 'border-gray-700 bg-gray-700/50 text-gray-500 cursor-not-allowed'
                          : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-400 hover:bg-yellow-600/10'
                      }`}
                      aria-label="Votar: no me hizo reír"
                      aria-pressed={votoActual === 'noRi'}
                    >
                      😐 No reí
                    </button>
                  </div>

                  {/* Resultado de votos de la sesión */}
                  {totalVotos > 0 && (
                    <div className="mt-3 p-3 bg-gray-700/50 rounded-xl" aria-live="polite">
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>😂 {stats.ri} risas</span>
                        <span>Esta sesión: {totalVotos} chistes</span>
                        <span>😐 {stats.noRi} sin risa</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${porcentajeRisa}%` }}
                          role="progressbar"
                          aria-valuenow={porcentajeRisa}
                          aria-label={`${porcentajeRisa}% de los chistes te hicieron reír`}
                        />
                      </div>
                      <p className="text-xs text-center text-gray-400 mt-1">
                        {porcentajeRisa}% de efectividad cómica
                      </p>
                    </div>
                  )}
                </div>

                {/* Botones copiar/compartir */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={copiar}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border-2 ${
                      copiado
                        ? 'border-green-500 bg-green-600/20 text-green-400'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
                    }`}
                    aria-label="Copiar chiste completo"
                  >
                    {copiado ? '✅ ¡Copiado!' : '📋 Copiar'}
                  </button>
                  <button
                    onClick={compartirWhatsApp}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-green-700/30 border-2 border-green-700/50 text-green-400 hover:bg-green-700/50 transition-all"
                    aria-label="Compartir chiste en WhatsApp"
                  >
                    📱 WhatsApp
                  </button>
                  <button
                    onClick={compartirTwitter}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-sky-700/30 border-2 border-sky-700/50 text-sky-400 hover:bg-sky-700/50 transition-all"
                    aria-label="Compartir chiste en Twitter/X"
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
          <div className="text-center py-16 text-gray-600">
            <div className="text-6xl mb-4" aria-hidden="true">🤔</div>
            <p className="text-lg">Presiona el botón para obtener tu primer chiste</p>
          </div>
        )}

        {/* Info */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 text-gray-400 text-sm leading-relaxed mb-8">
          <h2 className="text-white font-semibold mb-2">Sobre nuestros chistes</h2>
          <p>
            Más de 30 chistes malos cuidadosamente seleccionados para garantizar al menos una sonrisa
            (o un groaning profundo). Compártelos en WhatsApp o Twitter con un solo clic.
            Perfectos para romper el hielo en cualquier situación.
          </p>
        </div>

        {/* FAQ */}
        <FaqSection faqs={FAQS_CHISTES} titulo="Preguntas sobre el Generador de Chistes" />

        {/* Ad Inferior */}
        <AdBlock slot="1357924680" />
      </div>
    </div>
  )
}
