'use client'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-serif text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-ink-soft">We hit a problem loading this page. Please try again.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        Try again
      </button>
    </div>
  )
}