import { FAQ } from './posts';

const SITE_URL = 'https://www.ivandiasfotografo.com.br';
const PHONE = '+55-11-95302-5177';

export const BAIRROS_ATENDIDOS = [
  'Itaim Bibi',
  'Jardins',
  'Moema',
  'Pinheiros',
  'Vila Mariana',
  'Perdizes',
  'Tatuapé',
  'Santana',
];

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Ivan Dias Fotografia',
    image: `${SITE_URL}/images/ivan-dias.jpg`,
    url: SITE_URL,
    telephone: PHONE,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    areaServed: BAIRROS_ATENDIDOS.map((bairro) => ({
      '@type': 'Place',
      name: bairro,
    })),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.5613,
      longitude: -46.6563,
    },
  };
}

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Ivan Dias',
    jobTitle: 'Fotógrafo de Casamento',
    url: `${SITE_URL}/sobre`,
    image: `${SITE_URL}/images/ivan-dias.jpg`,
    worksFor: {
      '@type': 'Organization',
      name: 'Ivan Dias Fotografia',
    },
    knowsAbout: [
      'Fotografia de casamento',
      'Fotografia de retrato',
      'Pré-wedding',
      'Fotografia aérea com drone',
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Ivan Dias | Fotógrafo de Casamento em São Paulo',
    url: SITE_URL,
    inLanguage: 'pt-BR',
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
  };
}

export function getFAQPageSchema(faq: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function getArticleSchema(options: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  bairro: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    datePublished: options.datePublished,
    dateModified: options.datePublished,
    author: {
      '@id': `${SITE_URL}/#person`,
    },
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
    about: {
      '@type': 'Place',
      name: options.bairro,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${options.slug}`,
    },
  };
}
