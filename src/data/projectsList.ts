// Projetos. `repo` é o nome do repositório público no seu GitHub: quando existe, o card mostra
// o link "Código" e as estrelas. Sem `repo`, o card mostra só os links de artigo/demo.
export type Project = {
  name: string
  date: string
  slug: string
  tagline: string
  repo?: string
  url?: string
  writeup?: string
  highlight?: boolean
}

export const projectsList: Project[] = [
  {
    name: 'Plugin (DashGLPI)',
    date: '2026',
    slug: 'dashglpi',
    tagline: 'Plugin de dashboard para o GLPI 11: indicadores em tempo real e gráficos interativos',
    writeup: '/dashglpi',
    highlight: true,
  },
  {
    name: 'Portfólio',
    date: '2026',
    slug: 'portfolio',
    repo: 'portfolio',
    tagline: 'Este site, feito com Next.js, React, TypeScript e Tailwind',
    highlight: true,
  },
]
