import Link from 'next/link'
import { formatDate, isNew } from '@/lib/helpers'
import { categories, type EntryMeta } from '@/lib/content'

export function CategoryBadge({ category }: { category: EntryMeta['category'] }) {
  const { label, icon } = categories[category]
  return (
    <span className="tag category-badge">
      <img src={icon} alt="" width="14" height="14" />
      {label}
    </span>
  )
}

function AchievementItem({ entry, withYear }: { entry: EntryMeta; withYear?: boolean }) {
  return (
    <Link href={`/${entry.slug}`} className="post detailed">
      <div className="post-thumbnail">{entry.thumbnail && <img src={entry.thumbnail} alt="" />}</div>
      <div className="post-info">
        <div className="post-title">
          <div>{entry.title}</div>
          {isNew(entry.date) && <div className="button x-small">Novo!</div>}
        </div>
        <time dateTime={entry.date.toISOString()}>{formatDate(entry.date, withYear)}</time>
        {entry.description && <p className="post-description">{entry.description}</p>}
      </div>
      <div className="post-tags">
        <CategoryBadge category={entry.category} />
      </div>
    </Link>
  )
}

// Lista de conquistas; com `byYear`, agrupa por ano com o total de cada um
export function Achievements({ entries, byYear }: { entries: EntryMeta[]; byYear?: boolean }) {
  if (!byYear) {
    return (
      <div className="posts">
        {entries.map((entry) => (
          <AchievementItem key={entry.slug} entry={entry} withYear />
        ))}
      </div>
    )
  }

  const entriesByYear = Map.groupBy(entries, (entry) => entry.date.getUTCFullYear())
  return [...entriesByYear].map(([year, items]) => (
    <section className="year" key={year}>
      <h2 className="flex-align-center gap">
        <div>{year}</div>
        <div className="chip">
          <span className="chip-highlight">{items.length}</span>
          {items.length === 1 ? 'conquista' : 'conquistas'}
        </div>
      </h2>
      <div className="posts">
        {items.map((entry) => (
          <AchievementItem key={entry.slug} entry={entry} />
        ))}
      </div>
    </section>
  ))
}
