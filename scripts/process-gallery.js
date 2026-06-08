const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_ROOT = 'D:\\SITE FOTO\\fotos dia';
const OUT_ROOT = path.join(__dirname, '..', 'public', 'images', 'galeria');

// folder -> { slug, label, altBase }
const CATEGORIES = [
  { folder: 'CERIMÔNIA', slug: 'cerimonia', label: 'Cerimônia', altBase: 'Cerimônia de casamento fotografada por Ivan Dias em São Paulo' },
  { folder: 'DETALHES', slug: 'detalhes', label: 'Detalhes', altBase: 'Detalhes de decoração e preparativos de casamento fotografados por Ivan Dias' },
  { folder: 'FESTA', slug: 'festa', label: 'Festa', altBase: 'Festa de casamento fotografada por Ivan Dias em São Paulo' },
  { folder: 'PRÉ - WEDDING', slug: 'pre-wedding', label: 'Pré-Wedding', altBase: 'Ensaio pré-wedding fotografado por Ivan Dias em São Paulo' },
];

async function processOne(srcPath, outPath, width) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp(srcPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true })
    .toFile(outPath);
  const stat = fs.statSync(outPath);
  return Math.round(stat.size / 1024);
}

(async () => {
  const manifest = [];
  let totalKB = 0;

  for (const cat of CATEGORIES) {
    const dir = path.join(SRC_ROOT, cat.folder);
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));
    let n = 0;
    for (const file of files) {
      n += 1;
      const num = String(n).padStart(2, '0');
      const outName = `casamento-sao-paulo-${cat.slug}-${num}.jpg`;
      const outRel = `galeria/${cat.slug}/${outName}`;
      const outPath = path.join(OUT_ROOT, cat.slug, outName);
      const srcPath = path.join(dir, file);
      try {
        const sizeKB = await processOne(srcPath, outPath, 800);
        totalKB += sizeKB;
        manifest.push({
          src: `/images/${outRel}`,
          category: cat.label,
          alt: `${cat.altBase} — registro ${n}`,
        });
        console.log(`OK  ${outRel}  (${sizeKB} KB)`);
      } catch (err) {
        console.error(`FAIL ${file}: ${err.message}`);
      }
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'gallery-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nProcessed ${manifest.length} gallery images, total ~${Math.round(totalKB / 1024)} MB.`);
})();
