import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import SchemaOrg from '@/components/SchemaOrg';
import ServiceFAQ from '@/components/ServiceFAQ';
import { getBreadcrumbListSchema } from '@/lib/schema';
import { pageKeywords } from '@/lib/seo-keywords';

const CITY = 'São Caetano do Sul';
const SLUG = 'fotografo-de-casamento-sao-caetano-do-sul';
const CANONICAL = `https://www.ivandiasfotografo.com.br/${SLUG}/`;

export const metadata: Metadata = {
  title: 'Fotógrafo de Casamento em São Caetano do Sul | Ivan Dias',
  description:
    'Ivan Dias, fotógrafo de casamento em São Caetano do Sul e ABC Paulista. Cobertura completa, pré-wedding e mini wedding com mais de 700 casamentos registrados. Solicite orçamento.',
  keywords: pageKeywords['sao-caetano'],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Fotógrafo de Casamento em São Caetano do Sul | Ivan Dias',
    description:
      'Fotografia de casamento em São Caetano do Sul e ABC Paulista. Cobertura completa, pré-wedding e mini wedding.',
    url: CANONICAL,
  },
};

const faqItems = [
  {
    question: 'Ivan Dias atende casamentos em São Caetano do Sul?',
    answer:
      'Sim, atendo casamentos em São Caetano do Sul e em toda a região do ABC Paulista — Santo André, São Bernardo do Campo e cidades vizinhas.',
  },
  {
    question: 'Quanto custa um fotógrafo de casamento em São Caetano do Sul?',
    answer:
      'Os pacotes para casamentos em São Caetano do Sul partem de R$ 3.200, com cobertura completa do making of à festa, incluindo edição profissional e entrega em galeria digital de alta resolução. Solicite um orçamento personalizado pelo WhatsApp.',
  },
  {
    question: 'Você atende mini weddings em São Caetano do Sul?',
    answer:
      'Sim, atendo mini weddings com até 80 convidados em São Caetano do Sul e região. Temos pacotes específicos para cerimônias intimistas com o mesmo cuidado fotográfico de uma grande celebração.',
  },
  {
    question: 'É possível fazer o ensaio pré-wedding em São Caetano do Sul?',
    answer:
      'Sim, São Caetano do Sul oferece praças, parques e espaços urbanos com ótima luz natural, ideais para ensaios pré-wedding com charme e autenticidade.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'PhotographyBusiness'],
      name: 'Ivan Dias Fotógrafo',
      description: 'Fotógrafo de casamento em São Caetano do Sul e ABC Paulista.',
      url: CANONICAL,
      telephone: '+55-11-95302-5177',
      areaServed: { '@type': 'Place', name: 'São Caetano do Sul, SP, Brasil' },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Fotografia de Casamento em São Caetano do Sul',
      serviceType: 'Fotografia de Casamento',
      provider: { '@type': 'LocalBusiness', name: 'Ivan Dias Fotógrafo' },
      areaServed: { '@type': 'Place', name: 'São Caetano do Sul, SP, Brasil' },
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
  'https://wa.me/5511953025177?text=Ol%C3%A1%20Ivan!%20Vi%20seu%20site%20e%20quero%20saber%20sobre%20fotografia%20de%20casamento%20em%20S%C3%A3o%20Caetano%20do%20Sul.';

export default function SaoCaetanoPage() {
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-blue-deep pb-24 pt-36 text-cream md:pb-32 md:pt-44">
        <span
          aria-hidden="true"
          className="bg-number absolute -right-16 top-0 select-none font-heading text-[14rem] leading-none text-cream md:text-[22rem]"
        >
          SCS
        </span>
        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-brown-light">
            ABC Paulista
          </span>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-black italic tracking-tightest md:text-6xl">
            Fotógrafo de Casamento em São Caetano do Sul
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-cream/70 md:text-lg">
            Ivan Dias registra casamentos em São Caetano do Sul e toda a região do ABC Paulista
            com sensibilidade, técnica autoral e mais de 700 celebrações na trajetória.
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
            Por que Ivan Dias em São Caetano do Sul?
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

      {/* Serviços */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="font-heading text-3xl font-bold tracking-tightest text-blue-deep md:text-4xl">
            Serviços para casamentos em São Caetano do Sul
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
                className="rounded-2xl border border-blue-deep/10 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="font-heading text-lg font-semibold text-blue-deep">{title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-blue-deep/65">{desc}</p>
                <span className="mt-4 inline-block font-body text-sm font-semibold text-blue-accent">
                  Saiba mais →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-blue-deep py-20 text-cream">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h2 className="font-heading text-2xl font-bold tracking-tightest md:text-3xl">
            Perguntas frequentes — São Caetano do Sul
          </h2>
          <ServiceFAQ items={faqItems} />
        </div>
      </section>

      {/* Depoimento placeholder */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <blockquote className="font-heading text-xl italic text-blue-deep md:text-2xl">
            &quot;Ivan capturou cada detalhe do nosso casamento no ABC com uma sensibilidade incrível.
            As fotos emocionam toda vez que olhamos.&quot;
          </blockquote>
          <p className="mt-4 font-body text-sm text-blue-deep/60">— Casal atendido no ABC Paulista</p>
        </div>
      </section>

      {/* Formulário de contato */}
      <section className="bg-blue-deep py-20 text-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tightest md:text-4xl">
                Vamos conversar sobre o seu casamento em São Caetano do Sul?
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-cream/70">
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
            <div className="rounded-3xl border border-cream/10 bg-cream/5 p-8 backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Cross-domain */}
      <section className="bg-cream py-10">
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
