// Séries: posts com `series: "<title>"` no frontmatter entram na série de mesmo título.
export type Series = {
  title: string
  slug: string
  icon: string
  description: string
}

export const seriesList: Series[] = [
  {
    title: 'Certificações',
    slug: 'certificacoes',
    icon: '/images/star.svg',
    description: 'Os certificados que conquistei e o que aprendi com cada um.',
  },
]
