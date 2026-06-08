const sharp = require('sharp');
const p = 'D:/DOWNLOAD/fotos dia-20260608T175116Z-3-001/fotos dia/IVAN DIAS/IVAN DIAS.jpg';
sharp(p).metadata().then((m) => console.log(JSON.stringify(m, null, 2)));
