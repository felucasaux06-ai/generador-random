import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://generadorrandom.com'
  const may = new Date('2026-05-27')
  const jun = new Date('2026-06-07')
  return [
    { url: base, lastModified: jun, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/generadores/nombres`, lastModified: may, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/contrasenas`, lastModified: may, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/colores`, lastModified: may, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/historias`, lastModified: may, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/generadores/chistes`, lastModified: may, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/generadores/chistes-argentinos`, lastModified: may, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/ruleta`, lastModified: may, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/numeros`, lastModified: may, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/generadores/moneda`, lastModified: jun, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: jun, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog/para-que-sirve-un-generador-de-numeros-aleatorios`, lastModified: may, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/10-usos-creativos-generadores-aleatorios`, lastModified: may, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/como-funciona-la-generacion-aleatoria`, lastModified: may, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/guia-generadores-aleatorios-online-2026`, lastModified: may, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/como-hacer-un-sorteo-aleatorio-justo-online`, lastModified: may, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/como-crear-contrasenas-seguras`, lastModified: may, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/paralisis-por-analisis-como-tomar-decisiones`, lastModified: may, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/noche-de-juegos-en-casa-con-amigos`, lastModified: may, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/nombres-para-mascotas-y-perros`, lastModified: jun, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/como-elegir-destino-de-viaje`, lastModified: jun, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/acerca`, lastModified: may, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/contacto`, lastModified: may, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/disclaimer`, lastModified: may, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacidad`, lastModified: may, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terminos`, lastModified: may, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
