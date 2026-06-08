/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ivandiasfotografo.com.br',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
