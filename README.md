# Model Notes
![App Preview](https://imgix.cosmicjs.com/e2993340-e898-11f1-9e0e-af80d2d1d426-autopilot-photo-1518770660439-4636190af475-1795587875865.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A responsive editorial blog about AI models and their practical use cases, built with Next.js 16 and [Cosmic](https://www.cosmicjs.com/docs).

## Features
- Always-visible homepage introduction plus an evergreen overview of model families
- Model guide, use-case index and topic pages powered by Cosmic
- Tradeoff guidance (privacy, latency, cost, quality) with no unverified pricing or benchmarks
- Accessible article pages with SEO and social metadata
- Drafts are never exposed publicly, and empty states handle unpublished content gracefully

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6b033874b691d049fe5d7bdd&clone_repository=6b06802de80826e7f1912fbe)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: Build a responsive editorial blog called Model Notes about AI models and their practical use cases. Design for curious readers and practitioners choosing a model for a task. Create Cosmic content models for posts, topics and model profiles, and keep starter article objects as drafts for editorial review. Build an inviting homepage with an always-visible introduction and useful evergreen editorial overview of model families, a model guide, use-case index, and accessible article pages; handle unpublished content gracefully and never expose CMS drafts on the public site. Cover text, image, speech and multimodal models with concrete examples like summarizing meeting notes, captioning images, and transcribing interviews. Include tradeoffs (privacy, latency, cost and quality), link to official model documentation, and avoid unverified pricing or benchmarks. Use clear typography, responsive navigation, and article metadata for search and social sharing."

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "Model Notes". The content is managed in Cosmic CMS with the following object types: authors, topics, model-profiles, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Build a responsive editorial blog called Model Notes about AI models and their practical use cases. Design for curious readers and practitioners choosing a model for a task. Create Cosmic content models for posts, topics and model profiles, and keep starter article objects as drafts for editorial review. Build an inviting homepage with an always-visible introduction and useful evergreen editorial overview of model families, a model guide, use-case index, and accessible article pages; handle unpublished content gracefully and never expose CMS drafts on the public site. Cover text, image, speech and multimodal models with concrete examples like summarizing meeting notes, captioning images, and transcribing interviews. Include tradeoffs (privacy, latency, cost and quality), link to official model documentation, and avoid unverified pricing or benchmarks. Use clear typography, responsive navigation, and article metadata for search and social sharing.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies
- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- React 19, TypeScript (strict)
- Tailwind CSS with the Typography plugin
- [Cosmic](https://www.cosmicjs.com/docs) SDK

## Getting Started

### Prerequisites
- [Bun](https://bun.sh)
- A Cosmic bucket with the `authors`, `topics`, `model-profiles` and `posts` object types

### Installation
```bash
bun install
bun run dev
```
Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY` and `COSMIC_WRITE_KEY` in your environment (not in a committed file).

## Cosmic SDK Examples
```typescript
import { getPosts, getModelProfiles } from '@/lib/cosmic'

const posts = await getPosts()           // published posts, newest first
const models = await getModelProfiles()  // published model profiles
```

## Cosmic CMS Integration
- All reads go through `getCosmic()`, so visitors only see published objects. Drafts appear only inside the authenticated dashboard preview.
- Object metafields (topic, author, related models) are loaded with `depth(1)`.
- Missing content (404) is treated as an empty list and rendered as a friendly empty state.
- Starter articles can stay as drafts until editors publish them.

## Deployment Options
- **Vercel**: import the repository and add the three Cosmic environment variables in project settings.
- **Netlify**: use the Next.js runtime and set the same environment variables.

Pricing and benchmark claims are intentionally left out. Always confirm current details in each provider's official documentation.
<!-- README_END -->