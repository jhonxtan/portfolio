'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { mainNavLinks as links } from '@/data/navLinks'
import { githubUrl, site } from '@/data/site'
import { Close, GitHub, Menu } from './icons'
import { ColorDropdown, ThemeToggle } from './ThemeControls'

// Barra superior (telas menores que 1020px)
export function Navigation() {
  const pathname = usePathname()
  const [navOpen, setNavOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-title">
        <div className="navbar-title-content">
          <Link href="/" className="navbar-title-link">
            <span>
              <img src="/images/logo.svg" className="navbar-logo" alt={site.handle} height="16" width="16" />
            </span>
            <span className="site-name">{site.handle}</span>
          </Link>
        </div>
      </div>
      <div className="navbar-container">
        <section className="navbar-section">
          <button
            className={`navbar-button nav-menu-button ${navOpen ? 'active' : ''}`}
            onClick={() => setNavOpen((prev) => !prev)}
            aria-label={navOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={navOpen}
          >
            {navOpen ? <Close /> : <Menu />}
          </button>
          <nav className={`navbar-menu nav-items ${navOpen ? 'active' : ''}`}>
            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className={pathname === link.url ? 'active' : undefined}
                onClick={() => setNavOpen(false)}
              >
                <img src={link.image} alt="" />
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className="navbar-menu social">
            <ThemeToggle />
            <ColorDropdown />
            <a
              href={githubUrl}
              className="social-icon navbar-icon flex-align-center"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              style={{ justifyContent: 'center', padding: 0 }}
            >
              <GitHub size={20} />
            </a>
          </nav>
        </section>
      </div>
    </header>
  )
}
