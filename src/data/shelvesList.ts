// Estantes: seleções de posts. Cada item aponta para um post (slug), para uma URL externa,
// ou é só um item sem link (ex.: conhecimentos). Itens que não são posts podem ter ícone (`icon`);
// posts usam a miniatura do próprio post.
export type ShelfLink =
  | { slug: string; title?: string }
  | { url: string; title: string; icon?: string }
  | { title: string; icon?: string }

export type Shelf = {
  title: string
  description: string
  links: ShelfLink[]
}

export const shelvesList: Shelf[] = [
  {
    title: 'Certificados',
    description:
      'Certificados de cursos que concluí em plataformas como Coursera, Alura, DIO e outras.',
    links: [
      {
        title: 'Google UX Design',
        url: 'https://www.coursera.org/account/accomplishments/specialization/MDKIHPYAS1E3',
        icon: '/images/ux-design.svg',
      },
      {
        title: 'Google AI',
        url: 'https://www.coursera.org/account/accomplishments/specialization/AQJWXTF8YNDM',
        icon: '/images/google-ai.svg',
      },
    ],
  },
  {
    title: 'Conhecimentos',
    description: 'As tecnologias e competências que eu Domino.',
    links: [
      // Desenvolvimento
      { title: 'JavaScript', icon: '/images/js.svg' },
      { title: 'TypeScript', icon: '/images/ts.svg' },
      { title: 'React.js', icon: '/images/react.svg' },
      { title: 'Next.js', icon: '/images/nextjs.svg' },
      { title: 'Node.js', icon: '/images/node.svg' },
      { title: 'PHP', icon: '/images/php.svg' },
      { title: 'WordPress', icon: '/images/wordpress.svg' },
      { title: 'Firebase', icon: '/images/firebase.svg' },
      { title: 'Supabase', icon: '/images/supabase.svg' },
      { title: 'FlutterFlow', icon: '/images/flutterflow.svg' },
      { title: 'AppSheet', icon: '/images/appsheet.svg' },
      { title: 'Inteligência artificial', icon: '/images/google-ai.svg' },
    ],
  },
  {
    title: 'Formação acadêmica',
    description: 'Minha formação em Ciência da Computação.',
    links: [
      {
        title: 'Bacharelado em Ciência da Computação · PUC Goiás (2019)',
        icon: '/images/puc-goias.svg',
      },
    ],
  },
  // {
  //   title: 'Automação',
  //   description: 'Fluxos, integrações e chatbots: como tirar trabalho repetitivo das costas das pessoas.',
  //   links: [{ slug: '/automatizando-com-n8n' }, { slug: '/webhooks-na-pratica' }],
  // },
  // {
  //   title: 'Mão na massa',
  //   description: 'Projetos construídos do zero para entender como as coisas funcionam por dentro.',
  //   links: [{ slug: '/webhooks-na-pratica' }, { title: 'Documentação do N8N', url: 'https://docs.n8n.io' }],
  // },
  // {
  //   title: 'Fora do expediente',
  //   description: 'Textos que não são sobre programação: carreira, aprendizado e o que mais der vontade.',
  //   links: [{ slug: '/ola-mundo' }],
  // },
]
