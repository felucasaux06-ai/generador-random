import type { Metadata } from 'next'
import Script from 'next/script'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

export const metadata: Metadata = {
  title: {
    default: 'Generador Random - Nombres, Contraseñas, Colores, Historias y Chistes',
    template: '%s | GeneradorRandom',
  },
  description:
    'Suite gratuita de generadores online: nombres aleatorios, contraseñas seguras, paletas de colores, historias cortas y chistes malos. Sin registro, funciona al instante.',
  keywords: [
    'generador de nombres',
    'generador de contraseñas',
    'generador de colores',
    'generador de historias',
    'generador de chistes',
    'herramientas online gratuitas',
    'random generator',
    'paleta de colores aleatoria',
  ],
  authors: [{ name: 'GeneradorRandom' }],
  creator: 'GeneradorRandom',
  publisher: 'GeneradorRandom',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://generadorrandom.com',
    siteName: 'GeneradorRandom',
    title: 'Generador Random - Herramientas Creativas Gratuitas',
    description:
      'Genera nombres, contraseñas, paletas de colores, historias y chistes al instante. Gratis, sin registro.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador Random - Herramientas Creativas Gratuitas',
    description: 'Nombres, contraseñas, colores, historias y chistes generados al instante.',
  },
  alternates: {
    canonical: 'https://generadorrandom.com',
  },
  verification: {
    google: 'HjUnE7Irs77Pjtkr2UznrJIRfZvmmc0P-pUz8VzH0eM',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google AdSense */}
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {/* Schema JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'GeneradorRandom',
              url: 'https://generadorrandom.com',
              description:
                'Suite gratuita de generadores online: nombres, contraseñas, colores, historias y chistes.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://generadorrandom.com/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="bg-gray-950 text-gray-100 min-h-screen flex flex-col font-sans antialiased">
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        <Navigation />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
