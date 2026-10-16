import Link from 'next/link'
import { Hero } from '@/components/Hero'

export default function NotFound() {
  return (
    <main className="main-content page">
      <Hero title="404" description="Fase não encontrada." />
      <div className="page-article">
        <p>
          Este cano não leva a lugar nenhum (ou nunca levou). Você pode ver as{' '}
          <Link href="/achievements">conquistas</Link>, os <Link href="/projects">projetos</Link> ou recomeçar
          pela <Link href="/">página inicial</Link>.
        </p>
      </div>
    </main>
  )
}
