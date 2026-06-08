const sharp = require('sharp');
const fs = require('fs');
const out = 'public/images/sobre/ivan-dias-fotografo-casamento-trajetoria.jpg';
const src = 'D:/DOWNLOAD/fotos dia-20260608T175116Z-3-001/fotos dia/IVAN DIAS/sobre IVAN DIAS.jpg';
sharp(src)
  .rotate()
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(out)
  .then(() => {
    const s = fs.statSync(out);
    console.log('OK sobre photo updated:', Math.round(s.size / 1024), 'KB');
  })
  .catch((e) => console.error('FAIL', e.message));
