'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

const WHATSAPP_URL =
  'https://wa.me/5511953025177?text=Ol%C3%A1%20Ivan!%20Vi%20seu%20site%20e%20quero%20saber%20sobre%20fotografia%20de%20casamento.';

const STATS = [
  { value: 700, suffix: '+', label: 'Casamentos registrados' },
  { value: 15, suffix: '+', label: 'Anos de experiência' },
  { value: 5, suffix: '★', label: 'Avaliação dos casais' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-heading text-4xl font-extrabold text-cream md:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      className="relative grid min-h-screen grid-cols-1 overflow-hidden bg-blue-deep pt-28 md:grid-cols-[1.1fr_1fr] md:pt-0"
      style={{
        gridTemplateAreas: "'content image'",
      }}
    >
      <span
        aria-hidden="true"
        className="bg-number pointer-events-none absolute -left-10 top-10 select-none font-heading text-[14rem] leading-none text-cream opacity-[0.05] md:text-[26rem]"
      >
        01
      </span>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col justify-center px-6 pb-36 pt-10 md:px-16 md:pb-44 md:pt-0"
        style={{ gridArea: 'content' }}
      >
        <motion.span
          variants={itemVariants}
          className="mb-6 inline-block w-fit rounded-full border border-brown-light/40 px-4 py-1.5 font-body text-[10px] font-medium uppercase tracking-[0.15em] text-brown-light md:text-xs md:tracking-[0.2em]"
        >
          Fotógrafo de casamento · SP
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-[clamp(2.75rem,9vw,8rem)] font-black italic leading-[0.95] tracking-tightest text-cream"
        >
          Fotografia
          <br />
          que conta a{' '}
          <span className="text-gradient-gold not-italic">sua</span>
          <br />
          história
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-md font-body text-base text-cream/70 md:text-lg"
        >
          Registros autorais e cheios de emoção, eternizando os instantes mais
          importantes do seu casamento em São Paulo e região.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/portfolio"
            data-cursor-hover
            className="rounded-full bg-cream px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-blue-deep transition-transform hover:scale-105 focus-visible-ring"
          >
            Ver Portfólio
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label="Conversar com Ivan Dias no WhatsApp"
            className="rounded-full border border-cream/30 px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-cream/10 focus-visible-ring"
          >
            WhatsApp
          </a>
        </motion.div>

        {/* Foto hero visível apenas no mobile */}
        <motion.div
          variants={itemVariants}
          className="mt-10 overflow-hidden rounded-2xl md:hidden"
        >
          <Image
            src="/images/hero/fotografo-casamento-sao-paulo-noivos-igreja-flores.jpg"
            alt="Noivos se abraçando em frente à igreja decorada com flores durante casamento em São Paulo"
            width={0}
            height={0}
            priority
            placeholder="blur"
            blurDataURL={SHIMMER_BLUR_DATA_URL}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="rounded-2xl"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8 md:max-w-lg"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-1 font-body text-xs text-cream/50 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div
        className="relative hidden overflow-hidden md:block"
        style={{ gridArea: 'image' }}
        aria-hidden="false"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
          <Image
            src="/images/hero/fotografo-casamento-sao-paulo-noivos-igreja-flores.jpg"
            alt="Noivos se abraçando em frente à igreja decorada com flores durante casamento em São Paulo"
            role="img"
            fill
            priority
            placeholder="blur"
            blurDataURL={SHIMMER_BLUR_DATA_URL}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-deep/60 via-transparent to-blue-deep/20" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-10 left-10 right-10 overflow-hidden rounded-2xl border border-cream/20 bg-blue-deep/40 p-6 backdrop-blur-md"
        >
          <Image
            src="/images/hero/fotografo-casamento-sao-paulo-detalhe-aliancas.jpg"
            alt="Detalhe das alianças e buquê de flores em mesa decorada de casamento"
            role="img"
            width={64}
            height={64}
            placeholder="blur"
            blurDataURL={SHIMMER_BLUR_DATA_URL}
            className="rounded-full border-2 border-brown-light object-cover"
          />
          <p className="mt-4 font-heading text-sm font-semibold italic text-cream">
            &ldquo;Cada imagem carrega o sentimento exato daquele instante.&rdquo;
          </p>
        </motion.div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 100"
        className="absolute bottom-0 left-0 z-10 w-full text-cream"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
          fill="currentColor"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </section>
  );
}
