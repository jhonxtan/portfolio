'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './theme'

// Comentários via utterances (issues do GitHub)
export function Comments({ repo }: { repo: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const theme = useTheme()

  useEffect(() => {
    const container = ref.current
    if (!container) return
    container.innerHTML = ''
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', repo)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', theme === 'light' ? 'github-light' : 'github-dark')
    script.setAttribute('crossorigin', 'anonymous')
    container.appendChild(script)
  }, [repo, theme])

  return <div ref={ref} />
}
