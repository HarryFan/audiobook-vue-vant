export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  audioUrl: string;
  duration: number; // in seconds
  category: string;
  tags: string[];
  rating: number;
  listenCount: number;
  language: string;
  totalTimeSecs: number;
  urlLibrivox?: string;
  urlRss?: string;
  chapters?: BookChapter[];
}

export interface BookChapter {
  id: number;
  title: string;
  audioUrl: string;
  duration: number; // in seconds
  chapterNumber: number;
}

export class BookService {
  private static instance: BookService;
  private books: Book[] = [];

  private constructor() {
    // 初始化內建模擬數據，不再依賴外部檔案
    this.books = [
      {
        id: 1,
        title: 'UI 設計現代趨勢',
        author: '張亮',
        cover: 'https://picsum.photos/200/300?random=1',
        description: '探討現代UI設計原則和趨勢，著重於用戶體驗和互動設計的最佳實踐。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 1245,
        category: '設計',
        tags: ['UI', '設計', 'UX'],
        rating: 4.7,
        listenCount: 3210,
        language: '中文',
        totalTimeSecs: 1245,
        chapters: [
          { id: 101, title: '現代UI設計原則', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 362, chapterNumber: 1 },
          { id: 102, title: '色彩理論與應用', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 438, chapterNumber: 2 },
          { id: 103, title: '互動設計案例分析', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 445, chapterNumber: 3 }
        ]
      },
      {
        id: 2,
        title: 'React 開發實戰',
        author: '王建明',
        cover: 'https://picsum.photos/200/300?random=2',
        description: '從基礎到進階的React開發指南，包含hooks使用、狀態管理和性能優化技巧。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 2120,
        category: '程式開發',
        tags: ['React', 'JavaScript', '前端'],
        rating: 4.9,
        listenCount: 5430,
        language: '中文',
        totalTimeSecs: 2120,
        chapters: [
          { id: 201, title: 'React基礎與組件', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 720, chapterNumber: 1 },
          { id: 202, title: 'Hooks與狀態管理', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 850, chapterNumber: 2 },
          { id: 203, title: '性能優化與最佳實踐', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 550, chapterNumber: 3 }
        ]
      },
      {
        id: 3,
        title: '人工智能與商業應用',
        author: '李明哲',
        cover: 'https://picsum.photos/200/300?random=3',
        description: '探索AI在現代商業環境中的應用案例及其對各行業的影響。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 1830,
        category: '科技',
        tags: ['AI', '商業', '創新'],
        rating: 4.5,
        listenCount: 2980,
        language: '中文',
        totalTimeSecs: 1830,
        chapters: [
          { id: 301, title: 'AI基礎技術介紹', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 580, chapterNumber: 1 },
          { id: 302, title: '商業應用案例研究', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 650, chapterNumber: 2 },
          { id: 303, title: '未來發展與挑戰', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 600, chapterNumber: 3 }
        ]
      }
    ];
  }

  public static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService();
    }
    return BookService.instance;
  }
  
  /**
   * 獲取所有書籍
   */
  getAllBooks(): Book[] {
    return this.books;
  }
  
  /**
   * 按類別獲取書籍
   */
  getBooksByCategory(category: string): Book[] {
    return this.books.filter(book => book.category === category);
  }
  
  /**
   * 按 ID 獲取書籍
   */
  getBookById(id: number): Book | null {
    const book = this.books.find(book => book.id === id);
    return book || null;
  }
  
  /**
   * 按標籤獲取書籍
   */
  getBooksByTag(tag: string): Book[] {
    return this.books.filter(book => book.tags && book.tags.includes(tag));
  }

  /**
   * 獲取推薦書籍（隨機選擇2本）
   */
  getRecommendedBooks(): Book[] {
    return this.shuffleArray([...this.books]).slice(0, 2);
  }

  /**
   * 獲取熱門書籍（按照收聽次數排序）
   */
  getPopularBooks(): Book[] {
    return [...this.books].sort((a, b) => b.listenCount - a.listenCount).slice(0, 10);
  }
  
  /**
   * getHotBooks 方法（兼容舊程式碼，是 getPopularBooks 的別名）
   */
  getHotBooks(): Book[] {
    return this.getPopularBooks();
  }

  /**
   * 獲取新發布的書籍（按ID降序排列）
   */
  getNewReleases(): Book[] {
    return [...this.books].sort((a, b) => b.id - a.id).slice(0, 10);
  }
  
  /**
   * 獲取新書（兼容舊程式碼，是 getNewReleases 的別名）
   */
  getNewBooks(): Book[] {
    return this.getNewReleases();
  }
  
  /**
   * 搜索書籍（標題、作者、標籤）
   */
  searchBooks(keyword: string): Book[] {
    if (!keyword || keyword.trim() === '') {
      return [];
    }
    
    const lowercaseKeyword = keyword.toLowerCase();
    
    return this.books.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(lowercaseKeyword);
      const authorMatch = book.author.toLowerCase().includes(lowercaseKeyword);
      const tagMatch = book.tags && book.tags.some(tag => 
        tag.toLowerCase().includes(lowercaseKeyword)
      );
      
      return titleMatch || authorMatch || tagMatch;
    });
  }

  /**
   * 獲取書籍章節
   */
  getBookChapters(bookId: number): BookChapter[] {
    const book = this.getBookById(bookId);
    return book?.chapters || [];
  }
  
  /**
   * 打亂數組順序（用於隨機推薦）
   */
  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}

export const bookService = BookService.getInstance();
