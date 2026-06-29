


const BADGES = ['Cobertura Completa', 'Pré-Wedding', 'Direção de Casal', 'Fotografia Aérea'];

export default function About() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32" id="sobre-preview">
      <span
        aria-hidden="true"
        className="bg-number absolute -right-16 top-0 select-none font-heading text-[12rem] leading-none md:text-[20rem]"
      >
        02
      </span>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-12">
        <div className="w-full max-w-md overflow-hidden rounded-3xl md:justify-self-start">
          <img
            src="/images/about/ivan-dias-fotografo-retrato.webp"
            srcSet="/images/about/ivan-dias-fotografo-retrato-1x.webp 400w, /images/about/ivan-dias-fotografo-retrato.webp 800w"
            sizes="(min-width: 768px) min(448px, 50vw), calc(100vw - 48px)"
            alt="Retrato do fotógrafo Ivan Dias segurando câmera profissional em estúdio"
            width={800}
            height={533}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        <div>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
            Sobre Ivan Dias
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tightest text-blue-deep md:text-5xl">
            Quinze anos contando histórias de amor através das lentes
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-blue-deep/75 md:text-lg">
            Sou apaixonado por contar histórias através da fotografia. Trabalho com
            casamentos, pré-wedding, ensaios e muito mais, sempre com o compromisso
            de capturar a essência de cada momento especial — os olhares cheios de
            amor, os gestos sutis e os instantes que traduzem a suavidade e o requinte
            de uma ocasião única.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-blue-deep/75 md:text-lg">
            Cada clique é pensado para transformar emoções em memórias únicas,
            refletindo a beleza, o amor e a singularidade de cada etapa da vida do
            casal. Já registrei mais de 700 casamentos em diferentes bairros da
            capital paulista — meu objetivo é entregar imagens que emocionem,
            inspirem e sejam apreciadas por gerações.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-brown-light/15 px-5 py-2 font-body text-sm font-semibold text-blue-deep/70"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
