export const SHIMMER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1B3A5C" />
      <rect width="800" height="600" fill="#0D1B2A" opacity="0.4" />
    </svg>`
  ).toString('base64');

export function picsumUrl(seed: string, width = 800, height = 600) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
