export interface Book {
  id: number
  title: string
  author: string
  cover: string
  description: string
  audioUrl: string
  duration: number
  category: string
  tags: string[]
  rating: number
  listenCount: number
  chapters?: Chapter[]
  language?: string
  totalTimeSecs?: number
  urlLibrivox?: string
  urlRss?: string
}

export interface Chapter {
  id: number
  bookId: number
  title: string
  duration: number
  audioUrl: string
  isLocked?: boolean
}

// LibriVox API 接口定義
interface LibriVoxBook {
  id: string
  title: string
  description: string
  url_rss: string
  url_zip_file: string
  url_project: string
  url_librivox: string
  url_iarchive: string
  language: string
  copyright_year: string
  num_sections: string
  totaltime: string
  totaltimesecs: string
  authors: Array<{ id: string; first_name: string; last_name: string; dob: string; dod: string }>
  genres: Array<{ id: string; name: string }>
  sections?: Array<{
    id: string
    section_number: string
    title: string
    listen_url: string
    language: string
    playtime: string
  }>
}

interface LibriVoxResponse {
  books: LibriVoxBook[]
}

export class BookService {
  private static instance: BookService
  private books: Book[] = []
  private bookCache: Map<string, Book> = new Map()
  private searchCache: Map<string, Book[]> = new Map()
  private readonly ARCHIVE_API_BASE = 'https://archive.org'
  private readonly AUDIO_BOOKS_COLLECTION = 'audio_bookspoetry'

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService()
    }
    return BookService.instance
  }

  private async fetchArchiveData(query: string, options: any = {}): Promise<any> {
    try {
      const response = await fetch(`${this.ARCHIVE_API_BASE}/advancedsearch.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: query,
          ...options
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching from Archive API:', error)
      throw error
    }
  }

  private async fetchBookMetadata(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.ARCHIVE_API_BASE}/metadata/${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching book metadata:', error)
      throw error
    }
  }

  private async getBookById(id: string): Promise<Book | null> {
    try {
      const data = await this.fetchBookMetadata(id)
      
      if (!data || !data.metadata) {
        console.error('Invalid response data:', data)
        return null
      }

      const book = this.convertArchiveToBook(data.metadata)
      // 從 metadata 獲取更多詳細信息
      book.duration = parseInt(data.metadata.duration || '0')
      book.chapters = data.metadata.chapters || []
      book.audioUrl = data.metadata.audio_url || ''
      book.categories = data.metadata.subjects || []
      
      return book
    } catch (error) {
      console.error('Error fetching book:', error)
      return null
    }
  }

  private convertArchiveToBook(doc: any): Book {
    return {
      id: doc.identifier,
      title: doc.title || '無標題',
      author: doc.creator?.[0] || '未知作者',
      description: doc.description?.[0] || '暫無簡介',
      coverUrl: `https://archive.org/services/img/${doc.identifier}`,
      duration: 0, // Internet Archive API 不直接提供時長，需要從 metadata 獲取
      rating: this.generateRandomRating(),
      listenCount: this.generateRandomListenCount(),
      chapters: [], // 需要從 metadata 獲取
      audioUrl: '', // 需要從 metadata 獲取
      categories: [], // 需要從 metadata 獲取
      publishedDate: new Date().toISOString(),
      language: '中文'
    }
  }

  private generateRandomRating(): number {
    return Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0-5.0
  }

  private generateRandomListenCount(): number {
    return Math.floor(Math.random() * 5000) + 100;
  }

  async getCategories(): Promise<string[]> {
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION}`
      const options = {
        facet: ['subject'],
        rows: 0
      }
      
      const data = await this.fetchArchiveData(query, options)
      
      if (!data || !data.facets || !data.facets.subject) {
        console.error('Invalid response data:', data)
        return []
      }

      return data.facets.subject.map((facet: any) => facet.term)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  async getBooksByCategory(category: string): Promise<Book[]> {
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION} AND subject:"${category}"`
      const options = {
        fl: ['identifier', 'title', 'creator', 'description', 'downloads'],
        rows: 100
      }
      
      const data = await this.fetchArchiveData(query, options)
      
      if (!data || !data.response || !data.response.docs) {
        console.error('Invalid response data:', data)
        return []
      }

      return data.response.docs.map(doc => this.convertArchiveToBook(doc))
    } catch (error) {
      console.error('Error fetching books by category:', error)
      return []
    }
  }

  async getAllBooks(): Promise<Book[]> {
    if (this.books.length > 0) {
      return this.books
    }
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION}`
      const options = {
        fl: ['identifier', 'title', 'creator', 'description', 'downloads'],
        rows: 100
      }
      
      const data = await this.fetchArchiveData(query, options)
      
      if (!data || !data.response || !data.response.docs) {
        console.error('Invalid response data:', data)
        return []
      }

      this.books = data.response.docs.map(doc => this.convertArchiveToBook(doc))
      return this.books
    } catch (error) {
      console.error('Error fetching books:', error)
      return []
    }
  }

  async getRecommendedBooks(): Promise<Book[]> {
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION} AND subject:"recommended"`
      const options = {
        fl: ['identifier', 'title', 'creator', 'description', 'downloads'],
        rows: 100
      }
      
      const data = await this.fetchArchiveData(query, options)
      
      if (!data || !data.response || !data.response.docs) {
        console.error('Invalid response data:', data)
        return []
      }

      return data.response.docs.map(doc => this.convertArchiveToBook(doc))
    } catch (error) {
      console.error('Error fetching recommended books:', error)
      return []
    }
  }

  async getHotBooks(): Promise<Book[]> {
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION}`
      const options = {
        fl: ['identifier', 'title', 'creator', 'description', 'downloads'],
        sort: ['downloads desc'],
        rows: 100
      }
      
      const data = await this.fetchArchiveData(query, options)
      
      if (!data || !data.response || !data.response.docs) {
        console.error('Invalid response data:', data)
        return []
      }

      return data.response.docs.map(doc => this.convertArchiveToBook(doc))
    } catch (error) {
      console.error('Error fetching hot books:', error)
      return []
    }
  }

  async getNewBooks(): Promise<Book[]> {
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION}`
      const options = {
        fl: ['identifier', 'title', 'creator', 'description', 'downloads'],
        sort: ['date desc'],
        rows: 10
      }
      
      const data = await this.fetchArchiveData(query, options)
      
      if (!data || !data.response || !data.response.docs) {
        console.error('Invalid response data:', data)
        return []
      }

      return data.response.docs.map(doc => this.convertArchiveToBook(doc))
    } catch (error) {
      console.error('Error fetching new books:', error)
      return []
    }
  }

      const response = await fetch(`${this.ARCHIVE_API_BASE}/advancedsearch.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: `collection:audio_bookspoetry AND subject:"${category}"`,
          fl: ['identifier', 'title', 'creator', 'description', 'downloads'],
          rows: 100
        })
      })
      const data = await response.json()
      return data.response?.docs ? data.response.docs.map(doc => this.convertArchiveToBook(doc)) : []
    } catch (error) {
      console.error('Error fetching books by category:', error)
      return []
    }
  }

  async searchBooks(query: string): Promise<Book[]> {
    if (this.searchCache.has(query)) {
      return this.searchCache.get(query)!
    }

    try {
      const response = await fetch(`${this.ARCHIVE_API_BASE}/advancedsearch.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: `collection:audio_bookspoetry AND title:"${query}" OR creator:"${query}"`,
          fl: ['identifier', 'title', 'creator', 'description', 'downloads'],
          rows: 100
        })
      })
      const data = await response.json()
      const books = data.response?.docs ? data.response.docs.map(doc => this.convertArchiveToBook(doc)) : []
      this.searchCache.set(query, books)
      return books
    } catch (error) {
      console.error('Error searching books:', error)
      return []
    }
  }

  /**
   * 將時間字符串轉換為秒數
   */
  private parseTimeToSeconds(timeString: string): number {
    if (!timeString) return 0
    
    const parts = timeString.split(':').map(part => parseInt(part) || 0)
    
    if (parts.length === 2) {
      // MM:SS 格式
      return parts[0] * 60 + parts[1]
    } else if (parts.length === 3) {
      // HH:MM:SS 格式
      return parts[0] * 3600 + parts[1] * 60 + parts[2]
    }
    
    return 0
  }
}
