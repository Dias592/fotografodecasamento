import Link from 'next/link';
import { services } from '@/lib/services';
import { posts } from '@/lib/posts';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/ivandiasfotografo/' },
];

export default function Footer() {
  return (
    <footer className="bg-blue-deep py-16 text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 md:px-12">
        <div>
          <Link href="/" className="font-heading text-2xl font-extrabold italic tracking-tightest">
            Ivan Dias
          </Link>
          <p className="mt-4 max-w-xs font-body text-sm text-cream/60">
            Fotografia de casamento autoral em São Paulo. Histórias eternizadas com
            sensibilidade, técnica e emoção.
          </p>
          <div className="mt-6 flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ivan Dias no ${social.label}`}
                data-cursor-hover
                className="font-body text-sm text-cream/60 transition-colors hover:text-brown-light focus-visible-ring"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Serviços">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brown-light">
            Serviços
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/servicos/${service.slug}/`}
                  className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Bairros atendidos">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brown-light">
            Bairros
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {posts.slice(0, 6).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring"
                >
                  {post.bairro}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Casamento no Campo">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brown-light">
            No Campo
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <Link href="/blog/fotografo-de-casamento-mairipora/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Mairiporã
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-de-casamento-ribeirao-pires/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Ribeirão Pires
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-de-casamento-mogi-das-cruzes/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Mogi das Cruzes
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-casamento-grupo-quintal/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Grupo Quintal
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Casamento na Cidade">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brown-light">
            Na Cidade
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <Link href="/fotografo-de-casamento-santo-andre/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Santo André
              </Link>
            </li>
            <li>
              <Link href="/fotografo-de-casamento-sao-bernardo-do-campo/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                São Bernardo
              </Link>
            </li>
            <li>
              <Link href="/fotografo-de-casamento-sao-caetano-do-sul/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                São Caetano
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-de-casamento-osasco/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Osasco
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-casamento-grupo-welucci/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Grupo Welucci
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Casamento no Litoral">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brown-light">
            No Litoral
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <Link href="/blog/fotografo-de-casamento-guaruja/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Guarujá
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-de-casamento-ubatuba/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Ubatuba
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-de-casamento-ilhabela/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Ilhabela
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-de-casamento-santos/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Santos
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Igrejas e templos">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brown-light">
            Igrejas
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <Link href="/blog/fotografo-casamento-igreja-nossa-senhora-do-brasil/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                N. Sra. do Brasil
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-casamento-catedral-do-carmo-santo-andre/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Catedral do Carmo
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-casamento-matriz-sagrada-familia-sao-caetano/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Matriz São Caetano
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-casamento-matriz-sao-bernardo/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                Matriz São Bernardo
              </Link>
            </li>
            <li>
              <Link href="/blog/fotografo-casamento-igreja-sao-benedito-mogi/" className="font-body text-sm text-cream/85 transition-colors hover:text-cream focus-visible-ring">
                São Benedito (Mogi)
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brown-light">
            Contato
          </h2>
          <ul className="mt-5 flex flex-col gap-3 font-body text-sm text-cream/60">
            <li>
              <a href="tel:+5511953025177" className="transition-colors hover:text-cream focus-visible-ring">
                (11) 95302-5177
              </a>
            </li>
            <li>
              <a href="mailto:contato@ivandiasfotografo.com.br" className="transition-colors hover:text-cream focus-visible-ring">
                contato@ivandiasfotografo.com.br
              </a>
            </li>
            <li>São Paulo · SP · Brasil</li>
            <li>
              <Link href="/contato/" className="font-semibold text-brown-light transition-colors hover:text-cream focus-visible-ring">
                Fale comigo →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-cream/10 px-6 pt-8 md:px-12">
        <p className="font-body text-xs text-cream/60">
          © {new Date().getFullYear()} Ivan Dias Fotografia. Todos os direitos reservados.
        </p>
        <div className="mt-4 border-t border-cream/10 pt-4 text-center">
          <span className="font-body text-xs text-cream/60">Outros serviços: </span>
          <a href="https://pixiformaturas.com.br" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-cream/85 transition-colors hover:text-cream">Pixi Formaturas</a>
          <span className="font-body text-xs text-cream/60"> · </span>
          <a href="https://ivandiasfoto.com.br" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-cream/85 transition-colors hover:text-cream">Ivan Dias Corporativo</a>
        </div>
      </div>
    </footer>
  );
}
