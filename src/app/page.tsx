import Link from 'next/link'
import { Heading } from '@/components/Heading'
import { Hero } from '@/components/Hero'
import { Post } from '@/components/Post'
import { Posts } from '@/components/Posts'
import { ProjectHighlights } from '@/components/Projects'
import { projectsList } from '@/data/projectsList'
import { seriesList } from '@/data/seriesList'
import { shelvesList } from '@/data/shelvesList'
import { site } from '@/data/site'
import { slugify } from '@/lib/helpers'
import { getPosts, toListItem } from '@/lib/posts'

export default async function Index() {
  const posts = await getPosts()
  const latest = posts.slice(0, 4).map(toListItem)

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
                  programação de sistemas, cabeamento de redes e manutenção de computadores.
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
                  <Link href="/resume">Desenvolvedor</Link> web e mobile na Prefeitura de Senador Canedo, criando
                  soluções como o <Link href="/dashglpi">Plugin GLPI (DashGLPI)</Link>. Certificados{' '}
                  <Link href="/shelves#certificados">Google AI e Google UX Design</Link>, e{' '}
                  <Link href="/blog">{posts.length} posts</Link> contando tudo.
                </span>
              </li>
            </ul>
            <p className="hero-description">
              <Link href="/me">Também</Link>: interessado em IA aplicada à gestão pública e em UX Design.
            </p>
          </div>
          <div className="hero-image-container">
            <img src="/images/mascot.svg" className="hero-image" alt="Robô mascote" />
            {/* <aside className="hero-bubble">
              Não lembra como se escreve meu nome? É só ir em <a href={site.url}>{site.handle}</a>!
            </aside> */}
          </div>
        </div>
      </Hero>

      <section className="section-index">
        <Heading title="Últimos" slug="/blog" buttonText="Todos os posts" />
        <Posts data={latest} detailed />
      </section>

      <section className="section-index">
        <Heading
          title="Estantes"
          slug="/shelves"
          buttonText="Todas as estantes"
          description="Caminhos escolhidos a dedo por tudo o que já escrevi."
        />
        <div className="cards cards-half">
          {shelvesList.map((shelf) => (
            <Link className="card card-highlight card-shelf" href={`/shelves#${slugify(shelf.title)}`} key={shelf.title}>
              <div className="flex-space-between">
                <div className="card-title">{shelf.title}</div>
                <div className="chip">
                  <span className="chip-highlight">{shelf.links.length}</span>
                </div>
              </div>
              <p>{shelf.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-index">
        <Heading title="Séries" description="Alguns assuntos renderam vários capítulos." />
        <div className="posts">
          {seriesList.map((series) => (
            <Post
              key={series.slug}
              detailed
              node={{
                slug: `/series/${series.slug}`,
                title: series.title,
                thumbnail: series.icon,
                description: series.description,
              }}
            />
          ))}
        </div>
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
