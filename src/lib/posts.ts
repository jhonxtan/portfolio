import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { renderMarkdown } from './markdown'
import { slugify } from './helpers'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const POSTS_DIR = path.join(CONTENT_DIR, 'blog')

export type PostMeta = {
  slug: string
  title: string
  description?: string
  date: Date
  tags: string[]
  thumbnail?: string
  series?: string
  draft: boolean
  commentsOff: boolean
}

export type Post = PostMeta & {
  html: string
  toc: string
  previous?: PostMeta
  next?: PostMeta
}

async function readMarkdown(file: string) {
  const raw = await fs.readFile(file, 'utf8')
  return matter(raw)
}

async function readPostMeta(file: string): Promise<PostMeta & { content: string }> {
  const { data, content } = await readMarkdown(path.join(POSTS_DIR, file))
  if (!data.title || !data.date) throw new Error(`Post "${file}" precisa de "title" e "date" no frontmatter`)

  return {
    slug: file.replace(/\.md$/, ''),
    title: String(data.title),
    description: data.description,
    date: new Date(data.date),
    tags: data.tags ?? [],
    // `thumbnail: js` → /images/js.svg (ou um caminho completo, ex.: /images/minha-imagem.png)
    thumbnail: data.thumbnail
      ? String(data.thumbnail).includes('/')
        ? data.thumbnail
        : `/images/${data.thumbnail}.svg`
      : undefined,
    series: data.series,
    draft: Boolean(data.draft),
    commentsOff: Boolean(data.comments_off),
    content,
  }
}

// Rascunhos (draft: true) só aparecem em desenvolvimento
const isVisible = (post: PostMeta) => process.env.NODE_ENV === 'development' || !post.draft

const stripContent = ({ content, ...meta }: PostMeta & { content: string }): PostMeta => meta

async function loadAll() {
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith('.md'))
  const posts = await Promise.all(files.map(readPostMeta))
  return posts.filter(isVisible).sort((a, b) => b.date.valueOf() - a.date.valueOf())
}

/** Todos os posts, do mais novo para o mais antigo */
export async function getPosts(): Promise<PostMeta[]> {
  return (await loadAll()).map(stripContent)
}

export async function getPost(slug: string): Promise<Post | null> {
  const all = await loadAll()
  const index = all.findIndex((p) => p.slug === slug)
  if (index === -1) return null

  const post = all[index]
  const { html, toc } = await renderMarkdown(post.content)
  return {
    ...stripContent(post),
    html,
    toc,
    previous: all[index + 1] && stripContent(all[index + 1]),
    next: all[index - 1] && stripContent(all[index - 1]),
  }
}

/** Campos usados nas listas de posts (como no original, sem a descrição) */
export function toListItem({ slug, title, date, tags, thumbnail }: PostMeta) {
  return { slug, title, date, tags, thumbnail }
}

/** Tags com a contagem de posts, em ordem alfabética */
export async function getTags() {
  const counts = new Map<string, number>()
  for (const post of await getPosts()) for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  return [...counts]
    .map(([name, totalCount]) => ({ name, slug: slugify(name), totalCount }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export async function getPostsBySeries(seriesTitle: string) {
  return (await getPosts()).filter((p) => p.series === seriesTitle).reverse()
}

/** Páginas avulsas em content/pages (ex.: me.md, resume.md) */
export async function getPage(name: string) {
  const { data, content } = await readMarkdown(path.join(CONTENT_DIR, 'pages', `${name}.md`))
  const { html } = await renderMarkdown(content)
  return { title: String(data.title), description: data.description as string | undefined, html }
}
