import { FAQ } from './posts';

const SITE_URL = 'https://ivandiasfotografo.com.br';
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
    '@type': ['LocalBusiness', 'PhotographyBusiness'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Ivan Dias Fotógrafo',
    description: 'Fotógrafo de casamento em São Paulo especializado em pré-wedding, mini wedding e destination weddings.',
    url: SITE_URL,
    image: `${SITE_URL}/images/logo/ivan-dias-logo-preto.png`,
    telephone: PHONE,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Ibirapuera, 2033',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '04029-901',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.55052,
      longitude: -46.633308,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    areaServed: BAIRROS_ATENDIDOS.map((bairro) => ({
      '@type': 'Place',
      name: bairro,
    })),
    sameAs: [
      'https://www.instagram.com/ivandiasfotografo',
      'https://www.facebook.com/ivandiasfotografo',
    ],
  };
}

export function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fotografia de Casamento em São Paulo',
    serviceType: 'Fotografia de Casamento',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Ivan Dias Fotógrafo',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: 'São Paulo, Brasil',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/servicos/`,
      priceCurrency: 'BRL',
      description: 'Cobertura completa de fotografia de casamento em São Paulo e região.',
    },
  };
}

export function getContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SITE_URL}/contato/`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Ivan Dias Fotógrafo',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: PHONE,
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
      },
    },
  };
}

export function getBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    url: `${SITE_URL}/blog`,
    name: 'Blog Ivan Dias Fotógrafo',
    description: 'Dicas, inspirações e informações sobre fotografia de casamento em São Paulo e região.',
    publisher: {
      '@type': 'Organization',
      name: 'Ivan Dias Fotógrafo',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo/ivan-dias-logo-preto.png`,
      },
    },
  };
}

export function getHomeFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qual é o prazo de entrega das fotos de casamento?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O prazo médio é de 30 a 60 dias após o casamento, dependendo do pacote contratado. Todas as fotos são entregues em alta resolução.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ivan Dias faz backup das fotos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim, todas as fotos são armazenadas em múltiplos backups durante e após o evento, garantindo a segurança dos seus registros.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quais tipos de casamento você fotografa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fotografo casamentos tradicionais, mini weddings, pré-weddings, destination weddings e bodas de ouro. Atendo São Paulo e toda a região, além de destinos nacionais.',
        },
      },
      {
        '@type': 'Question',
        name: 'Com quanto tempo de antecedência devo contratar o fotógrafo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O ideal é contratar com 8 a 12 meses de antecedência para garantir a disponibilidade na sua data, especialmente entre outubro e dezembro.',
        },
      },
    ],
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
    image: `${SITE_URL}/images/ivan-dias.webp`,
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
    sameAs: [
      'https://www.instagram.com/ivandiasfotografo',
      'https://www.facebook.com/ivandiasfotografo',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Ibirapuera, 2033',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '04029-901',
      addressCountry: 'BR',
    },
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
  dateModified?: string;
  bairro: string;
  image: string;
}) {
  const published = options.datePublished.includes('T')
    ? options.datePublished
    : `${options.datePublished}T00:00:00-03:00`;
  const modified = options.dateModified
    ? options.dateModified.includes('T')
      ? options.dateModified
      : `${options.dateModified}T00:00:00-03:00`
    : published;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.title.slice(0, 110),
    description: options.description,
    datePublished: published,
    dateModified: modified,
    author: {
      '@type': 'Person',
      name: 'Ivan Dias',
      url: `${SITE_URL}/sobre/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ivan Dias Fotógrafo',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo/ivan-dias-logo-preto.png`,
      },
    },
    image: [`${SITE_URL}${options.image}`],
    url: `${SITE_URL}/blog/${options.slug}/`,
    about: {
      '@type': 'Place',
      name: options.bairro,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${options.slug}/`,
    },
  };
}
