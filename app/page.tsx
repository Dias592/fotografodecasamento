import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import IntroMarquee from '@/components/IntroMarquee';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import BlogGrid from '@/components/BlogGrid';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { posts } from '@/lib/posts';

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
