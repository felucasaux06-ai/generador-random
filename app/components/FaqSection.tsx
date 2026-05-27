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
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.respuesta,
      },
    })),
  }

  return (
    <section className="py-10" aria-labelledby="faq-titulo">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <h2 id="faq-titulo" className="text-2xl font-bold text-white mb-6 text-center">
        {titulo}
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setAbierto(abierto === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-750 transition-colors"
              aria-expanded={abierto === i}
            >
              <span className="text-white font-medium pr-4">{faq.pregunta}</span>
              <span className={`text-gray-400 text-xl flex-shrink-0 transition-transform duration-200 ${abierto === i ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {abierto === i && (
              <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-gray-700 pt-4 animate-fade-in">
                {faq.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
