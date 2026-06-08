const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = 'D:\\SITE FOTO\\fotos dia\\HOME';
const outDir = path.join(__dirname, 'home-preview-tmp');
fs.mkdirSync(outDir, { recursive: true });
const used = ['IVAN6666.jpg', 'IVAN1048.jpg', 'IVAN6045.jpg', 'IVAN1073.jpg', 'IVAN6190.jpg'];
const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g)$/i.test(f) && !used.includes(f));
const pick = files.slice(0, 16);
(async () => {
  for (const f of pick) {
    const out = path.join(outDir, f.replace(/\.[^.]+$/, '') + '.jpg');
    await sharp(path.join(dir, f)).resize({ width: 300 }).jpeg({ quality: 60 }).toFile(out);
  }
  console.log(pick.join('\n'));
})();
