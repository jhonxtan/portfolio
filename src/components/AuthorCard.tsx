import Link from 'next/link'
import { site } from '@/data/site'

export function AuthorCard() {
  return (
    <aside className="author-card">
      <img src="/images/mascot.svg" alt="" width="80" height="80" />
      <p>
        Oi! Eu sou o {site.name}, desenvolvedor web em Senador Canedo (GO). Veja{' '}
        <Link href="/me">mais sobre mim</Link> ou os meus <Link href="/projects">projetos</Link>.
      </p>
    </aside>
  )
}
