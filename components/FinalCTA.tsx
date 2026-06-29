import ContactForm from './ContactForm';

const WHATSAPP_URL =
  'https://wa.me/5511953025177?text=Ol%C3%A1%20Ivan!%20Vi%20seu%20site%20e%20quero%20saber%20sobre%20fotografia%20de%20casamento.';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-blue-deep py-24 md:py-32" id="contato-preview">
      <span
        aria-hidden="true"
        className="bg-number absolute -bottom-20 -left-10 select-none font-heading text-[14rem] leading-none text-cream md:text-[22rem]"
      >
        08
      </span>

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-12">
        <h2 className="font-heading text-[clamp(2.25rem,7vw,5rem)] font-black italic leading-[0.98] tracking-tightest text-cream">
          Vamos contar a <span className="text-gradient-gold not-italic">sua</span> história juntos?
        </h2>

        <div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="mt-10 inline-flex rounded-full bg-blue-accent px-10 py-4 font-body text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible-ring"
          >
            Falar com Ivan agora
          </a>
        </div>

        <div className="mt-16 rounded-3xl border border-cream/10 bg-cream/5 p-8 text-left backdrop-blur-sm md:p-12">
          <h3 className="font-heading text-xl font-bold text-cream md:text-2xl">
            Ou conte um pouco sobre o seu casamento
          </h3>
          <div className="mt-8">
            <ContactForm variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
