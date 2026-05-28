import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | GeneradorRandom',
  description: 'Política de privacidad de GeneradorRandom.com. Información completa sobre el tratamiento de datos, cookies y derechos del usuario.',
  alternates: { canonical: 'https://generadorrandom.com/privacidad' },
  robots: { index: true, follow: true },
}

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidad</h1>
      <p className="text-slate-500 text-sm mb-10">Última actualización: 27 de mayo de 2026</p>

      <div className="space-y-10 text-slate-400 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos recopilados a través de este sitio web es el
            titular de <strong className="text-slate-300">GeneradorRandom.com</strong>, con domicilio en
            la República Argentina. Para consultas relacionadas con privacidad, podés escribirnos a{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Qué datos recopilamos y para qué</h2>
          <p className="mb-4">
            GeneradorRandom.com no requiere registro ni cuenta de usuario. Toda la generación de
            contenido (contraseñas, nombres, colores, etc.) ocurre directamente en tu navegador y
            nunca se envía a nuestros servidores.
          </p>
          <p className="mb-3">Los únicos datos recopilados son:</p>
          <ul className="space-y-3 list-disc list-inside">
            <li>
              <strong className="text-slate-300">Datos de uso anónimos</strong> — a través de Google Analytics 4:
              páginas visitadas, tiempo en el sitio, país de origen, tipo de dispositivo. Estos datos son
              agregados y no permiten identificar a usuarios individuales.
            </li>
            <li>
              <strong className="text-slate-300">Datos para publicidad</strong> — a través de Google AdSense:
              cookies publicitarias usadas por Google y sus socios para mostrar anuncios relevantes.
            </li>
          </ul>
          <p className="mt-4">
            <strong className="text-slate-300">Datos que NO recopilamos:</strong> nombre, email, contraseñas generadas,
            colores guardados, historial de generaciones ni ningún dato personal identificable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Base legal del tratamiento</h2>
          <ul className="space-y-3 list-disc list-inside">
            <li>
              <strong className="text-slate-300">Google Analytics:</strong> interés legítimo (art. 6.1.f del RGPD)
              en el análisis del tráfico para mejorar el sitio. Los datos son anonimizados y no permiten
              identificación individual.
            </li>
            <li>
              <strong className="text-slate-300">Google AdSense y cookies publicitarias:</strong> consentimiento
              del usuario (art. 6.1.a del RGPD), otorgado mediante el banner de cookies al ingresar al sitio.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Cookies</h2>
          <p className="mb-4">Este sitio utiliza los siguientes tipos de cookies:</p>

          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="text-slate-300 font-semibold mb-2">Cookies técnicas (esenciales)</h3>
              <p className="text-sm">
                Almacenamiento local del navegador para guardar tu preferencia de consentimiento de cookies.
                No recopilan datos personales. Son necesarias para el funcionamiento básico del sitio.
                <strong className="text-slate-300"> No pueden desactivarse.</strong>
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="text-slate-300 font-semibold mb-2">Cookies analíticas</h3>
              <p className="text-sm">
                <strong className="text-slate-300">Google Analytics 4</strong> — recopilan información anónima
                sobre cómo los usuarios interactúan con el sitio. Datos: páginas visitadas, duración de la sesión,
                país de origen, tipo de dispositivo y navegador. No identifican usuarios individuales.
                Retención: 14 meses.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="text-slate-300 font-semibold mb-2">Cookies publicitarias</h3>
              <p className="text-sm">
                <strong className="text-slate-300">Google AdSense</strong> — Google y sus socios publicitarios
                usan cookies para mostrar anuncios relevantes según tus intereses y visitas anteriores a otros
                sitios web. Para más información sobre cómo Google usa estos datos, visitá{' '}
                <a href="https://policies.google.com/technologies/partner-sites" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  políticas de Google para socios
                </a>.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm">
            Podés gestionar o rechazar las cookies publicitarias en{' '}
            <a href="https://www.google.com/settings/ads" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Configuración de anuncios de Google
            </a>{' '}
            o instalando la extensión{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Transferencia internacional de datos</h2>
          <p>
            Los servicios de terceros que utilizamos (Google Analytics y Google AdSense) transfieren datos
            a servidores ubicados en Estados Unidos y otros países fuera de la Argentina y la Unión Europea.
            Google aplica las cláusulas contractuales estándar aprobadas por la Comisión Europea como
            garantía de protección de datos en estas transferencias. Para más información, consultá la{' '}
            <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Política de Privacidad de Google
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Tiempo de retención de datos</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Datos de Google Analytics: 14 meses desde la última interacción.</li>
            <li>Cookies de preferencias (consentimiento): hasta que el usuario las elimine.</li>
            <li>Datos de AdSense: según la política de retención de Google (hasta 18 meses).</li>
            <li>Datos personales enviados por email: conservados mientras sea necesario para responder tu consulta.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Tus derechos</h2>
          <p className="mb-4">
            De acuerdo con el Reglamento General de Protección de Datos (RGPD) y la Ley 25.326 de
            Protección de Datos Personales de Argentina, tenés los siguientes derechos:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-slate-300">Acceso:</strong> conocer qué datos tenemos sobre vos.</li>
            <li><strong className="text-slate-300">Rectificación:</strong> corregir datos inexactos.</li>
            <li><strong className="text-slate-300">Supresión:</strong> solicitar el borrado de tus datos.</li>
            <li><strong className="text-slate-300">Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
            <li><strong className="text-slate-300">Oposición:</strong> oponerte al tratamiento de tus datos.</li>
            <li><strong className="text-slate-300">Limitación:</strong> solicitar que restrinjamos el uso de tus datos.</li>
            <li><strong className="text-slate-300">Retirar el consentimiento:</strong> en cualquier momento, sin que afecte la licitud del tratamiento anterior.</li>
          </ul>
          <p className="mt-4 text-sm">
            Como no recopilamos datos personales identificables, podés eliminar toda información local
            borrando las cookies y el almacenamiento local de tu navegador. Para ejercer cualquiera de
            estos derechos, contactanos en{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Menores de edad</h2>
          <p>
            GeneradorRandom.com no está dirigido a menores de 13 años. No recopilamos conscientemente
            datos de niños menores de 13 años. Si sos padre o tutor y creés que tu hijo nos proporcionó
            información personal, contactanos para eliminarla.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política periódicamente. Los cambios se publicarán en esta misma página
            con la fecha de última actualización. Te recomendamos revisarla con regularidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Contacto</h2>
          <p>
            Para cualquier consulta sobre privacidad, escribinos a{' '}
            <a href="mailto:generador.random@gmail.com" className="text-blue-400 hover:underline">
              generador.random@gmail.com
            </a>. Respondemos en menos de 48 horas hábiles.
          </p>
        </section>

      </div>
    </div>
  )
}
