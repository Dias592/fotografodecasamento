import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { getBreadcrumbListSchema } from '@/lib/schema';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contato | Ivan Dias Fotógrafo de Casamento SP',
  description: 'Fale com Ivan Dias para orçamento de fotografia de casamento em São Paulo. WhatsApp (11) 95302-5177. Atendimento personalizado para cada casal.',
  alternates: { canonical: 'https://ivandiasfotografo.com.br/contato/' },
  openGraph: { url: '/contato/', images: [{ url: '/images/hero/fotografo-casamento-sao-paulo-noivos-abraco.webp', width: 1200, height: 630, alt: 'Ivan Dias - Fotógrafo de Casamento em São Paulo' }] },
};

const WHATSAPP_URL =
  'https://wa.me/5511953025177?text=Ol%C3%A1%20Ivan!%20Vi%20seu%20site%20e%20quero%20saber%20sobre%20fotografia%20de%20casamento.';

export default function ContatoPage() {
  return (
    <>
      <SchemaOrg
        schema={getBreadcrumbListSchema([
          { name: 'Início', url: '/' },
          { name: 'Contato', url: '/contato/' },
        ])}
      />

      <section className="relative overflow-hidden bg-blue-deep pb-24 pt-36 text-cream md:pb-32 md:pt-44">
        <span
          aria-hidden="true"
          className="bg-number absolute -right-16 top-0 select-none font-heading text-[14rem] leading-none text-cream md:text-[22rem]"
        >
          09
        </span>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-[1fr_1.1fr] md:px-12">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-brown-light">
              Contato
            </span>
            <h1 className="mt-4 font-heading text-4xl font-black italic tracking-tightest md:text-6xl">
              Vamos conversar sobre o seu grande dia?
            </h1>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-cream/70 md:text-lg">
              Preencha o formulário ou me chame diretamente no WhatsApp. Vou responder
              o mais breve possível para conhecer um pouco da sua história.
            </p>

            <div className="mt-8 flex flex-col gap-4 font-body text-sm text-cream/70">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cursor-hover className="inline-flex w-fit items-center gap-3 rounded-full bg-blue-accent px-6 py-3 font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible-ring">
                Falar no WhatsApp
              </a>
              <address
                itemScope
                itemType="https://schema.org/LocalBusiness"
                className="not-italic flex flex-col gap-2"
              >
                <span itemProp="name" className="sr-only">Ivan Dias Fotografo - Fotografo de Casamento</span>
                <a itemProp="telephone" href="tel:+5511953025177" className="hover:text-cream focus-visible-ring">(11) 95302-5177</a>
                <a href="mailto:contato@ivandiasfotografo.com.br" className="hover:text-cream focus-visible-ring">contato@ivandiasfotografo.com.br</a>
                <span
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                  className="flex flex-col gap-1"
                >
                  <span itemProp="streetAddress">Av. Ibirapuera, 2033</span>
                  <span>
                    <span itemProp="addressLocality">Moema, São Paulo</span>
                    {' — '}
                    <span itemProp="addressRegion">SP</span>
                    {', '}
                    <span itemProp="postalCode">04029-901</span>
                  </span>
                  <span itemProp="addressCountry" className="sr-only">BR</span>
                </span>
                <p className="mt-1">Atendimento em toda a Grande São Paulo</p>
              </address>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-cream/10">
              <iframe
                title="Mapa de localização do atendimento de Ivan Dias Fotografia em São Paulo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58479.99!2d-46.6563!3d-23.5613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQwLjciUyA0NsKwMzknMjIuNyJX!5e0!3m2!1spt-BR!2sbr"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-cream/10 bg-cream/5 p-8 backdrop-blur-sm md:p-10">
            <h2 className="font-heading text-xl font-bold md:text-2xl">Envie uma mensagem</h2>
            <div className="mt-8">
              <ContactForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
