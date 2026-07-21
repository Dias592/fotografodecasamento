/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ivandiasfotografo.com.br',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    // Slugs antigos redirecionados — excluídos explicitamente do sitemap
    '/blog/fotografo-casamento-itaim-bibi-sp/',
    '/blog/fotografo-casamento-moema-sp/',
    '/blog/fotografo-casamento-pinheiros-sp/',
    '/blog/fotografo-casamento-vila-mariana-sp/',
    '/blog/fotografo-casamento-drone-sp/',
  ],
  transform: async (config, path) => {
    const p = path.replace(/\/+$/, '') || '/';
    let priority = 0.6;
    let changefreq = 'monthly';

    if (p === '/') {
      priority = 1.0;
      changefreq = 'monthly';
    } else if (p === '/portfolio') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (p === '/servicos') {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (p === '/contato') {
      priority = 0.8;
      changefreq = 'yearly';
    } else if (p === '/sobre') {
      priority = 0.7;
      changefreq = 'yearly';
    } else if (p === '/blog') {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (p.startsWith('/servicos/')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (p.startsWith('/blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: path.startsWith('/blog/') && path !== '/blog/'
        ? undefined
        : new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Googlebot-Extended', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'WhatsApp', allow: '/' },
      { userAgent: '*', allow: '/', disallow: ['/_next/static/', '/_next/image/'] },
    ],
  },
};
