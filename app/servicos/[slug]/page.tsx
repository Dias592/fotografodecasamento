import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { getBreadcrumbListSchema, getFAQPageSchema } from '@/lib/schema';
import { getServiceBySlug, services } from '@/lib/services';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';
import { pageKeywords } from '@/lib/seo-keywords';
import ServiceFAQ from '@/components/ServiceFAQ';

const SERVICE_FAQS: Record<string, { question: string; answer: string }[]> = {
  'cobertura-completa': [
    {
      question: 'O que está incluso na cobertura completa?',
      answer: 'A cobertura completa inclui making of da noiva e do noivo, cerimônia, recepção, galeria digital em alta resolução, vídeo do casamento e álbum fotográfico impresso.',
    },
    {
      question: 'Quantos fotógrafos acompanham o evento?',
      answer: 'Para coberturas completas, trabalhamos com uma equipe dedicada de fotógrafo e cinegrafista, garantindo registros simultâneos dos dois noivos durante o making of.',
    },
    {
      question: 'Qual é o prazo de entrega das fotos?',
      answer: 'O prazo médio é de 30 a 60 dias após o casamento, com entrega em galeria digital de alta resolução para visualização e download ilimitado.',
    },
    {
      question: 'A cobertura inclui edição profissional?',
      answer: 'Sim, todas as fotografias passam por edição profissional com tratamento de cor, luz e composição antes da entrega na galeria digital.',
    },
  ],
  'pre-wedding': [
    {
      question: 'Onde podemos fazer o ensaio pré-wedding?',
      answer: 'O local é escolhido pelo casal — parques, locações urbanas, praias, cachoeiras ou qualquer ambiente que reflita a personalidade e a história de vocês.',
    },
    {
      question: 'Quantas fotos são entregues no ensaio?',
      answer: 'O número de fotos entregues varia conforme a duração do ensaio, mas priorizamos qualidade sobre quantidade — cada imagem é selecionada e editada com cuidado.',
    },
    {
      question: 'Podemos usar as fotos no convite de casamento?',
      answer: 'Sim! As imagens do pré-wedding são frequentemente usadas em convites, painéis de decoração, redes sociais e lembranças do casamento.',
    },
    {
      question: 'O ensaio inclui vídeo?',
      answer: 'Sim, a cobertura do pré-wedding inclui foto e vídeo, com possibilidade de um clip curto para as redes sociais do casal.',
    },
  ],
  'mini-wedding': [
    {
      question: 'Qual é o número máximo de convidados para um mini wedding?',
      answer: 'O mini wedding atende celebrações com até 80 convidados, reunindo apenas as pessoas mais especiais ao redor do casal.',
    },
    {
      question: 'A cobertura do mini wedding inclui making of?',
      answer: 'Sim, a cobertura completa do mini wedding inclui o making of da noiva, a cerimônia e a recepção, com a mesma dedicação de uma grande celebração.',
    },
    {
      question: 'Mini wedding pode ser realizado em espaços menores?',
      answer: 'Sim, espaços como haras, jardins, restaurantes e sítios são opções encantadoras para mini weddings com até 80 convidados.',
    },
    {
      question: 'O valor do mini wedding é diferente da cobertura completa?',
      answer: 'O investimento varia conforme a duração do evento e os itens contratados. Entre em contato para receber um orçamento personalizado para o seu mini wedding.',
    },
  ],
  drone: [
    {
      question: 'O drone pode ser usado em qualquer local?',
      answer: 'O voo de drone depende de autorização prévia do DECEA e das condições do espaço aéreo. Verificamos a viabilidade na locação antes do evento para garantir tudo dentro da legalidade.',
    },
    {
      question: 'O drone complementa a cobertura fotográfica?',
      answer: 'Sim, as imagens aéreas são integradas à galeria e ao vídeo do casamento ou ensaio, adicionando perspectivas únicas à narrativa visual.',
    },
    {
      question: 'É possível usar drone em cerimônias ao ar livre?',
      answer: 'Cerimônias ao ar livre são as mais indicadas para o uso de drone, capturando a grandiosidade da locação e os momentos únicos vistos de cima.',
    },
    {
      question: 'O serviço de drone pode ser contratado separadamente?',
      answer: 'Sim, o drone pode ser contratado como complemento tanto para o ensaio pré-wedding quanto para o dia do casamento, de forma independente ou integrada à cobertura completa.',
    },
  ],
};

const AREA_LINKS = [
  { href: '/blog/fotografo-de-casamento-itaim-bibi/', label: 'Itaim Bibi' },
  { href: '/blog/fotografo-de-casamento-jardins/', label: 'Jardins' },
  { href: '/blog/fotografo-de-casamento-moema/', label: 'Moema' },
  { href: '/blog/fotografo-de-casamento-pinheiros/', label: 'Pinheiros' },
  { href: '/blog/fotografo-de-casamento-vila-mariana/', label: 'Vila Mariana' },
  { href: '/blog/fotografo-de-casamento-perdizes/', label: 'Perdizes' },
  { href: '/blog/fotografo-de-casamento-tatuape/', label: 'Tatuapé' },
  { href: '/blog/fotografo-de-casamento-santana/', label: 'Santana' },
  { href: '/fotografo-de-casamento-santo-andre/', label: 'Santo André' },
  { href: '/fotografo-de-casamento-sao-bernardo-do-campo/', label: 'São Bernardo do Campo' },
  { href: '/fotografo-de-casamento-sao-caetano-do-sul/', label: 'São Caetano do Sul' },
];

