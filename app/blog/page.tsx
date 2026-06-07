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
  'Guías': 'bg-[#E8531E]/15 text-[#E8531E] border-[#E8531E]/30',
  'Ideas': 'bg-amber-600/15 text-amber-400 border-amber-600/30',
  'Tecnología': 'bg-emerald-600/15 text-emerald-400 border-emerald-600/30',
  'Psicología': 'bg-violet-600/15 text-violet-400 border-violet-600/30',
  'Entretenimiento': 'bg-sky-600/15 text-sky-400 border-sky-600/30',
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
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#E8531E]/40 transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={`${article.image}&w=600&h=300`}
                  alt={article.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${CATEGORY_COLORS[article.category] || 'bg-gray-700/50 text-gray-400 border-gray-600'}`}>
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-[#E8531E] transition-colors">
                  {article.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <time dateTime={article.date}>{article.dateFormatted}</time>
                    <span>·</span>
                    <span>{article.readTime} min</span>
                  </div>
                  <span className="text-[#E8531E] text-sm font-medium group-hover:underline">
                    Leer →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 border-t border-zinc-800 pt-10 text-center">
          <h2 className="text-white font-bold text-lg mb-2">¿Querés probar las herramientas?</h2>
          <p className="text-zinc-500 text-sm mb-6">
            Todos los generadores son gratuitos, sin registro y funcionan directamente en tu navegador.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#E8531E] hover:bg-[#D4481A] text-white font-bold px-6 py-3 transition-all duration-200 hover:scale-105 uppercase tracking-widest text-xs"
          >
            Ver todas las herramientas
          </Link>
        </div>

        <AdBlock slot="2233445566" className="mt-10" />
      </div>
    </div>
  )
}
