import type { ReactNode } from 'react'

interface RichContentProps {
  content: string
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g

function isSafeHref(href: string): boolean {
  return /^(https?:\/\/|\/|#|mailto:)/i.test(href)
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE_PATTERN).map((part, index) => {
    const key = `${keyPrefix}-${index}`
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={key}>{part.slice(1, -1)}</code>
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      const label = link[1] ?? ''
      const href = link[2] ?? ''
      if (isSafeHref(href)) {
        const external = /^https?:\/\//i.test(href)
        return (
          <a key={key} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {label}
          </a>
        )
      }
      return <span key={key}>{label}</span>
    }
    return <span key={key}>{part}</span>
  })
}

function renderMarkdown(source: string): ReactNode[] {
  const blocks = source.split(/\n{2,}/)
  const nodes: ReactNode[] = []

  blocks.forEach((rawBlock, i) => {
    const block = rawBlock.trim()
    if (!block) return
    const key = `b-${i}`
    const lines = block.split('\n')

    const heading = /^(#{1,3})\s+(.*)$/.exec(block)
    if (heading && lines.length === 1) {
      const level = heading[1]?.length ?? 2
      const text = heading[2] ?? ''
      nodes.push(level >= 3 ? <h3 key={key}>{renderInline(text, key)}</h3> : <h2 key={key}>{renderInline(text, key)}</h2>)
      return
    }

    if (lines.every((line) => /^\s*[-*]\s+/.test(line))) {
      nodes.push(
        <ul key={key}>
          {lines.map((line, j) => (
            <li key={`${key}-${j}`}>{renderInline(line.replace(/^\s*[-*]\s+/, ''), `${key}-${j}`)}</li>
          ))}
        </ul>
      )
      return
    }

    if (lines.every((line) => /^\s*\d+[.)]\s+/.test(line))) {
      nodes.push(
        <ol key={key}>
          {lines.map((line, j) => (
            <li key={`${key}-${j}`}>{renderInline(line.replace(/^\s*\d+[.)]\s+/, ''), `${key}-${j}`)}</li>
          ))}
        </ol>
      )
      return
    }

    if (lines.every((line) => /^>\s?/.test(line))) {
      nodes.push(
        <blockquote key={key}>
          <p>{renderInline(lines.map((line) => line.replace(/^>\s?/, '')).join(' '), key)}</p>
        </blockquote>
      )
      return
    }

    nodes.push(<p key={key}>{renderInline(lines.join(' '), key)}</p>)
  })

  return nodes
}

export default function RichContent({ content }: RichContentProps) {
  const trimmed = (content ?? '').trim()
  if (!trimmed) return null

  const className =
    'prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-a:text-accent prose-a:underline-offset-4'

  // Rich text from the Cosmic editor arrives as HTML; markdown fields arrive as plain text
  if (/^<[a-z!]/i.test(trimmed)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: trimmed }} />
  }

  return <div className={className}>{renderMarkdown(trimmed)}</div>
}