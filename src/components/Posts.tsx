import { Post, type PostNode } from './Post'

type PostsProps = {
  data: (PostNode & { date: Date })[]
  showYears?: boolean
  query?: string
  includeYear?: boolean
  numbered?: boolean
  detailed?: boolean
}

export function Posts({ data, showYears, query, includeYear, numbered, detailed }: PostsProps) {
  if (showYears) {
    const postsByYear = Map.groupBy(data, (post) => post.date.getUTCFullYear())

    return [...postsByYear].map(([year, posts]) => (
      <section className="year" key={year}>
        <h2 className="flex-align-center gap">
          <div>{year}</div>
          <div className="chip">
            <span className="chip-highlight">{posts.length}</span>
            {posts.length === 1 ? 'post' : 'posts'}
          </div>
        </h2>
        <div className="posts">
          {posts.map((node) => (
            <Post key={node.slug} node={node} query={query} includeYear={includeYear} detailed={detailed} />
          ))}
        </div>
      </section>
    ))
  }

  return (
    <div className="posts">
      {data.map((node, index) => (
        <Post
          key={node.slug}
          node={node}
          query={query}
          includeYear={includeYear}
          detailed={detailed}
          number={numbered ? index + 1 : undefined}
        />
      ))}
    </div>
  )
}
