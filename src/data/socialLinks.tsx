import { GitHub, Linkedin, Mail, Rss } from '@/components/icons'
import { githubUrl, site } from './site'

// Ícones da parte de baixo da barra lateral
export const sidebarSocialLinks = [
  { url: `mailto:${site.email}`, label: 'E-mail', Icon: Mail },
  { url: githubUrl, label: 'GitHub', Icon: GitHub },
  { url: site.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { url: '/rss.xml', label: 'Feed RSS', Icon: Rss },
]

// Links do rodapé
export const footerLinks = [
  { url: `mailto:${site.email}`, label: 'E-mail', Icon: Mail },
  { url: '/rss.xml', label: 'Feed RSS', Icon: Rss },
  { url: githubUrl, label: 'GitHub', Icon: GitHub },
  { url: site.linkedin, label: 'LinkedIn', Icon: Linkedin },
]
