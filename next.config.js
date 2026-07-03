/** @type {import('next').NextConfig} */
const nextConfig = {
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
      // Blog duplicates — redirect old/duplicate slugs to canonical
      {
        source: '/blog/fotografo-casamento-itaim-bibi-sp/:path*',
        destination: '/blog/fotografo-de-casamento-itaim-bibi/',
        permanent: true,
      },
      {
        source: '/blog/fotografo-casamento-moema-sp/:path*',
        destination: '/blog/fotografo-de-casamento-moema/',
        permanent: true,
      },
      {
        source: '/blog/fotografo-casamento-pinheiros-sp/:path*',
        destination: '/blog/fotografo-de-casamento-pinheiros/',
        permanent: true,
      },
      {
        source: '/blog/fotografo-casamento-vila-mariana-sp/:path*',
        destination: '/blog/fotografo-de-casamento-vila-mariana/',
        permanent: true,
      },
      {
        source: '/blog/fotografo-casamento-drone-sp/:path*',
        destination: '/blog/fotografo-casamento-drone-incluso/',
        permanent: true,
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
