import { services } from '@/lib/services';

export default function IntroMarquee() {
  const items = [...services.map((s) => s.title), ...services.map((s) => s.title)];

  return (
    <div className="overflow-hidden border-y border-cream/10 bg-blue-deep py-8" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-12">
        {[...items, ...items].map((title, index) => (
          <span
            key={`${title}-${index}`}
            className="flex items-center gap-12 font-heading text-3xl font-bold uppercase italic tracking-tightest text-cream/15 md:text-5xl"
          >
            {title}
            <span className="text-brown-light/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
