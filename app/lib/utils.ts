'use client'

export function generarAleatorio<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export async function copiarAlPortapapeles(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    const textArea = document.createElement('textarea')
    textArea.value = texto
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textArea)
    return ok
  }
}

export interface OpcionesContrasena {
  longitud: number
  mayusculas: boolean
  numeros: boolean
  simbolos: boolean
}

export function generarContrasena(opciones: OpcionesContrasena): string {
  const minusculas = 'abcdefghijklmnopqrstuvwxyz'
  const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numeros = '0123456789'
  const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let charset = minusculas
  const garantizados: string[] = []

  if (opciones.mayusculas) {
    charset += mayusculas
    garantizados.push(mayusculas[Math.floor(Math.random() * mayusculas.length)])
  }
  if (opciones.numeros) {
    charset += numeros
    garantizados.push(numeros[Math.floor(Math.random() * numeros.length)])
  }
  if (opciones.simbolos) {
    charset += simbolos
    garantizados.push(simbolos[Math.floor(Math.random() * simbolos.length)])
  }

  const restante = opciones.longitud - garantizados.length
  const parteAleatoria = Array.from({ length: restante }, () =>
    charset[Math.floor(Math.random() * charset.length)]
  )

  const combinado = [...garantizados, ...parteAleatoria]
  for (let i = combinado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[combinado[i], combinado[j]] = [combinado[j], combinado[i]]
  }

  return combinado.join('')
}

export type FuerzaContrasena = 'Débil' | 'Media' | 'Fuerte' | 'Muy fuerte'

export function evaluarFuerza(contrasena: string): {
  fuerza: FuerzaContrasena
  porcentaje: number
  color: string
} {
  let puntos = 0
  if (contrasena.length >= 8) puntos++
  if (contrasena.length >= 12) puntos++
  if (contrasena.length >= 16) puntos++
  if (/[A-Z]/.test(contrasena)) puntos++
  if (/[0-9]/.test(contrasena)) puntos++
  if (/[^A-Za-z0-9]/.test(contrasena)) puntos++

  if (puntos <= 2) return { fuerza: 'Débil', porcentaje: 25, color: 'bg-red-500' }
  if (puntos <= 3) return { fuerza: 'Media', porcentaje: 50, color: 'bg-yellow-500' }
  if (puntos <= 4) return { fuerza: 'Fuerte', porcentaje: 75, color: 'bg-blue-500' }
  return { fuerza: 'Muy fuerte', porcentaje: 100, color: 'bg-green-500' }
}

export function generarColorHex(): string {
  const hex = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')
  return `#${hex}`
}

export function hexARgb(hex: string): { r: number; g: number; b: number } {
  const resultado = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return resultado
    ? {
        r: parseInt(resultado[1], 16),
        g: parseInt(resultado[2], 16),
        b: parseInt(resultado[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function generarPaleta(): string[] {
  return Array.from({ length: 5 }, () => generarColorHex())
}

export function esColorClaro(hex: string): boolean {
  const { r, g, b } = hexARgb(hex)
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminancia > 0.5
}
