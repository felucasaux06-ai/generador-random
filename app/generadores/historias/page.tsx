'use client'

import { useState, useCallback } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import {
  TEMPLATES_HISTORIAS,
  PROTAGONISTAS,
  TemaHistoria,
} from '../../lib/data'
import { generarAleatorio, copiarAlPortapapeles } from '../../lib/utils'
import { useLanguage } from '../../contexts/LanguageContext'

const TEMAS: { id: TemaHistoria; label: string; emoji: string; color: string }[] = [
  { id: 'aventura', label: 'Aventura', emoji: '⚔️', color: 'bg-amber-600/20 border-amber-600/50 text-amber-400' },
  { id: 'romance', label: 'Romance', emoji: '💖', color: 'bg-rose-600/20 border-rose-600/50 text-rose-400' },
  { id: 'misterio', label: 'Misterio', emoji: '🔍', color: 'bg-indigo-600/20 border-indigo-600/50 text-indigo-400' },
  { id: 'fantasia', label: 'Fantasía', emoji: '✨', color: 'bg-purple-600/20 border-purple-600/50 text-purple-400' },
]

export default function GeneradorHistorias() {
  const { t } = useLanguage()
  const [temaSeleccionado, setTemaSeleccionado] = useState<TemaHistoria | 'todos'>('todos')
  const [historia, setHistoria] = useState<string>('')
  const [protagonista, setProtagonista] = useState<string>('')
  const [temaActual, setTemaActual] = useState<TemaHistoria | null>(null)
  const [copiado, setCopiado] = useState(false)
  const [leyendo, setLeyendo] = useState(false)

  const generar = useCallback(() => {
    const disponibles =
      temaSeleccionado === 'todos'
        ? TEMPLATES_HISTORIAS
        : TEMPLATES_HISTORIAS.filter((t) => t.tema === temaSeleccionado)

    const template = generarAleatorio(disponibles)
    const nombre = generarAleatorio(PROTAGONISTAS)
    const texto = template.plantilla.replace(/\{protagonista\}/g, nombre)

    setHistoria(texto)
    setProtagonista(nombre)
    setTemaActual(template.tema)
    setCopiado(false)

    if (leyendo) {
      window.speechSynthesis.cancel()
      setLeyendo(false)
    }
  }, [temaSeleccionado, leyendo])

  const copiar = async () => {
    if (!historia) return
    const ok = await copiarAlPortapapeles(historia)
    if (ok) {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const leerEnVozAlta = () => {
    if (!historia || typeof window === 'undefined' || !window.speechSynthesis) return

    if (leyendo) {
      window.speechSynthesis.cancel()
      setLeyendo(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(historia)
    utterance.lang = 'es-ES'
    utterance.rate = 0.9
    utterance.pitch = 1

    const voces = window.speechSynthesis.getVoices()
    const vozEspanol = voces.find(
      (v) => v.lang.startsWith('es') && (v.localService || v.lang === 'es-ES')
    )
    if (vozEspanol) utterance.voice = vozEspanol

    utterance.onend = () => setLeyendo(false)
    utterance.onerror = () => setLeyendo(false)

    setLeyendo(true)
    window.speechSynthesis.speak(utterance)
  }

  const temaInfo = temaActual ? TEMAS.find((t) => t.id === temaActual) : null

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">📖</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">{t.historias.title}</h1>
          <p className="text-zinc-400 text-lg">{t.historias.subtitle}</p>
        </div>

        <AdBlock slot="8901234567" className="mb-8" />

        {/* Selector de tema */}
        <div className="mb-6">
          <h2 className="text-zinc-300 font-semibold mb-3">{t.historias.genre}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3" role="group" aria-label="Selecciona el género literario">
            <button
              onClick={() => setTemaSeleccionado('todos')}
              className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                temaSeleccionado === 'todos'
                  ? 'border-lime-400 bg-lime-400/10 text-lime-400'
                  : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
              }`}
              aria-pressed={temaSeleccionado === 'todos'}
            >
              {t.historias.surprise}
            </button>
            {TEMAS.map((tema) => (
              <button
                key={tema.id}
                onClick={() => setTemaSeleccionado(tema.id)}
                className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  temaSeleccionado === tema.id
                    ? tema.color
                    : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                }`}
                aria-pressed={temaSeleccionado === tema.id}
              >
                <span aria-hidden="true">{tema.emoji}</span> {tema.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botón generar */}
        <button
          onClick={generar}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/30 mb-6"
          aria-label="Generar nueva historia"
        >
          {t.historias.generate}
        </button>

        {/* Historia */}
        {historia && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-6 animate-fade-in">
            {temaInfo && (
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border mb-4 ${temaInfo.color}`}>
                <span aria-hidden="true">{temaInfo.emoji}</span>
                {temaInfo.label} · {protagonista}
              </div>
            )}

            <blockquote
              className="text-zinc-200 text-lg leading-relaxed italic border-l-4 border-amber-600/50 pl-4"
              aria-live="polite"
            >
              {historia}
            </blockquote>

            <p className="text-zinc-500 text-xs mt-4">
              {historia.split(' ').length} {t.historias.words} · {historia.length} {t.historias.chars}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={copiar}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border-2 ${
                  copiado
                    ? 'border-green-500 bg-green-600/20 text-green-400'
                    : 'border-zinc-600 bg-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
                }`}
                aria-label="Copiar historia al portapapeles"
              >
                {copiado ? t.historias.copied : t.historias.copy}
              </button>

              {typeof window !== 'undefined' && 'speechSynthesis' in window && (
                <button
                  onClick={leerEnVozAlta}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border-2 ${
                    leyendo
                      ? 'border-lime-400 bg-lime-400/10 text-lime-400 animate-pulse'
                      : 'border-zinc-600 bg-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
                  }`}
                  aria-label={leyendo ? 'Detener lectura' : 'Leer historia en voz alta'}
                >
                  {leyendo ? t.historias.stop : t.historias.listen}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 text-zinc-400 text-sm leading-relaxed mb-8">
          <h2 className="text-white font-semibold mb-2">¿Para qué sirve este generador?</h2>
          <p>
            Perfecto para escritores que buscan inspiración, profesores que necesitan ejemplos narrativos,
            o simplemente para leer algo diferente cada día. Cada historia es única y generada con
            personajes y situaciones aleatorias. La función de voz alta usa la Web Speech API de tu navegador.
          </p>
        </div>

        <FaqSection faqs={t.historias.faqs} titulo={t.historias.faqTitle} />

        <AdBlock slot="9012345678" />
      </div>
    </div>
  )
}
