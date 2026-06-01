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
      <section className="relative overflow-hidden pt-14 pb-10 md:pt-24 md:pb-16 px-4">
        {/* Grid decoration top-right */}
        <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 pointer-events-none opacity-[0.04]" aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#bbff00 1px, transparent 1px), linear-gradient(90deg, #bbff00 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Lime glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle at top right, rgba(187,255,0,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#1f1f1f] px-3 py-1.5 text-[11px] font-mono text-[#444] mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-[#bbff00] animate-pulse inline-block" aria-hidden="true" />
            {t.home.badge}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-6">
            {t.home.heroTitle1}<br />
            <span className="text-[#bbff00]">{t.home.heroTitle2}</span>
          </h1>

          <p className="text-[#444] text-sm md:text-base mb-10 max-w-lg font-mono leading-relaxed">
            <span className="text-[#bbff00]">$</span> {t.home.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/generadores/nombres"
              className="btn-primary text-xs text-center uppercase tracking-widest"
            >
              {t.home.cta}
            </Link>
            <Link
              href="/generadores/chistes-argentinos"
              className="btn-secondary text-xs text-center flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <FlagArg className="w-5 h-3.5" />
              {t.home.tools.find(h => h.href === '/generadores/chistes-argentinos')?.title ?? 'Chistes Argentinos'}
            </Link>
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="max-w-4xl mx-auto px-4 ad-wrapper">
        <AdBlock slot="1234567890" />
      </div>

      {/* Grid herramientas */}
      <section className="py-12 md:py-20 px-4" aria-labelledby="herramientas-h2">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-14">
            <p className="text-[11px] font-mono text-[#333] uppercase tracking-[0.2em] mb-3">// herramientas</p>
            <h2 id="herramientas-h2" className="text-2xl md:text-4xl font-black text-white leading-tight">
              {t.home.toolsTitle}
            </h2>
            <p className="text-[#333] text-sm mt-2 font-mono">{t.home.toolsSubtitle}</p>
          </div>

          {/* Mosaic grid — gap creates the border effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#141414]">
            {t.home.tools.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className="group relative bg-[#080808] p-6 md:p-7 transition-all duration-200 hover:bg-[#0c0c0c]"
              >
                {/* Left border accent — reveals on hover */}
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-transparent group-hover:bg-[#bbff00] transition-all duration-200" aria-hidden="true" />

                <div className="flex items-start justify-between mb-5">
                  <div className="text-3xl" aria-hidden="true">
                    {h.flag ? <FlagArg className="w-8 h-5 mt-1" /> : h.emoji}
                  </div>
                  <span className="text-[10px] font-mono text-[#2a2a2a] uppercase tracking-widest border border-[#1a1a1a] px-2 py-1">
                    {h.badge}
                  </span>
                </div>

                <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#bbff00] transition-colors duration-200">
                  {h.title}
                </h3>
                <p className="text-[#3a3a3a] text-sm leading-relaxed">{h.desc}</p>

                <div className="mt-5 flex items-center gap-1.5 text-[11px] font-mono text-[#2a2a2a] group-hover:text-[#bbff00] transition-colors duration-200 uppercase tracking-widest">
                  {t.home.open}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué */}
      <section className="py-12 md:py-16 px-4 border-y border-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-mono text-[#333] uppercase tracking-[0.2em] mb-3">// por qué elegirnos</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">{t.home.whyTitle}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#111]">
            {t.home.features.map((item) => (
              <div key={item.title} className="bg-[#080808] p-6 md:p-8">
                <div className="text-2xl mb-4" aria-hidden="true">{item.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-[#3a3a3a] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-mono text-[#333] uppercase tracking-[0.2em] mb-3">// info</p>
          <h2 className="text-xl md:text-2xl font-black text-white mb-6">{t.home.seoTitle}</h2>
          <div className="text-[#444] text-sm md:text-base leading-relaxed space-y-4">
            <p>{t.home.seoP1}</p>
            <p>{t.home.seoP2}</p>
            <p>{t.home.seoP3}</p>
          </div>
        </div>
      </section>

      {/* Ad inferior */}
      <div className="max-w-4xl mx-auto px-4 ad-wrapper">
        <AdBlock slot="0987654321" />
      </div>
    </div>
  )
}
