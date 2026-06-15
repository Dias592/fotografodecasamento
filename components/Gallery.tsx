'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';
import { galleryItems, GalleryItem } from '@/lib/gallery';

const CATEGORIES = ['Todos', 'Cerimônia', 'Festa', 'Pré-Wedding', 'Detalhes'] as const;

const heightClass: Record<GalleryItem['height'], string> = {
  tall: 'aspect-[3/4]',
  medium: 'aspect-square',
  short: 'aspect-[4/3]',
};

const PAGE_SIZE = 18;

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('Todos');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    setVisible(PAGE_SIZE);
    return filter === 'Todos' ? galleryItems : galleryItems.filter((item) => item.category === filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const visibleItems = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <section className="relative bg-blue-deep py-16 md:py-20" id="galeria-completa">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar galeria por categoria">
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
          <span className="ml-auto self-center font-body text-sm text-cream/70">
            {filtered.length} fotos
          </span>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {visibleItems.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              data-cursor-hover
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={item.src}
                alt={item.alt}
                role="img"
                width={0}
                height={0}
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

        {hasMore && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((prev) => prev + PAGE_SIZE)}
              data-cursor-hover
              className="rounded-full border border-cream/30 px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-cream/10 focus-visible-ring"
            >
              Carregar mais fotos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
