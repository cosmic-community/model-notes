import Link from 'next/link'
import type { Topic } from '@/types'
import { getMetafieldValue, getName } from '@/lib/cosmic'
import Badge from '@/components/Badge'

interface TopicCardProps {
  topic: Topic
}

export default function TopicCard({ topic }: TopicCardProps) {
  if (!topic || !topic.slug) return null

  const description = getMetafieldValue(topic.metadata?.description)
  const modality = getMetafieldValue(topic.metadata?.modality)

  return (
    <article className="flex h-full flex-col rounded-lg border border-rule bg-white p-6 transition-shadow hover:shadow-md">
      {modality && (
        <div>
          <Badge>{modality}</Badge>
        </div>
      )}
      <h2 className="mt-3 font-serif text-2xl font-bold">
        <Link href={`/topics/${topic.slug}`} className="hover:text-accent">
          {getName(topic)}
        </Link>
      </h2>
      {description && <p className="mt-2 line-clamp-4 text-ink-soft">{description}</p>}
      <Link
        href={`/topics/${topic.slug}`}
        className="mt-auto pt-4 text-sm font-semibold text-accent hover:text-accent-dark"
      >
        Explore topic
      </Link>
    </article>
  )
}