'use client'

import { useState, useCallback } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import FlagArg from '../../components/FlagArg'
import { CHISTES_ARGENTINOS } from '../../lib/data'
import { generarAleatorio, copiarAlPortapapeles } from '../../lib/utils'

const FAQS = [
  {
    pregunta: '¿Son chistes argentinos de verdad?',
    respuesta: 'Sí. Todos usan referencias auténticas: el mate, el asado, el fernet, la inflación, el psicoanálisis y el ego nacional. No son chistes genéricos traducidos al español.',
  },
  {
    pregunta: '¿Qué es el lunfardo?',
    respuesta: 'El lunfardo es el slang rioplatense. Una mezcla de español con italiano, africano y otras lenguas. Palabras como "pibe", "quilombo", "morfar" o "laburo" son lunfardo puro.',
  },
  {
    pregunta: '¿Puedo compartirlos en WhatsApp?',
    respuesta: 'Sí. El botón de WhatsApp abre una conversación con el chiste listo para enviar, con la bandera argentina y el link al sitio.',
  },
  {
    pregunta: '¿Por qué los argentinos tienen tantos chistes sobre sí mismos?',
    respuesta: 'Porque tienen sentido del humor. El humor de autodescubrimiento es una característica cultural argentina. Se burlan de su ego, de la crisis y de sus contradicciones con una mezcla única de orgullo e ironía.',
  },
  {
    pregunta: '¿Hay chistes para adultos?',
    respuesta: 'Sí, hay una sección de chistes desubicados mezclados con los demás. Todos mantienen el estilo argentino con doble sentido y referencias culturales locales.',
  },
]

