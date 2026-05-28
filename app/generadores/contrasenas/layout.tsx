import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Contraseñas Seguras y Aleatorias Gratis',
  description:
    'Crea contraseñas fuertes con longitud personalizable, mayúsculas, números y símbolos. 100% privado, todo se genera en tu navegador. Sin registro.',
  keywords: [
    'generador de contraseñas seguras',
    'contraseña aleatoria',
    'password generator',
    'crear contraseña segura',
    'generador de contraseñas online',
    'contraseña fuerte gratis',
    'password aleatorio',
    'generador de claves',
  ],
  alternates: { canonical: 'https://generadorrandom.com/generadores/contrasenas' },
  openGraph: {
    title: 'Generador de Contraseñas Seguras Gratis',
    description:
      'Contraseñas fuertes con longitud, símbolos y números personalizables. 100% privado, en tu navegador.',
    url: 'https://generadorrandom.com/generadores/contrasenas',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Contraseñas Seguras Gratis',
    description:
      'Crea contraseñas fuertes y aleatorias al instante. 100% privado, en tu navegador.',
  },
}

export default function ContrasenaLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Generador de Contraseñas Seguras',
      url: 'https://generadorrandom.com/generadores/contrasenas',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Web',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Genera contraseñas seguras y aleatorias con opciones de longitud, mayúsculas, números y símbolos.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generadorrandom.com' },
        { '@type': 'ListItem', position: 2, name: 'Generador de Contraseñas', item: 'https://generadorrandom.com/generadores/contrasenas' },
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
