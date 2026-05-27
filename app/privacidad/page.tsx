import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de GeneradorRandom.com. Información sobre el uso de datos, cookies y publicidad.',
  alternates: { canonical: 'https://generadorrandom.com/privacidad' },
}

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidad</h1>
      <p className="text-slate-500 text-sm mb-10">Última actualización: mayo 2026</p>

      <div className="space-y-10 text-slate-400 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Información general</h2>
          <p>
            GeneradorRandom.com es un sitio web de herramientas gratuitas online. No requerimos
            registro ni cuenta de usuario. Esta política explica qué datos se recopilan y cómo se usan.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Datos que NO recopilamos</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Nombres ni datos personales</li>
            <li>Contraseñas generadas (se crean en tu navegador, nunca llegan a nuestros servidores)</li>
            <li>Colores favoritos guardados (se almacenan solo en tu navegador local)</li>
            <li>Dirección de correo electrónico</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Google Analytics</h2>
          <p>
            Usamos Google Analytics 4 para entender cómo los usuarios utilizan el sitio (páginas visitadas,
            tiempo en el sitio, país de origen). Esta información es anónima y agregada. No permite
            identificar a usuarios individuales.
          </p>
          <p className="mt-3">
            Puedes optar por no ser rastreado instalando la extensión{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Google AdSense</h2>
          <p>
            Mostramos anuncios de Google AdSense. Google puede usar cookies para mostrar anuncios
            relevantes basados en tus visitas anteriores a este y otros sitios web. Puedes desactivar
            la publicidad personalizada en{' '}
            <a href="https://www.google.com/settings/ads" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Configuración de anuncios de Google
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Cookies</h2>
          <p>
            Este sitio usa cookies técnicas propias (almacenamiento local del navegador para guardar
            colores favoritos) y cookies de terceros de Google Analytics y Google AdSense.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Tus derechos</h2>
          <p>
            Tienes derecho a acceder, rectificar y eliminar cualquier dato personal. Como no recopilamos
            datos personales identificables, puedes limpiar las cookies y el almacenamiento local de tu
            navegador en cualquier momento para eliminar toda información local.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política, escríbenos a{' '}
            <a href="mailto:privacidad@generadorrandom.com" className="text-blue-400 hover:underline">
              privacidad@generadorrandom.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
