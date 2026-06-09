/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ivandiasfotografo.com.br',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    let priority = 0.6;
    let changefreq = 'monthly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'monthly';
    } else if (path === '/portfolio/') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/servicos/') {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path === '/contato/') {
      priority = 0.8;
      changefreq = 'yearly';
    } else if (path === '/sobre/') {
      priority = 0.7;
      changefreq = 'yearly';
    } else if (path === '/blog/') {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path.startsWith('/servicos/')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.startsWith('/blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
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
