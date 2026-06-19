'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

type PortfolioItem = {
  id: string;
  src: string;
  alt: string;
  category: 'Cerimônia' | 'Festa' | 'Pré-Wedding' | 'Detalhes';
  height: 'tall' | 'medium' | 'short';
};

const ITEMS: PortfolioItem[] = [
  { id: '1', src: '/images/portfolio/casamento-sao-paulo-cerimonia-beijo-altar.jpg', alt: 'Noivos se beijando no altar durante cerimônia de casamento em São Paulo', category: 'Cerimônia', height: 'tall' },
  { id: '2', src: '/images/portfolio/casamento-sao-paulo-festa-casal-luzes.jpg', alt: 'Casal de noivos em momento romântico iluminado pelas luzes da festa', category: 'Festa', height: 'medium' },
  { id: '3', src: '/images/portfolio/casamento-sao-paulo-detalhe-noiva-veu-pretoebranco.jpg', alt: 'Retrato artístico em preto e branco da noiva com véu ao vento', category: 'Detalhes', height: 'short' },
  { id: '4', src: '/images/portfolio/ensaio-pre-wedding-casal-guarda-chuva-jardim.jpg', alt: 'Casal em ensaio pré-wedding com guarda-chuva em jardim com piscina', category: 'Pré-Wedding', height: 'medium' },
  { id: '5', src: '/images/portfolio/casamento-sao-paulo-cerimonia-noivos-corredor.jpg', alt: 'Noivos caminhando juntos pelo corredor durante cerimônia ao ar livre', category: 'Cerimônia', height: 'short' },
  { id: '6', src: '/images/portfolio/casamento-sao-paulo-festa-noiva-entardecer.jpg', alt: 'Noiva sorridente com buquê de flores no entardecer durante a festa', category: 'Festa', height: 'tall' },
];

const CATEGORIES = ['Todos', 'Cerimônia', 'Festa', 'Pré-Wedding', 'Detalhes'] as const;

const heightClass: Record<PortfolioItem['height'], string> = {
  tall: 'aspect-[3/4]',
  medium: 'aspect-square',
  short: 'aspect-[4/3]',
};

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('Todos');

  const filtered = useMemo(
    () => (filter === 'Todos' ? ITEMS : ITEMS.filter((item) => item.category === filter)),
    [filter]
  );

  return (
    <section className="relative bg-blue-deep py-24 md:py-32" id="portfolio-preview">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-brown-light">
              Galeria
            </span>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tightest text-cream md:text-5xl">
              Momentos eternizados em cada detalhe
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar portfólio por categoria">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={filter === category}
                onClick={() => setFilter(category)}
                data-cursor-hover
                className={`rounded-full px-5 py-2 font-body text-sm font-medium transition-colors focus-visible-ring ${
                  filter === category
                    ? 'bg-blue-accent text-white'
                    : 'bg-cream/5 text-cream/70 hover:bg-cream/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {filtered.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              data-cursor-hover
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={item.src}
                alt={item.alt}
                role="img"
                width={800}
                height={533}
                loading="lazy"
                placeholder="blur"
                blurDataURL={SHIMMER_BLUR_DATA_URL}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={{ width: '100%', height: 'auto' }}
                className="transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-blue-deep/80 via-blue-deep/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <figcaption className="translate-y-6 p-6 font-body text-sm font-medium uppercase tracking-wide text-cream transition-transform duration-500 group-hover:translate-y-0">
                  {item.category}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/portfolio/"
            data-cursor-hover
            className="rounded-full border border-cream/30 px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-cream/10 focus-visible-ring"
          >
            Ver Tudo
          </Link>
        </div>
      </div>
    </section>
  );
}
