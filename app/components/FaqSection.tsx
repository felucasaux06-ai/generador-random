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

      <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3" style={{ color: '#B8A898' }}>
        faq
      </p>
      <h2
        id="faq-titulo"
        className="font-display text-2xl mb-8"
        style={{ color: '#F2E9D4' }}
      >
        {titulo}
      </h2>

      <div className="space-y-0 divide-y" style={{ borderColor: '#1E160D' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderColor: '#1E160D' }}>
            <button
              onClick={() => setAbierto(abierto === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group transition-colors"
              aria-expanded={abierto === i}
            >
              <span
                className="font-semibold text-sm uppercase tracking-wide pr-4 transition-colors"
                style={{ color: abierto === i ? '#E8531E' : '#F2E9D4' }}
              >
                {faq.pregunta}
              </span>
              <span
                className="flex-shrink-0 font-mono text-lg transition-transform duration-200"
                style={{
                  color: '#E8531E',
                  transform: abierto === i ? 'rotate(45deg)' : 'none',
                }}
              >
                +
              </span>
            </button>
            {abierto === i && (
              <div
                className="pb-5 text-sm leading-relaxed animate-fade-in"
                style={{ color: '#C0AE9C' }}
              >
                {faq.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
