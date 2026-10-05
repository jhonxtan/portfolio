// Ícones de traço (Lucide, licença ISC) — os mesmos usados no site original.
import type { ReactNode } from 'react'

function Stroke({ size = 24, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

type IconProps = { size?: number }

export const Sun = ({ size }: IconProps) => (
  <Stroke size={size}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </Stroke>
)

export const Moon = ({ size }: IconProps) => (
  <Stroke size={size}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </Stroke>
)

export const Menu = ({ size }: IconProps) => (
  <Stroke size={size}>
    <path d="M3 12h18" />
    <path d="M3 18h18" />
    <path d="M3 6h18" />
  </Stroke>
)

export const Close = ({ size }: IconProps) => (
  <Stroke size={size}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Stroke>
)

export const Mail = ({ size = 20 }: IconProps) => (
  <Stroke size={size}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Stroke>
)

export const GitHub = ({ size = 20 }: IconProps) => (
  <Stroke size={size}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Stroke>
)

export const Linkedin = ({ size = 20 }: IconProps) => (
  <Stroke size={size}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Stroke>
)

export const Rss = ({ size = 20 }: IconProps) => (
  <Stroke size={size}>
    <path d="M4 11a9 9 0 0 1 9 9" />
    <path d="M4 4a16 16 0 0 1 16 16" />
    <circle cx="5" cy="19" r="1" />
  </Stroke>
)

export const Heart = ({ size = 20 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={{ width: '1rem', height: '1rem', fill: 'currentColor' }}>
    <path
      fillRule="evenodd"
      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
    />
  </svg>
)

// Logos dos botões "Feito com" do rodapé
export const NextLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <path d="M9 7.5v9M9 7.5l7.5 10M15.5 7.5v6" stroke="var(--color-background)" strokeWidth="1.8" fill="none" />
  </svg>
)

export const VercelLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 23 21H1z" fill="currentColor" />
  </svg>
)
