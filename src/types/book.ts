export interface ArchiveApiResponse {
  response: {
    docs: ArchiveBookMetadata[]
    numFound: number
  }
  facets: {
    [key: string]: {
      [key: string]: number
    }
  }
}

export interface Chapter {
  id: string
  title: string
  duration: number
  audioUrl: string
  order: number
}

export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverUrl: string
  duration: number
  rating: number
  listenCount: number
  chapters: Chapter[]
  audioUrl: string
  categories: string[]
  publishedDate: string
  language: string
}

export interface ArchiveBookMetadata {
  identifier: string
  title: string
  creator: string[]
  description: string[]
  downloads: number
  subjects: string[]
  duration?: string
  chapters?: any[]
  audio_url?: string
}
