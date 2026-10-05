import type { MetadataRoute } from 'next'
import { seriesList } from '@/data/seriesList'
import { site } from '@/data/site'
import { getPosts, getTags } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/blog', '/shelves', '/projects', '/me', '/resume', '/topics'].map((p) => ({
    url: `${site.url}${p}`,
  }))
  const posts = (await getPosts()).map((post) => ({ url: `${site.url}/${post.slug}`, lastModified: post.date }))
  const topics = (await getTags()).map((tag) => ({ url: `${site.url}/topics/${tag.slug}` }))
  const series = seriesList.map((s) => ({ url: `${site.url}/series/${s.slug}` }))
  return [...pages, ...posts, ...topics, ...series]
}
