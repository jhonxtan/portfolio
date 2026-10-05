# Portfólio

Site pessoal com **Next.js (App Router) + React + TypeScript + Tailwind CSS**, reproduzindo o layout e o
comportamento de [taniarascia.com](https://www.taniarascia.com).

O CSS de layout foi portado do [repositório do site original](https://github.com/taniarascia/taniarascia.com)
(licença MIT, © Tania Rascia) — veja o cabeçalho de `src/styles/tania.css`. Textos, ícones em pixel art e a
mascote deste projeto são próprios.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Nome, domínio, e-mail, GitHub, LinkedIn, comentários | `src/data/site.ts` |
| Texto da página inicial (linha do tempo) | `src/app/page.tsx` |
| Bio da barra lateral | `src/components/Sidebar.tsx` |
| Projetos | `src/data/projectsList.ts` |
| Estantes (seleções de posts) | `src/data/shelvesList.ts` |
| Séries | `src/data/seriesList.ts` |
| Filtros rápidos do blog | `src/components/Search.tsx` |
| Posts | `content/blog/*.md` |
| "Sobre mim" e "Currículo" | `content/pages/me.md`, `content/pages/resume.md` |
| Cores, temas e layout | `src/styles/tania.css` (original) e `src/styles/extras.css` (ajustes) |
| Ícones e mascote em pixel art | `scripts/generate-pixel-art.mjs` → `node scripts/generate-pixel-art.mjs` |

### Novo post

Crie `content/blog/meu-post.md` — ele fica em `/meu-post`:

```md
---
title: Meu novo post
description: Uma frase sobre o post.
date: 2026-10-02
tags: [javascript, tutorial]
thumbnail: js          # ícone de public/images (js, ts, node, css, html, gear, chat, terminal...)
series: Automação do Zero   # opcional: título de uma série de src/data/seriesList.ts
draft: false           # true = só aparece no npm run dev
---
```

Títulos `##` e `###` geram o sumário lateral automaticamente. Blocos de código usam Prism com o tema New Moon;
use ` ```terminal ` para o estilo de janela de terminal.

## Estrutura

```
content/              posts e páginas em Markdown
public/images/        ícones e mascote (SVG gerados pelo script)
scripts/              gerador da pixel art
src/app/              rotas: /, /blog, /[slug], /shelves, /projects, /me, /resume,
                      /topics, /topics/[topic], /series/[series], /rss.xml, /sitemap.xml
src/components/       Navigation (topo, < 1020px), Sidebar (≥ 1020px), tema/cor, busca, sumário...
src/data/             configuração e listas
src/lib/              leitura dos posts e pipeline Markdown (remark/rehype + Prism)
src/styles/           CSS portado do original + ajustes
```

## Publicar

Na Vercel: importe o repositório (o Next.js é detectado automaticamente). Todas as páginas são estáticas.
