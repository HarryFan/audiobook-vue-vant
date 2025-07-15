<template>
  <div class="book-detail">
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
      <h2>{{ book.value?.title }}</h2>
      <p class="author">作者：{{ book.value?.author }}</p>
      <p class="description" :class="{ 'truncated': !showFullDescription.value }">
        {{ book.value?.description }}
      </p>
      <van-button 
        type="primary" 
        block 
        @click="toggleDescription"
      >
        {{ showFullDescription.value ? '收起簡介' : '展開簡介' }}
      </van-button>

      <div class="book-controls">
        <van-button 
          type="primary" 
          block 
          @click="startPlaying"
        >
          <van-icon name="play-circle-o" />立即播放
        </van-button>
      </div>

      <div class="book-stats">
        <div class="stat-item">
          <span class="stat-value">{{ book.value?.rating }}</span>
          <span class="stat-label">評分</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ book.value?.listenCount }}</span>
          <span class="stat-label">收聽次數</span>
        </div>
      </div>

      <div class="chapters" v-if="book.value?.chapters && book.value.chapters.length > 0">
        <h3>章節列表</h3>
        <van-collapse v-model="activeNames.value">
          <van-collapse-item 
            v-for="chapter in book.value.chapters" 
            :key="chapter.id"
            :title="chapter.title"
            :name="chapter.id"
          >
            <div class="chapter-info">
              <p>時長：{{ formatDuration(chapter.duration) }}</p>
              <van-button 
                type="primary" 
                size="small" 
                @click="playChapter(chapter)"
              >播放</van-button>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BookService } from '@/services/bookService'
import { Book } from '@/types/book'
import { Chapter } from '@/types/chapter'

const route = useRoute()
const router = useRouter()
const book = ref<Book | null>(null)
const showFullDescription = ref(false)
const activeNames = ref<string[]>([])

const fetchBook = async () => {
  try {
    book.value = await BookService.getInstance().getBookById(route.params.id as string)
  } catch (error) {
    console.error('Error fetching book:', error)
    router.push('/books')
  }
}

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

const startPlaying = () => {
  if (book.value && book.value.audioUrl) {
    // 這裡應該調用播放器相關的邏輯
    console.log('Playing book:', book.value.title)
  }
}

const playChapter = (chapter: Chapter) => {
  if (chapter.audioUrl) {
    // 這裡應該調用播放器相關的邏輯
    console.log('Playing chapter:', chapter.title)
  }
}

const handleBack = () => {
  router.back()
}

// 初始化數據
fetchBook()
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
