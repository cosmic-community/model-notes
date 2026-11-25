// app/topics/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMetafieldValue, getModelsByTopic, getName, getPostsByTopic, getTopic } from '@/lib/cosmic'
import Badge from '@/components/Badge'
import ModelCard from '@/components/ModelCard'
import PostCard from '@/components/PostCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = await getTopic(slug)
  if (!topic) return { title: 'Topic not found', robots: { index: false } }

  const name = getName(topic)
  const description = getMetafieldValue(topic.metadata?.description) || `Articles and models about ${name}.`
  return {
    title: name,
    description,
    openGraph: { title: `${name} | Model Notes`, description },
    other: { 'cosmic-context': JSON.stringify({ object_id: topic.id, object_type: topic.type }) },
  }
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = await getTopic(slug)
  if (!topic) notFound()

  const [models, posts] = await Promise.all([getModelsByTopic(topic.id), getPostsByTopic(topic.id)])
  const name = getName(topic)
  const description = getMetafieldValue(topic.metadata?.description)
  const modality = getMetafieldValue(topic.metadata?.modality)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/topics" className="hover:text-accent">
          Topics
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{name}</span>
      </nav>

      <header className="mt-6 max-w-3xl">
        {modality && <Badge>{modality}</Badge>}
        <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">{name}</h1>
        {description && <p className="mt-4 text-xl leading-relaxed text-ink-soft">{description}</p>}
      </header>

      <section className="mt-12" aria-labelledby="topic-models">
        <h2 id="topic-models" className="font-serif text-2xl font-bold">
          Model profiles
        </h2>
        {models.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <p className="mt-3 text-ink-soft">No published model profiles under this topic yet.</p>
        )}
      </section>

      <section className="mt-14" aria-labelledby="topic-posts">
        <h2 id="topic-posts" className="font-serif text-2xl font-bold">
          Articles
        </h2>
        {posts.length > 0 ? (
          <div className="mt-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-3 text-ink-soft">No published articles under this topic yet.</p>
        )}
      </section>
    </div>
  )
}