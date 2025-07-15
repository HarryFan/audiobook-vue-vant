<template>
  <div class="book-detail">
    <van-nav-bar
      title="書籍詳情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="book-content">
      <div class="book-cover">
        <van-image :src="book.cover" width="100%" height="200px" fit="cover" radius="8px" />
      </div>

      <div class="book-info">
        <h1 class="book-title">{{ book.title }}</h1>
        <p class="book-author">作者：{{ book.author }}</p>
        <div class="book-rating">
          <van-rate v-model="book.rating" readonly size="16px" color="#ffd21e" void-icon="star" void-color="#eee" />
          <span class="rating-count">({{ book.rating }})</span>
        </div>
        
        <div class="book-meta">
          <span class="listen-count">
            <van-icon name="play-circle-o" />{{ book.listenCount }}萬
          </span>
          <span class="duration">
            <van-icon name="clock-o" />{{ formatDuration(book.duration) }}
          </span>
        </div>

        <div class="book-description">
          <h3>書籍簡介</h3>
          <p>{{ book.description }}</p>
        </div>

        <div class="book-tags">
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

        <div class="book-controls">
          <van-button 
            type="primary" 
            block 
            @click="startPlaying"
          >
            <van-icon name="play-circle-o" />立即播放
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Button, Image, Rate, Icon, Tag, NavBar } from 'vant'
import { BookService, type Book } from '../services/bookService'

export default defineComponent({
  name: 'BookDetail',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Rate.name]: Rate,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [NavBar.name]: NavBar
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const bookService = BookService.getInstance()
    
    // 從路由參數獲取書籍ID
    const bookId = computed(() => {
      const id = route.params.id
      return typeof id === 'string' ? parseInt(id) : 0
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
          params: {
            bookTitle: book.value.title,
            authorName: book.value.author,
            bookCover: book.value.cover,
            audioSrc: book.value.audioUrl
          }
        })
      }
    }

    return {
      book,
      loading,
      formatDuration,
      goBack,
      startPlaying
    }
  }
})
</script>

<style lang="scss">
.book-detail {
  padding: 0 16px;
  
  .book-content {
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
        margin-bottom: 16px;
        
        .rating-count {
          margin-left: 8px;
          color: #666;
        }
      }

      .book-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        
        .listen-count,
        .duration {
          font-size: 14px;
          color: #666;
          
          .van-icon {
            margin-right: 4px;
          }
        }
      }

      .book-description {
        margin-bottom: 16px;
        
        h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 16px 0;
          color: #333;
        }

        p {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }
      }

      .book-tags {
        margin-bottom: 16px;
        
        h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 16px 0;
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
