import type { Metadata } from 'next'
import { Google_Sans_Code, Google_Sans_Flex, Pixelify_Sans, Press_Start_2P } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Navigation } from '@/components/Navigation'
import { Sidebar } from '@/components/Sidebar'
import { site } from '@/data/site'
import './globals.css'
// Importados aqui (e não via @import no globals.css) para o Next recarregar ao editar
import '@/styles/styles.css'
import '@/styles/new-moon.css'
import '@/styles/extras.css'
import '@/styles/pixel-world.css'

const pixelify = Pixelify_Sans({ variable: '--font-heading', subsets: ['latin'] })
const pressStart = Press_Start_2P({ variable: '--font-hud', weight: '400', subsets: ['latin'] })
const googleSansFlex = Google_Sans_Flex({ variable: '--font-gsf', subsets: ['latin'], adjustFontFallback: false })
const googleSansCode = Google_Sans_Code({ variable: '--font-gsc', subsets: ['latin'], adjustFontFallback: false })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.title} — ${site.description}`, template: `%s | ${site.title}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: 'website', locale: 'pt_BR' },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      // O site tem um tema só: a fase noturna (modo escuro)
      className={`is-dark ${pixelify.variable} ${pressStart.variable} ${googleSansFlex.variable} ${googleSansCode.variable}`}
    >
      <body>
        <div id="layout" className="layout">
          <Navigation />
          <Sidebar />
          <div className="main-wrapper">
            <div className="main-container">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
