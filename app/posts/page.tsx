import type { Metadata } from 'next'
import { getPosts, getMetafieldValue, getTags, getName } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Practical articles on choosing and using AI models for real tasks.',
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const sp = await searchParams
  const raw = Array.isArray(sp.q) ? sp.q[0] : sp.q
  const query = (raw ?? '').trim().toLowerCase()

  const posts = await getPosts()
  const filtered = query
    ? posts.filter((post) => {
        const haystack = [
          post.title,
          getMetafieldValue(post.metadata?.summary),
          getMetafieldValue(post.metadata?.use_case),
          getTags(post.metadata?.tags).join(' '),
          getName(post.metadata?.topic),
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(query)
      })
    : posts

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Articles"
        title="All articles"
        description="Worked examples, comparisons and tradeoff notes."
        level={1}
      />

      <form action="/posts" method="get" role="search" className="mb-10 flex max-w-xl gap-2">
        <label htmlFor="q" className="sr-only">
          Search articles
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={raw ?? ''}
          placeholder="Search by topic, use case or tag"
          className="w-full rounded-md border border-rule bg-white px-4 py-2.5 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft"
        >
          Search
        </button>
      </form>

      {filtered.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : query ? (
        <EmptyState
          title="No articles match your search"
          message="Try a broader term, or clear the search to see everything."
          action={{ href: '/posts', label: 'Clear search' }}
        />
      ) : (
        <EmptyState
          title="No articles published yet"
          message="Starter articles are in editorial review and will appear here once published."
          action={{ href: '/models', label: 'Explore the model guide' }}
        />
      )}
    </div>
  )
}