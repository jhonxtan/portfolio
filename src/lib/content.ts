import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { renderMarkdown } from './markdown'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const ENTRIES_DIR = path.join(CONTENT_DIR, 'conquistas')

// Tipos de conquista: rótulo e ícone em pixel art. "projeto" são estudos de caso: têm página própria,
// mas aparecem em Projetos (não na lista de conquistas).
export const categories = {
  certificado: { label: 'Certificado', icon: '/images/star.svg' },
  evento: { label: 'Evento', icon: '/images/coin.svg' },
  lancamento: { label: 'Lançamento', icon: '/images/flag.svg' },
  projeto: { label: 'Estudo de caso', icon: '/images/block.svg' },
} as const

export type Category = keyof typeof categories

export type EntryMeta = {
  slug: string
  title: string
  description?: string
  date: Date
  category: Category
  thumbnail?: string
  draft: boolean
  commentsOff: boolean
}

export type Entry = EntryMeta & {
  html: string
  toc: string
  previous?: EntryMeta
  next?: EntryMeta
}

async function readMarkdown(file: string) {
  const raw = await fs.readFile(file, 'utf8')
  return matter(raw)
}

async function readEntryMeta(file: string): Promise<EntryMeta & { content: string }> {
  const { data, content } = await readMarkdown(path.join(ENTRIES_DIR, file))
  if (!data.title || !data.date) throw new Error(`"${file}" precisa de "title" e "date" no frontmatter`)
  if (!(data.category in categories)) {
    throw new Error(`"${file}": category deve ser uma de ${Object.keys(categories).join(', ')}`)
  }

  return {
    slug: file.replace(/\.md$/, ''),
    title: String(data.title),
    description: data.description,
    date: new Date(data.date),
    category: data.category,
    // `thumbnail: js` → /images/js.svg (ou um caminho completo, ex.: /images/minha-imagem.png)
    thumbnail: data.thumbnail
      ? String(data.thumbnail).includes('/')
        ? data.thumbnail
        : `/images/${data.thumbnail}.svg`
      : undefined,
    draft: Boolean(data.draft),
    commentsOff: Boolean(data.comments_off),
    content,
  }
}

// Rascunhos (draft: true) só aparecem em desenvolvimento
const isVisible = (entry: EntryMeta) => process.env.NODE_ENV === 'development' || !entry.draft

const stripContent = ({ content, ...meta }: EntryMeta & { content: string }): EntryMeta => meta

async function loadAll() {
  const files = (await fs.readdir(ENTRIES_DIR)).filter((f) => f.endsWith('.md'))
  const entries = await Promise.all(files.map(readEntryMeta))
  return entries.filter(isVisible).sort((a, b) => b.date.valueOf() - a.date.valueOf())
}

/** Todas as páginas de content/conquistas (inclusive estudos de caso), da mais nova para a mais antiga */
export async function getEntries(): Promise<EntryMeta[]> {
  return (await loadAll()).map(stripContent)
}

/** Só as conquistas (sem os estudos de caso) */
export async function getAchievements(): Promise<EntryMeta[]> {
  return (await getEntries()).filter((entry) => entry.category !== 'projeto')
}

export async function getEntry(slug: string): Promise<Entry | null> {
  const all = await loadAll()
  const entry = all.find((e) => e.slug === slug)
  if (!entry) return null

  // Anterior/próxima só entre páginas do mesmo grupo (conquistas ou estudos de caso)
  const isCase = (e: EntryMeta) => e.category === 'projeto'
  const siblings = all.filter((e) => isCase(e) === isCase(entry))
  const index = siblings.indexOf(entry)
  const { html, toc } = await renderMarkdown(entry.content)
  return {
    ...stripContent(entry),
    html,
    toc,
    previous: siblings[index + 1] && stripContent(siblings[index + 1]),
    next: siblings[index - 1] && stripContent(siblings[index - 1]),
  }
}

/** Páginas avulsas em content/pages (ex.: me.md, resume.md) */
export async function getPage(name: string) {
  const { data, content } = await readMarkdown(path.join(CONTENT_DIR, 'pages', `${name}.md`))
  const { html } = await renderMarkdown(content)
  return { title: String(data.title), description: data.description as string | undefined, html }
}
