'use client'

import { useEffect, useRef, useState } from 'react'
import { Moon, Sun } from './icons'
import { colors, setColor, setTheme, useColor, useTheme } from './theme'

export function ThemeToggle({ withTooltip = false }: { withTooltip?: boolean }) {
  const theme = useTheme()
  const button = (
    <button
      className="navbar-button"
      aria-label="Alternar tema"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )

  if (!withTooltip) return button
  return (
    <div className="tooltip-container">
      {button}
      <div className="tooltip">Tema</div>
    </div>
  )
}

export function ColorDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const currentColor = useColor()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="dropdown tooltip-container" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`navbar-button ${open ? 'active' : ''}`}
        aria-label="Escolher cor de destaque" 
        aria-expanded={open}
      >
        <div className="circle" style={{ backgroundColor: currentColor }} />
      </button>
      {open && (
        <div className="dropdown-results">
          <div className="circles">
            {colors.map((color) => (
              <div
                key={color}
                className="dropdown-option"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setColor(color)
                  setOpen(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setColor(color)
                    setOpen(false)
                  }
                }}
              >
                <div style={{ backgroundColor: color }} className="circle" />
              </div>
            ))}
          </div>
        </div>
      )}
      {!open && <div className="tooltip">Cor</div>}
    </div>
  )
}
