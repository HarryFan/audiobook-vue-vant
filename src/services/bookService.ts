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
}

export interface Chapter {
  id: number
  bookId: number
  title: string
  duration: number
  audioUrl: string
  isLocked?: boolean
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
        description: '一段驚心動魄的森林探險故事，主角在一次偶然的機會下發現了一片神秘的森林，並在森林中展開了一系列驚險刺激的冒險。',
        audioUrl: 'https://example.com/audio1.mp3',
        duration: 7200,
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
        description: '穿越時空的奇幻之旅，講述了一位科學家發明時間機器後，在不同時空中經歷的奇幻冒險。',
        audioUrl: 'https://example.com/audio2.mp3',
        duration: 9000,
        category: '科幻',
        tags: ['科幻', '時空', '冒險'],
        rating: 4.8,
        listenCount: 2345
      },
      {
        id: 3,
        title: '星際迷航',
        author: '王五',
        cover: 'https://via.placeholder.com/150',
        description: '一群勇敢的宇航員踏上了探索未知宇宙的旅程，在浩瀚的宇宙中尋找新的文明和生命。',
        audioUrl: 'https://example.com/audio3.mp3',
        duration: 8400,
        category: '科幻',
        tags: ['太空', '探險', '科幻'],
        rating: 4.7,
        listenCount: 1876
      },
      {
        id: 4,
        title: '深海秘境',
        author: '趙六',
        cover: 'https://via.placeholder.com/150',
        description: '探索海洋深處的未知世界，揭示海底文明的神祕面紗。',
        audioUrl: 'https://example.com/audio4.mp3',
        duration: 6300,
        category: '冒險',
        tags: ['海洋', '探險', '神秘'],
        rating: 4.3,
        listenCount: 986
      },
      {
        id: 5,
        title: '愛在黃昏',
        author: '劉七',
        cover: 'https://via.placeholder.com/150',
        description: '一段感人至深的愛情故事，講述了兩位老人在晚年相遇並相知相愛的溫馨過程。',
        audioUrl: 'https://example.com/audio5.mp3',
        duration: 5400,
        category: '愛情',
        tags: ['愛情', '溫馨', '感人'],
        rating: 4.9,
        listenCount: 3421
      },
      {
        id: 6,
        title: '偵探日記',
        author: '孫八',
        cover: 'https://via.placeholder.com/150',
        description: '一位資深偵探的辦案記錄，每一篇都是一個撲朔迷離的懸疑故事。',
        audioUrl: 'https://example.com/audio6.mp3',
        duration: 10800,
        category: '懸疑',
        tags: ['懸疑', '推理', '犯罪'],
        rating: 4.6,
        listenCount: 1543
      },
      {
        id: 7,
        title: '古代戰爭史',
        author: '周九',
        cover: 'https://via.placeholder.com/150',
        description: '詳細記載了古代各大戰役的始末，以及對後世的影響。',
        audioUrl: 'https://example.com/audio7.mp3',
        duration: 12600,
        category: '歷史',
        tags: ['歷史', '戰爭', '紀實'],
        rating: 4.4,
        listenCount: 876
      },
      {
        id: 8,
        title: '迷失叢林',
        author: '吳十',
        cover: 'https://via.placeholder.com/150',
        description: '一群旅行者在叢林中迷路，他們必須團結一致才能找到出路。',
        audioUrl: 'https://example.com/audio8.mp3',
        duration: 7800,
        category: '冒險',
        tags: ['冒險', '生存', '團隊'],
        rating: 4.2,
        listenCount: 654
      },
      {
        id: 9,
        title: '未來城市',
        author: '鄭十一',
        cover: 'https://via.placeholder.com/150',
        description: '描繪了一百年後的未來都市景象，以及人類生活的巨大變化。',
        audioUrl: 'https://example.com/audio9.mp3',
        duration: 8100,
        category: '科幻',
        tags: ['未來', '科技', '社會'],
        rating: 4.7,
        listenCount: 2187
      },
      {
        id: 10,
        title: '古墓謎團',
        author: '錢十二',
        cover: 'https://via.placeholder.com/150',
        description: '一支考古隊在探索古墓的過程中，遇到了許多不可思議的事件。',
        audioUrl: 'https://example.com/audio10.mp3',
        duration: 9600,
        category: '懸疑',
        tags: ['考古', '懸疑', '歷史'],
        rating: 4.5,
        listenCount: 1432
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
