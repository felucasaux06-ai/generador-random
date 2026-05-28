import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ARTICLES, getArticle, getRelatedArticles } from '../../lib/articles'
import AdBlock from '../../components/AdBlock'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `https://generadorrandom.com/blog/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.description,
      url: `https://generadorrandom.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      siteName: 'GeneradorRandom',
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.description,
    },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  'Guías': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  'Ideas': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  'Tecnología': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30',
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const related = getRelatedArticles(params.slug, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    image: article.image,
    author: { '@type': 'Organization', name: 'GeneradorRandom', url: 'https://generadorrandom.com' },
    publisher: { '@type': 'Organization', name: 'GeneradorRandom', url: 'https://generadorrandom.com' },
    url: `https://generadorrandom.com/blog/${article.slug}`,
    inLanguage: 'es',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-400 truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[article.category] || 'bg-gray-700/50 text-gray-400 border-gray-600'}`}>
                {article.category}
              </span>
              <span className="text-gray-600 text-sm">{article.readTime} min de lectura</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              {article.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-700">
              <span>Por <strong className="text-gray-400">GeneradorRandom</strong></span>
              <span>·</span>
              <time dateTime={article.date}>{article.dateFormatted}</time>
            </div>
          </header>

          {/* Hero image */}
          <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-2xl mb-8">
            <img
              src={article.image}
              alt={article.imageAlt}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>

          <AdBlock slot="3344556677" className="mb-8" />

          {/* Article content */}
          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <AdBlock slot="4455667788" className="mt-10 mb-8" />

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-4">
              <h2 className="text-white font-bold text-xl mb-6">Seguí leyendo</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map(rel => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-600/50 transition-all duration-200"
                  >
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[rel.category] || 'bg-gray-700/50 text-gray-400 border-gray-600'} mb-2 inline-block`}>
                      {rel.category}
                    </span>
                    <h3 className="text-white text-sm font-semibold leading-snug group-hover:text-blue-400 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{rel.readTime} min</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to blog */}
          <div className="mt-10 pt-8 border-t border-gray-700">
            <Link href="/blog" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              ← Volver al blog
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
