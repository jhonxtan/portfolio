import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { getEntries } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/achievements', '/skills', '/projects', '/me', '/resume'].map((p) => ({
    url: `${site.url}${p}`,
  }))
  const entries = (await getEntries()).map((entry) => ({ url: `${site.url}/${entry.slug}`, lastModified: entry.date }))
  return [...pages, ...entries]
}
