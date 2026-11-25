'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS: { href: string; label: string }[] = [
  { href: '/posts', label: 'Articles' },
  { href: '/models', label: 'Model guide' },
  { href: '/topics', label: 'Topics' },
  { href: '/use-cases', label: 'Use cases' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)

  const isActive = (href: string): boolean => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-serif text-xl font-bold" onClick={() => setOpen(false)}>
          <span aria-hidden="true">🧭 </span>Model Notes
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={
                    isActive(link.href)
                      ? 'border-b-2 border-accent pb-1 text-accent'
                      : 'pb-1 text-ink-soft hover:text-ink'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-md border border-rule bg-white px-3 py-2 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule bg-paper md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={
                    isActive(link.href)
                      ? 'block py-3 font-semibold text-accent'
                      : 'block py-3 font-medium text-ink-soft'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}