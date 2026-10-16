import { site } from './site'

export const mainNavLinks = [
  { url: '/achievements', label: 'Conquistas', image: '/images/nav-achievements.svg' },
  { url: '/skills', label: 'Habilidades', image: '/images/nav-skills.svg' },
  { url: '/projects', label: 'Projetos', image: '/images/nav-projects.svg' },
  { url: '/me', label: 'Sobre mim', image: '/images/nav-about.svg' },
]

export const subNavLinks = [
  { url: '/resume', label: 'Currículo' },
  { url: site.sourceRepo, label: 'Código' },
]
