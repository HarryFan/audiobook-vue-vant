# 有聲書 API 參考文檔

## 1. LibriVox API
- **說明**: LibriVox 是一個提供免費有聲書的平台，擁有豐富的公共領域有聲書資源
- **API 文檔**: https://librivox.org/api/
- **主要功能**:
  - 書籍搜索
  - 获取書籍詳情
  - 获取音訊流
  - 获取章節列表
- **特點**:
  - 免費使用
  - 開源
  - 支持多種語言
  - 提供 RSS feed
  - 包含書籍元數據
- **API 範例**:
  ```typescript
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
    authors: Array<{
      id: string
      first_name: string
      last_name: string
      dob: string
      dod: string
    }>
    genres: Array<{
      id: string
      name: string
    }>
    sections?: Array<{
      id: string
      section_number: string
      title: string
      listen_url: string
      language: string
      playtime: string
    }>
  }
  ```

## 2. Open Library API
- **說明**: Open Library 是一個開放的數位圖書館，提供書籍元數據和部分有聲書資源
- **API 文檔**: https://openlibrary.org/dev/docs/api/books
- **主要功能**:
  - 書籍搜索
  - 获取書籍詳情
  - 获取作者信息
  - 获取封面圖
- **特點**:
  - 免費使用
  - 開源
  - 支持多種查詢方式（ISBN、標題、作者等）
  - 提供 API key

## 3. Internet Archive API
- **說明**: Internet Archive 是一個數位圖書館，包含大量有聲書資源
- **API 文檔**: https://archive.org/services/docs/api/internetarchive/
- **主要功能**:
  - 檔案搜索
  - 获取檔案詳情
  - 获取檔案下載連結
  - 获取元數據
- **特點**:
  - 免費使用
  - 開源
  - 支持多種檔案格式
  - 提供批量下載功能

## 4. Project Gutenberg API
- **說明**: Project Gutenberg 是一個提供免費電子書的平台，包含部分有聲書資源
- **API 文檔**: https://gutendex.com/
- **主要功能**:
  - 書籍搜索
  - 获取書籍詳情
  - 获取下載連結
- **特點**:
  - 免費使用
  - 開源
  - 支持多種格式
  - 提供 API key

## 5. 使用建議
1. **API 選擇**
   - LibriVox API 是目前最適合有聲書應用的選擇，因為它專門提供有聲書資源
   - 如果需要更多書籍元數據，可以考慮結合 Open Library API 使用
   - Internet Archive API 可以作為備用選擇，特別是需要大量歷史資料時

2. **數據處理**
   - 建議使用本地緩存機制，減少 API 請求
   - 處理好錯誤情況和網絡異常
   - 考慮數據預載入和離線模式

3. **性能優化**
   - 使用 CDN 加速音訊流
   - 實現懶加載機制
   - 考慮使用 PWA 技術提高離線體驗

4. **法律注意事項**
   - 確保遵守各平台的使用條款
   - 注意版權問題
   - 處理好用戶隱私保護

## 6. 範例代碼
```typescript
// LibriVox API 請求範例
async function getBooksBySearch(query: string) {
  const response = await fetch(`https://librivox.org/api/feed/audiobooks/?format=json&search=${encodeURIComponent(query)}`);
  const data = await response.json() as LibriVoxResponse;
  return data.books;
}

// 获取單本書籍詳情
async function getBookDetails(bookId: string) {
  const response = await fetch(`https://librivox.org/api/feed/audiobook/?format=json&id=${bookId}`);
  const data = await response.json() as LibriVoxResponse;
  return data.books[0];
}
```

## 7. 常見問題
1. **API 限製**
   - 大多數 API 都有請求頻率限制
   - 需要合理設計緩存機制
   - 考慮實現重試機制

2. **數據格式**
   - 不同 API 返回的數據格式可能不同
   - 需要統一數據模型
   - 考慮使用接口類型定義

3. **錯誤處理**
   - 處理 API 返回的錯誤
   - 處理網絡異常
   - 提供用戶友好的錯誤提示

## 8. 參考資源
- LibriVox API 文檔: https://librivox.org/api/
- Open Library API 文檔: https://openlibrary.org/dev/docs/api/books
- Internet Archive API 文檔: https://archive.org/services/docs/api/internetarchive/
- Project Gutenberg API: https://gutendex.com/
- 音訊格式參考: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs
- 音訊流處理: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
