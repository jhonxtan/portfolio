import Link from 'next/link'
import { Achievements } from '@/components/Achievements'
import { Heading } from '@/components/Heading'
import { Hero } from '@/components/Hero'
import { ProjectHighlights } from '@/components/Projects'
import { projectsList } from '@/data/projectsList'
import { skillsList } from '@/data/skillsList'
import { site } from '@/data/site'
import { getAchievements } from '@/lib/content'
import { slugify } from '@/lib/helpers'

export default async function Index() {
  const latest = (await getAchievements()).slice(0, 3)

  return (
    <main className="main-content page">
      <Hero type="index">
        <div className="hero-wrapper">
          <div>
            <h1 className="flex-align-center gap">Olá, eu sou o {site.name}!</h1>
            <p className="hero-description hero-tagline">
              Desenvolvedor Web JavaScript: React, Next.js, Node.js e TypeScript.
            </p>
            <Heading title="Uma breve linha do tempo" small />
            <ul className="hero-eras">
              <li>
                <span className="era-dates">2019&ndash;hoje</span>
                <span>
                  <Link href="/resume">Ciência da Computação</Link>: bacharelado na Pontifícia Universidade Católica de
                  Goiás.
                </span>
              </li>
              <li>
                <span className="era-dates">2021&ndash;2022</span>
                <span>
                  <Link href="/resume">Estagiário de TI</Link> na Prefeitura de Senador Canedo: atendimento, apoio à
                  programação de sistemas, manutenção de computadores e servidores, e suporte a usuários.
                </span>
              </li>
              <li>
                <span className="era-dates">2022&ndash;2023</span>
                <span>
                  <Link href="/resume">Técnico de suporte em TI</Link>: atendimento ao público via WhatsApp e
                  manutenção de computadores.
                </span>
              </li>
              <li>
                <span className="era-dates">2023&ndash;hoje</span>
                <span>
                  <Link href="/resume">Desenvolvedor</Link> Web na Prefeitura de Senador Canedo, criando
                  soluções como o <Link href="/dashglpi">Plugin GLPI (DashGLPI)</Link>.
                </span>
              </li>
            </ul>
            <p className="hero-description">
              <Link href="/me">Também</Link>: interessado em automações com inteligência artificial aplicada à gestão pública e em UX Design.
            </p>
          </div>
        </div>
      </Hero>

      <section className="section-index">
        <Heading
          title="Habilidades"
          slug="/skills"
          buttonText="Ver tudo"
          description="Tecnologias, certificados e formação."
          icon="/images/nav-skills.svg"
        />
        <div className="cards cards-half">
          {skillsList.map((group) => (
            <Link className="card card-highlight card-skill" href={`/skills#${slugify(group.title)}`} key={group.title}>
              <div className="flex-space-between">
                <div className="card-title">{group.title}</div>
                <div className="chip">
                  <span className="chip-highlight">{group.items.length}</span>
                </div>
              </div>
              <p>{group.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-index">
        <Heading
          title="Últimas conquistas"
          slug="/achievements"
          buttonText="Todas as conquistas"
          icon="/images/nav-achievements.svg"
        />
        <Achievements entries={latest} />
      </section>

      <section>
        <Heading
          title="Projetos"
          slug="/projects"
          buttonText="Todos os projetos"
          description="Soluções que desenvolvi para resolver problemas reais."
          icon="/images/star.svg"
        />
        <ProjectHighlights projects={projectsList.filter((p) => p.highlight)} />
      </section>
    </main>
  )
}
