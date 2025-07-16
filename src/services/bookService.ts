export interface Chapter {
  id: number
  title: string
  duration: number
}

export interface Book {
  id: string | number
  title: string
  author: string
  cover: string
  coverUrl?: string // 兼容舊的 cover 屬性
  publisher?: string
  description: string
  audioUrl: string
  duration: number // 總時長（秒）
  category?: string
  tags?: string[]
  rating: number
  listenCount?: number
  chapters?: Chapter[]
  price?: number
}

export class BookService {
  private static instance: BookService
  private books: Book[] = []

  private constructor() {
    // 整合來自 audiobooks.js 的數據
    this.books = [
      {
        id: '1',
        title: '與希林攜手同行',
        author: '是枝裕和',
        cover: 'https://cdn.readmoo.com/cover/bd/dbiakd4_210x315.jpg',
        coverUrl: 'https://cdn.readmoo.com/cover/bd/dbiakd4_210x315.jpg',
        publisher: '臉譜',
        description: '生命似乎被創造了只有自己一個人無法完成的樣子。《與希林攜手同行》對我而言是非常重要的書，一本無法寄出的「情書」。——是枝裕和 日本國民大導演與演技派國民奶奶攜手完成的唯一著作盡窺導演與演員的相知相惜、影視前輩對後進的無私提攜母親對兒子比海還深的關愛、兒子對母親的倚賴與仰望...',
        audioUrl: '/audio/googleStitchUI_demo.wav',
        duration: 3600, // 1小時
        category: '傳記',
        tags: ['傳記', '電影', '人生'],
        rating: 4.8,
        listenCount: 1250,
        price: 99,
        chapters: [
          { id: 1, title: '第一章', duration: 1800 },
          { id: 2, title: '第二章', duration: 1800 }
        ]
      },
      {
        id: '2',
        title: '這樣經營，餐廳才會賺：名顧問教你避開25個開店常見失敗原因，創造能長遠經營的獲利之道',
        author: '須田光彥',
        cover: 'https://cdn.readmoo.com/cover/63/8a51g76_210x315.jpg',
        coverUrl: 'https://cdn.readmoo.com/cover/63/8a51g76_210x315.jpg',
        publisher: '麥浩斯',
        description: '「經營順利的餐廳各有其成功之道，但失敗的餐廳原因都大同小異」40 年餐飲業經驗、看過上萬間餐廳彙整的「不失敗」經營心法。',
        audioUrl: '/audio/googleStitchUI_demo.wav',
        duration: 7200, // 2小時
        category: '商業',
        tags: ['商業', '餐飲', '經營'],
        rating: 4.9,
        listenCount: 890,
        price: 99,
        chapters: [
          { id: 1, title: '第一章', duration: 2400 },
          { id: 2, title: '第二章', duration: 2400 },
          { id: 3, title: '第三章', duration: 2400 }
        ]
      },
      {
        id: '3',
        title: '歡愉俱樂部',
        author: '茱諾．普拉',
        cover: 'https://cdn.readmoo.com/cover/bf/a6egk6i_210x315.jpg?v=1615367649',
        description: '你知道陰蒂高潮嗎？一般統計表明，70-80％的女性都是刺激這裡達到高潮，所以愛愛根本不一定要「插進去」？開啟你對性愛的新的想像！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 150, // 2.5小時
        category: '健康',
        tags: ['健康', '性教育', '關係'],
        rating: 4.6,
        listenCount: 567
      },
      {
        id: 4,
        title: '台北獨食主義',
        author: '尼可拉斯, 黃安寶',
        cover: 'https://cdn.readmoo.com/cover/a4/gcahi6h_210x315.jpg?v=0',
        description: '探索台北獨自用餐的美食文化，發現一個人吃飯的樂趣與自在。從街頭小吃到精緻餐廳，帶你品味台北的獨食風景。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 120, // 2小時
        category: '生活',
        tags: ['美食', '台北', '生活'],
        rating: 4.3,
        listenCount: 723
      },
      {
        id: 5,
        title: '深度學習入門',
        author: '李明華',
        cover: 'https://via.placeholder.com/210x315/4A90E2/FFFFFF?text=深度學習',
        description: '從零開始學習深度學習，包含神經網路基礎、卷積神經網路、循環神經網路等核心概念，適合初學者入門。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 300, // 5小時
        category: '科技',
        tags: ['程式設計', 'AI', '機器學習'],
        rating: 4.7,
        listenCount: 1456
      },
      {
        id: 6,
        title: '心理學與日常生活',
        author: '王心理',
        cover: 'https://via.placeholder.com/210x315/50C878/FFFFFF?text=心理學',
        description: '探討心理學在日常生活中的應用，從認知偏誤到情緒管理，幫助你更好地理解自己和他人。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 200, // 3.3小時
        category: '心理',
        tags: ['心理學', '自我成長', '人際關係'],
        rating: 4.5,
        listenCount: 934
      },
      {
        id: 7,
        title: '投資理財新手指南',
        author: '財富大師',
        cover: 'https://via.placeholder.com/210x315/FFD700/000000?text=投資理財',
        description: '適合新手的投資理財指南，從基本概念到實戰策略，教你如何開始你的投資之路。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 250, // 4.2小時
        category: '財經',
        tags: ['投資', '理財', '股票'],
        rating: 4.4,
        listenCount: 1123
      },
      {
        id: 8,
        title: '極簡生活的藝術',
        author: '簡單生活家',
        cover: 'https://via.placeholder.com/210x315/F0F0F0/333333?text=極簡生活',
        description: '學習極簡生活的哲學與實踐方法，減少物質負擔，專注於真正重要的事物。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 160, // 2.7小時
        category: '生活',
        tags: ['極簡', '生活方式', '斷捨離'],
        rating: 4.6,
        listenCount: 678
      },
      {
        id: 9,
        title: '創業家的思維',
        author: '創業導師',
        cover: 'https://via.placeholder.com/210x315/FF6B6B/FFFFFF?text=創業思維',
        description: '分析成功創業家的思維模式，從創意發想想到商業模式設計，培養創業家精神。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 220, // 3.7小時
        category: '商業',
        tags: ['創業', '商業', '領導力'],
        rating: 4.8,
        listenCount: 1567
      },
      {
        id: 10,
        title: '冥想與正念練習',
        author: '禪修大師',
        cover: 'https://via.placeholder.com/210x315/9B59B6/FFFFFF?text=冥想正念',
        description: '學習冥想與正念的基本技巧，在忙碌的現代生活中找到內心的平靜與專注。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 180, // 3小時
        category: '心靈',
        tags: ['冥想', '正念', '心靈成長'],
        rating: 4.7,
        listenCount: 812
      }
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

  getBooksByTag(tag: string): Book[] {
    return this.books.filter(book => book.tags?.includes(tag) || false)
  }

  getPopularBooks(limit: number = 10): Book[] {
    return [...this.books]
      .sort((a, b) => (b.listenCount || 0) - (a.listenCount || 0))
      .slice(0, limit)
  }

  getNewReleases(limit: number = 10): Book[] {
    return [...this.books]
      .sort((a, b) => (b.duration || 0) - (a.duration || 0))
      .slice(0, limit)
  }

  getRecommendedBooks(): Book[] {
    return this.books.filter(book => book.rating >= 4.5).slice(0, 10)
  }

  getBookById(id: string | number): Book | undefined {
    return this.books.find(book => book.id.toString() === id.toString())
  }

  // 取得所有書籍
  getAllBooks(): Book[] {
    return this.books
  }

  searchBooks(keyword: string): Book[] {
    return this.books.filter(book =>
      book.title.includes(keyword) ||
      book.author.includes(keyword) ||
      (book.tags?.some(tag => tag.includes(keyword)) || false)
    )
  }
}

export const bookService = BookService.getInstance()
