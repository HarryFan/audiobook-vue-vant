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
        description: '生命 似乎被創造了 只有自己一個人無法完成的樣子 《與希林攜手同行》對我而言是非常重要的書，一本無法寄出的「情書」。——是枝裕和\n        日本國民大導演與演技派國民奶奶攜手完成的唯一著作 盡窺導演與演員的相知相惜、影視前輩對後進的無私提攜\n        母親對兒子比海還深的關愛、兒子對母親的倚賴與仰望...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.8,
        listenCount: 1100,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 2,
        title: '這樣經營，餐廳才會賺：名顧問教你避開25個開店常見失敗原因，創造能長遠經營的獲利之道',
        author: '須田光彥',
        cover: 'https://cdn.readmoo.com/cover/63/8a51g76_210x315.jpg',
        description: '「經營順利的餐廳各有其成功之道，但失敗的餐廳原因都大同小異」 40年餐飲業經驗、看過上萬間餐廳彙整的「不失敗」經營心法\n        讓你從選址、菜單規畫、店面設計到行銷待客都不走冤枉路',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.9,
        listenCount: 1200,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 3,
        title: '歡愉俱樂部：人體性愛地圖，圖解每個性愛高潮點與花式攻略技巧',
        author: '茱諾．普拉',
        cover: 'https://cdn.readmoo.com/cover/bf/a6egk6i_210x315.jpg',
        description: '你知道陰蒂高潮嗎？ 一般統計表明，70-80％的女性都是刺激這裡達到高潮，所以愛愛根本不一定要「插進去」？\n        愛撫、按摩、口交、指交……甚至肛交，都還更爽呢！ 性愛≠插入 開啟你對性愛的新的想像！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.6,
        listenCount: 1300,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 4,
        title: '台北獨食主義',
        author: '尼可拉斯',
        cover: 'https://cdn.readmoo.com/cover/a4/gcahi6h_210x315.jpg',
        description: '一人吃飯，不會是孤獨，那是沉澱自己的必需事。 一人用餐，不會是尷尬，是療癒自己的幸福儀式。 一人獨食，不會是寂寞，那是對生活的覓食探險。\n        在台北，有一部份的幸運在於你不用遠渡重洋去朝聖，僅只在這座城市中遊走，便能透過店家看見世界城市的縮影。你可以……',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 1400,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 5,
        title: '這樣裝潢有問題？室內裝修一定要知道的100個問題解答',
        author: '拆組達人',
        cover: 'https://cdn.readmoo.com/cover/76/fe2ghgc_210x315.jpg',
        description: '「安心裝修裝潢網」黃輝雲推薦：\n        「拆組達人的知名度在台灣不是蓋的。拆組沒花大錢上室內設計電視節目，而是努力寫出拆組的第一本專業的裝修問題解答書，拆組的紅，憑的是勤勤懇懇的經營態度，憑的是在專業上不斷地精進，對屋主負責的態度。拆組的粉絲很多，拆組早就該出書了！」\n        ……',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.1,
        listenCount: 1500,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 6,
        title: '當商業開始改變世界：從亞當．斯密到巴菲特，探看近300年世界商業思潮演變與影響',
        author: '吳曉波',
        cover: 'https://cdn.readmoo.com/cover/ik/qinlpoo_210x315.jpg',
        description: '前人的偉大之處是什麼？是創見。 他們影響了我們，但不能「占領」我們！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.7,
        listenCount: 1600,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 7,
        title: '賣書成癡的真心告白',
        author: '馬丁．萊瑟姆',
        cover: 'https://cdn.readmoo.com/cover/ka/fghjpeo_210x315.jpg',
        description: '人類可以如此為書癡狂！ 一場頌讚書本的盛典 因為閱讀，我們找到真正的自己。 這是人與書本之間的戀愛史。\n        一則又一則趣聞軼事，帶你走向充滿驚奇的書本世界。 ＊本書特色 1. 充滿名人與書本之間的趣聞軼事。 2. 關注底層人民與閱讀的關係。 3.\n        運用時空交錯的筆法，溯源文字作為...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 1700,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 8,
        title: '新游牧者之歌：遷移革命如何讓世界變得更美好',
        author: '菲利克斯．馬夸特',
        cover: 'https://cdn.readmoo.com/cover/pt/hlrguhg_210x315.jpg',
        description: '他們離開並不是因為出色，而是因為離開而變得出色。 新游牧者透過踏上邂逅他人和發現自我的旅程， 在每一次旅程中逐步轉變生命和世界。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 1800,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 9,
        title: '我的戀人',
        author: '上田岳弘',
        cover: 'https://cdn.readmoo.com/cover/in/ndmgpom_210x315.jpg',
        description: '從舊石器時代至今，超越十萬年的愛情物語 當神祕預言成真，諸神再次降臨人間，是災難，還是希望  \n        ▍結合日本上古神話、全人類歷史，令人耳目一新的魔幻寫實小說　▍',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 1900,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 10,
        title: '太陽．行星',
        author: '上田岳弘',
        cover: 'https://cdn.readmoo.com/cover/mq/pmzgtdo_210x315.jpg',
        description: '末世科幻／新人類科幻神級作品 狂人與先知掌控未來 人類與地球無可逃脫的最終命運',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 2000,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 11,
        title: '克魯曼戰殭屍：洞悉殭屍經濟的本質，揪出政經失能的本源',
        author: '保羅．克魯曼',
        cover: 'https://cdn.readmoo.com/cover/pr/kqfougk_210x315.jpg',
        description: '當一切都被政治化，真相的重量便輕如鴻毛。 當恫嚇與難懂的數字，成為政客推行政策的手段， 我們要如何看穿各說各話的煙霧彈？\n        從社會安全、減稅……到貿易戰爭， 深度解讀各項政策的背後真相。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 2100,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 12,
        title: '為什麼大家都來問我？只因受苦的人想得更透徹',
        author: '幡野廣志',
        cover: 'https://cdn.readmoo.com/cover/fi/hi9dm9n_210x315.jpg',
        description: '「能聽到這些回答，真是太好了。」 他，不是心理學者，也不是輔導專家， 卻有無數人期盼聽到他的建議！ 一位罹癌攝影師的話語，救贖了千萬人的心靈\n        36則困擾無數人的提問與解答， 也能在你迷惘的時刻，點燃火光',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.2,
        listenCount: 2200,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 13,
        title: '從心覺醒：開啟心的聖域，邁向揚升',
        author: '德隆瓦洛．默基瑟德',
        cover: 'https://cdn.readmoo.com/cover/qk/kihrvqr_210x315.jpg',
        description: '★進入心的神聖空間，唯一專屬靜心法 ★洪啟嵩（國際知名禪學大師）、Lucia（歐林光愛關懷協會理事長）、田安琪（光的課程教師）、彭芷雯（作家）──專序\n        李嗣涔（台大校長）、李欣頻（作家）、徐仁修（荒野保護協會創會理事長）──經典推薦 ★電子書收錄「心的神聖空間」靜心音檔連結',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.4,
        listenCount: 2300,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 14,
        title: '奇蹟公式：我三星期從半身不遂中站起，一年抗癌成功，從破產到財富自由的關鍵',
        author: '哈爾．埃爾羅德',
        cover: 'https://cdn.readmoo.com/cover/bb/7a49khh_210x315.jpg',
        description: '★美國亞馬遜五星好評，SmartM大大學院創辦人許景泰、防彈飲食創始人亞斯普雷、子彈筆記創始人卡洛、《五秒法則》作者羅賓斯等各界名人大力推薦！\n        ★「想要」與「得到」之間，只差一道公式的距離。是時候讓「奇蹟」變成你的日常了！ ★作者以親身經歷告訴讀者，奇蹟公式真的有效，而且是人人都有效！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.4,
        listenCount: 2400,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 15,
        title: '聖經視覺解析百科：一目了然看懂神的話',
        author: '提姆．夏利',
        cover: 'https://cdn.readmoo.com/cover/ni/iqqfzfc_210x315.jpg',
        description: '★ 結合永恆經典與視覺資訊！年度最好「看」的《聖經》百科！ ★ 延請中華福音神學院專任宣教助理教授及宣教中心主任──邱顯正博士審訂。 ★\n        無論是對《聖經》好奇的人、慕道者或基督徒，本書都是你最好的幫手！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.6,
        listenCount: 2500,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 16,
        title: '穩：學會接住自己，為不安人生解套的4堂課',
        author: '加藤諦三',
        cover: 'https://cdn.readmoo.com/cover/ed/kc8inlh_210x315.jpg',
        description: '★哈佛心理導師、日本國民心理學家暢銷30年經典！ ★深度認知自我之作，四個方向帶你找回內在的穩定，讓你情緒穩、生活穩、成長穩、工作穩！\n        ★從「正視自己」開始，了解支配個人思考與行為的癥結是什麼，唯有把「自己」放回生命的中心，才能真正拋下恐懼、獲得自由！\n        ★陳志恆（諮商心理師／暢銷作家）、王意中...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.3,
        listenCount: 2600,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 17,
        title: '一個明亮的人，如何能理解黑暗？：《罪行》德國律師的思索',
        author: '費迪南．馮．席拉赫',
        cover: 'https://cdn.readmoo.com/cover/8g/66f4lc7_210x315.jpg',
        description: '德國知名律師作家費迪南．馮．席拉赫 最真實、最深摯的告白 48則揉合寂寞與幸福、悲傷與救贖的書寫， 冷硬的文字，敘述的是現實的荒謬與命運的無常，\n        寫的是人性的殘酷與美好， 寫的是我們，與這個活生生的世界。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.1,
        listenCount: 2700,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 18,
        title: '看人的本事：說話前先讀懂對方想聽什麼，建立好關係',
        author: '盧文建',
        cover: 'https://cdn.readmoo.com/cover/76/fddbh91_210x315.jpg',
        description: '★令張國立、李昌鈺、哈林、撒貝寧讚歎的王牌識人術！ ★《王牌對王牌》特邀「讀心神探」、《快樂大本營》特邀心理分析師，教你秒速掌握識人關鍵！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 2800,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 19,
        title: '我所知道關於愛的一切',
        author: '朵莉．艾德頓',
        cover: 'https://cdn.readmoo.com/cover/im/qembpdg_210x315.jpg',
        description: '愛，才沒那麼簡單，但不愛，難道就比較容易？ 原著改編成2022年英國BBC最新同名熱播影集 英國知名專欄作家、製片人、播客網紅 朵莉 暢銷自傳',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.4,
        listenCount: 2900,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 20,
        title: '星星女孩',
        author: '傑瑞．史賓納利',
        cover: 'https://cdn.readmoo.com/cover/hc/eiinok8_210x315.jpg',
        description: '她的與眾不同，讓每個人都深深著迷。 她的格格不入，讓每個人避之唯恐不及。 星星女孩捲起天翻地覆的風暴，讓人重新思索，\n        在「平凡」與「不凡」之間，該如何抉擇？ ★ 紐伯瑞文學獎金牌獎作家傑瑞．史賓納利經典之作 ★《紐約時報》排行榜暢銷書 ★《家長好書》金牌獎得主\n        ★《出版家週刊》年度...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.6,
        listenCount: 3000,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 21,
        title: '我們源自何方？：古代DNA革命解構人類的起源與未來',
        author: '大衛．賴克',
        cover: 'https://cdn.readmoo.com/cover/nn/ikkhzmh_210x315.jpg',
        description: '一本關於古代 DNA 如何深刻改變我們對人類歷史重新理解的專書 哈佛大學醫學系教授、古代DNA研究先驅者 大衛．賴克重量級作品',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.6,
        listenCount: 3100,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 22,
        title: '十座建築看人類文明史：從權力與道德，到商業與性愛，十座建築十個面向解構人類文明的發展',
        author: '湯姆．威金森',
        cover: 'https://cdn.readmoo.com/cover/64/2361g72_210x315.jpg',
        description: '人類形塑建築，建築也造就了我們 建築的一磚一瓦，堆疊而成文明的發展史 十座建築，十種觀點 第一本從建築視角跨越大眾文化、社會學、哲學、歷史領域，\n        論述人類發展歷程的權力、道德、記憶、商業、殖民、娛樂、性愛……',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 5.0,
        listenCount: 3200,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 23,
        title: '用十張地圖看懂全球政經局勢',
        author: '提姆‧馬歇爾',
        cover: 'https://cdn.readmoo.com/cover/h8/jfchomh_210x315.jpg',
        description: '十張地圖，一次瞭解！ 看懂全球地理位置所形塑而成的全球經濟與政治局勢！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.4,
        listenCount: 3300,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 24,
        title: '諦聽與愛語：一行禪師談正念溝通的藝術',
        author: '一行禪師',
        cover: 'https://cdn.readmoo.com/cover/oe/diretmm_210x315.jpg',
        description: '你明明想安慰對方，卻落得生氣吵架的下場？ 你心裡懷著愛，嘴裡卻帶著刀？ 你覺得別人不聽也不懂，你痛苦地假裝一切都沒問題？\n        請停下來，回到自己，慈悲聆聽，滋養話語； 正念溝通有助你治癒過去，享受當下，為美好未來奠基。 最善巧的話語，最有力量的溝通\n        一行禪師寫給每一個覺得自己說不好或不會...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 5.0,
        listenCount: 3400,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 25,
        title: '一流、二流、三流的說話術：破冰、交流、拓展人際，跟誰都聊得開的45個訣竅',
        author: '桐生稔',
        cover: 'https://cdn.readmoo.com/cover/ha/8hd9ofg_210x315.jpg',
        description: '日本亞馬遜「商業交涉‧心理學」、「商業禮儀」雙榜No.1 求職、改善說話技巧、拓展人際、改善社交關係 必看!!\n        透過比較「一流、二流、三流」人打招呼的方式、創造話題的方式、做出反應的方式……幫助你找到適當話題，與談話對象聊得開心，對你留下好印象！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.6,
        listenCount: 3500,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 26,
        title: '豐蔬食：超過200道你不知道的人氣蔬食料理推薦！',
        author: '田定豐',
        cover: 'https://cdn.readmoo.com/cover/mz/gpzdtpp_210x315.jpg',
        description: '蔬食也可以吃到米其林星星推薦？\n        本書推薦了中式、西式、異國料理、CAFE、甜點、冰品……等各式各樣的蔬食，從街頭小吃到私廚料理，收錄超過70家美食店，超過200道讓人垂涎欲滴的人氣蔬食料理，充分滿足我們「哪裡可以吃到好吃的蔬食？」的疑問，跟著豐哥一起，你會發現這些「隱藏版美食」，其實就在我們身...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 3600,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 27,
        title: '不怕輸，就怕放棄：仙女老師教你說自己的故事，走出你要的結局',
        author: '余懷瑾（仙女老師）',
        cover: 'https://cdn.readmoo.com/cover/d7/df78jeb_210x315.jpg',
        description: 'TED×Taipei講者、榮耀無數的SUPER仙女老師，真摯分享她的人生故事。 輸贏是常事，人生挫折所在難免； 放棄就輸了，贏的機會不再。\n        仙女老師用親身經歷，告訴身陷職場挫折或家庭泥沼中的你， 做別人的事，成就自己的工夫！\n        仙女老師原本並不是老師。五專畢業之後，她當過廣告AE、程式設...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.4,
        listenCount: 3700,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 28,
        title: '全球綠色經濟新政策：化石燃料文明將在2028崩盤，以及能拯救地球生命的經濟方案',
        author: '傑瑞米．里夫金',
        cover: 'https://cdn.readmoo.com/cover/cl/ha7lj68_210x315.jpg',
        description: '暢銷書《物聯網革命》作者，再度洞見未來！ 面對氣候變遷，這是拯救未來最重要的經濟計畫！ ─能源轉型Ｘ物聯網，即將帶來經濟巨變─\n        未來的世界，我們的生活將與綠能和物聯網密不可分！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 3800,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 29,
        title: '正念陰瑜伽：自我療癒與轉化之道',
        author: 'Michelle Chu',
        cover: 'https://cdn.readmoo.com/cover/5f/5f4cgb8_210x315.jpg',
        description: '★融入印度瑜伽、中醫經絡、佛家正念與內觀智慧，打開靈性療癒的大門。 ★首位完成內觀瑜伽創辦人莎拉．鮑爾斯（Sarah\n        Powers）陰瑜伽全系列師訓的華人作者。 ★30個體式 + 五臟經絡解說 + 正念心法練習，華人界第一本陰瑜伽專書。 正念陰瑜伽，\n        用陰柔臣服的練習方式，活絡經脈、培養正念， 在...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 3900,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 30,
        title: '喜劇大師的13堂幽默課：好萊塢首席脫口秀編劇的教戰手冊',
        author: '葛瑞格．迪恩',
        cover: 'https://cdn.readmoo.com/cover/io/lmeqpnc_210x315.jpg',
        description: '美國暢銷20年 脫口秀表演者、主持人、講師 以及想要一開口就逗人笑的你必讀 上台時，想成為HOLD住全場的哏王嗎？ 在茶水間，你的笑話讓空氣凝結了嗎？\n        聚會場合中，怎麼跟任何人都能談笑風生？ 培養幽默感成為你說話、職場、社交的超能力！',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.3,
        listenCount: 4000,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 31,
        title: '愛因斯坦冰箱：從科學家故事看物理概念如何環環相扣，形塑現代世界',
        author: '高崇文',
        cover: 'https://cdn.readmoo.com/cover/je/gcffrgl_210x315.jpg',
        description: '愛因斯坦冰箱是什麼？它如何應用在核子增殖反應爐的製冷系統？ 1755年的里斯本大地震，如何震出一頁新歷史？和牛頓力學的世界體系又有什麼關聯？\n        安培定律引發了一波波的新發現，影響到二十年後的無線通訊時代，也開啟了電力的時代。',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 4100,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 32,
        title: '慢性腎臟病科學實證最強復健運動全書：專家群示範指導，逆轉腎病變，改善肌少症、提升心肺代謝功能',
        author: '花蓮慈濟醫學中心 腎臟科＆復健醫學部＆營養科醫療團隊',
        cover: 'https://cdn.readmoo.com/cover/ql/egjrvro_210x315.jpg',
        description: '國內第一本經醫療評鑑最專業的腎臟病照護團隊 親授指導慢性腎臟病友的復健運動訓練大公開 護腎又強心，運動可降低共病症發生率\n        做對運動，讓您贏得「腎」利人生',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.0,
        listenCount: 4200,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 33,
        title: '手縫皮革簡約包設計',
        author: '印地安皮革創意工場',
        cover: 'https://cdn.readmoo.com/cover/64/2400g9a_210x315.jpg',
        description: '天然、耐用的植鞣皮革，經打磨拋光會呈現自然亮澤， 隨著時間會展現令人著迷的質感，越使用越漂亮。\n        本書由印地安的皮革製作職人，依著不同皮革的特色與質地， 設計出十款經典、超高人氣的皮革包款， 藉由每個包款詳盡的拆解、分析步驟，\n        深入呈現各種手工皮件的技巧， 只要選塊皮料、拿起裁刀和針線， 就能一針...',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 5.0,
        listenCount: 4300,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 34,
        title: '書怎麼做出來的？：故事怎麼寫、插圖畫什麼？完整公開一本書的誕生過程！',
        author: '愛琳．克利斯提洛',
        cover: 'https://cdn.readmoo.com/cover/78/2f52hg8_210x315.jpg',
        description: '培養終身學習素養、愛好書本起步走！ 閱讀，就是學習的開始， 激發出創作欲及閱讀欲的繪本',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 4.3,
        listenCount: 4400,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 35,
        title: '妹妹與我（童書史上最受歡迎的圖像小說系列 「蕾娜的成長記事」#2）',
        author: '蕾娜・塔吉邁爾',
        cover: 'https://cdn.readmoo.com/cover/8d/g58hl34_210x315.jpg',
        description: '那些和家人爭吵與歡笑的日子， 學習成長、同理、分享的開始， 絕對不能錯過的精采故事！ 細數成長心情\n        蕾娜‧塔吉邁爾繼《牙套微笑日記》之後的又一力作， 榮獲「漫畫界的奧斯卡」艾斯納獎最佳作家 美國樂學集團圖像小說出版專業品牌Graphix重量級作家\n        1,600,000本系列暢銷佳作',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 5.0,
        listenCount: 4500,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
      {
        id: 36,
        title: '牙套微笑日記（「蕾娜的成長記事」#1‧童書史上最受歡迎的圖像小說）',
        author: '蕾娜・塔吉邁爾',
        cover: 'https://cdn.readmoo.com/cover/jb/qpkqrgg_210x315.jpg',
        description: '陪伴成長風暴的暖心佳作 圖像小說界的冠軍作品 美國樂學集團圖像小說專業出版品牌Graphix重量級作家 1,600,000本系列暢銷佳作\n        討論自我認同、同儕互動，以及痛痛的牙齒問題…… 榮獲「漫畫界的奧斯卡」艾斯納獎 《紐約時報》讚譽：重要程度宛如茱蒂‧布倫《神啊，你在嗎？》',
        audioUrl: '/src/audio/googleStitchUI_demo.wav',
        duration: 3600,
        category: '未分類',
        tags: ['未分類'],
        rating: 5.0,
        listenCount: 4600,
        language: '中文',
        totalTimeSecs: 3600,
        chapters: [{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 }, { id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 }, { id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }],
      },
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
