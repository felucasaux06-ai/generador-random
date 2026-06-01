'use client'

import { useState, useCallback } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import FlagArg from '../../components/FlagArg'
import { CHISTES_ARGENTINOS } from '../../lib/data'
import { generarAleatorio, copiarAlPortapapeles } from '../../lib/utils'
import { useLanguage } from '../../contexts/LanguageContext'

export default function ChistesArgentinos() {
  const { t } = useLanguage()
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
            {t.chistesArg.title}
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-sm mx-auto">
            {t.chistesArg.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['🧉 Mate', '🥩 Asado', '💸 Inflación', '🛋️ Psicoanalista'].map((tag) => (
              <span key={tag} className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-400 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="ad-wrapper">
          <AdBlock slot="1122334455" />
        </div>

        {/* Botón principal */}
        <button
          onClick={generar}
          className="w-full bg-[#E8531E] hover:bg-[#D4481A] text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#E8531E]/20 mb-5 flex items-center justify-center gap-2"
          aria-label="Generar chiste argentino"
        >
          <FlagArg className="w-6 h-4" />
          {t.chistesArg.generate}
        </button>

        {/* Chiste */}
        {chiste && (
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 mb-5 animate-fade-in">

            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{t.chistesArg.question}</p>
            <p className="text-white text-lg font-semibold leading-relaxed mb-5" aria-live="polite">
              {chiste.setup}
            </p>

            {!revelado ? (
              <button
                onClick={() => setRevelado(true)}
                className="w-full border-2 border-dashed border-[#E8531E]/40 text-[#E8531E] hover:border-[#E8531E] hover:bg-[#E8531E]/10 font-bold py-4 px-6 rounded-xl transition-all text-base active:scale-[0.98]"
              >
                {t.chistesArg.reveal}
              </button>
            ) : (
              <div className="bg-[#3A0E05]/40 border border-[#E8531E]/30 rounded-xl p-4 animate-fade-in">
                <p className="text-xs font-bold text-[#E8531E] uppercase tracking-wider mb-2">{t.chistesArg.punchlineLabel}</p>
                <p className="text-[#F5C4B2] text-lg font-bold leading-relaxed" aria-live="polite">
                  {chiste.punchline} 😂
                </p>
              </div>
            )}

            {revelado && (
              <div className="mt-5 space-y-4 animate-fade-in">

                <div>
                  <p className="text-zinc-500 text-sm mb-3 text-center">{t.chistesArg.vote}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { if (!voto) { setVoto('ri'); setStats((p) => ({ ...p, ri: p.ri + 1 })) } }}
                      disabled={!!voto}
                      className={`py-3 rounded-xl font-bold text-base transition-all border-2 active:scale-[0.97] ${
                        voto === 'ri'
                          ? 'border-emerald-500 bg-emerald-600/20 text-emerald-400'
                          : voto
                          ? 'border-zinc-700 bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                          : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400'
                      }`}
                    >
                      {t.chistesArg.laughed}
                    </button>
                    <button
                      onClick={() => { if (!voto) { setVoto('noRi'); setStats((p) => ({ ...p, noRi: p.noRi + 1 })) } }}
                      disabled={!!voto}
                      className={`py-3 rounded-xl font-bold text-base transition-all border-2 active:scale-[0.97] ${
                        voto === 'noRi'
                          ? 'border-yellow-500 bg-yellow-600/20 text-yellow-400'
                          : voto
                          ? 'border-zinc-700 bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                          : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-yellow-500 hover:text-yellow-400'
                      }`}
                    >
                      {t.chistesArg.didntLaugh}
                    </button>
                  </div>

                  {total > 0 && (
                    <div className="mt-3 p-3 bg-zinc-800/50 rounded-xl">
                      <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
                        <span>😂 {stats.ri}</span>
                        <span>{total} vistos</span>
                        <span>{stats.noRi} 😐</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-xs text-center text-zinc-500 mt-1">{pct}% de efectividad</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={copiar}
                    className={`py-2.5 rounded-xl font-semibold text-sm transition-all border-2 active:scale-[0.97] ${
                      copiado
                        ? 'border-emerald-500 bg-emerald-600/20 text-emerald-400'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    {copiado ? t.chistesArg.copied : t.chistesArg.copy}
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

        {!chiste && (
          <div className="text-center py-12 text-zinc-600">
            <div className="text-5xl mb-3" aria-hidden="true">🧉</div>
            <p>{t.chistesArg.empty}</p>
          </div>
        )}

        <FaqSection faqs={t.chistesArg.faqs} titulo={t.chistesArg.faqTitle} />

        <div className="ad-wrapper">
          <AdBlock slot="5544332211" />
        </div>
      </div>
    </div>
  )
}
