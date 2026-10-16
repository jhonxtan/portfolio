import type { Metadata } from 'next'
import Link from 'next/link'
import { Heading } from '@/components/Heading'
import { Hero } from '@/components/Hero'
import { skillsList } from '@/data/skillsList'
import { slugify } from '@/lib/helpers'
import { getEntries } from '@/lib/content'

const title = 'Habilidades'
const description = 'Tecnologias, certificados e formação.'

export const metadata: Metadata = { title, description }

export default async function SkillsPage() {
  const entriesBySlug = new Map((await getEntries()).map((entry) => [entry.slug, entry]))

  return (
    <main className="main-content page">
      <Hero title={title} description={description} icon="/images/nav-skills.svg" />
      {skillsList.map((group) => (
        <section className="section-index" id={slugify(group.title)} key={group.title}>
          <Heading title={group.title} description={group.description} />
          <div className="posts skill-list">
            {group.items.map((link) => {
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
              const post = entriesBySlug.get(link.slug.replace(/^\//, ''))
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
