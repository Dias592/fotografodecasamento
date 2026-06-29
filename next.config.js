/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ivandiasfotografo.com.br' }],
        destination: 'https://ivandiasfotografo.com.br/:path*',
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
