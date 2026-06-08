const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_ROOT = 'D:\\SITE FOTO\\fotos dia\\HOME';
const OUT_ROOT = path.join(__dirname, '..', 'public', 'images', 'portfolio');

const PLAN = [
  { out: 'casamento-sao-paulo-cerimonia-beijo-altar.jpg', src: 'IVAN6404-2.jpg', width: 800, alt: 'Noivos se beijando no altar durante cerimônia de casamento em São Paulo', category: 'Cerimônia', height: 'tall' },
  { out: 'casamento-sao-paulo-festa-casal-luzes.jpg', src: 'IVAN6586.jpg', width: 800, alt: 'Casal de noivos em momento romântico iluminado pelas luzes da festa', category: 'Festa', height: 'medium' },
  { out: 'casamento-sao-paulo-detalhe-noiva-veu-pretoebranco.jpg', src: 'IVAN6924.jpg', width: 800, alt: 'Retrato artístico em preto e branco da noiva com véu ao vento', category: 'Detalhes', height: 'short' },
  { out: 'ensaio-pre-wedding-casal-guarda-chuva-jardim.jpg', src: '5N6A1719-3.jpg', width: 800, alt: 'Casal em ensaio pré-wedding com guarda-chuva em jardim com piscina', category: 'Pré-Wedding', height: 'medium' },
  { out: 'casamento-sao-paulo-cerimonia-noivos-corredor.jpg', src: 'IVAN6196.jpg', width: 800, alt: 'Noivos caminhando juntos pelo corredor durante cerimônia ao ar livre', category: 'Cerimônia', height: 'short' },
  { out: 'casamento-sao-paulo-festa-noiva-entardecer.jpg', src: 'IVAN1126.jpg', width: 800, alt: 'Noiva sorridente com buquê de flores no entardecer durante a festa', category: 'Festa', height: 'tall' },
];

(async () => {
  for (const item of PLAN) {
    const srcPath = path.join(SRC_ROOT, item.src);
    const outPath = path.join(OUT_ROOT, item.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    await sharp(srcPath).rotate().resize({ width: item.width, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`OK  portfolio/${item.out}  (${Math.round(stat.size / 1024)} KB)`);
  }
})();
