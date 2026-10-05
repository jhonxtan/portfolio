import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { Posts } from '@/components/Posts'
import { seriesList } from '@/data/seriesList'
import { getPostsBySeries } from '@/lib/posts'

export const dynamicParams = false

export function generateStaticParams() {
  return seriesList.map((series) => ({ series: series.slug }))
}

const findSeries = (slug: string) => seriesList.find((s) => s.slug === slug)

export async function generateMetadata({ params }: PageProps<'/series/[series]'>): Promise<Metadata> {
  const series = findSeries((await params).series)
  return series ? { title: series.title, description: series.description } : {}
}

export default async function SeriesPage({ params }: PageProps<'/series/[series]'>) {
  const series = findSeries((await params).series)
  if (!series) notFound()

  const posts = await getPostsBySeries(series.title)

  return (
    <main className="main-content page">
      <Hero
        highlight={posts.length}
        subTitle={posts.length === 1 ? ' parte' : ' partes na série'}
        title={series.title}
        type="taxonomy"
        description={series.description}
        icon={series.icon}
      />
      {posts.length > 0 ? <Posts data={posts} includeYear numbered /> : <p>Nenhum post nesta série ainda.</p>}
    </main>
  )
}
