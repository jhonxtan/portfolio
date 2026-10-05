import { site } from '@/data/site'
import { getPosts } from '@/lib/posts'

// Gerado uma vez no build (GET de route handlers é dinâmico por padrão)
export const dynamic = 'force-static'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function GET() {
  const posts = await getPosts()
  const items = posts
    .map((post) => {
      const url = `${site.url}/${post.slug}`
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>${post.description ? `\n      <description>${escape(post.description)}</description>` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(site.title)}</title>
    <link>${site.url}</link>
    <description>${escape(site.description)}</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
