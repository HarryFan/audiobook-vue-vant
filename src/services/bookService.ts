import { 
  mockBooks, 
  getHotBooks as getMockHotBooks,
  getNewBooks as getMockNewBooks,
  getRecommendedBooks as getMockRecommendedBooks,
  getBookById as getMockBookById,
  searchBooks as searchMockBooks,
  type MockBook
} from '../data/mockBooks';

export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverUrl: string
  duration: string
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
  duration: string
  audioUrl: string
}

// 將 MockBook 轉換為 Book 類型的輔助函數
const convertMockToBook = (mockBook: MockBook): Book => {
  return {
    id: mockBook.id,
    title: mockBook.title,
    author: mockBook.author,
    description: mockBook.description || '',
    coverUrl: mockBook.coverUrl,
    duration: mockBook.duration || '未知',
    rating: mockBook.rating || 0,
    listenCount: mockBook.listenCount || 0,
    chapters: mockBook.chapters?.map(chapter => ({
      id: chapter.id,
      title: chapter.title,
      duration: chapter.duration,
      audioUrl: chapter.audioUrl
    })) || [],
    audioUrl: mockBook.chapters?.[0]?.audioUrl || '',
    categories: mockBook.categories || [],
    publishedDate: mockBook.publishedDate || '',
    language: mockBook.language || 'unknown'
  };
};

class BookService {
  private static instance: BookService
  private books: Book[] = []
  private searchCache = new Map<string, Book[]>()

  constructor() {
    // 禁止直接實例化
    this.books = mockBooks.map(convertMockToBook)
  }

  static getInstance() {
    if (!BookService.instance) {
      BookService.instance = new BookService()
    }
    return BookService.instance
  }



  public async getBookById(id: string): Promise<Book | null> {
    const mockBook = getMockBookById(id)
    return mockBook ? convertMockToBook(mockBook) : null
  }

  private generateRandomRating(): number {
    return Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0-5.0
  }

  private generateRandomListenCount(): number {
    return Math.floor(Math.random() * 5000) + 100;
  }

  async getCategories(): Promise<string[]> {
    const allCategories = new Set<string>()
    this.books.forEach(book => {
      book.categories.forEach(category => allCategories.add(category))
    })
    return Array.from(allCategories)
  }

  async getBooksByCategory(category: string): Promise<Book[]> {
    return this.books.filter(book => book.categories.includes(category))
  }

  async getAllBooks(): Promise<Book[]> {
    return this.books
  }

  async getRecommendedBooks(): Promise<Book[]> {
    return getMockRecommendedBooks().map(convertMockToBook)
  }

  async getHotBooks(): Promise<Book[]> {
    return getMockHotBooks().map(convertMockToBook)
  }

  async getNewBooks(): Promise<Book[]> {
    return getMockNewBooks().map(convertMockToBook)
  }

  async searchBooks(query: string): Promise<Book[]> {
    if (this.searchCache.has(query)) {
      return this.searchCache.get(query)!
    }

    const results = searchMockBooks(query).map(convertMockToBook)
    this.searchCache.set(query, results)
    return results
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

export default BookService
