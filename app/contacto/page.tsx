'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

const MOTIVOS_ES = [
  { value: 'error', label: '🐛 Reportar un error' },
  { value: 'sugerencia', label: '💡 Sugerir una herramienta' },
  { value: 'comercial', label: '🤝 Consulta comercial' },
  { value: 'otro', label: '💬 Otro motivo' },
]

const MOTIVOS_EN = [
  { value: 'error', label: '🐛 Report a bug' },
  { value: 'sugerencia', label: '💡 Suggest a tool' },
  { value: 'comercial', label: '🤝 Business inquiry' },
  { value: 'otro', label: '💬 Other' },
]

export default function ContactoPage() {
  const { lang, t } = useLanguage()
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle')
  const [motivo, setMotivo] = useState('')
  const MOTIVOS = lang === 'es' ? MOTIVOS_ES : MOTIVOS_EN

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEstado('enviando')

    const form = e.currentTarget
    const data = {
      access_key: '510370a8-c8ba-482d-960d-2e260da3d034',
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
      if (json.success) {
        setEstado('ok')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (window as any).gtag === 'function') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(window as any).gtag('event', 'ads_conversion_Enviar_formulario_de_cl_1', {
            event_callback: () => {},
            event_timeout: 2000,
          })
        }
      } else {
        setEstado('error')
      }
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
          <h1 className="text-4xl font-extrabold text-white mb-3">{t.contacto.title}</h1>
          <p className="text-zinc-400 text-lg">{t.contacto.subtitle}</p>
        </div>

        {estado === 'ok' ? (
          <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-white font-bold text-xl mb-2">{t.contacto.success}</h2>
            <p className="text-zinc-400 text-sm mb-6">{t.contacto.successMsg}</p>
            <button
              onClick={() => setEstado('idle')}
              className="text-[#E8531E] hover:text-[#F07050] text-sm underline transition-colors"
            >
              {t.contacto.sendAnother}
            </button>
          </div>
        ) : (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8">

            {/* Email directo */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-zinc-700/40 rounded-xl">
              <span className="text-2xl">📬</span>
              <div>
                <p className="text-zinc-400 text-sm">{t.contacto.directEmail}</p>
                <a
                  href="mailto:generador.random@gmail.com"
                  className="text-[#E8531E] hover:text-[#F07050] font-semibold transition-colors"
                >
                  generador.random@gmail.com
                </a>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-2">
                    {t.contacto.name} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t.contacto.namePlaceholder}
                    className="w-full bg-zinc-900 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#E8531E] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-2">
                    {t.contacto.email} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t.contacto.emailPlaceholder}
                    className="w-full bg-zinc-900 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#E8531E] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="motivo" className="block text-zinc-300 text-sm font-medium mb-2">
                  {t.contacto.subject}
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E8531E] transition-colors"
                >
                  <option value="">{t.contacto.subjectSelect}</option>
                  {MOTIVOS.map(m => (
                    <option key={m.value} value={m.label}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="asunto" className="block text-zinc-300 text-sm font-medium mb-2">
                  {t.contacto.asunto} <span className="text-red-400">*</span>
                </label>
                <input
                  id="asunto"
                  name="asunto"
                  type="text"
                  required
                  placeholder={t.contacto.asuntoPlaceholder}
                  className="w-full bg-zinc-900 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#E8531E] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-zinc-300 text-sm font-medium mb-2">
                  {t.contacto.message} <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t.contacto.messagePlaceholder}
                  className="w-full bg-zinc-900 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#E8531E] transition-colors resize-none"
                />
              </div>

              {estado === 'error' && (
                <p className="text-red-400 text-sm">
                  {t.contacto.errorMsg}{' '}
                  <a href="mailto:generador.random@gmail.com" className="underline">generador.random@gmail.com</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={estado === 'enviando'}
                className="w-full bg-[#E8531E] hover:bg-[#D4481A] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {estado === 'enviando' ? t.contacto.sending : t.contacto.send}
              </button>

              <p className="text-zinc-600 text-xs text-center">
                {t.contacto.privacy}{' '}
                <Link href="/privacidad" className="text-[#E8531E] hover:underline">
                  {t.contacto.privacyLink}
                </Link>.
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
