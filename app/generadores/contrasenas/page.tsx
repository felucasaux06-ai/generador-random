'use client'

import { useState, useCallback, useEffect } from 'react'
import AdBlock from '../../components/AdBlock'
import FaqSection from '../../components/FaqSection'
import { generarContrasena, evaluarFuerza, copiarAlPortapapeles } from '../../lib/utils'
import RelatedTools from '../../components/RelatedTools'

const FAQS_CONTRASENAS = [
  {
    pregunta: '¿Es seguro generar contraseñas aquí?',
    respuesta: 'Sí, completamente. Todas las contraseñas se generan directamente en tu navegador usando JavaScript. Nunca se envían a ningún servidor ni se almacenan en ningún lugar. Nadie más puede ver tu contraseña.',
  },
  {
    pregunta: '¿Qué longitud debe tener una contraseña segura?',
    respuesta: 'Para cuentas importantes como email o banco, se recomienda mínimo 16 caracteres. Para redes sociales, 12 caracteres es suficiente. Cuanto más larga, más difícil de descifrar.',
  },
  {
    pregunta: '¿Debo usar símbolos en mis contraseñas?',
    respuesta: 'Sí, agregar símbolos (!@#$%) aumenta enormemente la seguridad. Una contraseña de 12 caracteres con símbolos es exponencialmente más segura que una de 16 caracteres solo con letras.',
  },
  {
    pregunta: '¿Cómo recuerdo contraseñas tan complejas?',
    respuesta: 'La solución es usar un gestor de contraseñas como Bitwarden (gratis) o 1Password. Solo necesitas recordar una contraseña maestra y el gestor guarda todas las demás de forma segura.',
  },
  {
    pregunta: '¿Con qué frecuencia debo cambiar mis contraseñas?',
    respuesta: 'Los expertos actuales recomiendan cambiar la contraseña solo si sospechas que fue comprometida, no regularmente. Lo más importante es tener contraseñas únicas para cada cuenta.',
  },
]

