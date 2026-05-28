import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://generadorrandom.com'
  const now = new Date('2026-05-27')
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/generadores/nombres`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/contrasenas`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/colores`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/historias`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/generadores/chistes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/generadores/chistes-argentinos`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/ruleta`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/numeros`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/moneda`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/acerca`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terminos`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
