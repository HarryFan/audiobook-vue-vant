<template>
  <div class="discover-page">
    <!-- 頂部導航 -->
    <van-nav-bar title="發現好書" left-arrow @click-left="handleBack" />

    <!-- 分類標籤 -->
    <div class="category-tabs">
      <van-tabs v-model:active="activeCategory" swipeable>
        <van-tab v-for="category in categories" :key="category.id" :title="category.name">
          <!-- 篩選選項 -->
          <div class="filter-options">
            <van-dropdown-menu>
              <van-dropdown-item v-model="sortValue" :options="sortOptions" />
              <van-dropdown-item v-model="filterValue" :options="filterOptions" />
            </van-dropdown-menu>
          </div>

          <!-- 書籍列表 -->
          <div class="book-grid">
            <template v-if="loading">
              <app-loading text="載入中..." />
            </template>
            <template v-else-if="filteredBooks.length === 0">
              <empty-state text="暫無相關書籍" icon="ion:book-outline" :showButton="true" buttonText="返回全部" @buttonClick="resetFilters" />
            </template>
            <template v-else>
              <div v-for="book in filteredBooks" :key="book.id" class="book-card" @click="goToBookDetail(book.id)">
                <div class="book-cover">
                  <img :src="book.cover" :alt="book.title" @error="handleImageError" class="cover-image" />
                </div>
                <div class="book-info">
                  <h3 class="book-title">{{ book.title }}</h3>
                  <p class="book-author">{{ book.author }}</p>
                  <div class="book-meta">
                    <span class="book-category">{{ book.category }}</span>
                    <span class="book-duration">{{ formatDuration(book.duration) }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 熱門推薦 -->
    <div class="section" v-if="!loading && activeCategory === 0">
      <div class="section-header">
        <h3>熱門推薦</h3>
        <span class="view-all" @click="handleViewAllHot">查看全部</span>
      </div>
      <div class="book-scroll">
        <div v-for="book in hotBooks" :key="'hot-' + book.id" class="book-card-horizontal" @click="goToBookDetail(book.id)">
          <div class="book-cover">
            <img :src="book.cover" :alt="book.title" @error="handleImageError" class="cover-image" />
          </div>
          <div class="book-info">
            <h4 class="book-title">{{ book.title }}</h4>
            <p class="book-author">{{ book.author }}</p>
            <div class="book-meta">
              <span class="book-category">{{ book.category }}</span>
              <span class="book-rating">
                <van-rate v-model="book.rating" readonly allow-half size="12" />
                {{ book.rating }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新書上架 -->
    <div class="section" v-if="!loading && activeCategory === 0">
      <div class="section-header">
        <h3>新書上架</h3>
        <span class="view-all" @click="handleViewAllNew">查看全部</span>
      </div>
      <div class="book-scroll">
        <div v-for="book in newBooks" :key="'new-' + book.id" class="book-card-horizontal" @click="goToBookDetail(book.id)">
          <div class="book-cover">
            <img :src="book.cover" :alt="book.title" @error="handleImageError" class="cover-image" />
          </div>
          <div class="book-info">
            <h4 class="book-title">{{ book.title }}</h4>
            <p class="book-author">{{ book.author }}</p>
            <div class="book-meta">
              <span class="book-category">{{ book.category }}</span>
              <span class="book-duration">{{ formatDuration(book.duration) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { BookService } from '../services/bookService';
import AppLoading from '../components/Loading.vue';
import EmptyState from '../components/EmptyState.vue';

export default {
  name: 'Discover',
  components: {
    AppLoading,
    EmptyState,
  },
  setup() {
    const router = useRouter();
    const bookService = BookService.getInstance();

    // 響應式狀態
    const books = ref([]);
    const hotBooks = ref([]);
    const newBooks = ref([]);
    const loading = ref(true);
    const activeCategory = ref(0);
    const viewAllHot = ref(false);
    const viewAllNew = ref(false);
    const sortValue = ref('popular');
    const filterValue = ref('all');

    // 分類數據
    const categories = ref([
      { id: 0, name: '推薦' },
      { id: 1, name: '文學' },
      { id: 2, name: '商業' },
      { id: 3, name: '生活' },
      { id: 4, name: '科技' },
      { id: 5, name: '藝術' },
      { id: 6, name: '其他' },
    ]);

    // 排序選項
    const sortOptions = [
      { text: '熱門', value: 'popular' },
      { text: '最新', value: 'newest' },
      { text: '評分', value: 'rating' },
    ];

    // 過濾選項
    const filterOptions = [
      { text: '全部', value: 'all' },
      { text: '免費', value: 'free' },
      { text: '付費', value: 'paid' },
    ];

    // 載入數據
    const loadData = async () => {
      loading.value = true;
      try {
        const [allBooks, hot, newBooksData] = await Promise.all([bookService.getAllBooks(), bookService.getHotBooks(), bookService.getNewBooks()]);
        books.value = allBooks;
        hotBooks.value = hot;
        newBooks.value = newBooksData;
      } catch (error) {
        console.error('載入數據失敗:', error);
      } finally {
        loading.value = false;
      }
    };

    // 重置過濾條件
    const resetFilters = () => {
      sortValue.value = 'popular';
      filterValue.value = 'all';
      activeCategory.value = 0;
    };

    // 查看全部熱門
    const handleViewAllHot = () => {
      activeCategory.value = 0;
      sortValue.value = 'popular';
      viewAllHot.value = true;
    };

    // 查看全部最新
    const handleViewAllNew = () => {
      activeCategory.value = 0;
      sortValue.value = 'newest';
      viewAllNew.value = true;
    };

    // 跳轉到書籍詳情
    const goToBookDetail = bookId => {
      router.push({ name: 'bookDetail', params: { id: bookId.toString() } });
    };

    // 格式化時長
    const formatDuration = seconds => {
      if (!seconds) return '0分鐘';
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return hours > 0 ? `${hours}時${minutes}分` : `${minutes}分鐘`;
    };

    // 處理圖片加載錯誤
    const handleImageError = event => {
      const img = event.target;
      // 使用一個簡單的 SVG 作為替代圖片
      img.src =
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTAiIGhlaWdodD0iMzE1IiB2aWV3Qm94PSIwIDAgMjEwIDMxNSIgZmlsbD0iI2YwZjBmMCI+CiAgPHJlY3Qgd2lkdGg9IjIxMCIgaGVpZ2h0PSIzMTUiIGZpbGw9IiNlZWVlZWUiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSI+Tm8gQ292ZXI8L3RleHQ+Cjwvc3ZnPg==';
      img.onerror = null; // 防止無限循環
    };

    // 處理返回按鈕
    const handleBack = () => {
      router.back();
    };

    // 初始化數據
    onMounted(() => {
      loadData();
    });

    // 過濾和排序書籍
    const filteredBooks = computed(() => {
      let result = [...books.value];

      // 分類過濾
      if (activeCategory.value !== 0) {
        const category = categories.value.find(c => c.id === activeCategory.value);
        if (category) {
          result = result.filter(book => book.category === category.name);
        }
      }

      // 排序
      if (sortValue.value === 'popular') {
        result.sort((a, b) => (b.listenCount || 0) - (a.listenCount || 0));
      } else if (sortValue.value === 'newest') {
        result.sort((a, b) => b.id - a.id);
      } else if (sortValue.value === 'rating') {
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      // 過濾器
      if (filterValue.value === 'free') {
        result = result.filter(book => book.tags && book.tags.includes('免費'));
      } else if (filterValue.value === 'paid') {
        result = result.filter(book => !book.tags || !book.tags.includes('免費'));
      }

      return result;
    });

    return {
      books,
      hotBooks,
      newBooks,
      loading,
      activeCategory,
      viewAllHot,
      viewAllNew,
      sortValue,
      filterValue,
      categories,
      sortOptions,
      filterOptions,
      filteredBooks,
      handleBack,
      handleViewAllHot,
      handleViewAllNew,
      goToBookDetail,
      formatDuration,
      handleImageError,
      resetFilters,
    };
  },
};
</script>

<style scoped>
/* 全局變數 */
:root {
  --primary: #1989fa;
  --success: #07c160;
  --danger: #ee0a24;
  --warning: #ff976a;
  --text-primary: #323233;
  --text-secondary: #969799;
  --border-color: #ebedf0;
  --background-color: #f7f8fa;
  --white: #fff;
  --gray-1: #f7f8fa;
  --gray-2: #f2f3f5;
  --gray-3: #ebedf0;
  --gray-4: #dcdee0;
  --gray-5: #c8c9cc;
  --gray-6: #969799;
  --gray-7: #646566;
  --gray-8: #323233;
  --border-radius-sm: 2px;
  --border-radius: 4px;
  --border-radius-lg: 8px;
  --border-radius-max: 999px;
  --box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.discover-page {
  padding-bottom: 50px;
  background-color: var(--background-color);
  min-height: 100vh;
}

/* 頂部導航欄 */
:deep(.van-nav-bar) {
  background-color: var(--white);
  position: sticky;
  top: 0;
  z-index: 99;
}

:deep(.van-nav-bar__title) {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-8);
}

:deep(.van-icon-arrow-left) {
  color: var(--gray-8);
  font-size: 20px;
}

/* 分類標籤 */
.category-tabs {
  background-color: var(--white);
  position: sticky;
  top: 46px;
  z-index: 98;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.van-tabs__nav) {
  background-color: var(--white);
  padding: 0 16px;
}

:deep(.van-tab) {
  font-size: 14px;
  color: var(--gray-6);
  padding: 12px 0;
  font-weight: 500;
  flex: none;
  margin-right: 24px;
}

:deep(.van-tab--active) {
  color: var(--primary);
  font-weight: 600;
}

:deep(.van-tabs__line) {
  background-color: var(--primary);
  height: 3px;
  border-radius: 3px;
  bottom: 15px;
}

/* 篩選選項 */
.filter-options {
  background-color: var(--white);
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
}

:deep(.van-dropdown-menu) {
  height: 44px;
}

:deep(.van-dropdown-menu__bar) {
  height: 44px;
  box-shadow: none;
}

:deep(.van-dropdown-menu__title) {
  font-size: 14px;
  color: var(--gray-8);
  padding: 0 8px;
}

:deep(.van-dropdown-menu__title::after) {
  border-color: transparent transparent var(--gray-5) var(--gray-5);
  right: -4px;
}

:deep(.van-dropdown-menu__title--active) {
  color: var(--primary);
}

/* 書籍網格 */
.book-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 12px 16px;
  margin: 0 auto;
  max-width: 800px;
}

.book-item {
  display: flex;
  gap: 12px;
  background: var(--white);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.book-item:active {
  transform: translateY(1px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.book-card {
  background: var(--white);
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  border: 1px solid var(--gray-3);
}

.book-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.book-card:active {
  opacity: 0.9;
  transform: translateY(1px);
}

.book-cover {
  width: 80px;
  height: 120px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background-color: var(--gray-1);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.book-info {
  padding: 10px 8px;
}

.book-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--gray-8);
  margin: 0 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  word-break: break-word;
  hyphens: auto;
  padding-right: 8px;
}

.book-author {
  font-size: 13px;
  color: var(--gray-7);
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--gray-6);
  margin-top: auto;
}

/* 區塊標題 */
.section {
  margin-top: 16px;
  background-color: var(--white);
  padding: 16px 0 0;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 16px;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-8);
  position: relative;
  padding-left: 12px;
}

.section-header h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 14px;
  background-color: var(--primary);
  border-radius: 2px;
}

.view-all {
  font-size: 12px;
  color: var(--gray-6);
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.view-all:active {
  color: var(--primary);
}

.view-all::after {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 2px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23969799'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: transform 0.2s;
}

.view-all:active::after {
  transform: translateX(2px);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231989fa'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E");
}

/* 水平滾動書籍列表 */
.book-scroll {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding: 0 16px 16px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.book-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 水平卡片 */
.book-card-horizontal {
  flex: 0 0 140px;
  background: var(--white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  border: 1px solid var(--gray-3);
}

.book-card-horizontal:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.book-card-horizontal:active {
  opacity: 0.9;
  transform: translateY(1px);
}

.book-card-horizontal .book-cover {
  padding-bottom: 133.33%; /* 3:4 比例 */
  border-radius: 6px 6px 0 0;
  background-color: var(--gray-1);
}

.book-card-horizontal .book-info {
  padding: 10px 8px;
}

.book-card-horizontal .book-title {
  font-size: 13px;
  margin-bottom: 2px;
  -webkit-line-clamp: 1;
  height: auto;
  color: var(--gray-8);
}

.book-card-horizontal .book-author {
  font-size: 11px;
  margin-bottom: 4px;
  color: var(--gray-6);
}

.book-rating {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #ffb800;
  font-size: 11px;
}

/* 載入狀態 */
:deep(.van-loading__spinner) {
  color: var(--primary);
}

/* 空狀態 */
:deep(.empty-state) {
  grid-column: 1 / -1;
  padding: 60px 0;
  text-align: center;
  color: var(--gray-6);
}

/* 響應式調整 */
@media (min-width: 600px) {
  .book-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px;
    max-width: 1200px;
  }

  .book-item {
    padding: 16px;
  }

  .book-cover {
    width: 90px;
    height: 135px;
  }
}

@media (min-width: 600px) {
  .book-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 900px) {
  .book-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1200px) {
  .book-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 640px) {
  .section {
    margin: 24px 16px;
    border-radius: 12px;
  }

  .book-scroll {
    padding: 0 24px 24px;
  }
}

/* 動畫效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.book-card,
.book-card-horizontal {
  animation: fadeIn 0.3s ease-out forwards;
  opacity: 0;
}

/* 為每個卡片添加延遲動畫 */
.book-card:nth-child(1) {
  animation-delay: 0.05s;
}
.book-card:nth-child(2) {
  animation-delay: 0.1s;
}
.book-card-horizontal:nth-child(1) {
  animation-delay: 0.15s;
}
.book-card-horizontal:nth-child(2) {
  animation-delay: 0.2s;
}
</style>
