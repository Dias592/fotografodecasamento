import Image from 'next/image';
import Link from 'next/link';
import { Post, PostSection, posts } from '@/lib/posts';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';
import SchemaOrg from './SchemaOrg';
import { getArticleSchema, getBreadcrumbListSchema, getFAQPageSchema } from '@/lib/schema';

function SectionTable({ table }: { table: NonNullable<PostSection['table']> }) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-blue-deep/10">
      {table.caption && (
        <p className="border-b border-blue-deep/10 bg-blue-deep/5 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-blue-deep/60">
          {table.caption}
        </p>
      )}
      <table className="w-full text-left font-body text-sm">
        <thead className="bg-blue-deep/5">
          <tr>
            {table.headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-blue-deep">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-blue-deep/10 even:bg-blue-deep/[0.02]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-blue-deep/75">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticleSections({ sections }: { sections: PostSection[] }) {
  return (
    <div className="mt-12 flex flex-col gap-10">
      {sections.map((section, i) => (
        <section key={i}>
          <h2 className="font-heading text-2xl font-bold tracking-tightest text-blue-deep md:text-3xl">
            {section.h2}
          </h2>
          {section.content && (
            // Content is authored in posts.ts — never user input. Safe for dangerouslySetInnerHTML.
            <div
              className="prose-section mt-4"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
          {section.h3s && section.h3s.map((h3, j) => (
            <div key={j} className="mt-6">
              <h3 className="font-heading text-lg font-semibold text-blue-deep">{h3.title}</h3>
              <div
                className="prose-section mt-2"
                dangerouslySetInnerHTML={{ __html: h3.content }}
              />
            </div>
          ))}
          {section.table && <SectionTable table={section.table} />}
        </section>
      ))}
    </div>
  );
}

function getRelatedPosts(current: Post, count = 4): Post[] {
  const others = posts.filter((p) => p.slug !== current.slug);
  const idx = posts.findIndex((p) => p.slug === current.slug);
  const results: Post[] = [];
  for (let i = 1; results.length < count && i < others.length + 1; i++) {
    results.push(others[(idx + i) % others.length]);
  }
  return results;
}

const WHATSAPP_URL =
  'https://wa.me/5511953025177?text=Ol%C3%A1%20Ivan!%20Vi%20seu%20site%20e%20quero%20saber%20sobre%20fotografia%20de%20casamento.';

const INSTAGRAM_URL = 'https://www.instagram.com/ivandiasfotografo/';

export default function SatellitePost({ post }: { post: Post }) {
  return (
    <article className="bg-cream pb-24 pt-32 md:pb-32">
      <SchemaOrg
        schema={[
          getArticleSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            datePublished: post.date,
            dateModified: post.updatedDate,
            bairro: post.bairro,
            image: post.image,
          }),
          getBreadcrumbListSchema([
            { name: 'Início', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
          getFAQPageSchema(post.faq),
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <nav aria-label="Breadcrumb" className="font-body text-xs uppercase tracking-wide text-blue-deep/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-blue-accent">Início</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog/" className="hover:text-blue-accent">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-blue-deep/80" aria-current="page">{post.bairro}</li>
          </ol>
        </nav>

        <span className="mt-6 inline-block rounded-full bg-blue-accent px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-white">
          {post.bairro}
        </span>

        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tightest text-blue-deep md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-4 font-body text-sm text-blue-deep/70">
          <time dateTime={post.date}>
            Publicado em{' '}
            {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </time>
          {post.updatedDate && (
            <>
              {' · '}
              <time dateTime={post.updatedDate}>
                Atualizado em{' '}
                {new Date(post.updatedDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </time>
            </>
          )}
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl">
          <Image
            src={post.image}
            alt={`Fotografia de casamento em ${post.bairro} — ${post.title.slice(0, 80)}`}
            role="img"
            width={800}
            height={533}
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            placeholder="blur"
            blurDataURL={SHIMMER_BLUR_DATA_URL}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        <p className="mt-10 font-body text-lg leading-relaxed text-blue-deep/75">{post.excerpt}</p>
        <p className="mt-6 font-body text-base leading-relaxed text-blue-deep/70">{post.description}</p>

        {post.sections && <ArticleSections sections={post.sections} />}

        {!post.sections && (
          <p className="mt-6 font-body text-base leading-relaxed text-blue-deep/70">
            Se você está planejando o seu casamento em São Paulo e busca um fotógrafo que
            una sensibilidade, técnica e um olhar autoral, será um prazer conversar sobre a sua
            história e como podemos eternizá-la com imagens que você vai guardar para sempre.
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex rounded-full bg-blue-accent px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible-ring"
          >
            Conversar sobre o meu casamento
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label="Seguir Ivan Dias Fotografia no Instagram"
            className="inline-flex items-center gap-2 rounded-full border border-blue-deep/20 px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-blue-deep transition-colors hover:border-blue-accent hover:text-blue-accent focus-visible-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
            Siga no Instagram
          </a>
        </div>

        <p className="mt-4 font-body text-sm leading-relaxed text-blue-deep/55">
          Acompanhe bastidores, novos casamentos e referências de estilo no perfil{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="font-semibold text-blue-accent underline-offset-4 hover:underline"
          >
            @ivandiasfotografo
          </a>{' '}
          — é por lá que muitos casais encontram inspiração e tiram dúvidas antes de fechar a data.
        </p>

        <div className="mt-12 rounded-2xl border border-blue-deep/10 bg-white p-8">
          <h2 className="font-heading text-xl font-bold text-blue-deep">
            Conheça nossos serviços para casamentos em {post.bairro}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/servicos/cobertura-completa/" className="rounded-full bg-blue-accent px-5 py-2 font-body text-sm font-semibold text-white hover:opacity-90">Cobertura Completa</Link>
            <Link href="/servicos/pre-wedding/" className="rounded-full border border-blue-deep/20 px-5 py-2 font-body text-sm font-semibold text-blue-deep hover:border-blue-accent hover:text-blue-accent">Ensaio Pré-Wedding</Link>
            <Link href="/servicos/mini-wedding/" className="rounded-full border border-blue-deep/20 px-5 py-2 font-body text-sm font-semibold text-blue-deep hover:border-blue-accent hover:text-blue-accent">Mini Wedding</Link>
            <Link href="/servicos/drone/" className="rounded-full border border-blue-deep/20 px-5 py-2 font-body text-sm font-semibold text-blue-deep hover:border-blue-accent hover:text-blue-accent">Fotografia com Drone</Link>
          </div>
        </div>

        <h2 className="mt-16 font-heading text-2xl font-bold tracking-tightest text-blue-deep md:text-3xl">
          Perguntas frequentes
        </h2>

        <dl className="mt-8 flex flex-col gap-6">
          {post.faq.map((item) => (
            <div key={item.question} className="rounded-2xl border border-blue-deep/10 bg-white p-6">
              <dt className="font-heading text-lg font-semibold text-blue-deep">{item.question}</dt>
              <dd className="mt-2 font-body text-base leading-relaxed text-blue-deep/65">{item.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 border-t border-blue-deep/10 pt-12">
          <h2 className="font-heading text-xl font-bold tracking-tightest text-blue-deep">
            Outros bairros e regiões atendidos
          </h2>
          <p className="mt-2 font-body text-sm text-blue-deep/60">
            Ivan Dias atende casamentos em toda a Grande São Paulo. Confira mais guias por região:
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {getRelatedPosts(post).map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/blog/${related.slug}/`}
                  className="flex items-center gap-3 rounded-xl border border-blue-deep/10 bg-white p-4 transition-colors hover:border-blue-accent hover:text-blue-accent focus-visible-ring"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-blue-accent" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-body text-sm font-semibold text-blue-deep">{related.bairro}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-blue-accent hover:underline underline-offset-4 focus-visible-ring"
            >
              Ver todos os bairros
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
