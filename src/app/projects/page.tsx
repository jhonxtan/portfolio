import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { ProjectCards } from '@/components/Projects'
import { projectsList } from '@/data/projectsList'

const title = 'Projetos'
const description =
  'Soluções que desenvolvi para resolver problemas reais, de dashboards para a operação de TI a este site.'

export const metadata: Metadata = { title, description }

export default function Projects() {
  return (
    <main className="main-content page">
      <Hero title={title} description={description} icon="/images/nav-projects.svg" />
      <ProjectCards projects={projectsList} />
    </main>
  )
}
