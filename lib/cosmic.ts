import { createBucketClient } from '@cosmicjs/sdk'
import { cache } from 'react'
import { getCosmic } from '@/lib/cosmic-preview'
import type { CosmicMedia, CosmicObject, ModelProfile, Post, Topic } from '@/types'

// Write client (not used for public reads)
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

const PROPS: string[] = [
  'id',
  'slug',
  'title',
  'type',
  'status',
  'created_at',
  'modified_at',
  'published_at',
  'metadata',
]

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function getTags(field: unknown): string[] {
  if (Array.isArray(field)) {
    return field.map((t: unknown) => getMetafieldValue(t)).filter((t) => t.length > 0)
  }
  return getMetafieldValue(field)
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}

export function getSafeUrl(value: unknown): string | undefined {
  const url = getMetafieldValue(value).trim()
  return /^https?:\/\//i.test(url) ? url : undefined
}

export function getImageUrl(media: CosmicMedia | undefined, params: string): string | undefined {
  if (!media || !media.imgix_url) return undefined
  return `${media.imgix_url}?${params}`
}

export function getName(obj: CosmicObject | undefined): string {
  if (!obj) return ''
  const name = getMetafieldValue(obj.metadata?.['name'])
  return name || obj.title || ''
}

export function getDateValue(item: {
  published_at?: string | null
  modified_at?: string | null
  created_at?: string | null
}): number {
  const raw = item.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}

export function formatDate(value?: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

async function findObjects<T extends CosmicObject>(query: Record<string, unknown>, depth = 1): Promise<T[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const q = client.objects.find(query).props(PROPS).depth(depth)
    const res = previewToken ? await q.status('any') : await q
    const objects = res.objects as unknown as T[]
    if (!objects) return []
    // Never expose drafts on the public path
    return previewToken ? objects : objects.filter((o) => !o.status || o.status === 'published')
  } catch (error) {
    if (!(hasStatus(error) && error.status === 404)) {
      console.error('Cosmic find failed:', error)
    }
    return []
  }
}

async function findOne<T extends CosmicObject>(query: Record<string, unknown>, depth = 1): Promise<T | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const q = client.objects.findOne(query).props(PROPS).depth(depth)
    const res = previewToken ? await q.status('any') : await q
    const object = res.object as unknown as T | undefined
    if (!object) return null
    if (!previewToken && object.status && object.status !== 'published') return null
    return object
  } catch (error) {
    if (!(hasStatus(error) && error.status === 404)) {
      console.error('Cosmic findOne failed:', error)
    }
    return null
  }
}

function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => getDateValue(b) - getDateValue(a))
}

function sortByName<T extends CosmicObject>(items: T[]): T[] {
  return [...items].sort((a, b) => getName(a).localeCompare(getName(b)))
}

export async function getPosts(): Promise<Post[]> {
  return sortPosts(await findObjects<Post>({ type: 'posts' }))
}

export async function getPostsByTopic(topicId: string): Promise<Post[]> {
  return sortPosts(await findObjects<Post>({ type: 'posts', 'metadata.topic': topicId }))
}

export async function getPostsByModel(modelId: string): Promise<Post[]> {
  return sortPosts(await findObjects<Post>({ type: 'posts', 'metadata.related_models': modelId }))
}

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  return findOne<Post>({ type: 'posts', slug })
})

export async function getTopics(): Promise<Topic[]> {
  return sortByName(await findObjects<Topic>({ type: 'topics' }))
}

export const getTopic = cache(async (slug: string): Promise<Topic | null> => {
  return findOne<Topic>({ type: 'topics', slug })
})

export async function getModelProfiles(): Promise<ModelProfile[]> {
  return sortByName(await findObjects<ModelProfile>({ type: 'model-profiles' }))
}

export async function getModelsByTopic(topicId: string): Promise<ModelProfile[]> {
  return sortByName(await findObjects<ModelProfile>({ type: 'model-profiles', 'metadata.topic': topicId }))
}

export const getModelProfile = cache(async (slug: string): Promise<ModelProfile | null> => {
  return findOne<ModelProfile>({ type: 'model-profiles', slug })
})