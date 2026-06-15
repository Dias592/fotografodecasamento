import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/posts';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';
import SchemaOrg from './SchemaOrg';
import { getArticleSchema, getBreadcrumbListSchema, getFAQPageSchema } from '@/lib/schema';

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
            bairro: post.bairro,
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
          Publicado em{' '}
          {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl">
          <Image
            src={post.image}
            alt={`${post.title} | Ivan Dias Fotógrafo`}
            role="img"
            width={0}
            height={0}
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            placeholder="blur"
            blurDataURL={SHIMMER_BLUR_DATA_URL}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        <p className="mt-10 font-body text-lg leading-relaxed text-blue-deep/75">{post.excerpt}</p>
        <p className="mt-6 font-body text-base leading-relaxed text-blue-deep/70">{post.description}</p>
        <p className="mt-6 font-body text-base leading-relaxed text-blue-deep/70">
          Se você está planejando o seu casamento em São Paulo e busca um fotógrafo que
          una sensibilidade, técnica e um olhar autoral, será um prazer conversar sobre a sua
          história e como podemos eternizá-la com imagens que você vai guardar para sempre.
        </p>

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
      </div>
    </article>
  );
}
