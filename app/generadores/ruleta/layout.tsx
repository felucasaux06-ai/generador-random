import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ruleta Aleatoria Online Gratis — Sorteos y Decisiones',
  description:
    'Ruleta giratoria online con hasta 48 opciones personalizables. Perfecta para sorteos, asignar tareas, elegir qué comer y tomar decisiones al azar.',
  keywords: [
    'ruleta aleatoria online',
    'sorteo online gratis',
    'ruleta de decisiones',
    'ruleta random',
    'girar ruleta online',
    'sorteo entre nombres',
    'ruleta virtual gratis',
    'elegir al azar online',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/ruleta' },
  openGraph: {
    title: 'Ruleta Aleatoria Online Gratis — Sorteos y Decisiones',
    description:
      'Hasta 48 opciones personalizables. Para sorteos, tareas, elegir qué comer y más. Gratis.',
    url: 'https://generadorrandom.com/generadores/ruleta',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruleta Aleatoria Online Gratis',
    description:
      'Sorteos y decisiones al azar. Hasta 48 opciones. Gratis y sin registro.',
  },
}

export default function RuletaLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Ruleta Aleatoria Online',
      url: 'https://generadorrandom.com/generadores/ruleta',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Ruleta giratoria online con opciones personalizables. Ideal para sorteos, asignar tareas y tomar decisiones al azar.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Ruleta Aleatoria', item: 'https://generadorrandom.com/generadores/ruleta' },
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
