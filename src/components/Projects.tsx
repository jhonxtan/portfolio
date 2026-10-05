'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Project } from '@/data/projectsList'
import { githubUrl, site } from '@/data/site'
import { StarIcon } from './icons'

const repoUrl = (project: Project) => project.repo && `${githubUrl}/${project.repo}`

// Link do título: repositório, demo ou artigo (o primeiro que existir)
function ProjectTitle({ project, className }: { project: Project; className?: string }) {
  const href = repoUrl(project) ?? project.url
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {project.name}
      </a>
    )
  }
  if (project.writeup) {
    return (
      <Link className={className} href={project.writeup}>
        {project.name}
      </Link>
    )
  }
  return <span className={`card-title ${className ?? ''}`}>{project.name}</span>
}

function ProjectLinks({ project }: { project: Project }) {
  const code = repoUrl(project)
  if (!project.writeup && !project.url && !code) return null
  return (
    <div className="card-links">
      {project.writeup && <Link href={project.writeup}>Artigo</Link>}
      {project.url && (
        <a href={project.url} target="_blank" rel="noreferrer">
          Demo
        </a>
      )}
      {code && (
        <a href={code} target="_blank" rel="noreferrer">
          Código
        </a>
      )}
    </div>
  )
}

// Cards da página inicial
export function ProjectHighlights({ projects }: { projects: Project[] }) {
  return (
    <div className="cards">
      {projects.map((project) => (
        <div className="card" key={`highlight-${project.slug}`}>
          <time>{project.date}</time>
          <ProjectTitle project={project} />
          <p>{project.tagline}</p>
          <ProjectLinks project={project} />
        </div>
      ))}
    </div>
  )
}

// Cards da página de projetos, com as estrelas buscadas na API do GitHub
export function ProjectCards({ projects }: { projects: Project[] }) {
  const [stars, setStars] = useState<Record<string, number>>({})

  useEffect(() => {
    fetch(`https://api.github.com/users/${site.github}/repos?per_page=100`)
      .then((res) => (res.ok ? res.json() : []))
      .then((repos: { name: string; stargazers_count: number }[]) =>
        setStars(Object.fromEntries(repos.map((r) => [r.name, r.stargazers_count])))
      )
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="cards">
      {projects.map((project) => (
        <div className="card" key={project.slug}>
          <div className="stars">
            {project.repo && stars[project.repo] !== undefined && (
              <div className="star">
                <a href={`${repoUrl(project)}/stargazers`}>{stars[project.repo].toLocaleString('pt-BR')}</a>
                <StarIcon />
              </div>
            )}
          </div>
          <time>{project.date}</time>
          <ProjectTitle project={project} className="card-header" />
          <p>{project.tagline}</p>
          <ProjectLinks project={project} />
        </div>
      ))}
    </div>
  )
}
