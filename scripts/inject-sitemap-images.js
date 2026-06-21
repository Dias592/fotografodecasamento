const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://ivandiasfotografo.com.br';
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const BLOG_DIR = path.join(__dirname, '..', '.next', 'server', 'app', 'blog');

if (!fs.existsSync(SITEMAP_PATH)) {
  console.log('sitemap.xml not found, skipping');
  process.exit(0);
}

if (!fs.existsSync(BLOG_DIR)) {
  console.log('.next/server/app/blog not found, skipping');
  process.exit(0);
}

const htmlFiles = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.html') && f !== '[slug].html');

const imageMap = {};
for (const file of htmlFiles) {
  const slug = file.replace('.html', '');
  const html = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const match = html.match(/src="(\/images\/[^"]+\.webp)"/);
  if (match) {
    imageMap[slug] = match[1];
  }
}

let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
let injected = 0;

for (const [slug, imgPath] of Object.entries(imageMap)) {
  const locTag = `<loc>${SITE_URL}/blog/${slug}/</loc>`;
  if (sitemap.includes(locTag)) {
    const imageTag = `<image:image><image:loc>${SITE_URL}${imgPath}</image:loc></image:image>`;
    sitemap = sitemap.replace(locTag, `${locTag}${imageTag}`);
    injected++;
  }
}

fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
console.log(`Sitemap images: ${injected}/${htmlFiles.length} blog pages`);
