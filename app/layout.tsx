import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: {
    default: 'Model Notes: practical notes on AI models',
    template: '%s | Model Notes',
  },
  description:
    'An editorial guide to AI models and their practical use cases across text, image, speech and multimodal work.',
  openGraph: {
    type: 'website',
    siteName: 'Model Notes',
    title: 'Model Notes: practical notes on AI models',
    description:
      'Choose a model for the task in front of you. Tradeoffs, examples and links to official documentation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Model Notes',
    description: 'Practical notes on AI models and their use cases.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://staging.cosmicinsights.dev/script.js" data-project="6b033873b691d049fe5d7bdb"></script>
      </head>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}