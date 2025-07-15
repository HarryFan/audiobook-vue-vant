<template>
  <div class="player-page">
    <van-nav-bar
      title="播放器"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="player-container">
      <div class="book-info">
        <van-image :src="bookCover" width="100%" height="200px" fit="cover" radius="8px" />
        <h2 class="book-title">{{ bookTitle }}</h2>
        <p class="author-name">作者：{{ authorName }}</p>
      </div>

      <div class="audio-controls">
        <div class="play-progress">
          <span class="current-time">{{ formatTime(currentTime) }}</span>
          <van-slider
            v-model="currentTime"
            :max="duration"
            :step="1"
            @change="seek"
          />
          <span class="duration-time">{{ formatTime(duration) }}</span>
        </div>

        <div class="control-buttons">
          <van-button 
            icon="play-circle-o" 
            type="primary" 
            size="large" 
            :loading="isPlaying"
            @click="togglePlay"
          />
          <van-button 
            icon="pause-circle-o" 
            type="primary" 
            size="large" 
            :loading="!isPlaying"
            @click="togglePlay"
          />
        </div>

        <div class="volume-controls">
          <van-icon name="volume-o" />
          <van-slider
            v-model="volume"
            :max="100"
            :step="1"
            @change="setVolume"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Button, Image, Icon, Slider, NavBar } from 'vant'
import { Howl } from 'howler'

const router = useRouter()
const route = useRoute()

// 獲取路由參數
const bookTitle = ref(route.params.bookTitle as string)
const authorName = ref(route.params.authorName as string)
const bookCover = ref(route.params.bookCover as string)
const audioSrc = ref(route.params.audioSrc as string)

// 音訊播放器
const player = ref<Howl>()

// 播放狀態
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(50) // 預設音量50%

// 初始化播放器
onMounted(() => {
  if (!audioSrc.value) {
    router.back()
    return
  }

  player.value = new Howl({
    src: [audioSrc.value],
    html5: true, // 使用 HTML5 音訊
    volume: volume.value / 100,
    onplay: () => {
      isPlaying.value = true
      startProgressUpdate()
    },
    onstop: () => {
      isPlaying.value = false
      clearInterval(progressInterval)
    },
    onload: () => {
      duration.value = player.value.duration()
    }
  })
})

// 清理播放器
onUnmounted(() => {
  if (player.value) {
    player.value.unload()
  }
  clearInterval(progressInterval)
})

// 播放/暫停
const togglePlay = () => {
  if (isPlaying.value) {
    player.value?.pause()
  } else {
    player.value?.play()
  }
}

// 調整音量
const setVolume = (value: number) => {
  volume.value = value
  if (player.value) {
    player.value.volume(value / 100)
  }
}

// 調整播放位置
const seek = (value: number) => {
  if (player.value) {
    player.value.seek(value)
  }
}

// 更新進度條
let progressInterval: NodeJS.Timeout
const startProgressUpdate = () => {
  progressInterval = setInterval(() => {
    if (player.value) {
      currentTime.value = player.value.seek()
    }
  }, 1000)
}

// 返回上一頁
const goBack = () => {
  if (player.value) {
    player.value.stop()
  }
  router.back()
}

// 格式化時間
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 監聽路由參數變化
watch(
  () => route.params,
  (newParams) => {
    if (newParams.audioSrc) {
      audioSrc.value = newParams.audioSrc as string
      if (player.value) {
        player.value.unload()
        player.value = new Howl({
          src: [audioSrc.value],
          html5: true,
          volume: volume.value / 100,
          onplay: () => {
            isPlaying.value = true
            startProgressUpdate()
          },
          onstop: () => {
            isPlaying.value = false
            clearInterval(progressInterval)
          },
          onload: () => {
            duration.value = player.value.duration()
          }
        })
      }
    }
  }
)
</script>

<style lang="scss">
.player-page {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .player-container {
    flex: 1;
    overflow-y: auto;
    padding: 16px;

    .book-info {
      margin-bottom: 32px;

      .book-title {
        margin: 16px 0;
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }

      .author-name {
        font-size: 16px;
        color: #666;
      }
    }

    .audio-controls {
      margin-top: 32px;

      .play-progress {
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        .current-time,
        .duration-time {
          width: 60px;
          color: #666;
        }

        .van-slider {
          flex: 1;
        }
      }

      .control-buttons {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
      }

      .volume-controls {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }
  }
}
</style>
