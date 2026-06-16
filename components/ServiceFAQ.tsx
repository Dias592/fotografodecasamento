'use client';
import { useState } from 'react';

interface FAQItem { question: string; answer: string; }

interface Props {
  items: FAQItem[];
  variant?: 'dark' | 'light';
}

export default function ServiceFAQ({ items, variant = 'dark' }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const isLight = variant === 'light';
  const wrapClass = isLight
    ? 'rounded-2xl border border-blue-deep/10 bg-white shadow-sm'
    : 'rounded-2xl border border-cream/10 bg-cream/5';
  const btnClass = isLight
    ? 'flex w-full items-center justify-between p-6 text-left font-heading text-base font-semibold text-blue-deep focus-visible-ring'
    : 'flex w-full items-center justify-between p-6 text-left font-heading text-base font-semibold text-cream focus-visible-ring';
  const answerClass = isLight
    ? 'px-6 pb-6 font-body text-base leading-relaxed text-blue-deep/70'
    : 'px-6 pb-6 font-body text-base leading-relaxed text-cream/70';

  return (
    <dl className="mt-8 flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className={wrapClass}>
          <dt>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className={btnClass}
              aria-expanded={open === i}
            >
              {item.question}
              <span className={`ml-4 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} aria-hidden="true">▾</span>
            </button>
          </dt>
          {open === i && (
            <dd className={answerClass}>
              {item.answer}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
