import { TRADEOFFS } from '@/lib/editorial'

export default function TradeoffGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {TRADEOFFS.map((tradeoff) => (
        <article key={tradeoff.id} className="rounded-lg border border-rule bg-paper p-5">
          <h3 className="font-serif text-xl font-bold">{tradeoff.title}</h3>
          <p className="mt-2 text-sm font-semibold text-accent-dark">{tradeoff.question}</p>
          <p className="mt-2 text-sm text-ink-soft">{tradeoff.guidance}</p>
        </article>
      ))}
    </div>
  )
}