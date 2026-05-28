import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad | GeneradorRandom',
  description: 'Política de privacidad de GeneradorRandom.com. Información completa sobre el tratamiento de datos, cookies, derechos GDPR y transferencia internacional de datos.',
  alternates: { canonical: 'https://generadorrandom.com/privacidad' },
  robots: { index: true, follow: true },
}

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidad</h1>
      <p className="text-slate-500 text-sm mb-10">Última actualización: 28 de mayo de 2026</p>

      <div className="space-y-10 text-slate-400 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Responsable del tratamiento</h2>
          <p>
            GeneradorRandom.com es operado de forma personal desde Argentina. Para cualquier consulta
            relacionada con esta política, podés escribirnos a{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Información general</h2>
          <p>
            GeneradorRandom.com es un sitio web de herramientas gratuitas online. No requerimos
            registro ni cuenta de usuario. Esta política explica qué datos se recopilan, cómo se
            usan y cuáles son tus derechos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Datos que NO recopilamos</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Nombres ni datos personales identificables</li>
            <li>Contraseñas generadas (se crean en tu navegador, nunca llegan a nuestros servidores)</li>
            <li>Colores favoritos guardados (se almacenan solo en tu navegador local)</li>
            <li>Direcciones de correo electrónico (salvo que las envíes voluntariamente por el formulario de contacto)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Datos que recopilamos automáticamente</h2>
          <p className="mb-3">
            A través de servicios de terceros (Google Analytics, Google AdSense) se recopilan datos técnicos como:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Dirección IP (anonimizada)</li>
            <li>Tipo de navegador y dispositivo</li>
            <li>Páginas visitadas y tiempo en el sitio</li>
            <li>País de origen</li>
            <li>Fuente de tráfico (cómo llegaste al sitio)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Base legal para el tratamiento</h2>
          <p className="mb-3">El tratamiento de tus datos se basa en:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-slate-300">Tu consentimiento</strong>, otorgado al aceptar el banner de cookies</li>
            <li><strong className="text-slate-300">Interés legítimo</strong> para mejorar el sitio y mostrar publicidad</li>
          </ul>
          <p className="mt-4">
            Podés retirar tu consentimiento en cualquier momento desde el banner de cookies o desde
            la configuración de tu navegador.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Google Analytics</h2>
          <p>
            Usamos Google Analytics 4 para entender cómo los usuarios utilizan el sitio. Esta
            información es anónima y agregada. Podés optar por no ser rastreado instalando la{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              extensión oficial de Google
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Google AdSense y publicidad</h2>
          <p className="mb-3">
            Este sitio muestra anuncios de Google AdSense. Google y sus socios publicitarios pueden
            usar cookies para mostrar anuncios relevantes basados en tus visitas anteriores a este
            y otros sitios web.
          </p>
          <p className="mb-3">
            Podés desactivar la publicidad personalizada en{' '}
            <a href="https://www.google.com/settings/ads" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Configuración de anuncios de Google
            </a>.
          </p>
          <p>
            Para más información sobre cómo Google usa los datos:{' '}
            <a href="https://policies.google.com/technologies/partner-sites" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Política de Google para socios
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
          <p className="mb-4">Este sitio usa tres tipos de cookies:</p>

          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="text-slate-300 font-semibold mb-2">Técnicas (propias)</h3>
              <p className="text-sm">
                Necesarias para el funcionamiento del sitio: almacenamiento local de colores favoritos
                y preferencias de cookies. No recopilan datos personales y no pueden desactivarse.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="text-slate-300 font-semibold mb-2">Analíticas (Google Analytics)</h3>
              <p className="text-sm">
                Miden el tráfico y comportamiento de los usuarios de manera anónima para mejorar
                el sitio. No identifican usuarios individuales.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="text-slate-300 font-semibold mb-2">Publicitarias (Google AdSense)</h3>
              <p className="text-sm">
                Permiten mostrar anuncios relevantes según los intereses del usuario y visitas
                anteriores a otros sitios web.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm">
            Podés aceptar o rechazar las cookies no esenciales desde el banner de consentimiento
            al ingresar al sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Transferencia internacional de datos</h2>
          <p>
            Los datos recopilados por Google (Analytics y AdSense) pueden ser transferidos y
            procesados en servidores ubicados fuera de tu país, incluyendo Estados Unidos. Google
            cumple con los marcos de protección de datos aplicables, incluyendo las cláusulas
            contractuales estándar aprobadas por la Comisión Europea.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Tiempo de retención</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-slate-300">Datos de Google Analytics:</strong> 14 meses (configuración estándar)</li>
            <li><strong className="text-slate-300">Datos del formulario de contacto:</strong> solo el tiempo necesario para responder tu consulta</li>
            <li><strong className="text-slate-300">Cookies del navegador:</strong> según la duración configurada por cada servicio (consultá las políticas de Google)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">11. Tus derechos</h2>
          <p className="mb-3">Tenés derecho a:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Acceder a tus datos personales</li>
            <li>Rectificarlos si son inexactos</li>
            <li>Solicitar su eliminación</li>
            <li>Oponerte a su tratamiento</li>
            <li>Solicitar la portabilidad de tus datos</li>
            <li>Retirar tu consentimiento en cualquier momento</li>
          </ul>
          <p className="mt-4">
            Para ejercer estos derechos, escribinos a{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">12. Menores de edad</h2>
          <p>
            GeneradorRandom.com no está dirigido a menores de 13 años. No recopilamos
            conscientemente datos de menores. Si sos padre, madre o tutor y creés que tu hijo
            nos ha proporcionado información personal, contactanos para eliminarla.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">13. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política periódicamente. Los cambios se publicarán en esta
            página con la fecha de última actualización. Te recomendamos revisarla cada cierto tiempo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">14. Contacto</h2>
          <p>
            Si tenés preguntas sobre esta política, escribinos a{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>{' '}
            o desde la{' '}
            <Link href="/contacto" className="text-blue-400 hover:underline">
              página de contacto
            </Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
