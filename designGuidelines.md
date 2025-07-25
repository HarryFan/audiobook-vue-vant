以下是根據你所提供的設計稿、以 **小型行動付款連結工具為主題**、參考「微信小程序商城」的 UI 審美，並符合 `Vue3 + Vant4` 元件規範所撰寫的 **系統化 UI/UX
設計說明文件**（Design Guideline）。這份文件以前端工程師與 AI 可讀性為目標，清楚劃分模組、精準描述元件細節與交互狀態。

---

## 🎯 頁面功能定位

此頁面為「**播放詳情頁**」，主功能為：

- 呈現當前播放書籍的資訊與播放控制
- 提供封面圖、標題、副標題、播放進度、控制按鈕等
- 全面以簡潔、中心聚焦、可單手操作為設計導向

---

## 🧱 整體結構 Layout Structure（上下垂直流）

```plaintext
📱 整體結構：垂直排列，自上而下

1. 頁面 Header（返回 + 標題）
2. 書籍資訊區（封面圖 + 書名 + 作者）
3. 播放進度條（滑桿 + 時間顯示）
4. 播放控制列（播放/暫停、前後跳轉）
5. 底部導航欄（Vant Tabbar）
```

---

## 🔍 模組拆解與 UI 規格說明

### 1. 🔹 頁面 Header

| 項目     | 描述                                         |
| -------- | -------------------------------------------- |
| 元件建議 | `<van-nav-bar>`                              |
| 左側按鈕 | icon: `arrow-left`，大小：20px，色碼：`#333` |
| 標題文字 | "正在收聽"、字體大小：16px、字重 `500`、置中 |

---

### 2. 📚 書籍資訊區塊

```plaintext
元件排列方式：垂直置中
```

| 元件     | 屬性說明                                                |
| -------- | ------------------------------------------------------- |
| 書籍封面 | `<van-image>`，大小：150x150px，圓角 `8px`，置中        |
| 書名文字 | 字體大小：18px，字重：600，顏色：`#000`，上下間距 `8px` |
| 作者名稱 | 字體大小：14px，顏色：`#888`                            |

---

### 3. ⏱️ 播放進度條區

| 元件         | 說明                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------- |
| 播放滑桿     | `<van-slider>`，主色：`#007BFF`，高度：2px，圓頭，滑塊直徑：12px                              |
| 左右時間文字 | 使用 `<div>` 包裹，靠左（已播）/ 靠右（總長度），字體大小：12px，顏色：`#888`，上下間距 `4px` |

---

### 4. ▶️ 播放控制列（核心交互區）

```plaintext
排列方式：橫向排列，置中對齊，元件間距 32px
```

| 控制項      | 元件建議                             | 大小與樣式                                       |
| ----------- | ------------------------------------ | ------------------------------------------------ |
| 快退 15 秒  | `<van-icon name="replay"`>           | 尺寸：28px，色碼：#333                           |
| 播放 / 暫停 | `<van-button icon="play" / "pause">` | 尺寸：60px 圓形，主色背景 `#007BFF`，Icon 為白色 |
| 快進 15 秒  | `<van-icon name="forward"`>          | 尺寸：28px，色碼：#333                           |

補充：

- 播放按鈕採用 **主要操作按鈕**樣式，設有藍底白字、圓形強調
- 前後跳為次要操作，使用 icon 呈現即可

---

### 5. 🚩 底部導航欄（Tabbar）

| 元件           | 說明                                       |
| -------------- | ------------------------------------------ |
| `<van-tabbar>` | 5 項導航（首頁、發現、目錄、我的、播放中） |
| 選中狀態       | 主色 `#007BFF`，icon 採填色                |
| 非選中         | icon 灰色 `#888888`，文字大小 10px         |

---

## 🌀 UI 設計建議與美化方向（不更動布局）

1. **配色統一**：

   - 使用 `#007BFF` 為主色，覆蓋所有 CTA（播放、購買、確定）
   - 灰階層次建議使用：`#333`（主文）、`#666`（說明）、`#999`（輔助）

2. **圓角與留白**：

   - 所有卡片、按鈕統一使用 `8px` 圓角
   - 每區塊上下留白建議為 `16px`，避免擁擠感

3. **操作焦點清楚**：

   - 播放按鈕使用強調色＋動畫放大（hover/active 狀態）
   - Tabbar 選中項目加上底部 indicator bar（2px 高）

4. **兼容性**：

   - 全部元件使用 `Vant4` 提供的 `<van-image>`, `<van-slider>`, `<van-button>`, `<van-nav-bar>`，可提升開發一致性與可維護性

---

## 💬 交互補充說明（交互提示）

- 播放控制中，點擊播放鍵時切換 Icon 並變更狀態為「暫停」
- 播放進度可拖曳調整進度，釋放後觸發更新
- 返回鍵支援 `<router.back()>` 行為跳轉
- Tabbar 操作應即時變色反饋，切換至其他頁面

---

## 🚀 技術規範與最佳實踐

### 1. 組件最佳實踐

```javascript
// 組件命名規範
- 使用 PascalCase：AudioPlayer.vue
- 避免使用單字命名
- 含義清晰，避免縮寫
```

```javascript
// Props 規範
- 使用 camelCase：bookTitle, authorName
- 必填項使用 required
- 提供默認值
```

### 2. 性能優化

1. **懶加載**：
   - 使用 Vue 的懶加載：`const AudioPlayer = defineAsyncComponent(() => import('./components/AudioPlayer.vue'))`
   - 按需加載 Vant 組件：`import { Button, Slider } from 'vant';`

2. **資源優化**：
   - 封面圖使用 WebP 格式
   - 播放器使用 HTML5 Audio
   - 適當使用 CDN

### 3. 可訪問性（Accessibility）

1. **語義化 HTML**：
   - 使用 `role="application"` 為播放器區域
   - 為控制按鈕添加 `aria-label`
   - 確保所有操作可通過鍵盤完成

2. **視覺障礙者支援**：
   - 提供文字播報功能
   - 為視覺元素添加替代文字
   - 確保足夠的對比度

### 4. 錯誤處理

1. **狀態管理**：
   - 無網際網路時顯示提示
   - 播放器錯誤狀態處理
   - 資源加載失敗處理

2. **用戶反饋**：
   - 使用 Vant 的 Toast 組件
   - 確保錯誤信息清晰
   - 提供解決方案

## 📝 版本控制

### 1. 分支策略

```plaintext
- feature/xxx：功能開發
- bugfix/xxx：錯誤修復
- hotfix/xxx：緊急修復
```

### 2. 提交信息

```plaintext
格式：[類型]：簡短描述

類型：
- feat：新功能
- fix：錯誤修復
- docs：文檔更新
- style：代碼格式
- refactor：代碼重構
- test：測試相關
```

## 📋 更新日誌

- 2025-07-15：初始版本發佈
- 2025-07-15：添加技術規範與最佳實踐
- 2025-07-15：完善可訪問性要求

如需我幫你將這份規格轉成對應的 `Vue + Vant` 組件語法範本，或進一步提供多頁 UI 的對應規格與交互統一設計，隨時告訴我，我可以繼續協助 👍
