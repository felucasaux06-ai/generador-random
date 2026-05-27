# 🎲 GeneradorRandom — Multi-herramienta de Generadores Online

Suite gratuita de 5 generadores: nombres, contraseñas, colores, historias y chistes.
Construida con Next.js 14, React 18 y Tailwind CSS. Lista para deploy en Vercel con Google AdSense y GA4.

## Herramientas incluidas

| Herramienta | Descripción |
|---|---|
| 👤 Nombres | Personas, apellidos, empresas, mascotas (400+ items) |
| 🔒 Contraseñas | Longitud y complejidad personalizables con indicador de fuerza |
| 🎨 Colores | Paletas de 5 colores con HEX/RGB y guardado en localStorage |
| 📖 Historias | Templates narrativos en 4 géneros con lectura por voz |
| 😂 Chistes | 30+ chistes con votación y compartir en redes |

## Inicio rápido

```bash
cd generador-random
npm install
cp .env.local.example .env.local
# Edita .env.local con tus IDs de GA4 y AdSense
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Variables de entorno

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXXX
```

## Deploy en Vercel

1. Sube el proyecto a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Añade las variables de entorno en Vercel Dashboard
4. Deploy automático en cada push

## Monetización con AdSense

1. Solicita acceso en [adsense.google.com](https://adsense.google.com)
2. Añade `ca-pub-XXXXX` a `.env.local`
3. Obtén slots de anuncio y actualiza los props `slot` en cada página
4. Los bloques de anuncios ya están posicionados (superior, lateral, inferior)

## Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + Tailwind CSS 3
- **Lenguaje**: TypeScript
- **Hosting**: Vercel
- **Analytics**: Google Analytics 4
- **Monetización**: Google AdSense

## SEO incluido

- Metadata completa (title, description, OpenGraph, Twitter Cards)
- Schema JSON-LD (WebSite)
- `sitemap.xml` estático
- `robots.txt`
- Rutas semánticas en español

## Estructura

```
app/
├── layout.tsx          ← Root layout con GA4 + AdSense
├── page.tsx            ← Home con grid de herramientas
├── globals.css
├── generadores/
│   ├── nombres/        ← Generador de nombres
│   ├── contrasenas/    ← Generador de contraseñas
│   ├── colores/        ← Generador de paletas
│   ├── historias/      ← Generador de historias
│   └── chistes/        ← Generador de chistes
├── components/
│   ├── AdBlock.tsx     ← Componente de anuncios reutilizable
│   ├── Navigation.tsx  ← Nav responsiva con mobile menu
│   └── Footer.tsx
└── lib/
    ├── data.ts         ← Todos los datos (400+ items)
    └── utils.ts        ← Funciones de utilidad
```
