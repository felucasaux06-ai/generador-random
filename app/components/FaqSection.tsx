'use client'

import { useState } from 'react'
import Script from 'next/script'

interface FaqItem {
  pregunta: string
  respuesta: string
}

interface FaqSectionProps {
  faqs: FaqItem[]
  titulo?: string
}

export default function FaqSection({ faqs, titulo = 'Preguntas Frecuentes' }: FaqSectionProps) {
  const [abierto, setAbierto] = useState<number | null>(null)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
    })),
  }

  return (
    <section className="py-10" aria-labelledby="faq-titulo">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <p className="text-[11px] font-mono text-[#333] uppercase tracking-[0.2em] mb-3">// faq</p>
      <h2 id="faq-titulo" className="text-2xl font-black text-white mb-8">
        {titulo}
      </h2>

      <div className="space-y-px bg-[#111]">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-[#080808] overflow-hidden">
            <button
              onClick={() => setAbierto(abierto === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[#0c0c0c] transition-colors group"
              aria-expanded={abierto === i}
            >
              <span className="text-[#ccc] font-medium pr-4 text-sm group-hover:text-white transition-colors">
                {faq.pregunta}
              </span>
              <span className={`text-[#bbff00] text-lg flex-shrink-0 transition-transform duration-200 font-mono ${abierto === i ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {abierto === i && (
              <div className="px-5 pb-5 text-[#444] text-sm leading-relaxed border-t border-[#111] pt-4 animate-fade-in">
                {faq.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
