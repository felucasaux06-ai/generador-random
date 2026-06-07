/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/generadores/moneda',
        destination: '/generadores/cara-o-cruz',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
