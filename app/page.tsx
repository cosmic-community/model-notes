import Link from 'next/link'
import { getModelProfiles, getPosts, getTopics, getName } from '@/lib/cosmic'
import SectionHeading from '@/components/SectionHeading'
import ModelFamilies from '@/components/ModelFamilies'
import TradeoffGrid from '@/components/TradeoffGrid'
import UseCaseIndex from '@/components/UseCaseIndex'
import ModelCard from '@/components/ModelCard'
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'

export default async function HomePage() {
  const [posts, models, topics] = await Promise.all([getPosts(), getModelProfiles(), getTopics()])
  const latestPosts = posts.slice(0, 3)
  const featuredModels = models.slice(0, 6)

  return (
    <>
      {/* Always-visible introduction: does not depend on CMS content */}
      <section className="border-b border-rule bg-paper-dark">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Model Notes</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-6xl">
            Choosing the right AI model, one task at a time.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Model Notes is an editorial guide for curious readers and practitioners. We explain what
            text, image, speech and multimodal models are good at, work through concrete tasks like
            summarizing meeting notes, captioning images and transcribing interviews, and weigh the
            tradeoffs: privacy, latency, cost and quality.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-ink-soft">
            We link to official documentation and deliberately leave out unverified pricing and
            benchmark numbers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/models"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Explore the model guide
            </Link>
            <Link
              href="/use-cases"
              className="rounded-md border border-ink px-5 py-3 text-sm font-semibold hover:bg-white"
            >
              Browse use cases
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Overview"
          title="Four model families, at a glance"
          description="A stable starting point for matching a task to a kind of model."
        />
        <ModelFamilies />
      </section>

      <section className="border-y border-rule bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Tradeoffs"
            title="Four questions before you pick"
            description="Every choice trades something. These are the questions worth asking first."
          />
          <TradeoffGrid />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Model guide"
          title="Model profiles"
          description="Short, practical profiles with links to official documentation."
          action={{ href: '/models', label: 'All models' }}
        />
        {featuredModels.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Model profiles are in editorial review"
            message="Profiles will appear here once they are published. In the meantime, the overview above and the use-case index below are ready to use."
          />
        )}
      </section>

      <section className="border-y border-rule bg-paper-dark">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Use-case index"
            title="Start from the task"
            description="Pick the job you need done and see which kind of model fits."
            action={{ href: '/use-cases', label: 'Full index' }}
          />
          <UseCaseIndex />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Articles"
          title="Latest notes"
          action={{ href: '/posts', label: 'All articles' }}
        />
        {latestPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="First articles are on their way"
            message="Our starter articles are still in editorial review. Check back soon, or start with the model guide."
            action={{ href: '/models', label: 'Open the model guide' }}
          />
        )}
      </section>

      {topics.length > 0 && (
        <section className="border-t border-rule bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="font-serif text-2xl font-bold">Browse by topic</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="inline-block rounded-full border border-rule bg-paper px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
                  >
                    {getName(topic)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}