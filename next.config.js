/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/generadores/cara-o-cruz',
        destination: '/generadores/moneda',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
