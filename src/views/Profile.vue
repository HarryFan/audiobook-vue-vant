<template>
  <div class="profile">
    <div class="user-header">
      <div class="user-info">
        <van-image
          round
          width="80px"
          height="80px"
          :src="userInfo.avatar"
          fit="cover"
        />
        <div class="user-meta">
          <h2 class="user-name">{{ userInfo.name }}</h2>
          <div class="user-tags">
            <van-tag v-if="userInfo.isVip" type="warning" round>VIP會員</van-tag>
            <van-tag type="primary" round>Lv.{{ userInfo.level }}</van-tag>
          </div>
        </div>
      </div>
      <div class="user-stats">
        <div class="stat-item">
          <span class="stat-value">{{ userInfo.listenTime }}</span>
          <span class="stat-label">聽書時長</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ userInfo.bookCount }}</span>
          <span class="stat-label">書籍數</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ userInfo.followCount }}</span>
          <span class="stat-label">關注</span>
        </div>
      </div>
    </div>
    
    <div class="vip-card" v-if="!userInfo.isVip">
      <div class="vip-info">
        <van-icon name="diamond" class="vip-icon" />
        <div class="vip-text">
          <h3>開通VIP會員</h3>
          <p>享受無限聽書、專屬會員書庫及離線下載功能</p>
        </div>
      </div>
      <van-button type="warning" size="small" @click="openVipPage">立即開通</van-button>
    </div>
    
    <div class="vip-card member" v-else>
      <div class="vip-info">
        <van-icon name="diamond" class="vip-icon" />
        <div class="vip-text">
          <h3>VIP會員 · {{ userInfo.vipExpireText }}</h3>
          <p>暢享特權功能，續費享優惠</p>
        </div>
      </div>
      <van-button type="warning" size="small" @click="renewVip">續費</van-button>
    </div>
    
    <van-cell-group inset title="我的">
      <van-cell title="我的書架" is-link icon="orders-o" @click="navigateTo('/bookshelf')" />
      <van-cell title="歷史記錄" is-link icon="clock-o" @click="navigateTo('/history')" />
      <van-cell title="下載管理" is-link icon="down" @click="navigateTo('/downloads')" />
      <van-cell title="我的收藏" is-link icon="star-o" @click="navigateTo('/favorites')" />
    </van-cell-group>
    
    <van-cell-group inset title="最近收聽" class="recent-section">
      <empty-state v-if="recentBooks.length === 0" text="暫無收聽記錄" icon="playlist" />
      <div v-else class="recent-books">
        <div 
          v-for="book in recentBooks" 
          :key="book.id" 
          class="recent-book-item"
          @click="navigateToBook(book.id)"
        >
          <van-image :src="book.cover" width="60" height="80" fit="cover" radius="4px" />
          <div class="recent-book-info">
            <h3 class="recent-book-title">{{ book.title }}</h3>
            <p class="recent-book-progress">
              <van-icon name="play-circle-o" />
              {{ book.progress }}
            </p>
          </div>
        </div>
      </div>
    </van-cell-group>
    
    <van-cell-group inset title="設定">
      <van-cell title="通知設定" is-link icon="volume-o" @click="navigateTo('/settings/notification')" />
      <van-cell title="播放設定" is-link icon="setting-o" @click="navigateTo('/settings/playback')" />
      <van-cell title="清除緩存" is-link icon="delete" @click="showClearCacheConfirm" />
      <van-cell title="關於我們" is-link icon="info-o" @click="navigateTo('/about')" />
    </van-cell-group>
    
    <div class="logout-button">
      <van-button block plain type="danger" @click="logout">登出</van-button>
    </div>
    
    <van-dialog v-model:show="showClearCacheDialog" title="清除緩存" show-cancel-button @confirm="clearCache">
      <p class="dialog-content">確定要清除緩存嗎？這將刪除所有暫存資料，但不會刪除已下載的有聲書。</p>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar, Cell, CellGroup, Image, Button, Tag, Dialog } from 'vant'
import { BookService, type Book } from '../services/bookService'
import EmptyState from '../components/EmptyState.vue'

