<template>
  <div class="book-detail">
    <van-nav-bar
      title="書籍詳情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="book-content">
      <div class="book-cover animate-scale-in">
        <van-image :src="book.cover" width="100%" height="200px" fit="cover" radius="8px" />
      </div>

      <div class="book-info">
        <h1 class="book-title animate-fade-in-up delay-100">{{ book.title }}</h1>
        <p class="book-author animate-fade-in-up delay-200">作者：{{ book.author }}</p>
        <div class="book-rating animate-fade-in-up delay-300">
          <van-rate v-model="book.rating" readonly size="16px" color="#ffd21e" void-icon="star" void-color="#eee" />
          <span class="rating-count">({{ book.rating }})</span>
        </div>

        <div class="book-meta animate-fade-in-up delay-400">
          <span class="listen-count">
            <van-icon name="play-circle-o" />{{ book.listenCount }}萬
          </span>
          <span class="duration">
            <van-icon name="clock-o" />{{ formatDuration(book.duration) }}
          </span>
        </div>

        <div class="book-description animate-fade-in-up delay-500">
          <h3>書籍簡介</h3>
          <p>{{ book.description }}</p>
        </div>

        <div class="book-tags animate-fade-in-up delay-600">
          <h3>標籤</h3>
          <div class="tag-list">
            <van-tag
              v-for="tag in book.tags"
              :key="tag"
              plain
              size="small"
            >
              {{ tag }}
            </van-tag>
          </div>
        </div>

        <div class="book-controls animate-fade-in-up delay-700">
          <van-button
            type="primary"
            block
            class="animated-button"
            @click="startPlaying"
          >
            <van-icon name="play-circle-o" />立即播放
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Vant 组件在全局注册，无需单独导入
import { BookService, type Book } from '../services/bookService'

const router = useRouter()
const route = useRoute()
const bookService = BookService.getInstance()

// 從路由參數獲取書籍ID
const bookId = computed(() => {
  const id = route.params.id
  if (typeof id === 'string') {
    const parsedId = parseInt(id)
    return isNaN(parsedId) ? 0 : parsedId
  }
  return 0
})

// 書籍數據
const book = ref<Book>({
  id: 0,
  title: '載入中...',
  author: '',
  cover: 'https://via.placeholder.com/150',
  description: '',
  audioUrl: '',
  duration: 0,
  category: '',
  tags: [],
  rating: 0,
  listenCount: 0,
  language: '',
  totalTimeSecs: 0,
  urlLibrivox: '',
  urlRss: ''
})
const loading = ref(true)

// 載入書籍數據
const loadBook = async () => {
  const id = bookId.value
  if (id <= 0) return

  loading.value = true
  try {
    const bookData = await bookService.getBookById(id)
    if (bookData) {
      book.value = bookData
    }
  } catch (error) {
    console.error('載入書籍失敗:', error)
  } finally {
    loading.value = false
  }
}

// 組件掛載時載入數據
onMounted(() => {
  loadBook()
})

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

// 返回上一頁
const goBack = () => {
  router.back()
}

// 開始播放
const startPlaying = () => {
  if (book.value.audioUrl) {
    router.push({
      name: 'player',
      query: {
        bookTitle: book.value.title,
        authorName: book.value.author,
        bookCover: book.value.cover,
        audioSrc: book.value.audioUrl
      }
    })
  }
}

// 在 setup 語法糖中，所有變量和函數都會自動暴露給模板
</script>

<style lang="scss">
.book-detail {
  padding: 0 16px 150px 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .book-content {
    flex: 1;
    margin-top: 16px;

    .book-cover {
      margin-bottom: 16px;
    }

    .book-info {
      .book-title {
        font-size: 24px;
        font-weight: 600;
        margin: 16px 0;
        color: #333;
      }

      .book-author {
        font-size: 16px;
        color: #666;
        margin-bottom: 16px;
      }

      .book-rating {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }

      .rating-count {
        margin-left: 8px;
        color: #666;
      }

      .book-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
        color: #666;
      }

      .book-description {
        margin-bottom: 16px;

        h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: #333;
        }

        p {
          margin: 0;
          color: #666;
          line-height: 1.5;
        }
      }

      .book-tags {
        margin-bottom: 16px;

        h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: #333;
        }

        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
      }

      .book-controls {
        margin-top: 32px;

        .van-button {
          border-radius: 8px;

          .van-icon {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
