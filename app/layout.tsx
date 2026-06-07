import type { Metadata } from 'next'
import Script from 'next/script'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import EzoicSPA from './components/EzoicSPA'
import { LanguageProvider } from './contexts/LanguageContext'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: {
    default: 'GeneradorRandom — Nombres, Números, Ruleta, Contraseñas y Más',
    template: '%s | GeneradorRandom.com',
  },
  description:
    'Genera nombres aleatorios, contraseñas seguras, colores, historias, chistes, ruleta online y más. 9 herramientas gratis, sin registro, en español.',
  keywords: [
    'generador random',
    'generador aleatorio online',
    'generador de nombres aleatorios',
    'generador de contraseñas seguras',
    'generador de colores',
    'generador de historias',
    'ruleta aleatoria online',
    'generador de números aleatorios',
    'cara o cruz online',
    'sorteo online gratis',
    'chistes argentinos',
    'herramientas online gratis',
    'generador gratis en español',
    'número al azar',
  ],
  authors: [{ name: 'GeneradorRandom' }],
  creator: 'GeneradorRandom',
  publisher: 'GeneradorRandom',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://generadorrandom.com',
    siteName: 'GeneradorRandom',
    title: 'GeneradorRandom — 9 Herramientas Aleatorias Gratis',
    description:
      'Nombres, contraseñas, colores, ruleta, números, cara o cruz, historias y chistes al instante. Gratis, sin registro.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GeneradorRandom — 9 Herramientas Aleatorias Gratis',
    description:
      'Ruleta, números, nombres, contraseñas, colores, historias y chistes. Todo al azar, todo gratis.',
  },
  alternates: {
    canonical: 'https://generadorrandom.com',
  },
  verification: {
    google: 'VIzlNZPSjyi52nFDu732dMTe_wzHVrJ8amkFhCEtuWg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Ezoic: privacy scripts must load first */}
        <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js" />
        <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js" />
        {/* Ezoic: main integration script */}
        <script async src="//www.ezojs.com/ezoic/sa.min.js" />
        <script dangerouslySetInnerHTML={{ __html: 'window.ezstandalone=window.ezstandalone||{};ezstandalone.cmd=ezstandalone.cmd||[];' }} />
        <script src="//ezoicanalytics.com/analytics.js" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3677895061975967"
          crossOrigin="anonymous"
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'GeneradorRandom',
                url: 'https://generadorrandom.com',
                description:
                  'Herramientas online gratuitas: nombres, contraseñas, colores, historias, chistes, ruleta, números y más.',
                inLanguage: 'es',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://generadorrandom.com/?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'GeneradorRandom',
                url: 'https://generadorrandom.com',
                description:
                  'Sitio de herramientas aleatorias gratuitas en español: nombres, contraseñas, colores, ruleta, números y más.',
                sameAs: [],
              },
            ]),
          }}
        />
      </head>
      <body className="bg-[#0A0705] text-[#F2E9D4] min-h-screen flex flex-col font-sans antialiased">
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});gtag('config','AW-18204398741');`}
            </Script>
          </>
        )}
        {!GA_ID && (
          <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18204398741" strategy="afterInteractive" />
            <Script id="google-ads" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18204398741');`}
            </Script>
          </>
        )}
        <LanguageProvider>
          <EzoicSPA />
          <Navigation />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  )
}
