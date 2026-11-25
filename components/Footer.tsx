import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-8 border-t border-rule bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-bold">Model Notes</p>
          <p className="mt-2 text-sm text-ink-soft">
            Practical notes on AI models and how to choose between them.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/posts" className="text-ink-soft hover:text-accent">
                Articles
              </Link>
            </li>
            <li>
              <Link href="/models" className="text-ink-soft hover:text-accent">
                Model guide
              </Link>
            </li>
            <li>
              <Link href="/topics" className="text-ink-soft hover:text-accent">
                Topics
              </Link>
            </li>
            <li>
              <Link href="/use-cases" className="text-ink-soft hover:text-accent">
                Use-case index
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-ink-soft">
          Editorial guidance, not a benchmark. We don’t publish unverified pricing or performance
          numbers. Check each provider’s official documentation for current details.
        </p>
      </div>
      <div className="border-t border-rule py-4 text-center text-xs text-ink-soft">
        © {year} Model Notes
      </div>
    </footer>
  )
}