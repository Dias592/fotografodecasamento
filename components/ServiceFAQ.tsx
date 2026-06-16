'use client';
import { useState } from 'react';

interface FAQItem { question: string; answer: string; }

export default function ServiceFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <dl className="mt-8 flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-cream/10 bg-cream/5">
          <dt>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between p-6 text-left font-heading text-base font-semibold text-cream focus-visible-ring"
              aria-expanded={open === i}
            >
              {item.question}
              <span className={`ml-4 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} aria-hidden="true">▾</span>
            </button>
          </dt>
          {open === i && (
            <dd className="px-6 pb-6 font-body text-base leading-relaxed text-cream/70">
              {item.answer}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
