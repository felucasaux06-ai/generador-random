import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Colores Aleatorios — Paletas HEX y RGB Gratis',
  description:
    'Genera paletas de 5 colores únicas con código HEX y RGB listos para copiar. Gratis para diseñadores y desarrolladores web. Guarda tus favoritos.',
  keywords: [
    'generador de colores aleatorios',
    'paleta de colores aleatoria',
    'color hex aleatorio',
    'rgb aleatorio',
    'generador de paletas',
    'colores al azar',
    'paleta de colores online',
    'color picker aleatorio',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/colores' },
  openGraph: {
    title: 'Generador de Colores Aleatorios — Paletas HEX y RGB',
    description:
      'Paletas de 5 colores únicas con HEX y RGB. Para diseñadores y devs. Gratis y sin registro.',
    url: 'https://generadorrandom.com/generadores/colores',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Colores Aleatorios — Paletas HEX y RGB',
    description:
      'Paletas de colores únicas con HEX y RGB listos para copiar. Gratis para diseñadores.',
  },
}

export default function ColoresLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Generador de Colores y Paletas Aleatorias',
      url: 'https://generadorrandom.com/generadores/colores',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Genera paletas de 5 colores aleatorios con valores HEX y RGB. Guarda tus favoritos en el navegador.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Generador de Colores', item: 'https://generadorrandom.com/generadores/colores' },
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
