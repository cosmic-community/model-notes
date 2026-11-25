import type { Metadata } from 'next'
import { getMetafieldValue, getModelProfiles } from '@/lib/cosmic'
import type { ModelProfile } from '@/types'
import ModelCard from '@/components/ModelCard'
import EmptyState from '@/components/EmptyState'
import SectionHeading from '@/components/SectionHeading'
import ModelFamilies from '@/components/ModelFamilies'

export const metadata: Metadata = {
  title: 'Model guide',
  description:
    'Profiles of AI models across text, image, speech and multimodal work, with tradeoffs and links to official documentation.',
}

export default async function ModelsPage() {
  const models = await getModelProfiles()

  const groups = new Map<string, ModelProfile[]>()
  for (const model of models) {
    const key = getMetafieldValue(model.metadata?.modality) || 'Other'
    const list = groups.get(key) ?? []
    list.push(model)
    groups.set(key, list)
  }
  const entries = Array.from(groups.entries())

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Model guide"
        title="Model profiles"
        description="What each model is best for, what it trades away, and where to find the official documentation. We do not publish unverified pricing or benchmarks."
        level={1}
      />

      {entries.length > 0 ? (
        <div className="space-y-14">
          {entries.map(([modality, list]) => (
            <section key={modality} aria-labelledby={`modality-${modality}`}>
              <h2 id={`modality-${modality}`} className="font-serif text-2xl font-bold">
                {modality}
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <>
          <EmptyState
            title="Model profiles are not published yet"
            message="Profiles will appear here after editorial review. The family overview below is a good place to start."
          />
          <div className="mt-14">
            <ModelFamilies />
          </div>
        </>
      )}
    </div>
  )
}