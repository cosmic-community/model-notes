import Link from 'next/link'
import type { ModelProfile } from '@/types'
import { getMetafieldValue, getName, getSafeUrl } from '@/lib/cosmic'
import Badge from '@/components/Badge'

interface ModelCardProps {
  model: ModelProfile
}

export default function ModelCard({ model }: ModelCardProps) {
  if (!model || !model.slug) return null

  const name = getName(model)
  const provider = getMetafieldValue(model.metadata?.provider)
  const modality = getMetafieldValue(model.metadata?.modality)
  const summary = getMetafieldValue(model.metadata?.summary)
  const bestFor = getMetafieldValue(model.metadata?.best_for)
  const docsUrl = getSafeUrl(model.metadata?.docs_url)

  return (
    <article className="flex h-full flex-col rounded-lg border border-rule bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        {modality && <Badge>{modality}</Badge>}
        {provider && <span className="text-xs text-ink-soft">{provider}</span>}
      </div>
      <h3 className="mt-3 font-serif text-xl font-bold">
        <Link href={`/models/${model.slug}`} className="hover:text-accent">
          {name}
        </Link>
      </h3>
      {summary && <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{summary}</p>}
      {bestFor && (
        <p className="mt-3 text-sm">
          <span className="font-semibold">Best for: </span>
          <span className="text-ink-soft">{bestFor}</span>
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-4 text-sm">
        <Link href={`/models/${model.slug}`} className="font-semibold text-accent hover:text-accent-dark">
          Read profile
        </Link>
        {docsUrl && (
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft underline underline-offset-4 hover:text-accent"
          >
            Official docs<span className="sr-only"> for {name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  )
}