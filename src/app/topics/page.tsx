import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { getTags } from '@/lib/posts'

const title = 'Tópicos'
const description = 'Todos os assuntos sobre os quais já escrevi: desenvolvimento, UX, inteligência artificial e temas pessoais.'

export const metadata: Metadata = { title, description }

export default async function Topics() {
  const tags = await getTags()
  const byLetter = Map.groupBy(tags, (tag) => tag.name.charAt(0).toUpperCase())

  return (
    <main className="main-content page">
      <Hero title={title} description={description} />
      {[...byLetter].map(([letter, letterTags]) => (
        <div key={letter}>
          <h3>{letter}</h3>
          <div className="cards with-tags">
            {letterTags.map((tag) => (
              <Link key={tag.name} href={`/topics/${tag.slug}`} className="card card-highlight flex-space-between">
                <span>{tag.name}</span>
                <span className="chip">
                  <span className="chip-highlight">{tag.totalCount}</span>
                  {tag.totalCount === 1 ? ' post' : ' posts'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
