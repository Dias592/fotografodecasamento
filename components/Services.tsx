import Link from 'next/link';
import { services } from '@/lib/services';

const ICONS: Record<string, JSX.Element> = {
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-8 w-8">
      <path d="M3 7h3l2-2h8l2 2h3v12H3V7z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-8 w-8">
      <path
        d="M12 21s-7-4.45-9.5-9C1 8.5 2.5 5 6 5c2 0 3.5 1 4 2 0.5-1 2-2 4-2 3.5 0 5 3.5 3.5 7-2.5 4.55-9.5 9-9.5 9z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-8 w-8">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" strokeLinecap="round" />
    </svg>
  ),
  drone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-8 w-8">
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 9 4 4M15 9l5-5M9 15l-5 5M15 15l5 5" strokeLinecap="round" />
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="20" cy="4" r="1.5" />
      <circle cx="4" cy="20" r="1.5" />
      <circle cx="20" cy="20" r="1.5" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section className="relative bg-cream py-24 md:py-32" id="servicos-preview">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-2xl">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
            O que eu faço
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tightest text-blue-deep md:text-5xl">
            Serviços pensados para cada momento da sua celebração
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-3xl border border-blue-deep/10 bg-white p-8 transition-transform duration-500 hover:scale-[1.02] md:p-10 ${
                index % 2 === 1 ? 'md:translate-y-10' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute -right-4 -top-6 select-none font-heading text-7xl font-black text-blue-accent/10 transition-colors duration-500 group-hover:text-blue-accent/20 md:text-8xl"
              >
                {service.number}
              </span>

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-accent/10 text-blue-accent">
                  {ICONS[service.icon]}
                </div>

                <h3 className="mt-6 font-heading text-2xl font-bold tracking-tightest text-blue-deep">
                  {service.title}
                </h3>
                <p className="mt-3 font-body text-base text-blue-deep/70">{service.shortDescription}</p>

                <Link
                  href={`/servicos/${service.slug}/`}
                  data-cursor-hover
                  aria-label={`Saiba mais sobre o serviço ${service.title}`}
                  className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-blue-accent transition-colors hover:text-brown-warm focus-visible-ring"
                >
                  Saiba mais
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
