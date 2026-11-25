import Link from 'next/link'
import { USE_CASES } from '@/lib/editorial'
import Badge from '@/components/Badge'

export default function UseCaseIndex() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {USE_CASES.map((useCase) => (
        <li key={useCase.id} className="rounded-lg border border-rule bg-white p-5">
          <Badge>{useCase.modality}</Badge>
          <h3 className="mt-3 font-serif text-lg font-bold">
            <Link href={`/use-cases#${useCase.id}`} className="hover:text-accent">
              {useCase.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-ink-soft">{useCase.summary}</p>
        </li>
      ))}
    </ul>
  )
}