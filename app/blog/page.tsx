import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { getBreadcrumbListSchema } from '@/lib/schema';
import BlogGrid from '@/components/BlogGrid';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artigos sobre fotografia de casamento por bairro de São Paulo: Itaim Bibi, Jardins, Moema, Pinheiros, Vila Mariana, Perdizes, Tatuapé e Santana.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Ivan Dias Fotografia',
    description: 'Artigos sobre fotografia de casamento por bairro de São Paulo.',
    url: '/blog',
  },
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
