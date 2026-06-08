import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { getBreadcrumbListSchema } from '@/lib/schema';
import Gallery from '@/components/Gallery';

export const metadata: Metadata = {
  title: 'Portfólio',
  description:
    'Galeria de fotografias de casamento de Ivan Dias em São Paulo: cerimônias, festas, ensaios pré-wedding e detalhes registrados com sensibilidade.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfólio | Ivan Dias Fotografia',
    description: 'Galeria de fotografias de casamento de Ivan Dias em São Paulo.',
    url: '/portfolio',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <SchemaOrg
        schema={getBreadcrumbListSchema([
          { name: 'Início', url: '/' },
          { name: 'Portfólio', url: '/portfolio' },
        ])}
      />

      <div className="bg-blue-deep pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 pb-6 md:px-12">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-brown-light">
            Galeria completa
          </span>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-tightest text-cream md:text-6xl">
            Cada imagem é um instante que não voltará a acontecer
          </h1>
        </div>
      </div>

      <Gallery />
      <Footer />
    </>
  );
}
