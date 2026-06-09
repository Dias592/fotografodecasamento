import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { getBreadcrumbListSchema } from '@/lib/schema';
import BlogGrid from '@/components/BlogGrid';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog | Dicas de Fotografia de Casamento | Ivan Dias',
  description: 'Dicas, inspirações e guias sobre fotografia de casamento em São Paulo. Tudo que você precisa saber para escolher o fotógrafo ideal para o seu grande dia.',
  alternates: { canonical: 'https://www.ivandiasfotografo.com.br/blog/' },
};

export default function BlogPage() {
  return (
    <>
      <SchemaOrg
        schema={getBreadcrumbListSchema([
          { name: 'Início', url: '/' },
          { name: 'Blog', url: '/blog' },
        ])}
      />

      <section className="bg-cream pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
            Blog
          </span>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-tightest text-blue-deep md:text-6xl">
            Histórias de casamentos pelos bairros de São Paulo
          </h1>

          <div className="mt-16">
            <BlogGrid posts={posts} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
