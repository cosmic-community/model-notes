import type { Metadata } from 'next'
import { getTopics } from '@/lib/cosmic'
import TopicCard from '@/components/TopicCard'
import EmptyState from '@/components/EmptyState'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Browse Model Notes by topic: text, image, speech and multimodal models.',
}

export default async function TopicsPage() {
  const topics = await getTopics()

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Topics"
        title="Browse by topic"
        description="Each topic groups related model profiles and articles."
        level={1}
      />
      {topics.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No topics published yet"
          message="Topics will appear here once they are published."
          action={{ href: '/posts', label: 'Browse articles' }}
        />
      )}
    </div>
  )
}