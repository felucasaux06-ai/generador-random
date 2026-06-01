'use client'

import Link from 'next/link'
import AdBlock from './AdBlock'
import FlagArg from './FlagArg'
import { useLanguage } from '../contexts/LanguageContext'

export default function HomeContent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-14 md:pt-28 md:pb-20 px-5">
        {/* Diagonal warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(232,83,30,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: '#B8A898' }}>
              {t.home.badge}
            </span>
            <span className="h-px flex-1 max-w-[60px]" style={{ background: '#7A6A55' }} aria-hidden="true" />
          </div>

          {/* H1 — Yeseva One serif, massive */}
          <h1
            className="font-display leading-none tracking-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#F2E9D4' }}
          >
            {t.home.heroTitle1}
            <br />
            <em style={{ color: '#E8531E', fontStyle: 'italic' }}>{t.home.heroTitle2}</em>
          </h1>

          <p
            className="font-mono text-sm leading-relaxed mb-10 max-w-md"
            style={{ color: '#B8A898' }}
          >
            {t.home.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/generadores/nombres" className="btn-primary text-xs text-center">
              {t.home.cta}
            </Link>
            <Link href="/generadores/ruleta" className="btn-secondary text-xs text-center">
              {t.home.tools.find(h => h.href === '/generadores/ruleta')?.title ?? 'Ruleta'}
            </Link>
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="max-w-4xl mx-auto px-5 ad-wrapper">
        <AdBlock slot="1234567890" />
      </div>

      {/* Herramientas — numbered editorial list */}
      <section className="py-14 md:py-20 px-5" aria-labelledby="herramientas-h2">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-end justify-between mb-12 border-b pb-6" style={{ borderColor: '#7A6A55' }}>
            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-2" style={{ color: '#B8A898' }}>
                herramientas
              </p>
              <h2
                id="herramientas-h2"
                className="font-display leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#F2E9D4' }}
              >
                {t.home.toolsTitle}
              </h2>
            </div>
            <span className="font-mono text-xs hidden sm:block" style={{ color: '#7A6A55' }}>
              {t.home.tools.length} tools
            </span>
          </div>

          <div className="divide-y" style={{ borderColor: '#2C2015' }}>
            {t.home.tools.filter(h => !h.href.includes('chistes')).map((h, i) => (
              <Link
                key={h.href}
                href={h.href}
                className="group flex items-center gap-6 py-5 transition-all duration-200"
                style={{ borderColor: '#2C2015' }}
              >
                {/* Index */}
                <span
                  className="font-mono text-xs w-8 flex-shrink-0 transition-colors duration-200"
                  style={{ color: '#7A6A55' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Emoji */}
                <span className="text-xl w-8 flex-shrink-0 text-center" aria-hidden="true">
                  {h.flag ? <FlagArg className="w-6 h-4" /> : h.emoji}
                </span>

                {/* Title + desc */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm uppercase tracking-wider transition-colors duration-200 group-hover:text-[#E8531E]"
                    style={{ color: '#F2E9D4' }}
                  >
                    {h.title}
                  </p>
                  <p className="text-sm mt-0.5 truncate" style={{ color: '#B8A898' }}>{h.desc}</p>
                </div>

                {/* Badge */}
                <span
                  className="font-mono text-xs hidden sm:block flex-shrink-0"
                  style={{ color: '#7A6A55' }}
                >
                  {h.badge}
                </span>

                {/* Arrow */}
                <span
                  className="flex-shrink-0 transition-all duration-200 group-hover:translate-x-1"
                  style={{ color: '#7A6A55' }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué — stats grandes */}
      <section
        className="py-14 md:py-20 px-5"
        style={{ borderTop: '1px solid #1E160D', borderBottom: '1px solid #1E160D' }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-10" style={{ color: '#B8A898' }}>
            {t.home.whyTitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.home.features.map((item) => (
              <div key={item.title}>
                <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
                <p className="font-display text-lg mb-1" style={{ color: '#F2E9D4' }}>{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#B8A898' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="py-14 md:py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#B8A898' }}>
            info
          </p>
          <h2 className="font-display text-2xl md:text-3xl mb-6" style={{ color: '#F2E9D4' }}>
            {t.home.seoTitle}
          </h2>
          <div className="text-sm leading-relaxed space-y-4" style={{ color: '#C0AE9C' }}>
            <p>{t.home.seoP1}</p>
            <p>{t.home.seoP2}</p>
            <p>{t.home.seoP3}</p>
          </div>
        </div>
      </section>

      {/* Ad inferior */}
      <div className="max-w-4xl mx-auto px-5 ad-wrapper">
        <AdBlock slot="0987654321" />
      </div>
    </div>
  )
}
