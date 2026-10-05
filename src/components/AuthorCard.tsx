import Link from 'next/link'
import { site } from '@/data/site'

export function AuthorCard() {
  return (
    <aside className="author-card">
      <img src="/images/mascot.svg" alt="" width="80" height="80" />
      <p>
        Oi! Eu sou o {site.name}, o desenvolvedor que cuida deste jardim digital. Você pode ler{' '}
        <Link href="/me">mais sobre mim</Link> ou acompanhar pelo <a href="/rss.xml">RSS</a>.
      </p>
    </aside>
  )
}
