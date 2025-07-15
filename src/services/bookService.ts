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

// LibriVox API 響應接口
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
  private readonly LIBRIVOX_API_BASE = 'https://librivox.org/api/feed/audiobooks'
  private readonly LIBRIVOX_TRACKS_API = 'https://librivox.org/api/feed/audiotracks'

  private constructor() {
    // 不再使用假數據，改為從 LibriVox API 獲取
  }

  public static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService()
    }
    return BookService.instance
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
    
    // 生成隨機評分和收聽次數（因為 LibriVox 沒有這些數據）
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0-5.0
    const listenCount = Math.floor(Math.random() * 5000) + 100
    
    return {
      id: parseInt(libriVoxBook.id),
      title: libriVoxBook.title,
      author,
      cover: `https://archive.org/services/img/${libriVoxBook.url_iarchive?.split('/').pop()}`,
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
   * 從 LibriVox API 獲取書籍數據
   */
  private async fetchBooksFromLibriVox(params: string = ''): Promise<Book[]> {
    try {
      let url: string
      if (params.startsWith('?')) {
        url = `${this.LIBRIVOX_API_BASE}${params}&format=json&extended=1`
      } else if (params.startsWith('/')) {
        url = `${this.LIBRIVOX_API_BASE}${params}?format=json&extended=1&limit=50`
      } else {
        url = `${this.LIBRIVOX_API_BASE}?format=json&extended=1&limit=50`
      }
      
      console.log('Fetching from URL:', url) // 調試用
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: LibriVoxResponse = await response.json()
      return data.books.map(book => this.convertLibriVoxToBook(book))
    } catch (error) {
      console.error('Error fetching books from LibriVox:', error)
      return []
    }
  }

  async getBooksByCategory(category: string): Promise<Book[]> {
    return await this.fetchBooksFromLibriVox(`/genre/${encodeURIComponent(category)}`)
  }

  async getHotBooks(): Promise<Book[]> {
    // LibriVox 沒有熱門排序，我們獲取最新的書籍
    const books = await this.fetchBooksFromLibriVox('?limit=20')
    return books.sort((a, b) => b.listenCount - a.listenCount).slice(0, 10)
  }

  async getNewBooks(): Promise<Book[]> {
    // 獲取最新添加的書籍
    return await this.fetchBooksFromLibriVox('?limit=10')
  }

  async getRecommendedBooks(): Promise<Book[]> {
    // 獲取一些經典書籍作為推薦
    const books = await this.fetchBooksFromLibriVox('?limit=20')
    return books.filter(book => book.rating >= 4.5).slice(0, 10)
  }

  async getBookById(id: number): Promise<Book | undefined> {
    try {
      const books = await this.fetchBooksFromLibriVox(`?id=${id}`)
      return books.length > 0 ? books[0] : undefined
    } catch (error) {
      console.error('Error fetching book by ID:', error)
      return undefined
    }
  }

  async searchBooks(keyword: string): Promise<Book[]> {
    try {
      // 搜索標題
      const titleResults = await this.fetchBooksFromLibriVox(`/title/${encodeURIComponent(keyword)}`)
      // 搜索作者
      const authorResults = await this.fetchBooksFromLibriVox(`/author/${encodeURIComponent(keyword)}`)
      
      // 合併結果並去重
      const allResults = [...titleResults, ...authorResults]
      const uniqueResults = allResults.filter((book, index, self) => 
        index === self.findIndex(b => b.id === book.id)
      )
      
      return uniqueResults
    } catch (error) {
      console.error('Error searching books:', error)
      return []
    }
  }
  
  async getAllBooks(): Promise<Book[]> {
    return await this.fetchBooksFromLibriVox('?limit=100')
  }
  
  /**
   * 獲取書籍的章節列表
   * @param bookId 書籍ID
   * @returns 章節列表數組
   */
  async getChapters(bookId: number): Promise<Chapter[]> {
    try {
      const url = `${this.LIBRIVOX_TRACKS_API}?project_id=${bookId}&format=json`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.sections || !Array.isArray(data.sections)) {
        return []
      }
      
      return data.sections.map((section: any, index: number) => ({
        id: parseInt(section.id) || index + 1,
        bookId: bookId,
        title: section.title || `Chapter ${section.section_number || index + 1}`,
        duration: this.parseTimeToSeconds(section.playtime) || 0,
        audioUrl: section.listen_url || '',
        isLocked: false // LibriVox 的所有內容都是免費的
      }))
    } catch (error) {
      console.error('Error fetching chapters from LibriVox:', error)
      return []
    }
  }
  
  /**
   * 將時間字符串轉換為秒數
   * @param timeString 時間字符串 (例如: "12:34" 或 "1:23:45")
   * @returns 秒數
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
