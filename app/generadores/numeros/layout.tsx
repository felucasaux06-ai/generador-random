import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Números Aleatorios — Elige el Rango',
  description:
    'Genera números al azar entre cualquier mínimo y máximo. De 1 a 100, de 1 a 6 como un dado, hasta 10 números a la vez. Gratis y sin registro.',
  keywords: [
    'generador de números aleatorios',
    'número al azar',
    'número random',
    'dado virtual online',
    'número aleatorio del 1 al 100',
    'generador de números online',
    'sorteo de números',
    'número random gratis',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/numeros' },
  openGraph: {
    title: 'Generador de Números Aleatorios — Elige el Rango',
    description:
      'Números al azar entre cualquier mínimo y máximo. Hasta 10 a la vez. Como un dado virtual. Gratis.',
    url: 'https://generadorrandom.com/generadores/numeros',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Números Aleatorios',
    description:
      'Elegí el rango y generá al instante. Del 1 al 100, dado virtual, hasta 10 a la vez.',
  },
}

export default function NumerosLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Generador de Números Aleatorios',
      url: 'https://generadorrandom.com/generadores/numeros',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Genera números aleatorios entre cualquier rango mínimo y máximo. Hasta 10 números a la vez.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Generador de Números', item: 'https://generadorrandom.com/generadores/numeros' },
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
