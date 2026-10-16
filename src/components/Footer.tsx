import { footerLinks } from '@/data/socialLinks'
import { isExternal } from '@/lib/helpers'

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
      </section>
    </footer>
  )
}
