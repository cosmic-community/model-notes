// Evergreen editorial content. Intentionally free of pricing and benchmark claims.

export interface DocLink {
  label: string
  url: string
}

export interface ModelFamily {
  id: string
  name: string
  summary: string
  examples: string[]
  watchFor: string
  docs: DocLink
}

export interface UseCase {
  id: string
  title: string
  modality: string
  summary: string
  consider: string
}

export interface Tradeoff {
  id: string
  title: string
  question: string
  guidance: string
}

export const MODEL_FAMILIES: ModelFamily[] = [
  {
    id: 'text',
    name: 'Text models',
    summary: 'Read and write language: summarize, rewrite, classify, extract and answer questions.',
    examples: ['Summarizing meeting notes', 'Drafting and editing emails', 'Tagging support tickets'],
    watchFor: 'Confident-sounding mistakes. Check summaries against the source for anything important.',
    docs: { label: 'Text generation tasks (Hugging Face)', url: 'https://huggingface.co/tasks/text-generation' },
  },
  {
    id: 'image',
    name: 'Image models',
    summary: 'Understand or produce pictures: captioning, tagging, visual search and illustration.',
    examples: ['Captioning images for alt text', 'Tagging a photo library', 'Generating draft illustrations'],
    watchFor: 'Captions can miss context or misread text in an image. Review before publishing.',
    docs: { label: 'Image-to-text tasks (Hugging Face)', url: 'https://huggingface.co/tasks/image-to-text' },
  },
  {
    id: 'speech',
    name: 'Speech models',
    summary: 'Convert between audio and text: transcription, voice interfaces and read-aloud.',
    examples: ['Transcribing interviews', 'Captioning recorded talks', 'Reading articles aloud'],
    watchFor: 'Accents, jargon and overlapping speakers affect accuracy. Spot-check names and numbers.',
    docs: {
      label: 'Speech recognition tasks (Hugging Face)',
      url: 'https://huggingface.co/tasks/automatic-speech-recognition',
    },
  },
  {
    id: 'multimodal',
    name: 'Multimodal models',
    summary: 'Work across text, images and sometimes audio in a single request.',
    examples: ['Explaining a chart screenshot', 'Pulling fields from a scanned form', 'Answering questions about a diagram'],
    watchFor: 'More input types mean more data to protect and more places to verify output.',
    docs: {
      label: 'Image-text-to-text tasks (Hugging Face)',
      url: 'https://huggingface.co/tasks/image-text-to-text',
    },
  },
]

export const USE_CASES: UseCase[] = [
  {
    id: 'summarize-meeting-notes',
    title: 'Summarize meeting notes',
    modality: 'Text',
    summary: 'Turn raw notes or a transcript into decisions, owners and next steps.',
    consider: 'Meeting content is often sensitive. Check where data is processed and retained.',
  },
  {
    id: 'caption-images',
    title: 'Caption images',
    modality: 'Image / Multimodal',
    summary: 'Draft alt text and captions for photos, screenshots and product images.',
    consider: 'Quality varies with image type. Keep a human review step for public content.',
  },
  {
    id: 'transcribe-interviews',
    title: 'Transcribe interviews',
    modality: 'Speech',
    summary: 'Convert recorded conversations into searchable, editable text.',
    consider: 'Audio quality and speaker overlap drive accuracy. Consent and storage rules matter.',
  },
  {
    id: 'extract-from-documents',
    title: 'Extract data from documents',
    modality: 'Multimodal',
    summary: 'Read scans, PDFs and forms and return structured fields.',
    consider: 'Validate extracted values against the original, especially numbers and dates.',
  },
  {
    id: 'draft-and-edit',
    title: 'Draft and edit writing',
    modality: 'Text',
    summary: 'Get first drafts, tone changes and copy edits for everyday writing.',
    consider: 'Treat output as a draft. Facts and quotes still need a human check.',
  },
  {
    id: 'read-aloud',
    title: 'Read content aloud',
    modality: 'Speech',
    summary: 'Generate spoken versions of articles and announcements.',
    consider: 'Latency matters for live use. Check provider terms on voice usage.',
  },
]

export const TRADEOFFS: Tradeoff[] = [
  {
    id: 'privacy',
    title: 'Privacy',
    question: 'Where does my data go, and who can see it?',
    guidance:
      'Compare hosted APIs with models you run yourself, and read each provider’s data-handling terms before sending sensitive material.',
  },
  {
    id: 'latency',
    title: 'Latency',
    question: 'Does someone wait for the answer?',
    guidance:
      'Live voice and chat need quick responses. Batch jobs like overnight transcription can tolerate slower, more careful options.',
  },
  {
    id: 'cost',
    title: 'Cost',
    question: 'How often will this run, and at what volume?',
    guidance:
      'Check current pricing on the provider’s official page. Estimate with your own sample workload instead of relying on third-party figures.',
  },
  {
    id: 'quality',
    title: 'Quality',
    question: 'What does “good enough” mean for this task?',
    guidance:
      'Test candidate models on your own examples and decide what errors you can accept. Public leaderboards rarely match your data.',
  },
]

export const PROVIDER_DOCS: DocLink[] = [
  { label: 'OpenAI documentation', url: 'https://platform.openai.com/docs' },
  { label: 'Anthropic documentation', url: 'https://docs.anthropic.com' },
  { label: 'Google Gemini API docs', url: 'https://ai.google.dev/gemini-api/docs' },
  { label: 'Mistral documentation', url: 'https://docs.mistral.ai' },
  { label: 'Hugging Face documentation', url: 'https://huggingface.co/docs' },
]