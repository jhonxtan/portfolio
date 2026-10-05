import type { Metadata } from 'next'
import { Google_Sans_Code, Google_Sans_Flex, Outfit } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Navigation } from '@/components/Navigation'
import { Sidebar } from '@/components/Sidebar'
import { site } from '@/data/site'
import { themeScript } from '@/lib/themeScript'
import './globals.css'
// Importados aqui (e não via @import no globals.css) para o Next recarregar ao editar
import '@/styles/tania.css'
import '@/styles/new-moon.css'
import '@/styles/extras.css'

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] })
// adjustFontFallback: o Next ainda não tem métricas de fallback para essas duas fontes
const googleSansFlex = Google_Sans_Flex({ variable: '--font-gsf', subsets: ['latin'], adjustFontFallback: false })
const googleSansCode = Google_Sans_Code({ variable: '--font-gsc', subsets: ['latin'], adjustFontFallback: false })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.title} — ${site.description}`, template: `%s | ${site.title}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: 'website', locale: 'pt_BR' },
  alternates: { types: { 'application/rss+xml': '/rss.xml' } },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${outfit.variable} ${googleSansFlex.variable} ${googleSansCode.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
