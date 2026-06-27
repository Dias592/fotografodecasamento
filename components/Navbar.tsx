'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { href: '/sobre/', label: 'Sobre' },
  { href: '/servicos/', label: 'Serviços' },
  { href: '/portfolio/', label: 'Portfólio' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contato/', label: 'Contato' },
];

const WHATSAPP_URL =
  'https://wa.me/5511953025177?text=Ol%C3%A1%20Ivan!%20Vi%20seu%20site%20e%20quero%20saber%20sobre%20fotografia%20de%20casamento.';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prevScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > prevScroll.current && y > 120);
      setScrolled(y > 40);
      prevScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-blue-deep/80 backdrop-blur-md transition-all duration-300 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'shadow-lg shadow-black/10' : ''}`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12"
      >
        <Link
          href="/"
          aria-label="Ivan Dias Fotografia, página inicial"
          data-cursor-hover
          className="font-heading text-xl font-extrabold italic tracking-tightest text-cream md:text-2xl"
        >
          Ivan Dias
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-cursor-hover
                className="font-body text-sm font-medium uppercase tracking-wide text-cream/80 transition-colors hover:text-brown-light focus-visible-ring"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label="Falar com Ivan Dias pelo WhatsApp"
            className="rounded-full bg-blue-accent px-6 py-2.5 font-body text-sm font-semibold text-white transition-transform hover:scale-105 focus-visible-ring"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden focus-visible-ring"
        >
          <span
            className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span className={`h-0.5 w-6 bg-cream transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-blue-deep px-6 transition-all duration-300 ease-out md:hidden ${
          open ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-body text-lg font-medium text-cream/90 focus-visible-ring"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-full bg-blue-accent px-6 py-3 font-body text-sm font-semibold text-white"
            >
              Falar no WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
