// Habilidades: grupos de tecnologias, certificados e formação. Cada item aponta para um post (slug),
// para uma URL externa, ou é só um item sem link (ex.: tecnologias). Itens que não são posts podem ter
// ícone (`icon`); posts usam a miniatura do próprio post.
export type SkillItem =
  | { slug: string; title?: string }
  | { url: string; title: string; icon?: string }
  | { title: string; icon?: string }

export type SkillGroup = {
  title: string
  description: string
  items: SkillItem[]
}

export const skillsList: SkillGroup[] = [
  {
    title: 'Tecnologias',
    description: 'As tecnologias com que trabalho no dia a dia.',
    items: [
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
    title: 'Certificados',
    description: 'Certificações profissionais que concluí.',
    items: [
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
    title: 'Formação acadêmica',
    description: 'Minha formação em Ciência da Computação.',
    items: [
      {
        title: 'Bacharelado em Ciência da Computação · PUC Goiás (2019)',
        icon: '/images/puc-goias.svg',
      },
    ],
  },
]
