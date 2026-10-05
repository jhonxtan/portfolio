'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { mainNavLinks, subNavLinks } from '@/data/navLinks'
import { site } from '@/data/site'
import { sidebarSocialLinks } from '@/data/socialLinks'
import { isExternal } from '@/lib/helpers'
import { ColorDropdown, ThemeToggle } from './ThemeControls'

// Barra lateral (telas a partir de 1020px)
export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <div className="sidebar-title-link">
          <Link href="/" className="flex-align-center gap">
            <span>
              <img src="/images/logo.svg" className="navbar-logo" alt={site.handle} height="16" width="16" />
            </span>
            <span className="site-name">{site.handle}</span>
          </Link>
          <div className="flex-align-center">
            <ColorDropdown />
            <ThemeToggle withTooltip />
          </div>
        </div>
      </section>

      <section className="sidebar-section">
        <div className="sidebar-content">
          <p>
            Eu sou o <Link href="/me">{site.name}</Link>, desenvolvedor web em Senador Canedo (GO).
          </p>
        </div>
      </section>

      <section className="sidebar-section">
        <nav className="sidebar-nav-links">
          {mainNavLinks.map((link) => (
            <Link key={link.url} href={link.url} className={pathname === link.url ? 'active' : undefined}>
              <img src={link.image} alt="" />
              {link.label}
            </Link>
          ))}
        </nav>
      </section>

      <div className="sidebar-bottom">
        <section className="sidebar-section">
          <nav className="sidebar-links">
            {sidebarSocialLinks.map(({ url, label, Icon }) => (
              <div className="tooltip-container tooltip-above" key={url}>
                <a
                  href={url}
                  aria-label={label}
                  {...(isExternal(url) && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <Icon size={20} />
                </a>
                <div className="tooltip">{label}</div>
              </div>
            ))}
          </nav>
        </section>

        <nav className="sidebar-sub-links">
          {subNavLinks.map((link, index) => (
            <Fragment key={link.url}>
              {index > 0 && <div className="divider" />}
              {isExternal(link.url) ? (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link href={link.url} className={pathname === link.url ? 'active' : undefined}>
                  {link.label}
                </Link>
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </aside>
  )
}
