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
  
  getAllBooks(): Book[] {
    return [...this.books]
  }
  
  /**
   * 獲取書籍的章節列表
   * @param bookId 書籍ID
   * @returns 章節列表數組
   */
  getChapters(bookId: number): Chapter[] {
    // 模擬章節數據
    const chapterCount = Math.floor(Math.random() * 30) + 10; // 10-40章
    const chapters: Chapter[] = [];
    
    for (let i = 1; i <= chapterCount; i++) {
      chapters.push({
        id: i,
        bookId: bookId,
        title: `第${i}章: ${this.generateChapterTitle(i)}`,
        duration: Math.floor(Math.random() * 1200) + 300, // 5-25分鐘
        audioUrl: `https://example.com/books/${bookId}/chapter${i}.mp3`,
        isLocked: i > 5 // 前5章免費，後面需要付費
      });
    }
    
    return chapters;
  }
  
  /**
   * 生成隨機章節標題
   * @param index 章節索引
   * @returns 章節標題
   */
  private generateChapterTitle(index: number): string {
    const titles = [
      '初見端倪', '神秘來客', '驚天秘密', '暗夜追蹤', '遇見真相',
      '生死抉擇', '峰迴路轉', '絕處逢生', '意外發現', '重獲新生',
      '豁然開朗', '不速之客', '危機四伏', '層層迷霧', '破繭而出',
      '千鈞一髮', '柳暗花明', '撥雲見日', '峰迴路轉', '奇遇連連'
    ];
    
    return titles[index % titles.length];
  }
}
