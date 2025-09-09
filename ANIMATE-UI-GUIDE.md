# 🎨 Animate UI 實作指南

這是一份完整的 Animate UI 風格動畫實作指南，基於我們在 Vue 3 + Vant 有聲書應用中的實際實作經驗。

## 📋 目錄

- [🚀 快速開始](#快速開始)
- [🎭 動畫類別說明](#動畫類別說明)
- [💡 實作範例](#實作範例)
- [⚡ 最佳實踐](#最佳實踐)
- [🛠️ 進階使用技巧](#進階使用技巧)
- [🎪 動畫效果展示](#動畫效果展示)

---

## 🚀 快速開始

### 1. 建立動畫樣式檔案

建立 `src/styles/animations.scss` 檔案：

```scss
// Animation Utilities inspired by Animate UI
:root {
  --animation-duration: 0.6s;
  --animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --stagger-delay: 0.1s;
}
```

### 2. 在 main.ts 中引入樣式

```typescript
import './styles/animations.scss'
```

### 3. 開始使用動畫類別

```vue
<template>
  <div class="animate-fade-in-up">
    Hello, Animate UI!
  </div>
</template>
```

---

## 🎭 動畫類別說明

### 基礎進入動畫

| 類別名稱 | 效果描述 | 使用場景 |
|---------|---------|---------|
| `animate-fade-in` | 淡入效果 | 內容載入、模態框 |
| `animate-fade-in-up` | 從下往上淡入 | 卡片、列表項目 |
| `animate-fade-in-down` | 從上往下淡入 | 通知、下拉面板 |
| `animate-slide-in-right` | 從右側滑入 | 側邊欄、導航 |
| `animate-slide-in-left` | 從左側滑入 | 返回動畫 |
| `animate-scale-in` | 縮放進入 | 重點內容、圖片 |

### 互動效果

| 類別名稱 | 效果描述 | 使用場景 |
|---------|---------|---------|
| `hover-lift` | 懸停上升 | 卡片、按鈕 |
| `hover-scale` | 懸停縮放 | 圖片、圖標 |
| `hover-glow` | 懸停發光 | CTA 按鈕 |
| `animate-pulse` | 脈衝效果 | 載入狀態、提示 |

### 特殊效果

| 類別名稱 | 效果描述 | 使用場景 |
|---------|---------|---------|
| `stagger-container` | 子元素錯開動畫 | 列表、網格 |
| `animated-button` | 按鈕光澤效果 | 主要行動按鈕 |
| `shimmer` | 閃爍載入效果 | 骨架屏 |
| `book-card` | 書籍卡片專用 | 圖書展示 |

### 延遲控制

| 類別名稱 | 延遲時間 |
|---------|---------|
| `delay-100` | 0.1s |
| `delay-200` | 0.2s |
| `delay-300` | 0.3s |
| `delay-400` | 0.4s |
| `delay-500` | 0.5s |

---

## 💡 實作範例

### 📚 書籍網格動畫

```vue
<template>
  <!-- 錯開動畫的書籍網格 -->
  <div class="book-list stagger-container">
    <div 
      v-for="book in books" 
      :key="book.id" 
      class="book-item book-card animate-fade-in-up"
      @click="openBook(book.id)"
    >
      <img :src="book.cover" alt="book cover" />
      <h3>{{ book.title }}</h3>
    </div>
  </div>
</template>

<style>
.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
</style>
```

### 🔍 搜尋面板動畫

```vue
<template>
  <!-- 搜尋面板滑入動畫 -->
  <transition name="search-panel">
    <div v-if="showSearchPanel" class="search-panel animate-slide-in-down">
      <div class="search-content">
        <!-- 搜尋內容 -->
      </div>
    </div>
  </transition>
</template>
```

### 📖 書籍詳情頁動畫

```vue
<template>
  <div class="book-detail">
    <!-- 封面縮放進入 -->
    <div class="book-cover animate-scale-in">
      <img :src="book.cover" alt="cover" />
    </div>
    
    <!-- 內容錯開進入 -->
    <h1 class="book-title animate-fade-in-up delay-100">{{ book.title }}</h1>
    <p class="book-author animate-fade-in-up delay-200">{{ book.author }}</p>
    <div class="book-rating animate-fade-in-up delay-300">⭐⭐⭐⭐⭐</div>
    
    <!-- 特效按鈕 -->
    <button class="play-btn animated-button animate-fade-in-up delay-400">
      立即播放
    </button>
  </div>
</template>
```

### 🔄 頁面轉場動畫

```vue
<!-- App.vue -->
<template>
  <div class="app-container">
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" class="page-content" />
      </transition>
    </router-view>
  </div>
</template>
```

### ⏳ 載入動畫組件

```vue
<template>
  <div class="loading-container animate-fade-in">
    <div class="spinner animate-pulse">載入中...</div>
  </div>
</template>
```

---

## ⚡ 最佳實踐

### 🎯 動畫選擇原則

1. **進入動畫**: 使用 `fade-in-up` 給人向上的積極感
2. **離開動畫**: 使用 `fade-out-down` 或滑出效果
3. **互動反饋**: 使用 `hover-lift` 或 `hover-scale`
4. **載入狀態**: 使用 `pulse` 或 `shimmer`

### 📱 行動裝置最佳化

```scss
// 減少行動裝置上的動畫
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### ⚡ 效能考量

```scss
// 使用 transform 和 opacity 以獲得最佳效能
.optimized-animation {
  will-change: transform, opacity;
  transform: translateZ(0); // 啟用硬體加速
}
```

### 🎨 自訂動畫變數

```scss
:root {
  --fast-animation: 0.2s;
  --normal-animation: 0.4s;
  --slow-animation: 0.8s;
  --bounce-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 🛠️ 進階使用技巧

### 🔗 JavaScript 整合

```typescript
// 使用 Vue 3 Composition API 控制動畫
import { ref, nextTick } from 'vue'

export default {
  setup() {
    const showContent = ref(false)
    
    const animateIn = async () => {
      showContent.value = true
      await nextTick()
      // 動畫完成後的邏輯
    }
    
    return { showContent, animateIn }
  }
}
```

### 🎪 自訂動畫組件

```vue
<!-- AnimatedList.vue -->
<template>
  <div class="animated-list">
    <transition-group name="list" tag="div">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="list-item animate-fade-in-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <slot :item="item" :index="index" />
      </div>
    </transition-group>
  </div>
</template>
```

### 📊 動畫監聽

```typescript
// 監聽動畫完成事件
const element = document.querySelector('.animate-fade-in-up')
element?.addEventListener('animationend', () => {
  console.log('動畫完成！')
})
```

---

## 🎪 動畫效果展示

### 📱 手機 APP 常用動畫組合

```vue
<template>
  <!-- 首頁書籍列表 -->
  <div class="home-books stagger-container">
    <div 
      v-for="book in books" 
      :key="book.id"
      class="book-card animate-fade-in-up hover-lift"
    >
      <!-- 書籍內容 -->
    </div>
  </div>
  
  <!-- 搜尋結果 -->
  <div class="search-results stagger-container">
    <div 
      v-for="result in searchResults"
      :key="result.id"
      class="result-item animate-fade-in-up hover-glow"
    >
      <!-- 搜尋結果內容 -->
    </div>
  </div>
  
  <!-- 載入狀態 -->
  <div v-if="loading" class="loading animate-fade-in">
    <div class="spinner animate-pulse">載入中...</div>
  </div>
</template>
```

### 🎨 主題切換動畫

```scss
.theme-toggle {
  transition: all 0.3s var(--animation-timing);
  
  &.dark-mode {
    animation: fadeIn 0.5s ease-in-out;
  }
}
```

### 🔔 通知動畫

```vue
<template>
  <transition name="toast">
    <div v-if="showToast" class="toast animate-slide-in-down">
      {{ message }}
    </div>
  </transition>
</template>
```

---

## 🎯 總結

這套 Animate UI 風格的動畫系統提供了：

✅ **豐富的動畫類別** - 涵蓋各種使用場景  
✅ **簡單易用** - 只需添加 CSS 類別名稱  
✅ **高效能** - 使用 transform 和 opacity  
✅ **響應式設計** - 支援行動裝置最佳化  
✅ **Vue 3 整合** - 完美配合 Vue 生態系統  
✅ **自訂彈性** - 可輕鬆擴展和修改  

透過這套動畫系統，你可以輕鬆為 Vue 應用添加專業級的動畫效果，提升使用者體驗！

---

## 📞 聯繫方式

如有問題或建議，歡迎提出 Issue 或 Pull Request！

**Happy Animating! 🎉**