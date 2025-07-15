// Mock 數據基於 LibriVox 真實數據
export interface MockBook {
  id: string;
  title: string;
  author: string;
  authorLifespan?: string;
  coverUrl: string;
  detailUrl: string;
  downloadUrl: string;
  fileSize: string;
  language: string;
  status: string;
  type: string;
  description?: string;
  duration?: string;
  rating?: number;
  listenCount?: number;
  chapters?: MockChapter[];
  audioUrl?: string;
  categories?: string[];
  publishedDate?: string;
}

export interface MockChapter {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
}

// 基於 LibriVox 真實數據的 Mock 書籍列表
export const mockBooks: MockBook[] = [
  {
    id: "1",
    title: "匆匆 Cong Cong (Multilingual Short Story Collection 001)",
    author: "Ziqing Zhu",
    authorLifespan: "1898 - 1948",
    coverUrl: "https://www.archive.org/download/LibrivoxCdCoverArt16/Multilingual_SSC_001_1205_thumb.jpg",
    detailUrl: "https://librivox.org/multilingual-short-story-collection-001/",
    downloadUrl: "https://archive.org/compress/multilingual_short_stories_0906_librivox/formats=64KBPS MP3&file=/multilingual_short_stories_0906_librivox.zip",
    fileSize: "58 MB",
    language: "Multilingual",
    status: "Complete",
    type: "Collaborative",
    description: "朱自清的經典散文《匆匆》，收錄在多語言短篇小說集中。這是一篇關於時間流逝的深刻思考。",
    duration: "45分鐘",
    rating: 4.5,
    listenCount: 1250,
    categories: ["散文", "中國文學", "經典作品"],
    publishedDate: "1922",
    chapters: [
      {
        id: "1-1",
        title: "匆匆 - 完整朗讀",
        duration: "45:00",
        audioUrl: "https://archive.org/download/multilingual_short_stories_0906_librivox/congcong.mp3"
      }
    ]
  },
  {
    id: "2",
    title: "感遇其一 (Thoughts I) - 唐詩三百首 卷一",
    author: "Jiuling Zhang 張九齡",
    authorLifespan: "673 - 740",
    coverUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/Three_Hundred_Tang_Poems_Volume_1_1105_thumb.jpg",
    detailUrl: "https://librivox.org/three-hundred-tang-poems-volume-1-by-various/",
    downloadUrl: "https://archive.org/compress/300_tang_poems_vol_1_librivox/formats=64KBPS MP3&file=/300_tang_poems_vol_1_librivox.zip",
    fileSize: "61MB",
    language: "Chinese",
    status: "Complete",
    type: "Collaborative",
    description: "張九齡的《感遇》詩，收錄在唐詩三百首中。詩人通過詠物抒懷，表達了對時世的感慨。",
    duration: "3小時15分鐘",
    rating: 4.8,
    listenCount: 2100,
    categories: ["古詩", "唐詩", "中國古典文學"],
    publishedDate: "唐代",
    chapters: [
      {
        id: "2-1",
        title: "感遇其一 (閩南語版)",
        duration: "3:20",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/ganyu1_hokkien.mp3"
      },
      {
        id: "2-2",
        title: "感遇其一 (普通話版)",
        duration: "3:15",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/ganyu1_mandarin.mp3"
      }
    ]
  },
  {
    id: "3",
    title: "感遇其二 (Orchid and Orange I) - 唐詩三百首 卷一",
    author: "Jiuling Zhang 張九齡",
    authorLifespan: "673 - 740",
    coverUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/Three_Hundred_Tang_Poems_Volume_1_1105_thumb.jpg",
    detailUrl: "https://librivox.org/three-hundred-tang-poems-volume-1-by-various/",
    downloadUrl: "https://archive.org/compress/300_tang_poems_vol_1_librivox/formats=64KBPS MP3&file=/300_tang_poems_vol_1_librivox.zip",
    fileSize: "61MB",
    language: "Chinese",
    status: "Complete",
    type: "Collaborative",
    description: "張九齡《感遇》詩第二首，以蘭花和橘子為喻，表達詩人的品格追求和人生感悟。",
    duration: "3小時15分鐘",
    rating: 4.7,
    listenCount: 1890,
    categories: ["古詩", "唐詩", "中國古典文學"],
    publishedDate: "唐代",
    chapters: [
      {
        id: "3-1",
        title: "感遇其二 (閩南語版)",
        duration: "3:25",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/ganyu2_hokkien.mp3"
      },
      {
        id: "3-2",
        title: "感遇其二 (普通話版)",
        duration: "3:18",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/ganyu2_mandarin.mp3"
      }
    ]
  },
  {
    id: "4",
    title: "感遇其三 (Thoughts III) - 唐詩三百首 卷一",
    author: "Jiuling Zhang 張九齡",
    authorLifespan: "673 - 740",
    coverUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/Three_Hundred_Tang_Poems_Volume_1_1105_thumb.jpg",
    detailUrl: "https://librivox.org/three-hundred-tang-poems-volume-1-by-various/",
    downloadUrl: "https://archive.org/compress/300_tang_poems_vol_1_librivox/formats=64KBPS MP3&file=/300_tang_poems_vol_1_librivox.zip",
    fileSize: "61MB",
    language: "Chinese",
    status: "Complete",
    type: "Collaborative",
    description: "張九齡《感遇》詩第三首，繼續抒發詩人對人生和時世的深刻思考。",
    duration: "3小時15分鐘",
    rating: 4.6,
    listenCount: 1750,
    categories: ["古詩", "唐詩", "中國古典文學"],
    publishedDate: "唐代",
    chapters: [
      {
        id: "4-1",
        title: "感遇其三 (閩南語版)",
        duration: "3:30",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/ganyu3_hokkien.mp3"
      },
      {
        id: "4-2",
        title: "感遇其三 (普通話版)",
        duration: "3:22",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/ganyu3_mandarin.mp3"
      }
    ]
  },
  {
    id: "5",
    title: "感遇其四 (Orchid and Orange II) - 唐詩三百首 卷一",
    author: "Jiuling Zhang 張九齡",
    authorLifespan: "673 - 740",
    coverUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/Three_Hundred_Tang_Poems_Volume_1_1105_thumb.jpg",
    detailUrl: "https://librivox.org/three-hundred-tang-poems-volume-1-by-various/",
    downloadUrl: "https://archive.org/compress/300_tang_poems_vol_1_librivox/formats=64KBPS MP3&file=/300_tang_poems_vol_1_librivox.zip",
    fileSize: "61MB",
    language: "Chinese",
    status: "Complete",
    type: "Collaborative",
    description: "張九齡《感遇》詩第四首，再次以蘭花和橘子為象徵，表達詩人的理想和情懷。",
    duration: "3小時15分鐘",
    rating: 4.5,
    listenCount: 1680,
    categories: ["古詩", "唐詩", "中國古典文學"],
    publishedDate: "唐代",
    chapters: [
      {
        id: "5-1",
        title: "感遇其四 (閩南語版)",
        duration: "3:28",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/ganyu4_hokkien.mp3"
      },
      {
        id: "5-2",
        title: "感遇其四 (普通話版)",
        duration: "3:20",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/ganyu4_mandarin.mp3"
      }
    ]
  },
  {
    id: "6",
    title: "下終南山過斛斯山人宿置酒 (Down Zhongnan to the Kind Pillow and Bowl of Husi) - 唐詩三百首 卷一",
    author: "Bai Li 李白",
    authorLifespan: "701 - 762",
    coverUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/Three_Hundred_Tang_Poems_Volume_1_1105_thumb.jpg",
    detailUrl: "https://librivox.org/three-hundred-tang-poems-volume-1-by-various/",
    downloadUrl: "https://archive.org/compress/300_tang_poems_vol_1_librivox/formats=64KBPS MP3&file=/300_tang_poems_vol_1_librivox.zip",
    fileSize: "61MB",
    language: "Chinese",
    status: "Complete",
    type: "Collaborative",
    description: "李白的經典詩作，描寫詩人下終南山拜訪友人的情景，展現了詩人豪放的性格和深厚的友情。",
    duration: "3小時15分鐘",
    rating: 4.9,
    listenCount: 3200,
    categories: ["古詩", "唐詩", "李白詩集", "中國古典文學"],
    publishedDate: "唐代",
    chapters: [
      {
        id: "6-1",
        title: "下終南山過斛斯山人宿置酒 (閩南語版)",
        duration: "4:15",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/zhongnanshan_hokkien.mp3"
      },
      {
        id: "6-2",
        title: "下終南山過斛斯山人宿置酒 (普通話版)",
        duration: "4:08",
        audioUrl: "https://archive.org/download/300_tang_poems_vol_1_librivox/zhongnanshan_mandarin.mp3"
      }
    ]
  }
];

// 熱門書籍 (基於下載量和評分)
export const getHotBooks = (): MockBook[] => {
  return mockBooks
    .sort((a, b) => (b.listenCount || 0) - (a.listenCount || 0))
    .slice(0, 10);
};

// 新書推薦 (基於評分)
export const getNewBooks = (): MockBook[] => {
  return mockBooks
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8);
};

// 推薦書籍 (基於評分和收聽量綜合)
export const getRecommendedBooks = (): MockBook[] => {
  return mockBooks
    .sort((a, b) => {
      const scoreA = (a.rating || 0) * 0.6 + (a.listenCount || 0) * 0.0001;
      const scoreB = (b.rating || 0) * 0.6 + (b.listenCount || 0) * 0.0001;
      return scoreB - scoreA;
    })
    .slice(0, 8);
};

// 根據 ID 獲取書籍詳情
export const getBookById = (id: string): MockBook | undefined => {
  return mockBooks.find(book => book.id === id);
};

// 搜索書籍
export const searchBooks = (query: string): MockBook[] => {
  const lowerQuery = query.toLowerCase();
  return mockBooks.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    (book.categories || []).some(cat => cat.toLowerCase().includes(lowerQuery))
  );
};