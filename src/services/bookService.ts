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
    // 初始化內建模擬數據，使用從 mock-data.html 提取的真實書籍數據
    this.books = [
      {
        id: 1,
        title: '與希林攜手同行',
        author: '是枝裕和',
        cover: 'https://cdn.readmoo.com/cover/bd/dbiakd4_210x315.jpg',
        description: '生命似乎被創造了只有自己一個人無法完成的樣子。\n\n《與希林攜手同行》對我而言是非常重要的書，一本無法寄出的「情書」。——是枝裕和\n\n日本國民大導演與演技派國民奶奶攜手完成的唯一著作',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 4850,
        category: '文學小說',
        tags: ['日本文學', '電影', '傳記'],
        rating: 4.8,
        listenCount: 3580,
        language: '中文',
        totalTimeSecs: 4850,
        chapters: [
          { id: 101, title: '我與希林奶奶的相遇', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1250, chapterNumber: 1 },
          { id: 102, title: '電影《山茶花女之戀》的創作歷程', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1800, chapterNumber: 2 },
          { id: 103, title: '如何面對生命的終點', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1800, chapterNumber: 3 }
        ]
      },
      {
        id: 2,
        title: '開一間只屬於你的餐廳',
        author: '賈森・弗里德曼',
        cover: 'https://cdn.readmoo.com/cover/mf/oucibo2_210x315.jpg',
        description: '「經營順利的餐廳各有其成功之道，但失敗的餐廳原因都大同小異」\n40年餐飲業經驗、看過上萬間餐廳彙整的「不失敗」經營心法\n讓你從選址、菜單規畫、店面設計到行銷待客都不走冤枉路',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 5420,
        category: '商業理財',
        tags: ['創業', '餐飲', '經營管理'],
        rating: 4.9,
        listenCount: 7210,
        language: '中文',
        totalTimeSecs: 5420,
        chapters: [
          { id: 201, title: '為什麼開餐廳', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1420, chapterNumber: 1 },
          { id: 202, title: '餐廳定位與菜單設計', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 2150, chapterNumber: 2 },
          { id: 203, title: '餐飲經營的財務分析', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1850, chapterNumber: 3 }
        ]
      },
      {
        id: 3,
        title: '愛撫取樂手冊',
        author: '強納森・馬堤',
        cover: 'https://cdn.readmoo.com/cover/oq/h50hwq3_210x315.jpg',
        description: '你知道陰蒂高潮嗎？一般統計表明，70-80％的女性都是刺激這裡達到高潮，所以愛愛根本不一定要「插進去」？\n愛撫、按摩、口交、指交……甚至肛交，都還更爽呢！\n\n性愛≠插入\n開啟你對性愛的新的想像！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 4260,
        category: '生活風格',
        tags: ['兩性關係', '親密關係', '性教育'],
        rating: 4.6,
        listenCount: 9520,
        language: '中文',
        totalTimeSecs: 4260,
        chapters: [
          { id: 301, title: '愛愛迷思與真相', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1380, chapterNumber: 1 },
          { id: 302, title: '愛撫的技巧與步驟', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1450, chapterNumber: 2 },
          { id: 303, title: '親密關係中的溝通', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1430, chapterNumber: 3 }
        ]
      },
      {
        id: 4,
        title: '台北獨食主義',
        author: '黃惠偵',
        cover: 'https://cdn.readmoo.com/cover/a4/gcahi6h_210x315.jpg?v=0',
        description: '一人吃飯，不會是孤獨，那是沉澱自己的必需事。\n一人用餐，不會是尷尬，是療癒自己的幸福儀式。\n一人獨食，不會是寂寞，那是對生活的覓食探險。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3850,
        category: '飲食',
        tags: ['台北', '美食', '獨食'],
        rating: 4.7,
        listenCount: 6340,
        language: '中文',
        totalTimeSecs: 3850,
        chapters: [
          { id: 401, title: '獨食的哲學', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1250, chapterNumber: 1 },
          { id: 402, title: '台北東區的隱藏美食', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1300, chapterNumber: 2 },
          { id: 403, title: '台北西區的文青小店', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1300, chapterNumber: 3 }
        ]
      },
      {
        id: 5,
        title: '鹿皮筆記本',
        author: '張亦絢',
        cover: 'https://cdn.readmoo.com/cover/h4/r0fq1wg_210x315.jpg',
        description: '誰的真誠能夠穿越時間？\n誰的真心能夠被世界善待？\n兩個在劇變年代的廢墟中尋找自我的靈魂，\n一段在遺忘與相認之間反覆糾葛的動人情誼。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 5320,
        category: '文學小說',
        tags: ['台灣文學', '小說', '文學獎'],
        rating: 4.5,
        listenCount: 2980,
        language: '中文',
        totalTimeSecs: 5320,
        chapters: [
          { id: 501, title: '記憶裡的風景', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1720, chapterNumber: 1 },
          { id: 502, title: '遺落的時光', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1830, chapterNumber: 2 },
          { id: 503, title: '鹿皮筆記本的秘密', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1770, chapterNumber: 3 }
        ]
      },
      {
        id: 6,
        title: '管他的，做自己',
        author: '盧貝松',
        cover: 'https://cdn.readmoo.com/cover/h7/hmhw6kd_210x315.jpg',
        description: '真實的自己，遠比想像中更了不起！\n法國名導盧貝松首部自傳，\n獻給每一個曾被說「不可能」的你！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 4800,
        category: '人文社科',
        tags: ['電影', '傳記', '藝術'],
        rating: 4.7,
        listenCount: 4570,
        language: '中文',
        totalTimeSecs: 4800,
        chapters: [
          { id: 601, title: '從小說到電影', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1600, chapterNumber: 1 },
          { id: 602, title: '創作路上的挑戰', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1600, chapterNumber: 2 },
          { id: 603, title: '成為自己的導演', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1600, chapterNumber: 3 }
        ]
      },
      {
        id: 7,
        title: '牙套微笑日記',
        author: '蕾娜・塔吉邁爾',
        cover: 'https://cdn.readmoo.com/cover/jb/qpkqrgg_210x315.jpg',
        description: '陪伴成長風暴的暖心佳作\n圖像小說界的冠軍作品 美國樂學集團圖像小說專業出版品牌Graphix重量級作家\n1,600,000本系列暢銷佳作',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3500,
        category: '漫畫繪本',
        tags: ['圖像小說', '成長', '青少年'],
        rating: 5.0,
        listenCount: 8450,
        language: '中文',
        totalTimeSecs: 3500,
        chapters: [
          { id: 701, title: '牙套與自信', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1150, chapterNumber: 1 },
          { id: 702, title: '學校生活的挑戰', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 },
          { id: 703, title: '朋友與成長', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1150, chapterNumber: 3 }
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
