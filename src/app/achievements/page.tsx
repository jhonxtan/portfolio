import type { Metadata } from 'next'
import { Achievements } from '@/components/Achievements'
import { Hero } from '@/components/Hero'
import { getAchievements } from '@/lib/content'

const title = 'Conquistas'
const description = 'Certificados, eventos e lançamentos: cada fase concluída pelo caminho.'

export const metadata: Metadata = { title, description }

export default async function AchievementsPage() {
  const achievements = await getAchievements()

  return (
    <main className="main-content page">
      <Hero title={title} description={description} icon="/images/nav-achievements.svg">
        <p className="hud-counter bg-transparent">
          <img src="/images/coin.svg" alt="" width="20" height="20" />
          <span>× {String(achievements.length).padStart(2, '0')}</span>
        </p>
      </Hero>
      <Achievements entries={achievements} byYear />
    </main>
  )
}
