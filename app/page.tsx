import type { Metadata } from 'next'
import HomeContent from './components/HomeContent'

export const metadata: Metadata = {
  title: 'GeneradorRandom — 9 Herramientas Creativas Gratuitas Online',
  description:
    'Genera nombres, contraseñas, colores, historias, chistes, ruleta, números al azar y más. 100% gratis, sin registro.',
}

export default function HomePage() {
  return <HomeContent />
}
