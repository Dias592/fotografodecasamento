import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import SchemaOrg from '@/components/SchemaOrg';
import ServiceFAQ from '@/components/ServiceFAQ';
import { getBreadcrumbListSchema } from '@/lib/schema';
import { pageKeywords } from '@/lib/seo-keywords';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

const CITY = 'Santo André';
const SLUG = 'fotografo-de-casamento-santo-andre';
const CANONICAL = `https://www.ivandiasfotografo.com.br/${SLUG}/`;

export const metadata: Metadata = {
  title: 'Fotógrafo de Casamento em Santo André | Ivan Dias',
  description:
    'Ivan Dias, fotógrafo de casamento em Santo André e ABC Paulista. Cobertura completa, pré-wedding e mini wedding com mais de 700 casamentos registrados. Solicite orçamento.',
  keywords: pageKeywords['santo-andre'],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Fotógrafo de Casamento em Santo André | Ivan Dias',
    description:
      'Fotografia de casamento em Santo André e ABC Paulista. Cobertura completa, pré-wedding e mini wedding.',
    url: CANONICAL,
  },
};

const faqItems = [
  {
    question: 'Ivan Dias atende casamentos em Santo André?',
    answer:
      'Sim, atendo casamentos em Santo André e em toda a região do ABC Paulista — São Bernardo do Campo, São Caetano do Sul e cidades vizinhas.',
  },
  {
    question: 'Quanto custa um fotógrafo de casamento em Santo André?',
    answer:
      'Os pacotes para casamentos em Santo André partem de R$ 3.200, com cobertura completa do making of à festa, incluindo edição profissional e entrega em galeria digital de alta resolução. Solicite um orçamento personalizado pelo WhatsApp.',
  },
  {
    question: 'Você atende mini weddings em Santo André?',
    answer:
      'Sim, atendo mini weddings com até 80 convidados em Santo André e região. Temos pacotes específicos para cerimônias intimistas com o mesmo cuidado fotográfico de uma grande celebração.',
  },
  {
    question: 'É possível fazer o ensaio pré-wedding em Santo André?',
    answer:
      'Sim, Santo André e o ABC Paulista oferecem cenários variados — desde parques e áreas verdes até espaços urbanos contemporâneos — ideais para ensaios pré-wedding com personalidade.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'PhotographyBusiness'],
      name: 'Ivan Dias Fotógrafo',
      description: 'Fotógrafo de casamento em Santo André e ABC Paulista.',
      url: CANONICAL,
      telephone: '+55-11-95302-5177',
      areaServed: { '@type': 'Place', name: 'Santo André, SP, Brasil' },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Fotografia de Casamento em Santo André',
      serviceType: 'Fotografia de Casamento',
      provider: { '@type': 'LocalBusiness', name: 'Ivan Dias Fotógrafo' },
      areaServed: { '@type': 'Place', name: 'Santo André, SP, Brasil' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

const WHATSAPP_URL =
  'https://wa.me/5511953025177?text=Ol%C3%A1%20Ivan!%20Vi%20seu%20site%20e%20quero%20saber%20sobre%20fotografia%20de%20casamento%20em%20Santo%20Andr%C3%A9.';

const GALLERY = [
  {
    src: '/images/galeria/cerimonia/casamento-sao-paulo-cerimonia-02.jpg',
    alt: 'Noivos durante cerimônia de casamento',
  },
  {
    src: '/images/galeria/festa/casamento-sao-paulo-festa-06.jpg',
    alt: 'Momento de festa e alegria no casamento',
  },
  {
    src: '/images/galeria/pre-wedding/casamento-sao-paulo-pre-wedding-05.jpg',
    alt: 'Ensaio pré-wedding de casal',
  },
  {
    src: '/images/galeria/detalhes/casamento-sao-paulo-detalhes-04.jpg',
    alt: 'Detalhes da decoração e alianças em casamento',
  },
];

export default function SantoAndrePage() {
  return (
    <>
      <SchemaOrg schema={[getBreadcrumbListSchema([
        { name: 'Início', url: '/' },
        { name: `Fotógrafo de Casamento em ${CITY}`, url: `/${SLUG}` },
      ])]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — texto + imagem 2 colunas */}
      <section className="relative overflow-hidden bg-blue-deep text-cream md:grid md:grid-cols-2">
        <span
          aria-hidden="true"
          className="bg-number pointer-events-none absolute -right-16 top-0 z-10 select-none font-heading text-[14rem] leading-none text-cream opacity-[0.06] md:text-[22rem]"
        >
          ABC
        </span>

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col justify-center px-6 pb-24 pt-36 md:min-h-[85vh] md:px-16 md:pb-32 md:pt-44">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-brown-light">
            ABC Paulista
          </span>
          <h1 className="mt-4 max-w-xl font-heading text-4xl font-black italic tracking-tightest md:text-6xl">
            Fotógrafo de Casamento em Santo André
          </h1>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-cream/70 md:text-lg">
            Ivan Dias registra casamentos em Santo André e toda a região do ABC Paulista com
            sensibilidade, técnica autoral e mais de 700 celebrações na trajetória.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-blue-accent px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible-ring"
            >
              Solicitar orçamento
            </a>
            <Link
              href="/portfolio/"
              className="inline-flex rounded-full border border-cream/30 px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:border-cream hover:text-white focus-visible-ring"
            >
              Ver portfólio
            </Link>
          </div>
        </div>

        {/* Imagem hero */}
        <div className="relative">
          <Image
            src="/images/hero/fotografo-casamento-sao-paulo-noivos-abraco.jpg"
            alt="Noivos se abraçando em casamento — Ivan Dias Fotógrafo"
            width={1400}
            height={2172}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="block h-auto w-full"
            priority
            placeholder="blur"
            blurDataURL={SHIMMER_BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-blue-deep/30" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: '700+', label: 'Casamentos registrados' },
              { value: '20+', label: 'Anos de experiência' },
              { value: '5★', label: 'Avaliação dos noivos' },
              { value: 'ABC', label: 'Paulista atendido' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading text-3xl font-bold text-blue-deep md:text-4xl">{value}</p>
                <p className="mt-1 font-body text-sm text-blue-deep/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que Ivan Dias */}
      <section className="bg-blue-deep py-20 text-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="font-heading text-3xl font-bold tracking-tightest md:text-4xl">
            Por que Ivan Dias em Santo André?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Olhar autoral',
                desc: 'Fotografia de casamento com identidade própria — natural, emotiva e atemporal.',
              },
              {
                title: 'Experiência no ABC',
                desc: 'Conhecemos as locações, a luz e a logística dos principais espaços da região.',
              },
              {
                title: 'Cobertura completa',
                desc: 'Do making of à festa, cada instante registrado com atenção aos detalhes.',
              },
              {
                title: 'Entrega em alta resolução',
                desc: 'Galeria digital com edição profissional e álbum impresso exclusivo.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
                <h3 className="font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-cream/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de fotos */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
            Portfólio
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tightest text-blue-deep md:text-3xl">
            Momentos do portfólio de Ivan Dias
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {GALLERY.map(({ src, alt }) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  placeholder="blur"
                  blurDataURL={SHIMMER_BLUR_DATA_URL}
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-brown-warm transition-colors hover:text-blue-accent"
            >
              Ver portfólio completo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="bg-blue-deep py-20 text-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="font-heading text-3xl font-bold tracking-tightest md:text-4xl">
            Serviços para casamentos em Santo André
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/servicos/cobertura-completa/', title: 'Cobertura Completa', desc: 'Making of, cerimônia e recepção com foto e vídeo.' },
              { href: '/servicos/pre-wedding/', title: 'Pré-Wedding', desc: 'Ensaio externo na locação escolhida pelo casal.' },
              { href: '/servicos/mini-wedding/', title: 'Mini Wedding', desc: 'Celebrações intimistas com até 80 convidados.' },
              { href: '/servicos/drone/', title: 'Drone', desc: 'Imagens aéreas para casamentos ao ar livre.' },
            ].map(({ href, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-cream/10 bg-cream/5 p-6 transition-colors hover:border-cream/30"
              >
                <h3 className="font-heading text-lg font-semibold text-cream">{title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-cream/65">{desc}</p>
                <span className="mt-4 inline-block font-body text-sm font-semibold text-brown-light">
                  Saiba mais →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h2 className="font-heading text-2xl font-bold tracking-tightest text-blue-deep md:text-3xl">
            Perguntas frequentes — Santo André
          </h2>
          <ServiceFAQ items={faqItems} variant="light" />
        </div>
      </section>

      {/* Depoimento */}
      <section className="bg-blue-deep py-16 text-cream">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <svg viewBox="0 0 32 32" fill="currentColor" className="mx-auto h-8 w-8 text-brown-light opacity-60" aria-hidden="true">
            <path d="M10 8C6.7 8 4 10.7 4 14s2.7 6 6 6c.4 0 .8 0 1.2-.1C10.4 21.5 9.3 23 7 24h4c3.9-1.4 6-4.5 6-8 0-4.4-3.1-8-7-8zm14 0c-3.3 0-6 2.7-6 6s2.7 6 6 6c.4 0 .8 0 1.2-.1C24.4 21.5 23.3 23 21 24h4c3.9-1.4 6-4.5 6-8 0-4.4-3.1-8-7-8z" />
          </svg>
          <blockquote className="mt-6 font-heading text-xl italic md:text-2xl">
            Ivan capturou cada detalhe do nosso casamento no ABC com uma sensibilidade incrível.
            As fotos emocionam toda vez que olhamos.
          </blockquote>
          <p className="mt-4 font-body text-sm text-cream/60">— Casal atendido no ABC Paulista</p>
        </div>
      </section>

      {/* Formulário de contato */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
                Contato
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tightest text-blue-deep md:text-4xl">
                Vamos conversar sobre o seu casamento em Santo André?
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-blue-deep/70">
                Preencha o formulário ou entre em contato diretamente pelo WhatsApp.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-blue-accent px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible-ring"
              >
                Falar no WhatsApp
              </a>
            </div>
            <div className="rounded-3xl border border-blue-deep/10 bg-white p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Cross-domain */}
      <section className="border-t border-blue-deep/10 bg-cream py-10">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-12">
          <p className="font-body text-sm text-blue-deep/60">
            Outros serviços:{' '}
            <a
              href="https://pixiformaturas.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-accent hover:underline"
            >
              Pixi Formaturas
            </a>
            {' · '}
            <a
              href="https://ivandiasfoto.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-accent hover:underline"
            >
              Ivan Dias Corporativo
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
