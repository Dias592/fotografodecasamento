/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/images/logo/ivan-dias-favicon.webp' },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ivandiasfotografo.com.br' }],
        destination: 'https://ivandiasfotografo.com.br/:path*',
        permanent: true,
      },
      // Grupo 1 — páginas do site antigo (/:path* cobre com e sem trailing slash)
      { source: '/ivan-dias-fotografo-de-casamento-orcamento/:path*', destination: '/contato/', permanent: true, statusCode: 301 },
      { source: '/ivan-dias-fotografo-de-casamento-sobre/:path*', destination: '/sobre/', permanent: true, statusCode: 301 },
      { source: '/fotografo-de-casamento-em-sao-paulo-ivan-dias/:path*', destination: '/', permanent: true, statusCode: 301 },
      { source: '/politica-de-privacidade/:path*', destination: '/', permanent: true, statusCode: 301 },
      { source: '/termos-de-uso/:path*', destination: '/', permanent: true, statusCode: 301 },
      // Grupo 2 — slugs com hash hexadecimal (fonte externa)
      { source: '/blog/:slug*-:hash([a-f0-9]{13,})', destination: '/blog/', permanent: true, statusCode: 301 },
      // Grupo 3 — rotas fantasma do Next.js
      { source: '/blog/post/:path*', destination: '/blog/', permanent: true, statusCode: 301 },
      { source: '/blog/blog/:path*', destination: '/blog/', permanent: true, statusCode: 301 },
      { source: '/blog/author/:path*', destination: '/sobre/', permanent: true, statusCode: 301 },
      { source: '/blog/feed-news/:path*', destination: '/blog/', permanent: true, statusCode: 301 },
      // Grupo 4 — novas URLs com 404
      { source: '/ivan-dias-fotografo-de-casamento-checklist-da-noiva/:path*', destination: '/blog/quando-contratar-fotografo-casamento/', permanent: true, statusCode: 301 },
      { source: '/contact/:path*', destination: '/contato/', permanent: true, statusCode: 301 },
      { source: '/pacotes/:path*', destination: '/servicos/', permanent: true, statusCode: 301 },
      // Blog duplicates — redirect old/duplicate slugs to canonical
      {
        source: '/blog/fotografo-casamento-itaim-bibi-sp/:path*',
        destination: '/blog/fotografo-de-casamento-itaim-bibi/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/blog/fotografo-casamento-moema-sp/:path*',
        destination: '/blog/fotografo-de-casamento-moema/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/blog/fotografo-casamento-pinheiros-sp/:path*',
        destination: '/blog/fotografo-de-casamento-pinheiros/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/blog/fotografo-casamento-vila-mariana-sp/:path*',
        destination: '/blog/fotografo-de-casamento-vila-mariana/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/blog/fotografo-casamento-drone-sp/:path*',
        destination: '/blog/fotografo-casamento-drone-incluso/',
        permanent: true,
        statusCode: 301,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization.usedExports = true;
    }
    return config;
  },
};

module.exports = nextConfig;
