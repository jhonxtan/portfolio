import Link from 'next/link'
import { Hero } from '@/components/Hero'

export default function NotFound() {
  return (
    <main className="main-content page">
      <Hero title="404" description="Não encontrado." />
      <div className="page-article">
        <p>
          O que estava aqui não está mais (ou nunca esteve). Você pode ver tudo o que já escrevi no{' '}
          <Link href="/blog">arquivo do blog</Link>, procurar por assunto na página de{' '}
          <Link href="/topics">tópicos</Link> ou recomeçar pela <Link href="/">página inicial</Link>.
        </p>
      </div>
    </main>
  )
}