export default function GeneradorContrasenas() {
  const [longitud, setLongitud] = useState(16)
  const [mayusculas, setMayusculas] = useState(true)
  const [numeros, setNumeros] = useState(true)
  const [simbolos, setSimbolos] = useState(false)
  const [contrasena, setContrasena] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [mostrarContrasena, setMostrarContrasena] = useState(true)

  const generar = useCallback(() => {
    const nueva = generarContrasena({ longitud, mayusculas, numeros, simbolos })
    setContrasena(nueva)
    setCopiado(false)
  }, [longitud, mayusculas, numeros, simbolos])

  useEffect(() => {
    generar()
  }, [])

  const copiar = async () => {
    if (!contrasena) return
    const ok = await copiarAlPortapapeles(contrasena)
    if (ok) {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    }
  }

  const fuerza = contrasena ? evaluarFuerza(contrasena) : null

  const COLORES_FUERZA: Record<string, string> = {
    'Débil': 'text-red-400',
    'Media': 'text-yellow-400',
    'Fuerte': 'text-blue-400',
    'Muy fuerte': 'text-green-400',
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">🔒</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Generador de Contraseñas</h1>
          <p className="text-gray-400 text-lg">
            Crea contraseñas seguras y personalizadas. Todo se genera en tu navegador.
          </p>
        </div>

        {/* Ad Superior */}
        <AdBlock slot="4567890123" className="mb-8" />

        {/* Resultado */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex-1 bg-gray-900 rounded-xl p-4 font-mono text-lg text-white break-all min-h-[60px] flex items-center leading-relaxed"
              aria-live="polite"
              aria-label={`Contraseña generada: ${mostrarContrasena ? contrasena : '•'.repeat(contrasena.length)}`}
            >
              {contrasena
                ? mostrarContrasena
                  ? contrasena
                  : '•'.repeat(contrasena.length)
                : <span className="text-gray-500">Genera tu contraseña...</span>}
            </div>
            <button
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              className="p-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors flex-shrink-0"
              aria-label={mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {mostrarContrasena ? '👁️' : '🙈'}
            </button>
          </div>

          {/* Barra de fuerza */}
          {fuerza && (
            <div className="mb-4" aria-label={`Fuerza de la contraseña: ${fuerza.fuerza}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Fuerza:</span>
                <span className={`font-bold text-sm ${COLORES_FUERZA[fuerza.fuerza] || 'text-white'}`}>
                  {fuerza.fuerza}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5" role="progressbar" aria-valuenow={fuerza.porcentaje} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${fuerza.color}`}
                  style={{ width: `${fuerza.porcentaje}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={generar}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Generar nueva contraseña"
            >
              🔄 Generar nueva
            </button>
            <button
              onClick={copiar}
              disabled={!contrasena}
              className={`flex-1 font-bold py-3 px-6 rounded-xl border-2 transition-all duration-200 ${
                copiado
                  ? 'border-green-500 bg-green-600/20 text-green-400'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
              }`}
              aria-label="Copiar contraseña al portapapeles"
            >
              {copiado ? '✅ ¡Copiada!' : '📋 Copiar'}
            </button>
          </div>
        </div>

        {/* Opciones */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6 space-y-6">
          <h2 className="text-white font-bold text-lg">⚙️ Personalizar</h2>

          {/* Longitud */}
          <div>
            <div className="flex justify-between mb-3">
              <label htmlFor="longitud" className="text-gray-300 font-medium">
                Longitud
              </label>
              <span className="text-blue-400 font-bold text-xl">{longitud}</span>
            </div>
            <input
              id="longitud"
              type="range"
              min={8}
              max={32}
              value={longitud}
              onChange={(e) => setLongitud(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-600"
              aria-label={`Longitud de contraseña: ${longitud} caracteres`}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>8 (mínimo)</span>
              <span>32 (máximo)</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            {[
              { id: 'mayusculas', label: 'Mayúsculas', descripcion: 'ABC...Z', value: mayusculas, setter: setMayusculas },
              { id: 'numeros', label: 'Números', descripcion: '0-9', value: numeros, setter: setNumeros },
              { id: 'simbolos', label: 'Símbolos', descripcion: '!@#$%^&*', value: simbolos, setter: setSimbolos },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors group"
              >
                <div>
                  <span className="text-white font-medium">{opt.label}</span>
                  <span className="text-gray-500 text-sm ml-2 font-mono">{opt.descripcion}</span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id={opt.id}
                    checked={opt.value}
                    onChange={(e) => opt.setter(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${opt.value ? 'bg-blue-600' : 'bg-gray-600'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5 ${opt.value ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'}`} />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Tips de seguridad */}
        <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-xl p-5 text-sm text-emerald-300 mb-8">
          <h2 className="font-bold mb-2 text-emerald-200">🛡️ Consejos de seguridad</h2>
          <ul className="space-y-1 text-emerald-300/80">
            <li>• Usa contraseñas únicas para cada cuenta</li>
            <li>• Mínimo 12 caracteres para cuentas importantes</li>
            <li>• Usa un gestor de contraseñas (Bitwarden, 1Password)</li>
            <li>• Activa la autenticación en dos factores siempre que puedas</li>
          </ul>
        </div>

        {/* Contenido SEO */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-3">¿Por qué usar un generador de contraseñas seguras?</h2>
          <div className="text-gray-400 text-sm leading-relaxed space-y-3">
            <p>
              Una <strong className="text-gray-300">contraseña segura</strong> es la primera línea de defensa de tus cuentas online. Los ataques de diccionario y fuerza bruta pueden descifrar contraseñas cortas o predecibles en segundos. Este generador crea contraseñas aleatorias que son prácticamente imposibles de adivinar.
            </p>
            <p>
              La <strong className="text-gray-300">longitud es el factor más importante</strong>: cada carácter adicional multiplica exponencialmente las combinaciones posibles. Una contraseña de 16 caracteres con símbolos tiene más combinaciones que átomos en el universo observable. El rango va de 8 a 32 caracteres.
            </p>
            <p>
              <strong className="text-gray-300">100% privado</strong>: todas las contraseñas se generan localmente en tu navegador con JavaScript. Nunca viajan por internet, nunca se almacenan en ningún servidor. Ni siquiera nosotros podemos verlas. Lo recomendamos junto a un gestor de contraseñas como Bitwarden (gratis) o 1Password para guardarlas de forma segura.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <FaqSection faqs={FAQS_CONTRASENAS} titulo="Preguntas sobre Contraseñas Seguras" />

        {/* Internal links */}
        <RelatedTools current="/generadores/contrasenas" />

        {/* Ad Inferior */}
        <AdBlock slot="5678901234" />
      </div>
    </div>
  )
}
