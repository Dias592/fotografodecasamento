/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const repo = 'fotografodecasamento';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  compress: true,
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // Reduzir JS legado — apenas browsers modernos
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  webpack: (config, { dev }) => {
    config.resolve.symlinks = false;
    // Tree-shaking mais agressivo em produção
    if (!dev) {
      config.optimization.usedExports = true;
    }
    return config;
  },
};

module.exports = nextConfig;
