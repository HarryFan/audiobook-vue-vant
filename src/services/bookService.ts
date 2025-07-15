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
  private LIBRIVOX_API_BASE = '/api/librivox/api'
  private LIBRIVOX_TRACKS_API = '/api/librivox/track'
  private bookCache: Map<string, Book> = new Map()
  private books: Book[] = []
  private searchCache: Map<string, Book[]> = new Map()

  private constructor() {
    // 單例模式
  }

  public static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService()
    }
    return BookService.instance
  }

  private async fetchBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json`)
      const data = await response.json() as LibriVoxResponse
      this.books = data.books.map(book => this.convertLibriVoxToBook(book))
      return this.books
    } catch (error) {
      console.error('Error fetching books:', error)
      return []
    }
  }

  private convertLibriVoxToBook(libriVoxBook: LibriVoxBook): Book {
    const author = libriVoxBook.authors && libriVoxBook.authors.length > 0 
      ? `${libriVoxBook.authors[0].first_name} ${libriVoxBook.authors[0].last_name}`.trim()
      : 'Unknown Author'
    
    const category = libriVoxBook.genres && libriVoxBook.genres.length > 0 
      ? libriVoxBook.genres[0].name 
      : 'General'

    return {
      id: parseInt(libriVoxBook.id),
      title: libriVoxBook.title,
      author,
      cover: this.getBookCoverUrl(libriVoxBook),
      description: libriVoxBook.description || 'No description available.',
      audioUrl: libriVoxBook.url_rss,
      duration: parseInt(libriVoxBook.totaltimesecs) || 0,
      category,
      tags: libriVoxBook.genres ? libriVoxBook.genres.map(g => g.name) : [],
      rating: this.generateRandomRating(),
      listenCount: this.generateRandomListenCount(),
      language: libriVoxBook.language,
      totalTimeSecs: parseInt(libriVoxBook.totaltimesecs) || 0,
      urlLibrivox: libriVoxBook.url_librivox,
      urlRss: libriVoxBook.url_rss
    }
  }

  private generateRandomRating(): number {
    return Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0-5.0
  }

  private generateRandomListenCount(): number {
    return Math.floor(Math.random() * 5000) + 100;
  }

  private getBookCoverUrl(data: LibriVoxBook): string {
    // 使用 Internet Archive 的封面圖像
    const bookId = data.id;
    return `https://archive.org/services/img/librivox_${bookId}_coverart`;
  }

  async getBookById(id: number): Promise<Book | null> {
    try {
      // 確保 id 在有效範圍內
      if (id <= 0 || id > this.books.length) {
        return null;
      }

      // 從緩存中獲取
      const cachedBook = this.bookCache.get(id.toString());
      if (cachedBook) {
        return cachedBook;
      }

      // 從 LibriVox API 獲取書籍數據
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&id=${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch book data: ${response.status}`);
      }
      const data: LibriVoxBook = await response.json();

      // 獲取章節列表
      const chaptersResponse = await fetch(`${this.LIBRIVOX_TRACKS_API}?format=json&project_id=${id}`);
      if (!chaptersResponse.ok) {
        throw new Error(`Failed to fetch chapters data: ${chaptersResponse.status}`);
      }
      const chaptersData = await chaptersResponse.json();

      // 找到第一個章節的音訊 URL
      const firstChapter = chaptersData.books[0]?.sections?.[0];
      const audioUrl = firstChapter?.listen_url;

      // 轉換數據
      const book = this.convertLibriVoxToBook(data);
      book.audioUrl = audioUrl || book.audioUrl; // 優先使用章節的 MP3 URL

      // 存入緩存
      this.bookCache.set(id.toString(), book);

      return book;
    } catch (error) {
      console.error('Error fetching book data:', error);
      return null;
    }
  }

  async searchBooks(query: string): Promise<Book[]> {
    try {
      const cacheKey = query.toLowerCase()
      if (this.searchCache.has(cacheKey)) {
        return this.searchCache.get(cacheKey)!
      }

      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&search=${query}`)
      const data = await response.json() as LibriVoxResponse
      const results = data.books.map(book => this.convertLibriVoxToBook(book))
      this.searchCache.set(cacheKey, results)
      return results
    } catch (error) {
      console.error('Error searching books:', error)
      return []
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.LIBRIVOX_API_BASE}?format=json&list=genres`)
      const data = await response.json() as LibriVoxResponse
      return data.genres.map(genre => genre.name)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    
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
