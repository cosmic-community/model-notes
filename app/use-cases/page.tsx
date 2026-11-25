import type { Metadata } from 'next'
import Link from 'next/link'
import { getMetafieldValue, getPosts } from '@/lib/cosmic'
import { USE_CASES } from '@/lib/editorial'
import type { Post } from '@/types'
import Badge from '@/components/Badge'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Use-case index',
  description:
    'Start from the task: summarizing meeting notes, captioning images, transcribing interviews and more.',
}

export default async function UseCasesPage() {
  const posts = await getPosts()

  const groups = new Map<string, Post[]>()
  for (const post of posts) {
    const key = getMetafieldValue(post.metadata?.use_case).trim()
    if (!key) continue
    const list = groups.get(key) ?? []
    list.push(post)
    groups.set(key, list)
  }
  const entries = Array.from(groups.entries())

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Use-case index"
        title="Start from the task"
        description="Each entry names the kind of model that usually fits and the thing to weigh first."
        level={1}
      />

      <ul className="grid gap-6 md:grid-cols-2">
        {USE_CASES.map((useCase) => (
          <li
            key={useCase.id}
            id={useCase.id}
            className="scroll-mt-24 rounded-lg border border-rule bg-white p-6"
          >
            <Badge>{useCase.modality}</Badge>
            <h2 className="mt-3 font-serif text-2xl font-bold">{useCase.title}</h2>
            <p className="mt-2 text-ink-soft">{useCase.summary}</p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">Weigh first: </span>
              <span className="text-ink-soft">{useCase.consider}</span>
            </p>
          </li>
        ))}
      </ul>

      <section className="mt-16" aria-labelledby="articles-by-use-case">
        <h2 id="articles-by-use-case" className="font-serif text-3xl font-bold">
          Articles by use case
        </h2>
        {entries.length > 0 ? (
          <div className="mt-8 space-y-12">
            {entries.map(([useCase, list]) => (
              <div key={useCase}>
                <h3 className="font-serif text-xl font-bold">{useCase}</h3>
                <div className="mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-ink-soft">
            Published articles will be grouped here by use case. Meanwhile, see the{' '}
            <Link href="/models" className="text-accent underline underline-offset-4">
              model guide
            </Link>
            .
          </p>
        )}
      </section>
    </div>
  )
}