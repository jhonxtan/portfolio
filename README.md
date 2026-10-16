# jhonatan.dev

Meu site pessoal: portfólio, currículo e conquistas como desenvolvedor web na Prefeitura de
Senador Canedo (GO), com foco em tecnologia a serviço da gestão pública. O visual é um mundo em pixel art
inspirado nos jogos de plataforma 16-bit.

Feito com **Next.js (App Router), React, TypeScript e Tailwind CSS**. Todas as páginas são geradas de forma
estática a partir de arquivos Markdown.

## Destaques

- **Pixel art própria**: ícones, mascote, estrelas, nuvens, moedas e blocos "?" desenhados em código
  (`scripts/generate-pixel-art.mjs`) e gerados como SVG.
- **Tema "Pixel World"**: uma fase noturna, com céu estrelado e nuvens discretas. Títulos em fonte
  pixelada e cards como blocos com sombra dura.
- **Conquistas em Markdown**: certificados, eventos e lançamentos com frontmatter, contador estilo HUD,
  sumário automático e realce de código com Prism.

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
| Habilidades, certificados e formação | `src/data/skillsList.ts` |
| Conquistas e estudos de caso | `content/conquistas/*.md` |
| "Sobre mim" e "Currículo" | `content/pages/me.md`, `content/pages/resume.md` |
| Cor de destaque e tons de fundo | `src/styles/extras.css` (tokens no topo) |
| Fundo, blocos, botões e fontes do tema | `src/styles/pixel-world.css` |
| Pixel art (ícones, mascote, estrelas, nuvens) | `scripts/generate-pixel-art.mjs` → `node scripts/generate-pixel-art.mjs` |

### Nova conquista

Crie `content/conquistas/minha-conquista.md` — ela fica em `/minha-conquista`:

```md
---
title: Minha nova conquista
description: Uma frase sobre ela.
date: 2026-10-02
category: certificado  # certificado, evento, lancamento ou projeto (estudo de caso, fica fora da lista)
thumbnail: js          # ícone de public/images (js, ts, node, google-ai, ux-design, chat, terminal...)
draft: false           # true = só aparece no npm run dev
---
```

Títulos `##` e `###` geram o sumário lateral automaticamente. Use ` ```terminal ` para o estilo de janela de
terminal nos blocos de código.

## Estrutura

```
content/              posts e páginas em Markdown
public/images/        ícones e mascote (SVG gerados pelo script)
scripts/              gerador da pixel art
src/app/              rotas: /, /achievements, /[slug], /skills, /projects, /me, /resume, /sitemap.xml
src/components/       Navigation (topo, < 1020px), Sidebar (≥ 1020px), conquistas, sumário...
src/data/             configuração e listas
src/lib/              leitura do conteúdo e pipeline Markdown (remark/rehype + Prism)
src/styles/           CSS base + tema Pixel World e ajustes deste projeto
```

## Publicar

Na Vercel: importe o repositório (o Next.js é detectado automaticamente).

## Créditos

A base de layout em `src/styles/styles.css` e o tema de código `src/styles/new-moon.css` foram adaptados do
[site de Tania Rascia](https://github.com/taniarascia/taniarascia.com) (licença MIT, © 2020 Tania Rascia) —
veja o cabeçalho de cada arquivo. Textos, tema, pixel art, mascote e conteúdo são próprios; o visual é
uma homenagem original aos jogos de plataforma 16-bit, sem sprites ou marcas de terceiros.
