import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'
import { toString } from 'hast-util-to-string'
import { visit } from 'unist-util-visit'
import type { Element, Root } from 'hast'

type Heading = { depth: number; id: string; text: string }

// Ícone de link dos títulos (mesmo do gatsby-remark-autolink-headers)
const linkIcon: Element = {
  type: 'element',
  tagName: 'svg',
  properties: { ariaHidden: 'true', height: 16, width: 16, viewBox: '0 0 16 16', version: '1.1' },
  children: [
    {
      type: 'element',
      tagName: 'path',
      properties: {
        fillRule: 'evenodd',
        d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
      },
      children: [],
    },
  ],
}

// Coleta os h2/h3 (já com id) para montar o sumário
function collectHeadings(headings: Heading[]) {
  return () => (tree: Root) => {
    visit(tree, 'element', (node) => {
      const depth = { h2: 2, h3: 3 }[node.tagName]
      if (depth && typeof node.properties.id === 'string') {
        headings.push({ depth, id: node.properties.id, text: toString(node) })
      }
    })
  }
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Gera o HTML do sumário no mesmo formato do Gatsby: <ul><li><a/><ul>...</ul></li></ul>
function tocHtml(headings: Heading[]) {
  if (!headings.length) return ''
  let html = '<ul>'
  let open = false
  headings.forEach((h, i) => {
    const link = `<a href="#${h.id}">${escape(h.text)}</a>`
    if (h.depth === 2 || i === 0) {
      if (open) html += '</ul>'
      if (i > 0) html += '</li>'
      html += `<li>${link}`
      open = false
    } else {
      if (!open) html += '<ul>'
      html += `<li>${link}</li>`
      open = true
    }
  })
  if (open) html += '</ul>'
  return html + '</li></ul>'
}

export async function renderMarkdown(markdown: string) {
  const headings: Heading[] = []
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(collectHeadings(headings))
    .use(rehypeAutolinkHeadings, {
      behavior: 'prepend',
      properties: { className: ['anchor', 'before'], ariaHidden: 'true', tabIndex: -1 },
      content: linkIcon,
    })
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(markdown)

  return { html: String(file), toc: tocHtml(headings) }
}
