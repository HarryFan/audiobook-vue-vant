<template>
  <div class="home-page">
    <!-- 頂部導航 -->
    <div class="top-nav">
      <van-search 
        v-model="searchValue" 
        placeholder="搜索書籍" 
        shape="round"
        @search="onSearch"
        @focus="showSearchPanel = true"
      />
    </div>

    <!-- 搜索面板 -->
    <transition name="fade">
      <div v-if="showSearchPanel" class="search-panel">
        <div class="search-header">
          <van-icon name="arrow-left" @click="showSearchPanel = false" />
          <van-search 
            v-model="searchValue" 
            placeholder="搜索書籍" 
            shape="round"
            @search="onSearch"
            @cancel="showSearchPanel = false"
          />
        </div>
        <div class="search-content">
          <div v-if="searchResults.length === 0" class="search-suggestions">
            <h3>熱門搜索</h3>
            <div class="suggestion-tags">
              <van-tag 
                v-for="tag in hotSearchTags" 
                :key="tag" 
                plain
                size="small"
                @click="onSearch(tag)"
              >
                {{ tag }}
              </van-tag>
            </div>
          </div>
          <div v-else class="search-results">
            <div 
              v-for="book in searchResults" 
              :key="book.id" 
              class="book-item"
              @click="goToBookDetail(book.id)"
            >
              <van-image 
                :src="book.cover" 
                width="100%" 
                height="80px"
                fit="cover"
                radius="4px"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 分類導航 -->
    <div class="category-nav">
      <van-tabs v-model:active="activeCategory" swipeable>
        <!-- 推薦書籍 -->
        <van-tab title="推薦">
          <div class="book-list">
            <div 
              v-for="book in recommendedBooks" 
              :key="book.id" 
              class="book-item"
              @click="goToBookDetail(book.id)"
            >
              <van-image 
                :src="book.cover" 
                width="100%" 
                height="150px"
                fit="cover"
                radius="8px"
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
                    v-for="tag in book.tags" 
                    :key="tag" 
                    plain
                    size="small"
                  >
                    {{ tag }}
                  </van-tag>
                </div>
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
        </van-tab>

        <!-- 熱門書籍 -->
        <van-tab title="熱門">
          <div class="book-list">
            <div 
              v-for="book in hotBooks" 
              :key="book.id" 
              class="book-item"
              @click="goToBookDetail(book.id)"
            >
              <van-image 
                :src="book.cover" 
                width="100%" 
                height="150px"
                fit="cover"
                radius="8px"
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
                    v-for="tag in book.tags" 
                    :key="tag" 
                    plain
                    size="small"
                  >
                    {{ tag }}
                  </van-tag>
                </div>
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
        </van-tab>

        <!-- 最新書籍 -->
        <van-tab title="最新">
          <div class="book-list">
            <div 
              v-for="book in newBooks" 
              :key="book.id" 
              class="book-item"
              @click="goToBookDetail(book.id)"
            >
              <van-image 
                :src="book.cover" 
                width="100%" 
                height="150px"
                fit="cover"
                radius="8px"
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
                    v-for="tag in book.tags" 
                    :key="tag" 
                    plain
                    size="small"
                  >
                    {{ tag }}
                  </van-tag>
                </div>
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
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Search, Tabs, Tab, Image, Tag, Rate, Icon } from 'vant'
import { useRouter } from 'vue-router'
import { BookService } from '../services/bookService'

export default defineComponent({
  name: 'Home',
  components: {
    [Search.name]: Search,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Rate.name]: Rate,
    [Icon.name]: Icon
  },
  setup() {
    const router = useRouter()
    const searchValue = ref('')
    const activeCategory = ref(0)
    const showSearchPanel = ref(false)
    const bookService = BookService.getInstance()

    // 搜索相關
    const searchResults = ref<Book[]>([])
    const hotSearchTags = ref<string[]>(['科幻', '懸疑', '愛情', '歷史', '冒險'])

    // 分類數據
    const recommendedBooks = computed(() => bookService.getRecommendedBooks())
    const hotBooks = computed(() => bookService.getHotBooks())
    const newBooks = computed(() => bookService.getNewBooks())

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

    // 搜索
    const onSearch = (value: string) => {
      if (!value) {
        searchResults.value = []
        return
      }
      searchResults.value = bookService.searchBooks(value)
    }

    // 跳轉到書籍詳情
    const goToBookDetail = (bookId: number) => {
      router.push({ name: 'bookDetail', params: { id: bookId } })
    }

    return {
      searchValue,
      activeCategory,
      showSearchPanel,
      searchResults,
      hotSearchTags,
      recommendedBooks,
      hotBooks,
      newBooks,
      onSearch,
      goToBookDetail,
      formatDuration
    }
  }
})
</script>

<style lang="scss">
.home-page {
  padding: 16px;
  
  .top-nav {
    margin-bottom: 16px;
  }

  // 搜索面板樣式
  .search-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 1000;
    
    .search-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
      
      .van-icon {
        font-size: 24px;
        color: #333;
      }
    }

    .search-content {
      padding: 16px;
      
      .search-suggestions {
        h3 {
          margin: 0 0 12px 0;
          color: #666;
        }

        .suggestion-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
      }

      .search-results {
        .book-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
          
          &:last-child {
            border-bottom: none;
          }

          .book-info {
            flex: 1;
            padding-left: 12px;
            
            .book-title {
              font-size: 16px;
              font-weight: 600;
              color: #333;
              margin: 4px 0;
            }

            .book-author {
              font-size: 14px;
              color: #666;
              margin: 4px 0;
            }

            .book-rating {
              margin: 4px 0;
            }
          }
        }
      }
    }
  }

  // 淡入淡出動畫
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .book-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
    
    .book-item {
      border-radius: 8px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
      
      &:active {
        transform: scale(0.98);
      }
      
      .book-info {
        padding: 12px;
        
        .book-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 4px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .book-author {
          font-size: 14px;
          color: #666;
          margin: 4px 0;
        }

        .book-rating {
          margin: 4px 0;
        }

        .book-tags {
          margin: 4px 0;
          
          .van-tag {
            margin-right: 4px;
            margin-bottom: 4px;
          }
        }

        .book-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          
          .listen-count,
          .duration {
            font-size: 12px;
            color: #666;
            
            .van-icon {
              font-size: 12px;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
