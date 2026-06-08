const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_ROOT = 'D:\\SITE FOTO\\fotos dia';
const OUT_ROOT = path.join(__dirname, '..', 'public', 'images');

// name, sourceFolder, sourceFile, targetWidth, alt
const PLAN = [
  // HERO
  { out: 'hero/fotografo-casamento-sao-paulo-noivos-abraco.jpg', src: 'HOME/IVAN6666.jpg', width: 1400, alt: 'Casal de noivos se abraçando durante celebração de casamento em São Paulo' },
  { out: 'hero/fotografo-casamento-sao-paulo-detalhe-aliancas.jpg', src: 'HOME/IVAN1048.jpg', width: 480, alt: 'Detalhe das alianças e mãos do casal durante cerimônia de casamento' },

  // ABOUT
  { out: 'about/ivan-dias-fotografo-casamento-sao-paulo.jpg', src: 'HOME/IVAN6045.jpg', width: 900, alt: 'Ivan Dias, fotógrafo de casamento, em momento de trabalho durante cerimônia' },
  { out: 'about/ivan-dias-fotografo-retrato.jpg', src: 'HOME/IVAN1073.jpg', width: 900, alt: 'Retrato do fotógrafo Ivan Dias com câmera profissional' },

  // PORTFOLIO (mixed categories)
  { out: 'portfolio/casamento-sao-paulo-noiva-altar-cerimonia.jpg', src: 'CERIMÔNIA/IVAN6588.jpg', width: 800, alt: 'Noiva caminhando em direção ao altar durante cerimônia de casamento em São Paulo', category: 'Cerimônia' },
  { out: 'portfolio/casamento-sao-paulo-festa-pista-de-danca.jpg', src: 'FESTA/5N6A0762.jpg', width: 800, alt: 'Casal dançando a primeira dança iluminados pelas luzes da festa de casamento', category: 'Festa' },
  { out: 'portfolio/casamento-sao-paulo-detalhe-buque-flores.jpg', src: 'DETALHES/IVAN9009.jpg', width: 800, alt: 'Detalhe do buquê de flores da noiva sobre mesa decorada', category: 'Detalhes' },
  { out: 'portfolio/ensaio-pre-wedding-casal-ar-livre-sao-paulo.jpg', src: 'PRÉ - WEDDING/IVAN1063.jpg', width: 800, alt: 'Casal se abraçando durante ensaio pré-wedding ao ar livre em São Paulo', category: 'Pré-Wedding' },
  { out: 'portfolio/casamento-sao-paulo-noivo-emocionado-cerimonia.jpg', src: 'CERIMÔNIA/IVAN6053.jpg', width: 800, alt: 'Noivo emocionado durante a troca de votos na cerimônia de casamento', category: 'Cerimônia' },
  { out: 'portfolio/casamento-sao-paulo-convidados-comemorando-festa.jpg', src: 'FESTA/5N6A0788.jpg', width: 800, alt: 'Convidados comemorando e brindando durante a festa de casamento em São Paulo', category: 'Festa' },

  // TESTIMONIALS (couple portraits)
  { out: 'depoimentos/casal-depoimento-casamento-itaim-bibi.jpg', src: 'FESTA/5N6A2988.jpg', width: 240, alt: 'Casal sorridente durante festa de casamento no bairro Itaim Bibi, São Paulo' },
  { out: 'depoimentos/casal-depoimento-casamento-jardins.jpg', src: 'CERIMÔNIA/IVAN6244.jpg', width: 240, alt: 'Casal abraçado durante cerimônia de casamento no bairro Jardins, São Paulo' },
  { out: 'depoimentos/casal-depoimento-casamento-moema.jpg', src: 'PRÉ - WEDDING/IVAN1127.jpg', width: 240, alt: 'Casal sorridente em ensaio pré-wedding no bairro Moema, São Paulo' },

  // BLOG / SATELLITE POSTS (one per bairro)
  { out: 'blog/fotografo-casamento-itaim-bibi-cerimonia.jpg', src: 'CERIMÔNIA/IVAN6599.jpg', width: 760, alt: 'Cerimônia de casamento fotografada no bairro Itaim Bibi, São Paulo' },
  { out: 'blog/fotografo-casamento-jardins-cerimonia.jpg', src: 'CERIMÔNIA/IVAN6702.jpg', width: 760, alt: 'Cerimônia de casamento fotografada no bairro Jardins, São Paulo' },
  { out: 'blog/fotografo-casamento-moema-festa.jpg', src: 'FESTA/5N6A3177.jpg', width: 760, alt: 'Festa de casamento fotografada no bairro Moema, São Paulo' },
  { out: 'blog/fotografo-casamento-pinheiros-pre-wedding.jpg', src: 'PRÉ - WEDDING/IVAN1704.jpg', width: 760, alt: 'Ensaio pré-wedding fotografado no bairro Pinheiros, São Paulo' },
  { out: 'blog/fotografo-casamento-vila-mariana-cerimonia.jpg', src: 'CERIMÔNIA/IVAN6872.jpg', width: 760, alt: 'Cerimônia de casamento fotografada no bairro Vila Mariana, São Paulo' },
  { out: 'blog/fotografo-casamento-perdizes-detalhes.jpg', src: 'DETALHES/IVAN9034.jpg', width: 760, alt: 'Detalhes de decoração de casamento fotografados no bairro Perdizes, São Paulo' },
  { out: 'blog/fotografo-casamento-tatuape-festa.jpg', src: 'FESTA/5N6A4321.jpg', width: 760, alt: 'Festa de casamento fotografada no bairro Tatuapé, São Paulo' },
  { out: 'blog/fotografo-casamento-santana-cerimonia.jpg', src: 'CERIMÔNIA/IVAN6664.jpg', width: 760, alt: 'Cerimônia de casamento fotografada no bairro Santana, São Paulo' },

  // SERVICES (detail page hero images)
  { out: 'servicos/fotografo-casamento-sao-paulo-cobertura-completa.jpg', src: 'CERIMÔNIA/IVAN6669.jpg', width: 900, alt: 'Cobertura completa de casamento: making of, cerimônia e festa em São Paulo' },
  { out: 'servicos/fotografo-casamento-sao-paulo-pre-wedding.jpg', src: 'PRÉ - WEDDING/5N6A3483.jpg', width: 900, alt: 'Ensaio pré-wedding ao ar livre realizado em São Paulo' },
  { out: 'servicos/fotografo-casamento-sao-paulo-mini-wedding.jpg', src: 'CERIMÔNIA/IVAN9075.jpg', width: 900, alt: 'Cerimônia intimista de mini wedding fotografada em São Paulo' },
  { out: 'servicos/fotografo-casamento-sao-paulo-drone-imagens-aereas.jpg', src: 'DETALHES/IVAN9496.jpg', width: 900, alt: 'Imagem aérea de cerimônia de casamento captada com drone em São Paulo' },

  // SOBRE page portrait
  { out: 'sobre/ivan-dias-fotografo-casamento-trajetoria.jpg', src: 'HOME/IVAN6190.jpg', width: 900, alt: 'Ivan Dias, fotógrafo de casamento, registrando momento especial em São Paulo' },
];

