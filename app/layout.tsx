import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import PageTransition from '@/components/PageTransition';
import SchemaOrg from '@/components/SchemaOrg';
import { getLocalBusinessSchema, getPersonSchema, getWebSiteSchema } from '@/lib/schema';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
});

const SITE_URL = 'https://www.ivandiasfotografo.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ivan Dias | Fotógrafo de Casamento em São Paulo',
    template: '%s | Ivan Dias Fotografia',
  },
  description:
    'Ivan Dias é fotógrafo de casamento em São Paulo, com mais de 15 anos de experiência registrando histórias de amor em locações como Itaim Bibi, Jardins, Moema e outros bairros da capital paulista.',
  keywords: [
    'fotógrafo de casamento em São Paulo',
    'fotografia de casamento',
    'pré-wedding São Paulo',
    'fotógrafo de casamento Itaim Bibi',
  ],
  authors: [{ name: 'Ivan Dias' }],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/images/logo/ivan-dias-favicon.png',
    shortcut: '/images/logo/ivan-dias-favicon.png',
    apple: '/images/logo/ivan-dias-favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Ivan Dias Fotografia',
    title: 'Ivan Dias | Fotógrafo de Casamento em São Paulo',
    description:
      'Fotografia de casamento autoral e cheia de emoção. Mais de 700 casamentos registrados em São Paulo e região.',
    images: [
      {
        url: `${SITE_URL}/images/hero/fotografo-casamento-sao-paulo-noivos-abraco.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ivan Dias Fotografia de Casamento',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivan Dias | Fotógrafo de Casamento em São Paulo',
    description:
      'Fotografia de casamento autoral e cheia de emoção em São Paulo. Conheça o trabalho de Ivan Dias.',
    images: [`${SITE_URL}/images/hero/fotografo-casamento-sao-paulo-noivos-abraco.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-body antialiased">
        <SchemaOrg schema={[getLocalBusinessSchema(), getPersonSchema(), getWebSiteSchema()]} />
        <a href="#main-content" className="skip-link font-body text-sm font-semibold">
          Pular para o conteúdo principal
        </a>
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
