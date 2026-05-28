import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contacto | GeneradorRandom',
  description: 'Contactate con el equipo de GeneradorRandom. Sugerencias, reportes de errores, consultas comerciales o simplemente para saludar.',
  alternates: { canonical: 'https://generadorrandom.com/contacto' },
  robots: { index: false, follow: true },
}

const MOTIVOS = [
  { emoji: '🐛', titulo: 'Reportar un error', descripcion: 'Algo no funciona como debería en una herramienta' },
  { emoji: '💡', titulo: 'Sugerir una herramienta', descripcion: 'Tenés una idea para un generador nuevo' },
  { emoji: '🤝', titulo: 'Consulta comercial', descripcion: 'Propuestas de colaboración o publicidad' },
  { emoji: '💬', titulo: 'Feedback general', descripcion: 'Comentarios sobre el sitio o las herramientas' },
]

export default function ContactoPage() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">✉️</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Contacto</h1>
          <p className="text-gray-400 text-lg">
            Estamos para escucharte. Respondemos a todos los mensajes.
          </p>
        </div>

        {/* Email card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-8 text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-white font-bold text-xl mb-2">Escribinos por email</h2>
          <p className="text-gray-400 text-sm mb-6">
            La forma más directa de contactarnos. Respondemos en menos de 48 horas hábiles.
          </p>
          <a
            href="mailto:hola@generadorrandom.com"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 text-lg"
          >
            hola@generadorrandom.com
          </a>
        </div>

        {/* Motivos */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-5">¿Para qué podemos ayudarte?</h2>
          <div className="space-y-4">
            {MOTIVOS.map((m) => (
              <div key={m.titulo} className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-xl">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{m.emoji}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{m.titulo}</p>
                  <p className="text-gray-400 text-sm">{m.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips para el mensaje */}
        <div className="bg-blue-900/20 border border-blue-700/40 rounded-xl p-5 mb-8 text-sm text-blue-300">
          <h2 className="font-bold mb-2 text-blue-200">💡 Para que podamos ayudarte más rápido</h2>
          <ul className="space-y-1 text-blue-300/80">
            <li>• Si reportás un error, mencioná el navegador y dispositivo que usás</li>
            <li>• Si tenés una sugerencia, describí el generador que imaginás</li>
            <li>• Para consultas comerciales, incluí información de tu proyecto</li>
          </ul>
        </div>

        {/* Links */}
        <div className="text-center text-sm text-gray-500">
          <p>También podés leer nuestra{' '}
            <Link href="/privacidad" className="text-blue-400 hover:text-blue-300 underline">política de privacidad</Link>
            {' '}o los{' '}
            <Link href="/terminos" className="text-blue-400 hover:text-blue-300 underline">términos de uso</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
