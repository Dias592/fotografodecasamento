/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
