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
}

export class BookService {
  private static instance: BookService
  private books: Book[] = []

  private constructor() {
    // 初始化模擬數據
    this.books = [
      {
        id: 1,
        title: '神秘的森林探險',
        author: '張三',
        cover: 'https://via.placeholder.com/150',
        description: '一段驚心動魄的森林探險故事',
        audioUrl: 'https://example.com/audio1.mp3',
        duration: 120,
        category: '冒險',
        tags: ['冒險', '懸疑', '驚悚'],
        rating: 4.5,
        listenCount: 1234
      },
      {
        id: 2,
        title: '時間旅行者',
        author: '李四',
        cover: 'https://via.placeholder.com/150',
        description: '穿越時空的奇幻之旅',
        audioUrl: 'https://example.com/audio2.mp3',
        duration: 180,
        category: '科幻',
        tags: ['科幻', '時空', '冒險'],
        rating: 4.8,
        listenCount: 2345
      },
      // 更多書籍數據...
    ]
  }

  public static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService()
    }
    return BookService.instance
  }

  getBooksByCategory(category: string): Book[] {
    return this.books.filter(book => book.category === category)
  }

  getHotBooks(): Book[] {
    return this.books.sort((a, b) => b.listenCount - a.listenCount).slice(0, 10)
  }

  getNewBooks(): Book[] {
    return this.books.sort((a, b) => b.id - a.id).slice(0, 10)
  }

  getRecommendedBooks(): Book[] {
    return this.books.filter(book => book.rating >= 4.5).slice(0, 10)
  }

  getBookById(id: number): Book | undefined {
    return this.books.find(book => book.id === id)
  }

  searchBooks(keyword: string): Book[] {
    return this.books.filter(book =>
      book.title.includes(keyword) ||
      book.author.includes(keyword) ||
      book.tags.some(tag => tag.includes(keyword))
    )
  }
}
