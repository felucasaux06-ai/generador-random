import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Nombres Aleatorios Gratis Online',
  description:
    'Genera nombres aleatorios para personas, apellidos, empresas y mascotas al instante. Más de 400 opciones en español. Gratis, sin registro.',
  keywords: [
    'generador de nombres aleatorios',
    'nombres al azar',
    'nombres para personajes',
    'nombres aleatorios en español',
    'generador de apellidos',
    'nombres de empresa aleatorios',
    'nombres para mascotas',
    'nombre random',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/nombres' },
  openGraph: {
    title: 'Generador de Nombres Aleatorios Gratis',
    description:
      'Genera nombres al azar para personas, empresas y mascotas. Más de 400 opciones. Gratis y sin registro.',
    url: 'https://generadorrandom.com/generadores/nombres',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Nombres Aleatorios Gratis',
    description:
      'Genera nombres al azar para personas, empresas y mascotas. +400 opciones en español.',
  },
}

export default function NombresLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Generador de Nombres Aleatorios',
      url: 'https://generadorrandom.com/generadores/nombres',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Genera nombres aleatorios para personas, apellidos, empresas y mascotas. Más de 400 opciones.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Generador de Nombres', item: 'https://generadorrandom.com/generadores/nombres' },
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
