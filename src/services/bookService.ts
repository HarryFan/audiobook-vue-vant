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

export interface Chapter {
  id: string
  title: string
  duration: number
  audioUrl: string
  order: number
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
  }>
}

class BookService {
  private static instance
  private ARCHIVE_API_BASE = 'https://archive.org'

  constructor() {
    // 禁止直接實例化
  }

  static getInstance() {
    if (!BookService.instance) {
      BookService.instance = new BookService()
    }
    return BookService.instance
  }

  async fetchArchiveData(query) {
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=creator&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=subjects&fl%5B%5D=duration&fl%5B%5D=chapters&fl%5B%5D=audio_url&fl%5B%5D=collection&output=json&rows=100`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching archive data:', error);
      throw error;
    }
  }

  async fetchBookMetadata(identifier) {
    const url = `https://archive.org/metadata/${identifier}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book metadata:', error);
      throw error;
    }
  }

  convertArchiveToBook(archiveData) {
    return {
      id: archiveData.identifier,
      title: archiveData.title,
      author: archiveData.creator && archiveData.creator[0] || '未知作者',
      description: archiveData.description && archiveData.description[0] || '',
      coverUrl: `https://archive.org/services/img/${archiveData.identifier}`,
      duration: archiveData.duration ? parseInt(archiveData.duration) : 0,
      rating: 0,
      listenCount: archiveData.downloads || 0,
      chapters: archiveData.chapters || [],
      audioUrl: archiveData.audio_url,
      categories: archiveData.subjects || [],
      publishedDate: '',
      language: '',
      rating: this.generateRandomRating(),
      listenCount: this.generateRandomListenCount()
    }
  }

  private async fetchBooks(): Promise<Book[]> {
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

      this.books = data.response.docs.map((doc: ArchiveBookMetadata) => this.convertArchiveToBook(doc))
      return this.books
    } catch (error) {
      console.error('Error fetching books:', error)
      return []
    }
  }

  public async getBookById(id: string): Promise<Book | null> {
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

      return data.response.docs.map((doc: ArchiveBookMetadata) => this.convertArchiveToBook(doc))
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

      this.books = data.response.docs.map((doc: ArchiveBookMetadata) => this.convertArchiveToBook(doc))
      return this.books
    } catch (error) {
      console.error('Error fetching books:', error)
      return []
    }
  }

  async getRecommendedBooks(): Promise<Book[]> {
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION} AND subject:"recommended"`
      const data = await this.fetchArchiveData(query)
      
      if (!data || !data.response || !data.response.docs) {
        console.error('Invalid response data:', data)
        return []
      }

      return data.response.docs.map((doc: ArchiveBookMetadata) => this.convertArchiveToBook(doc))
    } catch (error) {
      console.error('Error fetching recommended books:', error)
      return []
    }
  }

  async getHotBooks(): Promise<Book[]> {
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION} AND downloads:[1000 TO *]`
      const data = await this.fetchArchiveData(query)
      
      if (!data || !data.response || !data.response.docs) {
        console.error('Invalid response data:', data)
        return []
      }

      return data.response.docs.map((doc: ArchiveBookMetadata) => this.convertArchiveToBook(doc))
    } catch (error) {
      console.error('Error fetching hot books:', error)
      return []
    }
  }

  async getNewBooks(): Promise<Book[]> {
    try {
      const query = `collection:${this.AUDIO_BOOKS_COLLECTION}`
      const data = await this.fetchArchiveData(query)
      
      if (!data || !data.response || !data.response.docs) {
        console.error('Invalid response data:', data)
        return []
      }

      return data.response.docs.map((doc: ArchiveBookMetadata) => this.convertArchiveToBook(doc))
    } catch (error) {
      console.error('Error fetching new books:', error)
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
      const books = data.response?.docs ? data.response.docs.map((doc: ArchiveBookMetadata) => this.convertArchiveToBook(doc)) : []
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
