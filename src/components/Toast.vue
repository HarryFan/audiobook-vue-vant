<template>
  <div class="toast-wrapper">
    <!-- Toast 組件主要使用 Vant 的 Toast 服務，不需要模板內容 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from 'vant'

export default defineComponent({
  name: 'AppToast',
  setup() {
    // 封裝常用提示類型
    const showSuccess = (message: string, duration = 2000) => {
      showToast({
        type: 'success',
        message,
        duration
      })
    }

    const showError = (message: string, duration = 2000) => {
      showToast({
        type: 'fail',
        message,
        duration
      })
    }

    const showWarning = (message: string, duration = 2000) => {
      showToast({
        type: 'warning',
        message,
        duration
      })
    }

    const showLoading = (message = '載入中...') => {
      return showToast({
        type: 'loading',
        message,
        duration: 0,
        forbidClick: true
      })
    }

    return {
      showSuccess,
      showError,
      showWarning,
      showLoading
    }
  }
})
</script>

<style lang="scss">
// 可以在這裡添加自定義樣式
</style>
