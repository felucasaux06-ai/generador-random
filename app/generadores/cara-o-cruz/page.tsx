'use client'

import { useState } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import RelatedTools from '../../components/RelatedTools'
import { useLanguage } from '../../contexts/LanguageContext'

export default function GeneradorCaraOCruz() {
  const { t } = useLanguage()
  const [resultado, setResultado] = useState<'cara' | 'cruz' | null>(null)
  const [girando, setGirando] = useState(false)
  const [stats, setStats] = useState({ cara: 0, cruz: 0 })
  const [flipKey, setFlipKey] = useState(0)

  const lanzar = () => {
    if (girando) return
    setGirando(true)
    setResultado(null)
    setFlipKey(k => k + 1)

    setTimeout(() => {
      const r: 'cara' | 'cruz' = Math.random() < 0.5 ? 'cara' : 'cruz'
      setResultado(r)
      setStats(prev => ({ ...prev, [r]: prev[r] + 1 }))
      setGirando(false)
    }, 1150)
  }

  const total = stats.cara + stats.cruz
  const pctCara = total > 0 ? Math.round((stats.cara / total) * 100) : 50
  const pctCruz = 100 - pctCara

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">🪙</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">{t.moneda.title}</h1>
          <p className="text-zinc-400 text-lg">{t.moneda.subtitle}</p>
        </div>

        <AdBlock slot="5566778899" className="mb-8" />

        {/* Moneda y botón */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 mb-6">
          <div className="flex justify-center mb-8" style={{ perspective: '600px' }}>
            <div
              key={flipKey}
              className={`w-44 h-44 rounded-full flex items-center justify-center text-5xl font-black shadow-2xl border-4 select-none transition-all duration-300 ${
                girando ? 'animate-coin-flip' : ''
              } ${
                resultado === 'cruz'
                  ? 'bg-gradient-to-br from-zinc-400 to-zinc-600 border-zinc-400 text-zinc-100'
                  : 'bg-gradient-to-br from-yellow-400 to-amber-600 border-yellow-400 text-yellow-900'
              }`}
              style={{
                boxShadow: resultado === 'cruz'
                  ? '0 8px 32px rgba(113,113,122,0.4), inset 0 2px 8px rgba(255,255,255,0.25)'
                  : '0 8px 32px rgba(234,179,8,0.45), inset 0 2px 8px rgba(255,255,255,0.35)',
              }}
              aria-live="polite"
              aria-label={
                girando ? 'Moneda en el aire' :
                resultado ? `Resultado: ${resultado}` :
                'Moneda lista para lanzar'
              }
            >
              {girando
                ? '🪙'
                : resultado === 'cara'
                  ? '⚜️'
                  : resultado === 'cruz'
                    ? '✕'
                    : '🪙'
              }
            </div>
          </div>

          {/* Resultado texto */}
          <div className="text-center mb-6 min-h-[64px] flex flex-col items-center justify-center">
            {resultado && !girando ? (
              <div className="animate-fade-in">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{t.moneda.result}</p>
                <p className={`text-5xl font-black ${
                  resultado === 'cara' ? 'text-yellow-400' : 'text-zinc-300'
                }`}>
                  {resultado === 'cara' ? t.moneda.heads : t.moneda.tails}
                </p>
              </div>
            ) : girando ? (
              <p className="text-zinc-500 text-lg animate-pulse">{t.moneda.flying}</p>
            ) : (
              <p className="text-zinc-600 text-base">{t.moneda.ready}</p>
            )}
          </div>

          {/* Botón lanzar */}
          <button
            onClick={lanzar}
            disabled={girando}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/30"
            aria-label="Lanzar la moneda"
          >
            {girando ? t.moneda.launching : t.moneda.launch}
          </button>
        </div>

        {/* Estadísticas */}
        {total > 0 && (
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 mb-8 animate-fade-in">
            <h2 className="text-white font-bold text-center mb-5">
              {t.moneda.stats}
              <span className="text-zinc-500 text-sm font-normal ml-2">({total} {total !== 1 ? t.moneda.flips : t.moneda.flip})</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-2xl p-5 text-center">
                <p className="text-yellow-400 text-4xl font-black">{stats.cara}</p>
                <p className="text-yellow-300/80 text-sm font-semibold mt-1">{t.moneda.headsLabel}</p>
                <p className="text-yellow-500/60 text-xs mt-0.5 font-bold">{pctCara}%</p>
              </div>
              <div className="bg-zinc-700/30 border border-zinc-600/30 rounded-2xl p-5 text-center">
                <p className="text-zinc-300 text-4xl font-black">{stats.cruz}</p>
                <p className="text-zinc-400 text-sm font-semibold mt-1">{t.moneda.tailsLabel}</p>
                <p className="text-zinc-500 text-xs mt-0.5 font-bold">{pctCruz}%</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
                <span>{t.moneda.headsLabel} {pctCara}%</span>
                <span>{t.moneda.tailsLabel} {pctCruz}%</span>
              </div>
              <div className="w-full bg-zinc-600 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${pctCara}%` }}
                  role="progressbar"
                  aria-valuenow={pctCara}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Cara: ${pctCara}%`}
                />
              </div>
            </div>

            <button
              onClick={() => setStats({ cara: 0, cruz: 0 })}
              className="mt-4 w-full text-zinc-600 hover:text-zinc-400 text-xs transition-colors py-1"
            >
              {t.moneda.resetStats}
            </button>
          </div>
        )}

        {/* Info */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 text-zinc-400 text-sm leading-relaxed mb-8">
          <h2 className="text-white font-semibold mb-2">{t.moneda.infoTitle}</h2>
          <p>{t.moneda.infoText}</p>
        </div>

        <FaqSection faqs={t.moneda.faqs} titulo={t.moneda.faqTitle} />

        {/* Contenido SEO */}
        <div className="mt-6 bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-3">Cara o Cruz online para decisiones rápidas</h2>
          <div className="text-zinc-400 text-sm leading-relaxed space-y-3">
            <p>
              Tirar una <strong className="text-zinc-300">moneda virtual</strong> nunca fue tan fácil. Con este generador de{' '}
              <strong className="text-zinc-300">cara o cruz online</strong> resolvés cualquier dilema en un segundo, sin necesidad de buscar una moneda física ni ponerte de acuerdo con nadie sobre quién la lanza. El resultado es 100% aleatorio e imparcial: exactamente 50% de probabilidad para cada lado, siempre.
            </p>
            <p>
              Los usos más frecuentes son los más cotidianos: decidir <strong className="text-zinc-300">quién paga el café</strong>, quién elige la película del viernes, quién arranca en un juego de mesa, o quién le toca lavar los platos. También sirve para sorteos entre dos personas cuando querés una forma justa y rápida de elegir sin discusiones. Tirá la moneda al azar y listo.
            </p>
            <p>
              A diferencia de lanzar una moneda real, acá no hay forma de hacer trampa: no existe el "tiro mal" ni el "volvemos a tirar". Usá esta herramienta de <strong className="text-zinc-300">cara o cruz gratis</strong> desde el celular o la computadora, sin instalar nada, sin registrarte. La próxima vez que necesités{' '}
              <strong className="text-zinc-300">tirar moneda online</strong>, ya sabés dónde venir.
            </p>
          </div>
        </div>

        <RelatedTools current="/generadores/cara-o-cruz" />

        <AdBlock slot="6677889900" className="mt-8" />
      </div>
    </div>
  )
}
