import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Chistes Argentinos con Lunfardo',
  description:
    'Los mejores chistes argentinos con lunfardo, mate, asado e inflación. Chistes picarescos incluidos. ¡Compartí en WhatsApp y Twitter!',
  keywords: [
    'chistes argentinos',
    'humor argentino',
    'chistes con lunfardo',
    'chistes del asado',
    'chistes del mate',
    'humor rioplatense',
    'chistes de argentina',
    'chistes argentinos graciosos',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/chistes-argentinos' },
  openGraph: {
    title: 'Generador de Chistes Argentinos con Lunfardo',
    description:
      'Chistes argentinos con lunfardo, mate, asado e inflación. Picarescos incluidos. ¡Compartí!',
    url: 'https://generadorrandom.com/generadores/chistes-argentinos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Chistes Argentinos',
    description:
      'Lunfardo, mate, asado, inflación y humor picaresco. Los mejores chistes del Río de la Plata.',
  },
}

export default function ChistesArgentinosLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Generador de Chistes Argentinos',
      url: 'https://generadorrandom.com/generadores/chistes-argentinos',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Web',
      inLanguage: 'es-AR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Genera chistes argentinos auténticos con lunfardo, mate, asado e inflación. Incluye humor picaresco.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Chistes Argentinos', item: 'https://generadorrandom.com/generadores/chistes-argentinos' },
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
