<template>
  <div class="book-detail">
    <div class="book-header">
      <van-icon name="arrow-left" @click="handleBack" />
      <h1>{{ book.value?.title }}</h1>
    </div>

    <van-nav-bar
      title="書籍詳情"
      left-text="返回"
      left-arrow
      @click-left="handleBack"
    />

    <div class="book-cover">
      <img :src="book.value?.coverUrl" alt="書籍封面" />
    </div>

    <div class="book-info">
      <div class="book-meta">
        <div class="book-author">作者：{{ book.value?.author }}</div>
        <div class="book-duration">
          時長：{{ formatDuration(book.value?.duration || 0) }}
        </div>
      </div>

      <div class="book-description">
        <div class="description-header">
          <h2>簡介</h2>
          <van-icon 
            :name="showFullDescription.value ? 'arrow-up' : 'arrow-down'" 
            @click="toggleDescription"
          />
        </div>
        <div class="description-content" :class="{ 'show-full': showFullDescription.value }">
          <p>{{ book.value?.description }}</p>
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

      <div class="chapters-section">
        <h2>章節列表</h2>
        <van-collapse v-model="activeNames.value">
          <van-collapse-item 
            v-for="chapter in book.value?.chapters || []" 
            :key="chapter.id" 
            :name="chapter.id"
          >
            <template #title>
              <div class="chapter-title">
                <span>{{ chapter.title }}</span>
                <span class="chapter-duration">{{ formatDuration(chapter.duration) }}</span>
              </div>
            </template>
            <div class="chapter-content">
              <van-button 
                type="primary" 
                size="small" 
                @click="playChapter(chapter)"
              >
                播放
              </van-button>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BookService from '@/services/bookService'

const route = useRoute()
const router = useRouter()
const bookService = BookService.getInstance()
const bookId = route.params.id
const book = ref(null)
const showFullDescription = ref(false)
const activeNames = ref(['1'])

// 獲取書籍詳情
const getBookDetail = async () => {
  try {
    const data = await bookService.getBookById(bookId)
    book.value = data
  } catch (error) {
    console.error('獲取書籍詳情失敗:', error)
  }
}

// 格式化時間
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 播放章節
const playChapter = (chapter) => {
  console.log('播放章節:', chapter)
}

// 返回上一頁
const handleBack = () => {
  router.back()
}

// 切換描述顯示
const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

// 開始播放
const startPlaying = () => {
  console.log('開始播放書籍:', book.value)
}

// 初始化數據
getBookDetail()
</script>

<style scoped>
.book-detail {
  padding: 16px;
}

.book-cover {
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  margin-bottom: 16px;
}

.book-cover img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.book-info {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
}

.book-info h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.author {
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
}

.description {
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.5;
}

.description.truncated {
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.book-controls {
  margin: 16px 0;
}

.book-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #07c160;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.chapters {
  margin-top: 16px;
}

.chapter-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-top: 1px solid #eee;
}
</style>
