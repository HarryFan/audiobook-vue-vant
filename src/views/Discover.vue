<template>
  <div class="discover-page">
    <!-- 頂部導航 -->
    <van-nav-bar
      title="發現好書"
      left-arrow
      @click-left="handleBack"
    />
    
    <!-- 分類標籤 -->
    <div class="category-tabs">
      <van-tabs v-model:active="activeCategory" swipeable>
        <van-tab 
          v-for="category in categories" 
          :key="category.id" 
          :title="category.name"
        >
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
              <empty-state 
                text="暫無相關書籍" 
                icon="ion:book-outline"
                :showButton="true"
                buttonText="返回全部"
                @buttonClick="resetFilters"
              />
            </template>
            <template v-else>
              <div 
                v-for="book in filteredBooks" 
                :key="book.id" 
                class="book-card"
                @click="goToBookDetail(book.id)"
              >
                <van-image 
                  :src="book.cover" 
                  width="100%" 
                  height="120px"
                  fit="cover"
                  radius="8px"
                  lazy-load
                />
                <div class="book-info">
                  <h3 class="book-title">{{ book.title }}</h3>
                  <p class="book-author">{{ book.author }}</p>
                  <div class="book-rating">
                    <van-rate 
                      v-model="book.rating" 
                      readonly 
                      size="12px"
                      color="#ffd21e"
                      void-icon="star"
                      void-color="#eee"
                    />
                  </div>
                  <div class="book-tags">
                    <van-tag 
                      plain
                      size="small"
                      type="primary"
                    >
                      {{ book.category }}
                    </van-tag>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    
    <!-- 熱門推薦 -->
    <div class="hot-recommend" v-if="!loading && activeCategory === 0">
      <div class="section-title">
        <h2>熱門推薦</h2>
        <span class="view-all" @click="viewAllHot">查看全部</span>
      </div>
      <div class="horizontal-scroll">
        <div 
          v-for="book in hotBooks" 
          :key="book.id" 
          class="hot-book-card"
          @click="goToBookDetail(book.id)"
        >
          <van-image 
            :src="book.cover" 
            width="100px" 
            height="100px"
            fit="cover"
            radius="8px"
            lazy-load
          />
          <h4 class="book-title">{{ book.title }}</h4>
        </div>
      </div>
    </div>
    
    <!-- 最新上架 -->
    <div class="new-arrivals" v-if="!loading && activeCategory === 0">
      <div class="section-title">
        <h2>最新上架</h2>
        <span class="view-all" @click="viewAllNew">查看全部</span>
      </div>
      <div class="book-list">
        <div 
          v-for="book in newBooks.slice(0, 3)" 
          :key="book.id" 
          class="new-book-item"
          @click="goToBookDetail(book.id)"
        >
          <van-image 
            :src="book.cover" 
            width="80px" 
            height="80px"
            fit="cover"
            radius="8px"
            lazy-load
          />
          <div class="book-details">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
            <div class="book-meta">
              <span class="listen-count">
                <van-icon name="play-circle-o" />{{ book.listenCount }}萬
              </span>
              <span class="duration">
                <van-icon name="clock-o" />{{ formatDuration(book.duration) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { NavBar, Tabs, Tab, Image, Tag, Rate, Icon, DropdownMenu, DropdownItem } from 'vant'
import { useRouter } from 'vue-router'
import { BookService, Book } from '../services/bookService'
import AppLoading from '../components/Loading.vue'
import EmptyState from '../components/EmptyState.vue'

export default defineComponent({
  name: 'Discover',
  components: {
    [NavBar.name]: NavBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Rate.name]: Rate,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    AppLoading,
    EmptyState
  },
  setup() {
    const router = useRouter()
    const bookService = BookService.getInstance()
    const loading = ref(true)
    const activeCategory = ref(0)
    
    // 分類數據
    const categories = ref([
      { id: 0, name: '全部' },
      { id: 1, name: '科幻' },
      { id: 2, name: '懸疑' },
      { id: 3, name: '愛情' },
      { id: 4, name: '歷史' },
      { id: 5, name: '冒險' }
    ])
    
    // 篩選選項
    const sortValue = ref(0)
    const sortOptions = [
      { text: '綜合排序', value: 0 },
      { text: '熱門優先', value: 1 },
      { text: '評分最高', value: 2 },
      { text: '最新上架', value: 3 }
    ]
    
    const filterValue = ref(0)
    const filterOptions = [
      { text: '全部', value: 0 },
      { text: '完結', value: 1 },
      { text: '連載中', value: 2 }
    ]
    
    // 書籍數據
    const books = ref<Book[]>([])
    const hotBooks = ref<Book[]>([])
    const newBooks = ref<Book[]>([])
    
    // 篩選後的書籍
    const filteredBooks = computed(() => {
      if (activeCategory.value === 0) {
        // 全部分類
        return applyFilters(books.value)
      } else {
        // 特定分類
        const categoryName = categories.value.find(c => c.id === activeCategory.value)?.name || ''
        return applyFilters(books.value.filter(book => book.category === categoryName))
      }
    })
    
    // 應用篩選和排序
    const applyFilters = (bookList: Book[]) => {
      let result = [...bookList]
      
      // 應用排序
      if (sortValue.value === 1) {
        // 熱門優先
        result.sort((a, b) => b.listenCount - a.listenCount)
      } else if (sortValue.value === 2) {
        // 評分最高
        result.sort((a, b) => b.rating - a.rating)
      } else if (sortValue.value === 3) {
        // 最新上架
        result.sort((a, b) => b.id - a.id)
      }
      
      return result
    }
    
    // 重置篩選
    const resetFilters = () => {
      sortValue.value = 0
      filterValue.value = 0
      activeCategory.value = 0
    }
    
    // 格式化時間
    const formatDuration = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      
      if (hours > 0) {
        return `${hours}小時${remainingMinutes}分鐘`
      }
      return `${minutes}分鐘`
    }
    
    // 查看全部熱門
    const viewAllHot = () => {
      activeCategory.value = 0
      sortValue.value = 1 // 熱門排序
    }
    
    // 查看全部最新
    const viewAllNew = () => {
      activeCategory.value = 0
      sortValue.value = 3 // 最新排序
    }
    
    // 跳轉到書籍詳情
    const goToBookDetail = (bookId: number) => {
      router.push({ name: 'bookDetail', params: { id: bookId } })
    }
    
    // 返回上一頁
    const handleBack = () => {
      router.back()
    }
    
    // 載入數據
    const loadData = async () => {
      loading.value = true
      try {
        const [allBooks, hot, newBooksData] = await Promise.all([
          bookService.getAllBooks(),
          bookService.getHotBooks(),
          bookService.getNewBooks()
        ])
        books.value = allBooks
        hotBooks.value = hot
        newBooks.value = newBooksData
      } catch (error) {
        console.error('載入數據失敗:', error)
      } finally {
        loading.value = false
      }
    }

    // 初始化數據
    onMounted(() => {
      loadData()
    })
    
    return {
      loading,
      activeCategory,
      categories,
      sortValue,
      sortOptions,
      filterValue,
      filterOptions,
      books,
      filteredBooks,
      hotBooks,
      newBooks,
      resetFilters,
      formatDuration,
      viewAllHot,
      viewAllNew,
      goToBookDetail,
      handleBack
    }
  }
})
</script>