export default function ChistesArgentinos() {
  const [chiste, setChiste] = useState<(typeof CHISTES_ARGENTINOS)[0] | null>(null)
  const [revelado, setRevelado] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [stats, setStats] = useState({ ri: 0, noRi: 0 })
  const [voto, setVoto] = useState<'ri' | 'noRi' | null>(null)
  const [vistos, setVistos] = useState<typeof CHISTES_ARGENTINOS>([])

  const generar = useCallback(() => {
    const pool = CHISTES_ARGENTINOS.filter((c) => !vistos.slice(-8).includes(c))
    const nuevo = generarAleatorio(pool.length > 0 ? pool : CHISTES_ARGENTINOS)
    setChiste(nuevo)
    setVistos((p) => [...p, nuevo].slice(-15))
    setRevelado(false)
    setCopiado(false)
    setVoto(null)
  }, [vistos])

  const copiar = async () => {
    if (!chiste) return
    const ok = await copiarAlPortapapeles(`🇦🇷 ${chiste.setup}\n\n${chiste.punchline}\n\ngeneradorrandom.com`)
    if (ok) { setCopiado(true); setTimeout(() => setCopiado(false), 2000) }
  }

  const compartirWhatsApp = () => {
    if (!chiste) return
    const txt = encodeURIComponent(`🇦🇷 Chiste argentino:\n\n${chiste.setup}\n\n${chiste.punchline}\n\nMás en generadorrandom.com/generadores/chistes-argentinos`)
    window.open(`https://wa.me/?text=${txt}`, '_blank', 'noopener,noreferrer')
  }

  const compartirTwitter = () => {
    if (!chiste) return
    const txt = encodeURIComponent(`🇦🇷 ${chiste.setup} ${chiste.punchline} #ChistesArgentinos`)
    window.open(`https://twitter.com/intent/tweet?text=${txt}`, '_blank', 'noopener,noreferrer')
  }

  const total = stats.ri + stats.noRi
  const pct = total > 0 ? Math.round((stats.ri / total) * 100) : 0

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FlagArg className="w-16 h-11 rounded-md shadow-lg" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Chistes Argentinos
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-sm mx-auto">
            Humor argentino de verdad. Mate, asado, inflación y ego. Sin filtro.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['🧉 Mate', '🥩 Asado', '💸 Inflación', '🛋️ Psicoanalista'].map((t) => (
              <span key={t} className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Ad superior */}
        <div className="ad-wrapper">
          <AdBlock slot="1122334455" />
        </div>

        {/* Botón principal */}
        <button
          onClick={generar}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/30 mb-5 flex items-center justify-center gap-2"
          aria-label="Generar chiste argentino"
        >
          <FlagArg className="w-6 h-4" />
          ¡Dame un chiste, boludo!
        </button>

        {/* Chiste */}
        {chiste && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-5 animate-fade-in">

            {/* Setup */}
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">La pregunta</p>
            <p className="text-white text-lg font-semibold leading-relaxed mb-5" aria-live="polite">
              {chiste.setup}
            </p>

            {/* Punchline o botón reveal */}
            {!revelado ? (
              <button
                onClick={() => setRevelado(true)}
                className="w-full border-2 border-dashed border-blue-500/40 text-blue-400 hover:border-blue-500 hover:bg-blue-600/10 font-bold py-4 px-6 rounded-xl transition-all text-base active:scale-[0.98]"
              >
                🎭 Mostrar remate
              </button>
            ) : (
              <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-4 animate-fade-in">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">El remate</p>
                <p className="text-blue-200 text-lg font-bold leading-relaxed" aria-live="polite">
                  {chiste.punchline} 😂
                </p>
              </div>
            )}

            {/* Acciones post-reveal */}
            {revelado && (
              <div className="mt-5 space-y-4 animate-fade-in">

                {/* Votación */}
                <div>
                  <p className="text-slate-500 text-sm mb-3 text-center">¿Te mató o fue un bodrio?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { if (!voto) { setVoto('ri'); setStats((p) => ({ ...p, ri: p.ri + 1 })) } }}
                      disabled={!!voto}
                      className={`py-3 rounded-xl font-bold text-base transition-all border-2 active:scale-[0.97] ${
                        voto === 'ri'
                          ? 'border-emerald-500 bg-emerald-600/20 text-emerald-400'
                          : voto
                          ? 'border-slate-700 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                          : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400'
                      }`}
                    >
                      😂 ¡Me mató!
                    </button>
                    <button
                      onClick={() => { if (!voto) { setVoto('noRi'); setStats((p) => ({ ...p, noRi: p.noRi + 1 })) } }}
                      disabled={!!voto}
                      className={`py-3 rounded-xl font-bold text-base transition-all border-2 active:scale-[0.97] ${
                        voto === 'noRi'
                          ? 'border-yellow-500 bg-yellow-600/20 text-yellow-400'
                          : voto
                          ? 'border-slate-700 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                          : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-yellow-500 hover:text-yellow-400'
                      }`}
                    >
                      😐 Bodrio
                    </button>
                  </div>

                  {total > 0 && (
                    <div className="mt-3 p-3 bg-slate-800/50 rounded-xl">
                      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                        <span>😂 {stats.ri}</span>
                        <span>{total} vistos</span>
                        <span>{stats.noRi} 😐</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-xs text-center text-slate-500 mt-1">{pct}% de efectividad</p>
                    </div>
                  )}
                </div>

                {/* Compartir */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={copiar}
                    className={`py-2.5 rounded-xl font-semibold text-sm transition-all border-2 active:scale-[0.97] ${
                      copiado
                        ? 'border-emerald-500 bg-emerald-600/20 text-emerald-400'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {copiado ? '✅' : '📋 Copiar'}
                  </button>
                  <button
                    onClick={compartirWhatsApp}
                    className="py-2.5 rounded-xl font-semibold text-sm bg-emerald-900/30 border-2 border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/50 transition-all active:scale-[0.97]"
                  >
                    📱 WhatsApp
                  </button>
                  <button
                    onClick={compartirTwitter}
                    className="py-2.5 rounded-xl font-semibold text-sm bg-sky-900/30 border-2 border-sky-800/50 text-sky-400 hover:bg-sky-900/50 transition-all active:scale-[0.97]"
                  >
                    🐦 Twitter
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estado vacío */}
        {!chiste && (
          <div className="text-center py-12 text-slate-600">
            <div className="text-5xl mb-3" aria-hidden="true">🧉</div>
            <p>Preparate el mate y apretá el botón</p>
          </div>
        )}

        {/* FAQ */}
        <FaqSection faqs={FAQS} titulo="Preguntas sobre los Chistes Argentinos" />

        {/* Ad inferior */}
        <div className="ad-wrapper">
          <AdBlock slot="5544332211" />
        </div>
      </div>
    </div>
  )
}
