import Link from 'next/link'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  level?: 1 | 2
  action?: { href: string; label: string }
}

export default function SectionHeading({ eyebrow, title, description, level = 2, action }: SectionHeadingProps) {
  const titleClass = 'mt-2 font-serif text-3xl font-bold sm:text-4xl'

  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
        {level === 1 ? <h1 className={titleClass}>{title}</h1> : <h2 className={titleClass}>{title}</h2>}
        {description && <p className="mt-3 text-lg text-ink-soft">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="text-sm font-semibold text-accent hover:text-accent-dark">
          {action.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  )
}