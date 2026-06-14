import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { getBreadcrumbListSchema } from '@/lib/schema';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Serviços | Ivan Dias Fotógrafo de Casamento SP',
  description: 'Conheça os serviços de Ivan Dias: fotografia de casamento, pré-wedding, mini wedding e ensaios de casal em São Paulo e região.',
  alternates: { canonical: 'https://www.ivandiasfotografo.com.br/servicos/' },
};

export default function ServicosPage() {
  return (
    <>
      <SchemaOrg
        schema={getBreadcrumbListSchema([
          { name: 'Início', url: '/' },
          { name: 'Serviços', url: '/servicos' },
        ])}
      />

      <section className="relative bg-cream pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
            Serviços
          </span>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tightest text-blue-deep md:text-6xl">
            Pacotes pensados para registrar cada fase da sua celebração
          </h1>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/servicos/${service.slug}/`}
                data-cursor-hover
                className={`group relative overflow-hidden rounded-3xl border border-blue-deep/10 bg-white p-8 transition-transform duration-500 hover:scale-[1.02] focus-visible-ring md:p-10 ${
                  index % 2 === 1 ? 'md:translate-y-10' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-4 -top-6 select-none font-heading text-7xl font-black text-blue-accent/10 transition-colors duration-500 group-hover:text-blue-accent/20 md:text-8xl"
                >
                  {service.number}
                </span>
                <h2 className="font-heading text-2xl font-bold tracking-tightest text-blue-deep">
                  {service.title}
                </h2>
                <p className="mt-3 font-body text-base text-blue-deep/65">{service.shortDescription}</p>
                <ul className="mt-6 flex flex-col gap-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 font-body text-sm text-blue-deep/60">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brown-light" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-blue-accent">
                  Ver detalhes
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
