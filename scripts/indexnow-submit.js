const https = require('https');
const http = require('http');

const HOST = 'ivandiasfotografo.com.br';
const KEY = '2193db46umdumf4787849c5e1747ef6788';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const BATCH_SIZE = 100;
const DELAY_MS = 2000;

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractUrls(xml) {
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return [...matches].map((m) => m[1].trim());
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log(`Buscando sitemap: ${SITEMAP_URL}`);
  const xml = await fetchUrl(SITEMAP_URL);
  const urls = extractUrls(xml);
  console.log(`URLs encontradas: ${urls.length}`);

  let submitted = 0;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(urls.length / BATCH_SIZE);

    const result = await postJson('https://api.indexnow.org/IndexNow', {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    });

    const status = result.status === 200 ? '✓' : '✗';
    console.log(`Lote ${batchNum}/${totalBatches} [${batch.length} URLs] → HTTP ${result.status} ${status}`);
    submitted += batch.length;

    if (i + BATCH_SIZE < urls.length) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\nTotal submetido: ${submitted}/${urls.length} URLs`);
}

main().catch((err) => {
  console.error('Erro:', err.message);
  process.exit(1);
});
