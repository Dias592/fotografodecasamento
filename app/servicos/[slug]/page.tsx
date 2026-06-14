import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { getBreadcrumbListSchema } from '@/lib/schema';
import { getServiceBySlug, services } from '@/lib/services';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

const SERVICE_IMAGES: Record<string, string> = {
  'cobertura-completa': '/images/servicos/fotografo-casamento-sao-paulo-cobertura-completa.jpg',
  'pre-wedding': '/images/servicos/fotografo-casamento-sao-paulo-pre-wedding.jpg',
  'mini-wedding': '/images/servicos/fotografo-casamento-sao-paulo-mini-wedding.jpg',
  drone: '/images/servicos/fotografo-casamento-sao-paulo-drone-imagens-aereas.jpg',
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
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: {
      title: `${service.title} | Ivan Dias Fotografia`,
      description: service.shortDescription,
      url: `/servicos/${service.slug}`,
    },
  };
}

export default function ServicoPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <SchemaOrg
        schema={getBreadcrumbListSchema([
          { name: 'Início', url: '/' },
          { name: 'Serviços', url: '/servicos' },
          { name: service.title, url: `/servicos/${service.slug}` },
        ])}
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
            <nav aria-label="Breadcrumb" className="font-body text-xs uppercase tracking-wide text-blue-deep/50">
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
              src={SERVICE_IMAGES[service.slug] ?? '/images/servicos/fotografo-casamento-sao-paulo-cobertura-completa.jpg'}
              alt={`Fotografia ilustrativa do serviço ${service.title} oferecido por Ivan Dias`}
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

      <Footer />
    </>
  );
}
