import { site } from './site'

export const mainNavLinks = [
  { url: '/blog', label: 'Blog', image: '/images/nav-blog.svg' },
  { url: '/shelves', label: 'Estantes', image: '/images/nav-shelves.svg' },
  { url: '/projects', label: 'Projetos', image: '/images/nav-projects.svg' },
  { url: '/me', label: 'Sobre mim', image: '/images/nav-about.svg' },
]

export const subNavLinks = [
  { url: '/resume', label: 'Currículo' },
  { url: '/topics', label: 'Tópicos' },
  { url: site.sourceRepo, label: 'Código' },
]
