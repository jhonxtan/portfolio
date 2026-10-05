import Link from 'next/link'
import type { ReactNode } from 'react'
import { formatDate, isNewPost } from '@/lib/helpers'

export type PostNode = {
  slug: string
  title: string
  date?: Date
  tags?: string[]
  thumbnail?: string
  description?: string
}

function highlightMatch(text: string, query?: string): ReactNode {
  if (!query) return text
  const start = text.toLowerCase().indexOf(query.toLowerCase())
  if (start === -1) return text
  const end = start + query.length
  return (
    <>
      {text.slice(0, start)}
      <strong className="searched">{text.slice(start, end)}</strong>
      {text.slice(end)}
    </>
  )
}

type PostProps = {
  node: PostNode
  includeYear?: boolean
  query?: string
  detailed?: boolean
  number?: number
}

export function Post({ node, includeYear, query, detailed, number }: PostProps) {
  const formattedDate = node.date && formatDate(node.date, includeYear)
  const newPost = node.date && isNewPost(node.date)
  const href = node.slug.startsWith('/') ? node.slug : `/${node.slug}`
  const title = <div>{highlightMatch(node.title, query)}</div>

  if (detailed) {
    return (
      <Link href={href} className="post detailed">
        <div className="post-thumbnail">{node.thumbnail && <img src={node.thumbnail} alt="" />}</div>
        <div className="post-info">
          <div className="post-title">
            {title}
            {newPost && <div className="button x-small">✨ Novo</div>}
          </div>
          {node.date && <time dateTime={node.date.toISOString()}>{formattedDate}</time>}
          {node.description && <p className="post-description">{node.description}</p>}
        </div>
        {node.tags && node.tags.length > 0 && (
          <div className="post-tags">
            {node.tags.map((tag) => (
              <span className="tag" key={tag}>
                {highlightMatch(tag, query)}
              </span>
            ))}
          </div>
        )}
      </Link>
    )
  }

  return (
    <Link href={href} className="post">
      <div>
        {number && <span className="post-number">{number}.</span>}
        {newPost && <div className="button x-small">✨ Novo</div>} {title}
      </div>
      {node.date && <time dateTime={node.date.toISOString()}>{formattedDate}</time>}
    </Link>
  )
}
