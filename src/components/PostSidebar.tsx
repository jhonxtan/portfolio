'use client'

import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

// Sumário lateral do post (telas a partir de 1360px), destacando a seção visível
export function PostSidebar({ toc }: { toc: string }) {
  const [activeHash, setActiveHash] = useState('')
  const ids = useMemo(() => ['introduction', ...[...toc.matchAll(/href="#([^"]+)"/g)].map((m) => m[1])], [toc])

  // Alinha o topo do sumário com o início do artigo
  useLayoutEffect(() => {
    const article = document.querySelector<HTMLElement>('.main-article')
    const sidebar = document.querySelector<HTMLElement>('.post-sidebar')
    if (article && sidebar) sidebar.style.paddingTop = `${article.offsetTop - 24}px`
  }, [toc])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(entry.target.id)
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  useEffect(() => {
    if (!activeHash) return
    const anchors = document.querySelectorAll('.table-of-contents a')
    anchors.forEach((a) => a.classList.remove('active'))
    const activeLink = document.querySelector(`.table-of-contents a[href$="#${CSS.escape(activeHash)}"]`)
    if (activeLink) {
      activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      activeLink.classList.add('active')
    }
  }, [activeHash])

  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-content">
        <section className="post-sidebar-section">
          <div className="post-sidebar-card">
            <h2>Sumário</h2>
            <nav className="table-of-contents">
              <ul>
                <li>
                  <a href="#introduction" onClick={() => setActiveHash('introduction')}>
                    Introdução
                  </a>
                </li>
              </ul>
              <div dangerouslySetInnerHTML={{ __html: toc }} />
            </nav>
          </div>
        </section>
      </div>
    </aside>
  )
}
