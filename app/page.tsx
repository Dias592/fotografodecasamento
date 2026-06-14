import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import IntroMarquee from '@/components/IntroMarquee';
import About from '@/components/About';
import SchemaOrg from '@/components/SchemaOrg';
import { getHomeFAQSchema } from '@/lib/schema';
import { posts } from '@/lib/posts';

// Componentes abaixo do fold — carregados de forma lazy (code splitting)
const Portfolio = dynamic(() => import('@/components/Portfolio'), { ssr: true });
const Services = dynamic(() => import('@/components/Services'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true });
const BlogGrid = dynamic(() => import('@/components/BlogGrid'), { ssr: true });
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

export const metadata: Metadata = {
  title: 'Ivan Dias | Fotógrafo de Casamento em São Paulo',
  description:
    'Fotografia de casamento autoral em São Paulo. Mais de 700 casamentos registrados, 15 anos de experiência e cobertura completa, pré-wedding, mini wedding e drone.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Ivan Dias | Fotógrafo de Casamento em São Paulo',
    description:
      'Fotografia de casamento autoral em São Paulo. Conheça o trabalho de Ivan Dias e agende sua sessão.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={getHomeFAQSchema()} />
      <Hero />
      <IntroMarquee />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />

      <section className="bg-cream py-24 md:py-32" id="blog-preview">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-blue-accent">
            Blog
          </span>
          <h2 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-tightest text-blue-deep md:text-5xl">
            Histórias de casamentos por bairro de São Paulo
          </h2>
          <div className="mt-14">
            <BlogGrid posts={posts} limit={3} />
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </>
  );
}
