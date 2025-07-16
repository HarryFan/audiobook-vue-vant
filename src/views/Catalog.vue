<template>
  <div class="catalog">
    <van-nav-bar
      :title="book.title"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="book-info">
      <van-image :src="book.cover" width="80" height="120" fit="cover" radius="4px" />
      <div class="book-meta">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author">{{ book.author }}</p>
        <div class="book-stats">
          <span class="chapter-count">共{{ chapters.length }}章</span>
          <span class="total-duration">總時長：{{ formatTotalDuration() }}</span>
        </div>
      </div>
    </div>

    <div class="chapter-controls">
      <van-button type="primary" icon="play-circle-o" @click="playAll">全部播放</van-button>
      <van-button plain icon="sort" @click="toggleSortOrder">{{ isReversed ? '正序' : '倒序' }}</van-button>
    </div>

    <van-loading v-if="loading" vertical class="loading-container">載入中...</van-loading>
    <empty-state v-else-if="chapters.length === 0" text="無章節數據" />

    <van-list v-else class="chapter-list">
      <div 
        v-for="chapter in displayChapters" 
        :key="chapter.id"
        class="chapter-item"
        :class="{ 'locked': chapter.isLocked }"
      >
        <div class="chapter-info" @click="playChapter(chapter)">
          <div class="chapter-title-wrapper">
            <van-icon 
              :name="currentChapter?.id === chapter.id ? 'pause-circle-o' : 'play-circle-o'" 
              class="play-icon" 
            />
            <span class="chapter-title">{{ chapter.title }}</span>
            <van-tag v-if="chapter.isLocked" type="danger" size="small" round>VIP</van-tag>
          </div>
          <span class="chapter-duration">{{ formatDuration(chapter.duration) }}</span>
        </div>
      </div>
    </van-list>

    <van-dialog
      v-model:show="showVipDialog"
      title="VIP章節"
      confirm-button-text="成為VIP"
      cancel-button-text="返回"
      @confirm="goToPurchase"
    >
      <div class="vip-dialog-content">
        <p>本章為VIP專享內容，請升級為VIP會員後繼續收聽。</p>
        <p>VIP會員可享受：</p>
        <ul>
          <li>無限收聽所有章節</li>
          <li>離線下載</li>
          <li>無廣告體驗</li>
          <li>更多精品有聲書</li>
        </ul>
      </div>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NavBar, Button, Image, Icon, Tag, Loading, List, Dialog } from 'vant'
import { BookService, type Book, type Chapter } from '../services/bookService'
import EmptyState from '../components/EmptyState.vue'

export default defineComponent({
  name: 'Catalog',
  components: {
    EmptyState,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Loading.name]: Loading,
    [List.name]: List,
    [Dialog.name]: Dialog
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const bookService = BookService.getInstance()
    const loading = ref(true)
    const isReversed = ref(false)
    const showVipDialog = ref(false)
    const currentChapter = ref<Chapter | null>(null)
    
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
    
    // 獲取章節列表
    const chapters = ref<Chapter[]>([])
    
    // 根據排序顯示章節
    const displayChapters = computed(() => {
      if (isReversed.value) {
        return [...chapters.value].reverse()
      }
      return chapters.value
    })
    
    // 格式化單個章節時間
    const formatDuration = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      
      if (hours > 0) {
        return `${hours}小時${remainingMinutes}分鐘`
      }
      return `${minutes}分鐘`
    }
    
    // 格式化總時長
    const formatTotalDuration = (): string => {
      const totalSeconds = chapters.value.reduce((acc, chapter) => acc + chapter.duration, 0)
      return formatDuration(totalSeconds)
    }
    
    // 切換排序方式
    const toggleSortOrder = () => {
      isReversed.value = !isReversed.value
    }
    
    // 返回上一頁
    const goBack = () => {
      router.back()
    }
    
    // 播放全部章節
    const playAll = () => {
      if (chapters.value.length > 0) {
        const firstChapter = chapters.value[0]
        if (firstChapter.isLocked) {
          showVipDialog.value = true
        } else {
          playChapter(firstChapter)
        }
      }
    }
    
    // 播放指定章節
    const playChapter = (chapter: Chapter) => {
      if (chapter.isLocked) {
        showVipDialog.value = true
        return
      }
      
      currentChapter.value = chapter
      router.push({
        name: 'player',
        params: {
          bookTitle: book.value.title,
          authorName: book.value.author,
          bookCover: book.value.cover,
          audioSrc: chapter.audioUrl,
          chapterId: chapter.id.toString(),
          chapterTitle: chapter.title
        }
      })
    }
    
    // 前往購買VIP頁面
    const goToPurchase = () => {
      router.push('/profile')
    }
    
    // 載入數據
    const loadData = async () => {
      const id = bookId.value
      if (id <= 0) {
        loading.value = false
        return
      }
      
      loading.value = true
      try {
        const [bookData, chaptersData] = await Promise.all([
          bookService.getBookById(id),
          bookService.getChapters(id)
        ])
        
        if (bookData) {
          book.value = bookData
        }
        chapters.value = chaptersData
      } catch (error) {
        console.error('載入數據失敗:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadData()
    })
    
    return {
      book,
      chapters,
      displayChapters,
      loading,
      isReversed,
      showVipDialog,
      currentChapter,
      formatDuration,
      formatTotalDuration,
      toggleSortOrder,
      goBack,
      playAll,
      playChapter,
      goToPurchase
    }
  }
})
</script>

<style lang="scss" scoped>
.catalog {
  padding-bottom: 60px;
  
  .book-info {
    display: flex;
    padding: 16px;
    background-color: #f8f8f8;
    margin-bottom: 16px;
    
    .book-meta {
      flex: 1;
      padding-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .book-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px;
      }
      
      .book-author {
        font-size: 14px;
        color: #666;
        margin: 0 0 8px;
      }
      
      .book-stats {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
      }
    }
  }
  
  .chapter-controls {
    display: flex;
    justify-content: space-between;
    padding: 0 16px 16px;
    
    .van-button {
      flex: 1;
      margin-right: 16px;
      border-radius: 4px;
      
      &:last-child {
        margin-right: 0;
      }
    }
  }
  
  .loading-container {
    margin: 40px auto;
    text-align: center;
  }
  
  .chapter-list {
    .chapter-item {
      padding: 0 16px;
      
      &.locked {
        .chapter-title {
          color: #999;
        }
      }
      
      .chapter-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #eee;
        
        .chapter-title-wrapper {
          display: flex;
          align-items: center;
          max-width: 70%;
          
          .play-icon {
            margin-right: 8px;
            color: #1989fa;
            font-size: 18px;
          }
          
          .chapter-title {
            flex: 1;
            margin-right: 8px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
          .van-tag {
            flex-shrink: 0;
          }
        }
        
        .chapter-duration {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  
  .vip-dialog-content {
    padding: 16px;
    text-align: left;
    
    p {
      margin: 8px 0;
    }
    
    ul {
      padding-left: 16px;
      margin: 8px 0;
      
      li {
        margin: 4px 0;
        color: #666;
      }
    }
  }
}
</style>