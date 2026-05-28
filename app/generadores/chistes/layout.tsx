import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Chistes Malos en Español Gratis',
  description:
    'Chistes malos garantizados en español. Revela el remate, vota si te hizo reír y comparte en WhatsApp o Twitter. Más de 35 chistes diferentes.',
  keywords: [
    'chistes malos',
    'generador de chistes',
    'dad jokes español',
    'chistes graciosos',
    'chistes en español',
    'chistes para compartir',
    'chistes cortos',
    'humor en español',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/chistes' },
  openGraph: {
    title: 'Generador de Chistes Malos en Español',
    description:
      'Más de 35 chistes malos en español. Revela el remate y comparte en WhatsApp. Gratis.',
    url: 'https://generadorrandom.com/generadores/chistes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Chistes Malos en Español',
    description:
      'Chistes malos con remate. Votá si te hizo reír y compartí en WhatsApp.',
  },
}

export default function ChistesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Generador de Chistes Malos',
      url: 'https://generadorrandom.com/generadores/chistes',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Genera chistes malos en español con remate oculto. Votá y compartí en WhatsApp o Twitter.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Generador de Chistes', item: 'https://generadorrandom.com/generadores/chistes' },
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
