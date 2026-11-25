export interface CosmicMedia {
  url: string
  imgix_url: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  type: string
  status?: string
  created_at?: string
  modified_at?: string
  published_at?: string
  metadata: Record<string, unknown>
}

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    role?: string
    bio?: string
    avatar?: CosmicMedia
  }
}

export interface Topic extends CosmicObject {
  type: 'topics'
  metadata: {
    name?: string
    description?: string
    modality?: unknown
  }
}

export interface ModelProfile extends CosmicObject {
  type: 'model-profiles'
  metadata: {
    name?: string
    provider?: string
    modality?: unknown
    summary?: string
    best_for?: string
    tradeoffs?: string
    docs_url?: string
    topic?: Topic
  }
}

export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    summary?: string
    content?: string
    featured_image?: CosmicMedia
    featured_image_alt?: string
    use_case?: unknown
    tags?: unknown
    topic?: Topic
    author?: Author
    related_models?: ModelProfile[]
  }
}