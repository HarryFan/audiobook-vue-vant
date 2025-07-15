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
  private readonly LIBRIVOX_API_BASE = '/api/librivox/feed/audiobooks'
  private readonly LIBRIVOX_TRACKS_API = '/api/librivox/feed/audiotracks'
  private bookCache: { [key: string]: Book } = {}
  private categoryCache: { [key: string]: Book[] } = {}
  private searchCache: { [key: string]: Book[] } = {}

  private constructor() {
    // 初始化模擬數據（可選，用於開發測試）
    this.books = []
  }

  public static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService()
    }
    return BookService.instance
  }

  /**
   * 獲取所有書籍
   */
  async getAllBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json`)
      const data = await response.json() as LibriVoxResponse
      return data.books.map(book => this.convertLibriVoxToBook(book))
    } catch (error) {
      console.error('Error fetching books:', error)
      return []
    }
  }

  /**
   * 根據類別獲取書籍
   */
  async getBooksByCategory(category: string): Promise<Book[]> {
    try {
      if (this.categoryCache[category]) {
        return this.categoryCache[category]
      }

      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&genre=${encodeURIComponent(category)}`)
      const data = await response.json() as LibriVoxResponse
      const books = data.books.map(book => this.convertLibriVoxToBook(book))
      this.categoryCache[category] = books
      return books
    } catch (error) {
      console.error('Error fetching books by category:', error)
      return []
    }
  }

  /**
   * 根據 ID 獲取書籍詳情
   */
  async getBookById(id: number): Promise<Book | null> {
    try {
      if (this.bookCache[id.toString()]) {
        return this.bookCache[id.toString()]
      }

      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&id=${id}`)
      const data = await response.json() as LibriVoxResponse
      
      if (data.books.length === 0) {
        return null
      }

      const book = this.convertLibriVoxToBook(data.books[0])
      if (book) {
        this.bookCache[id.toString()] = book
      }
      
      return book
    } catch (error) {
      console.error('Error fetching book by ID:', error)
      return null
    }
  }

  /**
   * 獲取推薦書籍
   */
  async getRecommendedBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&limit=15`)
      const data = await response.json() as LibriVoxResponse
      return data.books.map(book => this.convertLibriVoxToBook(book))
    } catch (error) {
      console.error('Error fetching recommended books:', error)
      return []
    }
  }

  /**
   * 獲取熱門書籍
   */
  async getHotBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&limit=20`)
      const data = await response.json() as LibriVoxResponse
      return data.books.map(book => this.convertLibriVoxToBook(book))
    } catch (error) {
      console.error('Error fetching hot books:', error)
      return []
    }
  }

  /**
   * 獲取最新書籍
   */
  async getNewBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&limit=20`)
      const data = await response.json() as LibriVoxResponse
      return data.books.map(book => this.convertLibriVoxToBook(book))
    } catch (error) {
      console.error('Error fetching new books:', error)
      return []
    }
  }

  /**
   * 搜索書籍
   */
  async searchBooks(keyword: string): Promise<Book[]> {
    try {
      const cacheKey = keyword.toLowerCase()
      if (this.searchCache[cacheKey]) {
        return this.searchCache[cacheKey]
      }

      const titleResults = await this.searchByTitle(keyword)
      const authorResults = await this.searchByAuthor(keyword)
      
      // 合併結果並去重
      const allResults = [...titleResults, ...authorResults]
      const uniqueResults = allResults.filter((book, index, self) => 
        index === self.findIndex(b => b.id === book.id)
      )
      
      this.searchCache[cacheKey] = uniqueResults
      return uniqueResults
    } catch (error) {
      console.error('Error searching books:', error)
      return []
    }
  }

  /**
   * 根據標題搜索
   */
  private async searchByTitle(keyword: string): Promise<Book[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&title=${encodeURIComponent(keyword)}`)
      const data = await response.json() as LibriVoxResponse
      return data.books.map(book => this.convertLibriVoxToBook(book))
    } catch (error) {
      console.error('Error searching by title:', error)
      return []
    }
  }

  /**
   * 根據作者搜索
   */
  private async searchByAuthor(keyword: string): Promise<Book[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&author=${encodeURIComponent(keyword)}`)
      const data = await response.json() as LibriVoxResponse
      return data.books.map(book => this.convertLibriVoxToBook(book))
    } catch (error) {
      console.error('Error searching by author:', error)
      return []
    }
  }

  /**
   * 獲取章節列表
   */
  async getChapters(bookId: number): Promise<Chapter[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_TRACKS_API}?format=json&project_id=${bookId}`)
      const data = await response.json() as LibriVoxResponse
      
      if (!data.books[0]?.sections) {
        return []
      }
      
      return data.books[0].sections.map(section => ({
        id: parseInt(section.id),
        bookId,
        title: section.title,
        duration: this.parseTimeToSeconds(section.playtime),
        audioUrl: section.listen_url,
        isLocked: false // LibriVox 的內容都是免費的
      }))
    } catch (error) {
      console.error('Error fetching chapters:', error)
      return []
    }
  }

  /**
   * 將 LibriVox API 響應轉換為本地 Book 格式
   */
  private convertLibriVoxToBook(libriVoxBook: LibriVoxBook): Book {
    const author = libriVoxBook.authors && libriVoxBook.authors.length > 0 
      ? `${libriVoxBook.authors[0].first_name} ${libriVoxBook.authors[0].last_name}`.trim()
      : 'Unknown Author'
    
    const category = libriVoxBook.genres && libriVoxBook.genres.length > 0 
      ? libriVoxBook.genres[0].name 
      : 'General'
    
    const tags = libriVoxBook.genres ? libriVoxBook.genres.map(g => g.name) : []
    
    // 生成隨機評分和收聽次數
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0-5.0
    const listenCount = Math.floor(Math.random() * 5000) + 100
    
    // 提取 Internet Archive 標識符來構建封面 URL
    let coverUrl = 'https://via.placeholder.com/150x200?text=No+Cover'
    if (libriVoxBook.url_iarchive) {
      const archiveId = libriVoxBook.url_iarchive.split('/').pop()
      if (archiveId) {
        coverUrl = `https://archive.org/services/img/${archiveId}`
      }
    }
    
    return {
      id: parseInt(libriVoxBook.id),
      title: libriVoxBook.title,
      author,
      cover: coverUrl,
      description: libriVoxBook.description || 'No description available.',
      audioUrl: libriVoxBook.url_zip_file || '',
      duration: parseInt(libriVoxBook.totaltimesecs) || 0,
      category,
      tags,
      rating,
      listenCount,
      language: libriVoxBook.language,
      totalTimeSecs: parseInt(libriVoxBook.totaltimesecs) || 0,
      urlLibrivox: libriVoxBook.url_librivox,
      urlRss: libriVoxBook.url_rss
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
