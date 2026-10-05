import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Hero } from '@/components/Hero'
import { Posts } from '@/components/Posts'
import { Search } from '@/components/Search'
import { getPosts, toListItem } from '@/lib/posts'

const title = 'Blog'
const description = 'Guias, tutoriais e anotações sobre código e vida.'

export const metadata: Metadata = { title, description }

export default async function Blog() {
  const posts = (await getPosts()).map(toListItem)

  return (
    <main className="main-content page">
      <Hero
        title={title}
        description={
          <div>
            {`${description} `}
            <Link href="/shelves">Navegue pelas estantes</Link>.
          </div>
        }
        hasSearch
        icon="/images/nav-blog.svg"
      />
      {/* useSearchParams exige Suspense; o fallback é a lista completa já renderizada no servidor */}
      <Suspense fallback={<Posts data={posts} showYears detailed />}>
        <Search data={posts} detailed />
      </Suspense>
    </main>
  )
}
