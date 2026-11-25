import Link from 'next/link'
import type { Post } from '@/types'
import { formatDate, getImageUrl, getMetafieldValue, getName } from '@/lib/cosmic'
import Badge from '@/components/Badge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  if (!post || !post.slug) return null

  const image = getImageUrl(post.metadata?.featured_image, 'w=800&h=500&fit=crop&auto=format,compress')
  const imageAlt = getMetafieldValue(post.metadata?.featured_image_alt) || post.title
  const summary = getMetafieldValue(post.metadata?.summary)
  const useCase = getMetafieldValue(post.metadata?.use_case)
  const topicName = getName(post.metadata?.topic)
  const date = formatDate(post.published_at || post.created_at)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-white transition-shadow hover:shadow-md">
      {image && (
        <Link href={`/posts/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <img src={image} alt={imageAlt} width={400} height={250} className="aspect-[16/10] w-full object-cover" />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {topicName && <Badge>{topicName}</Badge>}
          {useCase && <Badge tone="neutral">{useCase}</Badge>}
        </div>
        <h3 className="mt-3 font-serif text-xl font-bold leading-snug">
          <Link href={`/posts/${post.slug}`} className="hover:text-accent">
            {post.title}
          </Link>
        </h3>
        {summary && <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{summary}</p>}
        {date && <p className="mt-auto pt-4 text-xs text-ink-soft">{date}</p>}
      </div>
    </article>
  )
}