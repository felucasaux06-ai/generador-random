'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import RelatedTools from '../../components/RelatedTools'
import { useLanguage } from '../../contexts/LanguageContext'

const COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f97316',
  '#10b981', '#ef4444', '#06b6d4', '#eab308',
  '#6366f1', '#14b8a6', '#f43f5e', '#84cc16',
]

const DEFAULT_ITEMS = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5']

export default function GeneradorRuleta() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const animRef = useRef<number | null>(null)
  const itemsRef = useRef<string[]>(DEFAULT_ITEMS)

  const [items, setItems] = useState<string[]>(DEFAULT_ITEMS)
  const [newItem, setNewItem] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [removeAfterSpin, setRemoveAfterSpin] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  const draw = useCallback((rotation: number) => {
    const canvas = canvasRef.current
    const currentItems = itemsRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = canvas.width
    const cx = size / 2
    const cy = size / 2
    const radius = cx - 4
    ctx.clearRect(0, 0, size, size)

    if (currentItems.length === 0) {
      ctx.fillStyle = '#18181b'
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#52525b'
      ctx.font = 'bold 16px Inter, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Agregá opciones', cx, cy - 8)
      ctx.fillText('para empezar', cx, cy + 16)
      return
    }

    const segAngle = (2 * Math.PI) / currentItems.length

    for (let i = 0; i < currentItems.length; i++) {
      const startAngle = rotation + i * segAngle
      const endAngle = startAngle + segAngle

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = COLORS[i % COLORS.length]
      ctx.fill()
      ctx.strokeStyle = 'rgba(8, 8, 8, 0.85)'
      ctx.lineWidth = 2
      ctx.stroke()

      const midAngle = startAngle + segAngle / 2
      const fontSize = Math.max(9, Math.min(14, Math.floor(250 / currentItems.length)))
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(midAngle)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#ffffff'
      ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`
      ctx.shadowColor = 'rgba(0,0,0,0.7)'
      ctx.shadowBlur = 3
      const label = currentItems[i].length > 48 ? currentItems[i].slice(0, 18) + '…' : currentItems[i]
      ctx.fillText(label, radius - 12, fontSize / 3)
      ctx.restore()
    }

    ctx.beginPath()
    ctx.arc(cx, cy, 15, 0, Math.PI * 2)
    ctx.fillStyle = '#080808'
    ctx.fill()
    ctx.strokeStyle = '#52525b'
    ctx.lineWidth = 3
    ctx.stroke()
  }, [])

  useEffect(() => {
    draw(rotationRef.current)
  }, [items, draw])

  const spin = useCallback(() => {
    if (isSpinning || items.length < 2) return

    setIsSpinning(true)
    setResult(null)

    const startRot = rotationRef.current
    const extraSpins = (6 + Math.random() * 4) * Math.PI * 2
    const targetOffset = Math.random() * Math.PI * 2
    const total = extraSpins + targetOffset
    const duration = 4480 + Math.random() * 1480
    const startTime = performance.now()
    const snapshotItems = [...items]
    const snapshotRemove = removeAfterSpin

    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 5)

      const current = startRot + total * eased
      rotationRef.current = current
      draw(current)

      if (t < 1) {
        animRef.current = requestAnimationFrame(tick)
      } else {
        const segAngle = (2 * Math.PI) / snapshotItems.length
        const normalized = (((-Math.PI / 2 - current) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const winnerIdx = Math.floor(normalized / segAngle) % snapshotItems.length
        const winner = snapshotItems[winnerIdx]

        setResult(winner)
        setIsSpinning(false)

        if (snapshotRemove) {
          setItems(prev => prev.filter((_, i) => i !== winnerIdx))
        }
      }
    }

    animRef.current = requestAnimationFrame(tick)
  }, [isSpinning, items, removeAfterSpin, draw])

  const addItem = () => {
    const trimmed = newItem.trim()
    if (!trimmed || items.length >= 48) return
    setItems(prev => [...prev, trimmed])
    setNewItem('')
    setResult(null)
  }

  const removeItem = (index: number) => {
    if (isSpinning) return
    setItems(prev => prev.filter((_, i) => i !== index))
    setResult(null)
  }

  const startEdit = (index: number) => {
    setEditIndex(index)
    setEditValue(items[index])
  }

  const saveEdit = () => {
    if (editIndex === null) return
    const trimmed = editValue.trim()
    if (trimmed) {
      setItems(prev => prev.map((item, i) => i === editIndex ? trimmed : item))
    }
    setEditIndex(null)
    setEditValue('')
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">🎡</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">{t.ruleta.title}</h1>
          <p className="text-zinc-400 text-lg">{t.ruleta.subtitle}</p>
        </div>

        <AdBlock slot="1122334455" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna ruleta */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 flex flex-col items-center">

            <div className="mb-0 z-10" aria-hidden="true">
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                <polygon points="0,0 28,0 14,22" fill="#f59e0b" />
              </svg>
            </div>

            <div className="w-full max-w-[340px]">
              <canvas
                ref={canvasRef}
                width={340}
                height={340}
                className="w-full rounded-full"
                aria-label="Ruleta aleatoria"
              />
            </div>

            <button
              onClick={spin}
              disabled={isSpinning || items.length < 2}
              className="mt-6 w-full max-w-[300px] bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white font-black py-4 px-8 rounded-2xl text-xl transition-all duration-480 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/30"
              aria-label="Girar la ruleta"
            >
              {isSpinning ? t.ruleta.spinning : t.ruleta.spin}
            </button>

            {items.length < 2 && !isSpinning && (
              <p className="mt-3 text-zinc-500 text-sm text-center">
                {t.ruleta.needTwo}
              </p>
            )}

            <label className="flex items-center gap-3 mt-5 cursor-pointer select-none">
              <div
                className={`w-11 h-6 rounded-full transition-colors duration-480 flex-shrink-0 cursor-pointer ${removeAfterSpin ? 'bg-fuchsia-600' : 'bg-zinc-600'}`}
                onClick={() => setRemoveAfterSpin(p => !p)}
                role="switch"
                aria-checked={removeAfterSpin}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setRemoveAfterSpin(p => !p)}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-480 mt-0.5 ${removeAfterSpin ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-zinc-300 text-sm">{t.ruleta.removeWinner}</span>
            </label>

            {result && !isSpinning && (
              <div className="mt-5 w-full bg-amber-900/48 border border-amber-600/40 rounded-2xl p-5 text-center animate-fade-in">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{t.ruleta.winner}</p>
                <p className="text-white text-2xl font-extrabold break-words">{result}</p>
                <p className="text-amber-500 text-2xl mt-1">🎉</p>
              </div>
            )}
          </div>

          {/* Columna opciones */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">{t.ruleta.options}</h2>
              <span className="text-zinc-500 text-sm">{items.length}/48</span>
            </div>

            <div className="flex gap-2 mb-5">
              <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addItem()}
                placeholder={t.ruleta.placeholder}
                maxLength={40}
                disabled={items.length >= 48 || isSpinning}
                className="flex-1 bg-zinc-700 border border-zinc-600 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500 text-sm disabled:opacity-50"
                aria-label="Nueva opción para la ruleta"
              />
              <button
                onClick={addItem}
                disabled={!newItem.trim() || items.length >= 48 || isSpinning}
                className="bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap flex-shrink-0"
              >
                {t.ruleta.add}
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto max-h-[380px] pr-1 no-scrollbar">
              {items.length === 0 && (
                <p className="text-zinc-600 text-sm text-center py-8">
                  No hay opciones todavía.<br />Agregá al menos 2 para poder girar.
                </p>
              )}
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-zinc-700/50 rounded-xl group hover:bg-zinc-700/80 transition-colors"
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    aria-hidden="true"
                  />

                  {editIndex === i ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveEdit()
                        if (e.key === 'Escape') setEditIndex(null)
                      }}
                      onBlur={saveEdit}
                      autoFocus
                      maxLength={40}
                      className="flex-1 bg-zinc-600 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                    />
                  ) : (
                    <span className="flex-1 text-zinc-300 text-sm truncate">{item}</span>
                  )}

                  <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editIndex !== i && (
                      <button
                        onClick={() => startEdit(i)}
                        disabled={isSpinning}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-600 hover:bg-zinc-500 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
                        aria-label={`Editar "${item}"`}
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => removeItem(i)}
                      disabled={isSpinning}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-800/40 hover:bg-red-700/60 text-red-400 hover:text-red-300 font-bold transition-colors disabled:opacity-30 text-base"
                      aria-label={`Eliminar "${item}"`}
                      title="Eliminar"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-700">
                <button
                  onClick={() => { setItems(DEFAULT_ITEMS); setResult(null) }}
                  disabled={isSpinning}
                  className="flex-1 text-zinc-500 hover:text-zinc-300 text-xs transition-colors disabled:opacity-30 text-center py-1"
                >
                  {t.ruleta.restore}
                </button>
                <button
                  onClick={() => { setItems([]); setResult(null) }}
                  disabled={isSpinning}
                  className="flex-1 text-red-500 hover:text-red-400 text-xs transition-colors disabled:opacity-30 text-center py-1"
                >
                  {t.ruleta.clearAll}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-6 bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 text-sm text-zinc-400">
          <h2 className="text-white font-semibold mb-2">{t.ruleta.howTitle}</h2>
          <p>{t.ruleta.howText}</p>
        </div>

        {/* Contenido SEO */}
        <div className="mt-6 bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-3">Ruleta aleatoria online para sorteos y decisiones</h2>
          <div className="text-zinc-400 text-sm leading-relaxed space-y-3">
            <p>
              La <strong className="text-zinc-300">ruleta aleatoria online</strong> de GeneradorRandom es la herramienta más versátil para tomar decisiones al azar. A diferencia de otros generadores, podés personalizar completamente las opciones: agregá nombres, actividades, números o cualquier texto, editá lo que quieras y eliminá lo que no necesites.
            </p>
            <p>
              Usos frecuentes: <strong className="text-zinc-300">sorteos online</strong> (quién paga la cuenta, quién hace la tarea), asignar turnos en el trabajo, elegir qué comer o qué película ver, sortear regalos entre amigos, definir equipos para juegos, y cualquier decisión que merezca un proceso justo e imparcial.
            </p>
            <p>
              Con la opción <strong className="text-zinc-300">"Eliminar ganador"</strong> podés hacer sorteos sin repetición: cada vez que gira, el ganador se saca de la lista. Ideal para rifas, sorteos de premios, o asignar roles en grupos. Soporta hasta 48 opciones simultáneas.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <FaqSection faqs={t.ruleta.faqs} titulo={t.ruleta.faqTitle} />
        </div>

        <RelatedTools current="/generadores/ruleta" />

        <AdBlock slot="2233445566" className="mt-8" />
      </div>
    </div>
  )
}
