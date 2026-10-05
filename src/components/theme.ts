'use client'

import { useSyncExternalStore } from 'react'
import { DEFAULT_COLOR } from '@/lib/themeScript'

export type Theme = 'light' | 'dark'

export const colors = [
  'var(--theme-lavender)',
  'var(--theme-pink)',
  'var(--theme-yellow)',
  'var(--theme-green)',
  'var(--theme-blue)',
  'var(--theme-white)',
]

const listeners = new Set<() => void>()
const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
const emit = () => listeners.forEach((fn) => fn())

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

function getTheme(): Theme {
  return document.documentElement.classList.contains('is-light') ? 'light' : 'dark'
}

function getColor() {
  return document.documentElement.style.getPropertyValue('--color-primary') || DEFAULT_COLOR
}

export function setTheme(theme: Theme) {
  const html = document.documentElement
  html.classList.toggle('is-light', theme === 'light')
  html.classList.toggle('is-dark', theme === 'dark')
  save('theme', theme)
  emit()
}

export function setColor(color: string) {
  document.documentElement.style.setProperty('--color-primary', color)
  save('color', color)
  emit()
}

export const useTheme = () => useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme)
export const useColor = () => useSyncExternalStore(subscribe, getColor, () => DEFAULT_COLOR)
