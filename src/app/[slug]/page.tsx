import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CategoryBadge } from '@/components/Achievements'
import { AuthorCard } from '@/components/AuthorCard'
import { Comments } from '@/components/Comments'
import { Hero } from '@/components/Hero'
import { PostSidebar } from '@/components/PostSidebar'
import { site } from '@/data/site'
import { formatDate } from '@/lib/helpers'
import { getEntries, getEntry } from '@/lib/content'

// Conquistas e estudos de caso ficam na raiz do site (/minha-conquista)
export const dynamicParams = false

export async function generateStaticParams() {
  return (await getEntries()).map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[slug]'>): Promise<Metadata> {
  const post = await getEntry((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: 'article', title: post.title, description: post.description, publishedTime: post.date.toISOString() },
  }
}

export default async function PostPage({ params }: PageProps<'/[slug]'>) {
  const post = await getEntry((await params).slug)
  if (!post) notFound()

  const { title, date, category, previous, next } = post
  const isCase = category === 'projeto'
  const showComments = Boolean(site.commentsRepo) && !post.commentsOff

  return (
    <>
      <main className="main-content">
        {post.thumbnail && (
          <img src={post.thumbnail} className="main-article-thumbnail" alt="" width={75} height={75} />
        )}
        <Hero
          title={title}
          type="post"
          date={
            <div className="small flex-align-center gap">
              <time dateTime={date.toISOString().slice(0, 10)}>{formatDate(date, true)}</time>
              {showComments && (
                <>
                  <div className="divider" />
                  <a href="#comments">Comentários</a>
                </>
              )}
            </div>
          }
        >
          <div className="tags">
            <CategoryBadge category={category} />
          </div>
        </Hero>

        <div
          className="main-article"
          id={post.slug}
          dangerouslySetInnerHTML={{ __html: `<div class="introduction" id="introduction"></div>${post.html}` }}
        />

        {(previous || next) && (
          <nav className="post-navigation" aria-label={isCase ? 'Mais estudos de caso' : 'Mais conquistas'}>
            {previous && (
              <Link href={`/${previous.slug}`} rel="prev" className="post-navigation-link">
                <span className="small">&larr; Anterior</span>
                {previous.title}
              </Link>
            )}
            {next && (
              <Link href={`/${next.slug}`} rel="next" className="post-navigation-link post-navigation-next">
                <span className="small">Próxima &rarr;</span>
                {next.title}
              </Link>
            )}
          </nav>
        )}
        <AuthorCard />
        {showComments && (
          <section id="comments" className="comments">
            <h3>Comentários</h3>
            <Comments repo={site.commentsRepo} />
          </section>
        )}
      </main>
      {post.toc && <PostSidebar toc={post.toc} />}
    </>
  )
}
