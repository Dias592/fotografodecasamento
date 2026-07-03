/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ivandiasfotografo.com.br',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
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
      { userAgent: '*', allow: '/', disallow: ['/_next/static/', '/_next/image/'] },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'WhatsApp', allow: '/' },
    ],
  },
};
