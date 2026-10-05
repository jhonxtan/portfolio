// Gera os ícones e a mascote em pixel art (SVG) usados no site.
// Uso: node scripts/generate-pixel-art.mjs  → escreve em public/images/
//
// Cada desenho é uma grade de caracteres; cada caractere é uma cor da paleta
// abaixo ('.' = transparente). Edite as funções para mudar os desenhos.
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.join(process.cwd(), 'public', 'images')

const palette = {
  k: '#1b1b20', // contorno
  K: '#26262c', // fundo escuro
  w: '#ffffff',
  g: '#d9dbe3',
  G: '#9a9ca8',
  d: '#5a5c68',
  y: '#ffd479',
  Y: '#e3a72f',
  o: '#f2a65a',
  O: '#e8622c',
  r: '#f2777a',
  R: '#c7363a',
  b: '#6db3f5',
  B: '#2a67a5',
  T: '#3178c6',
  c: '#76d4d6',
  n: '#94d294',
  N: '#3f9a54',
  p: '#e5aaf5',
  P: '#6a3eba',
  m: '#b07a45',
  M: '#7a4f28',
  s: '#f5c9a0',
  // cores do Google
  U: '#4285f4',
  E: '#ea4335',
  A: '#fbbc05',
  V: '#34a853',
  H: '#777bb3', // roxo do PHP
  Q: '#21759b', // azul do WordPress
  X: '#3c57ae', // azul da PUC Goiás
}

function canvas(w, h) {
  const grid = Array.from({ length: h }, () => Array(w).fill('.'))
  const set = (x, y, c) => {
    if (x >= 0 && y >= 0 && x < w && y < h) grid[y][x] = c
  }
  const api = {
    grid,
    px: set,
    hline: (x1, x2, y, c) => {
      for (let x = x1; x <= x2; x++) set(x, y, c)
    },
    vline: (x, y1, y2, c) => {
      for (let y = y1; y <= y2; y++) set(x, y, c)
    },
    // retângulo preenchido com contorno opcional (largura/altura incluem o contorno)
    rect: (x, y, rw, rh, fill, outline = 'k') => {
      for (let j = 0; j < rh; j++)
        for (let i = 0; i < rw; i++) {
          const edge = outline && (i === 0 || j === 0 || i === rw - 1 || j === rh - 1)
          set(x + i, y + j, edge ? outline : fill)
        }
    },
    // desenha um bloco de texto/arte: linhas de caracteres a partir de (x, y)
    art: (x, y, rows, map = {}) => {
      rows.forEach((row, j) =>
        [...row].forEach((ch, i) => {
          if (ch !== '.') set(x + i, y + j, map[ch] ?? ch)
        })
      )
    },
  }
  return api
}

// Fonte 3x5 para letras dos ícones
const font = {
  J: ['..k', '..k', '..k', 'k.k', '.k.'],
  S: ['.kk', 'k..', '.k.', '..k', 'kk.'],
  T: ['kkk', '.k.', '.k.', '.k.', '.k.'],
  C: ['.kk', 'k..', 'k..', 'k..', '.kk'],
  '<': ['..k', '.k.', 'k..', '.k.', '..k'],
  '>': ['k..', '.k.', '..k', '.k.', 'k..'],
  '/': ['..k', '..k', '.k.', 'k..', 'k..'],
  A: ['.k.', 'k.k', 'kkk', 'k.k', 'k.k'],
  I: ['kkk', '.k.', '.k.', '.k.', 'kkk'],
  U: ['k.k', 'k.k', 'k.k', 'k.k', 'kkk'],
  P: ['kk.', 'k.k', 'kk.', 'k..', 'k..'],
  H: ['k.k', 'k.k', 'kkk', 'k.k', 'k.k'],
  F: ['kkk', 'k..', 'kk.', 'k..', 'k..'],
  V: ['k.k', 'k.k', 'k.k', 'k.k', '.k.'],
  N: ['k..k', 'kk.k', 'k.kk', 'k..k', 'k..k'],
  M: ['k...k', 'kk.kk', 'k.k.k', 'k...k', 'k...k'],
  W: ['k...k', 'k...k', 'k.k.k', 'k.k.k', '.k.k.'],
}
// Escreve texto com a fonte acima; cada letra avança a própria largura + 1px
function text(cv, x, y, str, color) {
  let cursor = x
  for (const ch of str) {
    cv.art(cursor, y, font[ch], { k: color })
    cursor += font[ch][0].length + 1
  }
}

