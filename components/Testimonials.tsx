'use client';

import { useState } from 'react';

type Testimonial = {
  id: string;
  names: string;
  bairro: string;
  text: string;
  rating: 4 | 5;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    names: 'Carolina & Rafael',
    bairro: 'Itaim Bibi',
    text: 'Ivan capturou cada emoção do nosso dia com uma sensibilidade incrível. As fotos parecem contar nossa história sem precisar de uma palavra.',
    rating: 5,
  },
  {
    id: '2',
    names: 'Beatriz & Lucas',
    bairro: 'Jardins',
    text: 'Discreto, atento e extremamente talentoso. Recebemos um álbum cheio de momentos que nem percebemos durante a festa. Recomendamos de olhos fechados.',
    rating: 4,
  },
  {
    id: '3',
    names: 'Fernanda & Diego',
    bairro: 'Moema',
    text: 'Da pré-produção à entrega final, tudo foi impecável. As imagens aéreas do nosso casamento ficaram surpreendentes — emocionamos até hoje ao rever.',
    rating: 5,
  },
];

function Stars({ rating }: { rating: 4 | 5 }) {
  return (
    <div
      className="flex gap-1 text-brown-light"
      role="img"
      aria-label={`Avaliação de ${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          fill={index < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={index < rating ? 0 : 1.5}
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.9l-5.2 2.62.99-5.8L1.58 7.6l5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section className="relative bg-cream py-24 md:py-32" id="depoimentos" aria-roledescription="carousel">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
          Depoimentos
        </span>
        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tightest text-blue-deep md:text-5xl">
          Histórias contadas por quem viveu
        </h2>

        <div className="relative mt-14 min-h-[320px]">
          <div className="flex flex-col items-center transition-opacity duration-500">
            <Stars rating={current.rating} />
            <p className="mt-6 max-w-2xl font-heading text-xl font-medium italic leading-relaxed text-blue-deep md:text-2xl">
              &ldquo;{current.text}&rdquo;
            </p>
            <p className="mt-6 font-body text-sm font-semibold uppercase tracking-wide text-blue-deep/60">
              {current.names} <span className="text-blue-accent">· {current.bairro}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Depoimento anterior"
            data-cursor-hover
            className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-deep/15 text-blue-deep transition-colors hover:bg-blue-deep hover:text-cream focus-visible-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Selecionar depoimento">
            {TESTIMONIALS.map((testimonial, i) => (
              <button
                key={testimonial.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ver depoimento de ${testimonial.names}`}
                onClick={() => setIndex(i)}
                data-cursor-hover
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible-ring ${
                  i === index ? 'w-8 bg-blue-accent' : 'w-2.5 bg-blue-deep/20'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Próximo depoimento"
            data-cursor-hover
            className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-deep/15 text-blue-deep transition-colors hover:bg-blue-deep hover:text-cream focus-visible-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
