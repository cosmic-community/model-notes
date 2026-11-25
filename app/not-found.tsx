import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 font-serif text-4xl font-bold">We couldn’t find that page</h1>
      <p className="mt-4 text-ink-soft">
        It may not be published yet, or the link may have changed. Try the model guide or the
        articles list instead.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          Back home
        </Link>
        <Link
          href="/posts"
          className="rounded-md border border-ink px-5 py-3 text-sm font-semibold hover:bg-white"
        >
          Browse articles
        </Link>
      </div>
    </div>
  )
}