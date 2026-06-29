'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';
import { galleryItems, GalleryItem } from '@/lib/gallery';

const CATEGORIES = ['Todos', 'Cerimônia', 'Festa', 'Pré-Wedding', 'Detalhes'] as const;

const PAGE_SIZE = 18;

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('Todos');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    setVisible(PAGE_SIZE);
    return filter === 'Todos' ? galleryItems : galleryItems.filter((item) => item.category === filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const visibleItems = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const currentIndex = lightbox ? filtered.findIndex((i) => i.id === lightbox.id) : -1;

  const goTo = useCallback(
    (dir: -1 | 1) => {
      if (currentIndex < 0) return;
      const next = (currentIndex + dir + filtered.length) % filtered.length;
      setLightbox(filtered[next]);
    },
    [currentIndex, filtered],
  );

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') goTo(1);
      if (e.key === 'ArrowLeft') goTo(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, goTo]);

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
          {visibleItems.map((item) => (
            <figure
              key={item.id}
              data-cursor-hover
              className="group relative cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setLightbox(item)}
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
            </figure>
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

      {lightbox && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Fechar visualização"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goTo(-1); }}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goTo(1); }}
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden="true">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1400}
              height={933}
              quality={90}
              priority
              sizes="90vw"
              style={{ width: 'auto', height: 'auto', maxHeight: '90vh', maxWidth: '90vw' }}
              className="rounded-lg object-contain"
            />
            <p className="mt-4 text-center font-body text-sm text-white/70">
              {lightbox.alt} · {lightbox.category}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
