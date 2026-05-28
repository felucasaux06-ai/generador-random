import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Descargo de Responsabilidad | GeneradorRandom',
  description: 'Descargo de responsabilidad de GeneradorRandom.com sobre el uso de contraseñas generadas, sorteos, contenido algorítmico y resultados aleatorios.',
  alternates: { canonical: 'https://generadorrandom.com/disclaimer' },
  robots: { index: true, follow: true },
}

export default function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Descargo de Responsabilidad</h1>
      <p className="text-slate-500 text-sm mb-10">Última actualización: 27 de mayo de 2026</p>

      <div className="space-y-10 text-slate-400 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Uso del sitio bajo tu responsabilidad</h2>
          <p>
            GeneradorRandom.com proporciona herramientas de generación aleatoria con fines educativos,
            creativos y de entretenimiento. El uso de los resultados obtenidos es responsabilidad
            exclusiva del usuario. El sitio se provee <strong className="text-slate-300">"tal cual"</strong>,
            sin garantías expresas ni implícitas de ningún tipo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Contraseñas generadas</h2>
          <p className="mb-3">
            El generador de contraseñas produce combinaciones aleatorias de caracteres usando
            algoritmos pseudoaleatorios del navegador (JavaScript). Aunque los resultados son
            estadísticamente impredecibles para uso práctico, debés tener en cuenta:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>No garantizamos que una contraseña generada sea adecuada para todos los niveles de seguridad.</li>
            <li>Para aplicaciones de seguridad crítica (criptografía, acceso a sistemas sensibles), consultá con un profesional de seguridad informática.</li>
            <li>Las contraseñas se generan localmente en tu navegador y nunca son enviadas a nuestros servidores. Sin embargo, la seguridad de tu dispositivo y red es tu responsabilidad.</li>
            <li>Recomendamos usar un gestor de contraseñas para almacenarlas de forma segura.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Sorteos y resultados aleatorios</h2>
          <p className="mb-3">
            Las herramientas de números aleatorios, ruleta y cara o cruz producen resultados
            pseudoaleatorios generados por <code className="bg-slate-800 text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono">Math.random()</code> de JavaScript.
            Estos resultados son:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Estadísticamente uniformes e imparciales para uso práctico (sorteos domésticos, juegos, decisiones).</li>
            <li><strong className="text-slate-300">No certificados</strong> para loterías reguladas por ley, apuestas con dinero real ni cualquier proceso que requiera aleatoriedad criptográfica certificada.</li>
            <li>No auditables por terceros independientes.</li>
          </ul>
          <p className="mt-4">
            Si organizás un sorteo con implicancias legales o económicas significativas, consultá la
            normativa vigente en tu jurisdicción y utilizá sistemas certificados por organismos competentes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Contenido generado algorítmicamente</h2>
          <p className="mb-3">
            Las herramientas de historias, chistes, nombres y otras combinaciones creativas producen
            contenido de forma automática a partir de bases de datos predefinidas. Respecto a este contenido:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Puede resultar inapropiado, irrelevante o fuera de contexto en situaciones específicas.</li>
            <li>No refleja las opiniones, valores ni posiciones de GeneradorRandom.com.</li>
            <li>Está destinado exclusivamente al entretenimiento y la creatividad.</li>
            <li>No debe usarse como base para decisiones médicas, legales, financieras ni de otra índole profesional.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Disponibilidad y exactitud</h2>
          <p>
            No garantizamos la disponibilidad continua, ininterrumpida ni libre de errores del sitio o
            sus herramientas. GeneradorRandom.com puede estar temporalmente fuera de servicio por
            mantenimiento, actualizaciones o causas ajenas a nuestra voluntad. No seremos responsables
            por daños derivados de la no disponibilidad del servicio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Links a sitios externos</h2>
          <p>
            Este sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el
            contenido ni las políticas de esos sitios y no nos hacemos responsables de ellos. La
            inclusión de un enlace no implica respaldo ni aprobación del sitio vinculado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Contacto</h2>
          <p>
            Si tenés preguntas sobre este descargo de responsabilidad, podés contactarnos en{' '}
            <a href="mailto:hola@generadorrandom.com" className="text-blue-400 hover:underline">
              hola@generadorrandom.com
            </a>{' '}
            o visitar nuestra{' '}
            <Link href="/contacto" className="text-blue-400 hover:underline">
              página de contacto
            </Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
