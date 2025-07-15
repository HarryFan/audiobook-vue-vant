# LibriVox API 集成說明

## 概述

我已經將您的有聲書應用從假數據遷移到真實的 LibriVox API。LibriVox 是一個提供免費公共領域有聲書的非營利項目，所有內容都是免費的，不需要 API 密鑰。

## 主要變更

### 1. 新增的 API 接口

- **LibriVox Books API**: `https://librivox.org/api/feed/audiobooks`
- **LibriVox Tracks API**: `https://librivox.org/api/feed/audiotracks`

### 2. 更新的數據結構

在 `Book` 接口中新增了以下字段：
- `language?: string` - 書籍語言
- `totalTimeSecs?: number` - 總時長（秒）
- `urlLibrivox?: string` - LibriVox 頁面 URL
- `urlRss?: string` - RSS 訂閱 URL

### 3. 方法變更

所有 BookService 的方法現在都是異步的：

```typescript
// 之前
getAllBooks(): Book[]
getBookById(id: number): Book | undefined
searchBooks(keyword: string): Book[]
getChapters(bookId: number): Chapter[]

// 現在
getAllBooks(): Promise<Book[]>
getBookById(id: number): Promise<Book | undefined>
searchBooks(keyword: string): Promise<Book[]>
getChapters(bookId: number): Promise<Chapter[]>
```

## 使用方法

### 基本用法

```typescript
const bookService = BookService.getInstance();

// 獲取所有書籍
const books = await bookService.getAllBooks();

// 搜索書籍
const searchResults = await bookService.searchBooks('Pride and Prejudice');

// 獲取特定書籍
const book = await bookService.getBookById(1);

// 獲取章節
const chapters = await bookService.getChapters(1);
```

### 在 Vue 組件中使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BookService, type Book } from '@/services/bookService'

const books = ref<Book[]>([])
const loading = ref(false)

const loadBooks = async () => {
  loading.value = true
  try {
    const bookService = BookService.getInstance()
    books.value = await bookService.getAllBooks()
  } catch (error) {
    console.error('載入書籍失敗:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBooks()
})
</script>
```

## API 功能說明

### 1. 書籍搜索
- 支持按標題搜索
- 支持按作者搜索
- 自動去重複結果

### 2. 分類瀏覽
- 支持按類型獲取書籍
- LibriVox 提供多種類型（Fiction, Non-fiction, Poetry 等）

### 3. 章節播放
- 每本書都有詳細的章節信息
- 提供直接的音頻播放 URL
- 所有內容都是免費的（無需付費解鎖）

### 4. 封面圖片
- 自動從 Internet Archive 獲取封面
- 提供備用占位圖片

## 測試

我創建了一個測試頁面 `test-librivox-api.html`，您可以：

1. 在瀏覽器中打開該文件
2. 點擊不同的按鈕測試各種 API 功能
3. 查看瀏覽器控制台了解 API 響應詳情

## 注意事項

### 1. CORS 問題
LibriVox API 支持跨域請求，但如果遇到 CORS 問題，可能需要：
- 使用代理服務器
- 在開發環境中配置 CORS

### 2. 數據質量
- LibriVox 的數據質量可能不如商業 API 一致
- 某些書籍可能缺少封面或描述
- 評分和收聽次數是模擬生成的（因為 LibriVox 不提供這些數據）

### 3. 性能考慮
- API 響應時間可能較慢
- 建議實現適當的載入狀態和錯誤處理
- 考慮實現本地緩存機制

### 4. 語言支持
LibriVox 主要提供英語內容，但也有其他語言的書籍。您可以通過 `language` 字段過濾特定語言的內容。

## 下一步建議

1. **更新 UI 組件**：確保所有使用 BookService 的組件都正確處理異步調用
2. **添加錯誤處理**：實現適當的錯誤處理和用戶反饋
3. **實現緩存**：考慮添加本地緩存以提高性能
4. **添加載入狀態**：為所有 API 調用添加載入指示器
5. **測試集成**：在實際應用中測試所有功能

## 支持

如果您遇到任何問題或需要進一步的自定義，請隨時聯繫我。LibriVox API 是完全免費的，這為您的應用提供了一個可靠的數據源。