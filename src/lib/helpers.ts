export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// "31 de março" (listas) ou "31 de março de 2026" (posts)
export function formatDate(date: Date, withYear = false) {
  return date.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    ...(withYear && { year: 'numeric' }),
  })
}

export function isNewPost(date: Date) {
  const diffDays = Math.floor(Math.abs(Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays < 50
}

export const isExternal = (url: string) => /^https?:\/\//.test(url)
