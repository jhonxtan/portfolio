import { site } from '@/data/site'
import { footerLinks } from '@/data/socialLinks'
import { isExternal } from '@/lib/helpers'
import { GitHub, Heart, NextLogo, VercelLogo } from './icons'

const madeWithLinks = [
  { url: 'https://nextjs.org', label: 'Next.js', Logo: NextLogo },
  { url: 'https://github.com', label: 'GitHub', Logo: () => <GitHub size={16} /> },
  { url: 'https://vercel.com', label: 'Vercel', Logo: VercelLogo },
]

export function Footer() {
  return (
    <footer className="footer">
      <section className="footer-section">
        <nav className="footer-menu">
          {footerLinks.map((link) => (
            <a
              href={link.url}
              key={link.url}
              className="footer-link"
              {...(isExternal(link.url) && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <link.Icon size={15} />
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="footer-menu-buttons">
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="button small"
            >
              <link.Logo />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </section>
    </footer>
  )
}