// Contorno de elipse centrada em (cx, cy), com raios a (horizontal) e b (vertical)
function ring(cv, cx, cy, a, b, color) {
  for (let y = 0; y < cv.grid.length; y++)
    for (let x = 0; x < cv.grid[0].length; x++) {
      const v = ((x + 0.5 - cx) / a) ** 2 + ((y + 0.5 - cy) / b) ** 2
      if (v >= 0.62 && v <= 1.25) cv.px(x, y, color)
    }
}

function toSvg({ grid }) {
  const h = grid.length
  const w = grid[0].length
  let rects = ''
  grid.forEach((row, y) => {
    let x = 0
    while (x < w) {
      const c = row[x]
      let run = 1
      while (x + run < w && row[x + run] === c) run++
      if (c !== '.') rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${palette[c]}"/>`
      x += run
    }
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${rects}</svg>\n`
}

const drawings = {
  // Logo: cabeça de robô
  logo() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '.......kk.......',
      '......krrk......',
      '.......kk.......',
      '...kkkkkkkkkk...',
      '..kgwwgggggggk..',
      '..kgkkkkkkkkgk..',
      '.kkgkKKKKKKkgkk.',
      '.kGgkKcKKcKkgGk.',
      '.kGgkKcKKcKkgGk.',
      '.kkgkKKKKKKkgkk.',
      '..kgkKKccKKkgk..',
      '..kgkkkkkkkkgk..',
      '..kggggggggggk..',
      '..kgggGGGGgggk..',
      '...kkkkkkkkkk...',
      '................',
    ])
    return cv
  },

  // Blog: livro aberto
  'nav-blog'() {
    const cv = canvas(16, 16)
    cv.rect(0, 4, 16, 10, 'R')
    cv.rect(1, 2, 8, 10, 'w')
    cv.rect(8, 2, 7, 10, 'w')
    cv.vline(8, 2, 12, 'k')
    for (const y of [4, 6, 8]) {
      cv.hline(3, 6, y, 'G')
      cv.hline(10, 12, y, 'G')
    }
    cv.hline(3, 5, 10, 'G')
    cv.vline(12, 9, 13, 'y')
    cv.px(12, 14, 'Y')
    return cv
  },

  // Estantes: livros na prateleira
  'nav-shelves'() {
    const cv = canvas(16, 16)
    cv.rect(1, 4, 4, 10, 'b')
    cv.hline(2, 3, 6, 'w')
    cv.hline(2, 3, 11, 'B')
    cv.rect(4, 2, 4, 12, 'r')
    cv.hline(5, 6, 4, 'y')
    cv.hline(5, 6, 10, 'R')
    cv.rect(7, 5, 4, 9, 'n')
    cv.hline(8, 9, 7, 'N')
    cv.art(10, 3, ['..kk', '.kyk', '.kyk', 'kYk.', 'kYk.', 'kYk.', 'kYk.', 'kYk.', 'kYk.', 'kkk.'])
    cv.rect(0, 13, 16, 3, 'm')
    cv.hline(1, 14, 14, 'M')
    return cv
  },

  // Projetos: janela com </>
  'nav-projects'() {
    const cv = canvas(16, 16)
    cv.rect(0, 1, 16, 14, 'K')
    cv.rect(0, 1, 16, 4, 'd')
    cv.px(2, 2, 'r')
    cv.px(4, 2, 'y')
    cv.px(6, 2, 'n')
    cv.hline(1, 14, 3, 'G')
    text(cv, 2, 7, '</>', 'c')
    return cv
  },

  // Sobre mim: crachá
  'nav-about'() {
    const cv = canvas(16, 16)
    cv.rect(0, 3, 16, 11, 'w')
    cv.rect(0, 3, 16, 3, 'p')
    cv.hline(6, 9, 4, 'P')
    cv.rect(2, 7, 5, 5, 'c', 'k')
    cv.art(3, 8, ['ss.', 'ss.', 'BBB'].map((r) => r.padEnd(3, '.')))
    cv.hline(8, 13, 8, 'G')
    cv.hline(8, 12, 10, 'G')
    return cv
  },

  // Ícone dos títulos de projetos: estrela
  star() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '.......kk.......',
      '......kyyk......',
      '......kyyk......',
      '.....kyyyyk.....',
      'kkkkkkyyyykkkkkk',
      'kyyyyyyyyyywyyyk',
      '.kyyyyyyyyyyyyk.',
      '..kyyyyyyyyyyk..',
      '...kyyyyyyyyk...',
      '...kyyYYYYyyk...',
      '..kyyYkkkkYyyk..',
      '..kyYk....kYyk..',
      '.kyYk......kYyk.',
      '.kYk........kYk.',
      '.kk..........kk.',
      '................',
    ])
    return cv
  },

  js() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'y', 'Y')
    text(cv, 7, 9, 'JS', 'k')
    return cv
  },

  ts() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'T', 'B')
    text(cv, 7, 9, 'TS', 'w')
    return cv
  },

  css() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'P', 'k')
    text(cv, 2, 9, 'CSS', 'w')
    return cv
  },

  html() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'O', 'k')
    text(cv, 2, 5, '</>', 'w')
    return cv
  },

  node() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '.......kk.......',
      '.....kkNNkk.....',
      '...kkNNNNNNkk...',
      '.kkNNNNNNNNNNkk.',
      'kNNNNnnnnnnNNNNk',
      'kNNNnnkkkknnNNNk',
      'kNNNnk....knNNNk',
      'kNNNnk.nn.knNNNk',
      'kNNNnk.nn.knNNNk',
      'kNNNnk....knNNNk',
      'kNNNnnkkkknnNNNk',
      'kNNNNnnnnnnNNNNk',
      '.kkNNNNNNNNNNkk.',
      '...kkNNNNNNkk...',
      '.....kkNNkk.....',
      '.......kk.......',
    ])
    return cv
  },

  // Automação: engrenagem
  gear() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '......kkkk......',
      '......kGGk......',
      '..kk.kkGGkk.kk..',
      '..kGkkGGGGkkGk..',
      '...kGGGGGGGGk...',
      '.kkkGGGkkGGGkkk.',
      'kGGGGGk..kGGGGGk',
      'kGGGGk....kGGGGk',
      'kGGGGk....kGGGGk',
      'kGGGGGk..kGGGGGk',
      '.kkkGGGkkGGGkkk.',
      '...kGGGGGGGGk...',
      '..kGkkGGGGkkGk..',
      '..kk.kkGGkk.kk..',
      '......kGGk......',
      '......kkkk......',
    ])
    return cv
  },

  // Chatbot: balão de conversa
  chat() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '................',
      '.kkkkkkkkkkkkkk.',
      'knnnnnnnnnnnnnnk',
      'knnnnnnnnnnnnnnk',
      'knnnnnnnnnnnnnnk',
      'knnkknnkknnkknnk',
      'knnkknnkknnkknnk',
      'knnnnnnnnnnnnnnk',
      'knnnnnnnnnnnnnnk',
      'kNNNNNNNNNNNNNNk',
      '.kkkkNNkkkkkkkk.',
      '....kNNk........',
      '....kNk.........',
      '....kk..........',
      '................',
      '................',
    ])
    return cv
  },

  terminal() {
    const cv = canvas(16, 16)
    cv.rect(0, 1, 16, 14, 'K')
    cv.rect(0, 1, 16, 3, 'd')
    cv.art(2, 6, ['k..', '.k.', '..k', '.k.', 'k..'], { k: 'n' })
    cv.hline(7, 11, 10, 'n')
    return cv
  },

  // Certificado Google UX Design: tela com wireframe + cursor
  'ux-design'() {
    const cv = canvas(16, 16)
    cv.rect(0, 1, 14, 12, 'w')
    cv.rect(0, 1, 14, 4, 'U')
    cv.px(2, 2, 'E')
    cv.px(4, 2, 'A')
    cv.px(6, 2, 'V')
    cv.rect(2, 6, 4, 3, 'A', null)
    cv.hline(7, 11, 6, 'G')
    cv.hline(7, 9, 8, 'G')
    cv.rect(2, 10, 4, 1, 'V', null)
    cv.art(9, 7, ['w.....', 'ww....', 'wkw...', 'wkkw..', 'wkkkw.', 'wkkkkw', 'wkwwww', 'ww....'])
    return cv
  },

  // Formação acadêmica: capelo
  graduation() {
    const cv = canvas(16, 16)
    cv.rect(4, 8, 8, 5, 'B')
    cv.art(0, 1, [
      '.......kk.......',
      '.....kkTTkk.....',
      '...kkTTbTTTkk...',
      '.kkTTTTTTTTTTkk.',
      'kTTTTTTTTTTTTTTk',
      '.kkTTTTTTTTTTkk.',
      '...kkTTTTTTkk...',
      '.....kkTTkk.....',
      '.......kk.......',
    ])
    cv.vline(13, 6, 11, 'y')
    cv.rect(12, 11, 3, 3, 'Y', null)
    return cv
  },

  // PUC Goiás: quadrado azul com brasão simplificado e "PUC"
  'puc-goias'() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'X', null)
    for (const [x, y] of [[0, 0], [15, 0], [0, 15], [15, 15]]) cv.px(x, y, '.')
    cv.art(0, 1, [
      '.....y.yy.y.....',
      '.....yRyyRy.....',
      '....y.bbbb.y....',
      '....y.bwwb.y....',
      '....y.bbbb.y....',
      '.....ybyyby.....',
      '......ybby......',
      '.......yy.......',
    ])
    text(cv, 3, 10, 'PUC', 'w')
    return cv
  },

  // ---- Conhecimentos ----

  // React: átomo (duas órbitas e o núcleo)
  react() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'K')
    ring(cv, 8, 8, 6.6, 2.6, 'c')
    ring(cv, 8, 8, 2.6, 6.6, 'c')
    cv.rect(7, 7, 2, 2, 'w', null)
    return cv
  },

  nextjs() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'K')
    text(cv, 6, 9, 'N', 'w')
    return cv
  },

  php() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'H')
    text(cv, 2, 9, 'PHP', 'w')
    return cv
  },

  wordpress() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'Q')
    text(cv, 5, 9, 'WP', 'w')
    return cv
  },

  flutterflow() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'P')
    text(cv, 7, 9, 'FF', 'w')
    return cv
  },

  vmware() {
    const cv = canvas(16, 16)
    cv.rect(0, 0, 16, 16, 'd')
    text(cv, 5, 9, 'VM', 'w')
    return cv
  },

  // Linux: pinguim
  linux() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '................',
      '......kkkk......',
      '.....kkkkkk.....',
      '.....kwkkwk.....',
      '.....kkyykk.....',
      '....kkwwwwkk....',
      '...kkwwwwwwkk...',
      '...kwwwwwwwwk...',
      '..kkwwwwwwwwkk..',
      '..kkwwwwwwwwkk..',
      '..kkwwwwwwwwkk..',
      '...kwwwwwwwwk...',
      '...kkwwwwwwkk...',
      '..yyykkkkkkyyy..',
      '..yyyy....yyyy..',
      '................',
    ])
    return cv
  },

  // Firebase: chama
  firebase() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '................',
      '......kk........',
      '.....kyyk.......',
      '.....kyyk..k....',
      '....kyyoyk.kk...',
      '....kyooyykyk...',
      '...kyyoooyyyyk..',
      '...kyooOOooyyk..',
      '..kyyoOOOOoyyk..',
      '..kyoOOOOOOoyk..',
      '..kyoOOyyOOoyk..',
      '..kyoOyyyyOoyk..',
      '...kyoyyyyoyk...',
      '....kkyyyykk....',
      '......kkkk......',
      '................',
    ])
    return cv
  },

  // Supabase: raio
  supabase() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '................',
      '.........kkkk...',
      '........kNnnk...',
      '.......kNnnk....',
      '......kNnnk.....',
      '.....kNnnk......',
      '....kNnnnkkkk...',
      '...kNnnnnnnnk...',
      '...kkkknnnnk....',
      '......knnnk.....',
      '.....knnnk......',
      '....knnnk.......',
      '...knnk.........',
      '..kkk...........',
      '................',
      '................',
    ])
    return cv
  },

  // AppSheet: planilha
  appsheet() {
    const cv = canvas(16, 16)
    cv.rect(0, 1, 16, 14, 'w')
    cv.rect(0, 1, 16, 4, 'N')
    for (const x of [5, 10]) cv.vline(x, 5, 13, 'G')
    for (const y of [7, 10]) cv.hline(1, 14, y, 'G')
    return cv
  },

  // Redes: três nós conectados
  network() {
    const cv = canvas(16, 16)
    cv.vline(7, 3, 8, 'G')
    cv.vline(8, 3, 8, 'G')
    cv.hline(3, 12, 8, 'G')
    cv.vline(3, 8, 11, 'G')
    cv.vline(12, 8, 11, 'G')
    cv.rect(5, 0, 6, 4, 'b')
    cv.rect(0, 11, 6, 4, 'b')
    cv.rect(10, 11, 6, 4, 'b')
    return cv
  },

  // Firewall: muro de tijolos
  firewall() {
    const cv = canvas(16, 16)
    cv.rect(0, 2, 16, 12, 'R')
    for (const y of [5, 8, 11]) cv.hline(1, 14, y, 'M')
    for (const [y1, y2, xs] of [
      [3, 4, [5, 10]],
      [6, 7, [3, 8, 13]],
      [9, 10, [5, 10]],
      [12, 12, [3, 8, 13]],
    ])
      for (const x of xs) cv.vline(x, y1, y2, 'M')
    return cv
  },

  // Hardware: monitor
  hardware() {
    const cv = canvas(16, 16)
    cv.rect(0, 1, 16, 11, 'K')
    cv.rect(1, 2, 14, 9, 'b', null)
    cv.hline(2, 5, 3, 'w')
    cv.rect(6, 12, 4, 2, 'G')
    cv.rect(3, 13, 10, 2, 'd')
    return cv
  },

  // Microsoft Office / documentos: folha de texto
  office() {
    const cv = canvas(16, 16)
    cv.rect(2, 0, 12, 16, 'w')
    cv.rect(2, 0, 12, 4, 'T')
    for (const y of [6, 8, 10]) cv.hline(4, 11, y, 'G')
    cv.hline(4, 8, 12, 'G')
    return cv
  },

  // Suporte técnico: headset
  support() {
    const cv = canvas(16, 16)
    cv.art(0, 0, [
      '................',
      '.....kkkkkk.....',
      '...kkGGGGGGkk...',
      '..kGGkkkkkkGGk..',
      '..kGk......kGk..',
      '.kGk........kGk.',
      'kkkkk......kkkkk',
      'kbbbk......kbbbk',
      'kbbbk......kbbbk',
      'kbbbk......kbbbk',
      'kkkkk......kkGkk',
      '............kGk.',
      '..........kkGk..',
      '........kkGGk...',
      '........kkkk....',
      '................',
    ])
    return cv
  },

  // DashGLPI: janela com gráfico de barras
  dashboard() {
    const cv = canvas(16, 16)
    cv.rect(0, 1, 16, 14, 'K')
    cv.rect(0, 1, 16, 3, 'd')
    cv.px(2, 2, 'r')
    cv.px(4, 2, 'y')
    cv.px(6, 2, 'n')
    cv.vline(3, 10, 12, 'b')
    cv.vline(4, 10, 12, 'b')
    cv.vline(6, 7, 12, 'n')
    cv.vline(7, 7, 12, 'n')
    cv.vline(9, 9, 12, 'y')
    cv.vline(10, 9, 12, 'y')
    cv.vline(12, 5, 12, 'r')
    cv.vline(13, 5, 12, 'r')
    cv.hline(2, 14, 13, 'G')
    return cv
  },

  // Certificado Google AI: chip com "AI"
  'google-ai'() {
    const cv = canvas(16, 16)
    for (const p of [5, 10]) {
      cv.vline(p, 0, 1, 'G')
      cv.vline(p, 14, 15, 'G')
      cv.hline(0, 1, p, 'G')
      cv.hline(14, 15, p, 'G')
    }
    cv.rect(2, 2, 12, 12, 'K')
    cv.px(3, 3, 'U')
    cv.px(12, 3, 'E')
    cv.px(3, 12, 'A')
    cv.px(12, 12, 'V')
    text(cv, 4, 5, 'AI', 'w')
    cv.hline(5, 10, 11, 'd')
    return cv
  },

  // Mascote do topo da página inicial: robozinho
  mascot() {
    const cv = canvas(32, 32)
    // antena
    cv.vline(15, 1, 3, 'k')
    cv.vline(16, 1, 3, 'k')
    cv.art(14, 0, ['.kk.', 'krrk'])
    cv.art(14, 0, ['.kk.'])
    // orelhas
    cv.rect(4, 8, 4, 5, 'G')
    cv.rect(24, 8, 4, 5, 'G')
    // cabeça
    cv.rect(6, 4, 20, 12, 'g')
    cv.hline(7, 10, 5, 'w')
    cv.vline(7, 5, 7, 'w')
    // tela do rosto
    cv.rect(8, 6, 16, 8, 'K')
    cv.rect(11, 8, 2, 2, 'c', null)
    cv.rect(19, 8, 2, 2, 'c', null)
    cv.hline(10, 11, 11, 'r')
    cv.hline(20, 21, 11, 'r')
    cv.art(14, 11, ['c..c', '.cc.'])
    // pescoço
    cv.rect(13, 15, 6, 3, 'G')
    // corpo
    cv.rect(7, 17, 18, 10, 'g')
    cv.hline(8, 10, 18, 'w')
    cv.rect(10, 19, 12, 6, 'd')
    cv.px(12, 21, 'n')
    cv.px(14, 21, 'y')
    cv.px(16, 21, 'r')
    cv.hline(12, 19, 23, 'c')
    // braços
    cv.rect(3, 18, 5, 7, 'G')
    cv.rect(24, 18, 5, 7, 'G')
    cv.rect(3, 24, 5, 3, 'd')
    cv.rect(24, 24, 5, 3, 'd')
    // pernas e pés
    cv.rect(10, 26, 4, 4, 'G')
    cv.rect(18, 26, 4, 4, 'G')
    cv.rect(8, 29, 7, 3, 'd')
    cv.rect(17, 29, 7, 3, 'd')
    return cv
  },
}

fs.mkdirSync(OUT, { recursive: true })
for (const [name, draw] of Object.entries(drawings)) {
  fs.writeFileSync(path.join(OUT, `${name}.svg`), toSvg(draw()))
}
// favicon do Next (app/icon.svg)
fs.writeFileSync(path.join(process.cwd(), 'src', 'app', 'icon.svg'), toSvg(drawings.logo()))
console.log(`${Object.keys(drawings).length} imagens geradas em public/images/`)
