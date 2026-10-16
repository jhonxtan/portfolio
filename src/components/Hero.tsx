import Link from 'next/link'
import type { ReactNode } from 'react'

type HeroProps = {
  highlight?: ReactNode
  subTitle?: string
  title?: string
  date?: ReactNode
  description?: ReactNode
  children?: ReactNode
  type?: 'page' | 'index' | 'post' | 'taxonomy'
  breadcrumb?: { value: string; label: string }
  icon?: string
}

export function Hero({
  highlight,
  subTitle,
  title,
  date,
  description,
  children,
  type = 'page',
  breadcrumb,
  icon,
}: HeroProps) {
  return (
    <header className={`hero hero-${type}`}>
      {subTitle && (
        <div className="sub-title">
          {breadcrumb && (
            <>
              <Link href={breadcrumb.value}>{breadcrumb.label}</Link> <span>/</span>
            </>
          )}
          <div>
            {highlight !== undefined && <span className="highlight">{highlight}</span>}
            <span>{subTitle}</span>
          </div>
        </div>
      )}
      {date && <div className="post-date">{date}</div>}
      {title && (
        <h1 className={date ? 'has-date' : 'flex-align-center large-gap'}>
          {icon && <img src={icon} alt="" />}
          {title}
        </h1>
      )}
      {description && (
        <div className="hero-description">
          {description}
        </div>
      )}
      {children}
    </header>
  )
}
