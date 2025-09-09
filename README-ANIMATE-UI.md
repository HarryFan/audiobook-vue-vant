# 🎨 Vue 3 Animate UI 動畫庫

> 基於 Animate UI 概念打造的 Vue 3 動畫庫，提供豐富的 CSS 動畫類別，讓您的 Vue 應用更生動！

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Animations-1572B6.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
[![SCSS](https://img.shields.io/badge/SCSS-Preprocessor-CC6699.svg)](https://sass-lang.com/)

## ✨ 特色功能

🎭 **豐富動畫** - 20+ 種預建動畫效果  
⚡ **高效能** - 使用 transform 和 opacity 最佳化  
📱 **響應式** - 支援行動裝置和可訪問性  
🔧 **易整合** - 一行代碼即可使用  
🎨 **可自訂** - 完全可配置的 CSS 變數  

## 🚀 快速開始

### 1. 複製動畫檔案

將 `src/styles/animations.scss` 複製到您的專案中：

```bash
curl -O https://raw.githubusercontent.com/your-repo/animate-ui-guide/main/src/styles/animations.scss
```

### 2. 引入樣式

```typescript
// main.ts
import './styles/animations.scss'
```

### 3. 開始使用

```vue
<template>
  <div class="animate-fade-in-up">Hello World!</div>
</template>
```

## 📚 核心動畫類別

### 進入動畫
```html
<div class="animate-fade-in">淡入</div>
<div class="animate-fade-in-up">從下淡入</div>
<div class="animate-scale-in">縮放進入</div>
<div class="animate-slide-in-right">右滑進入</div>
```

### 互動效果
```html
<div class="hover-lift">懸停上升</div>
<div class="hover-scale">懸停縮放</div>
<div class="animate-pulse">脈衝效果</div>
```

### 列表動畫
```html
<div class="stagger-container">
  <div v-for="item in items" class="animate-fade-in-up">
    <!-- 子元素會錯開動畫 -->
  </div>
</div>
```

## 🎯 實際使用範例

### 書籍列表
```vue
<template>
  <div class="book-grid stagger-container">
    <div 
      v-for="book in books" 
      :key="book.id"
      class="book-card animate-fade-in-up hover-lift"
    >
      <img :src="book.cover" class="animate-scale-in delay-100" />
      <h3 class="animate-fade-in-up delay-200">{{ book.title }}</h3>
    </div>
  </div>
</template>
```

### 頁面轉場
```vue
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>
```

### 載入狀態
```vue
<template>
  <div v-if="loading" class="loading-container animate-fade-in">
    <div class="spinner animate-pulse">載入中...</div>
  </div>
</template>
```

## ⚙️ 自訂配置

### CSS 變數
```scss
:root {
  --animation-duration: 0.6s;        // 動畫時長
  --animation-timing: cubic-bezier(0.4, 0, 0.2, 1); // 緩動函數
  --stagger-delay: 0.1s;             // 錯開延遲
}
```

### 延遲控制
```html
<div class="animate-fade-in-up delay-100">延遲 0.1s</div>
<div class="animate-fade-in-up delay-300">延遲 0.3s</div>
<div class="animate-fade-in-up delay-500">延遲 0.5s</div>
```

## 🛠️ 進階使用

### JavaScript 控制
```typescript
// 動態添加動畫類別
const element = document.querySelector('.my-element')
element.classList.add('animate-fade-in-up')

// 監聽動畫完成
element.addEventListener('animationend', () => {
  console.log('動畫完成！')
})
```

### Vue Composition API
```typescript
import { ref, nextTick } from 'vue'

export function useAnimation() {
  const isVisible = ref(false)
  
  const showWithAnimation = async () => {
    isVisible.value = true
    await nextTick()
    // 動畫邏輯
  }
  
  return { isVisible, showWithAnimation }
}
```

## 📱 響應式設計

```scss
// 減少動畫對於有障礙使用者
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .animate-scale-in {
    animation: none !important;
  }
}

// 行動裝置最佳化
@media (max-width: 768px) {
  .stagger-container > * {
    animation-duration: 0.4s;
  }
}
```

## 🎨 完整類別列表

| 類別名稱 | 效果 | 最佳用途 |
|---------|------|---------|
| `animate-fade-in` | 淡入 | 內容載入 |
| `animate-fade-in-up` | 向上淡入 | 卡片、列表 |
| `animate-fade-in-down` | 向下淡入 | 下拉選單 |
| `animate-scale-in` | 縮放進入 | 圖片、重點內容 |
| `animate-slide-in-right` | 右滑進入 | 側邊欄 |
| `animate-slide-in-left` | 左滑進入 | 返回動畫 |
| `hover-lift` | 懸停上升 | 互動卡片 |
| `hover-scale` | 懸停縮放 | 圖片預覽 |
| `hover-glow` | 懸停發光 | CTA 按鈕 |
| `animate-pulse` | 脈衝動畫 | 載入狀態 |
| `stagger-container` | 錯開動畫容器 | 列表容器 |
| `animated-button` | 按鈕特效 | 主要按鈕 |

## 📦 專案結構

```
src/
├── styles/
│   └── animations.scss          # 動畫樣式
├── components/
│   ├── Loading.vue              # 載入組件
│   └── Toast.vue                # 通知組件
└── views/
    ├── Home.vue                 # 首頁動畫
    └── BookDetail.vue           # 詳情頁動畫
```

## 🤝 貢獻指南

歡迎提供建議和改進！

1. Fork 本專案
2. 建立您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 查看 [LICENSE](LICENSE) 檔案了解詳情

## 🙏 致謝

- 靈感來源：[Animate UI](https://animate-ui.com/)
- 動畫設計參考：Framer Motion 和 AOS 庫
- Vue 3 生態系統支援

## 📞 聯繫我們

- 📧 Email: your-email@example.com
- 🐛 問題回報: [GitHub Issues](https://github.com/your-username/vue-animate-ui/issues)
- 💬 討論: [GitHub Discussions](https://github.com/your-username/vue-animate-ui/discussions)

---

**讓您的 Vue 應用動起來！🎉**

[![Star this repo](https://img.shields.io/github/stars/your-username/vue-animate-ui?style=social)](https://github.com/your-username/vue-animate-ui)