'use client'

import { useState, useCallback } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'

const FAQS_NOMBRES = [
  {
    pregunta: '¿Para qué sirve un generador de nombres aleatorios?',
    respuesta: 'Es útil para escritores que necesitan nombres para personajes, desarrolladores que quieren datos de prueba, diseñadores que crean maquetas, jugadores de rol, o cualquier persona que necesite inspiración para elegir un nombre creativo.',
  },
  {
    pregunta: '¿Los nombres generados son únicos?',
    respuesta: 'Sí, cada nombre se selecciona aleatoriamente de una base de datos de más de 400 opciones. Puedes generar tantos como quieras hasta encontrar el perfecto.',
  },
  {
    pregunta: '¿Puedo usar estos nombres para mi novela o juego?',
    respuesta: 'Absolutamente. Todos los nombres generados son de uso libre. Perfectos para personajes de novelas, videojuegos, juegos de rol, guiones, cómics o cualquier proyecto creativo.',
  },
  {
    pregunta: '¿Qué categorías de nombres incluye?',
    respuesta: 'El generador incluye cuatro categorías: nombres de personas en español, apellidos, nombres de empresas y nombres para mascotas.',
  },
  {
    pregunta: '¿Es gratis usar este generador de nombres?',
    respuesta: 'Sí, es completamente gratuito. No necesitas registrarte, crear una cuenta ni pagar nada. Solo abre la página y empieza a generar.',
  },
]
import { NOMBRES_PERSONAS, APELLIDOS, NOMBRES_EMPRESAS, NOMBRES_MASCOTAS } from '../../lib/data'
import { generarAleatorio, copiarAlPortapapeles } from '../../lib/utils'
import RelatedTools from '../../components/RelatedTools'

type Categoria = 'personas' | 'apellidos' | 'empresas' | 'mascotas'

const CATEGORIAS: { id: Categoria; label: string; emoji: string; descripcion: string }[] = [
  { id: 'personas', label: 'Personas', emoji: '👤', descripcion: 'Nombres de pila' },
  { id: 'apellidos', label: 'Apellidos', emoji: '🏷️', descripcion: 'Apellidos' },
  { id: 'empresas', label: 'Empresas', emoji: '🏢', descripcion: 'Nombres corporativos' },
  { id: 'mascotas', label: 'Mascotas', emoji: '🐾', descripcion: 'Nombres para mascotas' },
]

const DATOS: Record<Categoria, string[]> = {
  personas: NOMBRES_PERSONAS,
  apellidos: APELLIDOS,
  empresas: NOMBRES_EMPRESAS,
  mascotas: NOMBRES_MASCOTAS,
}

