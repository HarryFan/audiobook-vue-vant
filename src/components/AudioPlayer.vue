<template>
  <div class="audio-player">
    <!-- Header -->
    <van-nav-bar
      title="正在收聽"
      left-arrow
      @click-left="handleBack"
    />

    <!-- 書籍資訊 -->
    <div class="book-info">
      <van-image
        :src="bookCover"
        width="150px"
        height="150px"
        radius="8px"
        fit="cover"
      />
      <div class="book-details">
        <h2 class="book-title">{{ bookTitle }}</h2>
        <p class="author-name">{{ authorName }}</p>
      </div>
    </div>

    <!-- 播放進度 -->
    <div class="progress-section">
      <div class="time-info">
        <span class="current-time">{{ currentTime }}</span>
        <span class="total-time">{{ totalTime }}</span>
      </div>
      <van-slider
        v-model="progress"
        :min="0"
        :max="100"
        active-color="#007BFF"
        @change="handleProgressChange"
      />
    </div>

    <!-- 播放控制 -->
    <div class="control-section">
      <Icon 
        icon="icon-park-outline:rewind"
        class="iconify"
        @click="handleRewind"
      />
      <van-button
        round
        type="primary"
        size="large"
        :icon="isPlaying ? 'pause' : 'play'"
        @click="togglePlay"
      />
      <Icon 
        icon="icon-park-outline:forward"
        class="iconify"
        @click="handleForward"
      />
      <div class="volume-control">
        <Icon 
          icon="icon-park-outline:volume-up"
          class="iconify"
          @click="toggleMute"
        />
        <van-slider
          v-model="volume"
          :min="0"
          :max="100"
          active-color="#007BFF"
          @change="setVolume"
        />
      </div>
    </div>

    <!-- 音訊元素 -->
    <audio
      ref="audio"
      :src="audioSrc"
      @timeupdate="updateProgress"
      @ended="handleEnded"
      @error="handleError"
      @loadedmetadata="handleLoadedMetadata"
    ></audio>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { Button, Slider, Image } from 'vant'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

interface AudioPlayerProps {
  bookTitle: string
  authorName: string
  bookCover: string
  audioSrc: string
}

export default defineComponent({
  name: 'AudioPlayer',
  components: {
    [Button.name]: Button,
    [Slider.name]: Slider,
    [Image.name]: Image,
    Icon
  },
  props: {
    bookTitle: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    bookCover: {
      type: String,
      required: true
    },
    audioSrc: {
      type: String,
      required: true
    }
  },
  setup(props: AudioPlayerProps) {
    const router = useRouter()
    const audio = ref<HTMLAudioElement | null>(null)
    const isPlaying = ref(false)
    const progress = ref(0)
    const currentTime = ref('00:00')
    const totalTime = ref('00:00')
    const error = ref<string | null>(null)
    const volume = ref(50) // 預設音量 50%
    const isMuted = ref(false)

    // 格式化時間
    const formatTime = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds % 60)
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    // 設置音量
    const setVolume = (value: number) => {
      if (!audio.value) return
      audio.value.volume = value / 100
      isMuted.value = false
    }

    // 切換靜音
    const toggleMute = () => {
      if (!audio.value) return
      
      isMuted.value = !isMuted.value
      if (isMuted.value) {
        audio.value.muted = true
      } else {
        audio.value.muted = false
        audio.value.volume = volume.value / 100
      }
    }

    // 播放/暫停
    const togglePlay = () => {
      if (!audio.value) return
      
      if (isPlaying.value) {
        audio.value.pause()
      } else {
        audio.value.play()
      }
      isPlaying.value = !isPlaying.value
    }

    // 快退 15 秒
    const handleRewind = () => {
      if (!audio.value) return
      audio.value.currentTime = Math.max(0, audio.value.currentTime - 15)
    }

    // 快進 15 秒
    const handleForward = () => {
      if (!audio.value) return
      audio.value.currentTime = Math.min(audio.value.duration, audio.value.currentTime + 15)
    }

    // 更新進度
    const updateProgress = () => {
      if (!audio.value) return
      
      progress.value = (audio.value.currentTime / audio.value.duration) * 100
      currentTime.value = formatTime(audio.value.currentTime)
    }

    // 播放結束
    const handleEnded = () => {
      isPlaying.value = false
      progress.value = 100
      currentTime.value = totalTime.value
    }

    // 載入元數據
    const handleLoadedMetadata = () => {
      if (!audio.value) return
      totalTime.value = formatTime(audio.value.duration)
    }

    // 錯誤處理
    const handleError = (event: Event) => {
      const error = event.target as HTMLAudioElement
      error.value = error.error?.message || '播放出錯'
    }

    // 設置進度
    const handleProgressChange = (value: number) => {
      if (!audio.value) return
      
      const newTime = (value / 100) * audio.value.duration
      audio.value.currentTime = newTime
    }

    // 監聽音訊事件
    onMounted(() => {
      if (audio.value) {
        audio.value.addEventListener('timeupdate', updateProgress)
        audio.value.addEventListener('ended', handleEnded)
        audio.value.addEventListener('error', handleError)
        audio.value.addEventListener('loadedmetadata', handleLoadedMetadata)
      }
    })

    // 清理事件監聽器
    onUnmounted(() => {
      if (audio.value) {
        audio.value.removeEventListener('timeupdate', updateProgress)
        audio.value.removeEventListener('ended', handleEnded)
        audio.value.removeEventListener('error', handleError)
        audio.value.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    })

    // 返回方法
    const handleBack = () => {
      router.back()
    }

    return {
      audio,
      isPlaying,
      progress,
      currentTime,
      totalTime,
      error,
      volume,
      isMuted,
      handleBack,
      togglePlay,
      handleProgressChange,
      handleRewind,
      handleForward,
      setVolume,
      toggleMute
    }
  }
})
</script>

<style lang="scss">
.audio-player {
  padding: 0 16px;
  height: 100%;
  
  .book-info {
    display: flex;
    align-items: center;
    margin-top: 24px;
    
    .book-details {
      margin-left: 16px;
      
      .book-title {
        font-size: 18px;
        font-weight: 600;
        color: #000;
        margin: 8px 0;
      }
      
      .author-name {
        font-size: 14px;
        color: #888;
      }
    }
  }
  
  .progress-section {
    margin-top: 24px;
    
    .time-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      
      .current-time,
      .total-time {
        font-size: 12px;
        color: #888;
      }
    }
  }
  
  .control-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
    
    .van-button {
      width: 60px;
      height: 60px;
      font-size: 24px;
    }
    
    .iconify {
      font-size: 28px;
      color: #333;
      margin: 0 16px;
      cursor: pointer;
      transition: transform 0.2s;
      
      &:active {
        transform: scale(0.9);
      }
    }

    .volume-control {
      display: flex;
      align-items: center;
      margin-left: 16px;
      
      .van-slider {
        width: 100px;
        margin-left: 8px;
      }
    }
  }
}
</style>
