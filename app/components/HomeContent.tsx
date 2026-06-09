'use client'

import Link from 'next/link'
import AdBlock from './AdBlock'
import { useLanguage } from '../contexts/LanguageContext'

const TOOL_ICONS: Record<string, string> = {
  '/generadores/nombres':     'person',
  '/generadores/contrasenas': 'lock',
  '/generadores/colores':     'palette',
  '/generadores/historias':   'menu_book',
  '/generadores/ruleta':      'casino',
  '/generadores/numeros':     'pin',
  '/generadores/cara-o-cruz': 'toll',
}

const TOOL_CTA: Record<string, string> = {
  '/generadores/nombres':     'Explorar',
  '/generadores/contrasenas': 'Generar',
  '/generadores/colores':     'Visualizar',
  '/generadores/historias':   'Escribir',
  '/generadores/ruleta':      'Girar',
  '/generadores/numeros':     'Generar',
  '/generadores/cara-o-cruz': 'Lanzar',
}

const FEATURE_ICONS = ['bolt', 'security', 'smartphone', 'all_inclusive']

export default function HomeContent() {
  const { t } = useLanguage()
  const tools = t.home.tools.filter(h => !h.href.includes('chistes'))

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden hero-gradient pt-20">
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-12 text-center">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 mb-8 bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
              {t.home.badge}
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display font-extrabold tracking-tight leading-[1.1] mb-8 text-on-surface"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
          >
            {t.home.heroTitle1}
            <br />
            <em className="font-serif" style={{ color: '#ffb59e' }}>
              {t.home.heroTitle2}
            </em>
          </h1>

          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.home.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generadores/nombres"
              className="group bg-primary-container text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-glow-orange transition-all duration-300 shadow-xl active:scale-95 inline-flex items-center gap-2"
            >
              {t.home.cta}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/generadores/ruleta" className="btn-secondary inline-block text-base text-center">
              {t.home.tools.find(h => h.href === '/generadores/ruleta')?.title ?? 'Ruleta'}
            </Link>
          </div>
        </div>

        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* Ad */}
      <div className="max-w-4xl mx-auto px-5 ad-wrapper">
        <AdBlock slot="1234567890" />
      </div>

      {/* Tools grid */}
      <section className="py-24 md:py-32 bg-surface" aria-labelledby="herramientas-h2">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-3 block">herramientas</span>
              <h2
                id="herramientas-h2"
                className="font-display font-bold text-on-surface"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
              >
                {t.home.toolsTitle}
              </h2>
            </div>
            <span className="font-mono text-xs text-on-surface-variant border-b border-outline-variant pb-1">
              {tools.length} tools ready to go
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((h, i) => {
              const icon = TOOL_ICONS[h.href] ?? 'auto_awesome'
              const cta  = TOOL_CTA[h.href]  ?? 'Abrir'
              return (
                <div key={h.href} className="glass-card p-8 group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-10">
                    <span className="font-mono text-xs text-on-surface-variant opacity-40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-mono text-[11px] border border-primary/20">
                      {h.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary transition-colors group-hover:bg-primary-container group-hover:text-white flex-shrink-0">
                      <span className="material-symbols-outlined text-[22px]">{icon}</span>
                    </div>
                    <h3 className="font-bold text-lg text-on-surface">{h.title}</h3>
                  </div>

                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed min-h-[40px]">
                    {h.desc}
                  </p>

                  <Link
                    href={h.href}
                    className="inline-flex items-center text-primary font-semibold text-sm group/link hover:text-glow-orange transition-colors"
                  >
                    {cta}
                    <span className="material-symbols-outlined ml-1.5 text-[18px] transition-transform group-hover/link:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-on-surface">
              {t.home.whyTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {t.home.features.map((item, i) => (
              <div key={item.title} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-5 border border-outline-variant transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>
                    {FEATURE_ICONS[i] ?? 'star'}
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-on-surface">{item.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / SEO */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-4 block">Información</span>
            <h2
              className="font-display font-extrabold mb-8 text-on-surface leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {t.home.seoTitle}
            </h2>
            <div className="space-y-5 text-on-surface-variant leading-relaxed">
              <p>{t.home.seoP1}</p>
              <p>{t.home.seoP2}</p>
              <blockquote className="border-l-4 border-primary pl-6 py-2 italic bg-surface-container-low rounded-r-lg">
                {t.home.seoP3}
              </blockquote>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square glass-card rounded-[40px] flex items-center justify-center overflow-hidden">
              <span
                className="font-display font-black text-primary select-none"
                style={{ fontSize: 'clamp(6rem, 15vw, 10rem)', opacity: 0.15 }}
                aria-hidden="true"
              >?</span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
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
