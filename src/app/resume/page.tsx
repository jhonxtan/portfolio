import type { Metadata } from 'next'
import { MarkdownPage } from '@/components/MarkdownPage'
import { getPage } from '@/lib/posts'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('resume')
  return { title: page.title, description: page.description }
}

export default function Resume() {
  return <MarkdownPage name="resume" />
}
