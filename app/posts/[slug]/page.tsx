// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  formatDate,
  getImageUrl,
  getMetafieldValue,
  getName,
  getPost,
  getTags,
} from '@/lib/cosmic'
import RichContent from '@/components/RichContent'
import Badge from '@/components/Badge'
import ModelCard from '@/components/ModelCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return { title: 'Article not found', robots: { index: false } }
  }

  const description =
    getMetafieldValue(post.metadata?.summary) || `${post.title}: practical notes on AI models.`
  const image = getImageUrl(post.metadata?.featured_image, 'w=1200&h=630&fit=crop&auto=format,compress')
  const isPublished = !post.status || post.status === 'published'
  const published = post.published_at || post.created_at

  return {
    title: post.title,
    description,
    keywords: getTags(post.metadata?.tags),
    robots: isPublished ? undefined : { index: false, follow: false },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      publishedTime: published,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
    other: {
      'cosmic-context': JSON.stringify({ object_id: post.id, object_type: post.type }),
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const summary = getMetafieldValue(post.metadata?.summary)
  const content = getMetafieldValue(post.metadata?.content)
  const useCase = getMetafieldValue(post.metadata?.use_case)
  const tags = getTags(post.metadata?.tags)
  const topic = post.metadata?.topic
  const author = post.metadata?.author
  const authorName = getName(author)
  const authorRole = getMetafieldValue(author?.metadata?.role)
  const authorBio = getMetafieldValue(author?.metadata?.bio)
  const image = getImageUrl(post.metadata?.featured_image, 'w=1600&h=900&fit=crop&auto=format,compress')
  const imageAlt = getMetafieldValue(post.metadata?.featured_image_alt) || post.title
  const relatedModels = (post.metadata?.related_models ?? []).filter(
    (m) => m && typeof m === 'object' && m.slug
  )
  const date = formatDate(post.published_at || post.created_at)
  const isDraft = Boolean(post.status && post.status !== 'published')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: summary || undefined,
    datePublished: post.published_at || post.created_at,
    dateModified: post.modified_at || undefined,
    author: authorName ? { '@type': 'Person', name: authorName } : undefined,
    image: image ? [image] : undefined,
    keywords: tags.length > 0 ? tags.join(', ') : undefined,
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/posts" className="hover:text-accent">
          Articles
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{post.title}</span>
      </nav>

      {isDraft && (
        <p
          role="status"
          className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900"
        >
          Draft preview. This article is not published and is only visible in preview.
        </p>
      )}

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {topic && topic.slug && (
            <Link href={`/topics/${topic.slug}`}>
              <Badge>{getName(topic)}</Badge>
            </Link>
          )}
          {useCase && <Badge tone="neutral">{useCase}</Badge>}
        </div>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
        {summary && <p className="mt-4 text-xl leading-relaxed text-ink-soft">{summary}</p>}
        <p className="mt-5 text-sm text-ink-soft">
          {authorName && (
            <>
              By <span className="font-semibold text-ink">{authorName}</span>
              {authorRole && <span>, {authorRole}</span>}
            </>
          )}
          {authorName && date && <span aria-hidden="true"> · </span>}
          {date && <time dateTime={post.published_at || post.created_at}>{date}</time>}
        </p>
      </header>

      {image && (
        <figure className="mt-8">
          <img
            src={image}
            alt={imageAlt}
            width={800}
            height={450}
            className="w-full rounded-lg border border-rule object-cover"
          />
        </figure>
      )}

      <div className="mt-10">
        {content ? (
          <RichContent content={content} />
        ) : (
          <p className="text-ink-soft">The full text of this article is not available yet.</p>
        )}
      </div>

      {tags.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/posts?q=${encodeURIComponent(tag)}`}
                className="inline-block rounded-full border border-rule bg-white px-3 py-1 text-xs font-medium hover:border-accent hover:text-accent"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {relatedModels.length > 0 && (
        <section className="mt-14" aria-labelledby="related-models">
          <h2 id="related-models" className="font-serif text-2xl font-bold">
            Models mentioned
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {relatedModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </section>
      )}

      <aside className="mt-14 rounded-lg border border-rule bg-paper-dark p-5 text-sm text-ink-soft">
        Model capabilities, pricing and data policies change. Confirm current details in the
        provider’s official documentation before you decide.
      </aside>

      {authorName && authorBio && (
        <section className="mt-10 border-t border-rule pt-8" aria-labelledby="about-author">
          <h2 id="about-author" className="text-sm font-semibold uppercase tracking-widest text-ink-soft">
            About the author
          </h2>
          <p className="mt-3 font-semibold">{authorName}</p>
          <p className="mt-1 text-ink-soft">{authorBio}</p>
        </section>
      )}
    </article>
  )
}