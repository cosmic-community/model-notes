interface BadgeProps {
  children: React.ReactNode
  tone?: 'accent' | 'neutral'
}

export default function Badge({ children, tone = 'accent' }: BadgeProps) {
  const styles =
    tone === 'accent' ? 'bg-accent-soft text-accent-dark' : 'bg-paper-dark text-ink-soft border border-rule'

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>{children}</span>
  )
}