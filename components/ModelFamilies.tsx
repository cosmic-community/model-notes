import { MODEL_FAMILIES, PROVIDER_DOCS } from '@/lib/editorial'

export default function ModelFamilies() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {MODEL_FAMILIES.map((family) => (
          <article key={family.id} id={family.id} className="scroll-mt-24 rounded-lg border border-rule bg-white p-6">
            <h3 className="font-serif text-2xl font-bold">{family.name}</h3>
            <p className="mt-2 text-ink-soft">{family.summary}</p>
            <p className="mt-4 text-sm font-semibold">Typical tasks</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-soft">
              {family.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <span className="font-semibold">Watch for: </span>
              <span className="text-ink-soft">{family.watchFor}</span>
            </p>
            <p className="mt-4 text-sm">
              <a
                href={family.docs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-4 hover:text-accent-dark"
              >
                {family.docs.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-rule bg-paper-dark p-6">
        <h3 className="font-serif text-xl font-bold">Official provider documentation</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Go to the source for current capabilities, limits, pricing and data policies.
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {PROVIDER_DOCS.map((doc) => (
            <li key={doc.url}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-rule bg-white px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
              >
                {doc.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}