const SERVICE_IMAGES: Record<string, string> = {
  'cobertura-completa': '/images/servicos/fotografo-casamento-sao-paulo-cobertura-completa.webp',
  'pre-wedding': '/images/servicos/fotografo-casamento-sao-paulo-pre-wedding.webp',
  'mini-wedding': '/images/servicos/fotografo-casamento-sao-paulo-mini-wedding.webp',
  drone: '/images/servicos/fotografo-casamento-sao-paulo-drone-imagens-aereas.webp',
};

const SERVICE_ALTS: Record<string, string> = {
  'cobertura-completa': 'Casal de noivos durante cobertura fotográfica completa de casamento em São Paulo',
  'pre-wedding': 'Casal em ensaio pré-wedding ao ar livre em São Paulo com luz natural do entardecer',
  'mini-wedding': 'Cerimônia intimista de mini wedding com poucos convidados registrada por Ivan Dias',
  drone: 'Vista aérea de casamento ao ar livre capturada por drone profissional em São Paulo',
};

const WHATSAPP_URL =
  'https://wa.me/5511953025177?text=Ol%C3%A1%20Ivan!%20Vi%20seu%20site%20e%20quero%20saber%20sobre%20fotografia%20de%20casamento.';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    keywords: pageKeywords[service.slug] ?? [],
    alternates: { canonical: `/servicos/${service.slug}/` },
    openGraph: {
      title: `${service.title} | Ivan Dias Fotografia`,
      description: service.shortDescription,
      url: `/servicos/${service.slug}/`,
      images: [{ url: '/images/hero/fotografo-casamento-sao-paulo-noivos-abraco.webp', width: 1200, height: 630, alt: 'Ivan Dias - Fotógrafo de Casamento em São Paulo' }],
    },
  };
}

export default function ServicoPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <SchemaOrg
        schema={[
          getBreadcrumbListSchema([
            { name: 'Início', url: '/' },
            { name: 'Serviços', url: '/servicos' },
            { name: service.title, url: `/servicos/${service.slug}` },
          ]),
          ...(SERVICE_FAQS[service.slug] ? [getFAQPageSchema(SERVICE_FAQS[service.slug])] : []),
        ]}
      />

      <section className="relative overflow-hidden bg-cream pb-24 pt-36 md:pb-32 md:pt-44">
        <span
          aria-hidden="true"
          className="bg-number absolute -left-10 top-10 select-none font-heading text-[14rem] leading-none md:text-[24rem]"
        >
          {service.number}
        </span>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-12">
          <div>
            <nav aria-label="Breadcrumb" className="font-body text-xs uppercase tracking-wide text-blue-deep/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-blue-accent">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/servicos/" className="hover:text-blue-accent">Serviços</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-blue-deep/80" aria-current="page">{service.title}</li>
              </ol>
            </nav>

            <h1 className="mt-6 font-heading text-4xl font-bold tracking-tightest text-blue-deep md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 font-body text-base leading-relaxed text-blue-deep/70 md:text-lg">
              {service.description}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="mt-8 inline-flex rounded-full bg-blue-accent px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible-ring"
            >
              Solicitar orçamento
            </a>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <Image
              src={SERVICE_IMAGES[service.slug] ?? '/images/servicos/fotografo-casamento-sao-paulo-cobertura-completa.webp'}
              alt={SERVICE_ALTS[service.slug] ?? `Fotografia de ${service.title} em São Paulo por Ivan Dias`}
              role="img"
              fill
              priority
              placeholder="blur"
              blurDataURL={SHIMMER_BLUR_DATA_URL}
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-deep py-24 text-cream md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h2 className="font-heading text-3xl font-bold tracking-tightest md:text-4xl">
            O que está incluso
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-cream/10 bg-cream/5 p-5 font-body text-sm text-cream/80"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-5 w-5 shrink-0 text-brown-light" aria-hidden="true">
                  <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center md:px-12">
          <h2 className="font-heading text-2xl font-bold tracking-tightest text-blue-deep md:text-3xl">
            Outros serviços
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {services
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/servicos/${item.slug}/`}
                  data-cursor-hover
                  className="rounded-full border border-blue-deep/15 px-6 py-3 font-body text-sm font-medium text-blue-deep transition-colors hover:bg-blue-deep hover:text-cream focus-visible-ring"
                >
                  {item.title}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {SERVICE_FAQS[service.slug] && (
        <section className="bg-blue-deep py-20 text-cream">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <h2 className="font-heading text-2xl font-bold tracking-tightest md:text-3xl">
              Perguntas frequentes
            </h2>
            <ServiceFAQ items={SERVICE_FAQS[service.slug]} />
          </div>
        </section>
      )}

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="font-heading text-2xl font-bold tracking-tightest text-blue-deep">
            Atendemos casamentos em toda São Paulo e ABC Paulista
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {AREA_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-blue-deep/20 px-5 py-2 font-body text-sm font-semibold text-blue-deep transition-colors hover:border-blue-accent hover:text-blue-accent"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