const LOGOS = [
  { out: 'logo/ivan-dias-logo-branco.png', src: 'LOGO TIPO/BRANCO.png' },
  { out: 'logo/ivan-dias-logo-preto.png', src: 'LOGO TIPO/PRETO.png' },
  { out: 'logo/ivan-dias-logo-dourado.png', src: 'LOGO TIPO/DOURADO.png' },
  { out: 'logo/ivan-dias-favicon.png', src: 'LOGO TIPO/FIVICON.png' },
];

async function processOne(item) {
  const srcPath = path.join(SRC_ROOT, item.src);
  const outPath = path.join(OUT_ROOT, item.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  await sharp(srcPath)
    .rotate()
    .resize({ width: item.width, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(outPath);

  const stat = fs.statSync(outPath);
  return { ...item, sizeKB: Math.round(stat.size / 1024) };
}

async function processLogo(item) {
  const srcPath = path.join(SRC_ROOT, item.src);
  const outPath = path.join(OUT_ROOT, item.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  await sharp(srcPath)
    .resize({ width: 480, withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(outPath);

  const stat = fs.statSync(outPath);
  return { ...item, sizeKB: Math.round(stat.size / 1024) };
}

(async () => {
  const results = [];
  for (const item of PLAN) {
    try {
      const result = await processOne(item);
      results.push(result);
      console.log(`OK  ${result.out}  (${result.sizeKB} KB, w=${item.width})`);
    } catch (err) {
      console.error(`FAIL ${item.out}: ${err.message}`);
    }
  }

  for (const item of LOGOS) {
    try {
      const result = await processLogo(item);
      results.push(result);
      console.log(`OK  ${result.out}  (${result.sizeKB} KB)`);
    } catch (err) {
      console.error(`FAIL ${item.out}: ${err.message}`);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'images-manifest.json'),
    JSON.stringify(results, null, 2)
  );
  console.log(`\nProcessed ${results.length} images.`);
})();
