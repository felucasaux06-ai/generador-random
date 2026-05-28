'use client'

import { useState } from 'react'
import Link from 'next/link'

const MOTIVOS = [
  { value: 'error', label: '🐛 Reportar un error' },
  { value: 'sugerencia', label: '💡 Sugerir una herramienta' },
  { value: 'comercial', label: '🤝 Consulta comercial' },
  { value: 'otro', label: '💬 Otro motivo' },
]

export default function ContactoPage() {
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle')
  const [motivo, setMotivo] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEstado('enviando')

    const form = e.currentTarget
    const data = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: `[GeneradorRandom] ${motivo || 'Consulta'} — ${(form.elements.namedItem('asunto') as HTMLInputElement).value}`,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      from_name: 'GeneradorRandom Contacto',
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      setEstado(json.success ? 'ok' : 'error')
    } catch {
      setEstado('error')
    }
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">✉️</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Contacto</h1>
          <p className="text-gray-400 text-lg">
            Estamos para escucharte. Respondemos en menos de 48 horas hábiles.
          </p>
        </div>

        {estado === 'ok' ? (
          /* Mensaje de éxito */
          <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-white font-bold text-xl mb-2">¡Mensaje enviado!</h2>
            <p className="text-gray-400 text-sm mb-6">
              Recibimos tu mensaje. Te respondemos en menos de 48 horas hábiles.
            </p>
            <button
              onClick={() => setEstado('idle')}
              className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">

            {/* Email directo */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-gray-700/40 rounded-xl">
              <span className="text-2xl">📬</span>
              <div>
                <p className="text-gray-400 text-sm">También podés escribirnos directamente a</p>
                <a
                  href="mailto:hola@generadorrandom.com"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  hola@generadorrandom.com
                </a>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Tu nombre <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Juan García"
                    className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Tu email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="juan@ejemplo.com"
                    className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="motivo" className="block text-gray-300 text-sm font-medium mb-2">
                  Motivo de contacto
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Seleccioná un motivo</option>
                  {MOTIVOS.map(m => (
                    <option key={m.value} value={m.label}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="asunto" className="block text-gray-300 text-sm font-medium mb-2">
                  Asunto <span className="text-red-400">*</span>
                </label>
                <input
                  id="asunto"
                  name="asunto"
                  type="text"
                  required
                  placeholder="Describí brevemente tu consulta"
                  className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                  Mensaje <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Contanos en detalle tu consulta, sugerencia o reporte..."
                  className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {estado === 'error' && (
                <p className="text-red-400 text-sm">
                  Hubo un error al enviar el mensaje. Por favor escribinos directamente a{' '}
                  <a href="mailto:hola@generadorrandom.com" className="underline">hola@generadorrandom.com</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={estado === 'enviando'}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
              </button>

              <p className="text-gray-600 text-xs text-center">
                Al enviar aceptás nuestra{' '}
                <Link href="/privacidad" className="text-blue-400 hover:underline">
                  Política de Privacidad
                </Link>.
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
