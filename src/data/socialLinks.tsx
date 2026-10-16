import { GitHub, Linkedin, Mail } from '@/components/icons'
import { githubUrl, site } from './site'

// Ícones da parte de baixo da barra lateral
export const sidebarSocialLinks = [
  { url: `mailto:${site.email}`, label: 'E-mail', Icon: Mail },
  { url: githubUrl, label: 'GitHub', Icon: GitHub },
  { url: site.linkedin, label: 'LinkedIn', Icon: Linkedin },
]

// Links do rodapé
export const footerLinks = [
  { url: `mailto:${site.email}`, label: 'E-mail', Icon: Mail },
  { url: githubUrl, label: 'GitHub', Icon: GitHub },
  { url: site.linkedin, label: 'LinkedIn', Icon: Linkedin },
]
