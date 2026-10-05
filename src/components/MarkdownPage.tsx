import { Hero } from './Hero'
import { getPage } from '@/lib/posts'

// Página avulsa escrita em Markdown (content/pages/<name>.md)
export async function MarkdownPage({ name }: { name: string }) {
  const page = await getPage(name)

  return (
    <main className="main-content page">
      <Hero title={page.title} />
      <div id={`article-${name}`} className="page-article" dangerouslySetInnerHTML={{ __html: page.html }} />
    </main>
  )
}