export default function GeneradorNombres() {
  const [categoria, setCategoria] = useState<Categoria>('personas')
  const [nombreActual, setNombreActual] = useState<string>('')
  const [historial, setHistorial] = useState<string[]>([])
  const [copiado, setCopiado] = useState(false)
  const [animando, setAnimando] = useState(false)

  const generar = useCallback(() => {
    setAnimando(true)
    setTimeout(() => {
      const nuevo = generarAleatorio(DATOS[categoria])
      setNombreActual(nuevo)
      setHistorial((prev) => [nuevo, ...prev.filter((n) => n !== nuevo)].slice(0, 10))
      setAnimando(false)
    }, 150)
  }, [categoria])

  const copiar = async () => {
    if (!nombreActual) return
    const ok = await copiarAlPortapapeles(nombreActual)
    if (ok) {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const cambiarCategoria = (cat: Categoria) => {
    setCategoria(cat)
    setNombreActual('')
    setHistorial([])
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">👤</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Generador de Nombres</h1>
          <p className="text-gray-400 text-lg">
            Genera nombres únicos para personas, apellidos, empresas y mascotas al instante.
          </p>
        </div>

        {/* Ad Superior */}
        <AdBlock slot="2345678901" className="mb-8" />

        {/* Selector de categoría */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8" role="group" aria-label="Categoría de nombre">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => cambiarCategoria(cat.id)}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                categoria === cat.id
                  ? 'border-blue-500 bg-blue-600/20 text-white'
                  : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
              aria-pressed={categoria === cat.id}
            >
              <span className="text-2xl mb-1" aria-hidden="true">{cat.emoji}</span>
              <span className="text-sm font-semibold">{cat.label}</span>
              <span className="text-xs opacity-70 mt-1">{cat.descripcion}</span>
            </button>
          ))}
        </div>

        {/* Resultado principal */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-center mb-6">
          <div
            className={`text-5xl md:text-7xl font-extrabold text-white mb-6 min-h-[80px] flex items-center justify-center transition-all duration-200 ${
              animando ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            aria-live="polite"
            aria-label={nombreActual ? `Nombre generado: ${nombreActual}` : 'Presiona generar para obtener un nombre'}
          >
            {nombreActual || (
              <span className="text-gray-600 text-4xl">¿Listo?</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={generar}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
              aria-label={`Generar ${CATEGORIAS.find((c) => c.id === categoria)?.label}`}
            >
              🎲 Generar
            </button>
            <button
              onClick={copiar}
              disabled={!nombreActual}
              className={`font-bold px-8 py-3 rounded-xl text-lg transition-all duration-200 border-2 ${
                copiado
                  ? 'border-green-500 bg-green-600/20 text-green-400'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
              }`}
              aria-label="Copiar nombre al portapapeles"
            >
              {copiado ? '✅ ¡Copiado!' : '📋 Copiar'}
            </button>
          </div>
        </div>

        {/* Historial */}
        {historial.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span aria-hidden="true">🕐</span> Últimos generados
            </h2>
            <div className="flex flex-wrap gap-2">
              {historial.map((nombre, i) => (
                <button
                  key={`${nombre}-${i}`}
                  onClick={async () => {
                    setNombreActual(nombre)
                    await copiarAlPortapapeles(nombre)
                    setCopiado(true)
                    setTimeout(() => setCopiado(false), 2000)
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1.5 rounded-lg text-sm transition-colors hover:text-white"
                  title={`Seleccionar y copiar: ${nombre}`}
                >
                  {nombre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contenido SEO */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-3">Generador de nombres aleatorios para todos los usos</h2>
          <div className="text-gray-400 text-sm leading-relaxed space-y-3">
            <p>
              El generador de nombres aleatorios de GeneradorRandom ofrece cuatro categorías: <strong className="text-gray-300">nombres de personas</strong> (clásicos y raros), <strong className="text-gray-300">apellidos</strong> (comunes, de origen inmigrante y únicos), <strong className="text-gray-300">nombres de empresas</strong> (serios y creativos) y <strong className="text-gray-300">nombres para mascotas</strong>. Todo al instante, sin límites.
            </p>
            <p>
              Es la herramienta favorita de <strong className="text-gray-300">escritores que necesitan nombres para personajes</strong> de novelas y guiones, desarrolladores que generan datos de prueba para bases de datos, diseñadores que crean maquetas con texto realista, jugadores de rol que arman sus campañas, y docentes que necesitan nombres ficticios para ejemplos.
            </p>
            <p>
              Los <strong className="text-gray-300">nombres de empresas</strong> van desde opciones profesionales como "Estudio Contable García & Asociados" hasta startups modernas, ideal para brainstorming de marca. Los nombres de mascotas mezclan los clásicos con los absurdos (Roberto, Messi, Alfajor), porque las mejores mascotas merecen los mejores nombres.
            </p>
            <p>
              Cada generación es completamente aleatoria. Generá todos los que necesites hasta encontrar el perfecto. Sin registro, sin límites, sin costo.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <FaqSection faqs={FAQS_NOMBRES} titulo="Preguntas sobre el Generador de Nombres" />

        {/* Internal links */}
        <RelatedTools current="/generadores/nombres" />

        {/* Ad Inferior */}
        <AdBlock slot="3456789012" className="mt-8" />
      </div>
    </div>
  )
}
