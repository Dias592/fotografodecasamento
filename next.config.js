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
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  webpack: (config, { dev }) => {
    config.resolve.symlinks = false;
    if (!dev) {
      config.optimization.usedExports = true;
    }
    return config;
  },
};

module.exports = nextConfig;
