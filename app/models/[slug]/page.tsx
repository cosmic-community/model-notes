// app/models/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMetafieldValue, getModelProfile, getName, getPostsByModel, getSafeUrl } from '@/lib/cosmic'
import Badge from '@/components/Badge'
import PostCard from '@/components/PostCard'
import RichContent from '@/components/RichContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const model = await getModelProfile(slug)
  if (!model) return { title: 'Model not found', robots: { index: false } }

  const name = getName(model)
  const description = getMetafieldValue(model.metadata?.summary) || `Profile of ${name}.`
  return {
    title: name,
    description,
    openGraph: { type: 'article', title: `${name} | Model Notes`, description },
    twitter: { card: 'summary', title: name, description },
    other: { 'cosmic-context': JSON.stringify({ object_id: model.id, object_type: model.type }) },
  }
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = await getModelProfile(slug)
  if (!model) notFound()

  const name = getName(model)
  const provider = getMetafieldValue(model.metadata?.provider)
  const modality = getMetafieldValue(model.metadata?.modality)
  const summary = getMetafieldValue(model.metadata?.summary)
  const bestFor = getMetafieldValue(model.metadata?.best_for)
  const tradeoffs = getMetafieldValue(model.metadata?.tradeoffs)
  const docsUrl = getSafeUrl(model.metadata?.docs_url)
  const topic = model.metadata?.topic
  const posts = await getPostsByModel(model.id)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/models" className="hover:text-accent">
          Model guide
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{name}</span>
      </nav>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {modality && <Badge>{modality}</Badge>}
          {topic && topic.slug && (
            <Link href={`/topics/${topic.slug}`}>
              <Badge tone="neutral">{getName(topic)}</Badge>
            </Link>
          )}
        </div>
        <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">{name}</h1>
        {provider && <p className="mt-2 text-ink-soft">Provider: {provider}</p>}
        {summary && <p className="mt-5 text-xl leading-relaxed text-ink-soft">{summary}</p>}
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border border-rule bg-white p-6" aria-labelledby="best-for">
          <h2 id="best-for" className="font-serif text-xl font-bold">
            Best for
          </h2>
          <p className="mt-3 text-ink-soft">
            {bestFor || 'Best-fit tasks have not been added to this profile yet.'}
          </p>
        </section>
        <section className="rounded-lg border border-rule bg-white p-6" aria-labelledby="tradeoffs">
          <h2 id="tradeoffs" className="font-serif text-xl font-bold">
            Tradeoffs
          </h2>
          <div className="mt-3 text-ink-soft">
            {tradeoffs ? (
              <RichContent content={tradeoffs} />
            ) : (
              <p>Tradeoffs have not been added to this profile yet.</p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-lg border border-rule bg-paper-dark p-6" aria-labelledby="docs">
        <h2 id="docs" className="font-serif text-xl font-bold">
          Official documentation
        </h2>
        {docsUrl ? (
          <p className="mt-3">
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline underline-offset-4 hover:text-accent-dark"
            >
              Read the {name} docs
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : (
          <p className="mt-3 text-ink-soft">A documentation link has not been added yet.</p>
        )}
        <p className="mt-3 text-sm text-ink-soft">
          Check the official docs for current capabilities, pricing and data policies.
        </p>
      </section>

      {posts.length > 0 && (
        <section className="mt-14" aria-labelledby="related-posts">
          <h2 id="related-posts" className="font-serif text-2xl font-bold">
            Articles mentioning {name}
          </h2>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}