<style lang="scss">
.discover-page {
  padding-bottom: 60px;
  
  .category-tabs {
    margin-top: 10px;
  }
  
  .filter-options {
    margin-bottom: 16px;
  }
  
  .book-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 0 16px 16px;
    
    .book-card {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      
      .book-info {
        padding: 8px;
        
        .book-title {
          font-size: 14px;
          font-weight: 500;
          margin: 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .book-author {
          font-size: 12px;
          color: #999;
          margin: 2px 0;
        }
        
        .book-rating {
          margin: 4px 0;
        }
        
        .book-tags {
          margin-top: 4px;
        }
      }
    }
  }
  
  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin-top: 24px;
    
    h2 {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
    }
    
    .view-all {
      font-size: 12px;
      color: #1989fa;
    }
  }
  
  .horizontal-scroll {
    overflow-x: auto;
    display: flex;
    padding: 16px;
    gap: 12px;
    
    .hot-book-card {
      flex: 0 0 auto;
      width: 100px;
      
      .book-title {
        font-size: 12px;
        margin: 8px 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  
  .book-list {
    padding: 0 16px;
    
    .new-book-item {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #f2f2f2;
      
      .book-details {
        flex: 1;
        padding-left: 12px;
        
        .book-title {
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 4px;
        }
        
        .book-author {
          font-size: 12px;
          color: #999;
          margin: 0 0 8px;
        }
        
        .book-meta {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #666;
          
          .van-icon {
            vertical-align: -0.05em;
            margin-right: 2px;
          }
        }
      }
    }
  }
}
</style>