export default defineComponent({
  name: 'Profile',
  components: {
    EmptyState,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  setup() {
    const router = useRouter()
    const bookService = BookService.getInstance()
    const showClearCacheDialog = ref(false)
    
    // 用戶信息
    const userInfo = reactive({
      name: '默認用戶',
      avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
      isVip: false,
      vipExpireText: '2025-08-16到期',
      level: 3,
      listenTime: '28小時',
      bookCount: 12,
      followCount: 5
    })
    
    // 最近收聽的書籍
    const recentBooks = ref<(Book & { progress: string })[]>([])
    const loading = ref(true)

    // 載入最近收聽的書籍
    const loadRecentBooks = async () => {
      loading.value = true
      try {
        const allBooks = await bookService.getAllBooks()
        if (allBooks.length >= 6) {
          recentBooks.value = [
            {
              ...allBooks[0],
              progress: '已聽23%，第3章'
            },
            {
              ...allBooks[2],
              progress: '已聽56%，第12章'
            },
            {
              ...allBooks[5],
              progress: '已聽8%，第1章'
            }
          ]
        }
      } catch (error) {
        console.error('載入最近收聽書籍失敗:', error)
      } finally {
        loading.value = false
      }
    }

    // 組件掛載時載入數據
    onMounted(() => {
      loadRecentBooks()
    })
    
    // 頁面導航
    const navigateTo = (path: string) => {
      router.push(path)
    }
    
    // 導航到書籍詳情
    const navigateToBook = (bookId: number) => {
      router.push(`/book/${bookId}`)
    }
    
    // 打開VIP頁面
    const openVipPage = () => {
      router.push('/vip')
    }
    
    // 續費VIP
    const renewVip = () => {
      router.push('/vip/renew')
    }
    
    // 顯示清除緩存確認對話框
    const showClearCacheConfirm = () => {
      showClearCacheDialog.value = true
    }
    
    // 清除緩存
    const clearCache = () => {
      // 模擬清除緩存操作
      setTimeout(() => {
        // 這裡可以添加實際的緩存清除邏輯
        console.log('緩存已清除')
      }, 1000)
    }
    
    // 登出操作
    const logout = () => {
      Dialog.confirm({
        title: '登出確認',
        message: '確定要登出嗎？',
      }).then(() => {
        // 執行登出操作
        router.push('/login')
      }).catch(() => {
        // 取消登出
      })
    }
    
    return {
      userInfo,
      recentBooks,
      loading,
      showClearCacheDialog,
      navigateTo,
      navigateToBook,
      openVipPage,
      renewVip,
      showClearCacheConfirm,
      clearCache,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.profile {
  padding-bottom: 32px;
  
  .user-header {
    padding: 24px 16px;
    background: linear-gradient(to right, #4a90e2, #63b3ed);
    color: #fff;
    
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      
      .user-meta {
        margin-left: 16px;
        flex: 1;
        
        .user-name {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 8px;
        }
        
        .user-tags {
          .van-tag {
            margin-right: 8px;
          }
        }
      }
    }
    
    .user-stats {
      display: flex;
      text-align: center;
      
      .stat-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        .stat-value {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 12px;
          opacity: 0.8;
        }
      }
    }
  }
  
  .vip-card {
    margin: 16px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &.member {
      background: linear-gradient(to right, #f5c518, #f8d878);
      
      .vip-icon {
        color: #fff;
      }
      
      .vip-text {
        h3, p {
          color: #fff;
        }
      }
    }
    
    .vip-info {
      display: flex;
      align-items: center;
      
      .vip-icon {
        font-size: 28px;
        color: #f5c518;
        margin-right: 12px;
      }
      
      .vip-text {
        h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px;
        }
        
        p {
          font-size: 12px;
          color: #666;
          margin: 0;
        }
      }
    }
  }
  
  .recent-section {
    margin: 16px 0;
  }
  
  .recent-books {
    padding: 16px;
    
    .recent-book-item {
      display: flex;
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .recent-book-info {
        margin-left: 12px;
        flex: 1;
        
        .recent-book-title {
          font-size: 14px;
          margin: 0 0 8px;
          color: #333;
        }
        
        .recent-book-progress {
          font-size: 12px;
          color: #999;
          margin: 0;
          
          .van-icon {
            font-size: 12px;
            margin-right: 4px;
            vertical-align: -1px;
          }
        }
      }
    }
  }
  
  .logout-button {
    padding: 16px;
    margin-top: 16px;
  }
  
  .dialog-content {
    padding: 16px;
    text-align: center;
  }
}
</style>