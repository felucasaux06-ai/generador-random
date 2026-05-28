import Link from 'next/link'
import type { Metadata } from 'next'
import { ARTICLES } from '../lib/articles'
import AdBlock from '../components/AdBlock'

export const metadata: Metadata = {
  title: 'Blog — Guías sobre generadores aleatorios | GeneradorRandom',
  description: 'Artículos, guías y consejos sobre generadores aleatorios online. Aprendé para qué sirven, cómo funcionan y cómo sacarles el máximo provecho.',
  keywords: ['blog generadores aleatorios', 'guías generador random', 'artículos herramientas aleatorias', 'aprender generadores online'],
  alternates: { canonical: 'https://generadorrandom.com/blog' },
  openGraph: {
    title: 'Blog — Guías sobre generadores aleatorios',
    description: 'Artículos y guías sobre generadores aleatorios online. Gratis, en español.',
    url: 'https://generadorrandom.com/blog',
    type: 'website',
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  'Guías': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  'Ideas': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  'Tecnología': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30',
}

export default function BlogPage() {
  const sortedArticles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4" aria-hidden="true">📝</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Blog</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Guías, consejos y curiosidades sobre generadores aleatorios. Todo en español, todo gratuito.
          </p>
        </div>

        <AdBlock slot="1122334455" className="mb-10" />

        {/* Articles grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {sortedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-blue-600/50 hover:bg-gray-800/80 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[article.category] || 'bg-gray-700/50 text-gray-400 border-gray-600'}`}>
                  {article.category}
                </span>
                <span className="text-gray-600 text-xs">{article.readTime} min de lectura</span>
              </div>

              <h2 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {article.description}
              </p>

              <div className="flex items-center justify-between">
                <time className="text-gray-600 text-xs" dateTime={article.date}>
                  {article.dateFormatted}
                </time>
                <span className="text-blue-400 text-sm font-medium group-hover:underline">
                  Leer artículo →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-blue-600/10 border border-blue-600/30 rounded-2xl p-6 text-center">
          <h2 className="text-white font-bold text-lg mb-2">¿Querés probar las herramientas?</h2>
          <p className="text-gray-400 text-sm mb-4">
            Todos los generadores son gratuitos, sin registro y funcionan directamente en tu navegador.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            Ver todas las herramientas
          </Link>
        </div>

        <AdBlock slot="2233445566" className="mt-10" />
      </div>
    </div>
  )
}
