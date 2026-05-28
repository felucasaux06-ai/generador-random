import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Historias Cortas Aleatorias Gratis',
  description:
    'Crea historias cortas únicas de aventura, romance, misterio y fantasía en segundos. Con lector de voz en español. Ideal para escritores.',
  keywords: [
    'generador de historias',
    'historia aleatoria',
    'cuento aleatorio',
    'generador de cuentos',
    'escritura creativa',
    'historia corta online',
    'generador narrativo',
    'bloqueo del escritor',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/historias' },
  openGraph: {
    title: 'Generador de Historias Cortas Aleatorias',
    description:
      'Historias únicas de aventura, romance, misterio y fantasía. Con voz. Gratis para escritores.',
    url: 'https://generadorrandom.com/generadores/historias',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Historias Cortas Aleatorias',
    description:
      'Aventura, romance, misterio y fantasía generadas al instante. Con lector de voz.',
  },
}

export default function HistoriasLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Generador de Historias Aleatorias',
      url: 'https://generadorrandom.com/generadores/historias',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Genera historias cortas aleatorias de aventura, romance, misterio y fantasía con personajes únicos.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Generador de Historias', item: 'https://generadorrandom.com/generadores/historias' },
      ],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
