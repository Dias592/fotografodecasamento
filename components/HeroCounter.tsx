'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 700, suffix: '+', label: 'Casamentos registrados' },
  { value: 15, suffix: '+', label: 'Anos de experiência' },
  { value: 5, suffix: '★', label: 'Avaliação dos casais' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setHasAnimated(true);
        const from = Math.round(value * 0.7);
        setCount(from);
        let raf: number;
        const duration = 800;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(from + eased * (value - from)));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="font-heading text-4xl font-extrabold text-cream md:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

export default function HeroStats() {
  return (
    <div className="hero-item mt-16 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8 md:max-w-lg">
      {STATS.map((stat) => (
        <div key={stat.label}>
          <Counter value={stat.value} suffix={stat.suffix} />
          <p className="mt-1 font-body text-xs text-cream/70 md:text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
