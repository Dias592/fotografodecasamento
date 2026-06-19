import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { getBreadcrumbListSchema } from '@/lib/schema';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sobre Ivan Dias | Fotógrafo de Casamento São Paulo',
  description: 'Conheça Ivan Dias, fotógrafo de casamento em São Paulo com mais de 15 anos de experiência e 700 casamentos registrados. Uma história de paixão pela fotografia.',
  alternates: { canonical: 'https://ivandiasfotografo.com.br/sobre/' },
};

const TIMELINE = [
  { year: '2011', text: 'Início da carreira como fotógrafo de eventos em São Paulo.' },
  { year: '2015', text: 'Especialização em fotografia documental de casamentos.' },
  { year: '2019', text: 'Marca de 400 casamentos registrados e expansão para pré-wedding.' },
  { year: '2024', text: 'Introdução de coberturas aéreas com drone certificado pela ANAC.' },
];

export default function SobrePage() {
  return (
    <>
      <SchemaOrg
        schema={getBreadcrumbListSchema([
          { name: 'Início', url: '/' },
          { name: 'Sobre', url: '/sobre' },
        ])}
      />

      <section className="relative overflow-hidden bg-cream pb-24 pt-36 md:pb-32 md:pt-44">
        <span
          aria-hidden="true"
          className="bg-number absolute -right-10 top-10 select-none font-heading text-[12rem] leading-none md:text-[20rem]"
        >
          ID
        </span>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-12">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl">
            <Image
              src="/images/sobre/ivan-dias-fotografo-casamento-trajetoria.jpg"
              alt="Mosaico de retratos em preto e branco de Ivan Dias, fotógrafo de casamento, com a identidade visual da marca"
              role="img"
              fill
              priority
              placeholder="blur"
              blurDataURL={SHIMMER_BLUR_DATA_URL}
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
              Sobre mim
            </span>
            <h1 className="mt-4 font-heading text-4xl font-black italic tracking-tightest text-blue-deep md:text-6xl">
              Ivan Dias
            </h1>
            <p className="mt-6 font-body text-base leading-relaxed text-blue-deep/70 md:text-lg">
              Sou fotógrafo de casamento radicado em São Paulo, apaixonado por contar
              histórias de amor através de imagens autorais e cheias de sentimento.
              Ao longo de mais de 15 anos, desenvolvi um olhar atento aos detalhes que
              fazem cada celebração única — o brilho no olhar, o aperto de mão entre
              gerações, o riso solto da pista de dança.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-blue-deep/70 md:text-lg">
              Trabalho lado a lado com os casais para entender suas histórias antes do
              grande dia, garantindo que cada clique reflita quem vocês realmente são.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-deep py-24 text-cream md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h2 className="font-heading text-3xl font-bold tracking-tightest md:text-4xl">
            Trajetória
          </h2>
          <ol className="mt-12 flex flex-col gap-10 border-l border-cream/15 pl-8">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[2.65rem] flex h-5 w-5 items-center justify-center rounded-full bg-brown-light" />
                <span className="font-heading text-xl font-bold text-brown-light">{item.year}</span>
                <p className="mt-2 font-body text-base text-cream/70">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </>
  );
}
