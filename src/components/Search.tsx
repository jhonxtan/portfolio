'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { Posts } from './Posts'
import type { PostNode } from './Post'

// Filtros rápidos do blog: tag → ícone
const quickFilters = [
  { tag: 'javascript', label: 'JavaScript', image: '/images/js.svg' },
  { tag: 'dashboard', label: 'Dashboards', image: '/images/dashboard.svg' },
  { tag: 'ia', label: 'Inteligência artificial', image: '/images/google-ai.svg' },
  { tag: 'ux', label: 'UX Design', image: '/images/ux-design.svg' },
  { tag: 'certificados', label: 'Certificados', image: '/images/star.svg' },
  { tag: 'pessoal', label: 'Pessoal', image: '/images/nav-blog.svg' },
]

type SearchablePost = PostNode & { date: Date }

export function Search({ data, detailed }: { data: SearchablePost[]; detailed?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState(searchParams.get('search') ?? '')

  const updateQuery = (value: string) => {
    setQuery(value)
    router.replace(value ? `${pathname}?search=${encodeURIComponent(value)}` : pathname, { scroll: false })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter(
      (post) => post.title.toLowerCase().includes(q) || post.tags?.some((tag) => tag.toLowerCase().includes(q))
    )
  }, [data, query])

  return (
    <>
      <div className="quick-filters">
        {quickFilters.map(({ tag, label, image }) => (
          <div className="tooltip-container tooltip-above" key={tag}>
            <button
              type="button"
              aria-label={`Filtrar posts por ${label}`}
              className={`quick-filter ${query === tag ? 'active' : ''}`}
              onClick={() => updateQuery(query === tag ? '' : tag)}
            >
              <img src={image} alt="" width="22" height="22" />
            </button>
            <div className="tooltip">{label}</div>
          </div>
        ))}
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="search-container" style={{ marginBottom: '2.5rem' }}>
          <input
            ref={searchRef}
            id="search"
            type="search"
            className="searchbar with-icon"
            placeholder={`Buscar em ${data.length} posts...`}
            value={query}
            autoComplete="off"
            onChange={(event) => updateQuery(event.target.value)}
          />
          <img
            className="search-icon"
            src="/images/nav-shelves.svg"
            alt="Buscar"
            onClick={() => searchRef.current?.focus()}
          />
        </div>
      </form>
      <section>
        {results.length > 0 ? (
          <Posts data={results} showYears query={query} detailed={detailed} />
        ) : (
          <p style={{ marginTop: '2rem' }}>Nada encontrado para essa busca.</p>
        )}
      </section>
    </>
  )
}
