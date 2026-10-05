import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { Posts } from '@/components/Posts'
import { site } from '@/data/site'
import { slugify } from '@/lib/helpers'
import { getPosts, getTags } from '@/lib/posts'

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getTags()).map((tag) => ({ topic: tag.slug }))
}

async function getTopic(slug: string) {
  return (await getTags()).find((tag) => tag.slug === slug)
}

export async function generateMetadata({ params }: PageProps<'/topics/[topic]'>): Promise<Metadata> {
  const tag = await getTopic((await params).topic)
  return tag ? { title: tag.name, description: `Todos os posts sobre ${tag.name} escritos por ${site.name}.` } : {}
}

export default async function TopicPage({ params }: PageProps<'/topics/[topic]'>) {
  const tag = await getTopic((await params).topic)
  if (!tag) notFound()

  const posts = (await getPosts()).filter((post) => post.tags.some((t) => slugify(t) === tag.slug))

  return (
    <main className="main-content page">
      <Hero
        highlight={tag.totalCount}
        subTitle={tag.totalCount === 1 ? ' post' : ' posts'}
        title={tag.name}
        type="taxonomy"
        breadcrumb={{ value: '/topics', label: 'Tópicos' }}
      />
      <Posts data={posts} showYears />
    </main>
  )
}
