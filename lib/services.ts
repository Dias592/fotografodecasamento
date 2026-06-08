export type Service = {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  icon: 'camera' | 'heart' | 'sparkles' | 'drone';
};

export const services: Service[] = [
  {
    id: 'cobertura-completa',
    slug: 'cobertura-completa',
    number: '01',
    title: 'Cobertura Completa',
    shortDescription: 'Do making of à festa, cada instante registrado com sensibilidade — em foto e vídeo.',
    description:
      'Fotografar um casamento é eternizar a união de duas vidas em um dia repleto de romantismo, elegância e celebração. Para nós, cada detalhe importa — desde os olhares cheios de amor até os momentos mais sutis que traduzem a suavidade e o requinte dessa ocasião única. A cobertura completa acompanha o making of da noiva e do noivo, a cerimônia e toda a recepção, sempre com uma equipe dedicada a registrar a essência da sua história de forma autêntica e sofisticada.',
    features: [
      'Making of completo da noiva e do noivo',
      'Cobertura integral da cerimônia e da recepção',
      'Equipe com fotógrafos e cinegrafistas dedicados ao evento',
      'Galeria digital com fotos tratadas em altíssima resolução',
      'Vídeo do casamento entregue em alta resolução',
      'Álbum fotográfico impresso com identidade exclusiva criada por nossa designer',
    ],
    icon: 'camera',
  },
  {
    id: 'pre-wedding',
    slug: 'pre-wedding',
    number: '02',
    title: 'Pré-Wedding',
    shortDescription: 'Liberdade, conexão e aventura registradas antes do grande dia.',
    description:
      'Quando realizamos ensaios com vocês, buscamos mais do que poses — buscamos capturar a liberdade, a conexão e a aventura que definem a relação de vocês. Gostamos de trabalhar ao ar livre, em cenários que trazem autenticidade e permitem que cada momento flua naturalmente: um parque, a praia ou um ambiente mais aventureiro escolhido a dois. O resultado é um ensaio descontraído e espontâneo, que reflete a história única que vocês carregam — e que ainda rende ótimas imagens para o convite e a decoração da festa.',
    features: [
      'Sessão externa em locação escolhida pelo casal',
      'Acompanhamento para até 3 looks diferentes',
      'Direção fotográfica leve, espontânea e sem poses forçadas',
      'Cobertura em foto e vídeo',
      'Galeria online para visualização e download em alta resolução',
      'Possibilidade de álbum exclusivo com identidade gráfica criada por nossa designer',
    ],
    icon: 'heart',
  },
  {
    id: 'mini-wedding',
    slug: 'mini-wedding',
    number: '03',
    title: 'Mini Wedding',
    shortDescription: 'Celebrações intimistas, com até 80 convidados, registradas com o mesmo cuidado de uma grande festa.',
    description:
      'Este é um formato pensado para celebrar o amor de forma intimista e inesquecível — com até 80 convidados, reunindo apenas as pessoas mais especiais para viver esse momento ao lado do casal. A cobertura acompanha o making of da noiva, a cerimônia e a recepção, garantindo que cada gesto, abraço e olhar entre os convidados mais queridos seja eternizado com a mesma sensibilidade de uma grande celebração.',
    features: [
      'Making of da noiva, cerimônia e recepção',
      'Equipe dedicada com fotógrafo e cinegrafista',
      'Galeria digital com fotos tratadas em alta resolução',
      'Vídeo do casamento em alta resolução',
      'Álbum fotográfico impresso com identidade exclusiva',
      'Formato pensado para celebrações de até 80 convidados',
    ],
    icon: 'sparkles',
  },
  {
    id: 'drone',
    slug: 'drone',
    number: '04',
    title: 'Drone',
    shortDescription: 'Perspectivas aéreas que elevam a narrativa visual do seu casamento ou ensaio.',
    description:
      'Imagens aéreas adicionam escala e grandiosidade à história do seu casamento. Esse complemento pode ser somado tanto ao ensaio pré-wedding quanto à cobertura do grande dia, trazendo ângulos exclusivos da locação, da cerimônia ao ar livre e de momentos únicos vistos de cima — uma camada a mais de emoção para a sua narrativa visual.',
    features: [
      'Imagens aéreas para ensaios e para o dia do casamento',
      'Sobrevoo da locação e dos arredores',
      'Ângulos exclusivos da cerimônia e da celebração',
      'Integração com a cobertura fotográfica e em vídeo do evento',
      'Planejamento prévio de rota e segurança do voo',
      'Entrega das imagens aéreas junto da galeria do evento',
    ],
    icon: 'drone',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
