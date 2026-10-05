import Link from 'next/link'
import type { ReactNode } from 'react'

type HeadingProps = {
  title: string
  slug?: string
  buttonText?: string
  icon?: string
  description?: ReactNode
  small?: boolean
}

export function Heading({ title, slug, buttonText, icon, description, small }: HeadingProps) {
  return (
    <header className={`heading ${small ? 'small' : ''}`}>
      <div className="heading-row">
        <h2>
          {icon && <img src={icon} alt="" className="heading-icon" width={40} height={40} />}
          <span>{title}</span>
        </h2>
        {slug && buttonText && (
          <Link href={slug} className="button secondary small">
            {buttonText}
          </Link>
        )}
      </div>
      {description && <div className="description">{description}</div>}
    </header>
  )
}
