import Link from 'next/link'

interface EmptyStateProps {
  title: string
  message: string
  action?: { href: string; label: string }
}

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-rule bg-white px-6 py-12 text-center">
      <h3 className="font-serif text-xl font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-ink-soft">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-5 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}