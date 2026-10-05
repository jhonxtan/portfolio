import type { Metadata } from 'next'
import Link from 'next/link'
import { Heading } from '@/components/Heading'
import { Hero } from '@/components/Hero'
import { shelvesList } from '@/data/shelvesList'
import { slugify } from '@/lib/helpers'
import { getPosts } from '@/lib/posts'

const title = 'Estantes'
const description = 'Uma seleção de tutoriais, referências e mergulhos profundos.'

export const metadata: Metadata = { title, description }

export default async function ShelvesPage() {
  const postsBySlug = new Map((await getPosts()).map((post) => [post.slug, post]))

  return (
    <main className="main-content page">
      <Hero title={title} icon="/images/nav-shelves.svg" />
      {shelvesList.map((shelf) => (
        <section className="section-index" id={slugify(shelf.title)} key={shelf.title}>
          <Heading title={shelf.title} description={shelf.description} />
          <div className="posts shelf">
            {shelf.links.map((link) => {
              if ('url' in link) {
                return (
                  <a className="post" href={link.url} target="_blank" rel="noreferrer" key={link.title}>
                    <div>
                      {link.icon && <img src={link.icon} alt="" width="25" height="25" />}
                      {link.title}
                    </div>
                  </a>
                )
              }
              if (!('slug' in link)) {
                return (
                  <div className="post" key={link.title}>
                    <div>
                      {link.icon && <img src={link.icon} alt="" width="25" height="25" />}
                      {link.title}
                    </div>
                  </div>
                )
              }
              const post = postsBySlug.get(link.slug.replace(/^\//, ''))
              return (
                <Link className="post" href={link.slug} key={link.slug}>
                  <div>
                    {post?.thumbnail && <img src={post.thumbnail} alt="" width="25" height="25" />}
                    {link.title ?? post?.title ?? link.slug}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </main>
  )
}
