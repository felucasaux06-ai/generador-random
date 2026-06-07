import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cara o Cruz Online - Lanzar Moneda Gratis | GeneradorRandom',
  description:
    'Lanzá la moneda online con nuestro generador de cara o cruz gratis. Sin moneda física, resultado al instante. ¡Probalo ahora!',
  keywords: [
    'cara o cruz online',
    'tirar moneda virtual',
    'coin flip online',
    'cara o sello',
    'lanzar moneda gratis',
    'cara o cruz gratis',
    'moneda al azar',
    'sorteo cara o cruz',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/cara-o-cruz' },
  openGraph: {
    title: 'Cara o Cruz Online — Moneda Virtual Gratis',
    description:
      '50/50 garantizado. Tirá la moneda virtual al instante. Con estadísticas de sesión.',
    url: 'https://generadorrandom.com/generadores/cara-o-cruz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cara o Cruz Online Gratis',
    description:
      '50/50 garantizado. Moneda virtual al instante. Con estadísticas de sesión.',
  },
}

export default function CaraOCruzLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Cara o Cruz — Moneda Virtual',
      url: 'https://generadorrandom.com/generadores/cara-o-cruz',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Tirá una moneda virtual online. 50/50 garantizado con estadísticas de sesión. Sin registro.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Cara o Cruz', item: 'https://generadorrandom.com/generadores/cara-o-cruz' },
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
